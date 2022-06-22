import { Avatar } from "@mui/material";
import { collection, getDoc, getDocs, query } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { Card } from "react-bootstrap";
import { db } from "../../firebase";
import { CardContent, ContentHeader } from "../Cards/styles";

// sx

interface ICardProps {
    width?: string;
  }


export default function Dashboard() {

    const { data: session } = useSession();


    //const q = query(collection(db, "personal_info"));
    //const querySnapshot = getDocs(q);
    

    return (
        <>
        <Avatar 
            sx={{width: 220, height: 220}}
            src={session.user?.image?.toString()}
        />
        <Card className="card">
        <Card.Text>
          
        </Card.Text>
        </Card>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req });
  
    if (!session) {
      return {
        redirect: {
          destination: "/notlogin",
          permanent: false,
        },
      };
    }
  
    const user = {
      name: session.user?.name,
      email: session.user?.email,
      image: session.user?.image,
      id: session.id,
    };

    return {
        props: {
          user
        },
      };
};
  