const products = [
  {
    id: 1,
    name: 'Product 1',
    image: 'https://picsum.photos/200/300',
    description: 'This is a test product',
    price: 10.99,
    affiliateLink: 'https://example.com/product1',
  },
  {
    id: 2,
    name: 'Product 2',
    image: 'https://picsum.photos/200/301',
    description: 'This is another test product',
    price: 19.99,
    affiliateLink: 'https://example.com/product2',
  },
  {
    id: 3,
    name: 'Product 3',
    image: 'https://picsum.photos/200/302',
    description: 'This is a third test product',
    price: 29.99,
    affiliateLink: 'https://example.com/product3',
  },
];

const AffiliateProductsPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(product => (
        <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
          <img src={product.image} alt={product.name} className="w-full h-48" />
          <h2 className="text-lg font-bold my-2">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-bold my-2">${product.price}</p>
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
