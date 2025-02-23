import { Box, Flex, Kbd, Table, Text } from '@radix-ui/themes';
import {
  useSprings,
  animated,
  to as interpolate,
  SpringValue,
  SpringRef,
} from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import React from 'react';
import { useClient } from '../hooks/useClient';
import { recent, RecentResponse } from '../requests/recent';
import { AxiosResponse } from 'axios';
import Loading from './Loading';

type CardSpringValue = {
  x: SpringValue<number>;
  y: SpringValue<number>;
  scale: SpringValue<number>;
  rotateY: SpringValue<number>;
};

type CardSpringProps = {
  x: number;
  y: number;
  scale: number;
  rotateY: number;
};

type CardProps = {
  front: string;
  back: string;
}

const to = (i: number) => ({
  x: 0,
  y: i * -2.5,
  scale: 1,
  rotateY: 0,
  delay: i * 100,
});
const from = (_i: number) => ({ x: 0, rotateY: 0, scale: 1.5, y: -1000 });

const trans = (rotateY: number, scale: number) => `perspective(1500px) rotateY(${rotateY}deg) scale(${scale})`;

const lift = (api: SpringRef<CardSpringProps>, id: number, x: number) => {
  api.start((i: number) => {
    if (i !== id) return;
    return {
      to: {
        x,
        scale: 1.1,
      },
      config: { friction: 50, tension: 800 },
    };
  });
};

const flip = (api: SpringRef<CardSpringProps>, id: number, props: CardSpringValue) => {
  api.start((i: number) => {
    if (i !== id) return;
    return {
      to: {
        x: 0,
        rotateY: props.rotateY.get() === 180 ? 0 : 180,
        scale: 1,
      },
      config: { friction: 50, tension: 500 },
    };
  });
};

const swipe = (api: SpringRef<CardSpringProps>, id: number, dir: number) => {
  api.start((i: number) => {
    if (i !== id) return;
    return {
      to: {
        x: (200 + window.innerWidth) * dir,
        scale: 1,
      },
      config: { friction: 50, tension: 200 },
    };
  });
};

function FlashCard() {
  const { isIdle, isLoading, data, update } = useClient<CardProps[]>();
  const cards = data ?? [];
  const gone = React.useRef(0);

  React.useEffect(() => {
    update(
      recent().then((response: AxiosResponse<RecentResponse>): CardProps[] => {
        return response.data.data.map((recent) => ({
          front: recent.text,
          back: recent.translation,
        }));
      }),
    );
  }, []);

  const [props, api] = useSprings(cards.length, (i) => ({
    from: from(i),
    to: to(i),
  }));

  const bind = useDrag(({ args: [index], down, movement: [xMove], direction: [xDir], velocity: [xVel] }) => {
    const flick = xVel > 0.2;
    const dir = xDir < 0 ? -1 : 1;

    if (down) {
      lift(api, index, xMove);
      return;
    }

    if (!flick) {
      flip(api, index, props[index]);
      return;
    }

    swipe(api, index, dir);
    gone.current++;

    if (gone.current === cards.length) {
      setTimeout(() => {
        gone.current = 0;
        api.start((i) => ({
          to: to(i),
          delay: i * 100,
        }));
      }, 600);
    }
  });

  if (isIdle || isLoading) {
    return <Loading />;
  }

  return (
    <Flex flexGrow="1" direction="column" justify="center" className="overflow-hidden">
      <Flex width="100%" height="200px" justify="center" align="center" className="relative">
        {props.map(({ x, y, rotateY, scale }, i) => (
          <animated.div key={i} style={{ x, y }} className="absolute flex h-40 w-100 touch-none will-change-transform">
            <Card>
              <animated.div {...bind(i)} style={{ transform: interpolate([rotateY, scale], trans) }}>
                <Text size="9" color="gray" highContrast>
                  {cards[i].front}
                </Text>
              </animated.div>
            </Card>
            <Card>
              <animated.div {...bind(i)} style={{ transform: interpolate([rotateY.to((r) => 180 - r), scale], trans) }}>
                <Text size="9" color="gray">
                  {cards[i].back}
                </Text>
              </animated.div>
            </Card>
          </animated.div>
        ))}
      </Flex>
      <Box mx="auto" width="fit-content">
        <Table.Root>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Text size="1">Flip</Text>
              </Table.Cell>
              <Table.Cell justify="end">
                <Text color="gray" size="1">
                  Left-click
                </Text>
              </Table.Cell>
              <Table.Cell justify="end">
                <Kbd>Space</Kbd>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Text size="1">Next card</Text>
              </Table.Cell>
              <Table.Cell justify="end">
                <Text color="gray" size="1">
                  Swipe left/right
                </Text>
              </Table.Cell>
              <Table.Cell justify="end">
                <Kbd>←</Kbd>
                <Text color="gray" size="1">
                  {' '}
                  or{' '}
                </Text>
                <Kbd>→</Kbd>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Box>
    </Flex>
  );
}

function Card({ children }: React.PropsWithChildren) {
  return (
    <Flex
      position="absolute"
      height="100%"
      width="100%"
      justify="center"
      align="center"
      className="touch-none bg-gray-50 shadow-lg backface-hidden select-none"
      asChild
    >
      {children}
    </Flex>
  );
}

export default FlashCard;
