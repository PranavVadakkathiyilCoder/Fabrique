import React from 'react';

const Users: React.FC = () => {
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 align-top">John Doe</td>
              <td className="border border-gray-300 px-4 py-2 align-top">johndoe@example.com</td>
              <td className="border border-gray-300 px-4 py-2 align-top">+91-9876543210</td>
              <td className="border border-gray-300 px-4 py-2 align-top">User</td>
              <td className="border border-gray-300 px-4 py-2 align-top">Active</td>

              <td className="border border-gray-300 px-4 py-2 align-top space-x-2">
                <button
                  className="bg-black hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                  onClick={() => alert('Block John Doe')}
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

export default Users;
