# 🎓 TPD MasterClass: Portal Pembelajaran & Prediksi UAS 2025/2026

Website pembelajaran interaktif dan simulator ujian komprehensif untuk persiapan menghadapi **UAS Mata Kuliah Teknologi Pengolahan Data (TPD) T.A. 2025/2026** di Politeknik Statistika STIS (Dosen Pengampu: Siti Mariyah, Ph.D).

---

## 🚀 Cara Menjalankan Website

Website ini dibuat sepenuhnya independen menggunakan teknologi modern (HTML5, Tailwind CSS, Vanilla JS) tanpa memerlukan build tools atau dependensi backend yang rumit.

### Opsi 1: Buka Langsung di Browser (Paling Mudah)
Cukup klik ganda atau buka file `index.html` menggunakan browser favorit Anda:
```bash
# Melalui terminal Linux:
xdg-open portal-uas-tpd/index.html
# atau buka langsung di Chrome:
google-chrome portal-uas-tpd/index.html
```

### Opsi 2: Jalankan via Local HTTP Server
```bash
# Menggunakan Python 3:
python3 -m http.server 8080 --directory portal-uas-tpd

# Atau menggunakan npx serve:
npx serve portal-uas-tpd
```
Lalu buka di peramban: `http://localhost:8080`

---

## 🌟 Fitur Utama Platform

1. **📊 Blueprint & Prediksi Mentor**:
   - Analisis komparatif naskah asli 2022/2023 vs kisi-kisi 2025/2026.
   - Peta distribusi bobot materi 30 Soal Pilihan Ganda.
   - *Trap Alert*: 4 jebakan dosen paling mematikan (Combiner Average, Secondary NameNode myth, dsb).
   - Penegasan silabus: **YARN Tidak Diujikan**.

2. **📝 Simulasi Ujian Interaktif (115 PG dalam 4 Set Soal)**:
   - **Set 1: Prediksi Utama UAS 2025/2026** (30 PG terakurasi sesuai kisi-kisi).
   - **Set 2: Pendalaman Buku Teks Tom White** (30 PG mekanisme internal HDFS & MapReduce).
   - **Set 3: Studi Kasus Industri & Troubleshooting** (30 PG arsitektur enterprise & data skewness).
   - **Set 4: Arsip Resmi UAS 2022/2023** (25 PG naskah asli lengkap beserta kunci).
   - *Mode Belajar* (feedback instan & pembahasan) vs *Mode Ujian* (timer 45 menit, skoring kelulusan otomatis).
   - Palet nomor navigasi soal dengan penanda ragu-ragu (flag).

3. **⚙️ Laboratorium Esai MapReduce**:
   - Alur visual interaktif tahapan MapReduce dari InputSplit hingga HDFS Sink.
   - Bedah **6 Kasus Esai Legendaris**: *WordCount*, *Highest Salary*, *Group By Sum*, *Average Komposit*, *Composite Key*, dan *Two-Pass Top-K URL*.
   - Formulir latihan mandiri dengan evaluasi kesesuaian Template 5 Komponen Bernilai 100.

4. **🎯 Bedah 3 Soal Esai Prediksi Utama UAS 2025/2026**:
   - Prediksi Esai 1: Perancangan MapReduce Penjualan E-Commerce (Kunci Komposit & Combiner).
   - Prediksi Esai 2: Keandalan HDFS, Penempatan Rack-Awareness & Penanganan Crash.
   - Prediksi Esai 3: Pemilihan Arsitektur Big Data Multi-Teknologi (Hive vs HBase vs Spark).
   - Lengkap dengan rubrik penilaian dosen dan pedoman jawaban baku.

5. **⚡ Flashcards & SCD Lab**:
   - 8 Flashcards 3D Flip untuk menghafal angka-angka sakti buku teks Tom White (128 MB block, 150 byte RAM, 3s heartbeat, distance 0/2/4/6, dsb).
   - *Simulator Interaktif Slowly Changing Dimensions (SCD)*: Visualisasi langsung perbedaan SCD Tipe 1, Tipe 2, dan Tipe 3 pada tabel pelanggan.
   - 6 Matriks Komparasi Biner (OLTP vs OLAP, Inmon vs Kimball, Star vs Snowflake, ETL vs ELT, Hive vs HBase, MR vs Spark).

6. **🏛️ Arsip Lengkap UAS 2022/2023**:
   - Pembahasan komparatif 25 PG dan 5 Esai asli tahun ajaran sebelumnya.

---

## 📚 Rujukan & Sumber Materi
- Kisi-Kisi Resmi UAS TPD 2025/2026 (`Materi MD/kisi-kisi-uas.md`)
- Slide Perkuliahan Dosen Pengampu Siti Mariyah, Ph.D (`Materi MD` & `Materi PDF`)
- Buku Teks Resmi: *Hadoop: The Definitive Guide*, 4th Edition (Tom White, O'Reilly)
- Naskah Asli UAS Genap T.A. 2022/2023 (`Materi MD/UAS 2022-2023 TPD`)
