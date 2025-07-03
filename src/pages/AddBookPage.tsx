import { useNavigate } from 'react-router-dom';
import { useAddBookMutation } from '../features/books/booksApi';
import { useState } from 'react';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Genre validation
    const genreValue = formData.genre.trim().toUpperCase();
    if (!allowedGenres.includes(genreValue)) {
      setGenreError('Invalid genre. Please select a valid genre.');
      return;
    }

    setGenreError(''); // Clear previous error

    try {
      await addBook({ ...formData, genre: genreValue }).unwrap();
      alert('Book added successfully!');
      navigate('/books');
    } catch (error: any) {
      console.error('Add book failed:', error?.data || error);
      alert(error?.data?.message || 'Failed to add book. Check console.');
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          onChange={handleChange}
          value={formData.title}
          required
          placeholder="Title"
          className="w-full p-2 border rounded"
        />
        <input
          name="author"
          onChange={handleChange}
          value={formData.author}
          required
          placeholder="Author"
          className="w-full p-2 border rounded"
        />

        {/* Genre Dropdown */}
        <select
          name="genre"
          onChange={handleChange}
          value={formData.genre}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Genre</option>
          {allowedGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        {genreError && <p className="text-red-600 text-sm">{genreError}</p>}

        <input
          name="isbn"
          onChange={handleChange}
          value={formData.isbn}
          required
          placeholder="ISBN"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          onChange={handleChange}
          value={formData.description}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="copies"
          onChange={handleChange}
          value={formData.copies}
          min={1}
          required
          placeholder="Copies"
          className="w-full p-2 border rounded"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />
          <span>Available</span>
        </label>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isLoading ? 'Submitting...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
