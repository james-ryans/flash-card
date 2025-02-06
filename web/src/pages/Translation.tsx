import React from "react";
import { Form, VisuallyHidden } from "radix-ui";
import { Cross1Icon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { AxiosError } from "axios";
import { LoadingIcon } from "../assets/icons/LoadingIcon";
import { translate, TranslationResponse } from "../requests/translation";
import { ErrorResponse } from "../requests/common";

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

function Translation() {
  const [text, setText] = React.useState("");
  const [result, setResult] = React.useState<ResultProps>({
    state: ResultState.Idle,
    data: "",
    error: "",
  });

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (text !== "") {
      setResult({
        state: ResultState.Loading,
        data: "",
        error: "",
      });

      translate({ text })
        .then((response: TranslationResponse) => {
          setResult({
            state: ResultState.Success,
            data: response.data.text,
            error: "",
          });
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setResult({
            state: ResultState.Error,
            data: "",
            error: error.response?.data.message || error.message,
          });
        });
      inputRef.current?.select();
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value.replace(/ /g, ""));
  };

  const handleReset = () => {
    setText("");
    setResult({
      state: ResultState.Idle,
      data: "",
      error: "",
    });
  };

  return (
    <Form.Root onSubmit={handleSubmit} className="mt-16 grid grid-cols-2 gap-4">
      <Form.Field name="source">
        <div className="relative flex flex-col gap-2">
          <Form.Control asChild>
            <input
              ref={inputRef}
              className="h-32 w-full rounded-sm border border-gray-300 p-8 text-3xl data-invalid:border-red-500"
              value={text}
              onChange={handleInput}
              required
            />
          </Form.Control>
          {text !== "" && (
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
        </div>
      </Form.Field>
      <ResultBox state={result.state} data={result.data} error={result.error} />
      <VisuallyHidden.Root asChild>
        <button type="submit" />
      </VisuallyHidden.Root>
    </Form.Root>
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
