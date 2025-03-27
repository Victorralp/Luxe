-- Insert initial settings
INSERT INTO admin_settings (key, value, description) 
VALUES 
  ('dashboard_widgets', '{"enabled": ["sales", "inventory", "users"]}', 'Widgets to display on admin dashboard'),
  ('notification_settings', '{"email": true, "push": false}', 'Admin notification preferences'),
  ('store_status', '{"maintenance_mode": false}', 'Store operational status')
ON CONFLICT (key) DO NOTHING; 