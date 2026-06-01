import { createClient } from "@supabase/supabase-js";

const URL = import.meta.env.SUPABASE_URL;
const KEY = import.meta.env.SUPABASE_KEY;

export const supabase = createClient(URL, KEY);