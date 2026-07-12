# Trivia Quiz App

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

Aplikasi web berbasis React untuk permainan kuis trivia interaktif dengan data real-time dari OpenTDB API. Proyek ini dibangun dengan fokus pada arsitektur state management yang bersih menggunakan Custom Hooks dan React Reducer, serta antarmuka pengguna yang minimalis dan responsif.

---

## 🚀 Fitur Utama

* **Dynamic Quiz Fetching:** Mengambil soal kuis secara real-time berdasarkan kategori, jumlah soal, dan tingkat kesulitan melalui OpenTDB API.
* **Robust State Management:** Menggunakan pola `useReducer` untuk mengelola state game yang kompleks (skor, sisa waktu, jawaban pengguna, status permainan) secara terpusat.
* **Smart Timer System:** Sistem penghitung waktu mundur otomatis per soal dengan dukungan konfigurasi waktu kustom (termasuk mode *unlimited*).
* **Responsive & Adaptive UI:** Desain antarmuka modern yang bersih menggunakan Tailwind CSS dengan feedback visual instan untuk jawaban benar/salah.
* **HTML Entity Decoding:** Dilengkapi dengan utility decoder untuk memastikan teks soal dari API bersih dari karakter entitas HTML mentah.

---

## 🛠️ Tech Stack

* **Core Framework:** React.js (v18+)
* **Routing:** React Router DOM
* **Styling:** Tailwind CSS
* **State & Logic:** React Context (via Outlet Context) & `useReducer`
* **Data Fetching:** Fetch API / OpenTDB (Open Trivia Database)

---

## 📂 Struktur Arsitektur Kode

Proyek ini menerapkan pemisahan logika bisnis dari komponen UI untuk menjaga kode tetap *scalable* dan mudah dirawat:

```text
src/
├
├── hooks/
│   └── useGamePlay.js # Logika inti permainan (state engine via useReducer)
├── pages/
│   ├── Start.js      # Halaman konfigurasi awal & setup kuis
│   ├── Play.js       # Halaman arena permainan (Timer, Pertanyaan, Pilihan)
│   └── Finish.js     # Halaman ringkasan skor dan hasil akhir
└── App.js            # Entry point & layouting router
