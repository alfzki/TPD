/**
 * data-concepts.js
 * Database Konsep, Flashcards, Simulasi SCD, Matriks Komparasi, dan Blueprint Analisis Mentor
 */

window.TPD_CONCEPTS_DATA = {
  // Analisis Blueprint Mentor
  blueprint: {
    title: "The Mentor's Blueprint: Analisis Prediksi UAS TPD 2025/2026",
    lecturer: "Siti Mariyah, Ph.D (Politeknik Statistika STIS)",
    formatSummary: {
      totalPG: 30,
      totalEssay: "2 - 3 Soal",
      mandatoryEssay: "Perancangan Solusi MapReduce (PASTI KELUAR)",
      excludedTopic: "YARN (Yet Another Resource Negotiator) TIDAK DIUJIKAN"
    },
    weightDistribution: [
      { topic: "Data Warehouse & OLAP", percentage: 20, pgCount: 6, keyFocus: "Karakteristik Inmon (SSoT), OLTP vs OLAP, Arsitektur Inmon (3NF Top-Down) vs Kimball (Dimensional Bottom-Up), Data Mart vs EDW" },
      { topic: "Dimensional Modeling & SCD", percentage: 20, pgCount: 6, keyFocus: "Fact Table (Measures aditif/semi/non), Surrogate Key, Star vs Snowflake vs Galaxy, Kimball 4 Steps, SCD Tipe 1, 2, 3, Operasi OLAP Cube" },
      { topic: "ETL vs ELT", percentage: 13, pgCount: 4, keyFocus: "Perbedaan waktu/tempat transformasi, on-premise vs modern cloud warehouse, Schema-on-write vs read, Alur kerja ETL & blocking transforms" },
      { topic: "Hadoop & HDFS (Textbook Tom White)", percentage: 24, pgCount: 7, keyFocus: "Data Locality, Single vs Multi Node, NameNode RAM (~150 byte), Secondary NameNode checkpointer, 128 MB block rationale, WORM, Rack Awareness (d=0,2,4,6), Read/Write Pipeline, QJM & HA" },
      { topic: "MapReduce Internals", percentage: 23, pgCount: 7, keyFocus: "InputSplit vs Block, RecordReader, Buffer 100 MB & 80% spill, HashPartitioner, Shuffle & Sort, Syarat Combiner, Speculative Execution (Stragglers)" },
      { topic: "Ekosistem Tools (Sqoop s/d Spark)", percentage: 20, pgCount: 6, keyFocus: "Spesialisasi tool konseptual tanpa hafalan sintaks rumit: Sqoop (Map-only), Hive (Metastore, Managed vs External), HBase (RowKey sub-10ms), Pig (Dataflow), Kafka (Pub/Sub log), Spark (In-Memory RDD)" }
    ],
    shiftAnalysis: [
      {
        aspect: "Format Soal PG",
        year2023: "25 Soal Pilihan Ganda",
        year2026: "30 Soal Pilihan Ganda (+5 soal lebih komprehensif)",
        mentorInsight: "Penambahan 5 soal mengakomodasi topik fondasi arsitektur Data Warehouse teoritis (Inmon, Kimball, SCD) dan pendalaman konsep internal buku teks Tom White yang sebelumnya belum banyak muncul di 2023."
      },
      {
        aspect: "Format Soal Esai",
        year2023: "5 Soal Esai (Banyak uji syntax CLI Sqoop, query HiveQL, Kafka CLI, GCP)",
        year2026: "2 - 3 Soal Esai (Fokus cara kerja konseptual; 1 soal PASTI perancangan MapReduce)",
        mentorInsight: "Kisi-kisi 2026 secara tegas menekankan 'fokus pemahaman konsep dan cara kerja tanpa kode rumit'. Esai tidak lagi meminta hafalan panjang baris perintah, melainkan kemampuan mendesain alur data MapReduce dan arsitektur data terpadu."
      },
      {
        aspect: "Materi YARN",
        year2023: "Ada soal pengenalan YARN",
        year2026: "Eksplisit: 'YARN TIDAK DIUJIKAN'",
        mentorInsight: "Jangan habiskan energi menghafal alur ResourceManager, NodeManager, ApplicationMaster, dan container allocation YARN. Alihkan energi Anda 100% untuk menguasai mekanisme HDFS (128 MB block, rack awareness) dan MapReduce 5 komponen!"
      }
    ],
    trapAlerts: [
      {
        title: "Jebakan 1: Operasi Rata-Rata (AVG) pada Combiner",
        severity: "CRITICAL",
        description: "Banyak mahasiswa langsung menulis fungsi AVERAGE di Combiner MapReduce. INI SALAH FATAL! Rata-rata bukan fungsi asosiatif: avg(avg(a,b), c) != avg(a,b,c).",
        solution: "Wajib gunakan pola komposit: Mapper dan Combiner memancarkan pasangan (count, sum). Pembagian rata-rata baru dihitung di Reducer!"
      },
      {
        title: "Jebakan 2: Mitos Peran Secondary NameNode",
        severity: "HIGH",
        description: "Sering ada pilihan ganda mengecoh: 'Secondary NameNode adalah backup aktif yang langsung menggantikan NameNode jika mati'. INI SALAH!",
        solution: "Secondary NameNode BUKAN hot-standby failover. Tugas aslinya adalah Periodic Checkpointer yang bertugas mendownload FsImage dan EditLog dari NameNode, menggabungkannya di memorinya, lalu mengirimkannya kembali ke NameNode agar file EditLog tidak membengkak."
      },
      {
        title: "Jebakan 3: Efek DROP TABLE pada Managed vs External Table",
        severity: "HIGH",
        description: "Dosen suka menguji apa yang terjadi pada data fisik saat perintah DROP TABLE dieksekusi di Apache Hive.",
        solution: "Managed Table: Menghapus skema metadata di Metastore DAN menghapus file fisik di HDFS. External Table: HANYA menghapus metadata di Metastore, data fisik di direktori HDFS tetap utuh!"
      },
      {
        title: "Jebakan 4: Star Schema vs Snowflake Schema",
        severity: "MEDIUM",
        description: "Mahasiswa sering mengira Snowflake Schema lebih bagus karena tabel dimensinya ternormalisasi 3NF.",
        solution: "Untuk Data Warehouse (OLAP), Star Schema JUSTRU lebih disukai karena tabel dimensi didenormalisasi sehingga membutuhkan operasi JOIN jauh lebih sedikit, menghasilkan kueri analitis yang jauh lebih cepat."
      }
    ]
  },

  // Flashcards Hafalan Sakti Buku Teks Tom White
  flashcards: [
    {
      id: 1,
      category: "Angka Sakti Tom White",
      front: "Berapa ukuran default Blok HDFS pada Hadoop modern (2.x / 3.x) dan apa alasan matematisnya?",
      back: "128 MB (bawaan Hadoop modern).\nAlasan: Jika disk seek time adalah ~10 ms dan transfer rate adalah ~100 MB/s, maka dengan blok 128 MB waktu pencarian piringan (seek time) hanya memakan ~1% dari total waktu transfer data streaming, sehingga I/O disk berjalan sangat efisien."
    },
    {
      id: 2,
      category: "Angka Sakti Tom White",
      front: "Berapa estimasi memori RAM yang dikonsumsi NameNode untuk setiap objek (file, direktori, blok)?",
      back: "~150 Byte per objek di RAM.\nKonsekuensi: 10 juta file kecil akan memakan ~3 GB RAM NameNode hanya untuk struktur direktori, memicu 'Small Files Problem'!"
    },
    {
      id: 3,
      category: "Angka Sakti Tom White",
      front: "Berapa interval Heartbeat DataNode ke NameNode, dan kapan DataNode dinyatakan mati (DEAD)?",
      back: "Heartbeat dikirim setiap 3 detik.\nDataNode dinyatakan DEAD jika tidak mengirim sinyal selama 10 menit (600 detik). Saat dinyatakan mati, NameNode langsung menjadwalkan replikasi ulang blok-bloknya ke node lain."
    },
    {
      id: 4,
      category: "Angka Sakti Tom White",
      front: "Bagaimana rumus metrik Jarak Jaringan (Network Distance) antar-node pada HDFS?",
      back: "Distance d = jumlah hop ke switch terdekat + hop turun:\n- d = 0 : Node yang sama di mesin yang sama\n- d = 2 : Node berbeda pada RAK yang sama\n- d = 4 : Node pada RAK berbeda dalam DATACENTER yang sama\n- d = 6 : Node pada DATACENTER yang berbeda"
    },
    {
      id: 5,
      category: "Mekanisme Internal",
      front: "Berapa ukuran circular memory buffer di Mapper dan berapa persentase spill threshold-nya?",
      back: "Ukuran buffer default = 100 MB (mapreduce.task.io.sort.mb).\nSpill threshold = 80% (0.80).\nSaat buffer mencapai 80 MB, thread latar belakang mengurutkan data in-memory dan menumpahkannya (spill) ke disk lokal mesin pekerja."
    },
    {
      id: 6,
      category: "Mekanisme Internal",
      front: "Apa beda method hflush() dan hsync() pada HDFS Client Write Path?",
      back: "hflush(): Menjamin data sampai ke memory buffer OS di seluruh DataNode pipeline (data langsung terbaca oleh pembaca lain).\nhsync(): Menjamin data benar-benar ditulis permanen secara fisik ke piringan disk (physical disk flush / fsync) sehingga tahan terhadap mati listrik total."
    },
    {
      id: 7,
      category: "HDFS High Availability",
      front: "Apa itu Fencing (STONITH) dalam cluster HDFS High Availability (HA)?",
      back: "Fencing adalah mekanisme isolasi paksa untuk memastikan Active NameNode yang crash benar-benar berhenti menulis ke JournalNode, mencegah skenario Split-Brain (dua NameNode mengklaim diri aktif secara bersamaan). Metode paling ekstrem adalah STONITH (Shoot The Other Node In The Head)."
    },
    {
      id: 8,
      category: "HBase Internals",
      front: "Kapan sebuah Region di HBase dipecah (Region Splitting) dan apa itu Major Compaction?",
      back: "Region Splitting: Terjadi otomatis ketika ukuran Region melampaui 10 GB (default).\nMajor Compaction: Proses menggabungkan seluruh file HFile di satu Store menjadi satu HFile tunggal dan membersihkan data kadaluarsa serta delete tombstones."
    }
  ],

  // Simulasi Interaktif Slowly Changing Dimensions (SCD)
  scdSimulator: {
    title: "Simulasi Interaktif: Slowly Changing Dimensions (SCD)",
    description: "Amati bagaimana tabel dimensi menangani perubahan data pelanggan secara visual pada SCD Tipe 1, Tipe 2, dan Tipe 3.",
    initialData: {
      customer_id: "CUST-882",
      customer_name: "Budi Santoso",
      city: "Jakarta",
      occupation: "Mahasiswa"
    },
    changeEvent: {
      new_city: "Surabaya",
      new_occupation: "PNS",
      effective_date: "2026-09-28"
    },
    types: {
      type1: {
        name: "SCD Tipe 1 (Overwrite)",
        subtitle: "Menimpa Data Lama - Tidak Ada Riwayat Historis",
        explanation: "Nilai lama langsung ditimpa (overwritten) dengan nilai baru. Sederhana dan hemat ruang, tetapi riwayat lama hilang selamanya. Analisis penjualan masa lalu saat Budi tinggal di Jakarta akan keliru dihitung sebagai penjualan di Surabaya.",
        columns: ["Customer_ID (PK)", "Nama", "Kota", "Pekerjaan"],
        rows: [
          {
            cells: ["CUST-882", "Budi Santoso", "Surabaya", "PNS"],
            status: "updated",
            badge: "Nilai Lama (Jakarta/Mahasiswa) Ditimpa"
          }
        ]
      },
      type2: {
        name: "SCD Tipe 2 (Add New Row)",
        subtitle: "Menambah Baris Baru - Melestarikan Riwayat Historis Penuh (Gold Standard)",
        explanation: "Baris lama ditutup dengan memberi End_Date dan status Is_Current = 'N'. Baris baru dibuat dengan Surrogate Key baru, Start_Date baru, End_Date = '9999-12-31', dan Is_Current = 'Y'. Kueri historis tetap akurat merujuk ke status lama!",
        columns: ["Surrogate_Key (PK)", "Customer_ID (Natural)", "Nama", "Kota", "Pekerjaan", "Start_Date", "End_Date", "Is_Current"],
        rows: [
          {
            cells: ["1001", "CUST-882", "Budi Santoso", "Jakarta", "Mahasiswa", "2024-01-01", "2026-09-27", "N"],
            status: "closed",
            badge: "Record Historis Ditutup"
          },
          {
            cells: ["2045", "CUST-882", "Budi Santoso", "Surabaya", "PNS", "2026-09-28", "9999-12-31", "Y"],
            status: "active",
            badge: "Record Baru Aktif"
          }
        ]
      },
      type3: {
        name: "SCD Tipe 3 (Add New Column)",
        subtitle: "Menambah Kolom Baru - Hanya Menyimpan Status Sekarang & Sebelumnya",
        explanation: "Hanya satu baris yang dipertahankan dengan menambahkan kolom baru untuk nilai sebelumnya (misal: Original_City atau Previous_City). Efisien jika bisnis hanya peduli pada perbandingan kondisi sekarang vs awal tanpa peduli riwayat perantara.",
        columns: ["Customer_ID (PK)", "Nama", "Current_City", "Previous_City", "Current_Occupation", "Previous_Occupation"],
        rows: [
          {
            cells: ["CUST-882", "Budi Santoso", "Surabaya", "Jakarta", "PNS", "Mahasiswa"],
            status: "extended",
            badge: "Kolom Sebelumnya Terisi"
          }
        ]
      }
    }
  },

  // Matriks Komparasi Biner Terpopuler
  comparisonMatrices: [
    {
      id: "oltp-olap",
      title: "OLTP vs OLAP",
      headers: ["Karakteristik", "OLTP (Online Transaction Processing)", "OLAP (Online Analytical Processing)"],
      rows: [
        ["Tujuan Utama", "Mendukung operasi bisnis harian real-time", "Mendukung analisis data & pengambilan keputusan manajemen"],
        ["Fokus Data", "Data operasional saat ini (Current Data)", "Data historis teragregasi lintas tahun (Historical Data)"],
        ["Operasi Database", "Banyak transaksi UPDATE, INSERT, DELETE kecil", "Mayoritas kueri pembacaan massal SELECT & agregasi (Read-Only)"],
        ["Desain Skema", "Ternormalisasi ketat (3NF) untuk mencegah redundansi", "Didenormalisasi (Star / Snowflake Schema) untuk kueri cepat"],
        ["Pengguna Utama", "Kasir, Karyawan operasional, Klien aplikasi web", "Analis data, Manajer, Eksekutif perusahaan"],
        ["Waktu Respon", "Sangat cepat dalam rentang milidetik", "Bervariasi dari beberapa detik hingga menit"],
        ["Ukuran Database", "Megabyte hingga Gigabyte", "Gigabyte hingga ratusan Terabyte / Petabyte"]
      ]
    },
    {
      id: "inmon-kimball",
      title: "Arsitektur DWH: Inmon (Top-Down) vs Kimball (Bottom-Up)",
      headers: ["Dimensi Komparasi", "Pendekatan Bill Inmon (Top-Down)", "Pendekatan Ralph Kimball (Bottom-Up)"],
      rows: [
        ["Filosofi Arsitektur", "Corporate Information Factory (CIF) - Top Down", "Dimensional Bus Architecture - Bottom Up"],
        ["Struktur Data Warehouse Inti", "Ternormalisasi dalam bentuk Relasional 3NF", "Model Dimensional (Star / Snowflake Schema)"],
        ["Posisi Data Mart", "Dependent Data Mart (diturunkan setelah EDW 3NF selesai)", "Data Mart Dimensional dibangun lebih dulu menggunakan Conformed Dimensions"],
        ["Biaya & Waktu Awal", "Biaya awal tinggi & waktu implementasi lama", "Biaya awal lebih terjangkau & time-to-market cepat"],
        ["Integrasi Data", "Sangat kuat sebagai Single Source of Truth (SSoT) terpusat", "Terintegrasi melalui matriks Conformed Dimensions Bus"],
        ["Kompleksitas Kueri Analis", "Tinggi (analis harus join banyak tabel 3NF)", "Rendah (skema bintang sangat intuitif bagi analis bisnis)"]
      ]
    },
    {
      id: "star-snowflake",
      title: "Star Schema vs Snowflake Schema",
      headers: ["Fitur", "Star Schema", "Snowflake Schema"],
      rows: [
        ["Normalisasi Dimensi", "Didenormalisasi sepenuhnya (1 tabel per dimensi)", "Ternormalisasi ke beberapa level hierarki tabel relasional"],
        ["Kecepatan Kueri JOIN", "Sangat Cepat (hanya 1 JOIN dari tabel fakta ke dimensi)", "Lebih Lambat (banyak relasi multi-table JOIN yang kompleks)"],
        ["Penggunaan Disk Storage", "Sedikit lebih boros karena ada atribut redundan di dimensi", "Paling hemat karena data dimensi tidak berulang"],
        ["Kemudahan Pemahaman", "Sangat sederhana dan intuitif bagi analis bisnis", "Lebih kompleks karena struktur menyerupai kepingan salju"],
        ["Pemeliharaan (Maintenance)", "Pembaruan atribut dimensi memerlukan banyak update", "Pembaruan atribut dimensi hanya dilakukan di satu baris tabel master"]
      ]
    },
    {
      id: "etl-elt",
      title: "ETL vs ELT",
      headers: ["Aspek", "ETL (Extract - Transform - Load)", "ELT (Extract - Load - Transform)"],
      rows: [
        ["Tempat Transformasi", "Di server ETL / staging area terpisah sebelum dimuat", "Di dalam sistem target langsung (Big Data Lake / Cloud Warehouse)"],
        ["Paradigma Skema", "Schema-on-Write (skema harus ditentukan sebelum dimuat)", "Schema-on-Read (data mentah dimuat apa adanya lebih dulu)"],
        ["Kesesuaian Lingkungan", "Sistem On-Premise tradisional & data terstruktur", "Modern Cloud Data Warehouse (Snowflake, BigQuery) & Big Data"],
        ["Kecepatan Pemuatan", "Lebih lambat karena harus melewati transformasi dulu", "Sangat cepat karena data mentah langsung dimuat (Bulk Ingest)"],
        ["Fleksibilitas Analitik", "Kaku (hanya data yang lolos transformasi yang tersimpan)", "Sangat Fleksibel (data mentah asli selalu tersedia untuk re-transformasi)"]
      ]
    },
    {
      id: "hive-hbase",
      title: "Apache Hive vs Apache HBase",
      headers: ["Karakteristik", "Apache Hive", "Apache HBase"],
      rows: [
        ["Model Data", "Data Warehouse Deklaratif Relasional di atas HDFS", "Basis Data NoSQL Berorientasi Kolom (Column-Family)"],
        ["Pola Akses Data", "Pemrosesan Batch analitis skala besar (Full Table Scan)", "Akses acak baca/tulis instan real-time (RowKey Random Read/Write)"],
        ["Latensi Respon", "Latensi Tinggi (beberapa detik hingga hitungan jam)", "Latensi Ultra Rendah (sub-10 milidetik per baris)"],
        ["Bahasa Kueri", "HiveQL (sangat mirip dengan ANSI SQL)", "Java API, REST API, HBase CLI (get, put, scan)"],
        ["Dukungan Update Baris", "Terbatas/Append-Only (tidak cocok untuk update transaksi cepat)", "Sangat Cepat untuk update/delete per baris (Row-Level Mutation)"],
        ["Media Penyimpanan", "File terstruktur di direktori HDFS (Text, ORC, Parquet)", "HFiles di HDFS yang dikelola RegionServer & MemStore RAM"]
      ]
    },
    {
      id: "mapreduce-spark",
      title: "Hadoop MapReduce vs Apache Spark",
      headers: ["Perbandingan", "Hadoop MapReduce", "Apache Spark"],
      rows: [
        ["Penyimpanan Perantara", "Wajib menulis intermediate data ke hard disk fisik HDFS", "Mempertahankan data perantara di dalam memori utama (RAM) via RDD"],
        ["Kecepatan Komputasi", "Lambat karena bottleneck I/O disk dan serialisasi", "Hingga 100x lebih cepat di RAM dan 10x lebih cepat di disk"],
        ["Gaya Pemrograman", "Kaku (hanya ada fungsi map dan reduce tingkat rendah)", "Sangat kaya (80+ operator transformasi: map, filter, join, groupBy)"],
        ["Toleransi Kesalahan", "Menulis ulang data blok ke disk HDFS dengan replikasi 3", "Merekam Lineage Graph (DAG) untuk komputasi ulang partisi hilang"],
        ["Evaluasi Eksekusi", "Eager Execution (langsung dieksekusi per tahap)", "Lazy Evaluation (baru dieksekusi saat Action dipanggil)"]
      ]
    }
  ],

  // Lab Esai MapReduce: 6 Kasus Legendaris Lengkap
  mapReduceCases: [
    {
      id: "word-count",
      title: "Kasus 1: Word Count Klasik (Frekuensi Kata)",
      difficulty: "Mudah",
      badge: "Dasar Wajib",
      problem: "Diberikan sekumpulan dokumen teks mentah berukuran 1 TB di HDFS. Rancang program MapReduce untuk menghitung total frekuensi kemunculan setiap kata unik!",
      input: "<k1, v1> = <ByteOffset (LongWritable), LineText (Text)>",
      mapper: "1. Tokenisasi baris kalimat menjadi kata-kata terpisah berdasarkan spasi.\n2. Bersihkan tanda baca dan ubah menjadi huruf kecil (case-insensitive).\n3. Untuk setiap kata W, pancarkan: Emit <W, 1>.",
      combinerEval: "Valid & Dianjurkan. Operasi penjumlahan bersifat komutatif dan asosiatif.\nLogika: local_sum = sum(1). Pancarkan: Emit <W, local_sum>.",
      shuffleSort: "HashPartitioner merutekan semua record dengan kata W yang sama ke Reducer yang sama. Menghasilkan <W, list(counts)>.",
      reducer: "Inisialisasi total = 0.\nIterasi untuk setiap nilai c dalam list: total += c.\nPancarkan hasil akhir ke HDFS: Emit <W, total>."
    },
    {
      id: "highest-value",
      title: "Kasus 2: Nilai Tertinggi Global (Highest / Max Value)",
      difficulty: "Sedang",
      badge: "Sering Keluar",
      problem: "Diberikan file CSV data penggajian pegawai: EmpID, Name, Department, Salary. Rancang MapReduce untuk mencari GAJI TERTINGGI di seluruh perusahaan beserta nama karyawannya!",
      input: "<k1, v1> = <ByteOffset, 'EmpID, Name, Department, Salary'>",
      mapper: "1. Parse kolom Name dan Salary.\n2. Gunakan Kunci Dummy Tunggal agar semua kandidat bermuara ke titik yang sama.\n3. Pancarkan: Emit <'GLOBAL_MAX', (Salary, Name)>.",
      combinerEval: "Sangat Dianjurkan. Fungsi MAX bersifat komutatif & asosiatif.\nLogika: Cari pegawai dengan gaji tertinggi di mesin mapper lokal tersebut.\nHanya pancarkan 1 pemenang lokal: Emit <'GLOBAL_MAX', (MaxSalary_local, Name_local)>.",
      shuffleSort: "Seluruh pemenang lokal dari setiap node pekerja dikumpulkan ke satu Reducer: <'GLOBAL_MAX', list((Salary, Name))>.",
      reducer: "Inisialisasi: max_val = -1, winner_name = ''.\nIterasi list kandidat:\n  Jika Salary > max_val: max_val = Salary, winner_name = Name.\nPancarkan hasil akhir ke HDFS: Emit <winner_name, max_val>."
    },
    {
      id: "group-sum",
      title: "Kasus 3: Agregasi Omset Penjualan per Kota (GROUP BY + SUM)",
      difficulty: "Sedang",
      badge: "Favorit Dosen",
      problem: "Diberikan data transaksi penjualan: TransactionID, StoreCity, ProductID, AmountSold. Rancang MapReduce untuk menghitung TOTAL OMSET PENJUALAN per kota toko!",
      input: "<k1, v1> = <ByteOffset, 'TransactionID, StoreCity, ProductID, AmountSold'>",
      mapper: "1. Parse kolom StoreCity sebagai Kunci dan AmountSold sebagai Nilai.\n2. Pancarkan: Emit <StoreCity, AmountSold>.",
      combinerEval: "Valid & Sangat Optimal. Penjumlahan bersifat asosiatif dan komutatif.\nLogika: Jumlahkan AmountSold lokal per kota di node mapper.\nPancarkan: Emit <StoreCity, sum_local>.",
      shuffleSort: "Mengelompokkan seluruh omset berdasarkan StoreCity yang sama ke Reducer: <StoreCity, list(amounts)>.",
      reducer: "Inisialisasi grand_total = 0.\nIterasi list: grand_total += val.\nPancarkan hasil akhir ke HDFS: Emit <StoreCity, grand_total>."
    },
    {
      id: "avg-composite",
      title: "Kasus 4: Rata-Rata Gaji per Departemen (Pola Komposit Khusus)",
      difficulty: "Tinggi",
      badge: "High Trap Risk",
      problem: "Diberikan data pegawai: EmpID, Department, Salary. Rancang MapReduce untuk menghitung RATA-RATA GAJI per departemen dengan memanfaatkan Combiner secara benar!",
      input: "<k1, v1> = <ByteOffset, 'EmpID, Department, Salary'>",
      mapper: "1. Parse kolom Department dan Salary.\n2. Gunakan pola pasangan komposit (Count, Sum) dengan Count inisial = 1.\n3. Pancarkan: Emit <Department, (1, Salary)>.",
      combinerEval: "Wajib Pola Komposit! Operasi AVG naif salah jika dihitung di combiner.\nLogika: Hitung total orang lokal: C_local = sum(1) dan total gaji lokal: S_local = sum(Salary).\nPancarkan: Emit <Department, (C_local, S_local)>.",
      shuffleSort: "Mengelompokkan pasangan komposit parsial ke Reducer: <Department, list((C_1, S_1), (C_2, S_2), ...)>.",
      reducer: "Inisialisasi total_pegawai = 0, total_gaji = 0.\nIterasi list: total_pegawai += C_i; total_gaji += S_i.\nHitung rata-rata sebenarnya: avg_salary = total_gaji / total_pegawai.\nPancarkan hasil akhir ke HDFS: Emit <Department, avg_salary>."
    },
    {
      id: "composite-key",
      title: "Kasus 5: Kunci Komposit Multi-Kolom (Country + State)",
      difficulty: "Sedang",
      badge: "Kisi-Kisi 2026",
      problem: "Diberikan file data sensus: Country, StateProvince, District, Population. Rancang MapReduce untuk menghitung TOTAL POPULASI per provinsi di setiap negara!",
      input: "<k1, v1> = <ByteOffset, 'Country, StateProvince, District, Population'>",
      mapper: "1. Parse kolom Country, StateProvince, dan Population.\n2. Buat Kunci Komposit unik: composite_key = Country + ':' + StateProvince.\n3. Pancarkan: Emit <composite_key, Population>.",
      combinerEval: "Valid & Menghemat Bandwidth.\nLogika: Jumlahkan populasi lokal untuk pasangan negara-provinsi yang sama.\nPancarkan: Emit <composite_key, sum_pop_local>.",
      shuffleSort: "Merutekan seluruh record dengan composite_key identik ke Reducer yang sama: <'Indonesia:JawaTimur', list(pop_subtotals)>.",
      reducer: "Inisialisasi total_pop = 0.\nIterasi list: total_pop += p.\nPancarkan hasil akhir ke HDFS: Emit <composite_key, total_pop>."
    },
    {
      id: "two-pass-topk",
      title: "Kasus 6: Pencarian Dua Tahap Top-10 URL Populer (Two-Pass Job)",
      difficulty: "Sangat Tinggi",
      badge: "Kasus Mahir",
      problem: "Diberikan log web server 2 TB: timestamp, ip_address, url, status_code. Rancang arsitektur MapReduce untuk menemukan 10 URL YANG PALING SERING DIKUNJUNGI (Top-10 URLs)!",
      input: "<k1, v1> = <ByteOffset, 'timestamp, ip, url, status'>",
      mapper: "Dipecah menjadi 2 Job Berantai:\nJob 1 (Hitung Frekuensi): Mapper ekstrak url -> Emit <url, 1>. Combiner sum(1). Reducer 1 hitung total per url -> Tulis ke HDFS (url, total_clicks).\nJob 2 (Cari Top-10 Global): Mapper 2 membaca output Job 1.",
      combinerEval: "Pada Job 2: Mapper 2 memelihara Min-Heap (PriorityQueue) berukuran maksimal 10 di memori. Hanya 10 pemenang lokal yang dipancarkan: Emit <'TOP', (url, total)>.",
      shuffleSort: "Job 2 mengatur numReduceTasks = 1 agar seluruh 10 kandidat teratas dari setiap mapper berkumpul di satu Reducer.",
      reducer: "Reducer Job 2 menampung seluruh kandidat ke Min-Heap global ukuran 10.\nPancarkan tepat 10 URL teratas dengan frekuensi tertinggi secara berurutan ke HDFS!"
    }
  ]
};
