import React, { useMemo } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function Finish() {
  const { game } = useOutletContext();
  const navigate = useNavigate();

  const totalSoal = game?.quizList?.length ?? 0;
  const skorAkhir = game?.score ?? 0;
  const totalSalah = game?.wrongAnswers ?? 0;

  const totalBenar = Math.max(0, totalSoal - totalSalah);
  const akurasi =
    totalSoal > 0 ? Math.round((totalBenar / totalSoal) * 100) : 0;

  const performanceConfig = useMemo(() => {
    if (akurasi === 100) {
      return {
        pesan: "GG WP! Sempurna Banget!",
        subPesan: "Lu resmi jadi sepuh di kategori ini. Gak ada obat!",
        badge: "👑",
        glow: "shadow-emerald-950/5 border-emerald-500/20 bg-emerald-50/10",
        scoreBg:
          "bg-gradient-to-b from-emerald-50/80 to-emerald-50/20 border-emerald-200/60",
        scoreText: "text-emerald-600",
      };
    }
    if (akurasi >= 70) {
      return {
        pesan: "Keren Gila, Otak Lu Encer Juga!",
        subPesan: "Performa mantap di atas rata-rata. Dikit lagi sempurna!",
        badge: "🚀",
        glow: "shadow-zinc-950/10 border-zinc-500/20 bg-zinc-50/50",
        scoreBg: "bg-gradient-to-b from-zinc-50 to-zinc-100/30 border-zinc-200",
        scoreText: "text-zinc-900",
      };
    }
    if (akurasi >= 40) {
      return {
        pesan: "Lumayan Lah, Belajar Lagi!",
        subPesan: "Gak jelek-jelek amat, tapi lu masih bisa jauh lebih baik.",
        badge: "🎯",
        glow: "shadow-amber-950/5 border-amber-500/20 bg-amber-50/10",
        scoreBg:
          "bg-gradient-to-b from-amber-50/70 to-amber-50/20 border-amber-200/60",
        scoreText: "text-amber-700",
      };
    }
    return {
      pesan: "Waduh... Coba Lagi Deh, Bor! ",
      subPesan: "Nilai lu di bawah KKM game ini cikk. Ayo tebus kekalahan!",
      badge: "👾",
      glow: "shadow-rose-950/5 border-rose-500/20 bg-rose-50/10",
      scoreBg:
        "bg-gradient-to-b from-rose-50/80 to-rose-50/20 border-rose-200/60",
      scoreText: "text-rose-600",
    };
  }, [akurasi]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden select-none">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes floatEffect {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
        @keyframes barGrow {
          from { width: 0%; }
          to { width: ${akurasi}%; }
        }
        .animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-float { animation: floatEffect 4s ease-in-out infinite; }
        .animate-bar-grow { animation: barGrow 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-200/40 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-md border border-zinc-200/80 bg-white rounded-3xl p-8 shadow-xl shadow-zinc-200/50 text-center animate-fade-in-up opacity-0">
        <div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl text-3xl mb-4 shadow-sm border animate-float transition-all duration-500 ${performanceConfig.glow}`}
        >
          {performanceConfig.badge}
        </div>

        <h1 className="text-2xl font-black tracking-tight text-zinc-800 uppercase font-mono">
          Game Over
        </h1>
        <p className="text-base font-bold text-zinc-800 mt-3 px-2 transition-colors duration-500">
          {performanceConfig.pesan}
        </p>
        <p className="text-xs text-zinc-400 mt-1 px-4 leading-relaxed font-medium">
          {performanceConfig.subPesan}
        </p>

        <div
          className={`my-6 p-6 rounded-2xl border transition-all duration-500 relative overflow-hidden text-center shadow-sm ${performanceConfig.scoreBg}`}
        >
          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest font-mono">
            Total Skor Diperoleh
          </p>
          <p
            className={`text-6xl font-mono font-black mt-1 tracking-tighter transition-colors duration-500 ${performanceConfig.scoreText}`}
          >
            {skorAkhir}
          </p>
        </div>

        {/* DYNAMIC ACCURACY METRIC BAR */}
        <div className="mb-6 px-1 text-left">
          <div className="flex justify-between items-center mb-1.5 font-mono text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
            <span>Rasio Akurasi</span>
            <span className="text-zinc-700 font-extrabold">{akurasi}%</span>
          </div>
          <div className="h-2 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/40 p-[2px]">
            <div
              className={`h-full rounded-full animate-bar-grow transition-all duration-500 ${
                akurasi === 100
                  ? "bg-emerald-500"
                  : akurasi >= 70
                    ? "bg-zinc-800"
                    : akurasi >= 40
                      ? "bg-amber-500"
                      : "bg-rose-500"
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {/* Benar */}
          <div className="border border-zinc-100 p-4 rounded-xl text-left bg-zinc-50/40 hover:bg-zinc-50/80 hover:border-zinc-200 transition-all duration-300 flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider font-mono">
                Benar
              </p>
              <p className="text-base font-mono font-black text-emerald-600 mt-0.5">
                +{totalBenar}
              </p>
            </div>
          </div>

          {/* Salah */}
          <div className="border border-zinc-100 p-4 rounded-xl text-left bg-zinc-50/40 hover:bg-zinc-50/80 hover:border-zinc-200 transition-all duration-300 flex items-center gap-3">
            <div className="p-2 bg-rose-50 rounded-lg text-rose-500 border border-rose-100">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div>
              <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider font-mono">
                Salah
              </p>
              <p className="text-base font-mono font-black text-rose-500 mt-0.5">
                -{totalSalah}
              </p>
            </div>
          </div>

          {/* Total Soal */}
          <div className="border border-zinc-100 p-4 rounded-xl text-left bg-zinc-50/40 hover:bg-zinc-50/80 hover:border-zinc-200 transition-all duration-300 flex items-center gap-3">
            <div className="p-2 bg-zinc-100 rounded-lg text-zinc-600 border border-zinc-200">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider font-mono">
                Total Soal
              </p>
              <p className="text-base font-mono font-black text-zinc-700 mt-0.5">
                {totalSoal}
              </p>
            </div>
          </div>

          {/* Rasio Sukses */}
          <div className="border border-zinc-100 p-4 rounded-xl text-left bg-zinc-50/40 hover:bg-zinc-50/80 hover:border-zinc-200 transition-all duration-300 flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600 border border-blue-100">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
            </div>
            <div>
              <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider font-mono">
                Efisiensi
              </p>
              <p className="text-base font-mono font-black text-blue-600 mt-0.5">
                {akurasi}%
              </p>
            </div>
          </div>
        </div>

        {/* ACTION BUTTON */}
        <div className="w-full">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="group w-full bg-zinc-900 text-white border border-zinc-900 font-bold font-mono py-3.5 rounded-xl transition-all duration-300 tracking-widest text-xs uppercase shadow-md hover:bg-zinc-800 active:scale-[0.97] flex items-center justify-center gap-2"
          >
            <span>Main Lagi</span>
            <svg
              className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
