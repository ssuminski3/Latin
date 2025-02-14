"use client";

import Fiszka from "../ui/fiszka";
import ProgressBar from "../ui/progressBar";

export default function Home() {
    return (
        <div className="w-full h-full p-4 sm:p-6 md:p-8 lg:p-10 m-auto">
            <div className="w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5 m-auto text-center h-full">
                <ProgressBar good={50} ok={8} bad={10} />
                <Fiszka verse="Hello" reverse="Cześć" />
                <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-2 justify-center mt-6">
                    <button className="text-white text-lg sm:text-xl bg-green-600 p-2 rounded-3xl w-full sm:w-1/3">
                        Zapamiętany
                    </button>
                    <button className="text-white text-lg sm:text-xl bg-yellow-600 p-2 rounded-3xl w-full sm:w-1/3">
                        Muszę poćwiczyć
                    </button>
                    <button className="text-white text-lg sm:text-xl bg-red-600 p-2 rounded-3xl w-full sm:w-1/3">
                        Nie Zapamiętany
                    </button>
                </div>
            </div>
        </div>
    );
}