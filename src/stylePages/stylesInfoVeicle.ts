import styled, { css } from "styled-components";

interface IContentImage {
  primaryColor: string;
}

export const Container = styled.div``;

export const Content = styled.div`
  height: calc(100vh - 10rem);
  width: 100%;
  display: flex;
  margin-top: 1rem;
`;

export const ContainerImage = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SideRight = styled.div`
  width: 50%;
  margin-left: 1rem;
  padding: 0.5rem;
`;
export const ContentImage = styled.div<IContentImage>`
  position: relative;
  width: 80%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 1.5rem;

  overflow: hidden;
  border: 1px solid ${(props) => props.primaryColor};

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

export const SizeImage = styled.div`
  position: relative;
  width: 85%;
  height: 75%;
`;

export const CheckBoxArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 25%;
`;

export const DatesContainer = styled.div`
  height: 35%;
`;

export const Footer = styled.div`
  width: 100%;

  height: 20%;
`;

export const Title = styled.div`
  height: 10%;
`;

export const FooterTitle = styled.h2`
  display: flex;
  width: 100%;

  & span {
    margin-left: auto;
  }
`;
