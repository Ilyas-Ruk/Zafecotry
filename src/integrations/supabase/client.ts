// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://sjyltwhymaztqoirjenm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqeWx0d2h5bWF6dHFvaXJqZW5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNDM2NjMsImV4cCI6MjA2MzkxOTY2M30.5TbOlx0C5Sha8swg9OixDzyQt9X_gqf87DILSHFPHWk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);