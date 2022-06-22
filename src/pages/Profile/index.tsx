<<<<<<< HEAD
import { GetStaticProps } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Script from "next/script";
import AppBar from "../../components/AppBar";
import IconInformation from "../../components/IconInformation";
import {
  ContentSectionAdvantage,
  PageHeader,
  SectionAdvantage,
  TitleSectionAdvantage,
} from "../../stylePages/stylesPageServices";
=======
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import Script from "next/script"
import AppBar from "../../components/AppBar"
import Dashboard from "../../components/Dashboard"
import IconInformation from "../../components/IconInformation"
import { ContentSectionAdvantage, PageHeader, SectionAdvantage, TitleSectionAdvantage } from "../../stylePages/stylesPageServices"
>>>>>>> e75e80c47902b18113c1b16aa35a681df8110001


export default function UserProfile() {
<<<<<<< HEAD
  //const router = useRouter()

  return (
    <>
      <AppBar />
      <PageHeader></PageHeader>
=======

        const session = useSession();

        if (session.data != null){
        return (
            <>    
            
                <AppBar />    
                <PageHeader>
                    
                </PageHeader>

                {/* Aqui vai o dashboard */}
                <div>
                    <Dashboard></Dashboard>
                </div>

>>>>>>> e75e80c47902b18113c1b16aa35a681df8110001

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

<<<<<<< HEAD
          <IconInformation
            Title="SUPORTE 24 HORAS"
            Description="Suporte disponível 24 horas, para dúvidas."
            SrcImg="images/customer-service.png"
          />
        </ContentSectionAdvantage>
      </SectionAdvantage>
    </>
  );
=======
                    <IconInformation
                    Title="SUPORTE 24 HORAS"
                    Description="Suporte disponível 24 horas, para dúvidas."
                    SrcImg="images/customer-service.png"
                    />
                </ContentSectionAdvantage>
                </SectionAdvantage>
            </>
        )
        } else {
            return (
                <>
                <AppBar /> 
                <h1>Você não está logado.</h1>
                </>
            )
        }
>>>>>>> e75e80c47902b18113c1b16aa35a681df8110001
}

export const getStaticProps: GetStaticProps = async (context) => {
  const session = await getSession();

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
      user,
    },
  };
};
