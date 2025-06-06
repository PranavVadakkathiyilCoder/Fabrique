import React from 'react';

const Chats: React.FC = () => {
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Customer Chats</h2>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        
        {/* Chat Card 1 */}
        <div className="border border-gray-300 rounded-lg p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition">
          <p className="font-semibold text-gray-800">Customer: <span className="text-black">John Doe</span></p>
          <p className="text-gray-700">Product: <span className="text-black">Classic White Shirt</span></p>
          <button className="mt-auto bg-black text-white px-4 py-2 rounded hover:bg-gray-900 transition text-sm">
            Chat
          </button>
        </div>

        {/* Chat Card 2 */}
        <div className="border border-gray-300 rounded-lg p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition">
          <p className="font-semibold text-gray-800">Customer: <span className="text-black">Jane Smith</span></p>
          <p className="text-gray-700">Product: <span className="text-black">Blue Denim Jacket</span></p>
          <button className="mt-auto bg-black text-white px-4 py-2 rounded hover:bg-gray-900 transition text-sm">
            Chat
          </button>
        </div>

        {/* Chat Card 3 */}
        <div className="border border-gray-300 rounded-lg p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition">
          <p className="font-semibold text-gray-800">Customer: <span className="text-black">Alex Johnson</span></p>
          <p className="text-gray-700">Product: <span className="text-black">Red Hoodie</span></p>
          <button className="mt-auto bg-black text-white px-4 py-2 rounded hover:bg-gray-900 transition text-sm">
            Chat
          </button>
        </div>

        {/* Chat Card 4 */}
        <div className="border border-gray-300 rounded-lg p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition">
          <p className="font-semibold text-gray-800">Customer: <span className="text-black">Emma Brown</span></p>
          <p className="text-gray-700">Product: <span className="text-black">Black Trousers</span></p>
          <button className="mt-auto bg-black text-white px-4 py-2 rounded hover:bg-gray-900 transition text-sm">
            Chat
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chats;
