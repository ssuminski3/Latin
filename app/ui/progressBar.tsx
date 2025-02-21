import { wordCount } from "../lib/get_data";
import { useState, useEffect } from "react";
type ProgressBarParams = {
    good: number,
    ok: number,
    bad: number
}

export default function ProgressBar({good, ok, bad}: ProgressBarParams) {
    const [wordsCount, setWordsCount] = useState(0)
    useEffect(() => {
        const fetchWordsCount = async () => {
          try {
            const words = await wordCount();
            setWordsCount(words);
            console.log(words)
          } catch (error) {
            console.error("Error fetching words:", error);
          }
        };
    
        fetchWordsCount();
      }, []);
    return (
          <div className="bg-slate-900 w-full rounded-full h-3 flex">
            <div className="bg-green-600 rounded-full h-3" style={{width: `${good/wordsCount*100}%`}}></div>
            <div className="bg-yellow-600 w-1/5 rounded-full h-3" style={{width: `${ok/wordsCount*100}%`}}></div>
            <div className="bg-red-600 w-1/5 rounded-full h-3" style={{width: `${bad/wordsCount*100}%`}}></div>
          </div>
    );
  }