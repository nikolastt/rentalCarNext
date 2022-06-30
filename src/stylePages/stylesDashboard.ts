import styled from "styled-components";

interface IPrimaryColor {
  primaryColor: string;
}

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 8rem);
  display: flex;
`;

export const SideLeft = styled.div`
  width: 50%;
  height: 100%;
  border-radius: 0.5rem;
`;
export const ContainerUp = styled.div`
  width: 100%;
  height: 50%;
  padding: 1rem;
`;

export const ContentUp = styled.div`
  background-color: gold;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
`;
export const ContainerDownLeft = styled.div`
  width: 50%;
  height: 50%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`;

export const ContainerDownRight = styled.div`
  width: 50%;
  height: 50%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
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
export const ContentDownRight = styled.div`
  width: 100%;
  height: 100%;
  background-color: purple;
  border-radius: 0.5rem;
`;

export const ContainerDown = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const SideRight = styled.div`
  width: 50%;
  height: 100%;
  /* background-color: blue; */
`;
