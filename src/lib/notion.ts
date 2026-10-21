import { Client } from '@notionhq/client';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  formattedDate: string;
  status: 'Draft' | 'Published';
  tags: string[];
  excerpt: string;
  cover: string;
  author: string;
  readingTime: string;
}

export interface NotionBlock {
  id: string;
  type: string;
  [key: string]: any;
}

// Inisialisasi Notion Client
const NOTION_TOKEN =
  process.env.NOTION_TOKEN ||
  import.meta.env.NOTION_TOKEN ||
  process.env.PUBLIC_NOTION_TOKEN ||
  import.meta.env.PUBLIC_NOTION_TOKEN;

const NOTION_DATABASE_ID =
  process.env.NOTION_DATABASE_ID ||
  import.meta.env.NOTION_DATABASE_ID ||
  process.env.PUBLIC_NOTION_DATABASE_ID ||
  import.meta.env.PUBLIC_NOTION_DATABASE_ID;

export const isNotionConfigured = Boolean(
  NOTION_TOKEN &&
  NOTION_DATABASE_ID &&
  !NOTION_TOKEN.includes('your_notion_api_token') &&
  !NOTION_DATABASE_ID.includes('your_notion_database_id')
);

export const notion = new Client({
  auth: NOTION_TOKEN || '',
});

/**
 * Helper untuk mengubah string menjadi slug URL yang bersih, lowercase, dan ramah SEO
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // hilangkan karakter aneh
    .replace(/[\s_-]+/g, '-') // ganti spasi/underscore dengan dash tunggal
    .replace(/^-+|-+$/g, ''); // bersihkan dash di awal/akhir
}

/**
 * Estimasi waktu membaca berdasarkan jumlah kata
 */
export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 180;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min baca`;
}

/**
 * Format tanggal Indonesia: 15 Oktober 2026
 */
export function formatIndoDate(dateStr: string): string {
  if (!dateStr) return 'Terbaru';
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateStr;
  }
}

// ==========================================
// MOCK DATA PREMIUM (Fallback otomatis jika Notion API belum diset)
// Menjamin website tidak error saat pertama kali di-clone/deploy!
// ==========================================
export const MOCK_POSTS: BlogPost[] = [
  {
    id: 'mock-1',
    title: 'Resep MPASI 4 Bintang Anti GTM: Puree Daging Sapi & Labu Kuning Lembut',
    slug: 'resep-mpasi-4-bintang-anti-gtm-puree-daging-sapi-labu-kuning',
    date: '2026-10-12',
    formattedDate: '12 Oktober 2026',
    status: 'Published',
    tags: ['MPASI 6 Bulan', 'Resep Praktis', 'Anti GTM', 'Zat Besi'],
    excerpt: 'Menu MPASI 4 bintang kaya zat besi alami dan beta karoten untuk mencegah GTM pada si kecil. Praktis dibuat dalam 20 menit untuk ibu rumah tangga!',
    cover: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    author: 'Chef Bunda Maya',
    readingTime: '3 min baca',
  },
  {
    id: 'mock-2',
    title: '5 Trik Meal Prep MPASI Mingguan untuk Ibu Rumah Tangga Hemat Waktu',
    slug: '5-trik-meal-prep-mpasi-mingguan-ibu-rumah-tangga-hemat-waktu',
    date: '2026-10-10',
    formattedDate: '10 Oktober 2026',
    status: 'Published',
    tags: ['Meal Prep', 'Tips Bunda', 'Hemat Waktu'],
    excerpt: 'Panduan lengkap cara membekukan kaldu ceker, mencincang protein, dan menyimpan porsi harian MPASI agar tahan segar hingga 1 minggu penuh.',
    cover: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
    author: 'dr. Sarah Sp.A (Konsultan)',
    readingTime: '5 min baca',
  },
  {
    id: 'mock-3',
    title: 'Bubur Salmon Butternut Squash: Nutrisi Otak Maksimal & Penambah Berat Badan',
    slug: 'bubur-salmon-butternut-squash-nutrisi-otak-penambah-bb',
    date: '2026-10-08',
    formattedDate: '8 Oktober 2026',
    status: 'Published',
    tags: ['Booster BB', 'MPASI 8 Bulan', 'Tinggi Omega-3'],
    excerpt: 'Kombinasi asam lemak Omega-3 DHA dari ikan salmon segar dengan kelezatan gurih butternut squash yang ampuh menaikkan berat badan si kecil.',
    cover: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=1200&q=80',
    author: 'Ahli Gizi Rina S.Gz',
    readingTime: '4 min baca',
  },
  {
    id: 'mock-4',
    title: 'Jadwal dan Tekstur MPASI Usia 6-12 Bulan Sesuai Rekomendasi IDAI',
    slug: 'jadwal-dan-tekstur-mpasi-usia-6-12-bulan-rekomendasi-idai',
    date: '2026-10-05',
    formattedDate: '5 Oktober 2026',
    status: 'Published',
    tags: ['Edukasi MPASI', 'Panduan IDAI', 'Jadwal Makan'],
    excerpt: 'Kapan harus naik tekstur dari saring halus ke cincang kasar? Simak panduan tahapan tekstur MPASI agar kemampuan oromotor si kecil terasah optimal.',
    cover: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
    author: 'Tim Ahli MPASI Bergizi',
    readingTime: '6 min baca',
  },
  {
    id: 'mock-5',
    title: 'Finger Food Sehat Praktis: Nugget Tahu Hati Ayam Kukus Tanpa MSG',
    slug: 'finger-food-sehat-praktis-nugget-tahu-hati-ayam-kukus',
    date: '2026-10-01',
    formattedDate: '1 Oktober 2026',
    status: 'Published',
    tags: ['Finger Food', 'Resep Praktis', 'MPASI 9-11 Bulan'],
    excerpt: 'Camilan MPASI padat gizi yang melatih genggaman tangan si kecil. Tinggi zat besi pencegah anemia, renyah di luar dan lumer di mulut bayi.',
    cover: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    author: 'Chef Bunda Maya',
    readingTime: '4 min baca',
  },
];

export const MOCK_CONTENT_BLOCKS: Record<string, NotionBlock[]> = {
  'mock-1': [
    {
      id: 'b1',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ plain_text: 'Mengapa MPASI 4 Bintang Sangat Krusial?' }],
      },
    },
    {
      id: 'b2',
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            plain_text:
              'Memasuki usia 6 bulan, cadangan zat besi yang disimpan bayi sejak dalam kandungan mulai menipis secara alami. ASI saja sudah tidak mencukupi 100% kebutuhan energi harian. Oleh karena itu, prinsip MPASI 4 Bintang (Karbohidrat, Protein Hewani, Protein Nabati, dan Sayur) dengan penekanan utama pada ',
          },
          {
            plain_text: 'Protein Hewani Tinggi Zat Besi',
            annotations: { bold: true },
          },
          {
            plain_text: ' menjadi kunci tumbuh kembang optimal tanpa stunting.',
          },
        ],
      },
    },
    {
      id: 'b3',
      type: 'callout',
      callout: {
        icon: { emoji: '💡' },
        rich_text: [
          {
            plain_text:
              'Tips Bunda Pintar: Daging sapi cincang segar dan hati ayam adalah sumber zat besi heme terbaik yang penyerapannya 3x lipat lebih tinggi dibanding zat besi nabati.',
          },
        ],
      },
    },
    {
      id: 'b4',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ plain_text: 'Bahan-Bahan yang Perlu Disiapkan (Porsi 3x Makan)' }],
      },
    },
    {
      id: 'b5',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ plain_text: 'Karbohidrat: 60 gram beras pulen wangi, cuci bersih' }],
      },
    },
    {
      id: 'b6',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ plain_text: 'Protein Hewani: 50 gram daging sapi giling tanpa urat' }],
      },
    },
    {
      id: 'b7',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ plain_text: 'Protein Nabati: 25 gram tempe kedelai non-GMO, kukus' }],
      },
    },
    {
      id: 'b8',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ plain_text: 'Sayuran: 30 gram labu kuning kukus (manis alami, kaya serat)' }],
      },
    },
    {
      id: 'b9',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ plain_text: 'Lemak Tambahan (LT): 1 sdt minyak kelapa murni (VCO) atau unsalted butter per porsi' }],
      },
    },
    {
      id: 'b10',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ plain_text: 'Langkah Memasak Praktis dalam 20 Menit' }],
      },
    },
    {
      id: 'b11',
      type: 'numbered_list_item',
      numbered_list_item: {
        rich_text: [{ plain_text: 'Tumis bawang putih dan bawang merah cincang dengan sedikit butter hingga harum semerbak.' }],
      },
    },
    {
      id: 'b12',
      type: 'numbered_list_item',
      numbered_list_item: {
        rich_text: [{ plain_text: 'Masukkan daging sapi giling, masak hingga berubah warna kecokelatan.' }],
      },
    },
    {
      id: 'b13',
      type: 'numbered_list_item',
      numbered_list_item: {
        rich_text: [{ plain_text: 'Tambahkan beras, labu kuning, tempe, dan kaldu tulang sapi asli. Masak dengan slow cooker atau panci tertutup hingga menjadi bubur kental.' }],
      },
    },
    {
      id: 'b14',
      type: 'numbered_list_item',
      numbered_list_item: {
        rich_text: [{ plain_text: 'Saring kawat halus (jangan diblender agar tidak terlalu cair dan melatih daya cerna bayi). Sajikan hangat!' }],
      },
    },
    {
      id: 'b15',
      type: 'quote',
      quote: {
        rich_text: [
          {
            plain_text:
              'Ingat Bunda, kunci si kecil lahap adalah aroma masakan yang menggugah selera dan suasana makan yang menyenangkan tanpa paksaan (Responsive Feeding).',
          },
        ],
      },
    },
  ],
};

// ==========================================
// FUNGSI NOTION API UTAMA
// ==========================================

// Helper untuk mencari properti Notion secara case-insensitive
function getProp(props: any, ...keys: string[]) {
  if (!props) return undefined;
  for (const k of keys) {
    if (props[k]) return props[k];
    const foundKey = Object.keys(props).find(
      (propKey) => propKey.toLowerCase() === k.toLowerCase()
    );
    if (foundKey && props[foundKey]) return props[foundKey];
  }
  return undefined;
}

/**
 * Mengambil semua artikel yang berstatus 'Published' dari database Notion
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  if (!isNotionConfigured) {
    console.info('[Notion CMS] NOTION_TOKEN atau NOTION_DATABASE_ID belum dikonfigurasi. Menggunakan data demo MPASI BERGIZI.');
    return MOCK_POSTS;
  }

  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID!,
    });

    if (!response.results || response.results.length === 0) {
      console.warn('[Notion CMS] Database Notion kosong. Menampilkan data fallback.');
      return MOCK_POSTS;
    }

    // Filter halaman yang sah:
    // 1. Wajib memiliki judul (bukan baris kosong di tabel Notion)
    // 2. Berstatus 'published' jika kolom status diisi
    const activePages = response.results.filter((page: any) => {
      const titleProp = getProp(page.properties, 'title', 'Title', 'name', 'Name');
      const titleText = titleProp?.title?.[0]?.plain_text?.trim();
      if (!titleText) {
        return false; // Abaikan baris kosong di tabel Notion
      }

      const statusProp = getProp(page.properties, 'status', 'Status');
      const statusName = statusProp?.select?.name?.toLowerCase();
      if (statusName) {
        return statusName === 'published';
      }
      return true; // jika tidak ada properti status, tetap tampilkan selama judul ada
    });

    if (activePages.length === 0) {
      console.warn('[Notion CMS] Tidak ada artikel dengan judul valid dan status "published". Menampilkan data demo.');
      return MOCK_POSTS;
    }

    const usedSlugs = new Set<string>();

    const posts: BlogPost[] = activePages.map((page: any, index: number) => {
      const props = page.properties;

      // Title
      const titleProp = getProp(props, 'title', 'Title', 'name', 'Name');
      const title =
        titleProp?.title?.[0]?.plain_text?.trim() ||
        'Menu MPASI Bergizi';

      // Slug
      const slugProp = getProp(props, 'slug', 'Slug');
      const rawSlug = slugProp?.rich_text?.[0]?.plain_text || title;
      let cleanSlug = slugify(rawSlug) || `menu-${index + 1}`;
      if (usedSlugs.has(cleanSlug)) {
        cleanSlug = `${cleanSlug}-${index + 1}`;
      }
      usedSlugs.add(cleanSlug);

      // Date
      const dateProp = getProp(props, 'date', 'Date');
      const date = dateProp?.date?.start || page.created_time || '';

      // Tags
      const tagsProp = getProp(props, 'tags', 'Tags');
      let tags: string[] = [];
      if (tagsProp?.multi_select) {
        tags = tagsProp.multi_select.map((t: any) => t.name);
      }

      // Excerpt
      const excerptProp = getProp(props, 'excerpt', 'Excerpt');
      const excerpt =
        excerptProp?.rich_text?.[0]?.plain_text ||
        'Inspirasi menu MPASI praktis dan bergizi lengkap untuk si kecil kesayangan keluarga.';

      // Cover
      let cover = 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80';
      const coverProp = getProp(props, 'cover', 'Cover');
      if (coverProp?.files?.[0]?.file?.url) {
        cover = coverProp.files[0].file.url;
      } else if (coverProp?.files?.[0]?.external?.url) {
        cover = coverProp.files[0].external.url;
      } else if (page.cover?.external?.url) {
        cover = page.cover.external.url;
      } else if (page.cover?.file?.url) {
        cover = page.cover.file.url;
      }

      // Author
      const authorProp = getProp(props, 'author', 'Author');
      const author =
        authorProp?.rich_text?.[0]?.plain_text ||
        authorProp?.people?.[0]?.name ||
        'Tim Ahli MPASI Bergizi';

      const statusProp = getProp(props, 'status', 'Status');

      return {
        id: page.id,
        title,
        slug: cleanSlug,
        date,
        formattedDate: formatIndoDate(date),
        status: (statusProp?.select?.name as any) || 'Published',
        tags: tags.length > 0 ? tags : ['Menu Praktis'],
        excerpt,
        cover,
        author,
        readingTime: calculateReadingTime(excerpt + ' ' + title),
      };
    });

    // Urutkan artikel dari yang paling baru
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  } catch (error) {
    console.error('[Notion CMS Error] Gagal mengambil data dari Notion:', error);
    return MOCK_POSTS;
  }
}

/**
 * Mengambil sejumlah artikel terbaru (default 3 untuk Homepage)
 */
export async function getLatestPosts(limit = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

/**
 * Mengambil satu artikel berdasarkan slug unik
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug || slugify(p.slug) === slugify(slug));
}

/**
 * Mengambil blok konten isi artikel dari page ID Notion
 */
export async function getPostBlocks(pageId: string): Promise<NotionBlock[]> {
  if (!isNotionConfigured || pageId.startsWith('mock-')) {
    return MOCK_CONTENT_BLOCKS[pageId] || MOCK_CONTENT_BLOCKS['mock-1'];
  }

  try {
    const blocks: NotionBlock[] = [];
    let cursor: string | undefined = undefined;

    while (true) {
      const response: any = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
        page_size: 100,
      });

      blocks.push(...response.results);

      if (!response.has_more) break;
      cursor = response.next_cursor;
    }

    return blocks;
  } catch (error) {
    console.error(`[Notion CMS Error] Gagal mengambil blok untuk page ${pageId}:`, error);
    return MOCK_CONTENT_BLOCKS['mock-1'];
  }
}

/**
 * Mengambil artikel terkait berdasarkan kesamaan Tags (Internal Linking SEO)
 */
export async function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit = 3
): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  const filtered = allPosts.filter((p) => p.slug !== currentSlug);

  // Urutkan berdasarkan jumlah tag yang sama
  filtered.sort((a, b) => {
    const commonA = a.tags.filter((t) => tags.includes(t)).length;
    const commonB = b.tags.filter((t) => tags.includes(t)).length;
    return commonB - commonA;
  });

  return filtered.slice(0, limit);
}

/**
 * Mengambil semua kumpulan tag unik untuk filter kategori
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet);
}
