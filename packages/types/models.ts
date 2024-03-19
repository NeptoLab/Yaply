import { Tables } from "./supabase";

export type Message = Tables<'messages'>;
export type Chat = Tables<'chats'>;
