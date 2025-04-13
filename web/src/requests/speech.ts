import { getUri } from './common';

function speechUri(text: string): string {
  return getUri('/speech', {
    text: text,
  });
}

export { speechUri };
