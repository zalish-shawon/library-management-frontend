import { Routes, Route, Navigate } from 'react-router-dom';
import BookListPage from '../pages/BookListPage';
import AddBookPage from '../pages/AddBookPage';
import BookDetailPage from '../pages/BookDetailPage';
import EditBookPage from '../pages/EditBookPage';
import BorrowBookPage from '../pages/BorrowBookPage';
import BorrowSummaryPage from '../pages/BorrowSummaryPage';


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/books" />} />
    <Route path="/books" element={<BookListPage />} />
    <Route path="/create-book" element={<AddBookPage />} />
    <Route path="/books/:id" element={<BookDetailPage />} />
    <Route path="/edit-book/:id" element={<EditBookPage />} />
    <Route path="/borrow/:bookId" element={<BorrowBookPage />} />
    <Route path="/borrow-summary" element={<BorrowSummaryPage />} />
  </Routes>
);

export default AppRoutes;
