import styled from "styled-components";

interface IContainerProps {
  primaryColor: string;
}

export const Container = styled.div<IContainerProps>`
  width: 20%;
  height: 100%;

  border-radius: 1.5rem;
  margin-top: 1rem;
  margin-left: 1rem;
  padding: 1rem;

  background-image: linear-gradient(
    120deg,
    #101010 10%,
    ${(props) => props.primaryColor} 1000%
  );

  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 1);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
`;

export const Title = styled.p`
  font-weight: 900;
`;
