import styled from "styled-components";

interface IContainerProps {
  width?: string;
  primaryColor: string;
}

interface IIconHeaderFavoriteContent {
  typeCursor?: string;
}

export const Container = styled.div<IContainerProps>`
  width: ${(props) => props.width};
  height: 250px;
  padding: 1rem;

  .card {
    height: 100%;
    padding: 0.1rem;
    border-radius: 1.5rem;
    border: none;
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
  }
  .cardHeader {
    height: 15%;
    border: none;
    background: transparent;
  }
  .cardImg {
    height: 70%;
    object-fit: scale-down;
    transform: scale(0.9);
  }
  .cardFooter {
    height: 15%;
    border: none;
    background: transparent;
  }

  .cardTitle {
    color: ${(props) => props.theme.colors.white};
  }

  .css-1tbm5ru-MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root:hover {
    background-color: transparent;
  }
`;

export const CardHeader = styled.div`
  display: flex;
`;

export const ContentFooter = styled.div`
  display: flex;
`;

export const ContentHeader = styled.div`
  display: flex;
`;

export const IconHeaderFavoriteContainer = styled.div<IIconHeaderFavoriteContent>`
  margin-left: auto;

  cursor: ${(props) => (props.typeCursor ? props.typeCursor : "pointer")};
`;

export const SideLeftContentFooter = styled.div`
  width: 60%;
  display: flex;
`;

export const Amount = styled.div`
  width: 40%;
  margin-left: auto;
  font-size: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  color: ${(props) => props.theme.colors.white};

  & strong {
    margin-left: 0.5rem;
  }
`;

export const Seats = styled.div`
  width: 30%;
  display: flex;
  margin-right: 1rem;

  & p {
    margin-left: 0.5rem;
  }
`;
export const Gears = styled.div`
  width: 30%;
  display: flex;

  & strong {
    margin-left: 0.5rem;
  }
`;

export const CardContent = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageContent = styled.div`
  width: 75%;
  height: 90%;
  max-width: 250px;
  position: relative;
`;
