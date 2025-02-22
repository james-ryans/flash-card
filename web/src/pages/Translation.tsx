import React from 'react';
import { Form, VisuallyHidden } from 'radix-ui';
import { ChevronRightIcon, Cross1Icon, ExclamationTriangleIcon, LapTimerIcon } from '@radix-ui/react-icons';
import { AxiosError, AxiosResponse } from 'axios';
import { LoadingIcon } from '../assets/icons/LoadingIcon';
import { Language, translate, TranslationResponse } from '../requests/translation';
import { ErrorResponse } from '../models/common';
import { Container, Flex, Grid, IconButton, Text } from '@radix-ui/themes';
import { Link, useLocation } from 'react-router';

enum ResultState {
  Idle,
  Loading,
  Success,
  Error,
}

type ResultProps = {
  state: ResultState;
  data: string;
  error: string;
};

type TranslationProps = {
  onSubmitSuccess?: () => void;
};

function Translation({ onSubmitSuccess }: TranslationProps) {
  const { pathname } = useLocation();

  const [text, setText] = React.useState('');
  const [result, setResult] = React.useState<ResultProps>({
    state: ResultState.Idle,
    data: '',
    error: '',
  });

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (text !== '') {
      setResult({
        state: ResultState.Loading,
        data: '',
        error: '',
      });

      translate({ text, from: Language.EN, to: Language.ID })
        .then((response: AxiosResponse<TranslationResponse>) => {
          setResult({
            state: ResultState.Success,
            data: response.data.data.text,
            error: '',
          });
          onSubmitSuccess?.();
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setResult({
            state: ResultState.Error,
            data: '',
            error:
              (Array.isArray(error.response?.data.message)
                ? error.response?.data.message[0]
                : error.response?.data.message) || error.message,
          });
        });
      inputRef.current?.select();
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value.replace(/ /g, ''));
  };

  const handleReset = () => {
    setText('');
    setResult({
      state: ResultState.Idle,
      data: '',
      error: '',
    });
  };

  return (
    <Container>
      <Flex direction="column" gap="6">
        <Form.Root onSubmit={handleSubmit} className="mt-16 flex flex-col gap-2">
          <Flex mx="4" gap="4" align="center">
            <Text weight="medium" size="2" color="gray" className="w-24 grow">
              English
            </Text>
            <ChevronRightIcon width="18" height="18" />
            <Text weight="medium" size="2" color="gray" className="w-24 grow">
              Indonesian
            </Text>
          </Flex>
          <Grid columns="2" gap="4">
            <Form.Field name="source">
              <Flex position="relative" direction="column" gap="2">
                <Form.Control asChild>
                  <input
                    ref={inputRef}
                    className="h-32 w-full rounded-sm border border-gray-300 p-8 text-3xl data-invalid:border-red-500"
                    value={text}
                    onChange={handleInput}
                    required
                  />
                </Form.Control>
                {text !== '' && (
                  <button
                    className="absolute top-4 right-4 rounded-sm p-2 hover:bg-gray-100"
                    type="button"
                    onClick={handleReset}
                  >
                    <Cross1Icon width="18" height="18" />
                  </button>
                )}
                <Form.Message match="valueMissing" className="text-red-500">
                  Please enter your text
                </Form.Message>
              </Flex>
            </Form.Field>
            <ResultBox state={result.state} data={result.data} error={result.error} />
          </Grid>
          <VisuallyHidden.Root asChild>
            <button type="submit" />
          </VisuallyHidden.Root>
        </Form.Root>
        <Flex justify="end">
          <Link to={pathname === '/recent' ? '/' : '/recent'}>
            <IconButton
              tabIndex={-1}
              size="4"
              radius="full"
              variant={pathname === '/recent' ? 'surface' : 'outline'}
              color={pathname === '/recent' ? 'blue' : 'gray'}
              className="outline-none"
            >
              <LapTimerIcon width="20" height="20" />
            </IconButton>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
}

function ResultBox({ state, data, error }: ResultProps) {
  switch (state) {
    case ResultState.Loading:
      return (
        <div className="relative flex h-32 w-full items-center justify-center gap-2 rounded-sm bg-gray-100 p-8 text-3xl">
          <div className="absolute top-4 right-4">
            <LoadingIcon />
          </div>
        </div>
      );
    case ResultState.Error:
      return (
        <div className="flex h-32 w-full items-center justify-center gap-2 rounded-sm border border-red-500 bg-red-100 p-8 text-xl text-red-500">
          <ExclamationTriangleIcon width="24" height="24" />
          <p>{error}</p>
        </div>
      );
    case ResultState.Success:
      return (
        <div className="flex h-32 w-full items-center rounded-sm bg-gray-100 p-8 text-3xl">
          <p>{data}</p>
        </div>
      );
    case ResultState.Idle:
      return (
        <div className="flex h-32 w-full items-center rounded-sm bg-gray-100 p-8 text-3xl">
          <p className="text-gray-500">Translation</p>
        </div>
      );
  }
}

export default Translation;
