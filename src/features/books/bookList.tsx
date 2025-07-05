import { useNavigate } from 'react-router-dom';
import { useGetBooksQuery, useDeleteBookMutation } from './booksApi';

const BookList = () => {
  const { data, isLoading } = useGetBooksQuery();
const books = data || [];
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      await deleteBook(id);
    }
  };

  if (isLoading) return <p>Loading books...</p>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Book List</h2>
      <table className="min-w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
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
          {books?.map((book) => (
            <tr key={book._id} className="text-center">
              <td className="border px-4 py-2">{book.title}</td>
              <td className="border px-4 py-2">{book.author}</td>
              <td className="border px-4 py-2">{book.genre}</td>
              <td className="border px-4 py-2">{book.isbn}</td>
              <td className="border px-4 py-2">{book.copies}</td>
              <td className="border px-4 py-2">{book.available ? 'Yes' : 'No'}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => navigate(`/edit-book/${book._id}`)}
                  className="text-blue-500 hover:underline"
                >Edit</button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="text-red-500 hover:underline"
                >Delete</button>
                <button
                  onClick={() => navigate(`/borrow/${book._id}`)}
                  className="text-green-500 hover:underline"
                >Borrow</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;