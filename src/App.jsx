import { useEffect, useState } from 'react';
import ProductForm from './components/ProductForm.jsx';
import ProductList from './components/ProductList.jsx';
import {
  fetchProducts,
  createProduct,
  editProduct,
  removeProduct,
} from './graphql.js';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // When set, the form switches to "edit" mode for that product
  const [editingProduct, setEditingProduct] = useState(null);

  // VIEW - load all products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data.products);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ADD
  const handleAdd = async (input) => {
    try {
      const data = await createProduct(input);
      setProducts((prev) => [...prev, data.addProduct]);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  // EDIT - open the form pre-filled with the product
  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  // EDIT - save changes
  const handleUpdate = async (input) => {
    try {
      const data = await editProduct({ id: editingProduct.id, ...input });
      setProducts((prev) =>
        prev.map((p) => (p.id === data.updateProduct.id ? data.updateProduct : p))
      );
      setEditingProduct(null);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await removeProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = (input) => {
    if (editingProduct) {
      handleUpdate(input);
    } else {
      handleAdd(input);
    }
  };

  if (loading) return <p className="status">Loading products…</p>;

  return (
    <div className="container">
      <header>
        <h1>🛒 Product Manager (GraphQL)</h1>
        <p className="subtitle">
          Add / View / Edit / Delete products via a GraphQL API
        </p>
        <p>MY NAME IS JOHN DOE</p>
        <p>HEllo World!</p>
        <p>23 years old</p>
        <p>My name is John Doe</p>
      </header>

      {error && <div className="error">⚠ {error}</div>}

      <ProductForm
        key={editingProduct ? editingProduct.id : 'new'}
        initial={editingProduct}
        onSubmit={handleSubmit}
        onCancel={editingProduct ? () => setEditingProduct(null) : undefined}
      />

      <ProductList
        products={products}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />
    </div>
  );
}
