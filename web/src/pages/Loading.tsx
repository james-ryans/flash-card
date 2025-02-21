import { Container, Flex } from '@radix-ui/themes';
import { LoadingIcon } from '../assets/icons/LoadingIcon';

function Loading() {
  return (
    <Flex align="center" justify="center" className='h-screen'>
      <LoadingIcon />
    </Flex>
  );
}

export default Loading;
