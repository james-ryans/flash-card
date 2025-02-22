import { Container, Flex, IconButton } from '@radix-ui/themes';
import TextTranslation from '../components/TextTranslation';
import { Link } from 'react-router';
import { LapTimerIcon } from '@radix-ui/react-icons';

function Translation() {
  return (
    <Container>
      <Flex direction="column" gap="6">
        <TextTranslation />
        <Flex justify="end">
          <Link to="/recent">
            <IconButton tabIndex={-1} size="4" radius="full" variant="outline" color="gray" className="outline-none">
              <LapTimerIcon width="20" height="20" />
            </IconButton>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
}

export default Translation;
