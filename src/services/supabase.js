import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://vtsahqckgkozlasavetm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0c2FocWNrZ2tvemxhc2F2ZXRtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MjU3ODk4MywiZXhwIjoyMDA4MTU0OTgzfQ.Gk6xOSpr0p9sJLnBpcxrdx1J5LNeL6Qd5x9nUjEhrtk'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase