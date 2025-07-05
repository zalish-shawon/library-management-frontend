import { useParams, useNavigate } from 'react-router-dom';
import { useBorrowBookMutation } from '../features/borrow/borrowApi';
import { useState } from 'react';

const BorrowBookPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const [formData, setFormData] = useState({
    quantity: 1,
    dueDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId) {
      alert('Missing book ID');
      return;
    }

    if (!formData.dueDate) {
      alert('Please select a due date.');
      return;
    }

    try {
      console.log({ bookId, ...formData });
      // @ts-ignore 
      await borrowBook({ book: bookId, ...formData }).unwrap();
      alert('Book borrowed successfully!');
      navigate('/borrow-summary');
    } catch (error) {
      console.error('Failed to borrow book:', error);
      alert('Failed to borrow the book. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Borrow Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min={1}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isLoading ? 'Submitting...' : 'Borrow'}
        </button>
      </form>
    </div>
  );
};

export default BorrowBookPage;
