import React, { useState, useEffect } from 'react';
import { menuAPI } from '../api';
import { Plus, Edit, Trash2, Flame } from 'lucide-react';

const MenuManager = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'mains',
    image: '',
    isChefRecommendation: false,
    isDietaryFriendly: [],
    calories: '',
    preparationTime: '15',
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await menuAPI.getAllItems({});
      setMenuItems(response.data.data);
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'isDietaryFriendly') {
      // Handle checkbox array
      setFormData((prev) => ({
        ...prev,
        isDietaryFriendly: checked
          ? [...prev.isDietaryFriendly, value]
          : prev.isDietaryFriendly.filter((item) => item !== value),
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
      if (editingId) {
        await menuAPI.updateItem(editingId, formData);
      } else {
        await menuAPI.createItem(formData);
      }
      fetchMenuItems();
      setShowForm(false);
      setEditingId(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'mains',
        image: '',
        isChefRecommendation: false,
        isDietaryFriendly: [],
        calories: '',
        preparationTime: '15',
      });
    } catch (error) {
      console.error('Error saving menu item:', error);
      alert('Error saving menu item');
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await menuAPI.deleteItem(id);
        fetchMenuItems();
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error deleting item');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading menu items...</div>;
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => {
          setShowForm(!showForm);
          if (showForm) {
            setEditingId(null);
            setFormData({
              name: '',
              description: '',
              price: '',
              category: 'mains',
              image: '',
              isChefRecommendation: false,
              isDietaryFriendly: [],
              calories: '',
              preparationTime: '15',
            });
          }
        }}
        className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
      >
        <Plus size={20} /> Add New Item
      </button>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            {editingId ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Dish Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />

            <div className="grid md:grid-cols-3 gap-4">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                <option value="appetizers">Appetizers</option>
                <option value="mains">Mains</option>
                <option value="vegetables">Vegetables</option>
                <option value="noodles">Noodles</option>
                <option value="rice">Rice</option>
                <option value="desserts">Desserts</option>
                <option value="beverages">Beverages</option>
              </select>

              <input
                type="number"
                name="preparationTime"
                placeholder="Prep Time (min)"
                value={formData.preparationTime}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />

              <input
                type="number"
                name="calories"
                placeholder="Calories"
                value={formData.calories}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Dietary Tags</label>
              <div className="flex gap-4 flex-wrap">
                {['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'spicy'].map((tag) => (
                  <label key={tag} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isDietaryFriendly"
                      value={tag}
                      checked={formData.isDietaryFriendly.includes(tag)}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700 capitalize">{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isChefRecommendation"
                checked={formData.isChefRecommendation}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-gray-700 font-semibold">Chef's Recommendation</span>
            </label>

            <input
              type="text"
              name="image"
              placeholder="Image URL (optional)"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                {editingId ? 'Update Item' : 'Add Item'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Items List */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {menuItems.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No menu items yet. Create one!</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Price</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Chef Pick</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {menuItems.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 capitalize">{item.category}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    {item.isChefRecommendation && <Flame className="text-yellow-500" size={20} />}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center gap-2"
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center gap-2"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MenuManager;
