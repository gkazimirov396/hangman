import styled, { css } from 'styled-components';

interface ButtonProps {
  isActive?: boolean;
  isInActive?: boolean;
}

export const StyledButton = styled.button<ButtonProps>`
  width: 100%;
  border: 3px solid #000;
  background-color: transparent;
  aspect-ratio: 1 / 1;
  font-size: 2.5rem;
  text-transform: uppercase;
  padding: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  color: #000;
  transition: all 100ms ease-out;

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: hsl(200, 100%, 50%);
      border-color: #000;
      color: #fff;
    `}

  ${({ isInActive }) =>
    isInActive &&
    css`
      opacity: 0.3;
      border-color: #ccc;
      background-color: #eee;
      cursor: not-allowed;
    `}

  &:where(:hover, :focus):not(:disabled) {
    background-color: hsl(200, 100%, 75%);
    color: #fff;
  }
`;
