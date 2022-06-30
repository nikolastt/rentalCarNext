import styled from "styled-components";

interface IPrimaryColor {
  primaryColor: string;
}

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 7rem);
  display: flex;
  overflow-y: hidden;
`;

export const SideLeft = styled.div`
  width: 50%;
  height: 100%;
  border-radius: 0.5rem;
`;
export const ContainerUp = styled.div`
  width: 100%;
  height: 50%;
  padding: 2rem;
`;

export const ContentUp = styled.div<IPrimaryColor>`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.primaryColor};
  background-image: linear-gradient(
    120deg,
    #101010 10%,
    ${(props) => props.primaryColor} 1000%
  );
  border-radius: 0.5rem;
`;
export const ContainerDownLeft = styled.div`
  width: 50%;
  height: 50%;
  padding: 2rem;
`;

export const ContainerDownRight = styled.div`
  width: 50%;
  height: 50%;
  padding: 2rem;
`;

export const ContentDownLeft = styled.div<IPrimaryColor>`
  width: 100%;
  height: 100%;
  border: 1px solid ${(props) => props.primaryColor};

  background-image: linear-gradient(
    120deg,
    #101010 10%,
    ${(props) => props.primaryColor} 1000%
  );
  border-radius: 0.5rem;
`;
export const ContentDownRight = styled.div<IPrimaryColor>`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.primaryColor};

  background-image: linear-gradient(
    120deg,
    #101010 10%,
    ${(props) => props.primaryColor} 1000%
  );
`;

export const ContainerDown = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const SideRight = styled.div`
  width: 50%;
  height: 100%;
  padding: 2rem;
`;

export const SideRightContent = styled.div<IPrimaryColor>`
  width: 100%;
  height: 100%;
  padding: 1rem;
  border: 1px solid ${(props) => props.primaryColor};
  background-image: linear-gradient(
    120deg,
    #101010 10%,
    ${(props) => props.primaryColor} 1000%
  );
  border-radius: 0.5rem;
`;

export const Title = styled.p`
  text-align: center;
`;
