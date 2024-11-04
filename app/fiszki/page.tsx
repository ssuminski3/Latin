"use client";

import Fiszka from "../ui/fiszka";
import ProgressBar from "../ui/progressBar";

export default function Home() {
    return (
        <div className="w-full h-full p-10 m-auto">
            <div className="2xl:w-2/5 m-auto text-center">
                <ProgressBar good={50} ok={8} bad={10}/>
                <Fiszka verse="Hello" reverse="Cześć" />
                <div className="w-full">
                    <button className="text-white text-3xl bg-green-600 p-2 rounded-3xl w-1/3">Zapamiętany</button>
                    <button className="text-white text-3xl bg-yellow-600 p-2 rounded-3xl w-1/3">Muszę poćwiczyć</button>
                    <button className="text-white text-3xl bg-red-600 p-2 rounded-3xl w-1/3">Nie Zapamiętany</button>
                </div>
            </div>
        </div>
    );
}
