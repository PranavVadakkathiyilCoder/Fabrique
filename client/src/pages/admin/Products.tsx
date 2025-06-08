import React from 'react';
import shirt from '../../assets/shirt.png';

const ProductPage: React.FC = () => {
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-left">
          <thead>

            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Image</th>

              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">Colors</th>
              <th className="border border-gray-300 px-4 py-2">Sizes</th>
              <th className="border border-gray-300 px-4 py-2">Total Stock</th>
              <th className="border border-gray-300 px-4 py-2">Reviews</th>
              <th className="border border-gray-300 px-4 py-2">Seller</th>
              <th className="border border-gray-300 px-4 py-2">Orders</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="hover:bg-gray-50">
              <td className=" border-gray-300 px-4 py-2 flex gap-2">
                <img
                  src={shirt}
                  alt="Classic White Shirt"
                  className="w-12 h-12 object-cover rounded bg-gray-200 p-1"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 align-top">Classic White Shirt</td>



              <td className="border border-gray-300 px-4 py-2 align-top">White, Black</td>
              <td className="border border-gray-300 px-4 py-2 align-top">S, M, L, XL</td>
              <td className="border border-gray-300 px-4 py-2 align-top">120</td>
              <td className="border border-gray-300 px-4 py-2 align-top">4.5 ⭐️ (23 reviews)</td>
              <td className="border border-gray-300 px-4 py-2 align-top">Seller A</td>
              <td className="border border-gray-300 px-4 py-2 align-top">58 Orders</td>

              <td className="border border-gray-300 px-4 py-2 align-top">
                <button
                  className="bg-black hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                  
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

export default ProductPage;
