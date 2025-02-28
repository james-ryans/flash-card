import React from 'react';
import { Box, Container, Flex, Heading, IconButton, Separator, Text } from '@radix-ui/themes';
import { Cross1Icon, LapTimerIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router';
import TextTranslation, { TextTranslationHandle } from '../components/TextTranslation';
import { recent } from '../requests/recent';
import { RecentResponse, Recent as RecentType } from '../models/recent';

function Recent() {
  const [recents, setRecents] = React.useState<RecentType[]>([]);

  const updateRecent = () => {
    recent().then((response: RecentResponse) => {
      setRecents(response.data);
    });
  };

  React.useEffect(() => {
    window.history.replaceState({}, '');
    updateRecent();
  }, []);

  const onTranslationSuccess = () => {
    updateRecent();
  };

  const ref = React.useRef<TextTranslationHandle>(null);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/', { state: { text: ref.current?.text(), translation: ref.current?.translation() } });
  };

  return (
    <Flex flexGrow="1">
      <Box px="4" className="flex-3/4">
        <Container>
          <Flex direction="column" gap="6">
            <TextTranslation refs={ref} onSubmitSuccess={onTranslationSuccess} />
            <Flex justify="end">
              <IconButton
                tabIndex={-1}
                size="4"
                radius="full"
                variant="surface"
                color="indigo"
                className="outline-none"
                onClick={handleClick}
              >
                <LapTimerIcon width="20" height="20" />
              </IconButton>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Box height="auto">
        <Separator orientation="vertical" size="4" />
      </Box>
      <Flex direction="column" className="flex-1/4">
        <Flex p="4" justify="between" align="center">
          <Heading as="h2" weight="medium">
            Recent
          </Heading>
          <IconButton size="4" highContrast color="gray" variant="ghost" radius="full" onClick={handleClick}>
            <Cross1Icon width="20" height="20" />
          </IconButton>
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
