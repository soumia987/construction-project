import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Resources({ taskId, onBack }) {
  const [resources, setResources] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    type: Yup.string().required('Type is required'),
    quantity: Yup.number().required('Quantity is required').positive('Quantity must be a positive number'),
    supplierInfo: Yup.string().required('Supplier info is required'),
  });

  const handleAddResource = (values, { resetForm }) => {
    const newResource = { ...values, taskId };
    setResources([...resources, newResource]);
    resetForm(); // Reset the form after successful submission
    setShowAddForm(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={onBack}
            className="text-blue-500 hover:text-blue-600 mb-2"
          >
            ← Back to Tasks
          </button>
          <h2 className="text-2xl font-semibold">Resources</h2>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          {showAddForm ? 'Cancel' : 'Add Resource'}
        </button>
      </div>

      {showAddForm && (
        <div className="mt-4 p-6 border rounded-lg shadow-md bg-white">
          <h3 className="text-xl font-semibold mb-4">Add New Resource</h3>
          <Formik
            initialValues={{
              name: '',
              type: '',
              quantity: '',
              supplierInfo: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddResource}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type:</label>
                  <Field
                    type="text"
                    id="type"
                    name="type"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="type" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity:</label>
                  <Field
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4">
                  <label htmlFor="supplierInfo" className="block text-sm font-medium text-gray-700">Supplier Info:</label>
                  <Field
                    type="text"
                    id="supplierInfo"
                    name="supplierInfo"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="supplierInfo" component="div" className="text-red-500 text-sm" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  {isSubmitting ? 'Adding...' : 'Add'}
                </button>
              </Form>
            )}
          </Formik>
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
