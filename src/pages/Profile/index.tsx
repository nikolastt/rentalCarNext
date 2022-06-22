import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import AppBar from "../../components/AppBar";
import Dashboard from "../../components/Dashboard";
import IconInformation from "../../components/IconInformation";
import {
  ContentSectionAdvantage,
  PageHeader,
  SectionAdvantage,
  TitleSectionAdvantage,
} from "../../stylePages/stylesPageServices";

export default function UserProfile() {
  const session = useSession();

  if (session.data != null) {
    return (
      <>
        <AppBar />
        <PageHeader></PageHeader>

        {/* Aqui vai o dashboard */}
        <div>{/* <Dashboard /> */}</div>

        <SectionAdvantage>
          <TitleSectionAdvantage>Nossas Vantagens</TitleSectionAdvantage>
          <ContentSectionAdvantage>
            <IconInformation
              Title="+50 CARROS"
              Description="Mais de 50 carros com categorias diferentes"
              SrcImg="images/carro-eletrico.png"
            />

            <IconInformation
              Title="PREÇOS BAIXOS"
              Description="Promoções imperdíveis"
              SrcImg="images/low-price.png"
            />

            <IconInformation
              Title="SUPORTE 24 HORAS"
              Description="Suporte disponível 24 horas, para dúvidas."
              SrcImg="images/customer-service.png"
            />
          </ContentSectionAdvantage>
        </SectionAdvantage>
      </>
    );
  } else {
    return (
      <>
        <AppBar />
        <h1>Você não está logado.</h1>
      </>
    );
  }
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
    props: {},
  };
};
