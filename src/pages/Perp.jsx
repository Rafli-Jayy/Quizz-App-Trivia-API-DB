import React from 'react';
import { useOutletContext } from 'react-router-dom';

export default function PrepScreen() {

    const { config, startGame, isLoading } = useOutletContext();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-xl space-y-6">
        
        {/* Header Bagian Atas */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Persiapan Pertandingan
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Periksa kembali mode kuis yang sudah lu pilih sebelum bertanding. Pastikan otak sudah panas!
          </p>
        </div>

        <hr className="border-slate-100" />

        {/* List Ringkasan Mode Kuis */}
        <div className="space-y-3">
          
          {/* 1. JUMLAH SOAL */}
          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200/60">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Banyak Soal</span>
            <span className="text-sm font-bold text-slate-800">{config?.amount || '10'} Soal</span>
          </div>

          {/* 2. KATEGORI */}
          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200/60">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Kategori</span>
            <span className="text-sm font-bold text-slate-800 truncate max-w-[200px]">
              {config?.category == "9" ? "General Knowledge" : 
              config?.category == "18" ? "Science: Computers" : 
              config?.category == "21" ? "Sports" : 
              config?.category == "23" ? "History" : 
              config?.category == "31" ? "Anime & Manga" : "Semua Kategori (Acak)"}
            </span>
          </div>

          {/* 3. TINGKAT KESULITAN */}
          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200/60">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tingkat Kesulitan</span>
            <span className="text-sm font-bold text-slate-800 capitalize">{config?.difficulty || 'Semua Tingkat'}</span>
          </div>

          {/* 4. TIPE SOAL */}
          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200/60">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tipe Soal</span>
            <span className="text-sm font-bold text-slate-800 capitalize">{config?.type || 'Campuran'}</span>
          </div>

          {/* 5. DURASI */}
          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200/60">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Waktu per Soal</span>
            <span className="text-sm font-bold text-slate-800">{config?.duration || '15'} Detik</span>
          </div>

        </div>

        {/* Tombol Aksi Utama */}
        <div className="pt-2">
          <button
            onClick={startGame}
            disabled={isLoading} // 🔥 Mencegah spam klik pas lagi loading
            className={`w-full py-3 px-4 rounded-xl border font-mono text-xs tracking-widest uppercase font-bold transition-all duration-200 flex items-center justify-center gap-2
              ${isLoading 
                ? 'bg-zinc-100 border-zinc-300 text-zinc-400 cursor-not-allowed animate-pulse' 
                : 'bg-zinc-900 border-zinc-900 text-white hover:bg-zinc-850 active:scale-[0.98]'
              }`}
          >
            {isLoading ? (
              <>
                {/* Spinner Bulat Minimalis ala Zinc */}
                <svg className="animate-spin h-3.5 w-3.5 text-zinc-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Menyiapkan Soal...</span>
              </>
            ) : (
              <span>Mulai Game</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}