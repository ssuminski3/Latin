"use client";

export default function Home() {
    return (
        <div className="w-full h-full p-10 m-auto flex justify-center items-center ">
            <div className="2xl:w-2/5 m-auto text-center">
                <div className="  max-lg:m-10 text-3xl sm:text-6xl text-white rounded-3xl p-10 sm:p-20 bg-gradient-to-r from-slate-900 to-slate-950">
                    Jak się nazywasz?<br></br>
                    <input className="bg-slate-500 m-10 rounded-3xl" placeholder="Podaj imię"/><br></br>
                    <button className="bg-green-800 p-5 m-10 rounded-3xl w-4/6">Weź udział</button>
                </div>
            </div>
        </div>
    );
}
