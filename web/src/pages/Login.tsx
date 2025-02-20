import { Box, Button, Callout, Card, Container, Flex, Heading, Text, TextField } from '@radix-ui/themes';
import { Form } from 'radix-ui';
import React from 'react';
import { AxiosError } from 'axios';
import { DEFAULT_ERROR_RESPONSE, ErrorResponse } from '../requests/common';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useAuth } from '../contexts/auth';
import { LoginRequest } from '../models/auth';
import { useNavigate } from 'react-router';

function Login() {
  const [data, setData] = React.useState<LoginRequest>({
    email: '',
    password: '',
  });
  const [error, setError] = React.useState<ErrorResponse | null>(null);

  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    auth
      .login(data)
      .then(() => {
        setError(null);
        navigate('/');
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setError(error.response?.data || DEFAULT_ERROR_RESPONSE);
      });
  };

  return (
    <Container className="h-screen bg-[#e4e4e4]">
      <Flex align="center" direction="column" asChild>
        <Box className="mx-auto w-lg">
          <Heading size="8" className="py-8">
            Flash Card
          </Heading>
          <Card variant="surface" size="3" className="w-full rounded-xl shadow">
            <Flex align="center" gap="4" direction="column">
              {error && (
                <Callout.Root color="red" className="w-full">
                  <Callout.Icon>
                    <InfoCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>{error.message}</Callout.Text>
                </Callout.Root>
              )}
              <Heading size="6">Sign In</Heading>
              <Flex direction="column" gap="4" width="100%" asChild>
                <Form.Root onSubmit={handleSubmit}>
                  <Form.Field name="email">
                    <Form.Label asChild>
                      <Text size="1" weight="medium" as="label">
                        Email
                      </Text>
                    </Form.Label>
                    <Form.ValidityState>
                      {(validity) => (
                        <Form.Control asChild>
                          <TextField.Root
                            size="3"
                            color={validity?.valueMissing || validity?.typeMismatch ? 'red' : undefined}
                            placeholder="Email"
                            type="email"
                            value={data.email}
                            onChange={(event) => setData({ ...data, email: event.target.value })}
                            required
                          />
                        </Form.Control>
                      )}
                    </Form.ValidityState>
                    <Form.Message match="valueMissing" asChild>
                      <Text size="1" as="label" color="red">
                        Please enter your email
                      </Text>
                    </Form.Message>
                    <Form.Message match="typeMismatch" asChild>
                      <Text size="1" as="label" color="red">
                        Please enter a valid email
                      </Text>
                    </Form.Message>
                  </Form.Field>
                  <Form.Field name="password">
                    <Form.Label asChild>
                      <Text size="1" weight="medium" as="label">
                        Password
                      </Text>
                    </Form.Label>
                    <Form.ValidityState>
                      {(validity) => (
                        <Form.Control asChild>
                          <TextField.Root
                            size="3"
                            color={validity?.valueMissing ? 'red' : undefined}
                            placeholder="Password"
                            type="password"
                            value={data.password}
                            onChange={(event) => setData({ ...data, password: event.target.value })}
                            required
                          />
                        </Form.Control>
                      )}
                    </Form.ValidityState>
                    <Form.Message match="valueMissing" asChild>
                      <Text size="1" as="label" color="red">
                        Please enter a password
                      </Text>
                    </Form.Message>
                  </Form.Field>
                  <Box mt="4" asChild>
                    <Button size="3" type="submit">
                      Sign In
                    </Button>
                  </Box>
                </Form.Root>
              </Flex>
            </Flex>
          </Card>
        </Box>
      </Flex>
    </Container>
  );
}

export default Login;
