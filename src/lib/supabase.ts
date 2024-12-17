import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://imdfbxvgbelaoumezhni.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltZGZieHZnYmVsYW91bWV6aG5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzNzE3ODEsImV4cCI6MjA0OTk0Nzc4MX0.e4ywe11Hhl7UKlE4xITB6p-eyepURpDBvB7h1_MeSoQ'
);