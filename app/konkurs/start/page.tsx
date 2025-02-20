"use client";

import "@/app/globals.css";
import Question from "@/app/ui/question";
import { useState, useEffect } from "react";
import { WordType } from "@/app/lib/definitions";
import { getWordsForCompetition, getFillerWords } from "@/app/lib/get_data";
import Link from "next/link";
import { useScore } from "@/app/context/scoreContext";
import LoadingSpinner from "@/app/ui/loadingSpinner";
import { generateToken } from "@/app/lib/tokenUtils"; // Server function

export default function Home() {
  const { score, setScore } = useScore();

  const [goodAns, setGoodAns] = useState<WordType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string>()

  useEffect(() => {
    const fetchQuestions = async () => {
      const words = await getWordsForCompetition();
      setGoodAns(words);
      const t = await generateToken(); // Only runs server-side
      setToken(t);
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (goodAns.length === 0) return;
    const fetchOptions = async () => {
      setIsLoading(true);
      try {
        const correctLatin = goodAns[currentIndex].latin;
        const fillerWords = await getFillerWords(correctLatin);
        const latinWords = fillerWords.map((item: { latin: string; }) => item.latin);
        const options = shuffleArray([...latinWords, correctLatin]);
        setCurrentOptions(options);
        setSelectedAnswer("");
        setIsAnswerChecked(false);
        setStartTime(Date.now());
      } catch (error) {
        console.error("Error fetching filler words:", error);
      }
      finally {
        setIsLoading(false)
      }
    };
    fetchOptions();
  }, [goodAns, currentIndex]);

  // Simple array shuffling.
  function shuffleArray(array: string[]) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const onAnswer = (selected: string) => {
    setSelectedAnswer(selected);
  };

  const checkAnswer = () => {
    if (!selectedAnswer) return;
    const correctLatin = goodAns[currentIndex].latin;
    const answerIsCorrect = selectedAnswer === correctLatin;
    setIsCorrect(answerIsCorrect);
    setIsAnswerChecked(true);
    if (answerIsCorrect) {
      const timeTaken = Math.ceil((Date.now() - startTime) / 1000);
      const multiplier = Math.max(11 - timeTaken, 1);
      setScore((prev: number) => prev + 10 * multiplier);
    }
  };

  const goToNextQuestion = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const isLastQuestion = goodAns.length > 0 && currentIndex === goodAns.length - 1;

  return (
    <div className="w-full h-screen p-1 m-auto flex justify-center items-center">
      <div className="m-auto text-center w-full max-w-2xl">
        <div className="lg:m-10 md:text-xl lg:text-3xl text-white rounded-3xl p-10 bg-gradient-to-r from-slate-900 to-slate-950">
          {isLoading ?
            <LoadingSpinner /> :
            <div>
              <Question
                odpowiedzi={currentOptions}
                onAnswer={onAnswer}
                question={goodAns[currentIndex].polish}
              />

              {isAnswerChecked ? (
                <div>
                  <p
                    className={`lg:text-2xl md:text-lg lg:max-h-[50px] md:max-h-[100px] flex items-center justify-center ${isCorrect ? "text-lime-500" : "text-red-600"
                      }`}
                  >
                    {isCorrect
                      ? `Poprawna odpowiedź! Wynik: ${score}`
                      : `Zła odpowiedź. Poprawna odpowiedź to: ${goodAns[currentIndex].latin}`}
                  </p>
                  {isLastQuestion ? (
                    <Link href={`/konkurs/start/wynik?token=${token}`}>
                      <button className="bg-green-800 p-1 m-10 rounded-3xl w-4/6">
                        Zakończ
                      </button>
                    </Link>
                  ) : (
                    <button
                      className="bg-green-800 p-1 m-10 rounded-3xl w-4/6"
                      onClick={goToNextQuestion}
                    >
                      Dalej
                    </button>
                  )}
                </div>
              ) : (
                <button
                  className="bg-green-800 p-1 m-10 rounded-3xl w-4/6"
                  onClick={checkAnswer}
                >
                  Sprawdź
                </button>
              )}</div>}
        </div>
      </div>
    </div>
  );
}
