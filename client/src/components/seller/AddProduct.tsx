import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
interface ProductFormData {
  name: string;
  images: File[];
  colors: string[];
  sizes: string[];
  totalStock: number;
}

const AddProduct: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [colors, setColors] = useState<string[]>(['']);
  const [sizes, setSizes] = useState<string[]>(['']);
  const [totalStock, setTotalStock] = useState<number>(0);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    images.forEach((image) => {
      formData.append('images', image);
    });
    colors.forEach((color) => {
      formData.append('colors', color);
    });
    sizes.forEach((size) => {
      formData.append('sizes', size);
    });
    formData.append('totalStock', totalStock.toString());

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Product added successfully!');
        setName('');
        setImages([]);
        setColors(['']);
        setSizes(['']);
        setTotalStock(0);
      } else {
        alert('Error adding product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding product');
    }
  };

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const addColorField = () => setColors([...colors, '']);
  const removeColorField = (index: number) => {
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
  };

  const handleSizeChange = (index: number, value: string) => {
    const newSizes = [...sizes];
    newSizes[index] = value;
    setSizes(newSizes);
  };

  const addSizeField = () => setSizes([...sizes, '']);
  const removeSizeField = (index: number) => {
    const newSizes = sizes.filter((_, i) => i !== index);
    setSizes(newSizes);
  };

  return (

    
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Add New Product</h2>

      <div>
        <label className="block font-medium mb-1">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Product Images (4 images)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full"
          required
        />
        {images.length > 0 && (
          <p className="text-sm text-gray-500 mt-1">{images.length} images selected</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Available Colors (Hex Code or Name)</label>
        {colors.map((color, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={color}
              onChange={(e) => handleColorChange(index, e.target.value)}
              className="flex-1 border rounded px-3 py-2"
              placeholder="#FF0000 or Red"
            />
            <button
              type="button"
              onClick={() => removeColorField(index)}
              className="px-3 py-2 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addColorField}
          className="mt-1 px-3 py-2 bg-green-500 text-white rounded"
        >
          Add Color
        </button>
      </div>

      <div>
        <label className="block font-medium mb-1">Available Sizes</label>
        {sizes.map((size, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={size}
              onChange={(e) => handleSizeChange(index, e.target.value)}
              className="flex-1 border rounded px-3 py-2"
              placeholder="S, M, L, XL, XXL"
            />
            <button
              type="button"
              onClick={() => removeSizeField(index)}
              className="px-3 py-2 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSizeField}
          className="mt-1 px-3 py-2 bg-green-500 text-white rounded"
        >
          Add Size
        </button>
      </div>

      <div>
        <label className="block font-medium mb-1">Total Stock</label>
        <input
          type="number"
          value={totalStock}
          onChange={(e) => setTotalStock(Number(e.target.value))}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Submit Product
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
