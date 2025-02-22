import React from 'react';
import { Box, Flex, Grid, Text, Theme } from '@radix-ui/themes';
import { Form, VisuallyHidden } from 'radix-ui';
import { ChevronRightIcon, Cross1Icon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { LoadingIcon } from '../assets/icons/LoadingIcon';
import { translate } from '../requests/translation';
import { Status, useClient } from '../hooks/useClient';
import { Language } from '../models/translation';
import { useLocation } from 'react-router';

type TextTranslationHandle = {
  text: () => string;
  translation: () => string | undefined;
};

type TextTranslationProps = {
  refs: React.Ref<TextTranslationHandle>;
  onSubmitSuccess?: () => void;
};

function TextTranslation({ refs, onSubmitSuccess }: TextTranslationProps) {
  const location = useLocation();
  const initialText = location.state?.text ?? '';
  const initialTranslation = location.state?.translation ?? '';

  const [text, setText] = React.useState(initialText);
  const { isIdle, isLoading, isSuccess, isError, data, error, update, reset } = useClient<string>({
    status: initialTranslation === '' ? Status.Idle : Status.Success,
    data: initialTranslation,
  });

  React.useImperativeHandle(refs, () => ({
    text: () => {
      return text;
    },
    translation: () => {
      return data;
    },
  }));

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (text !== '') {
      update(translate({ text, from: Language.EN, to: Language.ID })).then(() => {
        onSubmitSuccess?.();
      });

      inputRef.current?.select();
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value.replace(/ /g, ''));
  };

  const handleReset = () => {
    setText('');
    reset();
  };

  return (
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
                className="h-32 w-full rounded-sm border border-gray-300 p-8 text-[35px] data-invalid:border-red-500 data-invalid:outline-red-500"
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
        <Flex
          height="128px"
          width="full"
          align="center"
          justify={!isError ? 'start' : 'center'}
          gap="2"
          p="8"
          position="relative"
          className={!isError ? 'bg-gray-100' : 'border border-red-500 bg-red-100'}
        >
          {isIdle && (
            <Text size="8" color="gray">
              Translation
            </Text>
          )}
          {isLoading && (
            <Box position="absolute" top="4" right="4">
              <LoadingIcon />
            </Box>
          )}
          {isError && (
            <>
              <Theme accentColor="red">
                <ExclamationTriangleIcon width="24" height="24" className="text-[var(--accent-a11)]" />
              </Theme>
              <Text size="4" color="red">
                {error}
              </Text>
            </>
          )}
          {isSuccess && <Text size="8">{data}</Text>}
        </Flex>
      </Grid>
      <VisuallyHidden.Root asChild>
        <button type="submit" />
      </VisuallyHidden.Root>
    </Form.Root>
  );
}

export default TextTranslation;
export type { TextTranslationHandle };
