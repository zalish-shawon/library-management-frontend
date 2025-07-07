import { useNavigate } from 'react-router-dom';
import { useGetBooksQuery, useDeleteBookMutation } from '../features/books/booksApi';
import { useState } from 'react';
import toast from 'react-hot-toast';

const BookListPage = () => {
  const { data, isLoading } = useGetBooksQuery();
  const books = data || [];
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!confirmDeleteId) return;

    try {
      await deleteBook(confirmDeleteId).unwrap();
      toast.success('Book deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete book.');
    } finally {
      setConfirmDeleteId(null); // Close modal
    }
  };

  if (isLoading) return <p>Loading books...</p>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">📚 Book List</h2>
      <table className="min-w-full table-auto border rounded-md shadow-sm bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Author</th>
            <th className="border px-4 py-2">Genre</th>
            <th className="border px-4 py-2">ISBN</th>
            <th className="border px-4 py-2">Copies</th>
            <th className="border px-4 py-2">Available</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="text-center border-b hover:bg-gray-50 transition">
              <td className="border px-4 py-2">{book.title}</td>
              <td className="border px-4 py-2">{book.author}</td>
              <td className="border px-4 py-2">{book.genre}</td>
              <td className="border px-4 py-2">{book.isbn}</td>
              <td className="border px-4 py-2">{book.copies}</td>
              <td className="border px-4 py-2">
                {book.available ? (
                  <span className="text-green-600 font-semibold">Yes</span>
                ) : (
                  <span className="text-red-600 font-semibold">No</span>
                )}
              </td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => navigate(`/edit-book/${book._id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => setConfirmDeleteId(book._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  🗑 Delete
                </button>
                <button
                onClick={() => navigate(`/borrow/${book._id}`)}
                disabled={!book.available}
                className={`px-3 py-1 rounded text-sm transition ${
                  book.available
                    ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                >
                📥 Borrow
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {confirmDeleteId && (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-md w-80 text-center">
      <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
      <p className="mb-6 text-sm text-gray-600">This action cannot be undone.</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setConfirmDeleteId(null)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default BookListPage;
