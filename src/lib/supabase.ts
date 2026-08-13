import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    ".env.local 에 NEXT_PUBLIC_SUPABASE_URL 과 NEXT_PUBLIC_SUPABASE_ANON_KEY 가 필요합니다. " +
      "값을 고친 뒤에는 개발 서버를 다시 시작해야 반영됩니다.",
  );
}

export const supabase = createClient(url, anonKey);
