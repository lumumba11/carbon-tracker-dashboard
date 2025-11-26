import React, { useState } from 'react';

const AddLogModal = ({ onClose, onSave, emissionFactors }) => {
  const [formData, setFormData] = useState({ category: 'electricity', value: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.value) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Entry</h3>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <optgroup label="Energy">
                  <option value="electricity">Electricity</option>
                </optgroup>
                <optgroup label="Transport">
                  <option value="car">Car</option>
                  <option value="bus">Bus</option>
                  <option value="motorbike">Motorbike</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                </optgroup>
                <optgroup label="Consumption">
                  <option value="food">Food</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount ({emissionFactors[formData.category]?.unit || 'units'})
              </label>
              <input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                placeholder="Enter value"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            {formData.value && (
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Estimated CO₂e</p>
                <p className="text-2xl font-bold text-green-600">
                  {(formData.value * emissionFactors[formData.category]?.factor).toFixed(2)} kg
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.value}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLogModal;