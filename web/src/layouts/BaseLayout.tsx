import { Button, DropdownMenu, Flex, Heading, Separator, TabNav, Text } from '@radix-ui/themes';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { useAuth } from '../contexts/auth';
import { CaretDownIcon, ExitIcon } from '@radix-ui/react-icons';

function BaseLayout() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  return (
    <Flex direction="column" minHeight="100vh">
      <Flex height="40px" px="4" align="center" justify="between" asChild>
        <nav>
          <Link to="/">
            <Heading className="select-none" color="indigo" highContrast>
              Flash Card
            </Heading>
          </Link>

          <TabNav.Root size="2">
            <TabNav.Link asChild active={pathname === "/" || pathname === "/recent"}>
              <NavLink to="/">Translate</NavLink>
            </TabNav.Link>
            <TabNav.Link asChild active={pathname === "/flash"}>
              <NavLink to="/flash">Flash</NavLink>
            </TabNav.Link>
          </TabNav.Root>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Flex mx="4" justify="center">
                <Button tabIndex={-1} size="4" highContrast variant="ghost">
                  <Text size="2">{user!.name}</Text>
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
      <Separator size="4" />
      <Outlet />
    </Flex>
  );
}

export default BaseLayout;
