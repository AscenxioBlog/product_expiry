import React, { useState } from "react";
import API_URL from "../Config";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    expiryDate: "",
    quantity: "",
    price: "",
    category: "",
    isExpired: false,
    isAvailable: true,
    location: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  
  const handleSubmit = async (e) => {
    const token = localStorage.getItem("authToken");
    e.preventDefault();
    // Client-side validation
    const newErrors = {};
    if (!formData.productName)
      newErrors.productName = "Product name is required.";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required.";
    if (!formData.quantity || formData.quantity < 0)
      newErrors.quantity = "Quantity must be at least 0.";
    if (!formData.price || formData.price < 0)
      newErrors.price = "Price must be a positive number.";
    if (!formData.category) newErrors.category = "Category is required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await fetch(`${API_URL}/api/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token here
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Product added successfully!");
        setFormData({
          productName: "",
          expiryDate: "",
          quantity: "",
          price: "",
          category: "",
          isExpired: false,
          isAvailable: true,
          location: "",
        });
      } else {
        alert("Failed to add product.");
      }
    } catch (err) {
      console.error("Error adding product:", err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Add Product</h2>
        {/* Product Name */}
        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block text-sm text-gray-600 font-semibold"
          >
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.productName ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
          {errors.productName && (
            <p className="text-sm text-red-500 mt-1">{errors.productName}</p>
          )}
        </div>
        {/* Expiry Date */}
        <div className="mb-4">
          <label
            htmlFor="expiryDate"
            className="block text-sm text-gray-600 font-semibold"
          >
            Expiry Date
          </label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.expiryDate ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
          {errors.expiryDate && (
            <p className="text-sm text-red-500 mt-1">{errors.expiryDate}</p>
          )}
        </div>
        {/* Quantity */}
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-sm text-gray-600 font-semibold"
          >
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.quantity ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
          {errors.quantity && (
            <p className="text-sm text-red-500 mt-1">{errors.quantity}</p>
          )}
        </div>
        {/* Price */}
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm text-gray-600 font-semibold"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.price ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
          {errors.price && (
            <p className="text-sm text-red-500 mt-1">{errors.price}</p>
          )}
        </div>
        {/* Category */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm text-gray-600 font-semibold"
          >
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.category ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
          {errors.category && (
            <p className="text-sm text-red-500 mt-1">{errors.category}</p>
          )}
        </div>
        {/* Location */}
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm text-gray-600 font-semibold"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {/* Availability */}
        <div className="mb-4 flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span className="text-sm">Available</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isExpired"
              checked={formData.isExpired}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span className="text-sm">Expired</span>
          </label>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
