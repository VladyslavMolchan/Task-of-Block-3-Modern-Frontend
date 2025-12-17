const API_BASE = "http://localhost:8080/api/books";

// Отримати список книг (пагінація)
export const fetchBooks = async (page = 1, size = 10) => {
  const url = `${API_BASE}?page=${page}&size=${size}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Помилка при завантаженні книг");
  return res.json();
};

// Отримати книгу за ID
export const fetchBookById = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Книга не знайдена");
  return res.json();
};

// Створити книгу
export const createBook = async (payload) => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Помилка при створенні книги");
  return res.json();
};

// Оновити книгу
export const updateBook = async (id, payload) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Помилка при оновленні книги");
  return res.json();
};

// Видалити книгу
export const deleteBook = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Помилка при видаленні книги: ${text}`);
  }
};

// Пошук книг (POST /search)
export const searchBooks = async (filters = {}, page = 1, size = 10) => {
  const params = new URLSearchParams();

  if (filters.title) params.append("title", filters.title);
  if (filters.authorId) params.append("authorId", Number(filters.authorId));
  if (filters.yearPublished) params.append("yearPublished", Number(filters.yearPublished));

  params.append("page", page);
  params.append("size", size);

  const res = await fetch(`${API_BASE}/search?${params.toString()}`, {
    method: "POST", // ⚠ Важливо
    headers: { "Content-Type": "application/json" },
    body: "", // бекенд чекає порожнє тіло
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Помилка при пошуку книг: ${text}`);
  }

  return res.json();
};
