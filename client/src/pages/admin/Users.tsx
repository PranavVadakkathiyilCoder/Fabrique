import React, { useEffect, useState } from 'react';
import { UserInfoAdmin } from '../../apis/productapi'; // Adjust path if needed

interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await UserInfoAdmin();
        setUsers(res.data.users); // assuming API returns { users: [...] }
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 align-top">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2 align-top">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2 align-top">{user.role}</td>
                <td className="border border-gray-300 px-4 py-2 align-top">{user.status}</td>
                
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
