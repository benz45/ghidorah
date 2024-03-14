import { createClient } from "@supabase/supabase-js";

// const NEXT_PUBLIC_SUPABASE_URL = "https://iswtqdqveynvvyitoket.supabase.co";
// const NEXT_PUBLIC_SUPABASE_ANON_KEY =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlzd3RxZHF2ZXludnZ5aXRva2V0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkxNjMwNDYsImV4cCI6MjAxNDczOTA0Nn0.WLbnrfdx3qof1wuCCPRhvaUZrhOkp7hMDo4R7CuhZg4";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default supabase;
