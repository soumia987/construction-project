import React, { useState } from 'react';

function Resources() {
  const [resources, setResources] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newResource, setNewResource] = useState({
    name: '',
    type: '',
    quantity: '',
    supplierInfo: '',
  });

  const handleInputChange = (e) => {
    setNewResource({ ...newResource, [e.target.name]: e.target.value });
  };

  const handleAddResource = (e) => {
    e.preventDefault();
    setResources([...resources, newResource]);
    setNewResource({
      name: '',
      type: '',
      quantity: '',
      supplierInfo: '',
    });
    setShowAddForm(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Resources</h2>
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        {showAddForm ? 'Cancel' : 'Add Resource'}
      </button>

      {showAddForm && (
        <div className="mt-4 p-6 border rounded-lg shadow-md bg-white">
          <h3 className="text-xl font-semibold mb-4">Add New Resource</h3>
          <form onSubmit={handleAddResource}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newResource.name}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type:</label>
              <input
                type="text"
                id="type"
                name="type"
                value={newResource.type}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity:</label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={newResource.quantity}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="supplierInfo" className="block text-sm font-medium text-gray-700">Supplier Info:</label>
              <input
                type="text"
                id="supplierInfo"
                name="supplierInfo"
                value={newResource.supplierInfo}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Add
            </button>
          </form>
        </div>
      )}

      <ul className="mt-4 space-y-4">
        {resources.map((resource, index) => (
          <li key={index} className="p-4 border rounded-lg shadow-md bg-white">
            <strong className="text-lg">{resource.name}</strong>
            <p className="text-sm text-gray-600">Type: {resource.type}</p>
            <p className="text-sm text-gray-600">Quantity: {resource.quantity}</p>
            <p className="text-sm text-gray-600">Supplier Info: {resource.supplierInfo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Resources;
