import React from 'react';

enum Status {
  Idle,
  Loading,
  Success,
  Error,
}

interface State<T = any> {
  status: Status;
  data?: T;
  error?: string;
}

type Action<T> =
  | { type: Status.Idle }
  | { type: Status.Loading }
  | { type: Status.Success; data: T }
  | { type: Status.Error; error: string };

interface Client<T> extends State<T> {
  update: (promise: Promise<T>) => Promise<T>;
  reset: () => void;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const defaultInitialState: State = {
  status: Status.Idle,
};

function useClient<T = any>(initialState?: State<T>): Client<T> {
  const [state, dispatch] = React.useReducer((state: State<T>, action: Action<T>) => {
    switch (action.type) {
      case Status.Idle:
        return { status: Status.Idle };
      case Status.Loading:
        return { status: Status.Loading };
      case Status.Success:
        return { status: Status.Success, data: action.data };
      case Status.Error:
        return { status: Status.Error, error: action.error };
      default:
        return state;
    }
  }, initialState ?? defaultInitialState);

  const reset = React.useCallback(() => dispatch({ type: Status.Idle }), [dispatch]);

  const update = React.useCallback(
    (promise: Promise<T>) => {
      dispatch({ type: Status.Loading });
      return promise
        .then((data: T) => {
          dispatch({ type: Status.Success, data });
          return data;
        })
        .catch((error: Error) => {
          dispatch({ type: Status.Error, error: error.message });
          return Promise.reject(error);
        });
    },
    [dispatch],
  );

  return {
    isIdle: state.status === Status.Idle,
    isLoading: state.status === Status.Loading,
    isSuccess: state.status === Status.Success,
    isError: state.status === Status.Error,
    ...state,
    update,
    reset,
  };
}

export { useClient, Status };
