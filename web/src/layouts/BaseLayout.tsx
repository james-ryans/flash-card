import { Button, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { Outlet } from 'react-router';
import { useAuth } from '../contexts/auth';
import { CaretDownIcon, ExitIcon } from '@radix-ui/react-icons';

function BaseLayout() {
  const { user, logout } = useAuth();

  return (
    <>
      <Flex height="52px" justify="end" asChild>
        <nav className="border-b border-gray-200">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Flex width="108px" mx="2" align="center" justify="center">
                <Button tabIndex={-1} size="4" highContrast variant="ghost">
                  {user!.name}
                  <CaretDownIcon />
                </Button>
              </Flex>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item onSelect={logout}>
                <Flex gap="3" align="center">
                  <ExitIcon />
                  <Text size="2">Logout</Text>
                </Flex>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </nav>
      </Flex>
      <Outlet />
    </>
  );
}

export default BaseLayout;
