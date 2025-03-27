-- Create policy for admin access
CREATE POLICY "Admins can do everything" 
ON admin_settings 
USING (auth.uid() IN (
  SELECT id FROM auth.users 
  WHERE raw_user_meta_data->>'role' = 'admin'
)); 