import { useNavigate } from 'react-router-dom';
import { useAddBookMutation } from '../features/books/booksApi';
import { useState } from 'react';
import toast from 'react-hot-toast';

const allowedGenres = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];

const AddBookPage = () => {
  const [addBook, { isLoading }] = useAddBookMutation();
  const navigate = useNavigate();
  const [genreError, setGenreError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 1,
    available: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const genreValue = formData.genre.trim().toUpperCase();
    if (!allowedGenres.includes(genreValue)) {
      setGenreError('Invalid genre. Please select a valid genre.');
      return;
    }

    setGenreError('');

    try {
      await addBook({ ...formData, genre: genreValue }).unwrap();
      toast.success('✅ Book added successfully!');
      navigate('/books');
    } catch (error: any) {
      console.error('Add book failed:', error?.data || error);
      toast.error(error?.data?.message || '❌ Failed to add book.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-black-700">Add New Book</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            name="title"
            onChange={handleChange}
            value={formData.title}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Book title"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Author</label>
          <input
            name="author"
            onChange={handleChange}
            value={formData.author}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Author name"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Genre</label>
          <select
            name="genre"
            onChange={handleChange}
            value={formData.genre}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Genre</option>
            {allowedGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          {genreError && <p className="text-red-600 text-sm mt-1">{genreError}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">ISBN</label>
          <input
            name="isbn"
            onChange={handleChange}
            value={formData.isbn}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ISBN code"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            value={formData.description}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Short description (optional)"
            rows={3}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Copies</label>
          <input
            type="number"
            name="copies"
            onChange={handleChange}
            value={formData.copies}
            min={1}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Total number of copies"
          />
        </div>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">Available</span>
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition disabled:opacity-50"
        >
          {isLoading ? 'Submitting...' : '📚 Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
