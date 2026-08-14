import { useState } from 'react';

/**
 * Form used for both ADD (no `initial`) and EDIT (with `initial`) modes.
 */
export default function ProductForm({ initial = null, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name ?? '');
  const [price, setPrice] = useState(initial?.price ?? '');
  const [quantity, setQuantity] = useState(initial?.quantity ?? '');
  const [formError, setFormError] = useState('');

  const isEditing = initial !== null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedPrice = Number(price);
    const parsedQuantity = Number(quantity);

    if (!name.trim()) {
      setFormError('Name is required.');
      return;
    }
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      setFormError('Price must be a valid number ≥ 0.');
      return;
    }
    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 0) {
      setFormError('Quantity must be a whole number ≥ 0.');
      return;
    }

    setFormError('');
    onSubmit({
      name: name.trim(),
      price: parsedPrice,
      quantity: parsedQuantity,
    });

    // Only reset fields in ADD mode; edit mode closes the form in App
    if (!isEditing) {
      setName('');
      setPrice('');
      setQuantity('');
    }
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{isEditing ? `Edit: ${initial.name}` : 'Add a Product'}</h2>

      {formError && <div className="error">⚠ {formError}</div>}

      <div className="fields">
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Keyboard"
          />
        </label>

        <label>
          Price ($)
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
          />
        </label>

        <label>
          Quantity
          <input
            type="number"
            step="1"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="0"
          />
        </label>
      </div>

      <div className="actions">
        <button type="submit" className="primary">
          {isEditing ? 'Save Changes' : 'Add Product'}
        </button>
        {isEditing && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
