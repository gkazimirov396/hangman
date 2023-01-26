import styled from 'styled-components';

export const StyledKeyboard = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(75px, 1fr));
  gap: 0.5rem;
`;

export const KeyboardContainer = styled.div`
  align-self: stretch;
`;
