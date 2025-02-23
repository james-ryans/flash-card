import { Container, Flex, Text } from '@radix-ui/themes';
import { useSprings, animated, to as interpolate } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import React from 'react';
import { useClient } from '../hooks/useClient';
import { recent, RecentResponse } from '../requests/recent';
import { AxiosResponse } from 'axios';
import Loading from './Loading';

const to = (i: number) => ({
  x: 0,
  y: i * -2.5,
  scale: 1,
  rotateY: 0,
  delay: i * 100,
});
const from = (_i: number) => ({ x: 0, rotateY: 0, scale: 1.5, y: -1000 });

const trans = (rotateY: number, scale: number) => `perspective(1500px) rotateY(${rotateY}deg) scale(${scale})`;

function FlashCard() {
  const { isIdle, isLoading, data, update } = useClient<{ front: string; back: string }[]>();

  React.useEffect(() => {
    update(
      recent().then((response: AxiosResponse<RecentResponse>) => {
        return response.data.data.map((recent) => ({
          front: recent.text,
          back: recent.translation,
        }));
      }),
    );
  }, []);

  const cards = data ?? [];
  let flip = false;
  const gone = new Set<number>(); // The set flags all the cards that are flicked out
  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity[0] > 0.2; // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
    if (!down) {
      // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      if (trigger) {
        gone.add(index);
        flip = false;
      } else if (mx === 0) {
        flip = !flip;
      }
    }
    api.start((i) => {
      if (index !== i) return; // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index);
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
      const rotateY = flip ? 180 : 0;
      const scale = down ? 1.1 : 1; // Active cards lift up a bit
      return {
        x,
        rotateY,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      };
    });
    if (!down && gone.size === cards.length) {
      setTimeout(() => {
        gone.clear();
        api.start((i) => to(i));
      }, 600);
    }
  });

  if (isIdle || isLoading) {
    return <Loading />;
  }

  return (
    <Container width="100vw" height="calc(100vh - 52px)" className="overflow-x-hidden">
      <Flex height="100%" justify="center" align="center" className="relative">
        {props.map(({ x, y, rotateY, scale }, i) => (
          <animated.div
            key={i}
            style={{ x, y }}
            className="absolute flex h-[160px] w-[400px] touch-none items-center justify-center will-change-transform"
          >
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
    </Container>
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
