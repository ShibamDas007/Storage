export default function Auth() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="bg-[#1F212C] flex flex-col items-center gap-4 p-8 w-80 h-120 rounded-4xl">
        <div className="text-white w-full m-2">
          <p className="text-2xl">Lets, Start</p>
          <p className="text-sm">Please login or sign up.</p>
        </div>
        <div className="flex flex-col w-full space-y-4 text-white">
          <div className="w-full rounded-4xl">
            <input type="text" className="w-full p-4 px-6 caret-white text-white outline-2 outline-sky-500 rounded-4xl bg-[#313745]" placeholder="Your Email"/>
          </div>
          <div className="w-full rounded-4xl">
            <input type="text" className="w-full p-4 px-6 caret-white text-white outline-2 outline-sky-500 rounded-4xl bg-[#313745]" placeholder="Your Password"/>
          </div>
        </div>
      </div>
    </div>
  );
}
