import { useState } from "react";

type ProgressBarParams = {
    good: number,
    ok: number,
    bad: number
}

export default function ProgressBar({good, ok, bad}: ProgressBarParams) {
    return (
          <div className="bg-slate-900 w-full rounded-full h-3 flex">
            <div className="bg-green-600 rounded-full h-3" style={{width: `${good/100*100}%`}}></div>
            <div className="bg-yellow-600 w-1/5 rounded-full h-3" style={{width: `${ok/100*100}%`}}></div>
            <div className="bg-red-600 w-1/5 rounded-full h-3" style={{width: `${bad/100*100}%`}}></div>
          </div>
    );
  }