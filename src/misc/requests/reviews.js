const REVIEW_API = "/api/entity3";

export const fetchReviewsByBook = async (bookId, size = 10, from = 0) => {
  const res = await fetch(
    `${REVIEW_API}?entity1Id=${bookId}&size=${size}&from=${from}`
  );

  if (res.status === 404) {
    return [];
  }

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
};

export const createReview = async (payload) => {
  const res = await fetch(REVIEW_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
};
