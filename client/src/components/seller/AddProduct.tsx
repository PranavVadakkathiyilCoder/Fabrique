import React, { useState, type ChangeEvent, type FormEvent } from 'react';

const AddProduct: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [colors, setColors] = useState<string[]>(['']);
  const [sizes, setSizes] = useState<string[]>(['']);
  const [totalStock, setTotalStock] = useState<number>(1);
  const [error, setError] = useState<string>('');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      if (images.length + selectedFiles.length > 4) {
        setError('You can upload a maximum of 4 images.');
        return;
      }

      setImages((prevImages) => [...prevImages, ...selectedFiles]);
      setError('');
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

 

  

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (images.length !== 4) {
      setError('Please upload exactly 4 images.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
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

    console.log('Submitting product', {
      name,
      description,
      images,
      colors,
      sizes,
      totalStock,
    });

    // Reset after submit
    setName('');
    setDescription('');
    setImages([]);
    setColors(['']);
    setSizes(['']);
    setTotalStock(0);
    setError('');
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Add New Product
        </h2>

        {/* Product Name */}
        <div>
          <label className="block font-medium mb-1">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-black/30 focus:outline-none"
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="block font-medium mb-1">Product Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-black/30 focus:outline-none resize-none"
            rows={4}
            placeholder="Enter product description"
            required
          />
        </div>

        {/* Product Images */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Product Images (exactly 4 images)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="border rounded px-3 py-2 focus:ring focus:ring-black/30 focus:outline-none"
          />
          {images.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {images.length} image{images.length > 1 ? 's' : ''} selected
            </p>
          )}
          {error && (
            <p className="text-sm text-red-500 mt-1">
              {error}
            </p>
          )}

          {/* Image preview */}
          <div className="flex flex-wrap gap-4 mt-3">
            {images.map((file, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  className="w-24 h-24 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-2 -right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="block font-medium mb-1">
            Available Colors (Hex Code or Name)
          </label>
            <div  className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                
                                onChange={(e) => setColors(e.target.value.split(',').map(s => s.trim()).filter(Boolean))}

                className="flex-1 border rounded px-3 py-2 uppercase"
                placeholder="#FF0000 or Red"
              />
              
            </div>
          
          
        </div>

        {/* Sizes */}
        <div>
          <label className="block font-medium mb-1">Available Sizes</label>
          
            <div  className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                onChange={(e) => setSizes(e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                className="flex-1 border rounded px-3 py-2 uppercase"
                placeholder="S, M, L, XL, XXL"
              />
              
            </div>
         
          
        </div>

        {/* Total Stock */}
        <div>
          <label className="block font-medium mb-1">Total Stock</label>
          <input
            type="number"
            min={1}
            value={totalStock}
            onChange={(e) => setTotalStock(Number(e.target.value))}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-black/30 focus:outline-none"
            required
          />
        </div>

        {/* Submit button */}
        <div>
          <button
            type="submit"
            className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-900 transition text-lg font-medium"
          >
            Submit Product
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;
