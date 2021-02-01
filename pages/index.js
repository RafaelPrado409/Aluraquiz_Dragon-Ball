/* eslint-disable quotes */
import React, { useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import db from "../db.json";
import Widget from "../src/components/Widget/index";
import Link from "../src/components/Link";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";
import QuizBackground from "../src/components/QuizBackground";
import QuizLogo from "../src/components/QuizLogo";
import Input from "../src/components/Input";
import Button from "../src/components/Button";

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 560px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Head>
          <title> Alura Quiz </title>
        </Head>
        <Widget
          as={motion.section}
          variants={{
            show: { opacity: 1, rotate: 360, scale: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <Widget.Header>
            <h1> Dragon Ball Quiz </h1>
          </Widget.Header>
          <Widget.Content>
            <form
              onSubmit={(infosDoEvento) => {
                infosDoEvento.preventDefault();
                router.push(`/quiz?name=${name}`);
              }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Diz ai seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          variants={{
            show: { opacity: 1, rotate: 360, scale: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <Widget.Content>
            <h1> Quizes da Galera </h1>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, gitHubUser] = linkExterno
                  .replace(/\//g, "")
                  .replace("https:", "")
                  .replace(".vercel.app", "")
                  .split(".");

                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${gitHubUser}`}
                    >
                      {`${gitHubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/RafaelPrado409" />
    </QuizBackground>
  );
}
