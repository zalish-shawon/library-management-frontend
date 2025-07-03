import { useParams } from 'react-router-dom';
import { useGetBookQuery } from '../features/books/booksApi';

const BookDetailPage = () => {
  const { id } = useParams();
  const { data: book, isLoading } = useGetBookQuery(id!);

  if (isLoading) return <p>Loading book details...</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Copies:</strong> {book.copies}</p>
      <p><strong>Available:</strong> {book.available ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default BookDetailPage;
