-- Create cart_items table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id UUID NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Add RLS policies
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to only see and manage their own cart items
CREATE POLICY "Users can manage their own cart items" 
ON public.cart_items 
FOR ALL 
USING (auth.uid() = user_id);

-- Create policy to allow users to insert cart items only for themselves
CREATE POLICY "Users can only insert their own cart items" 
ON public.cart_items 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Add comment to describe the table
COMMENT ON TABLE public.cart_items IS 'Stores items in users shopping carts';

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS cart_items_user_id_idx ON public.cart_items (user_id);
CREATE INDEX IF NOT EXISTS cart_items_product_id_idx ON public.cart_items (product_id); 