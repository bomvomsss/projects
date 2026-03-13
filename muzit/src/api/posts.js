import { supabase } from "./supabase";

// DB는 snake_case, 프론트는 camelCase로 변환
const mapPost = (row) => ({
  id: row.id,
  title: row.title,
  subtitle: row.subtitle ?? "",
  author: row.author,
  tags: row.tags ?? "",
  content: row.content ?? "",
  coverUrl: row.cover_url ?? "",
  date: row.date,
  views: row.views ?? 0,
  likes: row.likes ?? 0,
  comments: row.comments ?? 0,
  isDraft: row.is_draft ?? false,
});

// 홈 피드용: 임시저장 제외한 전체 공개 작품
export const fetchPublicPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("is_draft", false)
    .order("date", { ascending: false });

  if (error) throw error;
  return data.map(mapPost);
};
