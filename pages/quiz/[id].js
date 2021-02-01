/* eslint-disable react/prop-types */
/* eslint-disable quotes */
import React from "react";
import { ThemeProvider } from "styled-components";
import QuizScreen from "../../src/screens/Quiz";

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>
    /* <pre style={{ color: "black" }}>
        {JSON.stringify(dbExterno.questions, null, 4)}
      </pre> */
  );
}

export async function getServerSideProps(context) {
  const [projectName, gitHubUser] = context.query.id.split("___");
  const dbExterno = await fetch(
    `https://${projectName}.${gitHubUser}.vercel.app/api/db`
  ).then((respostaDoServer) => {
    if (respostaDoServer.ok) {
      return respostaDoServer.json();
    }

    throw new Error("Falha em pegar os dados");
  });

  return {
    props: { dbExterno },
  };
}
