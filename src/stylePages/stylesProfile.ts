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
  height: 90%;
  max-height: 500px;

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
    margin-top: 1rem;
    height: 20%;
  }

  & p {
    text-align: center;
    margin: 0;
    height: 20%;
  }

  Button {
    margin-top: 0.6rem;
    height: 20%;
  }
`;

export const ContentImage = styled.div`
  position: relative;
  min-width: 176px;
  min-height: 176px;
  border-radius: 50%;
  overflow: hidden;
  margin-top: 3rem;
`;

export const SideRight = styled.div`
  padding: 0 2rem 2rem 2rem;
  width: 70%;
  height: 80%;

  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-bottom: 2rem;
  }
`;
