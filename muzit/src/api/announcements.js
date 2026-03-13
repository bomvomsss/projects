import { supabase } from "./supabase";

export const fetchAnnouncements = async () => {
  const { data, error } = await supabase
    .from("announcements")
    .select("id, title, content, date")
    .order("date", { ascending: false });

  if (error) throw error;
  return data;
};

export const createAnnouncement = async ({ title, content = "" }) => {
  const { data, error } = await supabase
    .from("announcements")
    .insert({ title, content, date: new Date().toISOString().slice(0, 10) })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateAnnouncement = async (id, { title, content }) => {
  const { data, error } = await supabase
    .from("announcements")
    .update({ title, content })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteAnnouncement = async (id) => {
  const { error } = await supabase
    .from("announcements")
    .delete()
    .eq("id", id);

  if (error) throw error;
};
