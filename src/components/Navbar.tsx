import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4 shadow">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-xl font-bold">Library System</h1>
      <div className="space-x-4">
        <Link to="/books" className="hover:underline">All Books</Link>
        <Link to="/create-book" className="hover:underline">Add Book</Link>
        <Link to="/borrow-summary" className="hover:underline">Borrow Summary</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;