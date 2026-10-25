import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

export const isSupabaseConfigured = Boolean(isValidUrl(rawUrl) && rawAnonKey);

if (!isSupabaseConfigured) {
  console.warn('Supabase URL or Anon Key is missing or invalid. Please check your .env file.');
}

// Fallback to placeholder URL and key when unconfigured so createClient does not crash the React app on module load
const supabaseUrl = isValidUrl(rawUrl) ? rawUrl : 'https://placeholder.supabase.co';
const supabaseAnonKey = rawAnonKey || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication
export const loginAdmin = async (email, password) => {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Supabase is not configured') };
  return await supabase.auth.signInWithPassword({ email, password });
};

export const logoutAdmin = async () => {
  if (!isSupabaseConfigured) return { error: null };
  return await supabase.auth.signOut();
};

export const getSession = async () => {
  if (!isSupabaseConfigured) return { data: { session: null }, error: null };
  try {
    return await supabase.auth.getSession();
  } catch (err) {
    return { data: { session: null }, error: err };
  }
};

export const onAuthStateChange = (callback) => {
  if (!isSupabaseConfigured) {
    return { data: { subscription: { unsubscribe: () => {} } } };
  }
  return supabase.auth.onAuthStateChange(callback);
};

const normalizeAvailability = (val) => {
  if (val === true || val === 'true') return 'In Stock';
  if (val === false || val === 'false') return 'Out of Stock';
  return val;
};

export const fetchProducts = async () => {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase database is not configured. Please check your local .env configuration.');
  }

  const { data: products, error } = await supabase.from('products').select('*').order('id');
  if (error) {
    throw new Error(`Database error fetching products: ${error.message || JSON.stringify(error)}`);
  }

  const { data: variants, error: varError } = await supabase.from('variants').select('*');
  if (varError) {
    throw new Error(`Database error fetching variants: ${varError.message || JSON.stringify(varError)}`);
  }

  return products.map(product => {
    const productVariants = variants.filter(v => v.product_id === product.id);
    const groupedVariants = [];
    const looseVariants = [];

    productVariants.forEach(v => {
      if (v.group_name) {
        let group = groupedVariants.find(g => g.name === v.group_name);
        if (!group) {
          group = {
            id: `g-${v.group_name}`,
            name: v.group_name,
            type: v.group_type,
            options: []
          };
          groupedVariants.push(group);
        }
        group.options.push({
          id: v.id,
          name: v.name,
          price: v.price,
          availability: normalizeAvailability(v.availability),
          image: v.image
        });
      } else {
        looseVariants.push({
          id: v.id,
          name: v.name,
          price: v.price,
          availability: normalizeAvailability(v.availability),
          image: v.image
        });
      }
    });

    return {
      ...product,
      variants: [...looseVariants, ...groupedVariants]
    };
  });
};

export const fetchCategories = async () => {
  return [
    'Fresh Vegetables',
    'Fresh Fruits',
    'Dairy & Breakfast',
    'Beverages',
    'Ice Cream & Treats',
    'Batter & Ready Essentials',
    'Chocolates',
    'Other Essentials'
  ];
};

export const fetchProductById = async (id) => {
  const products = await fetchProducts();
  return products.find(p => p.id === parseInt(id));
};

export const searchProductsAPI = async (query) => {
  const products = await fetchProducts();
  const lowerQuery = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.description?.toLowerCase().includes(lowerQuery)
  );
};

export const insertOrder = async (orderData) => {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase database is not configured. Please check your local .env configuration.');
  }

  const { order_items, ...order } = orderData;
  
  const { error: orderError } = await supabase
    .from('orders')
    .insert(order);

  if (orderError) {
    throw new Error(`Database error creating order: ${orderError.message || JSON.stringify(orderError)}`);
  }

  const itemsWithOrderId = order_items.map(item => ({
    ...item,
    order_id: order.id
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(itemsWithOrderId);

  if (itemsError) {
    throw new Error(`Database error saving order items: ${itemsError.message || JSON.stringify(itemsError)}`);
  }

  return order;
};

// Admin Functions
export const updateVariantPrice = async (variantId, newPrice) => {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
  const { error } = await supabase
    .from('variants')
    .update({ price: parseInt(newPrice) })
    .eq('id', variantId);
  if (error) throw new Error(`Database error updating variant price: ${error.message || JSON.stringify(error)}`);
};

export const updateVariantAvailability = async (variantId, newAvailability) => {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
  const { error } = await supabase
    .from('variants')
    .update({ availability: newAvailability })
    .eq('id', variantId);
  if (error) throw new Error(`Database error updating variant availability: ${error.message || JSON.stringify(error)}`);
};

export const fetchOrders = async () => {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Database error fetching orders: ${error.message || JSON.stringify(error)}`);
  return orders;
};

export const updateOrderStatus = async (orderId, status) => {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);
  if (error) throw new Error(`Database error updating order status: ${error.message || JSON.stringify(error)}`);
};
