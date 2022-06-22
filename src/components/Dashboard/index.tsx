import { Avatar } from "@mui/material";
import { collection, getDoc, getDocs, query } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { Card } from "react-bootstrap";
import { db } from "../../firebase";
import { CardContent, ContentHeader } from "../Cards/styles";

// import { Container } from "./styles";

const Dashboard: React.FC = () => {
  const { data: session } = useSession();

  const getPerfil = async () => {
    const personalRef = collection(db, "personal_info");
    const q = query(personalRef);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  getPerfil();

  return (
    <>
      <Avatar
        sx={{ width: 220, height: 220 }}
        src={session?.user?.image?.toString()}
      />
      <Card className="card">
        <Card.Text></Card.Text>
      </Card>
    </>
  );
};

export default Dashboard;
