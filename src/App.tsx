import { useCallback, useEffect, useState } from 'react';

import ReactConfetti from 'react-confetti';
import Swal from 'sweetalert2';

import HangmanDrawing from './components/HangmanDrawing';
import HangmanWord from './components/HangmanWord';
import Keyboard from './components/Keyboard';
import { MainContainer } from './styles/Container.styled';
import { KeyboardContainer } from './styles/Keyboard.styled';
import { WORDS } from './utils/wordList';

const getRandomWord = () => {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
};

const App = () => {
  const [word, setWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const activeLetters = guessedLetters.filter(letter => word.includes(letter));
  const incorrectLetters = guessedLetters.filter(
    letter => !word.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = word
    .split('')
    .every(letter => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters(currentLetters => [...currentLetters, letter]);
    },
    [guessedLetters, isLoser, isWinner]
  );

  useEffect(() => {
    const keyPressHandler = (event: KeyboardEvent) => {
      const key = event.key;

      if (!key.match(/^[a-z]$/)) return;

      event.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener('keypress', keyPressHandler);

    return () => {
      document.removeEventListener('keypress', keyPressHandler);
    };
  }, [guessedLetters, addGuessedLetter]);

  useEffect(() => {
    const keyPressHandler = (event: KeyboardEvent) => {
      const key = event.key;

      if (key !== 'Enter') return;

      event.preventDefault();
      Swal.clickConfirm();
      setGuessedLetters([]);
      setWord(getRandomWord());
    };

    document.addEventListener('keypress', keyPressHandler);

    return () => {
      document.removeEventListener('keypress', keyPressHandler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    if (isLoser) {
      Swal.fire('Nice Try!', 'Click "Enter" to try again.', 'error');
    }

    if (isWinner) {
      Swal.fire('Great Job!', 'Click "Enter" to try again.', 'success');
    }
  }, [isLoser, isWinner]);

  return (
    <MainContainer>
      {isWinner && <ReactConfetti />}
      <HangmanDrawing guesses={incorrectLetters.length} />
      <HangmanWord
        guessedLetters={guessedLetters}
        wordToGuess={word}
        reveal={isLoser}
      />
      <KeyboardContainer>
        <Keyboard
          activeLetters={activeLetters}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
          disabled={isLoser || isWinner}
        />
      </KeyboardContainer>
    </MainContainer>
  );
};

export default App;
