/* eslint-disable quotes */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import db from "../../db.json";
import QuizBackground from "../../src/components/QuizBackground";
import QuizLogo from "../../src/components/QuizLogo";
import QuizContainer from "../../src/components/QuizContainer";
import Widget from "../../src/components/Widget";
import Button from "../../src/components/Button";
import AlternativesForm from "../../src/components/AlternativesForm";

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content>Loading....</Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResults,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de
           ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="description"
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativesForm
          onSubmit={(e) => {
            e.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResults(isCorrect);
              setIsQuestionSubmited(false);
              onSubmit();
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? "SUCCESS" : "ERROR";
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: "none" }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>{JSON.stringify(question, null, 4)}</pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: "QUIZ",
  LOADING: "LOADING",
  RESULT: "RESULT",
};

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        <p>Tela de Resultado</p>
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou{" "}
          {/* {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)}{" "} */}
          {results.filter((trueResults) => trueResults === true).length}{" "}
          perguntas, parabéns!
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${results}`}>
              #{index + 1} Resultado: {result === true ? "Acertou!" : "Errou!"}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const totalQuestions = db.questions.length;
  const [currenteQuestion, setCurrenteQuestion] = useState(0);
  const questionIndex = currenteQuestion;
  const question = db.questions[questionIndex];

  function addResults(result) {
    setResults([...results, result]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
    // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrenteQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResults={addResults}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} />
        )}
      </QuizContainer>
    </QuizBackground>
  );
}
