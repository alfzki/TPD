#!/usr/bin/env python3
"""
build_book.py - Compile all 34 TPD notes into a single executive PDF book
with automatic Table of Contents, 65 vector Mermaid diagrams, styled callouts, and clean layout.
"""

import os
import sys
import re
import html
import subprocess
import shutil

BASE_DIR = "/home/alfzki/Documents/TPD/Catatan UAS Obsidian"
BUILD_DIR = "/home/alfzki/Documents/TPD/.build_pdf"
OUTPUT_PDF_TPD = "/home/alfzki/Documents/TPD/E-Book UAS TPD 2025-2026 - Panduan Lengkap & Bank Soal.pdf"
OUTPUT_PDF_OBSIDIAN = "/home/alfzki/Documents/Obsidian Vault/TPD - Kisi-Kisi UAS/E-Book UAS TPD 2025-2026 - Panduan Lengkap & Bank Soal.pdf"

os.makedirs(BUILD_DIR, exist_ok=True)

CHAPTER_DEFINITIONS = [
    {
        "num": 0,
        "title": "Bab 0: Panduan Belajar & Map of Content (MOC)",
        "desc": "Peta silabus ujian, strategi belajar, dan matriks keterkaitan kompetensi UAS TPD 2025/2026.",
        "files": [
            "00. MOC - Panduan Belajar UAS TPD.md"
        ]
    },
    {
        "num": 1,
        "title": "Bab 1: Konsep & Arsitektur Data Warehouse",
        "desc": "Karakteristik Bill Inmon, Single Source of Truth (SSoT), OLTP vs OLAP, serta arsitektur fisik Data Warehouse.",
        "files": [
            "01. Data Warehouse/01.1 Konsep Dasar, Karakteristik Inmon & SSoT.md",
            "01. Data Warehouse/01.2 Perbandingan Mendalam OLTP vs OLAP.md",
            "01. Data Warehouse/01.3 Arsitektur Lengkap Data Warehouse & Komponen Fisik.md",
            "01. Data Warehouse/01.4 Arsitektur Inmon vs Kimball & EDW vs Data Mart.md",
        ]
    },
    {
        "num": 2,
        "title": "Bab 2: Dimensional Modeling, Skema & Slowly Changing Dimensions (SCD)",
        "desc": "Anatomi Fact & Dimension table, Star vs Snowflake vs Galaxy Schema, 4 Langkah Kimball Lifecycle, SCD Tipe 1-3, dan Operasi OLAP Data Cube.",
        "files": [
            "02. Dimensional Modeling & SCD/02.1 Anatomi Fact Table & Dimension Table.md",
            "02. Dimensional Modeling & SCD/02.2 Skema Desain Data Warehouse (Star, Snowflake, & Galaxy Schema).md",
            "02. Dimensional Modeling & SCD/02.3 4 Langkah Kimball Lifecycle & Conformed Dimensions.md",
            "02. Dimensional Modeling & SCD/02.4 Slowly Changing Dimensions (SCD Tipe 1, 2, dan 3).md",
            "02. Dimensional Modeling & SCD/02.5 Operasi Multidimensi OLAP Data Cube & Server OLAP.md",
        ]
    },
    {
        "num": 3,
        "title": "Bab 3: Pipeline & Rekayasa ETL vs ELT",
        "desc": "Tahapan Extract, Transform, Load, Change Data Capture (CDC), Staging Area, serta paradigma modern ETL vs ELT Cloud Data Warehouse.",
        "files": [
            "03. ETL & ELT/03.1 Pipeline & Alur Kerja Lengkap ETL (Extract, Transform, Load).md",
            "03. ETL & ELT/03.2 Perbandingan Komprehensif ETL vs ELT.md",
        ]
    },
    {
        "num": 4,
        "title": "Bab 4: Ekosistem Komputasi Terdistribusi Hadoop & HDFS",
        "desc": "Filosofi komputasi terdistribusi, master-worker node, karakteristik HDFS (WORM, 128MB Block), Rack-Awareness, Read/Write Path, dan HDFS Enterprise HA/Federation.",
        "files": [
            "04. Hadoop & HDFS/04.1 Konsep Dasar Komputasi Terdistribusi & Paradigma Hadoop.md",
            "04. Hadoop & HDFS/04.2 Arsitektur Kluster, Node Types & Single vs Multi Node.md",
            "04. Hadoop & HDFS/04.3 Karakteristik & Filosofi Desain HDFS (WORM, 128 MB Block, Anti-Patterns).md",
            "04. Hadoop & HDFS/04.4 Replikasi Blok, Topologi Jaringan & Rack-Awareness.md",
            "04. Hadoop & HDFS/04.5 Mekanisme Detail HDFS Read Path & Write Path.md",
            "04. Hadoop & HDFS/04.6 Enterprise HDFS (High Availability, QJM, Federation, Block Caching).md",
        ]
    },
    {
        "num": 5,
        "title": "Bab 5: Pemrosesan Terdistribusi MapReduce & Analisis Esai",
        "desc": "Paradigma Map & Reduce, komponen v1 vs v2, alur internal 6 fase (InputSplit, Map, Buffer/Spill, Shuffle & Sort, Reduce), Combiner, Speculative Execution, dan panduan esai ujian.",
        "files": [
            "05. MapReduce/05.1 Konsep, Komponen (JobTracker & TaskTracker) & Paradigma MapReduce.md",
            "05. MapReduce/05.2 Alur Kerja Mendalam MapReduce (InputSplit, Map, Buffer, Spill, Shuffle & Sort, Reduce).md",
            "05. MapReduce/05.3 Mekanisme Combiner, Optimasi & Speculative Execution.md",
            "05. MapReduce/05.4 Panduan Menjawab & Bedah Soal Esai MapReduce (Template & 6 Kasus Lengkap).md",
        ]
    },
    {
        "num": 6,
        "title": "Bab 6: Perbandingan Komprehensif Tools Ekosistem Hadoop",
        "desc": "Matriks komparasi akbar, Apache Sqoop, Apache Hive, Apache HBase, Apache Pig, Apache Kafka, Apache Spark, format data Big Data (Parquet/Avro), dan Cloud Big Data.",
        "files": [
            "06. Tools Ekosistem Hadoop/06.0 Matriks Perbandingan Akbar Ekosistem Hadoop.md",
            "06. Tools Ekosistem Hadoop/06.1 Apache Sqoop (RDBMS to HDFS Transfer & Map-Only Jobs).md",
            "06. Tools Ekosistem Hadoop/06.2 Apache Hive (SQL on HDFS, Metastore, Partitioning vs Bucketing).md",
            "06. Tools Ekosistem Hadoop/06.3 Apache HBase (NoSQL Column-Family & Low-Latency Random Read-Write).md",
            "06. Tools Ekosistem Hadoop/06.4 Apache Pig (Procedural Data Flow Platform & Pig Latin).md",
            "06. Tools Ekosistem Hadoop/06.5 Apache Kafka (Distributed Real-Time Event Streaming & Ingestion).md",
            "06. Tools Ekosistem Hadoop/06.6 Apache Spark (In-Memory Unified Computing Engine & RDD).md",
            "06. Tools Ekosistem Hadoop/06.7 Format Data, Pemrosesan Teks & Cloud Computing Big Data.md",
        ]
    },
    {
        "num": 7,
        "title": "Bab 7: Bank Soal Komprehensif & Arsip Asli UAS Beserta Pembahasan",
        "desc": "Simulasi Ujian Set 1-3 (90 PG & 9 Esai) dan Set 4 Spesial (Arsip Asli UAS 2022/2023: 25 PG & 5 Esai Lengkap) dengan analisis trap dan scoring rubric.",
        "files": [
            "07. Bank Soal UAS/07.1 Set 1 - Simulasi Ujian Fundamental & Arsitektur (30 PG & 3 Esai).md",
            "07. Bank Soal UAS/07.2 Set 2 - Simulasi Ujian Mekanisme Internal & Textbook Tom White (30 PG & 3 Esai).md",
            "07. Bank Soal UAS/07.3 Set 3 - Simulasi Ujian Studi Kasus Industri & Troubleshooting (30 PG & 3 Esai).md",
            "07. Bank Soal UAS/07.4 Set 4 - Arsip Asli UAS 2022-2023 & Pembahasan Super Lengkap.md",
        ]
    }
]

CALLOUT_ICONS = {
    'NOTE': ('📌', 'Catatan Penting'),
    'TIP': ('💡', 'Tips Praktis & Ujian'),
    'IMPORTANT': ('⚡', 'Poin Kritis / Wajib Hafal'),
    'WARNING': ('⚠️', 'Peringatan & Jebakan Ujian'),
    'CAUTION': ('🛑', 'Perhatian Khusus'),
    'EXAMPLE': ('📝', 'Contoh Kasus & Solusi'),
    'SUCCESS': ('✅', 'Ringkasan Intisari'),
    'ABSTRACT': ('📖', 'Ringkasan Silabus'),
}

def clean_wikilinks(text):
    text = re.sub(r'\[\[([^\]\|]+)\|([^\]]+)\]\]', r'\2', text)
    text = re.sub(r'\[\[#[^\]]+\|([^\]]+)\]\]', r'\1', text)
    text = re.sub(r'\[\[([^\]#\|]+)#[^\]]+\|([^\]]+)\]\]', r'\2', text)
    text = re.sub(r'\[\[#([^\]]+)\]\]', r'\1', text)
    text = re.sub(r'\[\[([^\]]+)\]\]', r'\1', text)
    return text

def convert_callouts(text):
    lines = text.split('\n')
    new_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        m = re.match(r'^>\s*\[!([A-Za-z_-]+)\]\s*(.*)$', line)
        if m:
            c_type = m.group(1).upper()
            c_title = m.group(2).strip()
            icon, default_title = CALLOUT_ICONS.get(c_type, ('ℹ️', c_type.capitalize()))
            title = c_title if c_title else default_title
            
            body_lines = []
            i += 1
            while i < len(lines):
                cur = lines[i]
                if cur.startswith('>'):
                    if cur.startswith('> '):
                        body_lines.append(cur[2:])
                    else:
                        body_lines.append(cur[1:])
                    i += 1
                elif cur.strip() == '':
                    # Peek ahead to see if callout continues
                    if i + 1 < len(lines) and lines[i+1].startswith('>'):
                        body_lines.append('')
                        i += 1
                    else:
                        break
                else:
                    break
            
            fenced = [
                f"::: {{.callout .callout-{c_type.lower()}}}",
                f"::: {{.callout-header}}",
                f"{icon} **{title}**",
                f":::",
                f"::: {{.callout-body}}",
                "\n".join(body_lines),
                f":::",
                f":::"
            ]
            new_lines.append("\n".join(fenced))
        else:
            new_lines.append(line)
            i += 1
    return '\n'.join(new_lines)

def adjust_headings(text):
    lines = text.split('\n')
    new_lines = []
    in_code = False
    
    for line in lines:
        if line.strip().startswith('```'):
            in_code = not in_code
            new_lines.append(line)
            continue
            
        if not in_code:
            # Match markdown headings
            m = re.match(r'^(#{1,5})\s+(.*)$', line)
            if m:
                hashes = m.group(1)
                title = m.group(2)
                # Shift heading by +1 level
                new_hashes = '#' + hashes
                new_lines.append(f"{new_hashes} {title}")
                continue
                
        new_lines.append(line)
    return '\n'.join(new_lines)

def clean_trailing_nav(text):
    lines = text.split('\n')
    filtered = []
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('🔙') or stripped.startswith('⬅️'):
            continue
        if stripped.startswith('*Catatan Kisi-Kisi UAS'):
            continue
        filtered.append(line)
    return '\n'.join(filtered)

def process_file(rel_path):
    full_path = os.path.join(BASE_DIR, rel_path)
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Strip YAML frontmatter
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            content = parts[2].lstrip()

    # 2. Clean navigation links
    content = clean_trailing_nav(content)

    # 3. Clean Wikilinks
    content = clean_wikilinks(content)

    # 4. Convert Callouts to Pandoc Fenced Divs
    content = convert_callouts(content)

    # 5. Shift headings (+1 level)
    content = adjust_headings(content)

    return content

def generate_cover_html():
    return """
<div class="cover-wrapper">
  <div class="cover-top">
    <div class="cover-badge">Program Sarjana Terapan (D-IV) Politeknik Statistika STIS</div>
    <h1 class="cover-title">TEKNOLOGI PEREKAYASAAN DATA</h1>
    <div class="cover-subtitle">Buku Panduan Komprehensif, Ringkasan Materi Silabus & Bank Soal UAS 2025/2026</div>
    <div class="cover-divider"></div>
    
    <div class="cover-features">
      <div class="feature-item">
        <span class="feature-bullet">✦</span>
        <div><strong>Cakupan Kurikulum Lengkap (Bab 1 s.d. Bab 7):</strong> Data Warehouse & SSoT, Dimensional Modeling & SCD, Rekayasa Pipeline ETL vs ELT, Arsitektur Hadoop & HDFS Enterprise, MapReduce Deep Dive, hingga Ekosistem Big Data Modern (Sqoop, Hive, HBase, Pig, Kafka, Spark).</div>
      </div>
      <div class="feature-item">
        <span class="feature-bullet">✦</span>
        <div><strong>Visualisasi Konseptual & Alur Data:</strong> Dilengkapi 65 diagram arsitektur, flowchart alur pemrosesan data, sequence diagram interaksi komponen, dan topologi kluster.</div>
      </div>
      <div class="feature-item">
        <span class="feature-bullet">✦</span>
        <div><strong>Bank Soal Komprehensif (115+ Soal PG & Esai):</strong> 3 Set Simulasi Standar Ujian beserta Pembahasan Mendalam, Analisis Pengecoh (Distractor Trap), dan Kunci Jawaban Resmi.</div>
      </div>
      <div class="feature-item">
        <span class="feature-bullet">✦</span>
        <div><strong>Set 4 Spesial - Rekonstruksi Arsip Asli UAS 2022/2023:</strong> 25 Soal Pilihan Ganda & 5 Soal Esai Asli lengkap dengan pembahasan tuntas, template jawaban ujian, dan bedah scoring rubric.</div>
      </div>
    </div>
  </div>

  <div class="cover-footer">
    <div class="footer-left">
      <strong style="color: #cbd5e1;">Rujukan Literatur Utama:</strong><br>
      Tom White — <em>Hadoop: The Definitive Guide (4th Edition)</em><br>
      Ralph Kimball — <em>The Data Warehouse Toolkit (3rd Edition)</em><br>
      Bill Inmon — <em>Building the Data Warehouse (4th Edition)</em>
    </div>
    <div class="footer-right">
      <strong style="color: #cbd5e1;">Tahun Akademik:</strong> 2025/2026<br>
      <strong style="color: #cbd5e1;">Mata Kuliah:</strong> Teknologi Perekayasaan Data (TPD)<br>
      <strong style="color: #cbd5e1;">Format:</strong> E-Book Kompilasi Standalone Lengkap (PDF)
    </div>
  </div>
</div>
"""

def generate_css():
    return """
* {
  box-sizing: border-box;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}

@page {
  size: A4;
  margin: 22mm 18mm 20mm 18mm;
  @top-left {
    content: "Teknologi Perekayasaan Data (TPD) — UAS 2025/2026";
    font-size: 8pt;
    color: #64748b;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  @top-right {
    content: "Panduan Belajar Lengkap & Bank Soal";
    font-size: 8pt;
    color: #64748b;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  @bottom-center {
    content: "Halaman " counter(page);
    font-size: 8.5pt;
    color: #64748b;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
}

@page :first {
  margin: 0;
  @top-left { content: none; }
  @top-right { content: none; }
  @bottom-center { content: none; }
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #1e293b;
  line-height: 1.6;
  font-size: 10pt;
  margin: 0;
  padding: 0;
}

/* COVER PAGE */
.cover-wrapper {
  page-break-after: always;
  break-after: page;
  width: 210mm;
  height: 297mm;
  background: linear-gradient(145deg, #090d16 0%, #0f172a 45%, #1e293b 100%);
  color: #f8fafc;
  padding: 30mm 24mm 24mm 24mm;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cover-badge {
  display: inline-block;
  background: rgba(37, 99, 235, 0.25);
  border: 1px solid #3b82f6;
  color: #93c5fd;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 8.5pt;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-bottom: 22px;
}

.cover-title {
  font-size: 30pt;
  font-weight: 800;
  line-height: 1.15;
  color: #ffffff;
  margin: 0 0 16px 0;
  letter-spacing: -0.5px;
  border: none;
  padding: 0;
}

.cover-subtitle {
  font-size: 13.5pt;
  color: #cbd5e1;
  line-height: 1.4;
  margin-bottom: 24px;
  font-weight: 400;
}

.cover-divider {
  width: 80px;
  height: 4px;
  background: #38bdf8;
  border-radius: 2px;
  margin-bottom: 28px;
}

.cover-features {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.feature-item {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 9.5pt;
  line-height: 1.5;
  color: #e2e8f0;
}

.feature-item:last-child {
  margin-bottom: 0;
}

.feature-bullet {
  color: #38bdf8;
  font-size: 11pt;
  flex-shrink: 0;
}

.cover-footer {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
  padding-top: 18px;
  font-size: 8.5pt;
  color: #94a3b8;
  line-height: 1.5;
}

.footer-right {
  text-align: right;
}

#title-block-header { display: none; }

/* TABLE OF CONTENTS */
#TOC {
  page-break-before: always;
  break-before: page;
  page-break-after: always;
  break-after: page;
  padding: 10mm 4mm 15mm 4mm;
}

#TOC h2#toc-title {
  font-size: 20pt;
  font-weight: 800;
  color: #0f172a;
  border-bottom: 3px solid #2563eb;
  padding-bottom: 8px;
  margin-top: 0;
  margin-bottom: 20px;
  letter-spacing: -0.5px;
}

#TOC ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

#TOC > ul > li {
  margin-top: 14px;
  margin-bottom: 6px;
}

#TOC > ul > li > a {
  font-size: 10.5pt;
  font-weight: 700;
  color: #1e3a8a;
  text-decoration: none;
  display: inline-block;
  padding: 2px 0;
}

#TOC ul ul {
  list-style: none;
  padding-left: 16px;
  margin-top: 4px;
  border-left: 2px solid #e2e8f0;
}

#TOC ul ul li {
  margin: 3px 0;
}

#TOC ul ul li a {
  font-size: 9pt;
  font-weight: 500;
  color: #334155;
  text-decoration: none;
}

#TOC ul ul ul {
  padding-left: 12px;
  border-left: 1px dashed #cbd5e1;
}

#TOC ul ul ul li a {
  font-size: 8.5pt;
  font-weight: 400;
  color: #64748b;
}

/* HEADINGS & CHAPTER BREAKS */
.chapter-divider {
  page-break-before: always;
  break-before: page;
  padding-top: 8mm;
  margin-bottom: 20px;
}

.chapter-header-box {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
  color: #ffffff;
  padding: 20px 24px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.chapter-header-box h1 {
  color: #ffffff !important;
  border: none !important;
  margin: 0 0 8px 0 !important;
  padding: 0 !important;
  font-size: 19pt !important;
}

.chapter-header-box .chapter-desc {
  color: #cbd5e1;
  font-size: 9.5pt;
  margin: 0;
  line-height: 1.5;
}

h1 {
  font-size: 18pt;
  font-weight: 800;
  color: #0f172a;
  border-bottom: 2.5px solid #2563eb;
  padding-bottom: 6px;
  margin-top: 0;
  margin-bottom: 18px;
  page-break-after: avoid;
  break-after: avoid;
}

h2 {
  font-size: 14pt;
  font-weight: 700;
  color: #1e3a8a;
  border-bottom: 1px solid #cbd5e1;
  padding-bottom: 4px;
  margin-top: 28px;
  margin-bottom: 14px;
  page-break-after: avoid;
  break-after: avoid;
}

h3 {
  font-size: 11.5pt;
  font-weight: 600;
  color: #1e293b;
  margin-top: 20px;
  margin-bottom: 10px;
  page-break-after: avoid;
  break-after: avoid;
}

h4 {
  font-size: 10pt;
  font-weight: 600;
  color: #334155;
  margin-top: 16px;
  margin-bottom: 8px;
  page-break-after: avoid;
  break-after: avoid;
}

/* PARAGRAPHS & LISTS */
p {
  margin: 0.8em 0;
}

ul, ol {
  margin: 0.8em 0;
  padding-left: 24px;
}

li {
  margin: 0.35em 0;
}

/* TABLES */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.4em 0;
  font-size: 8.5pt;
  line-height: 1.45;
  page-break-inside: auto;
  break-inside: auto;
}

tr {
  page-break-inside: avoid;
  break-inside: avoid;
}

thead {
  display: table-header-group;
}

th {
  background-color: #1e293b;
  color: #ffffff;
  font-weight: 600;
  text-align: left;
  padding: 7px 9px;
  border: 1px solid #334155;
}

td {
  padding: 6px 9px;
  border: 1px solid #cbd5e1;
  vertical-align: top;
}

tbody tr:nth-child(even) {
  background-color: #f8fafc;
}

/* CODE BLOCKS */
pre {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 10px 12px;
  font-family: "JetBrains Mono", Consolas, Monaco, "Courier New", monospace;
  font-size: 8pt;
  line-height: 1.45;
  overflow-x: auto;
  page-break-inside: avoid;
  break-inside: avoid;
  margin: 1.2em 0;
}

code {
  font-family: "JetBrains Mono", Consolas, Monaco, "Courier New", monospace;
  font-size: 8.5pt;
  background-color: #f1f5f9;
  padding: 2px 4px;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
  color: #0f172a;
}

pre code {
  border: none;
  padding: 0;
  background: transparent;
  font-size: 8pt;
}

/* CALLOUTS */
.callout {
  margin: 1.4em 0;
  border-radius: 7px;
  border-left: 4.5px solid #3b82f6;
  background-color: #f8fafc;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  page-break-inside: avoid;
  break-inside: avoid;
  overflow: hidden;
}

.callout-header {
  padding: 7px 12px;
  font-weight: 700;
  font-size: 9pt;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.callout-header p {
  margin: 0;
  display: inline;
}

.callout-body {
  padding: 10px 12px;
  font-size: 9pt;
  line-height: 1.5;
}

.callout-body > *:first-child {
  margin-top: 0;
}

.callout-body > *:last-child {
  margin-bottom: 0;
}

.callout-note {
  border-left-color: #0284c7;
  background-color: #f0f9ff;
}
.callout-note .callout-header {
  background-color: #e0f2fe;
  color: #0369a1;
}

.callout-tip, .callout-success {
  border-left-color: #059669;
  background-color: #ecfdf5;
}
.callout-tip .callout-header, .callout-success .callout-header {
  background-color: #d1fae5;
  color: #065f46;
}

.callout-important, .callout-abstract {
  border-left-color: #6366f1;
  background-color: #eef2ff;
}
.callout-important .callout-header, .callout-abstract .callout-header {
  background-color: #e0e7ff;
  color: #3730a3;
}

.callout-warning {
  border-left-color: #d97706;
  background-color: #fffbeb;
}
.callout-warning .callout-header {
  background-color: #fef3c7;
  color: #92400e;
}

.callout-caution {
  border-left-color: #dc2626;
  background-color: #fef2f2;
}
.callout-caution .callout-header {
  background-color: #fee2e2;
  color: #991b1b;
}

.callout-example {
  border-left-color: #0d9488;
  background-color: #f0fdfa;
}
.callout-example .callout-header {
  background-color: #ccfbf1;
  color: #115e59;
}

/* MERMAID DIAGRAMS */
pre.mermaid {
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 8px;
  padding: 14px !important;
  text-align: center;
  margin: 1.5em auto;
  page-break-inside: avoid;
  break-inside: avoid;
  display: block;
}

pre.mermaid svg {
  max-width: 95% !important;
  height: auto !important;
  margin: 0 auto;
}

/* HORIZONTAL RULES */
hr {
  border: none;
  border-top: 1px solid #e2e8f0;
  margin: 2em 0;
}
"""

def generate_script_html():
    return """
<script src="mermaid.min.js"></script>
<script>
  window.addEventListener('DOMContentLoaded', async function() {
    // Convert pre.mermaid > code to direct textContent
    document.querySelectorAll('pre.mermaid').forEach(function(el) {
      var code = el.querySelector('code');
      if (code) {
        el.textContent = code.textContent;
      }
    });

    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      securityLevel: 'loose',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    });

    try {
      await mermaid.run();
      console.log('All mermaid diagrams rendered successfully.');
    } catch (e) {
      console.error('Error rendering mermaid diagrams:', e);
    }
  });
</script>
"""

def main():
    print("=== Memulai Kompilasi E-Book UAS TPD 2025/2026 ===")
    
    # 1. Download or ensure mermaid.min.js in build dir
    mermaid_path = os.path.join(BUILD_DIR, "mermaid.min.js")
    if not os.path.exists(mermaid_path) or os.path.getsize(mermaid_path) < 100000:
        print("[1/5] Mengunduh mermaid.min.js...")
        subprocess.run(["curl", "-s", "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js", "-o", mermaid_path], check=True)
    else:
        print("[1/5] mermaid.min.js siap.")

    # 2. Write CSS, Cover, Script files
    css_path = os.path.join(BUILD_DIR, "style.css")
    with open(css_path, "w", encoding="utf-8") as f:
        f.write(generate_css())

    cover_path = os.path.join(BUILD_DIR, "cover.html")
    with open(cover_path, "w", encoding="utf-8") as f:
        f.write(generate_cover_html())

    script_path = os.path.join(BUILD_DIR, "script.html")
    with open(script_path, "w", encoding="utf-8") as f:
        f.write(generate_script_html())

    # 3. Concatenate and preprocess all chapters
    print("[2/5] Memproses dan menggabungkan 34 berkas catatan...")
    combined_md_path = os.path.join(BUILD_DIR, "combined_book.md")
    
    with open(combined_md_path, "w", encoding="utf-8") as out:
        for ch in CHAPTER_DEFINITIONS:
            print(f"  -> Memproses {ch['title']} ({len(ch['files'])} sub-berkas)...")
            
            # Chapter divider and header card
            out.write("\n\n::: {.chapter-divider}\n:::\n\n")
            out.write("::: {.chapter-header-box}\n")
            out.write(f"# {ch['title']}\n\n")
            out.write(f"<p class=\"chapter-desc\">{ch['desc']}</p>\n")
            out.write(":::\n\n")
            
            for rel_file in ch["files"]:
                processed = process_file(rel_file)
                out.write(processed)
                out.write("\n\n")

    print("[3/5] Berkas Markdown gabungan selesai dibuat.")

    # 4. Run Pandoc to generate Standalone HTML
    print("[4/5] Menjalankan Pandoc (Markdown -> HTML5 + MathML + Fenced Divs + TOC)...")
    html_output_path = os.path.join(BUILD_DIR, "book.html")
    
    pandoc_cmd = [
        "pandoc",
        combined_md_path,
        "-o", html_output_path,
        "-s",
        "-f", "markdown+fenced_divs+backtick_code_blocks+raw_html",
        "-t", "html5",
        "--mathml",
        "--highlight-style=kate",
        "--toc",
        "--toc-depth=2",
        f"--metadata=toc-title:Daftar Isi Lengkap E-Book",
        f"--metadata=title:Teknologi Perekayasaan Data (TPD) 2025/2026",
        f"-c", "style.css",
        f"-B", cover_path,
        f"-A", script_path,
    ]
    
    res = subprocess.run(pandoc_cmd, cwd=BUILD_DIR, capture_output=True, text=True)
    if res.returncode != 0:
        print("Pandoc Error:", res.stderr)
        sys.exit(1)
    
    print(f"  -> HTML berhasil dibuat: {os.path.getsize(html_output_path) / 1024:.1f} KB")

    # 5. Run Headless Chrome to generate Vector PDF
    print("[5/5] Merender PDF Buku melalui Headless Google Chrome (termasuk 65 diagram SVG)...")
    pdf_temp_path = os.path.join(BUILD_DIR, "book.pdf")
    
    chrome_cmd = [
        "google-chrome",
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--allow-file-access-from-files",
        "--run-all-compositor-stages-before-draw",
        "--virtual-time-budget=30000",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_temp_path}",
        html_output_path
    ]
    
    res_chrome = subprocess.run(chrome_cmd, cwd=BUILD_DIR, capture_output=True, text=True)
    if res_chrome.returncode != 0:
        print("Chrome Error:", res_chrome.stderr)
        sys.exit(1)
        
    pdf_size_mb = os.path.getsize(pdf_temp_path) / (1024 * 1024)
    print(f"  -> Berhasil membuat PDF: {pdf_size_mb:.2f} MB")

    # 6. Copy output PDF to destinations
    shutil.copyfile(pdf_temp_path, OUTPUT_PDF_TPD)
    print(f"  -> Tersimpan di TPD: {OUTPUT_PDF_TPD}")

    try:
        shutil.copyfile(pdf_temp_path, OUTPUT_PDF_OBSIDIAN)
        print(f"  -> Tersimpan di Obsidian Vault: {OUTPUT_PDF_OBSIDIAN}")
    except Exception as e:
        print(f"  -> Peringatan salin Obsidian Vault: {e}")

    # Inspect page count
    try:
        pdf_info = subprocess.check_output(["pdfinfo", pdf_temp_path], text=True)
        for line in pdf_info.splitlines():
            if "Pages:" in line:
                print(f"  -> Total Halaman Buku: {line.split(':')[1].strip()} halaman")
    except Exception:
        pass

    print("\n=== KOMPILASI BUKU PDF SUKSES LENGKAP ===")

if __name__ == "__main__":
    main()
