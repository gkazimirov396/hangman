import { useEffect, useState } from 'react';

import ReactConfetti from 'react-confetti';
import Swal from 'sweetalert2';

import HangmanDrawing from './components/HangmanDrawing';
import HangmanWord from './components/HangmanWord';
import Keyboard from './components/Keyboard';

import { WORDS } from './data/wordList';

import { useEventListener } from './hooks/useEventListener';

import { MainContainer } from './styles/Container.styled';
import { KeyboardContainer } from './styles/Keyboard.styled';

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
  const isGameOver = isLoser || isWinner;

  const addGuessedLetter = (letter: string) => {
    if (guessedLetters.includes(letter) || isGameOver) return;

    setGuessedLetters(currentLetters => [...currentLetters, letter]);
  };

  const keyPressHandler = (event: KeyboardEvent) => {
    const key = event.key;

    event.preventDefault();

    if (key === 'Enter' && (isGameOver || guessedLetters.length === 0)) {
      Swal.clickConfirm();

      setGuessedLetters([]);
      setWord(getRandomWord());
    }

    if (!key.match(/^[a-z]$/)) return;

    addGuessedLetter(key);
  };

  useEventListener('keypress', keyPressHandler);

  useEffect(() => {
    if (isLoser) {
      Swal.fire({
        title: 'Nice Try!',
        html: 'Click "Enter" to try again.',
        icon: 'error',
        timer: 2100,
      });
    }

    if (isWinner) {
      Swal.fire({
        title: 'Great Job!',
        html: 'Click "Enter" to try again.',
        icon: 'success',
        timer: 2100,
      });
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
          disabled={isGameOver}
        />
      </KeyboardContainer>
    </MainContainer>
  );
};

export default App;
