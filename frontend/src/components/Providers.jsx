import React, { useState } from 'react';

function Providers() {
  const [providers, setProviders] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProvider, setNewProvider] = useState({
    name: '',
    contact: '',
    address: '',
  });

  const handleInputChange = (e) => {
    setNewProvider({ ...newProvider, [e.target.name]: e.target.value });
  };

  const handleAddProvider = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend API.
    setProviders([...providers, newProvider]);
    setNewProvider({
      name: '',
      contact: '',
      address: '',
    });
    setShowAddForm(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Providers</h2>
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
      >
        {showAddForm ? 'Cancel' : 'Add Provider'}
      </button>

      {showAddForm && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-2xl font-medium text-gray-800 mb-4">Add New Provider</h3>
          <form onSubmit={handleAddProvider} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newProvider.name}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="contact" className="block text-lg font-medium text-gray-700">
                Contact:
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={newProvider.contact}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-lg font-medium text-gray-700">
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={newProvider.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add
            </button>
          </form>
        </div>
      )}

      <ul className="space-y-4">
        {providers.map((provider, index) => (
          <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border">
            <strong className="text-xl font-semibold text-gray-800">{provider.name}</strong>
            <p className="text-gray-600">Contact: {provider.contact}</p>
            <p className="text-gray-600">Address: {provider.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Providers;
