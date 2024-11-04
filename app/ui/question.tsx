"use client";

import '@/app/globals.css'

export default function Question() {
    const odpowiedzi: string[] = [
        "Ona", "On", "Ono", "vf", "jff", "hid", "jf", "hduof", "ff", "oik"
    ]
    return (
        <div>
            <p>Question</p>
            <div className="text-left contain m-50">
                {odpowiedzi.map((e: string) => {
                    return (
                        <label className="contain m-10" key={e}>
                            <p className="text-5xl">{e}</p>
                            <input type="radio" name="radio" />
                            <span className="checkmark"></span>
                        </label>
                    )
                })}
            </div>
        </div>
    );
}
