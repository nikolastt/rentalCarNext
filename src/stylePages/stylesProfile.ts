import styled from "styled-components";

interface ISideLeft {
  primaryColor: string;
}

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 8rem);
  display: flex;
  align-items: center;

  padding: 2rem;
`;

export const SideLeft = styled.div<ISideLeft>`
  width: 30%;
  background-color: red;
  height: 90%;

  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3%;

  border: 1px solid ${(props) => props.primaryColor};

  background-image: linear-gradient(
    120deg,
    #101010 10%,
    ${(props) => props.primaryColor} 1000%
  );

  & h3 {
    margin-top: 2rem;
  }
`;

export const ContentImage = styled.div`
  position: relative;
  width: 176px;
  height: 176px;
  border-radius: 50%;
  overflow: hidden;
  margin-top: 3rem;
`;

export const SideRight = styled.div`
  padding: 2rem;
  width: 70%;
  height: 80%;
`;
