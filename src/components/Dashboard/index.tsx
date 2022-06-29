import { Avatar, CardActions, CardHeader, CardMedia, Divider, Grid, IconButton, IconButtonProps, List, ListItem, ListItemText, styled, Typography } from "@mui/material";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { Card, Col, Collapse, ListGroup, Row, Container } from "react-bootstrap";
import { db } from "../../firebase";
import { CardContent, ContentHeader } from "../Cards/styles";
// Icons
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


//import * as React from "react";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { userInfo } from "os";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Dashboard: React.FC = () => {

  // PieChart
  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const { data: session } = useSession();

  const getPerfil = async () => {
    const q = query(collection(db, "personal_info"));
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
    });
  }
  
  const getCarType = async () => {
    const q = query(collection(db, "RentedCars"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (session?.id === doc.data().userId) {
        console.log(doc.data());

      }
      // doc.data() is never undefined for query doc snapshots
});
  }

  const editUser = async () => {
    const q = query(collection(db, "personal_info"));

    const querySnapshot = await getDocs(q);
  }

  const setEmail = async () => {

    const emailRef = doc(db, "personalInfo");

    await setDoc(emailRef, {merge: true}), {
      email: "Los Angeles",
    };
  }

  getCarType()
  
  getPerfil();
  

// Expand 
  const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  return (
    <>
      <Container>

      <Grid container spacing={2}>
      <Grid item xs={6}>
        <Avatar
          sx={{ width: 220, height: 220 }}
          src={session?.user?.image?.toString()}
        />
      </Grid>

      {/* Datas */}
      <Grid item xs={3}>
        Quantidade de carros alugados
        <div style={{height: "400px", width: "400px"}}>
        <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      </div>
      </Grid>

      <Grid item xs={3}>
        Tipo de carros alugados
      </Grid>

      </Grid>
      
      {/* Dados do cliente */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
       <Grid item xs={3} lg={2} md={4}>
        <List>
          <ListItem>
            <ListItemText primary="Nome" secondary={"getEmail()"} />
            <IconButton edge="end" aria-label="edit" onClick={() => editUser()}>
              <EditIcon/>
            </IconButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Email" secondary={"getEmail()"} />
            <IconButton edge="end" aria-label="edit" >
              <EditIcon/>
            </IconButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Telefone" secondary={"getEmail()"} />
            <IconButton edge="end" aria-label="edit" >
              <EditIcon/>
            </IconButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Localização" secondary={"getEmail()"} />
            <IconButton edge="end" aria-label="edit" >
              <EditIcon/>
            </IconButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Email" secondary={"getEmail()"} />
            <IconButton edge="end" aria-label="edit" >
              <EditIcon/>
            </IconButton>
          </ListItem>
          <Divider />
        </List>
      </Grid>

      {/* Dados atuais */}
      <Grid item xs={4} lg={8} md={4}>
      <Card >
      <CardHeader
      // Nome do carro
        title="Shrimp and Chorizo Paella"
      // Informação adicional
        subheader="September 14, 2016"
      />

        {/* Imagem dos carros aqui */}

      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          
        </CardContent>
      </Collapse>
    </Card>
      </Grid>
      </Grid>
    </Container>
    </>
  );
}

export default Dashboard;

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

  const q = query(collection(db, "accounts"));


  return {
    props: {
      user,
    },
  };
};
