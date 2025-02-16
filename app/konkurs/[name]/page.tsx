"use client";

import "@/app/globals.css";
import Question from "@/app/ui/question";
import { useState, useEffect } from "react";
import { WordType } from "@/app/lib/definitions";
import { getWordsForCompetition, getFillerWords } from "@/app/lib/get_data";
import Link from "next/link";
import { useScore } from "@/app/context/scoreContext";
import { usePathname } from "next/navigation";

export default function Home() {
  const { score, setScore } = useScore();
  const pathname = usePathname();

  const [goodAns, setGoodAns] = useState<WordType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const fetchQuestions = async () => {
      const words = await getWordsForCompetition();
      setGoodAns(words);
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (goodAns.length === 0) return;
    const fetchOptions = async () => {
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
    <div className="w-full h-full p-10 m-auto flex justify-center items-center">
      <div className="2xl:w-2/5 m-auto text-center">
        <div className="max-lg:m-10 text-3xl text-white rounded-3xl p-10 sm:p-20 bg-gradient-to-r from-slate-900 to-slate-950">
          {goodAns.length > 0 ? (
            <Question
              odpowiedzi={currentOptions}
              onAnswer={onAnswer}
              question={goodAns[currentIndex].polish}
            />
          ) : (
            <p>Ładowanie pytań...</p>
          )}

          {isAnswerChecked ? (
            <div>
              <p
                className={`p-10 text-2xl min-h-[100px] flex items-center justify-center ${
                  isCorrect ? "text-lime-500" : "text-red-600"
                }`}
              >
                {isCorrect
                  ? `Poprawna odpowiedź! Score: ${score}`
                  : `Zła odpowiedź. Poprawna odpowiedź to: ${goodAns[currentIndex].latin}`}
              </p>
              {isLastQuestion ? (
                <Link href={pathname+"/wynik"}>
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
          )}
        </div>
      </div>
    </div>
  );
}
