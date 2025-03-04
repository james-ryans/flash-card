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
import { useNavigate } from 'react-router';
import { LoadingIcon } from '../assets/icons/LoadingIcon';
import { GoogleIcon } from '../assets/icons/GoogleIcon';
import { useForm } from '../hooks/useForm';
import { z } from 'zod';

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must contain at least 2 characters')
      .max(128, 'Name must not exceed 128 characters')
      .nonempty('Name is required'),
    email: z.string().email('Invalid email address').nonempty('Email is required'),
    password: z
      .string()
      .min(8, 'Password must contain at least 8 characters')
      .max(128, 'Password must not exceed 128 characters')
      .nonempty('Password is required'),
    password_confirmation: z.string().nonempty('Password confirmation is required'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  });

type RegisterForm = z.infer<typeof registerSchema>;

function Register() {
  const navigate = useNavigate();
  const auth = useAuth();

  const { isLoading, isSuccess, isError, data, error, errors, handleChange, handleSubmit } = useForm<RegisterForm>(
    registerSchema,
    {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  );

  const onSubmit = async (data: RegisterForm) => {
    await auth.register(data);
  };

  const handleGoogleSignIn = () => {
    if (isLoading || isSuccess) {
      return;
    }

    window.location.href = import.meta.env.VITE_SERVER_BASE_URL + '/auth/google';
  };

  React.useEffect(() => {
    if (auth.user) {
      navigate('/');
    }
  }, [auth.user]);

  return (
    <Container className="h-screen bg-[#e4e4e4]">
      <Flex align="center" direction="column" asChild>
        <Box className="mx-auto w-lg">
          <Heading size="8" className="py-8" color="indigo" highContrast>
            Flash Card
          </Heading>
          <Card variant="surface" size="3" className="w-full rounded-xl shadow-[var(--shadow-3)]">
            <Flex align="center" gap="3" direction="column">
              {isError && !!error && (
                <Callout.Root color="red" className="w-full">
                  <Callout.Icon>
                    <InfoCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
              )}
              <Heading size="6">Register</Heading>
              <Flex direction="column" gap="2" width="100%" asChild>
                <Form.Root onSubmit={handleSubmit(onSubmit)}>
                  <Form.Field name="name">
                    <Form.Label asChild>
                      <Text size="1" weight="medium" as="label">
                        Name
                      </Text>
                    </Form.Label>
                    <Form.Control asChild>
                      <TextField.Root
                        size="3"
                        color={!!errors?.name ? 'red' : undefined}
                        placeholder="Name"
                        value={data.name}
                        onChange={(event) => handleChange('name', event.target.value)}
                      />
                    </Form.Control>
                    <Form.Message forceMatch={!!errors?.name} asChild>
                      <Text size="1" as="label" color="red">
                        {errors?.name}
                      </Text>
                    </Form.Message>
                  </Form.Field>
                  <Form.Field name="email">
                    <Form.Label asChild>
                      <Text size="1" weight="medium" as="label">
                        Email
                      </Text>
                    </Form.Label>
                    <Form.Control asChild>
                      <TextField.Root
                        size="3"
                        color={!!errors?.email ? 'red' : undefined}
                        placeholder="Email"
                        type="email"
                        value={data.email}
                        onChange={(event) => handleChange('email', event.target.value)}
                      />
                    </Form.Control>
                    <Form.Message forceMatch={!!errors?.email} asChild>
                      <Text size="1" as="label" color="red">
                        {errors?.email}
                      </Text>
                    </Form.Message>
                  </Form.Field>
                  <Form.Field name="password">
                    <Form.Label asChild>
                      <Text size="1" weight="medium" as="label">
                        Password
                      </Text>
                    </Form.Label>
                    <Form.Control asChild>
                      <TextField.Root
                        size="3"
                        color={!!errors?.password ? 'red' : undefined}
                        placeholder="Password"
                        type="password"
                        value={data.password}
                        onChange={(event) => handleChange('password', event.target.value)}
                      />
                    </Form.Control>
                    <Form.Message forceMatch={!!errors?.password} asChild>
                      <Text size="1" as="label" color="red">
                        {errors?.password}
                      </Text>
                    </Form.Message>
                  </Form.Field>
                  <Form.Field name="password_confirmation">
                    <Form.Label asChild>
                      <Text size="1" weight="medium" as="label">
                        Confirm Password
                      </Text>
                    </Form.Label>
                    <Form.Control asChild>
                      <TextField.Root
                        size="3"
                        color={!!errors?.password_confirmation ? 'red' : undefined}
                        placeholder="Confirm password"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(event) => handleChange('password_confirmation', event.target.value)}
                      />
                    </Form.Control>
                    <Form.Message forceMatch={!!errors?.password_confirmation} asChild>
                      <Text size="1" as="label" color="red">
                        {errors?.password_confirmation}
                      </Text>
                    </Form.Message>
                  </Form.Field>
                  <Box mt="2" asChild>
                    <Button size="3" type="submit" disabled={isLoading}>
                      Register
                      {isLoading && <LoadingIcon />}
                    </Button>
                  </Box>
                </Form.Root>
              </Flex>
              <Text size="1" color="gray">
                Already have an account? <Link href="/login">Login</Link>
              </Text>
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
            </Flex>
          </Card>
        </Box>
      </Flex>
    </Container>
  );
}

export default Register;
