const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://szsnzqpcgcuaisefvrog.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6c256cXBjZ2N1YWlzZWZ2cm9nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDY4MzcyMCwiZXhwIjoyMDg2MjU5NzIwfQ.b32Iyo4Lpn5T_kgg2ZrDCaKZeoQS3-92Rtn9qXuWWNA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.storage.listBuckets();
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Buckets:', data);
  }
}

check();
