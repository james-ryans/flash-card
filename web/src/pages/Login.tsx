import {
  Box,
  Button,
  Callout,
  Card,
  Container,
  Flex,
  Heading,
  Link,
  Separator,
  Text,
  TextField,
} from '@radix-ui/themes';
import { Form } from 'radix-ui';
import React from 'react';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useAuth } from '../contexts/auth';
import { LoginRequest } from '../models/auth';
import { useNavigate } from 'react-router';
import { useQuery } from '../hooks/useQuery';
import { LoadingIcon } from '../assets/icons/LoadingIcon';
import { GoogleIcon } from '../assets/icons/GoogleIcon';
import { useCookies } from 'react-cookie';

function Login() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [cookies, _, removeCookie] = useCookies(['error']);
  const { isLoading, isSuccess, isError, error, update } = useQuery<void>();
  const [login, setLogin] = React.useState<LoginRequest>({
    email: '',
    password: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading || isSuccess) {
      return;
    }
    update(auth.login(login).then());
  };

  const handleGoogleSignIn = () => {
    if (isLoading || isSuccess) {
      return;
    }

    window.location.href = import.meta.env.VITE_SERVER_BASE_URL + '/auth/google';
  };

  React.useEffect(() => {
    const error: string = cookies.error ?? '';

    if (error !== '') {
      removeCookie('error');
      update(Promise.reject(new Error(error)));
    }
  }, []);

  React.useEffect(() => {
    if (auth.user) {
      navigate('/');
    }
  }, [auth.user]);

  return (
    <Container className="min-h-screen bg-[#e4e4e4]">
      <Flex align="center" direction="column" py="8" gap="8" className='mx-auto w-lg'>
          <Heading size="8" color="indigo" highContrast>
            Flash Card
          </Heading>
          <Card variant="surface" size="3" className="w-full rounded-xl shadow-[var(--shadow-3)]">
            <Flex align="center" gap="4" direction="column">
              {isError && (
                <Callout.Root color="red" className="w-full">
                  <Callout.Icon>
                    <InfoCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
              )}
              <Heading size="6">Sign In</Heading>
              <Flex direction="column" gap="2" width="100%" asChild>
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
                            value={login.email}
                            onChange={(event) => setLogin({ ...login, email: event.target.value })}
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
                            value={login.password}
                            onChange={(event) => setLogin({ ...login, password: event.target.value })}
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
                  <Box mt="2" asChild>
                    <Button size="3" type="submit" disabled={isLoading}>
                      Sign In
                      {isLoading && <LoadingIcon />}
                    </Button>
                  </Box>
                </Form.Root>
              </Flex>
              <Flex width="100%" align="center" gap="2">
                <Separator orientation="horizontal" size="4" />
                <Text size="1" color="gray">
                  or
                </Text>
                <Separator orientation="horizontal" size="4" />
              </Flex>
              <Box width="100%" asChild>
                <Button size="3" variant="outline" color="gray" onClick={handleGoogleSignIn} disabled={isLoading}>
                  <GoogleIcon />
                  Google
                </Button>
              </Box>
              <Text size="1" color="gray">
                Don't have an account? <Link href="/register">Register</Link>
              </Text>
            </Flex>
          </Card>
      </Flex>
    </Container>
  );
}

export default Login;
