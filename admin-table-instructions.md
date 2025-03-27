# Admin Table Setup Instructions

Follow these steps to add the admin settings table to your Supabase project:

## Option 1: Using the Supabase SQL Editor (Recommended)

1. Log in to your Supabase dashboard at https://app.supabase.com
2. Select your project
3. Navigate to the SQL Editor (left sidebar)
4. Click "New Query"
5. **IMPORTANT**: Run each SQL file in the following order:
   - First run `create_admin_table.sql`
   - Then run `create_admin_policy.sql` 
   - Finally run `insert_admin_settings.sql`
6. Click "Run" after pasting each file's contents

## Option 2: Using the Supabase CLI

If you have the Supabase CLI installed, run each command separately:

```bash
supabase db push --file create_admin_table.sql
supabase db push --file create_admin_policy.sql
supabase db push --file insert_admin_settings.sql
```

## Table Details

The `admin_settings` table has the following structure:

- **id**: UUID primary key
- **key**: Unique text identifier for the setting
- **value**: JSONB field to store complex setting values
- **description**: Text description of what the setting controls
- **created_at**: Timestamp when the setting was created
- **updated_at**: Timestamp when the setting was last updated

## Security

The table has Row Level Security (RLS) enabled with a policy that only allows users with an admin role in their metadata to access the table.

## Initial Data

The SQL script adds three default settings:
1. Dashboard widgets configuration
2. Notification preferences
3. Store status settings

## How to Access Admin Settings in Your Code

```javascript
import { supabase } from '../lib/supabase/config';

// Get all admin settings
const getAdminSettings = async () => {
  const { data, error } = await supabase
    .from('admin_settings')
    .select('*');
  
  if (error) throw error;
  return data;
};

// Get a specific setting by key
const getAdminSetting = async (key) => {
  const { data, error } = await supabase
    .from('admin_settings')
    .select('*')
    .eq('key', key)
    .single();
  
  if (error) throw error;
  return data;
};

// Update a setting
const updateAdminSetting = async (key, value) => {
  const { data, error } = await supabase
    .from('admin_settings')
    .update({ value, updated_at: new Date() })
    .eq('key', key)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};
``` 