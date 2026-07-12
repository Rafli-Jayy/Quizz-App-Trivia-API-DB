import React, { useState, useMemo, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

const decodeHTML = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.documentElement.textContent;
};

export default function Play() {
  const { setAnswer, selectAnswer, game } = useOutletContext();
  const navigate = useNavigate();

  const isUnlimited = 
    game?.timeLeft === "unlimited" || 
    game?.timeLeft === 0 || 
    game?.timeLeft === "0" || 
    game?.timeLeft === false ||
    game?.hasTimer === false;

  const maxTimeConfig = Number(game?.timeLeft ?? game?.duration ?? game?.timer ?? 15);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(() => isUnlimited ? 999 : maxTimeConfig);

  const quizNumberCurrent = game?.quizNumberCurrent ?? 0;
  const currentQuiz = game?.quizList?.[quizNumberCurrent];

  const quizType = currentQuiz?.type;
  const question = decodeHTML(currentQuiz?.question ?? "Question Null");
  const correct_answer = currentQuiz?.correct_answer;
  const incorrect_answers = currentQuiz?.incorrect_answers;

  const wrongAnswers = game?.wrongAnswers ?? 0;
  const totalSoal = game?.quizList?.length ?? 0;
  const quizScore = game?.score ?? 0;

  useEffect(() => {
    if (!game?.quizList || game.quizList.length === 0) {
      navigate("/");
    }
  }, [game?.quizList, navigate]);

  useEffect(() => {
    setSelectedAnswer(null);
    if (!isUnlimited) {
      setTimeLeft(maxTimeConfig);
    }
  }, [quizNumberCurrent, maxTimeConfig, isUnlimited]);

  useEffect(() => {
    if (isUnlimited) return;

    if (timeLeft <= 0) {
      setAnswer(true);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, isUnlimited, setAnswer]);

  const choicesQuiz = useMemo(() => {
    if (!currentQuiz) return [];
    if (quizType === "boolean") return ["True", "False"];
    if (!correct_answer || !incorrect_answers) return [];

    const allChoices = [correct_answer, ...incorrect_answers].map((choice) =>
      decodeHTML(choice),
    );
    return allChoices.sort(() => Math.random() - 0.5);
  }, [
    quizNumberCurrent,
    quizType,
    correct_answer,
    incorrect_answers,
    currentQuiz,
  ]);

  if (!game?.quizList || game.quizList.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center font-mono text-xs text-zinc-400 animate-pulse">
        REDIRECTING TO HOME...
      </div>
    );
  }

  const isTimeLow = !isUnlimited && timeLeft <= 5 && timeLeft > 2;
  const isTimeCritical = !isUnlimited && timeLeft <= 2;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col items-center justify-center p-6 font-sans select-none">

      <style>{`
        @keyframes springPop {
          0% { transform: scale(1); }
          30% { transform: scale(1.08); border-color: #10b981; box-shadow: 0 0 20px rgba(16, 185, 129, 0.2); }
          60% { transform: scale(0.96); }
          100% { transform: scale(1); }
        }
        @keyframes springShake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); border-color: #f43f5e; box-shadow: 0 0 20px rgba(244, 63, 94, 0.2); }
          40%, 80% { transform: translateX(6px); border-color: #f43f5e; }
        }
        @keyframes criticalPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0px rgba(244, 63, 94, 0); }
          50% { transform: scale(1.03); border-color: #f43f5e; box-shadow: 0 0 15px rgba(244, 63, 94, 0.25); }
        }
        .animate-pop { animation: springPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .animate-shake { animation: springShake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
        .animate-critical { animation: criticalPulse 0.6s ease-in-out infinite; }
      `}</style>

      <div className="w-full max-w-2xl grid grid-cols-4 gap-4 mb-8">
        <div className="border border-zinc-200 bg-zinc-50/50 backdrop-blur-md p-4 rounded-2xl text-center relative overflow-hidden transition-all duration-300 shadow-sm hover:border-zinc-300">
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest font-mono">
            Progress
          </p>
          <p className="text-2xl font-mono font-bold mt-1 text-zinc-800">
            {quizNumberCurrent + 1}/{totalSoal}
          </p>
          <div className="absolute bottom-0 left-0 h-0.75 bg-zinc-100 w-full">
            <div
              className="h-full bg-zinc-800 transition-all duration-500 ease-out"
              style={{
                width: `${((quizNumberCurrent + 1) / totalSoal) * 100}%`,
              }}
            />
          </div>
        </div>

        <div
          className={`border p-4 rounded-2xl text-center relative transition-all duration-300 shadow-sm
          ${
            isTimeCritical
              ? "border-rose-300 bg-rose-50/70 text-rose-600 animate-critical"
              : isTimeLow
                ? "border-amber-300 bg-amber-50/70 text-amber-600 animate-pulse"
                : "border-zinc-200 bg-zinc-50/50 text-zinc-800"
          }`}
        >
          <p
            className={`text-[10px] font-bold uppercase tracking-widest font-mono
            ${isTimeCritical ? "text-rose-500" : isTimeLow ? "text-amber-500" : "text-zinc-400"}`}
          >
            Waktu
          </p>
          <p
            className={`text-2xl font-mono font-bold mt-1 transition-all duration-300 ${isTimeCritical ? "scale-105 font-black" : ""}`}
          >
            {isUnlimited ? "∞" : `${timeLeft}s`}
          </p>
          {isTimeCritical && (
            <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
          )}
        </div>

        <div
          key={`score-${quizScore}`}
          className={`border p-4 rounded-2xl text-center shadow-sm transition-all duration-300
            ${
              quizScore > 0
                ? "border-emerald-200 bg-emerald-50/40 text-emerald-600 animate-pop"
                : "border-zinc-200 bg-zinc-50/50 text-zinc-400"
            }`}
        >
          <p
            className={`text-[10px] font-bold uppercase tracking-widest font-mono ${quizScore > 0 ? "text-emerald-500" : "text-zinc-400"}`}
          >
            Skor
          </p>
          <p className="text-2xl font-mono font-bold mt-1">
            {quizScore > 0 ? `+${quizScore}` : "0"}
          </p>
        </div>

        <div
          key={`wrong-${wrongAnswers}`}
          className={`border p-4 rounded-2xl text-center shadow-sm transition-all duration-300
            ${
              wrongAnswers > 0
                ? "border-rose-200 bg-rose-50/40 text-rose-600 animate-shake"
                : "border-zinc-200 bg-zinc-50/50 text-zinc-400"
            }`}
        >
          <p
            className={`text-[10px] font-bold uppercase tracking-widest font-mono ${wrongAnswers > 0 ? "text-rose-500" : "text-zinc-400"}`}
          >
            Salah
          </p>
          <p className="text-2xl font-mono font-bold mt-1">{wrongAnswers}</p>
        </div>
      </div>

      <div className="w-full max-w-2xl border border-zinc-200/80 bg-white rounded-3xl p-8 flex flex-col justify-between min-h-[380px] shadow-sm">
        <div className="mb-8">
          <div className="w-full flex flex-col gap-2">
            <div className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 font-semibold break-words leading-relaxed">
              <span className="text-zinc-300 font-normal mr-0.5">#</span>
              {currentQuiz?.category}
            </div>
            <div className="flex gap-2 text-[9px] font-mono tracking-widest uppercase">
              <span className="border border-zinc-200 text-zinc-400 px-2.5 py-0.5 rounded bg-zinc-50/50">
                {quizType === "multiple" ? "Pilihan Ganda" : "Benar / Salah"}
              </span>
              <span
                className={`border px-2.5 py-0.5 rounded font-bold
                ${
                  currentQuiz?.difficulty === "easy"
                    ? "border-emerald-200 bg-emerald-50/30 text-emerald-600"
                    : currentQuiz?.difficulty === "medium"
                      ? "border-amber-200 bg-amber-50/30 text-amber-700"
                      : "border-rose-200 bg-rose-50/30 text-rose-600"
                }`}
              >
                {currentQuiz?.difficulty}
              </span>
            </div>
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-800 mt-5 leading-relaxed">
            {question}
          </h2>
        </div>

        {quizType === "multiple" ? (
          <div className="grid grid-cols-1 gap-3 mt-auto">
            {choicesQuiz.map((choice, index) => {
              const isSelected = selectedAnswer === choice;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setSelectedAnswer(choice);
                    selectAnswer(choice);
                  }}
                  className={`group w-full text-left p-4 rounded-2xl border font-mono flex items-center gap-4 transition-all duration-300 ease-out active:scale-[0.99]
                    ${
                      isSelected
                        ? "bg-zinc-900 text-white border-zinc-900 shadow-xl shadow-zinc-950/15 -translate-y-0.5 scale-[1.005]"
                        : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:text-zinc-800 hover:shadow-md hover:-translate-y-0.5"
                    }`}
                >
                  <span
                    className={`flex items-center justify-center w-9 h-9 rounded-xl border text-xs font-bold transition-all duration-300 uppercase
                    ${
                      isSelected
                        ? "bg-white/10 border-white/20 text-white"
                        : "bg-zinc-50 border-zinc-200 text-zinc-400 group-hover:bg-zinc-100 group-hover:text-zinc-700"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span
                    className={`text-sm md:text-base tracking-wide transition-colors duration-300
                    ${isSelected ? "text-white font-semibold" : "text-zinc-500 group-hover:text-zinc-800"}`}
                  >
                    {choice}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 mt-auto">
            {choicesQuiz.map((choice, index) => {
              const isSelected = selectedAnswer === choice;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setSelectedAnswer(choice);
                    selectAnswer(choice);
                  }}
                  className={`group w-full text-center p-7 rounded-2xl font-bold font-mono flex flex-col items-center justify-center gap-4 transition-all duration-300 ease-out active:scale-[0.98]
                    ${
                      isSelected
                        ? "bg-zinc-900 text-white border border-zinc-900 shadow-xl shadow-zinc-950/20 -translate-y-1 scale-[1.01]"
                        : "bg-white text-zinc-500 border border-zinc-200 hover:border-zinc-400 hover:text-zinc-800 hover:shadow-md hover:-translate-y-0.5"
                    }`}
                >
                  <span
                    className={`flex items-center justify-center w-11 h-11 rounded-full border text-xs font-bold transition-all duration-300 uppercase
                    ${
                      isSelected
                        ? "bg-white/10 border-white/20 text-white rotate-360"
                        : "bg-zinc-50 border-zinc-200 text-zinc-400 group-hover:bg-zinc-100 group-hover:text-zinc-700"
                    }`}
                  >
                    {choice.charAt(0)}
                  </span>
                  <span
                    className={`text-sm tracking-widest uppercase transition-colors duration-300
                    ${isSelected ? "text-white" : "text-zinc-400 group-hover:text-zinc-800"}`}
                  >
                    {choice}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="w-full max-w-2xl flex justify-end mt-6">
        <button
          type="button"
          onClick={() => setAnswer(false)}
          className="bg-black text-white border border-black font-bold font-mono px-8 py-3 rounded-xl hover:bg-white hover:text-black transition-all duration-300 tracking-wider text-xs uppercase shadow-sm active:scale-95"
        >
          Konfirmasi →
        </button>
      </div>
    </div>
  );
}