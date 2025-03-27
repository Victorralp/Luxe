import React, { useState, useEffect } from 'react';
import { 
  getAdminSettings, 
  updateAdminSetting, 
  createAdminSetting,
  deleteAdminSetting 
} from '../lib/admin/settings';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingKey, setEditingKey] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if user is admin
  useEffect(() => {
    if (user && (!user.user_metadata?.role || user.user_metadata.role !== 'admin')) {
      navigate('/admin');
    }
  }, [user, navigate]);

  // Fetch settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await getAdminSettings();
        setSettings(data);
      } catch (err) {
        console.error('Error fetching admin settings:', err);
        setError('Failed to load admin settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleStartEdit = (setting) => {
    setEditingKey(setting.key);
    setEditValue(JSON.stringify(setting.value, null, 2));
  };

  const handleSaveEdit = async () => {
    try {
      let parsedValue;
      try {
        parsedValue = JSON.parse(editValue);
      } catch (err) {
        alert('Invalid JSON format');
        return;
      }

      await updateAdminSetting(editingKey, parsedValue);
      
      // Update local state
      setSettings(settings.map(setting => 
        setting.key === editingKey 
          ? { ...setting, value: parsedValue, updated_at: new Date().toISOString() }
          : setting
      ));
      
      setEditingKey(null);
    } catch (err) {
      console.error('Error saving setting:', err);
      alert(`Failed to save setting: ${err.message}`);
    }
  };

  const handleCreateSetting = async () => {
    if (!newKey.trim()) {
      alert('Key is required');
      return;
    }

    try {
      let parsedValue;
      try {
        parsedValue = JSON.parse(newValue);
      } catch (err) {
        alert('Invalid JSON format');
        return;
      }

      const newSetting = await createAdminSetting(newKey, parsedValue, newDescription);
      
      // Update local state
      setSettings([...settings, newSetting]);
      
      // Reset form
      setNewKey('');
      setNewValue('');
      setNewDescription('');
    } catch (err) {
      console.error('Error creating setting:', err);
      alert(`Failed to create setting: ${err.message}`);
    }
  };

  const handleDeleteSetting = async (key) => {
    if (!confirm(`Are you sure you want to delete the setting "${key}"?`)) {
      return;
    }

    try {
      await deleteAdminSetting(key);
      
      // Update local state
      setSettings(settings.filter(setting => setting.key !== key));
    } catch (err) {
      console.error('Error deleting setting:', err);
      alert(`Failed to delete setting: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
          <div className="text-white">Loading settings...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
          <div className="text-red-500">{error}</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Admin Settings</h1>
          
          {/* Settings List */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Current Settings</h2>
            
            {settings.length === 0 ? (
              <p className="text-gray-400">No settings found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4">Key</th>
                      <th className="text-left py-3 px-4">Value</th>
                      <th className="text-left py-3 px-4">Description</th>
                      <th className="text-left py-3 px-4">Updated</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {settings.map((setting) => (
                      <tr key={setting.key} className="border-b border-gray-700">
                        <td className="py-3 px-4 font-medium">{setting.key}</td>
                        <td className="py-3 px-4">
                          {editingKey === setting.key ? (
                            <textarea
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-full bg-gray-700 text-white p-2 rounded"
                              rows={5}
                            />
                          ) : (
                            <pre className="whitespace-pre-wrap bg-gray-700 p-2 rounded text-sm">
                              {JSON.stringify(setting.value, null, 2)}
                            </pre>
                          )}
                        </td>
                        <td className="py-3 px-4">{setting.description || '-'}</td>
                        <td className="py-3 px-4">
                          {new Date(setting.updated_at).toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          {editingKey === setting.key ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={handleSaveEdit}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingKey(null)}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleStartEdit(setting)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteSetting(setting.key)}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          {/* Add New Setting Form */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Setting</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="newKey" className="block text-sm font-medium text-gray-300 mb-1">
                  Key (Required)
                </label>
                <input
                  id="newKey"
                  type="text"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="setting_key"
                />
              </div>
              
              <div>
                <label htmlFor="newValue" className="block text-sm font-medium text-gray-300 mb-1">
                  Value (JSON) (Required)
                </label>
                <textarea
                  id="newValue"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={5}
                  placeholder='{"enabled": true, "config": {"option1": "value1"}}'
                />
              </div>
              
              <div>
                <label htmlFor="newDescription" className="block text-sm font-medium text-gray-300 mb-1">
                  Description (Optional)
                </label>
                <input
                  id="newDescription"
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Description of what this setting controls"
                />
              </div>
              
              <div>
                <button
                  onClick={handleCreateSetting}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium"
                >
                  Create Setting
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 