export default function Home() {
    return (
        <div className="w-full h-full p-10 m-auto flex justify-center items-center ">
            <div className="2xl:w-2/5 m-auto text-center">
                <div className="max-lg:m-10 text-3xl text-white rounded-3xl p-10 bg-gradient-to-r from-slate-900 to-slate-950">
                    Dołącz do konkursu<br></br>
                    <input className="bg-slate-500 m-10 rounded-3xl" placeholder="Wpisz kod"/><br></br>
                    <button className="bg-green-800 p-5 m-10 rounded-3xl w-4/6">Dołącz</button>
                </div>
            </div>
        </div>
    );
}
