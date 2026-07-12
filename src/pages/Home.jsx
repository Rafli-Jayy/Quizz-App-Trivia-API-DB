import React from "react";
import { useOutletContext } from "react-router-dom";

import { LayoutDashboard } from "lucide-react";

export default function StartScreen() {
  const { config, handleChange, startPerp } = useOutletContext();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-center p-6 selection:bg-indigo-100">

      <div className="max-w-lg w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-xl space-y-6">

        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-md text-white font-bold text-xl">
            <LayoutDashboard />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            QUIZ APP
          </h1>
          <p className="text-slate-500 text-xs">Atur mode sebelum memulai</p>
        </div>

        <hr className="border-slate-100" />

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
              Kategori
            </label>
            <select
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:bg-white transition-all cursor-pointer"
              name="category"
              onChange={handleChange}
              value={config.category}
            >
              <option value="">Semua Kategori (Acak)</option>
              <option value="9">General Knowledge</option>
              <option value="18">Science: Computers</option>
              <option value="21">Sports</option>
              <option value="23">History</option>
              <option value="31">Anime & Manga</option>
            </select>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 2. Tingkat Kesulitan */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
                Tingkat Kesulitan
              </label>
              <select
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:bg-white transition-all cursor-pointer"
                name="difficulty"
                onChange={handleChange}
                value={config.difficulty}
              >
                <option value="">Semua Kesulitan</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
                Tipe Soal
              </label>
              <select
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:bg-white transition-all cursor-pointer"
                name="type"
                onChange={handleChange}
                value={config.type}
              >
                <option value="">Semua Tipe</option>
                <option value="multiple">
                  Pilihan Ganda (Multiple Choice)
                </option>
                <option value="boolean">Benar / Salah (True / False)</option>
              </select>
            </div>


            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
                Banyak Soal
              </label>
              <select
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:bg-white transition-all cursor-pointer"
                name="amount"
                onChange={handleChange}
                value={config.amount}
              >
                <option value="5">5 Soal</option>
                <option value="10">10 Soal</option>
                <option value="15">15 Soal</option>
                <option value="20">20 Soal</option>
              </select>
            </div>


            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
                Waktu Per Soal
              </label>
              <select
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:bg-white transition-all cursor-pointer"
                name="duration"
                onChange={handleChange}
                value={config.duration}
              >
                <option value="10">10 Detik</option>
                <option value="15">15 Detik</option>
                <option value="30">30 Detik</option>
                <option value="0">Tanpa Waktu</option>
              </select>
            </div>
          </div>
        </div>


        <div className="pt-2">
          <button
            onClick={startPerp}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3.5 px-6 rounded-xl shadow-md transition-all duration-150 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 cursor-pointer text-sm tracking-wide"
          >
            Mulai Pertandingan
          </button>
        </div>
      </div>
    </div>
  );
}
