import { Box, Button, Card, Container, Flex, Heading, Text, TextField } from '@radix-ui/themes';
import { Form } from 'radix-ui';

function Login() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
                            color={validity?.valueMissing ? 'red' : undefined}
                            placeholder="Email"
                            type="email"
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
