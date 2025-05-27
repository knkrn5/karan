import axios from 'axios';
import { useEffect, useState } from 'react';

const PY_BACKEND_URL = import.meta.env.VITE_PY_BACKEND_URL;

interface ProductPropsType {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  affiliateLink: string;
}

const AffiliateProductsPage = () => {
  const [products, setProducts] = useState<Array<ProductPropsType>>([]);

  const fetchProducts = async () => {
    try {
      console.log('called funciton');

      const response = await axios.get(`${PY_BACKEND_URL}/get-products`);

      const data = response.data;
      setProducts(data);

      console.log('Fetched products:', data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
      {products.map(product => (
        <div key={product.id} className=" bg-white p-4 rounded-lg shadow-md">
          <img src={product.image} alt={product.name} className="w-full h-48" />
          <h2 className="text-lg text-black font-bold my-2">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg text-black font-bold my-2">${product.price}</p>
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Buy Now
          </a>
        </div>
      ))}
    </div>
  );
};

export default AffiliateProductsPage;
