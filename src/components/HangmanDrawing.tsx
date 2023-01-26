import type { FC } from 'react';

import { BODY_PARTS } from '../styles/BodyParts.styled';
import { DrawingContainer } from '../styles/DrawingContainer.styled';
import {
  LowBar,
  Tail,
  TopBar,
  VerticalBar,
} from '../styles/GallowsParts.styled';

const HangmanDrawing: FC<{ guesses: number }> = ({ guesses }) => {
  return (
    <DrawingContainer>
      {BODY_PARTS.slice(0, guesses).map((Item, idx) => (
        <Item key={idx} />
      ))}
      <Tail />
      <TopBar />
      <VerticalBar />
      <LowBar />
    </DrawingContainer>
  );
};

export default HangmanDrawing;
