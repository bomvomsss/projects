// src/data/authors.js
const authors = {
  my_account: {
    name: "my_account",
    avatar: "https://via.placeholder.com/80.png?text=ME",
    bio: "나의 계정입니다.",
  },
  김하늘: {
    name: "김하늘",
    avatar: "https://via.placeholder.com/80.png?text=하",
    bio: "작가 소개글이 들어갑니다.",
  },
  박지수: {
    name: "박지수",
    avatar: "https://via.placeholder.com/80.png?text=지",
    bio: "작가 소개글이 들어갑니다.",
  },
  이준호: {
    name: "이준호",
    avatar: "https://via.placeholder.com/80.png?text=준",
    bio: "작가 소개글이 들어갑니다.",
  },
  최유리: {
    name: "최유리",
    avatar: "https://via.placeholder.com/80.png?text=유",
    bio: "작가 소개글이 들어갑니다.",
  },
};

export const getAuthor = (name) =>
  authors[name] ?? {
    name,
    avatar: "https://via.placeholder.com/80.png?text=?",
    bio: "",
  };

export default authors;
