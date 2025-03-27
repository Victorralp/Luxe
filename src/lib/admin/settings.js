import { supabase } from '../supabase/config';

/**
 * Get all admin settings
 * @returns {Promise<Array>} Array of admin settings
 */
export const getAdminSettings = async () => {
  const { data, error } = await supabase
    .from('admin_settings')
    .select('*');
  
  if (error) {
    console.error('Error fetching admin settings:', error);
    throw error;
  }
  return data || [];
};

/**
 * Get a specific admin setting by key
 * @param {string} key - The setting key to retrieve
 * @returns {Promise<Object>} The admin setting object
 */
export const getAdminSetting = async (key) => {
  const { data, error } = await supabase
    .from('admin_settings')
    .select('*')
    .eq('key', key)
    .single();
  
  if (error) {
    console.error(`Error fetching admin setting "${key}":`, error);
    throw error;
  }
  return data;
};

/**
 * Update an admin setting
 * @param {string} key - The setting key to update
 * @param {Object} value - The new value for the setting (will be stored as JSONB)
 * @returns {Promise<Object>} The updated admin setting object
 */
export const updateAdminSetting = async (key, value) => {
  const { data, error } = await supabase
    .from('admin_settings')
    .update({ 
      value, 
      updated_at: new Date().toISOString() 
    })
    .eq('key', key)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating admin setting "${key}":`, error);
    throw error;
  }
  return data;
};

/**
 * Create a new admin setting
 * @param {string} key - Unique identifier for the setting
 * @param {Object} value - The value for the setting (will be stored as JSONB)
 * @param {string} description - Optional description of the setting
 * @returns {Promise<Object>} The created admin setting object
 */
export const createAdminSetting = async (key, value, description = '') => {
  const { data, error } = await supabase
    .from('admin_settings')
    .insert({
      key,
      value,
      description
    })
    .select()
    .single();
  
  if (error) {
    console.error(`Error creating admin setting "${key}":`, error);
    throw error;
  }
  return data;
};

/**
 * Delete an admin setting
 * @param {string} key - The setting key to delete
 * @returns {Promise<void>}
 */
export const deleteAdminSetting = async (key) => {
  const { error } = await supabase
    .from('admin_settings')
    .delete()
    .eq('key', key);
  
  if (error) {
    console.error(`Error deleting admin setting "${key}":`, error);
    throw error;
  }
}; 