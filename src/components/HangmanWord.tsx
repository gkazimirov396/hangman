import type { FC } from 'react';

import { Letter } from '../styles/Letter.styled';
import { LetterContainer } from '../styles/LetterContainer.styled';
import { WordContainer } from '../styles/WordContainer.styled';

interface HangmanWordProps {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
}

const HangmanWord: FC<HangmanWordProps> = ({
  wordToGuess,
  guessedLetters,
  reveal = false,
}) => {
  return (
    <WordContainer>
      {wordToGuess.split('').map((letter, idx) => (
        <LetterContainer key={idx}>
          <Letter
            color={!guessedLetters.includes(letter) && reveal ? '#f00' : '#000'}
            isVisible={guessedLetters.includes(letter) || reveal}
          >
            {letter}
          </Letter>
        </LetterContainer>
      ))}
    </WordContainer>
  );
};

export default HangmanWord;
