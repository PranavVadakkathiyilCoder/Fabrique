import React from 'react';
import shirt from '../../assets/shirt.png';
import { IoMdAdd } from 'react-icons/io'

const ProductManage: React.FC = () => {
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
    <div>
        <button className='flex gap-3 px-6 py-1 m-1 bg-black text-white rounded-sm'>Add Product<IoMdAdd className='text-2xl '/></button>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Images</th>
            <th className="border border-gray-300 px-4 py-2">Colors</th>
            <th className="border border-gray-300 px-4 py-2">Sizes</th>
            <th className="border border-gray-300 px-4 py-2">Total Stock</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2 align-top">Classic White Shirt</td>
            <td className=" border-gray-300 px-4 py-2 flex gap-2 ">
              <img
                src={shirt}
                alt="Classic White Shirt image 1"
                className="w-12 h-12 object-cover rounded bg-gray-200 p-1"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2 align-top">White, Black</td>
            <td className="border border-gray-300 px-4 py-2 align-top">S, M, L, XL</td>
            <td className="border border-gray-300 px-4 py-2 align-top">120</td>
            <td className="border border-gray-300 px-4 py-2 align-top space-x-2">
              <button
                className="bg-black hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                onClick={() => alert('Edit Classic White Shirt')}
              >
                Edit
              </button>
              <button
                className="bg-black hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                onClick={() => alert('Delete Classic White Shirt')}
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ProductManage;
