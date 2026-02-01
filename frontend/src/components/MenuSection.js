import React, { useState, useEffect } from 'react';
import { menuAPI, settingsAPI } from '../api';
import SectionTitle from './SectionTitle';
import { Star, Flame, Clock, Flame as CalorieIcon } from 'lucide-react';
import { MENU_CATEGORIES } from '../constants';

const MenuSection = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('mains');
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchMenu();
    fetchSettings();
  }, [selectedCategory]);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const response = await menuAPI.getAllItems({ category: selectedCategory });
      setMenuItems(response.data.data);
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await settingsAPI.getSettings();
      setSettings(response.data.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  return (
    <section id="menu" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <SectionTitle>Our Menu</SectionTitle>
          <p className="text-gray-600 text-lg">Authentic Indo-Chinese flavors, crafted to perfection</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                selectedCategory === cat.id
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-red-600'
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading menu items...</p>
          </div>
        ) : menuItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No items available in this category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-105"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                      🍜
                    </div>
                  )}
                  {item.isChefRecommendation && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-red-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Flame size={16} /> Chef Pick
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                  {/* Tags */}
                  {item.isDietaryFriendly && item.isDietaryFriendly.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.isDietaryFriendly.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                    {item.preparationTime && (
                      <div className="flex items-center gap-1">
                        <Clock size={14} /> {item.preparationTime} min
                      </div>
                    )}
                    {item.calories && (
                      <div className="flex items-center gap-1">
                        <CalorieIcon size={14} /> {item.calories} cal
                      </div>
                    )}
                  </div>

                  {/* Price & Button */}
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-red-600">${item.price.toFixed(2)}</span>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
