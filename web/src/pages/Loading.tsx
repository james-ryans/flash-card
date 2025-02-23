import { Flex } from '@radix-ui/themes';
import { LoadingIcon } from '../assets/icons/LoadingIcon';

function Loading() {
  return (
    <Flex align="center" justify="center" flexGrow="1">
      <LoadingIcon />
    </Flex>
  );
}

export default Loading;
