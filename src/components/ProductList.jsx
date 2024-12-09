import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";
import Modal from "./Modal";
import API_URL from "../Config";


const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of products per page
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // For the modal 
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Fetch products
  const fetchProducts = async () => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    // console.log(decoded)
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/product`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token here 
        },
      });
      
      const data = await response.json();
      if (response.status === 401) {
        // Token expired, show the modal and prompt re-login
        setModalMessage("Your session has expired. Please log in again.");
        setShowModal(true); // Show the modal
        sessionStorage.clear(); // Clear session storage
        localStorage.clear(); // Clear local storage
        navigate("/login"); // Redirect to login
      }
      console.log(data);
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products.");
      }
      setProducts(data); // Assuming the API returns an array of products
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const changePage = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8">
        {showModal && <Modal message={modalMessage} onClose={closeModal} />}
      <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">
          All Products
        </h2>

        {loading && <p className="text-center text-blue-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">#</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Category</th>
                  <th className="border border-gray-300 px-4 py-2">Price</th>
                  <th className="border border-gray-300 px-4 py-2">Quantity</th>
                  <th className="border border-gray-300 px-4 py-2">Location</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Expiry Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Edit</th>
                  <th className="border border-gray-300 px-4 py-2 text-red-500">Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product, index) => (
                  <tr
                    key={product._id}
                    className={index % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.productName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.category}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ${product.price}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.quantity}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.location || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(product.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="border text-blue-800 font-bold  border-gray-300 px-4 py-2 cursor-pointer">
                      <BsPencilSquare/>
                    </td>
                    <td className="border border-gray-300 px-6 py-2 text-red-500 cursor-pointer">
                      <BiTrash/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => changePage("prev")}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <p className="text-gray-700 font-semibold">
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={() => changePage("next")}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
