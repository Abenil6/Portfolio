import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Save, X, ArrowLeft } from 'lucide-react';
import axios from 'axios';

function ServicesManagement() {
  const [services, setServices] = useState([]);
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    price: '',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/services', formData);
      setFormData({ title: '', description: '', icon: '', price: '' });
      setIsAddingService(false);
      fetchServices();
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/services/${editingId}`, formData);
      setFormData({ title: '', description: '', icon: '', price: '' });
      setEditingId(null);
      fetchServices();
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`http://localhost:5000/api/services/${id}`);
        fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const startEdit = (service) => {
    setEditingId(service._id);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      price: service.price,
    });
    setIsAddingService(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', icon: '', price: '' });
  };

  const cancelAdd = () => {
    setIsAddingService(false);
    setFormData({ title: '', description: '', icon: '', price: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center text-gray-600 hover:text-blue-500 transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Portfolio
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">Services Management</h1>
            </div>
            <button
              onClick={() => setIsAddingService(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <Plus size={20} className="mr-2" />
              Add Service
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Service Form */}
        {isAddingService && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Add New Service</h2>
              <button
                onClick={cancelAdd}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddService} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Icon (emoji or text)</label>
                  <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="💻"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Price</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="$500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center transition-colors"
              >
                <Save size={20} className="mr-2" />
                Save Service
              </button>
            </form>
          </div>
        )}

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {editingId === service._id ? (
                <div className="p-6">
                  <form onSubmit={handleUpdateService} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Icon</label>
                      <input
                        type="text"
                        name="icon"
                        value={formData.icon}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Price</label>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <Save size={18} className="mr-2" />
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <X size={18} className="mr-2" />
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  <div className="p-6">
                    <div className="text-4xl mb-4">{service.icon || '📦'}</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    {service.price && (
                      <p className="text-blue-500 font-semibold text-lg">{service.price}</p>
                    )}
                  </div>
                  <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-2">
                    <button
                      onClick={() => startEdit(service)}
                      className="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service._id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {services.length === 0 && !isAddingService && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No services yet. Add your first service!</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default ServicesManagement;
