import React, { useEffect, useState } from 'react';
import { ProductInfoAdmin } from '../../apis/productapi';

interface ProductType {
  _id: string;
  name: string;
  image: string;
  colors: string[];
  sizes: string[];
  totalStock: number;
  avgRating: string;
  reviewCount: number;
  sellerName: string;
  orderCount: number;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ProductInfoAdmin();
        setProducts(res.data.products);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

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
              
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded bg-gray-200 p-1"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 align-top">{product.name}</td>
                <td className="border border-gray-300 px-4 py-2 align-top">
                  {product.colors.join(', ')}
                </td>
                <td className="border border-gray-300 px-4 py-2 align-top">
                  {product.sizes.join(', ')}
                </td>
                <td className="border border-gray-300 px-4 py-2 align-top">{product.totalStock}</td>
                <td className="border border-gray-300 px-4 py-2 align-top">
                  {product.avgRating} ⭐ ({product.reviewCount} reviews)
                </td>
                <td className="border border-gray-300 px-4 py-2 align-top">{product.sellerName}</td>
                <td className="border border-gray-300 px-4 py-2 align-top">{product.orderCount} Orders</td>
                
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductPage;
