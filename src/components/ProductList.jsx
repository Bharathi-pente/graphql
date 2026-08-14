export default function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p className="status">No products yet — add your first one above!</p>;
  }

  return (
    <div className="card">
      <h2>Products ({products.length})</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="muted">{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td className="actions">
                <button onClick={() => onEdit(product)}>Edit</button>
                <button
                  className="danger"
                  onClick={() => onDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
