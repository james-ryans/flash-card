import React from 'react';
import { z } from 'zod';
import { ValidationApiError } from '../models/error';

enum Status {
  Idle,
  Loading,
  Success,
  Error,
}

enum Transition {
  Reset,
  Change,
  Submit,
  Success,
  Error,
}

interface State<T = Object, E = Partial<Record<keyof T, string>>> {
  status: Status;
  data: T;
  error?: string | null;
  errors?: E;
}

interface Query<T> extends State<T> {
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  handleReset: () => void;
  handleChange: (key: keyof T, value: T[keyof T]) => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void>) => (event: React.FormEvent) => void;
}

type Action<T, E> =
  | { type: Transition.Reset }
  | { type: Transition.Change; key: keyof T; value: T[keyof T] }
  | { type: Transition.Submit }
  | { type: Transition.Success; data: T }
  | { type: Transition.Error; error?: string | null; errors: E };

function useForm<T>(schema: z.ZodSchema<T>, initialValues: T): Query<T> {
  type E = Partial<Record<keyof T, string>>;

  const [state, dispatch] = React.useReducer(
    (state: State<T, E>, action: Action<T, E>) => {
      switch (action.type) {
        case Transition.Reset:
          return { status: Status.Idle, data: {} as T };
        case Transition.Change:
          return {
            ...state,
            data: { ...state.data, [action.key]: action.value },
            errors: { ...state.errors, [action.key]: null },
          };
        case Transition.Submit:
          return { ...state, status: Status.Loading, error: null, errors: {} as E };
        case Transition.Success:
          return { status: Status.Success, data: action.data };
        case Transition.Error:
          return { ...state, status: Status.Error, error: action.error, errors: action.errors };
        default:
          return state;
      }
    },
    { status: Status.Idle, data: initialValues, error: null, errors: {} as E },
  );

  const handleReset = React.useCallback(() => dispatch({ type: Transition.Reset }), [dispatch]);

  const handleChange = React.useCallback(
    (key: keyof T, value: T[keyof T]) => {
      dispatch({ type: Transition.Change, key, value });
    },
    [dispatch],
  );

  const validate = () => {
    try {
      schema.parse(state.data);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        dispatch({
          type: Transition.Error,
          errors: error.errors.reduce((acc, { path, message }) => {
            return { ...acc, [path[0] as keyof T]: message };
          }, {} as E),
        });
      }
      return false;
    }
  };

  const handleSubmit = React.useCallback(
    (onSubmit: (values: T) => Promise<void>) => (event: React.FormEvent) => {
      event.preventDefault();
      if (state.status === Status.Loading) {
        return;
      }

      if (!validate()) {
        return;
      }

      dispatch({ type: Transition.Submit });
      return onSubmit(state.data).catch((error) => {
        if (error instanceof ValidationApiError) {
          dispatch({
            type: Transition.Error,
            error: error.error,
            errors: error.message.reduce((acc, { field, message }) => {
              return { ...acc, [field]: message };
            }, {} as E),
          });
          return;
        }

        dispatch({ type: Transition.Error, error: error.error, errors: {} as E });
      });
    },
    [dispatch, state],
  );

  return {
    isIdle: state.status === Status.Idle,
    isLoading: state.status === Status.Loading,
    isSuccess: state.status === Status.Success,
    isError: state.status === Status.Error,
    ...state,
    handleReset,
    handleChange,
    handleSubmit,
  };
}

export { useForm };
