import styled from "styled-components";

export const Container = styled.div``;

export const Content = styled.div`
  height: calc(100vh - 10rem);
  width: 100%;
  display: flex;
`;

export const SideRight = styled.div`
  width: 50%;
`;

export const ContentImage = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 1.5rem;

  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.info};

  background-image: linear-gradient(120deg, #101010 0%, #ee7116 100%);

  background: rgba(238, 113, 22, 0.05);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 1);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
`;

export const SizeImage = styled.div`
  position: relative;
  width: 75%;
  height: 60%;
`;
