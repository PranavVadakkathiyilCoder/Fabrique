import React from 'react';
import { MdVerified } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sellers: React.FC = () => {
  const _id = "134"
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Sellers</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Seller Name</th>
              <th className="border border-gray-300 px-4 py-2">Rating</th>
              <th className="border border-gray-300 px-4 py-2">Total Products</th>
              <th className="border border-gray-300 px-4 py-2">Total Orders</th>
              <th className="border border-gray-300 px-4 py-2">Shop Name</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Reviews</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 align-top">
                Pranav V 
              </td>

              <td className=" border-gray-300 px-4 py-2 align-top flex items-center gap-1">
                4.8 <FaStar className="text-yellow-300 text-sm" />
              </td>

              <td className="border border-gray-300 px-4 py-2 align-top">320</td>
              <td className="border border-gray-300 px-4 py-2 align-top">1800</td>
              <td className="border border-gray-300 px-4 py-2 align-top">Fabrique Store</td>
              <td className="border border-gray-300 px-4 py-2 align-top">Bangalore, India</td>
              <td className="border border-gray-300 px-4 py-2 align-top">
                <Link to={`/reviews/${_id}`}>Show Reviews</Link>
              </td>

              <td className="border border-gray-300 px-4 py-2 align-top">
                <button
                  className="bg-black hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                  onClick={() => alert('Block Seller')}
                >
                  Block
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sellers;
