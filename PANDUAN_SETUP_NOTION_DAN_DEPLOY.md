# 🍼 PANDUAN LENGKAP: SETUP NOTION CMS & DEPLOY KE VERCEL
## Project: MPASI BERGIZI — Menu Praktis untuk Ibu Rumah Tangga

Selamat datang, Bunda! Panduan ini disusun khusus dengan bahasa yang **mudah dipahami (bahkan jika Bunda belum pernah belajar IT atau coding sebelumnya)**. Ikuti langkah demi langkah di bawah ini untuk mengelola blog dan resep MPASI langsung dari Notion.

---

## 📑 DAFTAR ISI
1. [Cara Menjalankan Website di Komputer Sendiri](#1-cara-menjalankan-website-di-komputer-sendiri)
2. [Langkah Membuat Database di Notion](#2-langkah-membuat-database-di-notion)
3. [Tabel Properti Database Notion (Wajib Dibuat Sama Persis)](#3-tabel-properti-database-notion)
4. [Cara Mendapatkan NOTION TOKEN](#4-cara-mendapatkan-notion-token)
5. [Cara Mendapatkan NOTION DATABASE ID](#5-cara-mendapatkan-notion-database-id)
6. [Cara Menyambungkan Notion ke Website (.env)](#6-cara-menyambungkan-notion-ke-website-env)
7. [Cara Menulis Artikel di Notion agar Muncul Otomatis di Web](#7-cara-menulis-artikel-di-notion)
8. [Panduan Deploy ke GitHub & Vercel (100% Gratis)](#8-panduan-deploy-ke-github--vercel)

---

## 1. CARA MENJALANKAN WEBSITE DI KOMPUTER SENDIRI

Website ini sudah dilengkapi **Data Demo Berkualitas Tinggi**, sehingga langsung bisa dibuka dan dicoba di komputer Bunda meskipun belum menyambungkan Notion:

1. Buka terminal atau PowerShell di folder project:
   ```bash
   npm run dev
   ```
2. Buka browser (Google Chrome / Edge) dan ketik alamat:
   ```text
   http://localhost:4321
   ```
3. Website **MPASI BERGIZI** akan langsung tampil dengan warna brand `#7B2B80`, animasi modern, daftar menu praktis, filter resep, dan tombol CTA utama!

---

## 2. LANGKAH MEMBUAT DATABASE DI NOTION

1. Buka akun Notion Bunda di [https://www.notion.so](https://www.notion.so).
2. Buat halaman baru (*Add a page*), beri judul: **Database MPASI Bergizi**.
3. Di dalam halaman tersebut, ketik `/table` lalu pilih **Table - Inline** atau **Table - Full page**.
4. Klik **New database**.

---

## 3. TABEL PROPERTI DATABASE NOTION

Pastikan nama kolom (property) dan jenisnya (type) di Notion dibuat **sama persis** dengan tabel di bawah ini:

| Nama Kolom (Property Name) | Jenis Kolom (Property Type) | Keterangan & Contoh Nilai |
| :--- | :--- | :--- |
| **Title** | `Title` *(bawaan Notion)* | Judul artikel, contoh: `Resep MPASI 4 Bintang Anti GTM Puree Daging Sapi` |
| **Slug** | `Text` *(Rich text)* | URL artikel ramah SEO, contoh: `resep-mpasi-4-bintang-anti-gtm-puree-daging-sapi` *(otomatis dirapikan jika kosong)* |
| **Status** | `Select` | Status publikasi: buat 2 opsi yaitu `Published` dan `Draft` |
| **Date** | `Date` | Tanggal rilis artikel, contoh: `15 Oktober 2026` |
| **Tags** | `Multi-select` | Kategori menu, contoh: `MPASI 6 Bulan`, `Resep Praktis`, `Anti GTM`, `Booster BB`, `Meal Prep` |
| **Excerpt** | `Text` *(Rich text)* | Ringkasan singkat artikel (1-2 kalimat) untuk meta description Google (maksimal 160 karakter) |
| **Cover** | `Files & media` | Upload foto menu MPASI beresolusi jelas |
| **Author** | `Text` *(Rich text)* | Nama pembuat resep, contoh: `Chef Bunda Maya` atau `dr. Sarah Sp.A` |

> 💡 **PENTING:** Website hanya akan menampilkan postingan yang kolom **Status**-nya dipilih **Published**. Jika masih **Draft**, postingan tidak akan muncul di web.

---

## 4. CARA MENDAPATKAN NOTION TOKEN

Notion Token adalah "kunci rahasia" yang mengizinkan website membaca artikel di Notion Bunda.

1. Buka link: [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations) (login dengan akun Notion Bunda).
2. Klik tombol **+ New integration**.
3. Isi data integrasi:
   - **Name**: `MPASI Bergizi Integration`
   - **Associated workspace**: Pilih workspace Notion Bunda.
   - **Capabilities**: Pastikan centang opsi *Read content*.
4. Klik tombol **Submit** di bawah.
5. Bunda akan melihat **Internal Integration Secret** yang berawalan `secret_...`.
6. Klik **Show** lalu **Copy**. Simpan token ini baik-baik!

---

## 5. CARA MENDAPATKAN NOTION DATABASE ID & MEMBERI AKSES

### A. Berikan Akses Integrasi ke Database (Wajib!)
1. Buka kembali halaman database Notion **Database MPASI Bergizi** yang tadi dibuat.
2. Klik ikon titik tiga `•••` di pojok kanan atas halaman.
3. Gulir ke bawah, klik menu **Connections** (atau **Add connections**).
4. Cari dan pilih nama integrasi yang tadi dibuat: **MPASI Bergizi Integration**.
5. Klik **Confirm**. Sekarang integrasi sudah punya izin membaca tabel tersebut!

### B. Salin Database ID dari Link URL
1. Klik tombol **Share** di kanan atas database, lalu klik **Copy link**.
2. Link tersebut bentuknya seperti ini:
   ```text
   https://www.notion.so/myworkspace/a1b2c3d4e5f678901234567890abcdef?v=...
   ```
3. **Database ID** adalah deretan **32 karakter acak** yang berada di antara nama workspace dan tanda tanya `?`.
   - Contoh: Pada link di atas, Database ID-nya adalah: `a1b2c3d4e5f678901234567890abcdef`.

---

## 6. CARA MENYAMBUNGKAN NOTION KE WEBSITE (.env)

1. Di dalam folder website, cari file bernama `.env`.
2. Buka file `.env` dengan text editor, lalu masukkan kunci rahasia Bunda:

```env
NOTION_TOKEN=secret_masukkan_token_bunda_disini
NOTION_DATABASE_ID=masukkan_database_id_32_karakter_disini
PUBLIC_SITE_URL=https://mpasi-bergizi.vercel.app
```

3. Simpan file (`Ctrl + S`).
4. Jalankan ulang server lokal:
   ```bash
   npm run dev
   ```
5. Buka halaman `http://localhost:4321/blog`. Sekarang artikel asli dari Notion Bunda akan langsung muncul secara otomatis!

---

## 7. CARA MENULIS ARTIKEL DI NOTION

Bunda cukup mengetik artikel seperti biasa di dalam Notion:
- **Heading 1, 2, 3**: Gunakan untuk judul bab dan sub-bab.
- **Paragraph**: Teks paragraf biasa.
- **Bullet / Numbered List**: Sangat cocok untuk daftar bahan resep dan langkah memasak.
- **Callout (💡)**: Beri tips penting untuk Bunda lainnya.
- **Quote**: Kutipan rekomendasi dokter anak.
- **Image**: Masukkan gambar masakan, foto langkah memasak, atau infografis. Gambar otomatis dibuat ringan (*lazy loaded*) dengan teks deskripsi ramah Google!

---

## 8. PANDUAN DEPLOY KE GITHUB & VERCEL (100% GRATIS)

Setelah website terhubung ke Notion, Bunda bisa meluncurkannya ke internet agar bisa diakses seluruh ibu di Indonesia:

### Langkah 1: Upload ke GitHub
1. Buat akun di [https://github.com](https://github.com) jika belum punya.
2. Klik **New repository**, beri nama: `mpasi-bergizi`. Pilih opsi **Private** atau **Public**, lalu klik **Create repository**.
3. Di komputer Bunda, jalankan:
   ```bash
   git init
   git add .
   git commit -m "Peluncuran Website MPASI Bergizi v1.0"
   git branch -M main
   git remote add origin https://github.com/USERNAME_BUNDA/mpasi-bergizi.git
   git push -u origin main
   ```

### Langkah 2: Hubungkan ke Vercel (Otomatis Online)
1. Buka [https://vercel.com](https://vercel.com) dan login menggunakan akun GitHub.
2. Klik tombol **Add New...** -> **Project**.
3. Pilih repository `mpasi-bergizi` yang tadi di-upload, lalu klik **Import**.
4. Pada bagian **Environment Variables**, tambahkan 2 variabel:
   - Key: `NOTION_TOKEN`, Value: *(masukkan token Notion Bunda)*
   - Key: `NOTION_DATABASE_ID`, Value: *(masukkan database ID Bunda)*
5. Klik tombol **Deploy**!
6. Dalam 1 menit, website Bunda sudah online di alamat:
   `https://mpasi-bergizi.vercel.app` (Bisa juga dipasang domain sendiri seperti `.com` atau `.id` kapan saja).

---

## ✨ KEUNGGULAN SEO WEBSITE INI
- **Lighthouse Score 90+**: Super ringan dan cepat diakses lewat HP ibu-ibu.
- **Struktur Schema.org Lengkap**: Terindeks sebagai Google Article dan Organization terverifikasi.
- **Otomatis Sitemap & Robots.txt**: Mesin pencari Google langsung tahu setiap kali Bunda mempublikasikan resep baru di Notion!
- **Internal Linking Otomatis**: Setiap artikel otomatis menyertakan 3 artikel terkait berdasarkan kesamaan bahan/tag.

Semoga bermanfaat dan sukses mendampingi ribuan ibu rumah tangga di Indonesia! 🌸
