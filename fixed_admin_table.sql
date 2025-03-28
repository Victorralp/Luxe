CREATE TABLE IF NOT EXISTS admin_settings (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), key TEXT NOT NULL UNIQUE, value JSONB NOT NULL, description TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()); ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY; CREATE POLICY \
Admins
can
do
everything\ ON admin_settings USING (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>\'role\' = \'admin\')); INSERT INTO admin_settings (key, value, description) VALUES (\'dashboard_widgets\', '{\enabled\: [\sales\, \inventory\, \users\]}', \'Widgets to display on admin dashboard\'), (\'notification_settings\', '{\email\: true, \push\: false}', \'Admin notification preferences\'), (\'store_status\', '{\maintenance_mode\: false}', \'Store operational status\') ON CONFLICT (key) DO NOTHING;
