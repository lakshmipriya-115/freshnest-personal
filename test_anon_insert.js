import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env before testing.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const res = await supabase.from('orders').insert({
    id: 'test-order-999',
    customer_name: 'Test',
    phone: '1234567890',
    delivery_address: 'Test Addr',
    subtotal: 100,
    delivery_charge: 50,
    total: 150,
    status: 'pending'
  });
  console.log('INSERT orders RESULT:', JSON.stringify(res, null, 2));

  const res2 = await supabase.from('order_items').insert({
    order_id: 'test-order-999',
    product_id: 1,
    variant_id: '1-1',
    product_name: 'Test',
    variant_name: 'Test',
    quantity: 1,
    price: 10
  });
  console.log('INSERT order_items RESULT:', JSON.stringify(res2, null, 2));
}

test();
