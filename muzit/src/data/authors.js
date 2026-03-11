// src/data/authors.js
const OVERRIDE_KEY = "muzit_author_overrides";

const defaultAuthors = {
  my_account: { name: "my_account", avatar: "https://via.placeholder.com/80.png?text=ME", bio: "나의 계정입니다." },
  김하늘:     { name: "김하늘",     avatar: "https://via.placeholder.com/80.png?text=하", bio: "작가 소개글이 들어갑니다." },
  박지수:     { name: "박지수",     avatar: "https://via.placeholder.com/80.png?text=지", bio: "작가 소개글이 들어갑니다." },
  이준호:     { name: "이준호",     avatar: "https://via.placeholder.com/80.png?text=준", bio: "작가 소개글이 들어갑니다." },
  최유리:     { name: "최유리",     avatar: "https://via.placeholder.com/80.png?text=유", bio: "작가 소개글이 들어갑니다." },
};

function loadOverrides() {
  try { return JSON.parse(localStorage.getItem(OVERRIDE_KEY)) ?? {}; }
  catch { return {}; }
}

export const getAuthor = (name) => {
  const overrides = loadOverrides();
  const base = defaultAuthors[name] ?? { name, avatar: "https://via.placeholder.com/80.png?text=?", bio: "" };
  return { ...base, ...(overrides[name] ?? {}) };
};

export const getAllAuthors = () => {
  const overrides = loadOverrides();
  return Object.values(defaultAuthors).map((a) => ({
    ...a,
    ...(overrides[a.name] ?? {}),
  }));
};

export const saveAuthorOverride = (name, updates) => {
  const overrides = loadOverrides();
  overrides[name] = { ...(overrides[name] ?? {}), ...updates };
  localStorage.setItem(OVERRIDE_KEY, JSON.stringify(overrides));
};

export default defaultAuthors;
