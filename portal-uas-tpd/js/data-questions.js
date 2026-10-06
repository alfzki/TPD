/**
 * data-questions.js
 * Bank Soal Lengkap & Prediksi UAS TPD 2025/2026
 * Terdiri dari 4 Set Soal:
 * - Set 1: Prediksi Utama UAS 2025/2026 (30 PG + 3 Esai)
 * - Set 2: Pendalaman Textbook Tom White & Mekanisme Internal (30 PG + 3 Esai)
 * - Set 3: Studi Kasus Industri, Troubleshooting & Arsitektur (30 PG + 3 Esai)
 * - Set 4: Arsip Asli Naskah UAS 2022/2023 (25 PG + 5 Esai)
 */

window.TPD_EXAM_DATA = {
  sets: [
    {
      id: "set-1",
      title: "Set 1: Prediksi Utama UAS 2025/2026",
      subtitle: "Simulasi Ujian Konsep Fundamental & Arsitektur (Sesuai Kisi-Kisi Resmi Dosen)",
      badge: "PREDIKSI UTAMA",
      badgeColor: "bg-emerald-500",
      description: "30 Soal Pilihan Ganda dan 3 Soal Esai yang dirancang khusus memprediksi bentuk naskah UAS TPD 2025/2026 berdasarkan silabus Politeknik Statistika STIS dan arahan dosen pengampu.",
      questionsCount: 30,
      essayCount: 3,
      topics: [
        { id: "dwh", name: "Data Warehouse & OLAP", count: 5 },
        { id: "dim", name: "Dimensional Modeling & SCD", count: 9 },
        { id: "etl", name: "ETL vs ELT", count: 4 },
        { id: "hadoop", name: "Hadoop & HDFS", count: 6 },
        { id: "mapreduce", name: "MapReduce", count: 3 },
        { id: "tools", name: "Ekosistem Tools", count: 3 }
      ],
      questions: [
        {
          id: 1,
          topic: "dwh",
          topicName: "Data Warehouse",
          question: "Definisi klasik Data Warehouse yang dirumuskan oleh Bill Inmon pada tahun 1990 mencakup empat karakteristik utama, yaitu...",
          options: [
            "Application-oriented, distributed, volatile, time-variant",
            "Subject-oriented, integrated, non-volatile, time-variant",
            "Process-oriented, normalized, volatile, real-time",
            "Transaction-oriented, consolidated, editable, static"
          ],
          correct: 1,
          explanation: "Menurut Bill Inmon (bapak Data Warehouse), Data Warehouse adalah kumpulan data yang berorientasi subjek (Subject-oriented), terintegrasi (Integrated), tidak dapat diubah (Non-volatile), dan bervariasi waktu (Time-variant) yang digunakan untuk mendukung proses pengambilan keputusan manajemen."
        },
        {
          id: 2,
          topic: "dwh",
          topicName: "Data Warehouse",
          question: "Karakteristik 'Non-Volatile' pada Data Warehouse memiliki makna operasional bahwa...",
          options: [
            "Data dapat diubah dan dihapus sewaktu-waktu oleh pengguna akhir untuk menjaga relevansi.",
            "Data hanya tersimpan sementara di memori RAM dan hilang jika server dimatikan.",
            "Data yang telah dimuat bersifat permanen (read-only bagi analis), tidak ditimpa (in-place update), dan hanya diperbarui melalui penambahan data baru (append-only).",
            "Data selalu berubah mengikuti transaksi kasir detik demi detik."
          ],
          correct: 2,
          explanation: "Non-volatile berarti data historis yang sudah masuk ke Data Warehouse bersifat permanen dan stabil. Tidak ada transaksi UPDATE atau DELETE langsung oleh pengguna (read-only). Data baru ditambahkan secara append-only untuk melestarikan jejak historis."
        },
        {
          id: 3,
          topic: "dwh",
          topicName: "Data Warehouse",
          question: "Manakah dari pernyataan berikut yang paling tepat membedakan sistem OLTP dan OLAP?",
          options: [
            "OLTP menggunakan skema denormalisasi untuk kueri cepat, sedangkan OLAP menggunakan 3NF ketat.",
            "OLTP berfokus pada eksekusi transaksi operasional saat ini (current), sedangkan OLAP berfokus pada kueri analitis data historis multidimensi.",
            "OLTP melayani puluhan analis manajerial, sedangkan OLAP melayani jutaan kasir secara konkuren.",
            "OLTP memiliki latensi pemrosesan tumpak harian, sedangkan OLAP harus merespons dalam hitungan milidetik."
          ],
          correct: 1,
          explanation: "OLTP (Online Transaction Processing) dirancang untuk memproses transaksi bisnis harian secara cepat dengan data operasional terkini (current data, normalized 3NF). Sebaliknya, OLAP (Online Analytical Processing) dirancang untuk kueri agregasi historis multidimensi yang kompleks bagi pengambil keputusan."
        },
        {
          id: 4,
          topic: "dwh",
          topicName: "Data Warehouse",
          question: "Dalam perancangan Enterprise Data Warehouse (EDW), pendekatan Inmon (Top-Down) berbeda dengan pendekatan Kimball (Bottom-Up) dalam hal...",
          options: [
            "Inmon membangun Data Mart terlebih dahulu, sedangkan Kimball membangun EDW 3NF terpusat terlebih dahulu.",
            "Inmon memodelkan data warehouse inti dalam bentuk relasional ternormalisasi (3NF), sedangkan Kimball langsung menggunakan model dimensional (Star/Snowflake Schema).",
            "Inmon menghasilkan biaya inisial yang jauh lebih murah dan time-to-market yang lebih cepat dibandingkan Kimball.",
            "Pendekatan Kimball menolak penggunaan Conformed Dimensions."
          ],
          correct: 1,
          explanation: "Inmon menggunakan pendekatan Corporate Information Factory (CIF) Top-Down dengan memodelkan EDW terpusat dalam bentuk 3NF (ternormalisasi), baru kemudian menurunkan data mart dependen. Sebaliknya, Kimball menggunakan pendekatan Bottom-Up Dimensional Bus Architecture yang langsung memodelkan proses bisnis dalam Star/Snowflake Schema menggunakan Conformed Dimensions."
        },
        {
          id: 5,
          topic: "dwh",
          topicName: "Data Warehouse",
          question: "Pernyataan yang BENAR mengenai perbedaan antara Data Mart dan Enterprise Data Warehouse (EDW) adalah...",
          options: [
            "Data Mart mencakup seluruh data organisasi lintas divisi, sedangkan EDW hanya untuk satu departemen.",
            "Data Mart berfokus pada subjek tunggal untuk satu unit bisnis/departemen tertentu, sedangkan EDW mencakup seluruh enterprise.",
            "Waktu implementasi Data Mart jauh lebih lama dan membutuhkan biaya lebih besar daripada EDW.",
            "Data Mart selalu menyimpan data mentah yang belum dibersihkan."
          ],
          correct: 1,
          explanation: "Data Mart adalah subset dari Data Warehouse yang berorientasi pada satu subjek atau divisi tertentu (misal: Finance, Marketing). Sementara EDW mencakup seluruh data perusahaan lintas departemen."
        },
        {
          id: 6,
          topic: "dim",
          topicName: "Dimensional Modeling",
          question: "Karakteristik utama dari sebuah Fact Table dalam pemodelan dimensional adalah...",
          options: [
            "Memiliki kunci primer tunggal (simple primary key) dan berisi atribut teks deskriptif yang panjang.",
            "Memiliki Composite Primary Key yang tersusun atas kumpulan Foreign Keys ke tabel dimensi dan berisi metrik pengukuran numerik kuantitatif (measures).",
            "Bersifat sangat kecil dengan jumlah baris tidak lebih dari seribu record.",
            "Merupakan tabel yang menyimpan hierarki normalisasi cabang dan wilayah."
          ],
          correct: 1,
          explanation: "Fact Table berisi angka pengukuran numerik (measures/metrics) yang dihasilkan oleh kejadian bisnis. Kunci primernya adalah Composite Primary Key yang merupakan kombinasi Foreign Keys yang merujuk ke Dimension Tables terkait."
        },
        {
          id: 7,
          topic: "dim",
          topicName: "Dimensional Modeling",
          question: "Mengapa penggunaan Surrogate Key sangat direkomendasikan pada Dimension Table dibandingkan Natural Key?",
          options: [
            "Karena Surrogate Key menghemat kapasitas hard disk secara mutlak dan menghilangkan kebutuhan index.",
            "Karena Surrogate Key memberikan independensi dari sistem sumber OLTP dan mempermudah pelacakan perubahan historis pada SCD Tipe 2.",
            "Karena Natural Key tidak dapat digunakan sama sekali dalam database relasional.",
            "Karena Surrogate Key dibuat langsung oleh kasir pada sistem transaksi operasional."
          ],
          correct: 1,
          explanation: "Surrogate Key (kunci tiruan berupa integer berurutan) mengisolasi data warehouse dari perubahan format/daur ulang kunci di sistem operasional OLTP, serta menjadi kunci utama dalam mengimplementasikan SCD Tipe 2 (di mana satu entitas bisnis bisa memiliki banyak baris record historis)."
        },
        {
          id: 8,
          topic: "dim",
          topicName: "Dimensional Modeling",
          question: "Pembeda utama antara Star Schema dan Snowflake Schema adalah...",
          options: [
            "Star Schema memiliki tabel fakta ternormalisasi, sedangkan Snowflake Schema memiliki tabel fakta didenormalisasi.",
            "Star Schema memiliki tabel-tabel dimensi yang didenormalisasi (denormalized), sedangkan Snowflake Schema menormalisasi tabel dimensi ke dalam hierarki beberapa tabel relasional.",
            "Kueri pada Snowflake Schema jauh lebih cepat dan membutuhkan lebih sedikit operasi JOIN dibandingkan Star Schema.",
            "Star Schema tidak mendukung pembuatan agregasi data cube."
          ],
          correct: 1,
          explanation: "Pada Star Schema, setiap dimensi didenormalisasi menjadi satu tabel tunggal (sehingga kueri JOIN sangat sedikit dan cepat). Pada Snowflake Schema, tabel dimensi dinormalisasi lebih lanjut ke dalam hierarki tabel (misal Produk -> Sub-Kategori -> Kategori), menghemat storage namun memperlambat kueri karena banyaknya JOIN."
        },
        {
          id: 9,
          topic: "dim",
          topicName: "Dimensional Modeling",
          question: "Konsep Conformed Dimensions dalam metodologi Kimball merujuk pada...",
          options: [
            "Dimensi yang hanya boleh digunakan oleh satu tabel fakta secara eksklusif.",
            "Dimensi yang memiliki definisi dan struktur atribut yang konsisten sehingga dapat digunakan bersama oleh beberapa Data Mart dalam satu perusahaan.",
            "Dimensi yang nilainya tidak boleh memiliki penanda waktu atau tanggal.",
            "Dimensi sementara yang dihapus setelah proses ETL selesai."
          ],
          correct: 1,
          explanation: "Conformed Dimensions adalah dimensi yang distandardisasi dan dipakai bersama oleh lebih dari satu tabel fakta/Data Mart (misal: Dimensi Waktu, Dimensi Pelanggan), sehingga memungkinkan kueri analitis terintegrasi lintas proses bisnis."
        },
        {
          id: 10,
          topic: "dim",
          topicName: "Dimensional Modeling",
          question: "Dalam 4 tahapan Dimensional Modeling menurut Kimball, manakah atribut berikut yang TIDAK TEPAT dimasukkan ke dalam Fact Table pada proses bisnis penjualan ritel harian?",
          options: [
            "total_sales_amount (Numerik aditif)",
            "quantity_sold (Numerik aditif)",
            "customer_full_name (Teks deskriptif)",
            "discount_given (Numerik aditif)"
          ],
          correct: 2,
          explanation: "Teks deskriptif seperti nama lengkap pelanggan (customer_full_name) adalah atribut dimensi dan wajib berada di Dim_Customer. Fact Table hanya menampung Foreign Keys ke dimensi dan nilai pengukuran numerik kuantitatif (measures)."
        },
        {
          id: 11,
          topic: "dim",
          topicName: "Slowly Changing Dimensions",
          question: "Jika terjadi perubahan alamat pelanggan dari 'Jakarta' ke 'Surabaya', dan sistem memutuskan untuk menerapkan Slowly Changing Dimension (SCD) Tipe 2, maka yang dilakukan oleh sistem DWH adalah...",
          options: [
            "Menimpa (overwrite) nilai 'Jakarta' menjadi 'Surabaya' pada baris yang sama tanpa mencatat tanggal.",
            "Menghapus record pelanggan tersebut dari database.",
            "Menyisipkan baris baru dengan Surrogate Key baru, mengisi Start_Date baru, dan menandai baris lama dengan End_Date serta status tidak aktif.",
            "Menambahkan kolom baru bernama Previous_City di baris yang sama."
          ],
          correct: 2,
          explanation: "SCD Tipe 2 melestarikan riwayat perubahan historis secara lengkap dengan menyisipkan baris baru (new row) ber-Surrogate Key baru, mengisi Start_Date = tanggal perubahan, dan menutup baris lama dengan End_Date serta flag Is_Current = 'N'."
        },
        {
          id: 12,
          topic: "dim",
          topicName: "OLAP Cube",
          question: "Operasi analitis pada OLAP Data Cube yang menaikkan tingkat abstraksi data dengan merangkum data sepanjang hierarki dimensi (misal dari level Kota naik ke level Provinsi) disebut...",
          options: [
            "Drill-down",
            "Slice",
            "Dice",
            "Roll-up"
          ],
          correct: 3,
          explanation: "Roll-up (drill-up) melakukan agregasi data dengan menaikkan hierarki dimensi (misal dari Hari ke Bulan ke Tahun, atau dari Kota ke Provinsi). Lawannya adalah Drill-down (memperinci data)."
        },
        {
          id: 13,
          topic: "dim",
          topicName: "OLAP Cube",
          question: "Operasi OLAP yang melakukan penyaringan (filtering) pada dua atau lebih dimensi sekaligus untuk mengambil sebuah sub-kubus data disebut...",
          options: [
            "Slice",
            "Dice",
            "Pivot",
            "Drill-down"
          ],
          correct: 1,
          explanation: "Slice mengambil potongan satu irisan dimensi tunggal (filter pada 1 dimensi). Dice melakukan penyaringan pada dua atau lebih dimensi secara bersamaan sehingga menghasilkan sub-kubus yang lebih kecil."
        },
        {
          id: 14,
          topic: "dim",
          topicName: "OLAP Cube",
          question: "Arsitektur server OLAP yang menyimpan data agregasi dalam format kubus multidimensi di memori/disk khusus sehingga menghasilkan waktu respon kueri paling cepat adalah...",
          options: [
            "ROLAP (Relational OLAP)",
            "MOLAP (Multidimensional OLAP)",
            "DOLAP (Desktop OLAP)",
            "HOLAP (Hybrid OLAP)"
          ],
          correct: 1,
          explanation: "MOLAP (Multidimensional OLAP) melakukan pra-komputasi kubus multidimensi dan menyimpannya dalam struktur array multidimensi khusus, menghasilkan performa kueri agregasi tercepat dibandingkan ROLAP yang masih mengandalkan tabel relasional."
        },
        {
          id: 15,
          topic: "etl",
          topicName: "ETL vs ELT",
          question: "Perbedaan mendasar paling kritis antara arsitektur ETL dan ELT terletak pada...",
          options: [
            "Tipe data yang diproses, di mana ETL hanya untuk teks dan ELT hanya untuk citra digital.",
            "Lokasi dan waktu dilakukannya transformasi data, di mana ETL mentransformasikan data di server staging sebelum dimuat, sedangkan ELT memuat data mentah ke target terlebih dahulu baru mentransformasikannya di engine target.",
            "Biaya lisensi perangkat lunak, di mana ETL selalu berbayar dan ELT selalu open source.",
            "Kebutuhan koneksi jaringan, di mana ETL tidak membutuhkan konektor ODBC."
          ],
          correct: 1,
          explanation: "Pada ETL (Extract-Transform-Load), transformasi dilakukan di server ETL/staging terpisah sebelum data dimuat ke Data Warehouse (Schema-on-Write). Pada ELT (Extract-Load-Transform), data mentah langsung dimuat ke target (Data Lake/Cloud Warehouse) dan transformasi dilakukan di dalam sistem target menggunakan daya komputasi paralelnya (Schema-on-Read)."
        },
        {
          id: 16,
          topic: "etl",
          topicName: "ETL vs ELT",
          question: "Mengapa paradigma ELT menjadi sangat populer pada era Big Data dan modern Cloud Data Warehouse?",
          options: [
            "Karena server target (seperti cluster Hadoop atau cloud warehouse) memiliki daya komputasi paralel masif untuk memproses transformasi langsung di atas data mentah (raw data lake).",
            "Karena data mentah tidak memerlukan tata kelola keamanan sama sekali.",
            "Karena ELT sama sekali tidak memerlukan proses ekstraksi data.",
            "Karena ELT menghilangkan kebutuhan analisis bisnis."
          ],
          correct: 0,
          explanation: "Teknologi modern seperti Snowflake, BigQuery, dan cluster Hadoop memiliki daya komputasi terdistribusi yang sangat besar, sehingga memuat data mentah langsung (Load) lalu mengeksekusi transformasi paralel di dalamnya (Transform) jauh lebih cepat dan fleksibel."
        },
        {
          id: 17,
          topic: "etl",
          topicName: "Pipeline ETL",
          question: "Dalam alur kerja transformasi ETL, operasi yang bertujuan mendeteksi dan mengeliminasi record ganda yang memiliki kesamaan identitas bisnis disebut...",
          options: [
            "Data Filtering",
            "Data Cleansing",
            "Data Deduplicating",
            "Data Aggregation"
          ],
          correct: 2,
          explanation: "Data Deduplication (deduplikasi) adalah tahap transformasi untuk mencari dan menghapus baris-baris duplikat yang memiliki identitas kunci bisnis sama agar data tidak terhitung ganda di gudang data."
        },
        {
          id: 18,
          topic: "etl",
          topicName: "Pipeline ETL",
          question: "Manakah dari komponen transformasi berikut dalam tools ETL (seperti SSIS) yang tergolong sebagai Asynchronous (Blocking) Transformation dan harus digunakan secara hati-hati?",
          options: [
            "Derived Column",
            "Character Map",
            "Sort dan Aggregate",
            "Data Conversion"
          ],
          correct: 2,
          explanation: "Komponen Sort dan Aggregate merupakan transformasi blocking (asynchronous) karena mesin ETL harus membaca seluruh baris data hingga selesai sebelum dapat memancarkan satu baris output pun, sehingga membutuhkan banyak memori buffer dan berpotensi memperlambat aliran pipeline."
        },
        {
          id: 19,
          topic: "hadoop",
          topicName: "Pengenalan Hadoop",
          question: "Filosofi utama pemrosesan data terdistribusi pada Apache Hadoop yang membedakannya secara fundamental dari sistem komputasi terpusat tradisional adalah...",
          options: [
            "Memindahkan dataset berukuran besar melalui kabel jaringan menuju ke satu server prosesor super cepat.",
            "\"Moving computation to the data, not moving data to the computation\" (Data Locality).",
            "Mengandalkan perangkat keras superkomputer berbiaya sangat tinggi untuk mencegah kerusakan.",
            "Menyimpan semua dataset hanya di dalam memori RAM tanpa pernah menulis ke hard disk."
          ],
          correct: 1,
          explanation: "Prinsip inti Hadoop adalah Data Locality: daripada memindahkan data berukuran Terabyte/Petabyte melintasi jaringan kabel yang lambat menuju prosesor, Hadoop mengirimkan kode program kecil menuju node-node tempat data tersebut tersimpan."
        },
        {
          id: 20,
          topic: "hadoop",
          topicName: "Hadoop Architecture",
          question: "Perbedaan utama antara Hadoop Single Node Cluster dan Multi Node Cluster adalah...",
          options: [
            "Single Node Cluster tidak memiliki HDFS, sedangkan Multi Node Cluster memiliki HDFS.",
            "Single Node Cluster menjalankan seluruh daemon (NameNode, DataNode, dll.) pada satu mesin fisik yang sama dengan hanya 1 DataNode aktif.",
            "Multi Node Cluster hanya dapat menjalankan program MapReduce dalam bahasa Python.",
            "Single Node Cluster dirancang khusus untuk beban kerja produksi industri perbankan."
          ],
          correct: 1,
          explanation: "Pada Single Node Cluster (Pseudo-Distributed Mode), semua daemon master dan slave (NameNode, DataNode, ResourceManager, NodeManager) dieksekusi sebagai proses JVM terpisah di dalam satu mesin fisik yang sama. Digunakan untuk keperluan belajar dan development."
        },
        {
          id: 21,
          topic: "hadoop",
          topicName: "HDFS Architecture",
          question: "Peran dan tanggung jawab utama dari NameNode dalam arsitektur HDFS adalah...",
          options: [
            "Menyimpan blok-blok data fisik aktual pada piringan disk lokalnya.",
            "Menjalankan fungsi map dan reduce secara komputasional.",
            "Mengelola namespace sistem file, menyimpan metadata struktur direktori dan pemetaan blok di memori RAM.",
            "Mengirimkan sinyal heartbeat setiap 3 detik ke DataNode."
          ],
          correct: 2,
          explanation: "NameNode adalah master dalam HDFS. Tugas utamanya mengelola namespace sistem file (hierarki pohon direktori) dan memetakan blok-blok data ke DataNode. Seluruh metadata ini disimpan aktif di dalam memori utama (RAM) agar aksesnya sangat cepat."
        },
        {
          id: 22,
          topic: "hadoop",
          topicName: "HDFS Architecture",
          question: "Ukuran blok default pada HDFS versi modern (Hadoop 2.x/3.x) dan faktor replikasi bawaannya adalah...",
          options: [
            "4 KB dan replikasi 1",
            "64 KB dan replikasi 2",
            "128 MB dan replikasi 3",
            "1 GB dan replikasi 5"
          ],
          correct: 2,
          explanation: "Ukuran blok default HDFS pada Hadoop 2.x/3.x adalah 128 MB (pada Hadoop 1.x adalah 64 MB), dan faktor replikasi defaultnya adalah 3 (tiga salinan per blok)."
        },
        {
          id: 23,
          topic: "hadoop",
          topicName: "Textbook Tom White",
          question: "Mengapa ukuran blok pada HDFS dirancang sangat besar (default 128 MB) dibandingkan ukuran blok OS biasa (4 KB)?",
          options: [
            "Agar semua file berukuran di bawah 1 KB otomatis ditolak oleh Hadoop.",
            "Untuk meminimalkan biaya pencarian piringan disk (disk seek time) dan menghemat penggunaan memori RAM pada NameNode.",
            "Karena hardware komoditas tidak mampu membaca blok kecil.",
            "Agar data tidak dapat dibaca oleh pengguna yang tidak berhak."
          ],
          correct: 1,
          explanation: "Menurut Tom White, HDFS dirancang untuk file berukuran sangat besar. Ukuran blok 128 MB membuat rasio waktu pencarian track disk (seek time ~10ms) hanya sekitar 1% dari total waktu transfer data streaming (~100 MB/s). Selain itu, blok besar mengurangi jumlah entri metadata di RAM NameNode (~150 byte per objek)."
        },
        {
          id: 24,
          topic: "hadoop",
          topicName: "HDFS Architecture",
          question: "Pada mekanisme HDFS Read Path, ketika aplikasi klien ingin membaca sebuah file, aliran transfer data blok terjadi antara...",
          options: [
            "Data mengalir dari DataNode ke NameNode, lalu NameNode mengirimkannya ke Klien.",
            "Data mengalir langsung dari DataNode terdekat ke Klien melalui streaming soket TCP tanpa melalui NameNode.",
            "Data harus disalin terlebih dahulu ke Secondary NameNode sebelum dibaca klien.",
            "Klien membaca langsung dari hard disk server Master."
          ],
          correct: 1,
          explanation: "Klien hanya meminta daftar lokasi blok dari NameNode. Setelah mendapatkan daftar alamat DataNode, klien langsung membuka streaming soket TCP ke DataNode terdekat untuk membaca data secara langsung, sehingga NameNode tidak menjadi bottleneck lalu lintas data."
        },
        {
          id: 25,
          topic: "mapreduce",
          topicName: "MapReduce Concept",
          question: "Model pemrograman MapReduce pertama kali diformulasikan oleh Jeffrey Dean dan Sanjay Ghemawat pada tahun 2004 di perusahaan...",
          options: [
            "Yahoo!",
            "Facebook",
            "Google",
            "Microsoft"
          ],
          correct: 2,
          explanation: "MapReduce pertama kali dirumuskan dan dipatenkan oleh Jeffrey Dean dan Sanjay Ghemawat dari Google pada paper ilmiah tahun 2004 berjudul 'MapReduce: Simplified Data Processing on Large Clusters'."
        },
        {
          id: 26,
          topic: "mapreduce",
          topicName: "MapReduce Internals",
          question: "Dalam alur kerja MapReduce, apa fungsi utama dari fase Shuffling and Sorting?",
          options: [
            "Menghapus record yang memiliki nilai null sebelum masuk ke mapper.",
            "Memindahkan pasangan nilai perantara (intermediate pairs) melintasi jaringan dan mengelompokkan semua nilai yang memiliki kunci perantara yang sama ke mesin Reducer yang sama.",
            "Mengompresi file keluaran akhir di HDFS menjadi format binary.",
            "Mengalokasikan memori RAM di Master Node untuk mengeksekusi Driver."
          ],
          correct: 1,
          explanation: "Fase Shuffle & Sort adalah jantung MapReduce: Shuffle memindahkan intermediate key-value pairs dari berbagai node Mapper melalui jaringan ke node Reducer yang tepat, sedangkan Sort mengurutkan nilai-nilai tersebut berdasarkan kuncinya agar Reducer menerima format <key, list(values)>."
        },
        {
          id: 27,
          topic: "mapreduce",
          topicName: "MapReduce Internals",
          question: "Pasangan data perantara (intermediate key-value pairs) yang dihasilkan oleh fungsi map() pada mulanya disimpan di...",
          options: [
            "HDFS dengan faktor replikasi 3.",
            "Memori buffer lokal (Map Output Buffer di RAM 100 MB) dan di-spill ke hard disk lokal milik DataNode tersebut jika buffer mencapai 80%.",
            "Memori utama milik NameNode.",
            "Database MySQL di server Metastore."
          ],
          correct: 1,
          explanation: "Output dari Mapper tidak pernah ditulis langsung ke HDFS. Ia ditampung di circular memory buffer (default 100 MB). Saat mencapai ambang batas 80% (spill threshold), data diurutkan dan ditulis (spill) ke hard disk lokal mesin pekerja tempat mapper berjalan."
        },
        {
          id: 28,
          topic: "tools",
          topicName: "Ekosistem Tools",
          question: "Tool dalam ekosistem Hadoop yang memiliki spesialisasi utama memindahkan data secara massal antara database relasional (RDBMS) dan HDFS secara dua arah dengan menjalankan Map-only job adalah...",
          options: [
            "Apache Flume",
            "Apache Sqoop",
            "Apache Pig",
            "Apache Hive"
          ],
          correct: 1,
          explanation: "Apache Sqoop (SQL-to-Hadoop) dirancang khusus untuk bulk data transfer antara RDBMS (MySQL, Oracle, PostgreSQL) dan ekosistem Hadoop (HDFS, Hive, HBase). Sqoop secara default mengeksekusi Map-Only Job (tanpa Reducer) untuk paralelisasi pembacaan/penulisan."
        },
        {
          id: 29,
          topic: "tools",
          topicName: "Ekosistem Tools",
          question: "Manakah pernyataan yang paling akurat membedakan antara Apache Hive dan Apache HBase?",
          options: [
            "Hive adalah database NoSQL real-time berorientasi kolom, sedangkan HBase adalah data warehouse batch berbasis SQL.",
            "Hive menyediakan interface kueri mirip SQL (HiveQL) untuk pemrosesan analitis batch skala besar berlatensi tinggi, sedangkan HBase adalah database NoSQL yang menyediakan akses baca/tulis acak berlatensi rendah (real-time random read/write).",
            "Hive tidak menggunakan HDFS sebagai media penyimpanan, sedangkan HBase wajib menggunakan MapReduce untuk setiap kueri baca.",
            "Hive tidak memiliki skema, sedangkan HBase memiliki skema relasional 3NF yang kaku."
          ],
          correct: 1,
          explanation: "Hive adalah data warehouse deklaratif di atas HDFS untuk analisis batch kueri SQL skala besar (throughput tinggi, latensi tinggi). HBase adalah basis data NoSQL berorientasi column-family yang menyediakan pembacaan dan penulisan acak secara real-time berlatensi sangat rendah (sub-10ms) per baris (RowKey)."
        },
        {
          id: 30,
          topic: "tools",
          topicName: "Ekosistem Tools",
          question: "Mengapa Apache Spark mampu memproses komputasi analitis hingga 100 kali lebih cepat dibandingkan Hadoop MapReduce?",
          options: [
            "Karena Spark ditulis dalam bahasa C++ tanpa memerlukan JVM.",
            "Karena Spark memproses dan mempertahankan kumpulan data perantara (working datasets) langsung di dalam memori utama (RAM) menggunakan abstraksi RDD, menghindari beban berat baca/tulis disk fisik antar-tahap.",
            "Karena Spark tidak mendukung operasi agregasi dan pengurutan data.",
            "Karena Spark tidak memiliki mekanisme toleransi kesalahan (fault-tolerance)."
          ],
          correct: 1,
          explanation: "Spark adalah in-memory unified computing engine. Menggunakan abstraksi Resilient Distributed Dataset (RDD), Spark menyimpan dataset perantara langsung di RAM antar-tahap transformasi, menghilangkan disk I/O berulang yang menjadi kelemahan utama Hadoop MapReduce."
        }
      ],
      essays: [
        {
          id: 1,
          title: "Prediksi Esai 1: Perancangan MapReduce Penjualan E-Commerce",
          scenario: "Diberikan dataset log transaksi penjualan e-commerce dengan skema baris: transaction_id, customer_id, store_city, product_category, sale_amount. Rancanglah solusi MapReduce lengkap menggunakan Template 5 Komponen Baku untuk menghitung TOTAL PENJUALAN per pasangan Kota dan Kategori Produk (store_city + product_category)!",
          components: [
            {
              step: "1. Struktur Masukan (Input Data)",
              content: "Format data mentah: teks baris dengan delimiter koma (,).\nMasukan Mapper: <k1, v1> = <ByteOffset (LongWritable), LineText (Text)>."
            },
            {
              step: "2. Logika Mapper (Mapping Phase)",
              content: "Ekstrak kolom: store_city, product_category, dan sale_amount.\nBuat Kunci Komposit: composite_key = store_city + \"#\" + product_category.\nAmbil sale_amount sebagai numeric integer.\nPancarkan: Emit <composite_key, sale_amount>."
            },
            {
              step: "3. Evaluasi & Logika Combiner (Mini-Reducer)",
              content: "Evaluasi: Fungsi SUM bersifat asosiatif dan komutatif, sehingga penggunaan Combiner SANGAT VALID dan DIREKOMENDASIKAN.\nLogika: Menjumlahkan sale_amount lokal di node mapper untuk composite_key yang sama.\nPancarkan: Emit <composite_key, sum_local>."
            },
            {
              step: "4. Fase Shuffle & Sort (Framework Otomatis)",
              content: "Partisioning: HashPartitioner merutekan seluruh record dengan composite_key yang sama ke Reducer yang sama.\nGrouping: Mengelompokkan pasangan menjadi <composite_key, [sum_1, sum_2, ...] >."
            },
            {
              step: "5. Logika Reducer (Reducing Phase & Output)",
              content: "Masukan Reducer: <composite_key, Iterable<sale_amount>>.\nLogika: Inisialisasi grand_total = 0. Iterasi melalui list nilai: grand_total += val.\nPancarkan hasil akhir ke HDFS: Emit <composite_key, grand_total>."
            }
          ],
          rubric: [
            "Menyebutkan format masukan <k1, v1> berupa LongWritable dan Text (Bobot 20%)",
            "Membentuk Kunci Komposit yang tepat di Mapper dan memancarkan nilai penjualan (Bobot 25%)",
            "Menganalisis sifat komutatif/asosiatif Combiner dan membuat fungsi SUM lokal (Bobot 20%)",
            "Menjelaskan mekanisme Shuffle & Sort pengelompokan kunci (Bobot 15%)",
            "Melakukan akumulasi di Reducer dan menulis luaran final ke HDFS (Bobot 20%)"
          ]
        },
        {
          id: 2,
          title: "Prediksi Esai 2: Keandalan HDFS, Rack-Awareness & Penanganan Crash",
          scenario: "Jelaskan bagaimana penempatan replika berbasis Rack Awareness menjamin keandalan data saat 1 rak server mati total, dan jelaskan langkah-langkah yang dilakukan HDFS ketika 1 DataNode mengalami crash saat klien sedang membaca file!",
          components: [
            {
              step: "1. Kebijakan Penempatan Rack-Awareness (3 Replika)",
              content: "Replika 1: Ditempatkan di node lokal tempat klien menulis (Rak 1).\nReplika 2: Ditempatkan di node pada rak yang berbeda (Rak 2) untuk toleransi bencana tingkat rak.\nReplika 3: Ditempatkan di node berbeda namun masih di rak yang sama dengan Replika 2 (Rak 2).\nJaminan Keandalan: Jika Rak 1 terbakar atau switch jaringannya mati total, Replika 2 dan Replika 3 di Rak 2 tetap utuh dan data tetap 100% tersedia."
            },
            {
              step: "2. Penanganan Crash Saat Pembacaan Klien (Read Path Fallback)",
              content: "Klien mendeteksi kegagalan koneksi soket TCP dengan DataNode 1.\nDFSInputStream secara transparan beralih ke DataNode berikutnya dalam daftar blok yang diberikan NameNode tanpa membuat aplikasi pengguna crash.\nKlien mencatat DataNode yang gagal ke daftar blacklisted agar tidak dibaca lagi untuk blok selanjutnya."
            },
            {
              step: "3. Tindakan NameNode Terhadap Node Mati",
              content: "NameNode memantau heartbeat DataNode (default setiap 3 detik).\nJika dalam waktu 10 menit DataNode tidak mengirim heartbeat, NameNode mendeklarasikannya DEAD.\nNameNode mendeteksi blok-blok yang mengalami under-replicated (hanya tersisa 2 replika), lalu menjadwalkan replikasi blok dari node sehat ke DataNode lain agar faktor replikasi kembali menjadi 3."
            }
          ],
          rubric: [
            "Menjelaskan penempatan Replika 1, 2, dan 3 secara akurat sesuai Rack Awareness (Bobot 35%)",
            "Menjelaskan mekanisme failover transparan pada sisi klien saat DataNode crash (Bobot 35%)",
            "Menjelaskan peran NameNode dalam mendeteksi node dead via heartbeat dan mereplikasi ulang blok (Bobot 30%)"
          ]
        },
        {
          id: 3,
          title: "Prediksi Esai 3: Pemilihan Arsitektur Teknologi Big Data (Hive vs HBase vs Spark)",
          scenario: "Sebuah institusi pemerintah ingin membangun platform data terpadu untuk 3 kebutuhan berbeda: (A) Laporan bulanan agregasi sensus penduduk 20 TB, (B) Layanan pencarian instan profil penduduk berbasis NIK dengan latensi sub-50 ms, (C) Pelatihan model machine learning prediksi kemiskinan secara iteratif. Tentukan tool terbaik untuk masing-masing kasus dan jelaskan alasannya!",
          components: [
            {
              step: "1. Kebutuhan A: Laporan Agregasi Sensus 20 TB",
              content: "Tool Terpilih: Apache Hive (atau Spark SQL).\nAlasan Teknis: Ini adalah beban kerja pemrosesan batch terstruktur skala besar (OLAP). Hive menyediakan antarmuka deklaratif SQL (HiveQL) yang familiar, mampu melakukan optimasi partition pruning dan pembacaan format columnar Parquet di atas 20 TB data di HDFS. Latensi waktu kueri beberapa menit tidak menjadi kendala untuk laporan berkala bulanan."
            },
            {
              step: "2. Kebutuhan B: Pencarian Profil Instan Sub-50 ms",
              content: "Tool Terpilih: Apache HBase.\nAlasan Teknis: HBase adalah database NoSQL Column-Family yang dioptimalkan untuk akses acak (random read/write) berlatensi ultra-rendah (sub-10 ms) pada level baris. NIK penduduk dijadikan sebagai RowKey, sehingga kueri pencarian diarahkan langsung ke RegionServer terkait dan dilayani dari cache memori (MemStore / BlockCache) tanpa perlu melakukan full scan HDFS."
            },
            {
              step: "3. Kebutuhan C: Pelatihan Machine Learning Iteratif",
              content: "Tool Terpilih: Apache Spark (Spark MLlib).\nAlasan Teknis: Algoritma Machine Learning bersifat sangat iteratif (berulang-ulang memperbarui bobot model). Apache Spark mampu menyimpan dataset perantara langsung di dalam memori utama (RAM) menggunakan abstraksi RDD/DataFrame dan caching. Hal ini menghilangkan overhead penulisan disk fisik HDFS antar-iterasi, membuat proses training hingga 100x lebih cepat daripada MapReduce tradisional."
            }
          ],
          rubric: [
            "Memilih Hive untuk Kasus A dengan justifikasi pemrosesan batch OLAP (Bobot 33%)",
            "Memilih HBase untuk Kasus B dengan justifikasi kueri acak RowKey instan (Bobot 33%)",
            "Memilih Spark untuk Kasus C dengan justifikasi in-memory caching MLlib (Bobot 34%)"
          ]
        }
      ]
    },
    {
      id: "set-2",
      title: "Set 2: Pendalaman Textbook Tom White",
      subtitle: "Fokus Mekanisme Internal, HDFS Deep-Dive & Algoritma Internal",
      badge: "TEXTBOOK TOM WHITE",
      badgeColor: "bg-blue-600",
      description: "30 Soal Pilihan Ganda dan 3 Soal Esai dengan tingkat kedalaman tinggi, berfokus pada buku rujukan resmi 'Hadoop: The Definitive Guide' (Tom White 4th Ed).",
      questionsCount: 30,
      essayCount: 3,
      topics: [
        { id: "hdfs-deep", name: "HDFS Architecture & Internals", count: 15 },
        { id: "mr-deep", name: "MapReduce Internal Mechanisms", count: 7 },
        { id: "tools-deep", name: "Ekosistem Tools Internal", count: 8 }
      ],
      questions: [
        {
          id: 1,
          topic: "hdfs-deep",
          topicName: "HDFS Design",
          question: "Menurut buku teks Tom White (Chapter 3), HDFS dibangun di atas filosofi pola akses data...",
          options: [
            "Write-many, read-once",
            "Write-once, read-many-times (WORM)",
            "Concurrent write, random read-write",
            "Continuous random updates at arbitrary offsets"
          ],
          correct: 1,
          explanation: "Filosofi utama HDFS adalah WORM (Write-Once, Read-Many). Data ditulis sekali dan kemudian dibaca berkali-kali untuk analisis batch. HDFS tidak mendukung pengubahan isi file di sembarang posisi (hanya append di akhir file)."
        },
        {
          id: 2,
          topic: "hdfs-deep",
          topicName: "HDFS Anti-Patterns",
          question: "Manakah dari skenario berikut di mana HDFS dinyatakan TIDAK COCOK (not a good fit) menurut Tom White?",
          options: [
            "Menyimpan file video berukuran 50 GB.",
            "Menjalankan analisis batch terhadap log web bulanan sebesar 2 TB.",
            "Aplikasi transaksi perbankan yang membutuhkan akses acak berlatensi rendah dalam rentang 10 milidetik.",
            "Menjalankan kueri agregasi di atas ribuan node komoditas."
          ],
          correct: 2,
          explanation: "Tiga skenario HDFS TIDAK COCOK menurut Tom White: (1) Low-latency data access (butuh sub-detik -> gunakan HBase), (2) Lots of small files (Small Files Problem membebani RAM NameNode), (3) Multiple writers & arbitrary file modifications."
        },
        {
          id: 3,
          topic: "hdfs-deep",
          topicName: "Small Files Problem",
          question: "Fenomena 'Small Files Problem' pada HDFS terjadi karena...",
          options: [
            "Hard disk fisik menolak menulis file yang berukuran di bawah 128 MB.",
            "Setiap file, direktori, dan blok mengonsumsi sekitar 150 byte di memori RAM NameNode, sehingga miliaran file kecil akan menghabiskan memori NameNode.",
            "DataNode hanya mampu menyimpan maksimal 100 file.",
            "Algoritma MapReduce tidak dapat membaca file teks."
          ],
          correct: 1,
          explanation: "NameNode menampung seluruh metadata sistem file di dalam memori RAM. Sebagai aturan praktis (rule of thumb), setiap file, direktori, dan blok memerlukan ~150 byte di RAM NameNode. 10 juta file kecil akan memakan ~3 GB RAM hanya untuk metadata!"
        },
        {
          id: 4,
          topic: "hdfs-deep",
          topicName: "HDFS Design",
          question: "Mengenai kemampuan modifikasi file, batasan ketat yang dimiliki oleh HDFS adalah...",
          options: [
            "Mendukung banyak penulis simultan (concurrent multiple writers) di berbagai posisi file.",
            "Hanya mendukung tepat satu penulis (single writer) dan penulisan hanya dapat dilakukan di akhir file (append-only).",
            "Mengizinkan pembaruan nilai record di sembarang posisi (arbitrary offset updates).",
            "File yang sudah ditutup dapat dibuka kembali untuk disisipkan data di awal file."
          ],
          correct: 1,
          explanation: "File di HDFS hanya boleh ditulis oleh satu klien tunggal (single writer) dan semua penulisan hanya bisa dilakukan dengan menyambung di akhir berkas (append-only). Tidak ada dukungan modifikasi pada sembarang offset."
        },
        {
          id: 5,
          topic: "hdfs-deep",
          topicName: "Textbook Tom White",
          question: "Mengapa ukuran blok HDFS ditetapkan sangat besar (default 128 MB)? Berdasarkan analisis Tom White, hal ini bertujuan agar...",
          options: [
            "Seluruh file dapat dimuat ke dalam satu thread CPU saja.",
            "Waktu pencarian piringan disk (disk seek time) hanya memakan waktu sekitar 1% dari total waktu transfer data streaming berkecepatan tinggi.",
            "Memaksa pengguna membeli hard disk dengan kapasitas minimal 1 Petabyte.",
            "Mempercepat proses instalasi sistem operasi Linux."
          ],
          correct: 1,
          explanation: "Jika seek time piringan disk adalah ~10 ms dan kecepatan transfer data disk modern adalah ~100 MB/s, maka untuk membuat waktu seek time hanya ~1% dari waktu transfer, ukuran data streaming harus sekitar 100 MB (dibulatkan menjadi 128 MB)."
        },
        {
          id: 6,
          topic: "hdfs-deep",
          topicName: "HDFS Features",
          question: "Fitur Block Caching pada HDFS memungkinkan sebuah blok file yang sering diakses (seperti tabel lookup) untuk...",
          options: [
            "Dihapus dari disk fisik dan hanya disimpan di cloud.",
            "Dicadangkan secara eksplisit di memori RAM DataNode (off-heap memory) agar kueri berikutnya berjalan pada kecepatan memori.",
            "Disalin ke seluruh mesin di dunia secara otomatis.",
            "Dikonversi menjadi file zip terenkripsi."
          ],
          correct: 1,
          explanation: "Centralized Block Caching memungkinkan administrator atau pengguna menginstruksikan DataNode untuk menyimpan blok-blok tertentu di dalam memori RAM DataNode (off-heap memory cache), sangat mempercepat kueri berulang pada tabel dimensi atau lookup."
        },
        {
          id: 7,
          topic: "hdfs-deep",
          topicName: "HDFS Federation",
          question: "HDFS Federation (diperkenalkan pada Hadoop 2.x) memecahkan masalah keterbatasan skalabilitas memori NameNode dengan cara...",
          options: [
            "Menghapus peran NameNode dan menggantikannya dengan database MySQL.",
            "Menambahkan banyak NameNode independen yang masing-masing mengelola sub-bagian namespace berbeda namun berbagi pool DataNode yang sama.",
            "Mengurangi ukuran blok dari 128 MB menjadi 4 KB.",
            "Membatasi jumlah klien maksimal 5 komputer."
          ],
          correct: 1,
          explanation: "HDFS Federation mengizinkan kluster memiliki banyak NameNode independen di mana masing-masing NameNode mengelola namespace terpisah (misal: /user dikelola NameNode 1, /share dikelola NameNode 2) tetapi semuanya berbagi DataNode yang sama (Block Pool)."
        },
        {
          id: 8,
          topic: "hdfs-deep",
          topicName: "HDFS High Availability",
          question: "Dalam arsitektur HDFS High Availability (HA), komponen yang bertugas mereplikasi log transaksi antara Active NameNode dan Standby NameNode secara konsisten adalah...",
          options: [
            "TaskTracker",
            "Quorum Journal Manager (QJM)",
            "Secondary NameNode",
            "Apache Sqoop"
          ],
          correct: 1,
          explanation: "Dalam HDFS HA, Quorum Journal Manager (QJM) terdiri dari sekelompok JournalNodes (JN). Setiap modifikasi transaksi EditLog oleh Active NameNode ditulis ke mayoritas JournalNode (quorum), dan Standby NameNode membaca log ini secara konsisten untuk selalu sinkron."
        },
        {
          id: 9,
          topic: "hdfs-deep",
          topicName: "Network Topology",
          question: "Berdasarkan metrik perhitungan jarak topologi jaringan Hadoop, jika Node A dan Node B berada pada rak yang sama dalam satu datacenter, maka jarak (network distance) antara keduanya bernilai...",
          options: [
            "0",
            "2",
            "4",
            "6"
          ],
          correct: 1,
          explanation: "Aturan metrik jarak jaringan Hadoop: Distance(d) = hop ke switch terdekat + hop turun. Node sama d=0. Node beda tapi satu rak d=1+1=2. Rak beda tapi satu datacenter d=1+1+1+1=4. Datacenter beda d=1+1+1+1+1+1=6."
        },
        {
          id: 10,
          topic: "hdfs-deep",
          topicName: "Rack Awareness",
          question: "Dalam kebijakan penempatan replika (Rack-Aware Placement Policy), jika replika faktor adalah 3, di manakah Replika 3 ditempatkan?",
          options: [
            "Di datacenter yang berada di benua lain.",
            "Di node lokal klien yang sama dengan Replika 1.",
            "Di node yang berbeda, tetapi berada di dalam rak yang sama dengan Replika 2.",
            "Di dalam memori RAM Secondary NameNode."
          ],
          correct: 2,
          explanation: "Kebijakan penempatan default HDFS: Replika 1 di node lokal (Rak 1); Replika 2 di rak berbeda (Rak 2); Replika 3 di node berbeda namun masih di rak yang sama dengan Replika 2 (Rak 2). Hal ini menyeimbangkan toleransi kegagalan rak dengan penghematan bandwidth antar-rak."
        },
        {
          id: 11,
          topic: "hdfs-deep",
          topicName: "HDFS Read Path",
          question: "Pada HDFS Read Path, objek stream yang membungkus komunikasi ke DataNode dan mendukung operasi pemindahan posisi pembacaan (seek) adalah...",
          options: [
            "FSDataOutputStream",
            "FSDataInputStream (yang membungkus DFSInputStream)",
            "SocketChannelReader",
            "HttpChunkedStream"
          ],
          correct: 1,
          explanation: "Klien memanggil open() pada FileSystem dan memperoleh FSDataInputStream yang membungkus objek DFSInputStream. DFSInputStream mengelola koneksi TCP ke DataNode dan mendukung metode seek() ke sembarang offset dalam berkas."
        },
        {
          id: 12,
          topic: "hdfs-deep",
          topicName: "HDFS Write Path",
          question: "Saat klien menulis data ke HDFS (Write Path), data dipecah menjadi paket-paket kecil (umumnya berukuran 64 KB) dan dimasukkan ke dalam antrean memori internal bernama...",
          options: [
            "Spill queue",
            "Data queue",
            "Shuffle queue",
            "Zombie queue"
          ],
          correct: 1,
          explanation: "Dalam FSDataOutputStream, thread DataStreamer mengambil paket (default 64 KB) dari antrean internal memori bernama 'data queue', lalu mengalirkannya ke DataNode pertama dalam pipeline replikasi."
        },
        {
          id: 13,
          topic: "hdfs-deep",
          topicName: "HDFS Write Path",
          question: "Dalam HDFS Write Path, paket data baru dihapus dari ack queue ketika...",
          options: [
            "Klien selesai memanggil method close().",
            "Paket tersebut telah berhasil diterima dan dikonfirmasi (ACK) oleh seluruh DataNode dalam pipeline replikasi.",
            "NameNode mematikan koneksi RPC.",
            "Paket data telah berusia lebih dari 24 jam."
          ],
          correct: 1,
          explanation: "Paket dipindahkan dari 'data queue' ke 'ack queue'. Paket baru dihapus dari 'ack queue' setelah sinyal acknowledgment (ACK) berhasil diterima dari semua DataNode dalam rantai pipeline replikasi."
        },
        {
          id: 14,
          topic: "hdfs-deep",
          topicName: "HDFS Failure Recovery",
          question: "Jika sebuah DataNode mengalami kegagalan (crash) di tengah-tengah proses penulisan blok data oleh klien, langkah penanganan yang dilakukan HDFS adalah...",
          options: [
            "Menghentikan penulisan dan membatalkan seluruh file (throw fatal error).",
            "Menutup pipeline, mengembalikan paket yang belum di-ACK ke depan data queue, memberi identitas generasi baru (new epoch/generation stamp) pada blok di node sehat, dan melanjutkan penulisan pada node yang tersisa.",
            "Memformat ulang hard disk DataNode master.",
            "Menunggu hingga DataNode yang rusak menyala kembali."
          ],
          correct: 1,
          explanation: "HDFS menerapkan pipeline recovery: pipeline ditutup, paket di ack queue dikembalikan ke depan data queue, NameNode memberikan Generation Stamp baru pada blok agar DataNode yang rusak tidak memiliki blok basi, dan penulisan berlanjut pada sisa DataNode yang sehat."
        },
        {
          id: 15,
          topic: "hdfs-deep",
          topicName: "HDFS Coherency Model",
          question: "Dalam model konsistensi HDFS (Coherency Model), method yang harus dipanggil oleh klien untuk menjamin bahwa data yang ditulis benar-benar telah tersimpan secara fisik di piringan disk (flushed to physical disk media) adalah...",
          options: [
            "flush()",
            "hflush()",
            "hsync()",
            "syncNamespace()"
          ],
          correct: 2,
          explanation: "hflush() hanya menjamin data sampai di buffer memori OS DataNode (terlihat oleh pembaca lain). Untuk menjamin data benar-benar tersimpan ke piringan fisik (fsync disk), klien wajib memanggil method hsync()."
        },
        {
          id: 16,
          topic: "mr-deep",
          topicName: "Combiner Rules",
          question: "Mengapa fungsi AVERAGE (Rata-rata) TIDAK DAPAT digunakan secara langsung sebagai fungsi Combiner dalam MapReduce?",
          options: [
            "Karena fungsi average menghasilkan nilai floating point yang tidak didukung oleh Java.",
            "Karena operasi rata-rata tidak bersifat asosiatif (avg(avg(a,b),c) != avg(a,b,c)), sehingga menghasilkan perhitungan agregasi yang salah jika dijalankan sebagian di node lokal mapper.",
            "Karena Combiner hanya mendukung operasi perkalian matriks.",
            "Karena NameNode melarang eksekusi pembagian di node pekerja."
          ],
          correct: 1,
          explanation: "Combiner harus memiliki sifat komutatif dan asosiatif (seperti SUM, MIN, MAX). Operasi rata-rata (AVERAGE) tidak asosiatif: avg(avg(10, 20), 30) = avg(15, 30) = 22.5, padahal rata-rata sebenarnya adalah (10+20+30)/3 = 20! Solusinya adalah memancarkan pasangan komposit (count, sum)."
        },
        {
          id: 17,
          topic: "mr-deep",
          topicName: "MapReduce Buffer",
          question: "Berapakah ukuran default dari circular memory buffer pada setiap Map Task tempat menampung output fungsi map() sebelum di-spill ke disk?",
          options: [
            "10 MB",
            "100 MB (mapreduce.task.io.sort.mb)",
            "1 GB",
            "128 MB"
          ],
          correct: 1,
          explanation: "Secara default pada Hadoop, setiap Mapper memiliki circular memory buffer sebesar 100 MB yang dikonfigurasi melalui parameter mapreduce.task.io.sort.mb."
        },
        {
          id: 18,
          topic: "mr-deep",
          topicName: "MapReduce Spilling",
          question: "Thread latar belakang pada Mapper akan mulai menumpahkan (spill) isi buffer ke disk lokal ketika kapasitas buffer mencapai ambang batas (spill threshold) sebesar...",
          options: [
            "50%",
            "80% (mapreduce.map.sort.spill.percent = 0.80)",
            "99%",
            "100%"
          ],
          correct: 1,
          explanation: "Ketika isi buffer memori mapper mencapai ambang batas 80% (0.80), sebuah thread latar belakang akan mulai menumpahkan (spill) isi buffer ke disk lokal mesin pekerja."
        },
        {
          id: 19,
          topic: "mr-deep",
          topicName: "MapReduce Spilling",
          question: "Tepat sebelum isi buffer memori mapper ditulis ke dalam file spill di disk lokal, tindakan yang dilakukan oleh sistem adalah...",
          options: [
            "Mengirim data tersebut ke NameNode melalui kabel LAN.",
            "Membagi data menjadi partisi sesuai jumlah Reducer, mengurutkan data berdasarkan kunci (in-memory sort by key), dan menjalankan fungsi Combiner jika ada.",
            "Mengompresi data menggunakan enkripsi RSA 2048-bit.",
            "Menghapus seluruh data perantara yang bernilai ganjil."
          ],
          correct: 1,
          explanation: "Sebelum ditulis ke disk spill, thread buffer membagi data ke dalam partisi-partisi (sesuai target Reducer), lalu melakukan in-memory quicksort berdasarkan key, dan menjalankan fungsi Combiner (jika didefinisikan) untuk mereduksi ukuran data."
        },
        {
          id: 20,
          topic: "mr-deep",
          topicName: "Shuffle & Sort",
          question: "Dalam fase Shuffle pada sisi Reducer (The Reduce Side), proses pengambilan partisi output dari berbagai node mapper dilakukan oleh thread khusus yang disebut...",
          options: [
            "Spill thread",
            "Copier / Fetcher threads (default 5 thread paralel)",
            "Garbage collection thread",
            "Heartbeat daemon"
          ],
          correct: 1,
          explanation: "Reducer memiliki sekelompok thread penarik data (copier/fetcher threads, default 5 thread paralel) yang secara paralel menarik partisi data output mapper dari masing-masing node pekerja melalui protokol HTTP."
        },
        {
          id: 21,
          topic: "mr-deep",
          topicName: "Speculative Execution",
          question: "Fenomena di mana sebuah task komputasi berjalan jauh lebih lambat daripada rata-rata task lainnya akibat kendala hardware lokal di node tertentu disebut...",
          options: [
            "Deadlock",
            "Straggler",
            "Livelock",
            "Race Condition"
          ],
          correct: 1,
          explanation: "Straggler adalah task yang berjalan lambat secara abnormal (karena disk rusak, CPU throttling, atau bad connection). Straggler dapat menunda penyelesaian seluruh job MapReduce."
        },
        {
          id: 22,
          topic: "mr-deep",
          topicName: "Speculative Execution",
          question: "Untuk mengatasi masalah Straggler, mekanisme yang dijalankan oleh Hadoop adalah Speculative Execution, yaitu...",
          options: [
            "Mematikan seluruh cluster dan mengulang pekerjaan dari awal.",
            "Menjalankan salinan tugas duplikat yang identik (speculative task) di node lain yang sehat, dan mengambil hasil dari tugas yang selesai lebih dahulu.",
            "Mengurangi memori RAM yang dialokasikan ke task tersebut.",
            "Mengubah bahasa program Java menjadi C++."
          ],
          correct: 1,
          explanation: "Speculative Execution mendeteksi task yang berjalan jauh lebih lambat daripada rata-rata task lainnya, lalu meluncurkan tugas cadangan duplikat yang identik di node lain yang sehat. Hasil tugas yang selesai pertama kali akan diambil, dan tugas yang lambat langsung dimatikan."
        },
        {
          id: 23,
          topic: "tools-deep",
          topicName: "Sqoop",
          question: "Perintah Sqoop yang digunakan untuk melakukan impor data secara bertahap hanya untuk baris-baris baru yang ditambahkan ke tabel RDBMS adalah...",
          options: [
            "sqoop import --mode full",
            "sqoop import --incremental append --check-column <col> --last-value <val>",
            "sqoop export --update-key id",
            "sqoop copy --stream raw"
          ],
          correct: 1,
          explanation: "Untuk incremental load baris bertambah, gunakan: sqoop import --incremental append --check-column <id> --last-value <nilai_terakhir>."
        },
        {
          id: 24,
          topic: "tools-deep",
          topicName: "Hive Tables",
          question: "Perbedaan mendasar antara Managed Table dan External Table pada Apache Hive adalah...",
          options: [
            "Managed Table hanya mendukung data teks, sedangkan External Table hanya mendukung data Parquet.",
            "Jika Managed Table dihapus (DROP TABLE), skema dan data fisik di HDFS ikut terhapus; sedangkan pada External Table, hanya skema yang terhapus sementara file fisik di HDFS tetap utuh.",
            "External Table tidak dapat diakses menggunakan kueri SQL.",
            "Managed Table disimpan di server luar organisasi."
          ],
          correct: 1,
          explanation: "Pada Managed Table (Internal), Hive memiliki kendali penuh atas data dan metadata. Jika di-DROP, metadata di Metastore DAN data fisik di HDFS (/user/hive/warehouse) akan terhapus. Pada External Table, jika di-DROP, HANYA metadata yang terhapus, data fisik di HDFS tetap tersimpan dengan aman."
        },
        {
          id: 25,
          topic: "tools-deep",
          topicName: "HBase Internals",
          question: "Komponen dalam arsitektur Apache HBase yang berfungsi mencatat seluruh operasi penulisan (write) ke disk lokal sebelum data dimasukkan ke dalam memori MemStore adalah...",
          options: [
            "BlockCache",
            "Write-Ahead Log (WAL / HLog)",
            "HFile",
            "ZooKeeper"
          ],
          correct: 1,
          explanation: "WAL (Write-Ahead Log) mencatat semua perubahan data ke disk secara sekuensial sebelum data disimpan di memori volatile MemStore. Jika RegionServer crash, data yang belum sempat di-flush ke HFile dapat dipulihkan dari WAL."
        },
        {
          id: 26,
          topic: "tools-deep",
          topicName: "HBase Internals",
          question: "Ketika sebuah Region pada tabel HBase tumbuh melampaui batas ukuran maksimumnya (default 10 GB), proses yang dilakukan oleh HBase adalah...",
          options: [
            "Menolak seluruh transaksi penulisan baru (table locked).",
            "Memecah region tersebut menjadi dua region baru yang lebih kecil (Region Splitting) berdasarkan rentang RowKey.",
            "Menghapus 50% data tertua secara otomatis.",
            "Memindahkan seluruh data ke database SQLite."
          ],
          correct: 1,
          explanation: "Region Splitting: Ketika sebuah Region tumbuh melampaui ambang batas batas (default 10 GB), RegionServer memecah region tersebut menjadi dua anak region (daughter regions) dan memberi tahu master untuk mendistribusikan region baru ke server lain jika perlu."
        },
        {
          id: 27,
          topic: "tools-deep",
          topicName: "Pig Architecture",
          question: "Dalam arsitektur Apache Pig, komponen yang bertugas memeriksa sintaks script Pig Latin dan menghasilkan graf asiklik terarah (DAG) adalah...",
          options: [
            "Execution Engine",
            "Parser",
            "Grunt Shell",
            "MapOutputCollector"
          ],
          correct: 1,
          explanation: "Parser pada Pig memeriksa sintaksis Pig Latin, tipe data, dan memverifikasi skema. Output dari Parser adalah sebuah Logical Plan berupa Directed Acyclic Graph (DAG) operator-operator data flow."
        },
        {
          id: 28,
          topic: "tools-deep",
          topicName: "Pig Data Model",
          question: "Dalam model data Apache Pig, kumpulan dari beberapa tuple di mana setiap baris tuple diperbolehkan memiliki skema dan jumlah kolom yang berbeda disebut...",
          options: [
            "Atom",
            "Bag",
            "Map",
            "Array"
          ],
          correct: 1,
          explanation: "Dalam Pig: Atom = nilai skalar tunggal; Tuple = satu baris record berurutan; Bag = kumpulan tuple (dapat memiliki skema heterogen); Map = pasangan key-value string."
        },
        {
          id: 29,
          topic: "tools-deep",
          topicName: "Kafka Concepts",
          question: "Suatu pesan di dalam partisi Apache Kafka diidentifikasi secara unik dan berurutan oleh sebuah bilangan bulat penanda urutan yang disebut...",
          options: [
            "Partition Key",
            "Offset",
            "Consumer Group ID",
            "Magic Byte"
          ],
          correct: 1,
          explanation: "Offset adalah nomor urut bilangan bulat (sequential integer) yang diberikan secara permanen kepada setiap pesan saat masuk ke dalam suatu partisi Kafka. Consumer melacak posisi pembacaan pesan menggunakan nilai offset ini."
        },
        {
          id: 30,
          topic: "tools-deep",
          topicName: "Spark Execution",
          question: "Dalam Apache Spark, operasi seperti map(), filter(), dan flatMap() tidak langsung menghasilkan komputasi fisik melainkan hanya mencatat rencana graf eksekusi. Karakteristik ini dikenal sebagai...",
          options: [
            "Eager Execution",
            "Lazy Evaluation",
            "Strict Parsing",
            "Synchronous Dispatch"
          ],
          correct: 1,
          explanation: "Lazy Evaluation berarti transformasi pada RDD/DataFrame (seperti map, filter) tidak langsung dieksekusi saat didefinisikan. Spark hanya mencatat lineage graph (DAG). Komputasi fisik baru benar-benar dijalankan ketika sebuah Action (seperti count(), collect(), saveAsTextFile()) dipanggil."
        }
      ],
      essays: [
        {
          id: 1,
          title: "Esai Set 2: Perancangan MapReduce Rata-Rata Suhu dengan Combiner Aman",
          scenario: "Diberikan dataset sensor cuaca: station_id, timestamp, temperature. Rancang solusi MapReduce untuk menghitung SUHU RATA-RATA per stasiun cuaca di mana fungsi Combiner WAJIB DIGUNAKAN secara benar tanpa merusak validitas matematis!",
          components: [
            {
              step: "1. Masalah & Tuntutan Desain",
              content: "Fungsi rata-rata (AVG) bukan fungsi asosiatif. Combiner lokal yang menghitung rata-rata akan menghasilkan kesalahan nilai. Oleh karena itu, mapper dan combiner wajib memancarkan pasangan komposit: (count, sum)."
            },
            {
              step: "2. Logika Mapper",
              content: "Input: <k1, v1> = <offset, line>.\nEkstrak station_id dan temperature.\nPancarkan: Emit <station_id, (1, temperature)>."
            },
            {
              step: "3. Logika Combiner (Aman & Benar)",
              content: "Input Combiner: <station_id, list((count, sum))>.\nHitung subtotal lokal: local_count = sum(count), local_sum = sum(temperature).\nPancarkan: Emit <station_id, (local_count, local_sum)>."
            },
            {
              step: "4. Fase Shuffle & Sort",
              content: "Mengumpulkan seluruh pasangan komposit (count, sum) parsial untuk station_id yang sama ke Reducer."
            },
            {
              step: "5. Logika Reducer",
              content: "Inisialisasi total_count = 0, total_sum = 0.\nIterasi: total_count += val.count; total_sum += val.sum.\nHitung: final_avg = total_sum / total_count.\nPancarkan: Emit <station_id, final_avg>."
            }
          ],
          rubric: [
            "Menjelaskan mengapa AVG naif gagal di Combiner (Bobot 20%)",
            "Merancang pola komposit (count, sum) di Mapper (Bobot 25%)",
            "Merancang Combiner yang menjumlahkan count dan sum secara lokal (Bobot 25%)",
            "Menghitung rata-rata sebenarnya di Reducer (Bobot 30%)"
          ]
        },
        {
          id: 2,
          title: "Esai Set 2: Masalah Banyak File Kecil (Small Files Problem) & Solusinya",
          scenario: "Jelaskan mengapa menyimpan 10 juta file berukuran 10 KB di HDFS menjadi bencana performa bagi NameNode dan MapReduce, serta berikan 3 solusi konkret menurut textbook Tom White!",
          components: [
            {
              step: "1. Bencana Bagi NameNode (RAM Exhaustion)",
              content: "Setiap file dan blok mengonsumsi ~150 byte metadata di memori RAM NameNode. 10 juta file kecil akan memakan ~3 GB RAM hanya untuk struktur direktori dan blok, membatasi skalabilitas kluster."
            },
            {
              step: "2. Bencana Bagi MapReduce (Excessive Task Overhead)",
              content: "Secara default, setiap blok/file dialokasikan satu InputSplit dan satu Map Task. Membuka 10 juta mapper menimbulkan overhead startup JVM, scheduling, dan cleanup ribuan kali lebih lama daripada waktu membaca data 10 KB tersebut."
            },
            {
              step: "3. Tiga Solusi Menurut Tom White",
              content: "1. Hadoop Archives (HAR): Mengemas ribuan file kecil ke dalam satu file arsip besar berindeks di HDFS.\n2. SequenceFile: Membaca file kecil dan menyimpannya ke format SequenceFile dengan nama file sebagai Key dan byte konten sebagai Value.\n3. CombineFileInputFormat: Menggabungkan beberapa file kecil ke dalam satu InputSplit tunggal agar hanya diproses oleh satu Mapper."
            }
          ],
          rubric: [
            "Menjelaskan dampak memori RAM NameNode (~150 byte per objek) (Bobot 35%)",
            "Menjelaskan dampak overhead Map task pada MapReduce (Bobot 35%)",
            "Menyebutkan dan menjelaskan 3 solusi: HAR, SequenceFile, CombineFileInputFormat (Bobot 30%)"
          ]
        },
        {
          id: 3,
          title: "Esai Set 2: Arsitektur Pipeline Deteksi Penipuan Real-Time",
          scenario: "Rancang arsitektur pipeline data terintegrasi untuk mendeteksi penipuan transaksi kartu kredit secara instan (sub-detik) dan menyimpan riwayat untuk analisis audit jangka panjang menggunakan Kafka, Spark Streaming, HBase, dan HDFS!",
          components: [
            {
              step: "1. Ingestion Layer (Apache Kafka)",
              content: "Sistem perbankan mempublikasikan event transaksi ke Kafka Topic 'credit_transactions' secara real-time. Kafka menyediakan buffer berkecepatan tinggi yang tahan lonjakan beban."
            },
            {
              step: "2. Stream Processing Layer (Spark Streaming)",
              content: "Spark Streaming mengonsumsi pesan dari Kafka per micro-batch (misal 500 ms) dan menerapkan aturan deteksi anomali (machine learning model)."
            },
            {
              step: "3. Real-Time Serving Layer (Apache HBase)",
              content: "Profil risiko nasabah disimpan di HBase. Jika anomali terdeteksi, status kartu diubah menjadi 'BLOCKED' di HBase dengan latensi sub-10 ms via RowKey card_number."
            },
            {
              step: "4. Historical Storage (HDFS & Hive)",
              content: "Seluruh riwayat transaksi dialirkan ke HDFS dalam format Parquet untuk pelaporan audit bulanan dan retraining model machine learning menggunakan Hive."
            }
          ],
          rubric: [
            "Menempatkan Kafka sebagai streaming ingestion buffer (Bobot 25%)",
            "Menggunakan Spark Streaming untuk analisis inferensi model cepat (Bobot 25%)",
            "Menggunakan HBase untuk serving layer sub-10 ms (Bobot 25%)",
            "Menggunakan HDFS/Hive untuk penyimpanan historis cold storage (Bobot 25%)"
          ]
        }
      ]
    },
    {
      id: "set-3",
      title: "Set 3: Kasus Industri & Troubleshooting",
      subtitle: "Fokus Desain Praktis, Penanganan Data Skewness & Integrasi",
      badge: "KASUS INDUSTRI",
      badgeColor: "bg-purple-600",
      description: "30 Soal Pilihan Ganda dan 3 Soal Esai berbasis kasus dunia nyata, arsitektur data warehouse enterprise, troubleshooting kluster, dan optimasi performa.",
      questionsCount: 30,
      essayCount: 3,
      topics: [
        { id: "ind-dwh", name: "Enterprise DWH & Dimensional", count: 5 },
        { id: "ind-etl", name: "Optimasi Pipeline ETL", count: 5 },
        { id: "ind-trouble", name: "HDFS Troubleshooting & HA", count: 5 },
        { id: "ind-mr", name: "MapReduce Advanced Patterns", count: 5 },
        { id: "ind-tools", name: "Ekosistem Tools & Integrasi", count: 10 }
      ],
      questions: [
        {
          id: 1,
          topic: "ind-dwh",
          topicName: "Enterprise DWH",
          question: "Pada arsitektur Fact Constellation (Galaxy Schema), dua atau lebih tabel fakta saling terhubung melalui...",
          options: [
            "Shared / Conformed Dimensions",
            "Composite Primary Key yang identik",
            "Database relasional yang berbeda server fisik",
            "Trigger tabel transaksi kasir"
          ],
          correct: 0,
          explanation: "Galaxy Schema (Fact Constellation) terdiri dari beberapa tabel fakta yang saling berbagi tabel dimensi bersama (Conformed Dimensions), memungkinkan kueri analitis terintegrasi lintas proses bisnis."
        },
        {
          id: 2,
          topic: "ind-dwh",
          topicName: "SCD Types",
          question: "Jika seorang pelanggan berganti status pekerjaan dari 'Mahasiswa' menjadi 'PNS', dan manajemen hanya ingin mengetahui status saat ini serta status pertama kali tanpa memerlukan riwayat perantara, tipe SCD yang paling efisien adalah...",
          options: [
            "SCD Tipe 1",
            "SCD Tipe 2",
            "SCD Tipe 3 (menambahkan kolom Original_Status dan Current_Status)",
            "SCD Tipe 4"
          ],
          correct: 2,
          explanation: "SCD Tipe 3 melestarikan perubahan dengan menambahkan kolom baru pada baris yang sama (misal Original_Status dan Current_Status). Sangat cocok jika hanya membutuhkan perbandingan kondisi awal vs kondisi saat ini."
        },
        {
          id: 3,
          topic: "ind-dwh",
          topicName: "Dimensional Modeling",
          question: "Manakah dari contoh fakta berikut yang tergolong sebagai Semi-Additive Fact?",
          options: [
            "Jumlah unit produk terjual dalam satu transaksi.",
            "Saldo akhir rekening tabungan nasabah pada penutupan hari (dapat dijumlahkan lintas cabang, tetapi tidak boleh dijumlahkan lintas dimensi waktu).",
            "Total nominal pembayaran kasir.",
            "Persentase margin keuntungan produk."
          ],
          correct: 1,
          explanation: "Semi-Additive Fact adalah fakta yang dapat dijumlahkan (SUM) pada beberapa dimensi (misal cabang, pelanggan) tetapi TIDAK DAPAT dijumlahkan sepanjang dimensi waktu (saldo hari Senin + Selasa != saldo total rekening)."
        },
        {
          id: 4,
          topic: "ind-dwh",
          topicName: "Star vs Snowflake",
          question: "Kelemahan terbesar dari penerapan Snowflake Schema dibandingkan Star Schema dalam lingkungan analitis skala besar adalah...",
          options: [
            "Memerlukan ruang hard disk 10 kali lebih besar.",
            "Kueri analitis membutuhkan banyak operasi multi-table JOIN yang kompleks dan membebani komputasi database.",
            "Tidak dapat digunakan bersama dengan tools Business Intelligence.",
            "Tabel fakta tidak boleh memiliki ukuran lebih dari 1 MB."
          ],
          correct: 1,
          explanation: "Snowflake Schema menormalisasi tabel dimensi ke dalam hierarki beberapa tabel relasional. Akibatnya, kueri analitis membutuhkan banyak operasi multi-table JOIN yang kompleks, menurunkan performa kueri secara signifikan."
        },
        {
          id: 5,
          topic: "ind-dwh",
          topicName: "Kimball Lifecycle",
          question: "Mengapa penentuan Grain (granularitas) harus dilakukan pada langkah kedua dalam metodologi Kimball sebelum memilih dimensi dan fakta?",
          options: [
            "Karena grain menentukan format warna pada dashboard BI.",
            "Karena definisi grain secara tegas menetapkan apa yang diwakili oleh tepat satu baris di fact table, sehingga menjadi acuan mutlak apakah suatu dimensi dan fakta sah dimasukkan ke tabel tersebut.",
            "Karena grain adalah instruksi untuk menghapus database sumber.",
            "Karena tanpa grain proses instalasi software ETL akan gagal."
          ],
          correct: 1,
          explanation: "Grain adalah kontrak fundamental yang menyatakan secara tepat apa yang diwakili oleh satu baris dalam tabel fakta (misal: 'satu baris adalah satu item produk dalam struk belanja'). Jika grain belum ditentukan, perancang akan mencampur fakta dengan tingkat detail berbeda (Grain Mismatch)."
        },
        {
          id: 6,
          topic: "ind-etl",
          topicName: "File Formats",
          question: "Format penyimpanan file di HDFS yang menggunakan struktur berorientasi kolom (columnar storage), mendukung kompresi blok tinggi, dan sangat optimal untuk kueri analitis pembacaan sebagian kolom (partial read) adalah...",
          options: [
            "Plain Text / CSV",
            "SequenceFile",
            "Apache Parquet / ORC",
            "XML"
          ],
          correct: 2,
          explanation: "Apache Parquet dan ORC adalah format columnar storage biner yang dirancang untuk analisis data massal. Kueri analitik hanya membaca kolom yang dibutuhkan (column projection/pruning), menghemat I/O secara drastis."
        },
        {
          id: 7,
          topic: "ind-etl",
          topicName: "File Formats",
          question: "Karakteristik utama dari format file Apache Avro dalam ekosistem Hadoop adalah...",
          options: [
            "Menyimpan skema struktur data dalam format JSON langsung di dalam file datanya (schema embedded in file), mendukung evolusi skema, dan berbasis biner kompak.",
            "Tidak mendukung kompresi sama sekali.",
            "Hanya dapat dibaca oleh bahasa pemrograman Pascal.",
            "Merupakan format file berorientasi baris murni tanpa tipe data."
          ],
          correct: 0,
          explanation: "Apache Avro adalah format berbasis baris biner yang menyertakan skema dalam format JSON langsung di dalam header berkasnya, sangat ideal untuk serialisasi data streaming (seperti Kafka) dan mendukung evolusi skema."
        },
        {
          id: 8,
          topic: "ind-etl",
          topicName: "ETL Optimization",
          question: "Dalam optimasi performa ETL, konsep Pushdown Predicates berarti...",
          options: [
            "Menunda eksekusi filter hingga data mencapai dashboard visualisasi.",
            "Mendorong kriteria penyaringan data (WHERE clause) ke database sumber agar hanya data yang relevan yang dialirkan melintasi jaringan ke server ETL.",
            "Mengompresi seluruh hard disk server ETL.",
            "Menghapus index pada database target."
          ],
          correct: 1,
          explanation: "Predicate Pushdown mendorong operasi pemfilteran (WHERE) langsung ke database sumber data, sehingga hanya baris yang memenuhi syarat yang dikirimkan melintasi jaringan ke pipeline pemrosesan."
        },
        {
          id: 9,
          topic: "ind-etl",
          topicName: "ETL Components",
          question: "Manakah di antara komponen transformasi SSIS berikut yang tergolong Synchronous Transformation di mana baris output langsung dihasilkan tanpa menunggu seluruh batch selesai dibaca?",
          options: [
            "Sort",
            "Aggregate",
            "Derived Column",
            "Merge Join"
          ],
          correct: 2,
          explanation: "Derived Column adalah transformasi baris demi baris (synchronous / streaming transformation) yang tidak memblokir aliran data. Sebaliknya, Sort dan Aggregate adalah asynchronous/blocking."
        },
        {
          id: 10,
          topic: "ind-etl",
          topicName: "ETL Optimization",
          question: "Dalam pemuatan data massal (Bulk Loading) ke Data Warehouse target, pengaturan parameter Commit Size yang terlalu kecil akan berdampak negatif berupa...",
          options: [
            "Database target kehabisan kapasitas hard disk.",
            "Terlalu sering terjadi operasi penulisan log transaksi dan penguncian tabel (excessive transaction log overhead), sehingga memperlambat pemuatan secara drastis.",
            "Data teks otomatis terenkripsi secara permanen.",
            "Koneksi ODBC terputus otomatis."
          ],
          correct: 1,
          explanation: "Commit size menentukan berapa baris data yang di-commit dalam satu transaksi basis data. Jika commit size terlalu kecil, sistem akan sangat sering melakukan I/O transaksi log dan penguncian, memperlambat proses loading."
        },
        {
          id: 11,
          topic: "ind-trouble",
          topicName: "HDFS High Availability",
          question: "Pada cluster HDFS yang menerapkan High Availability, proses yang memastikan bahwa NameNode yang sebelumnya aktif benar-benar telah berhenti dan tidak lagi menulis ke storage bersama (preventing split-brain scenario) disebut...",
          options: [
            "Garbage Collection",
            "Fencing",
            "Decommissioning",
            "SafeMode"
          ],
          correct: 1,
          explanation: "Fencing (misal via STONITH / Shoot The Other Node In The Head) adalah mekanisme keamanan mutlak pada cluster HA untuk mengisolasi atau mematikan Active NameNode lama agar tidak menulis ke JournalNode, mencegah skenario bencana Split-Brain."
        },
        {
          id: 12,
          topic: "ind-trouble",
          topicName: "HDFS SafeMode",
          question: "Ketika NameNode HDFS baru saja dinyalakan (startup), ia memasuki kondisi khusus di mana file sistem bersifat read-only dan tidak ada replikasi blok yang dilakukan. Kondisi ini disebut...",
          options: [
            "SafeMode",
            "Recovery Mode",
            "Standby Mode",
            "Quorum State"
          ],
          correct: 0,
          explanation: "SafeMode adalah mode read-only otomatis saat startup di mana NameNode mengumpulkan Block Report dari seluruh DataNode dan memeriksa apakah persentase blok yang sehat memenuhi ambang batas sebelum mengizinkan penulisan."
        },
        {
          id: 13,
          topic: "ind-trouble",
          topicName: "HDFS Integrity",
          question: "Apa yang terjadi jika sebuah DataNode melaporkan blok data yang checksum CRC-32-nya tidak cocok (corrupted block) saat klien membaca file?",
          options: [
            "Klien menghentikan pembacaan dan menyatakan sistem rusak total.",
            "Klien beralih membaca replika blok yang valid dari DataNode lain, dan NameNode secara otomatis membuat replika sehat baru untuk menggantikan blok yang korup tersebut.",
            "NameNode menghapus file tersebut dari HDFS secara sepihak.",
            "Seluruh cluster dimatikan untuk pemeriksaan fisik."
          ],
          correct: 1,
          explanation: "HDFS menyimpan checksum CRC-32 per 512 byte data. Jika terjadi kerusakan bit disk, klien mendeteksi mismatch, melaporkannya ke NameNode, lalu membaca dari DataNode replika lain yang sehat. NameNode lalu mereplikasi ulang blok dari replika sehat."
        },
        {
          id: 14,
          topic: "ind-trouble",
          topicName: "Cluster Management",
          question: "Jika administrator ingin menambah DataNode baru ke dalam cluster HDFS yang sedang berjalan tanpa melakukan restart sistem (hot-plugging), istilah proses ini adalah...",
          options: [
            "Commissioning Nodes",
            "Fencing Nodes",
            "Format HDFS",
            "Split-Brain Setup"
          ],
          correct: 0,
          explanation: "Commissioning adalah proses menambahkan node baru ke cluster aktif. Sebaliknya, proses mengeluarkan node secara aman tanpa kehilangan replika data disebut Decommissioning."
        },
        {
          id: 15,
          topic: "ind-trouble",
          topicName: "HDFS CLI",
          question: "Perintah CLI HDFS yang digunakan untuk memeriksa integritas kesehatan file sistem, mendeteksi blok yang hilang (missing blocks) atau kekurangan replika (under-replicated blocks) adalah...",
          options: [
            "hdfs dfs -ls /",
            "hdfs fsck /",
            "hdfs dfsadmin -report",
            "hdfs balancer"
          ],
          correct: 1,
          explanation: "hdfs fsck (FileSystem Check) adalah utilitas baris perintah untuk memeriksa kesehatan HDFS, mencari blok yang korup, under-replicated, over-replicated, atau hilang."
        },
        {
          id: 16,
          topic: "ind-mr",
          topicName: "Data Skewness",
          question: "Masalah Data Skewness pada fase Reducer di MapReduce terjadi ketika...",
          options: [
            "Jumlah mapper lebih sedikit daripada jumlah CPU core.",
            "Distribusi data perantara sangat tidak merata, di mana satu kunci tertentu memiliki jutaan nilai sementara kunci lain hanya memiliki sedikit nilai, sehingga satu Reducer bekerja sangat lama sementara Reducer lain menganggur.",
            "Hard disk master node penuh.",
            "Klien lupa mendefinisikan kelas Driver."
          ],
          correct: 1,
          explanation: "Data Skewness terjadi ketika distribusi nilai per kunci sangat timpang. Kunci dengan frekuensi ekstrem (misal 'null' atau kata populer) akan diarahkan ke satu Reducer, menyebabkan Reducer tersebut kelebihan beban (straggler) sementara Reducer lain telah selesai."
        },
        {
          id: 17,
          topic: "ind-mr",
          topicName: "Data Skewness",
          question: "Untuk mengatasi Data Skewness pada MapReduce yang disebabkan oleh sebuah kunci bernilai sangat masif, teknik perancangan yang paling tepat adalah...",
          options: [
            "Mematikan fase Reducer sama sekali.",
            "Menambahkan Salt (angka acak/awalan) pada kunci perantara di Mapper untuk memecah beban kunci tersebut ke beberapa Reducer, lalu melakukan penggabungan di tahap kedua.",
            "Mengurangi memori RAM Reducer menjadi 512 MB.",
            "Mengubah tipe data menjadi String."
          ],
          correct: 1,
          explanation: "Salting adalah teknik menambahkan prefiks acak (misal key_0, key_1, key_2) ke kunci perantara di Mapper, sehingga data tersebar merata ke banyak Reducer. Di tahap kedua, hasil agregasi parsial digabungkan kembali."
        },
        {
          id: 18,
          topic: "ind-mr",
          topicName: "Map-Only Jobs",
          question: "Jika sebuah pekerjaan MapReduce hanya memerlukan proses transformasi baris-per-baris (misal memfilter teks atau mengubah format tanggal) tanpa memerlukan agregasi atau pengelompokan sama sekali, maka konfigurasi optimalnya adalah...",
          options: [
            "Menetapkan jumlah Reducer menjadi nol (job.setNumReduceTasks(0)), sehingga menjadi Map-Only Job tanpa fase Shuffle sama sekali.",
            "Menetapkan jumlah Reducer sebanyak 1000 mesin.",
            "Menulis ulang kode menggunakan bahasa assembler.",
            "Menggunakan 10 kelas Combiner berurutan."
          ],
          correct: 0,
          explanation: "Dengan menetapkan numReduceTasks = 0, MapReduce berjalan sebagai Map-Only Job. Output mapper langsung ditulis ke HDFS tanpa melalui fase Partisioning, Spilling, Sort, dan Shuffle, menghasilkan penghematan performa dan I/O jaringan yang luar biasa."
        },
        {
          id: 19,
          topic: "ind-mr",
          topicName: "Partitioner",
          question: "Komponen Partitioner bawaan pada Hadoop (HashPartitioner) menentukan nomor partisi reducer untuk suatu kunci menggunakan rumus...",
          options: [
            "key.hashCode() % numReduceTasks (dengan memastikan nilai non-negatif)",
            "key.length() * 100",
            "random() * numReduceTasks",
            "offset / 128 MB"
          ],
          correct: 0,
          explanation: "HashPartitioner menggunakan fungsi bawaan: (key.hashCode() & Integer.MAX_VALUE) % numReduceTasks untuk merutekan record ke nomor partisi Reducer yang sesuai."
        },
        {
          id: 20,
          topic: "ind-mr",
          topicName: "Hadoop Types",
          question: "Pada program MapReduce Java standar, tipe data yang digunakan untuk membungkus bilangan bulat 32-bit yang dapat diserialisasi melintasi jaringan adalah...",
          options: [
            "java.lang.Integer",
            "org.apache.hadoop.io.IntWritable",
            "org.apache.hadoop.io.Text",
            "java.io.SerializableInt"
          ],
          correct: 1,
          explanation: "Hadoop menggunakan interface Writable untuk serialisasi biner yang kompak dan cepat. Untuk bilangan bulat 32-bit, Hadoop menyediakan kelas org.apache.hadoop.io.IntWritable."
        },
        {
          id: 21,
          topic: "ind-tools",
          topicName: "HBase CAP Theorem",
          question: "Berdasarkan Teorema CAP (Brewer, 2000), sistem basis data Apache HBase dikategorikan sebagai sistem...",
          options: [
            "AP (Availability & Partition Tolerance)",
            "CP (Consistency & Partition Tolerance)",
            "CA (Consistency & Availability)",
            "AC (Atomicity & Consistency)"
          ],
          correct: 1,
          explanation: "HBase mengutamakan Konsistensi Ketat (Strict Consistency) di atas Ketersediaan (Availability) saat terjadi partisi jaringan (CP System). Kueri ke Region yang sedang terisolasi akan menunggu failover daripada mengembalikan data basi."
        },
        {
          id: 22,
          topic: "ind-tools",
          topicName: "HBase Data Model",
          question: "Dalam arsitektur internal Apache HBase, kumpulan sel data yang disimpan dalam urutan RowKey terurut dan terbagi atas beberapa RegionServer diorganisasikan berdasarkan...",
          options: [
            "File Excel sheet terpisah",
            "Column Family",
            "Tabel relasional 3NF",
            "Dokumen JSON bersarang murni"
          ],
          correct: 1,
          explanation: "Di HBase, kolom-kolom dikelompokkan ke dalam Column Family. Semua anggota Column Family disimpan bersama di disk dalam satu Store (HFile). Koordinat sel lengkap adalah: (RowKey, ColumnFamily, ColumnQualifier, Timestamp)."
        },
        {
          id: 23,
          topic: "ind-tools",
          topicName: "HBase Compactions",
          question: "Proses di mana HBase menggabungkan beberapa file HFile kecil menjadi satu HFile besar dan menghapus record yang telah ditandai untuk dihapus (tombstones) disebut...",
          options: [
            "Region Splitting",
            "Compaction (Major Compaction)",
            "WAL Flushing",
            "ZooKeeper Heartbeat"
          ],
          correct: 1,
          explanation: "Major Compaction menggabungkan seluruh HFile dalam satu Store menjadi satu file HFile tunggal, serta membersihkan sel data yang telah kadaluarsa (TTL) dan menghapus record yang ditandai tanda nisan (delete tombstones)."
        },
        {
          id: 24,
          topic: "ind-tools",
          topicName: "Hive Optimization",
          question: "Dalam Apache Hive, teknik optimasi di mana data dipecah ke dalam direktori-direktori folder hirarkis di HDFS berdasarkan nilai kolom tertentu (seperti country dan year) disebut...",
          options: [
            "Bucketing",
            "Partitioning",
            "Denormalization",
            "Indexing"
          ],
          correct: 1,
          explanation: "Partitioning pada Hive membagi data ke dalam struktur sub-direktori fisik di HDFS (misal: /table/country=ID/year=2026/). Kueri dengan filter kolom tersebut hanya membaca direktori yang relevan (Partition Pruning)."
        },
        {
          id: 25,
          topic: "ind-tools",
          topicName: "Hive Optimization",
          question: "Perbedaan antara teknik Partitioning dan Bucketing pada Hive adalah...",
          options: [
            "Partitioning membagi data ke dalam sub-direktori terpisah berdasarkan nilai kolom, sedangkan Bucketing membagi data ke dalam jumlah file yang tetap berdasarkan fungsi hash dari kolom tertentu.",
            "Bucketing hanya boleh digunakan untuk data gambar.",
            "Partitioning membatasi ukuran file maksimal 1 MB.",
            "Bucketing tidak memerlukan HDFS."
          ],
          correct: 0,
          explanation: "Partitioning membagi tabel ke sub-folder berdasarkan nilai unik (cocok untuk kardinalitas rendah seperti Tanggal/Negara). Bucketing membagi data ke sejumlah file tetap berdasarkan hash(kolom) % num_buckets (cocok untuk kolom kardinalitas tinggi seperti User_ID dan mempercepat Map-side JOIN)."
        },
        {
          id: 26,
          topic: "ind-tools",
          topicName: "Pig Latin",
          question: "Operator relasional pada bahasa Pig Latin yang digunakan untuk menggabungkan dua atau lebih relasi menjadi satu tanpa menghilangkan duplikat adalah...",
          options: [
            "FILTER",
            "UNION",
            "SPLIT",
            "CROSS"
          ],
          correct: 1,
          explanation: "Operator UNION pada Pig Latin menggabungkan isi dari dua atau lebih relasi data menjadi satu relasi tunggal tanpa melakukan deduplikasi."
        },
        {
          id: 27,
          topic: "ind-tools",
          topicName: "Kafka Consumers",
          question: "Dalam Apache Kafka, sekumpulan konsumen (consumers) yang bekerja sama untuk membaca pesan dari partisi-partisi topik yang sama secara paralel di mana setiap partisi hanya dibaca oleh tepat satu konsumen dalam kelompok tersebut dinamakan...",
          options: [
            "Broker Cluster",
            "Consumer Group",
            "Topic Partitioners",
            "Replication Syncers"
          ],
          correct: 1,
          explanation: "Consumer Group memungkinkan pembacaan pesan secara terdistribusi dan paralel. Setiap partisi dalam satu topik dialokasikan secara eksklusif ke tepat satu anggota consumer di dalam consumer group tersebut."
        },
        {
          id: 28,
          topic: "ind-tools",
          topicName: "Spark Internals",
          question: "Dalam arsitektur Apache Spark, dependensi antar-tahap di mana satu partisi RDD induk digunakan oleh banyak partisi RDD turunan sehingga memerlukan proses pemindahan data melintasi jaringan (shuffle) disebut...",
          options: [
            "Narrow Dependency (misal map(), filter())",
            "Wide / Shuffle Dependency (misal groupByKey(), reduceByKey())",
            "Local Memory Dependency",
            "Thread Pipeline"
          ],
          correct: 1,
          explanation: "Wide Dependency terjadi ketika beberapa partisi turunan bergantung pada data dari partisi induk yang sama (misal groupByKey, join). Wide Dependency memicu batasan tahapan (Stage Boundary) dan memicu operasi Shuffle melintasi jaringan."
        },
        {
          id: 29,
          topic: "ind-tools",
          topicName: "Spark SQL",
          question: "Abstraksi data tingkat tinggi pada Apache Spark yang menyediakan optimasi kueri otomatis berbasis mesin pengoptimasi Catalyst Optimizer dan API berbasis kolom adalah...",
          options: [
            "RDD murni",
            "DataFrame / Dataset",
            "SequenceFile",
            "TextFile"
          ],
          correct: 1,
          explanation: "DataFrame pada Spark menyediakan abstraksi tabel terstruktur dengan skema yang dioptimalkan secara mendalam oleh mesin Catalyst Optimizer dan Tungsten Execution Engine, menghasilkan performa yang jauh lebih tinggi daripada kode RDD manual."
        },
        {
          id: 30,
          topic: "ind-tools",
          topicName: "Big Data Architecture",
          question: "Jika sebuah organisasi membutuhkan sistem analitis yang mampu memproses miliaran event klik pengguna situs web secara real-time, menyimpannya untuk kueri acak instan, dan mengagregasi laporan tren per jam, kombinasi arsitektur terbaik adalah...",
          options: [
            "MySQL murni dan script bash.",
            "Kafka (Ingest Stream) -> Spark Streaming (Real-time Processing) -> HBase (Serving Layer Real-time) -> HDFS/Hive (Long-term Cold Storage).",
            "Menggunakan SSIS desktop untuk setiap klik mouse.",
            "Hanya menggunakan Single Node Hadoop Cluster tanpa memori RAM."
          ],
          correct: 1,
          explanation: "Arsitektur Lambda / Streaming Modern: Kafka menangani lonjakan klik web secara terdistribusi -> Spark Streaming memproses event secara instan -> HBase melayani kueri profil real-time sub-10 ms -> HDFS/Hive menyimpan seluruh histori data mentah untuk agregasi analitik berkala."
        }
      ],
      essays: [
        {
          id: 1,
          title: "Esai Set 3: Perancangan MapReduce Dua Tahap (Two-Pass Job): Top-10 URL",
          scenario: "Diberikan log web server sebesar 1 TB dengan skema: timestamp, ip_address, url, status_code. Rancang arsitektur MapReduce untuk menemukan 10 URL Halaman Web yang Paling Sering Dikunjungi (Top-10 Visited URLs)!",
          components: [
            {
              step: "1. Pendekatan Solusi (Two-Pass MapReduce)",
              content: "Pencarian Top-K tidak dapat diselesaikan dalam 1 job tanpa mengorbankan paralelisasi. Dibutuhkan 2 Job Berantai:\nJob 1: Menghitung total frekuensi kemunculan setiap URL (WordCount Pattern).\nJob 2: Mengambil output Job 1 dan mencari 10 URL frekuensi tertinggi (Global Top-K Pattern menggunakan Min-Heap)."
            },
            {
              step: "2. Desain Job 1 (Hitung Frekuensi URL)",
              content: "Mapper 1: Parse url. Emit <url, 1>.\nCombiner 1: Hitung sum(1) lokal per url di node mapper.\nReducer 1: Hitung total = sum(counts). Emit <url, total> ke HDFS."
            },
            {
              step: "3. Desain Job 2: Mapper (Local Top-10 Min-Heap)",
              content: "Input: output Job 1 <offset, 'url total'>.\nMapper 2 memelihara PriorityQueue (Min-Heap) berukuran maksimal 10 di memori.\nSaat map() selesai (di cleanup()), Mapper 2 memancarkan 10 URL lokal tertingginya menggunakan dummy key: Emit <'TOP', (url, total)>."
            },
            {
              step: "4. Desain Job 2: Reducer (Global Top-10 Min-Heap)",
              content: "Jumlah Reducer diset tepat 1 (setNumReduceTasks(1)).\nReducer menerima seluruh kandidat dari mapper, memasukkannya ke Min-Heap ukuran 10 global.\nDi akhir, Reducer memancarkan tepat 10 URL teratas secara terurut ke HDFS."
            }
          ],
          rubric: [
            "Menjelaskan perlunya arsitektur dua tahap (Two-Pass Job) (Bobot 25%)",
            "Merancang Job 1 pembuat frekuensi kemunculan URL (Bobot 25%)",
            "Merancang Mapper Job 2 dengan in-memory Min-Heap ukuran 10 (Bobot 25%)",
            "Merancang Reducer tunggal untuk menentukan 10 besar global (Bobot 25%)"
          ]
        },
        {
          id: 2,
          title: "Esai Set 3: Desain Model Dimensional Lengkap Kasus Rumah Sakit",
          scenario: "Rancang model dimensional layanan rawat inap pasien dengan Grain: Satu baris merepresentasikan satu tindakan medis rawat inap yang diberikan kepada pasien oleh dokter pada waktu tertentu. Terapkan SCD Tipe 2 untuk status penjaminan pasien (BPJS/Asuransi Swasta/Umum)!",
          components: [
            {
              step: "1. Fact Table (Fact_MedicalProcedure)",
              content: "Foreign Keys: time_key, patient_key, doctor_key, room_key, procedure_key.\nMeasures (Fakta Numerik Aditif): procedure_cost, medication_cost, duration_minutes."
            },
            {
              step: "2. Dimension Tables",
              content: "- Dim_Time: time_key, full_date, day_name, month, year.\n- Dim_Doctor: doctor_key, doctor_name, specialization, department.\n- Dim_Procedure: procedure_key, procedure_code, procedure_name, category.\n- Dim_Room: room_key, room_number, class_type, building."
            },
            {
              step: "3. Penerapan SCD Tipe 2 pada Dim_Patient",
              content: "Kolom: patient_key (Surrogate PK), patient_id_natural (No RM), patient_name, insurance_type, start_date, end_date, is_current_flag.\nMekanisme: Jika pasien berganti asuransi dari 'Umum' ke 'BPJS', baris lama diberi end_date = CURRENT_DATE dan is_current_flag = 'N'. Baris baru disisipkan dengan surrogate key baru, insurance_type = 'BPJS', start_date = CURRENT_DATE, end_date = '9999-12-31', dan is_current_flag = 'Y'."
            }
          ],
          rubric: [
            "Merancang Fact Table sesuai grain tindakan medis dengan measure aditif (Bobot 35%)",
            "Mendefinisikan Dimension Tables yang relevan beserta atributnya (Bobot 30%)",
            "Menerapkan SCD Tipe 2 lengkap dengan surrogate key, start/end date, dan is_current (Bobot 35%)"
          ]
        },
        {
          id: 3,
          title: "Esai Set 3: Desain Arsitektur Big Data Multi-Teknologi E-Commerce",
          scenario: "Rancang arsitektur pipeline data end-to-end untuk platform e-commerce yang menggabungkan: Ingestion transaksi MySQL, Ingestion klik web real-time, Pemrosesan streaming deteksi penipuan, dan Data warehouse analitis pelaporan bulanan!",
          components: [
            {
              step: "1. Ingestion Data Terstruktur RDBMS (Apache Sqoop)",
              content: "Menjalankan tugas terjadwal berkala untuk mengimpor data master pelanggan, katalog, dan transaksi dari MySQL ke cluster HDFS dalam format Parquet menggunakan incremental import."
            },
            {
              step: "2. Ingestion Event Streaming Real-Time (Apache Kafka)",
              content: "Server web mempublikasikan clickstream ke Kafka Topics terpartisi sebagai buffer berkecepatan tinggi."
            },
            {
              step: "3. Stream Processing & Fraud Detection (Apache Spark Streaming)",
              content: "Spark Streaming mengonsumsi log dari Kafka, melakukan validasi transaksi instan, dan mengecek model anomali penipuan."
            },
            {
              step: "4. Serving Layer Kueri Cepat (Apache HBase)",
              content: "Hasil skor risiko dan profil pengguna disimpan di HBase untuk melayani pencarian profil instan sub-10 ms menggunakan user_id sebagai RowKey."
            },
            {
              step: "5. Long-term Warehouse & Reporting (HDFS & Apache Hive)",
              content: "Seluruh histori transaksi mentah disimpan di HDFS. Apache Hive dikonfigurasi di atas HDFS dengan partisi year/month untuk kueri SQL pelaporan bulanan tim analis."
            }
          ],
          rubric: [
            "Menjelaskan peran Sqoop untuk integrasi batch RDBMS ke HDFS (Bobot 20%)",
            "Menjelaskan peran Kafka untuk ingestion data streaming (Bobot 20%)",
            "Menjelaskan peran Spark Streaming untuk deteksi fraud (Bobot 20%)",
            "Menjelaskan peran HBase untuk serving layer sub-10 ms (Bobot 20%)",
            "Menjelaskan peran HDFS/Hive untuk cold storage dan batch reporting (Bobot 20%)"
          ]
        }
      ]
    },
    {
      id: "set-4",
      title: "Set 4: Arsip Asli UAS 2022/2023",
      subtitle: "Naskah Resmi Ujian Semester Genap T.A. 2022/2023 Beserta Kunci & Pembahasan",
      badge: "ARSIP RESMI 2022/2023",
      badgeColor: "bg-amber-600",
      description: "25 Soal Pilihan Ganda dan 5 Soal Esai naskah asli UAS 2022/2023 Politeknik Statistika STIS untuk membandingkan pola soal tahun lalu dengan kisi-kisi tahun ini.",
      questionsCount: 25,
      essayCount: 5,
      topics: [
        { id: "uas23-pg", name: "Pilihan Ganda Asli 2022/2023", count: 25 }
      ],
      questions: [
        {
          id: 1,
          topic: "uas23-pg",
          topicName: "Format File",
          question: "Di antara format file di bawah ini, yang paling efisien dalam hal kompresi dan penghematan ruang penyimpanan di Hadoop adalah...",
          options: ["CSV", "Avro", "Parquet", "JSON"],
          correct: 2,
          explanation: "Parquet menggunakan columnar storage. Nilai dalam satu kolom homogen sehingga kompresi (Snappy/Gzip) sangat tinggi dan menghemat storage secara maksimal."
        },
        {
          id: 2,
          topic: "uas23-pg",
          topicName: "Sqoop",
          question: "Untuk dapat melakukan incremental load menggunakan Sqoop, pilihan (option) yang digunakan dalam perintah sqoop import adalah...",
          options: [
            "--incremental, --exec, --check",
            "--incremental, --last-value, --check-column",
            "--incremental, --check-value, --incremental-column",
            "--incremental--load, --last-value, --check-column"
          ],
          correct: 1,
          explanation: "Parameter wajib incremental import Sqoop adalah: --incremental (mode append/lastmodified), --check-column (kolom acuan), dan --last-value (nilai terakhir)."
        },
        {
          id: 3,
          topic: "uas23-pg",
          topicName: "Sqoop",
          question: "Fungsi perintah eval pada Sqoop adalah...",
          options: [
            "Mengeksekusi kode Python secara langsung dari command line",
            "Mengevaluasi performa cluster Hadoop",
            "Menghapus tabel pada database relasional",
            "Melakukan query baik DDL maupun DML pada sumber data"
          ],
          correct: 3,
          explanation: "sqoop eval memungkinkan pengguna mengeksekusi statement SQL (DDL/DML) langsung ke RDBMS sumber untuk melihat hasil kueri tanpa menyimpan ke HDFS."
        },
        {
          id: 4,
          topic: "uas23-pg",
          topicName: "Hive",
          question: "Berikut ini yang merupakan komponen Hive yang menyediakan layanan remote untuk aplikasi dari bahasa pemrograman yang berbeda adalah...",
          options: ["Hive CLI", "Driver", "Thrift Server", "Metastore"],
          correct: 2,
          explanation: "Hive Thrift Server menyediakan interface RPC cross-language agar aplikasi Java, Python, PHP, C++ dapat berkomunikasi dengan Hive."
        },
        {
          id: 5,
          topic: "uas23-pg",
          topicName: "Hive",
          question: "Metastore pada Apache Hive berfungsi sebagai...",
          options: [
            "Penyimpan data fisik tabel di HDFS",
            "Pusat penyimpanan metadata untuk tabel dan partisi Hive dalam basis data relasional, dan memberikan client akses ke informasi ini menggunakan API layanan metastore",
            "Eksekutor query HiveQL menjadi MapReduce",
            "Buffer cache memori RAM untuk query"
          ],
          correct: 1,
          explanation: "Hive Metastore menyimpan seluruh skema, tipe data kolom, dan informasi partisi tabel di dalam basis data relasional terpisah (misal MySQL/PostgreSQL)."
        },
        {
          id: 6,
          topic: "uas23-pg",
          topicName: "Hive",
          question: "Diberikan perintah: CREATE TABLE sales1 ... dan CREATE EXTERNAL TABLE sales2 ... Pernyataan yang benar mengenai kedua tabel tersebut adalah...",
          options: [
            "sales1 dan sales2 sama-sama menghapus data fisik jika di-drop",
            "sales1 adalah tabel eksternal dan sales2 adalah tabel internal",
            "sales1 adalah tabel yang disimpan di dalam basis data Hive secara terorganisir baik data dan metadata, sedangkan sales2 adalah tabel yang hanya disimpan metadatanya tanpa menyimpan data fisik",
            "sales2 tidak dapat diakses menggunakan HiveQL"
          ],
          correct: 2,
          explanation: "sales1 adalah Managed Table (data fisik di warehouse Hive ikut terhapus saat DROP). sales2 adalah External Table di mana Hive hanya mencatat metadata; file fisik di HDFS tetap aman jika di-DROP."
        },
        {
          id: 7,
          topic: "uas23-pg",
          topicName: "HiveQL",
          question: "Berikut ini yang BUKAN merupakan Data Definition Language (DDL) pada HiveQL adalah...",
          options: ["LOAD DATA", "CREATE TABLE", "SHOW TABLES", "DESCRIBE"],
          correct: 0,
          explanation: "LOAD DATA tergolong DML (Data Manipulation Language) karena memanipulasi/memasukkan data fisik ke tabel, sedangkan CREATE, SHOW, DESCRIBE adalah DDL."
        },
        {
          id: 8,
          topic: "uas23-pg",
          topicName: "HBase",
          question: "Apache HBase mengadopsi model basis data NoSQL bertipe...",
          options: ["Document Store", "Key-Value Store", "Graph Database", "Column-Family"],
          correct: 3,
          explanation: "HBase adalah sistem NoSQL terdistribusi berbasis Column-Family (turunan Google BigTable)."
        },
        {
          id: 9,
          topic: "uas23-pg",
          topicName: "Hive vs HBase",
          question: "Perbedaan mendasar antara Hive dan HBase dalam pemrosesan data adalah...",
          options: [
            "Hive berbasis graf, HBase berbasis relasional",
            "Hive cenderung lebih cocok untuk pemrosesan batch, sedangkan HBase dirancang untuk pemrosesan data yang membutuhkan akses baca/tulis yang cepat pada level baris",
            "Hive beroperasi di memori RAM, HBase beroperasi di magnetic tape",
            "HBase menggunakan SQL standar, Hive tidak memiliki query"
          ],
          correct: 1,
          explanation: "Hive dioptimalkan untuk agregasi analitik batch skala besar via SQL. HBase dioptimalkan untuk transaksi baca/tulis acak berlatensi rendah (sub-detik) per baris."
        },
        {
          id: 10,
          topic: "uas23-pg",
          topicName: "HBase",
          question: "Manakah pernyataan yang BENAR mengenai HFile dan indeks Row Key pada HBase? (1) HFile di RAM, (2) RowKey lambat, (3) HFile format penyimpanan fisik di Region, (4) Indeks Row Key memungkinkan akses acak cepat.",
          options: ["1 dan 2", "2 dan 3", "3 dan 4", "1 dan 4"],
          correct: 2,
          explanation: "Pernyataan 3 benar (HFile adalah format file fisik terurut di HDFS) dan Pernyataan 4 benar (Row Key diindeks sehingga pencarian baris berjalan sangat cepat)."
        },
        {
          id: 11,
          topic: "uas23-pg",
          topicName: "HBase CLI",
          question: "Perintah pada HBase shell untuk mengambil data record dengan Row Key = '3' dari tabel 'produk' adalah...",
          options: [
            "SELECT * FROM produk WHERE id = '3'",
            "get 'produk', '3'",
            "scan 'produk', {ROW => '3'}",
            "fetch 'produk', '3'"
          ],
          correct: 1,
          explanation: "Perintah CLI HBase untuk mengambil data spesifik berdasarkan Row Key adalah: get '<nama_tabel>', '<row_key>'."
        },
        {
          id: 12,
          topic: "uas23-pg",
          topicName: "Pig Architecture",
          question: "Urutan tahapan eksekusi skrip Pig Latin pada Pig Engine adalah...",
          options: [
            "compile - parse - plan - optimize",
            "plan - compile - optimize - parse",
            "optimize - plan - parse - compile",
            "parse - optimize - compile - plan"
          ],
          correct: 3,
          explanation: "Pig Engine memproses script melalui urutan: Parsing sintaks -> Optimasi logis -> Kompilasi ke MapReduce -> Rencana eksekusi (Plan/DAG)."
        },
        {
          id: 13,
          topic: "uas23-pg",
          topicName: "Kafka",
          question: "Tool dalam ekosistem Big Data yang dirancang khusus sebagai platform distributed event streaming real-time berlatensi rendah adalah...",
          options: ["Sqoop", "Pig", "Oozie", "Kafka"],
          correct: 3,
          explanation: "Apache Kafka adalah platform streaming event terdistribusi berkemampuan tinggi untuk menangani data real-time jutaan pesan per detik."
        },
        {
          id: 14,
          topic: "uas23-pg",
          topicName: "Pig Latin",
          question: "Sintaks Pig Latin yang benar untuk memfilter relasi 'students' yang berusia di atas 20 tahun adalah...",
          options: [
            "students_20 = SELECT * FROM students WHERE age > 20;",
            "students_20 = WHERE age > 20 IN students;",
            "students_20 = FILTER students BY age > 20;",
            "students_20 = EXTRACT students IF age > 20;"
          ],
          correct: 2,
          explanation: "Pada Pig Latin, operasi seleksi record menggunakan kata kunci FILTER ... BY ...;"
        },
        {
          id: 15,
          topic: "uas23-pg",
          topicName: "Kafka Architecture",
          question: "Pernyataan yang BENAR mengenai pesan dan partisi dalam topik Apache Kafka adalah...",
          options: [
            "Sebuah pesan selalu dikirimkan ke semua partisi sekaligus",
            "Sebuah message dalam sebuah topik dikirimkan ke salah satu partisi tertentu dalam topik tersebut",
            "Partisi tidak dapat dibagi ke broker yang berbeda",
            "Kafka tidak mendukung multi-partisi"
          ],
          correct: 1,
          explanation: "Setiap pesan yang dikirimkan ke suatu topik akan dirutekan dan disimpan ke tepat satu partisi tertentu berdasarkan key atau round-robin."
        },
        {
          id: 16,
          topic: "uas23-pg",
          topicName: "Spark Core",
          question: "Struktur data dasar dan abstraksi utama pada Apache Spark Core adalah...",
          options: [
            "DataFrame",
            "HFile",
            "Data Bag",
            "Resilient Distributed Dataset (RDD)"
          ],
          correct: 3,
          explanation: "Abstraksi fundamental paling dasar dari Apache Spark Core adalah RDD (Resilient Distributed Dataset)."
        },
        {
          id: 17,
          topic: "uas23-pg",
          topicName: "Spark Operations",
          question: "Operasi transformasi pada Apache Spark yang memetakan setiap satu elemen input menjadi nol, satu, atau banyak elemen output adalah...",
          options: ["map()", "filter()", "reduce()", "flatMap()"],
          correct: 3,
          explanation: "flatMap() memetakan satu elemen menjadi iterable kumpulan elemen dan kemudian meratakannya (flatten) menjadi elemen-elemen individual."
        },
        {
          id: 18,
          topic: "uas23-pg",
          topicName: "Spark DataFrame",
          question: "Fungsi pada Spark DataFrame yang digunakan untuk menambahkan kolom baru atau memperbarui isi kolom yang sudah ada adalah...",
          options: ["addColumn()", "modifyColumn()", "withColumn()", "setColumn()"],
          correct: 2,
          explanation: "Fungsi .withColumn(colName, colExpr) digunakan untuk menambah kolom baru atau me-replace kolom yang telah ada di DataFrame Spark."
        },
        {
          id: 19,
          topic: "uas23-pg",
          topicName: "Spark RDD",
          question: "Karakteristik Immutable pada RDD Spark memiliki arti bahwa...",
          options: [
            "RDD awal diubah menjadi RDD baru yang sepenuhnya independen",
            "RDD dapat dimodifikasi langsung di memori tanpa membuat salinan",
            "Data RDD tidak boleh dihapus dari RAM selamanya",
            "RDD hanya dapat dijalankan di 1 core CPU"
          ],
          correct: 0,
          explanation: "Immutable berarti RDD yang sudah dibuat bersifat read-only dan tidak dapat diubah isinya secara in-place. Setiap operasi transformasi menghasilkan RDD baru."
        },
        {
          id: 20,
          topic: "uas23-pg",
          topicName: "Hive",
          question: "Apache Hive dirancang khusus untuk memproses dan menganalisis tipe data...",
          options: ["Tidak terstruktur", "Data terstruktur", "Audio dan Video mentah", "Sinyal radio"],
          correct: 1,
          explanation: "Hive dirancang untuk data terstruktur (structured data) yang memiliki skema tabular kolom dan tipe data terdefinisi."
        },
        {
          id: 21,
          topic: "uas23-pg",
          topicName: "Text Structuring",
          question: "Berikut ini yang BUKAN merupakan tahapan umum dalam menstrukturkan data teks tidak terstruktur adalah...",
          options: ["Flatering Flatmap", "Text extraction", "Tokenization", "Phrase recognition"],
          correct: 0,
          explanation: "Tiga tahapan umum menstrukturkan teks: (1) Text extraction, (2) Text segmentation / tokenization, (3) Phrase recognition. 'Flatering flatmap' adalah operasi fungsi pemrograman."
        },
        {
          id: 22,
          topic: "uas23-pg",
          topicName: "Data Formats",
          question: "Pernyataan yang benar mengenai format Avro dalam penanganan data semi-terstruktur adalah...",
          options: [
            "Avro tidak mendukung skema",
            "Data dapat dikonversi ke dalam format Avro untuk penyesuaian skema data ketika data dibaca (schema evolution)",
            "Avro hanya bisa digunakan di MySQL",
            "Avro tidak dapat dikompresi"
          ],
          correct: 1,
          explanation: "Avro menyimpan skema JSON di dalam header berkasnya dan mendukung penuh Schema Evolution ketika skema data berubah seiring waktu."
        },
        {
          id: 23,
          topic: "uas23-pg",
          topicName: "Cloud Computing",
          question: "Penyediaan infrastruktur berupa server virtual, CPU, memori, dan storage melalui jaringan IP secara on-demand tergolong model layanan...",
          options: ["PaaS", "SaaS", "Infrastructure-as-a-service (IaaS)", "FaaS"],
          correct: 2,
          explanation: "IaaS (Infrastructure-as-a-Service) menyediakan sumber daya komputasi fisik/virtual mentah (server VM, storage, networking) bagi pengguna."
        },
        {
          id: 24,
          topic: "uas23-pg",
          topicName: "Virtualization",
          question: "Hypervisor pada komputasi awan bertugas sebagai...",
          options: [
            "Antivirus jaringan cloud",
            "Sistem pendingin server datacenter",
            "Perangkat lunak yang mengelola mesin virtual dan alokasi sumber daya",
            "Kabel transmisi optik"
          ],
          correct: 2,
          explanation: "Hypervisor (seperti KVM, VMware ESXi, Xen) adalah lapisan perangkat lunak yang membuat, mengelola, dan mengalokasikan CPU/RAM/Disk fisik ke beberapa Virtual Machines (VM)."
        },
        {
          id: 25,
          topic: "uas23-pg",
          topicName: "Cloud Computing",
          question: "Layanan aplikasi siap pakai berbasis cloud yang dapat diakses langsung oleh pengguna melalui web browser tanpa perlu instalasi atau mengelola server adalah model...",
          options: ["IaaS", "SaaS (Software-as-a-Service)", "PaaS", "BaaS"],
          correct: 1,
          explanation: "SaaS (Software-as-a-Service) menyediakan aplikasi siap pakai bagi end-user (misal Gmail, Google Docs, Salesforce) di mana seluruh infrastruktur dikelola penyedia."
        }
      ],
      essays: [
        {
          id: 1,
          title: "Esai Asli 1: 5 Command Utama Apache Sqoop",
          scenario: "Sebutkan 5 command Apache Sqoop disertai dengan penjelasan fungsinya dan contoh perintah lengkapnya!",
          components: [
            {
              step: "1. sqoop import",
              content: "Fungsi: Mengimpor tabel dari database relasional (RDBMS) ke HDFS, Hive, atau HBase.\nContoh: sqoop import --connect jdbc:mysql://localhost/db_penjualan --username root --table produk --target-dir /data/produk"
            },
            {
              step: "2. sqoop export",
              content: "Fungsi: Mengekspor file data dari HDFS kembali ke tabel RDBMS tujuan.\nContoh: sqoop export --connect jdbc:mysql://localhost/db_penjualan --username root --table produk --export-dir /data/produk"
            },
            {
              step: "3. sqoop eval",
              content: "Fungsi: Mengeksekusi query SQL instan (DDL/DML) langsung ke RDBMS tanpa menyimpan hasilnya ke HDFS.\nContoh: sqoop eval --connect jdbc:mysql://localhost/db_penjualan --username root --query \"SELECT * FROM produk LIMIT 5\""
            },
            {
              step: "4. sqoop list-databases",
              content: "Fungsi: Menampilkan daftar seluruh database yang tersedia di server RDBMS.\nContoh: sqoop list-databases --connect jdbc:mysql://localhost/db_penjualan --username root"
            },
            {
              step: "5. sqoop list-tables",
              content: "Fungsi: Menampilkan daftar seluruh tabel yang ada dalam satu database RDBMS tertentu.\nContoh: sqoop list-tables --connect jdbc:mysql://localhost/db_penjualan --username root"
            }
          ],
          rubric: [
            "Menyebutkan 5 perintah valid dengan penjelasan dan contoh sintaks akurat (Bobot 100%)"
          ]
        },
        {
          id: 2,
          title: "Esai Asli 2: Kueri HiveQL (JOIN & WHERE)",
          scenario: "Diberikan TabelA (ID, Nama, Usia) dan TabelB (ID, Kota, Gaji). Tuliskan kueri HiveQL untuk: (a) Menggabungkan Tabel A dan Tabel B berdasarkan ID, (b) Menampilkan nama dan gaji pegawai berumur < 30 tahun yang tinggal di kota Jakarta!",
          components: [
            {
              step: "(a) Kueri Menggabungkan Tabel A dan B",
              content: "SELECT A.ID, A.Nama, A.Usia, B.Kota, B.Gaji\nFROM TabelA A\nJOIN TabelB B ON A.ID = B.ID;"
            },
            {
              step: "(b) Kueri Filter Pegawai < 30 Tahun di Jakarta",
              content: "SELECT A.Nama, B.Gaji\nFROM TabelA A\nJOIN TabelB B ON A.ID = B.ID\nWHERE A.Usia < 30 AND B.Kota = 'Jakarta';"
            }
          ],
          rubric: [
            "Sintaks JOIN benar dan akurat (Bobot 50%)",
            "Klausa WHERE dengan filter AND usia < 30 dan kota Jakarta benar (Bobot 50%)"
          ]
        },
        {
          id: 3,
          title: "Esai Asli 3: Analisis Kasus CLI Apache Kafka",
          scenario: "Diberikan perintah: kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 3 --topic clicks. Tentukan: (a) Nama topik dan jumlah partisi, (b) Gambaran hubungan Producer, Topic, Partition, Broker (3 broker), dan Consumer, (c) Model komunikasi real-time yang digunakan!",
          components: [
            {
              step: "(a) Nama Topik & Jumlah Partisi",
              content: "Nama Topic: clicks\nJumlah Partisi: 3 (Partition 0, Partition 1, Partition 2)."
            },
            {
              step: "(b) Gambaran Hubungan Komponen",
              content: "Producer mengirimkan event 'clicks' ke topik -> Topik dibagi menjadi 3 Partisi fisik. Karena ada 3 broker server dan replication-factor 1, masing-masing partisi ditempatkan pada satu broker terpisah (Partisi 0 di Broker 1, Partisi 1 di Broker 2, Partisi 2 di Broker 3) -> Consumer Group membaca data secara paralel dari masing-masing partisi."
            },
            {
              step: "(c) Model Komunikasi Real-time",
              content: "Model Publish-Subscribe (Pub/Sub) berarsitektur log terdistribusi event-driven."
            }
          ],
          rubric: [
            "Menyebutkan nama topik dan jumlah partisi dengan tepat (Bobot 30%)",
            "Menggambarkan relasi 3-partition dan 3-broker (Bobot 40%)",
            "Menyebutkan model Pub/Sub log terdistribusi (Bobot 30%)"
          ]
        },
        {
          id: 4,
          title: "Esai Asli 4: Perbandingan Apache Spark vs MapReduce",
          scenario: "Jelaskan minimal 3 perbedaan fundamental antara Apache Spark dan Hadoop MapReduce!",
          components: [
            {
              step: "1. Penyimpanan Data Perantara (Intermediate Storage)",
              content: "MapReduce: Menulis data perantara (spill dan reduce output) ke hard disk fisik HDFS, menimbulkan bottleneck I/O disk tinggi.\nSpark: Menyimpan data perantara langsung di dalam memori utama (RAM) menggunakan RDD/DataFrame, meminimalkan disk I/O."
            },
            {
              step: "2. Kecepatan Komputasi",
              content: "MapReduce: Lambat dan terbatas untuk pemrosesan batch tradisional.\nSpark: Hingga 100x lebih cepat daripada MapReduce di memori (dan 10x lebih cepat di disk), sangat unggul untuk pemrosesan interaktif dan iteratif (seperti ML)."
            },
            {
              step: "3. Model Pemrograman & Operasi",
              content: "MapReduce: Terikat secara kaku hanya pada fungsi map() dan reduce().\nSpark: Menyediakan lebih dari 80 operasi fleksibel (map, filter, flatMap, join, groupBy) dengan mekanisme Lazy Evaluation dan DAG engine terpadu."
            }
          ],
          rubric: [
            "Menjelaskan perbedaan penyimpanan memori RAM vs Disk HDFS (Bobot 35%)",
            "Menjelaskan perbedaan kecepatan dan latensi (Bobot 35%)",
            "Menjelaskan perbedaan fleksibilitas API dan operasi (Bobot 30%)"
          ]
        },
        {
          id: 5,
          title: "Esai Asli 5: Google Cloud Platform (GCP) & Fitur Big Data",
          scenario: "Jelaskan pengertian Google Cloud Platform (GCP) dan sebutkan minimal 4 fitur/layanan utamanya untuk pemrosesan Big Data!",
          components: [
            {
              step: "Pengertian GCP",
              content: "Google Cloud Platform (GCP) adalah serangkaian layanan komputasi awan publik yang disediakan oleh Google yang berjalan di atas infrastruktur yang sama dengan produk Google lainnya, menyediakan layanan IaaS dan PaaS yang terukur untuk penyimpanan, pemrosesan data, dan machine learning."
            },
            {
              step: "4 Layanan Utama Big Data GCP",
              content: "1. Google BigQuery: Data warehouse terkelola tanpa server (serverless) berbasis SQL untuk analitik data berskala Petabyte.\n2. Google Cloud Dataproc: Layanan terkelola untuk mengeksekusi Apache Hadoop dan Apache Spark dengan cepat dan murah.\n3. Google Cloud Pub/Sub: Layanan pesan ingest real-time terdistribusi (mirip Kafka versi managed).\n4. Google Cloud Storage (GCS): Layanan penyimpanan objek terpadu yang aman dan berskala tak terbatas (dapat bertindak sebagai data lake pengganti HDFS)."
            }
          ],
          rubric: [
            "Menjelaskan definisi GCP secara tepat (Bobot 40%)",
            "Menyebutkan dan menjelaskan minimal 4 layanan Big Data GCP (BigQuery, Dataproc, Pub/Sub, GCS) (Bobot 60%)"
          ]
        }
      ]
    }
  ]
};
