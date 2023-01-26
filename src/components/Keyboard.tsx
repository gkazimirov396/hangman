import type { FC } from 'react';

import { StyledButton } from '../styles/Button.styled';
import { StyledKeyboard } from '../styles/Keyboard.styled';
import { KEYS } from '../utils/keys';

interface KeyboardProps {
  disabled?: boolean;
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
}

const Keyboard: FC<KeyboardProps> = ({
  activeLetters,
  addGuessedLetter,
  inactiveLetters,
  disabled = false,
}) => {
  return (
    <StyledKeyboard>
      {KEYS.map(key => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);

        return (
          <StyledButton
            key={key}
            isActive={isActive}
            isInActive={isInactive}
            onClick={() => addGuessedLetter(key)}
            disabled={isActive || isInactive || disabled}
          >
            {key}
          </StyledButton>
        );
      })}
    </StyledKeyboard>
  );
};

export default Keyboard;
