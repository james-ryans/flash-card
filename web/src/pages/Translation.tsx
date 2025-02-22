import { Container, Flex, IconButton } from '@radix-ui/themes';
import TextTranslation, { TextTranslationHandle } from '../components/TextTranslation';
import { useNavigate } from 'react-router';
import { LapTimerIcon } from '@radix-ui/react-icons';
import React from 'react';

function Translation() {
  React.useEffect(() => {
    window.history.replaceState({}, '');
  }, []);

  const ref = React.useRef<TextTranslationHandle>(null);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/recent', { state: { text: ref.current?.text(), translation: ref.current?.translation() } });
  };

  return (
    <Container>
      <Flex direction="column" gap="6">
        <TextTranslation refs={ref} />
        <Flex justify="end">
          <IconButton
            tabIndex={-1}
            size="4"
            radius="full"
            variant="outline"
            color="gray"
            className="outline-none"
            onClick={handleClick}
          >
            <LapTimerIcon width="20" height="20" />
          </IconButton>
        </Flex>
      </Flex>
    </Container>
  );
}

export default Translation;
