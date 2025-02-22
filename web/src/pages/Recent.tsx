import React from 'react';
import { Box, Flex, Heading, IconButton, Separator, Text } from '@radix-ui/themes';
import Translation from './Translation';
import { recent, RecentResponse, Recent as RecentType } from '../requests/recent';
import { AxiosResponse } from 'axios';
import { Cross1Icon } from '@radix-ui/react-icons';
import { Link } from 'react-router';

function Recent() {
  const [recents, setRecents] = React.useState<RecentType[]>([]);

  React.useEffect(() => {
    recent().then((response: AxiosResponse<RecentResponse>) => {
      setRecents(response.data.data);
    });
  }, []);

  const onTranslationSuccess = () => {
    recent().then((response: AxiosResponse<RecentResponse>) => {
      setRecents(response.data.data);
    });
  };

  return (
    <Flex height="calc(100vh - 52px)">
      <Box px="4" className="flex-3/4">
        <Translation onSubmitSuccess={onTranslationSuccess} />
      </Box>
      <Separator orientation="vertical" size="4" />
      <Flex direction="column" className="flex-1/4">
        <Flex p="4" justify="between" align="center">
          <Heading as="h2" weight="medium">
            Recent
          </Heading>
          <Link to="/">
            <IconButton size="4" highContrast color="gray" variant="ghost" radius="full">
              <Cross1Icon width="20" height="20" />
            </IconButton>
          </Link>
        </Flex>
        <Separator size="4" />
        <ul>
          {recents.map((recent: RecentType, index: number) => (
            <Box key={index}>
              <Flex p="4" direction="column" asChild>
                <li>
                  <Text size="2">{recent.text}</Text>
                  <Text size="2" color="gray">
                    {recent.translation}
                  </Text>
                </li>
              </Flex>
              <Separator size="4" />
            </Box>
          ))}
        </ul>
      </Flex>
    </Flex>
  );
}

export default Recent;
