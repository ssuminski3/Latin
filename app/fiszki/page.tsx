"use client";

import Fiszka from "../ui/fiszka";
import ProgressBar from "../ui/progressBar";
import { getAllWordsRandom } from '../lib/get_data';
import { useEffect, useState } from "react";
import { WordType } from "../lib/definitions";

export default function Home() {
  const [words, setWords] = useState<WordType[]>([]); // All words
  const [good, setGood] = useState<number[]>([]);
  const [ok, setOk] = useState<number[]>([]);
  const [bad, setBad] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const fetchedWords = await getAllWordsRandom();
        setWords(fetchedWords);
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };

    fetchWords();
  }, []);

  // Function to calculate the next word index based on weights.
  const getNextIndex = () => {
    let totalWeight = 0;
    const weights = words.map((_, i) => {
      let weight = 0;
      if (bad.includes(i)) {
        weight = 3;
      } else if (ok.includes(i)) {
        weight = 2;
      } else if (good.includes(i)) {
        weight = 1;
      } else {
        // Unrated words get a default weight.
        weight = 2;
      }
      totalWeight += weight;
      return weight;
    });

    const rand = Math.random() * totalWeight;
    let cumulative = 0;
    for (let i = 0; i < weights.length; i++) {
      cumulative += weights[i];
      if (rand < cumulative) {
        return i;
      }
    }
    return 0;
  };

  const handleWordResponse = (response: 'good' | 'ok' | 'bad') => {
    switch (response) {
      case 'good':
        setGood(prev => [...prev.filter(item => item !== currentIndex), currentIndex]);
        setOk(prev => prev.filter(item => item !== currentIndex));
        setBad(prev => prev.filter(item => item !== currentIndex));
        break;
      case 'ok':
        setOk(prev => [...prev.filter(item => item !== currentIndex), currentIndex]);
        setGood(prev => prev.filter(item => item !== currentIndex));
        setBad(prev => prev.filter(item => item !== currentIndex));
        break;
      case 'bad':
        setBad(prev => [...prev.filter(item => item !== currentIndex), currentIndex]);
        setGood(prev => prev.filter(item => item !== currentIndex));
        setOk(prev => prev.filter(item => item !== currentIndex));
        break;
    }

    // Pick the next word using the weighted random algorithm.
    setCurrentIndex(getNextIndex());
  };

  // Don't render until words are loaded
  if (words.length === 0) {
    return <div>Loading...</div>;
  }

  const currentWord = words[currentIndex];
  const rand = Math.round(Math.random() * 100) % 2 === 1;
  return (
    <div className="w-full h-screen p-4 sm:p-6 md:p-8 lg:p-10 m-auto">
      <div className="w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5 m-auto text-center h-full">
        <ProgressBar good={good.length} ok={ok.length} bad={bad.length} />
        <Fiszka
          verse={rand ? currentWord.latin : currentWord.polish}
          reverse={!rand ? currentWord.latin : currentWord.polish}
        />
        <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-2 justify-center mt-6">
          <button
            onClick={() => handleWordResponse('good')}
            className="text-white text-lg sm:text-xl bg-green-600 p-2 rounded-3xl w-full sm:w-1/3"
          >
            Zapamiętany
          </button>
          <button
            onClick={() => handleWordResponse('ok')}
            className="text-white text-lg sm:text-xl bg-yellow-600 p-2 rounded-3xl w-full sm:w-1/3"
          >
            Muszę poćwiczyć
          </button>
          <button
            onClick={() => handleWordResponse('bad')}
            className="text-white text-lg sm:text-xl bg-red-600 p-2 rounded-3xl w-full sm:w-1/3"
          >
            Nie Zapamiętany
          </button>
        </div>
      </div>
    </div>
  );
}
