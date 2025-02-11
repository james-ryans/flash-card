import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";

function Login() {
  return (
    <Container className="h-screen bg-[#f4f4f4]">
      <Flex align="center" direction="column" asChild>
        <Box className="mx-auto w-lg">
          <Heading size="8" className="py-8">
            Flash Card
          </Heading>
          <Card variant="surface" size="3" className="w-full rounded-xl shadow">
            <Flex align="center" gap="4" direction="column">
              <Heading size="6">Sign In</Heading>
              <Flex direction="column" gap="4" width="100%">
                <div>
                  <Text size="1" weight="medium" as="label">
                    Email
                  </Text>
                  <TextField.Root size="3" placeholder="Email" type="email" />
                </div>
                <div>
                  <Text size="1" weight="medium" as="label">
                    Password
                  </Text>
                  <TextField.Root
                    size="3"
                    placeholder="Password"
                    type="password"
                  />
                </div>
                <Box mt="4" asChild>
                  <Button size="3">Sign In</Button>
                </Box>
              </Flex>
            </Flex>
          </Card>
        </Box>
      </Flex>
    </Container>
  );
}

export default Login;
