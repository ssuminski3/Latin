"use client"

import Link from "next/link";

export default function Home() {
    return (
        <div className="w-full h-screen p-1 m-auto flex justify-center items-center">
            <div className="m-auto text-center w-full max-w-2xl">
                <div className="lg:m-10 md:text-xl lg:text-3xl text-white rounded-3xl p-10 bg-gradient-to-r from-slate-900 to-slate-950">
                    <h1 className="text-center text-6xl">Zasady</h1>
                    <ul className="text-left">
                        <li>Im szybciej odpowiesz tym więcej punktów dostaniesz za poprawną odpowiedź.</li>
                        <li>Ranking pokazuje 10 najlepszych wyników, a jeśli osiągniesz już istniejący wynik, zwiększa się liczba osób z tym wynikiem! 🚀</li>
                    </ul>
                    <Link href="/konkurs/start">
                        <button className="bg-green-800 p-5 m-10 rounded-3xl w-4/6">
                            Weź udział
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
