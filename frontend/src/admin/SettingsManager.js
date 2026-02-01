import React, { useState, useEffect } from 'react';
import { settingsAPI } from '../api';

const SettingsManager = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await settingsAPI.getSettings();
      setSettings(response.data.data);
      setFormData(response.data.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await settingsAPI.updateSettings(formData);
      alert('Settings updated successfully!');
      fetchSettings();
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading settings...</div>;
  }

  return (
    <div className="max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Restaurant Info */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Restaurant Information</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="restaurantName"
              placeholder="Restaurant Name"
              value={formData.restaurantName || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
            <input
              type="text"
              name="tagline"
              placeholder="Tagline"
              value={formData.tagline || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description || ''}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 resize-none"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Opening Hours */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Opening Hours</h2>
          {formData.openingHours && Object.entries(formData.openingHours).map(([day, hours]) => (
            <div key={day} className="mb-4 flex items-center gap-4">
              <label className="w-32 font-semibold text-gray-700 capitalize">{day}</label>
              <input
                type="time"
                name={`openingHours.${day}.open`}
                value={hours.open || ''}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
              <span className="text-gray-600">to</span>
              <input
                type="time"
                name={`openingHours.${day}.close`}
                value={hours.close || ''}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={`openingHours.${day}.isClosed`}
                  checked={hours.isClosed || false}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Closed</span>
              </label>
            </div>
          ))}
        </div>

        {/* Theme Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Theme Settings</h2>
          {formData.theme && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    name="theme.primaryColor"
                    value={formData.theme.primaryColor || ''}
                    onChange={handleChange}
                    className="w-16 h-10 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.theme.primaryColor || ''}
                    onChange={handleChange}
                    name="theme.primaryColor"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Secondary Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    name="theme.secondaryColor"
                    value={formData.theme.secondaryColor || ''}
                    onChange={handleChange}
                    className="w-16 h-10 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.theme.secondaryColor || ''}
                    onChange={handleChange}
                    name="theme.secondaryColor"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SEO Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">SEO Settings</h2>
          {formData.seoSettings && (
            <div className="space-y-4">
              <input
                type="text"
                name="seoSettings.metaTitle"
                placeholder="Meta Title"
                value={formData.seoSettings.metaTitle || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
              <textarea
                name="seoSettings.metaDescription"
                placeholder="Meta Description"
                value={formData.seoSettings.metaDescription || ''}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 resize-none"
              />
              <input
                type="text"
                name="seoSettings.metaKeywords"
                placeholder="Meta Keywords"
                value={formData.seoSettings.metaKeywords || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
          )}
        </div>

        {/* Business Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Settings</h2>
          {formData.features && (
            <div className="space-y-3">
              {Object.entries(formData.features).map(([feature, enabled]) => (
                <label key={feature} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name={`features.${feature}`}
                    checked={enabled}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700 font-semibold capitalize">
                    {feature.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
              ))}
            </div>
          )}

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tax Rate (%)</label>
              <input
                type="number"
                name="taxRate"
                step="0.01"
                value={formData.taxRate || 0}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Fee ($)</label>
              <input
                type="number"
                name="deliveryFee"
                step="0.01"
                value={formData.deliveryFee || 0}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};

export default SettingsManager;
