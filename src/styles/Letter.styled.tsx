import styled from 'styled-components';

interface LetterProps {
  color: string;
  isVisible?: boolean;
}

export const Letter = styled.span<LetterProps>`
  color: ${({ color }) => color};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;
