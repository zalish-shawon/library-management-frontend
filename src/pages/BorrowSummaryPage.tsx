import { useGetBorrowSummaryQuery } from '../features/borrow/borrowApi';

const BorrowSummaryPage = () => {
  const { data, isLoading } = useGetBorrowSummaryQuery();
  const summary = data?.data || [];

  if (isLoading) return <p>Loading summary...</p>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Borrow Summary</h2>
      <table className="min-w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Book Title</th>
            <th className="border px-4 py-2">ISBN</th>
            <th className="border px-4 py-2">Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((entry, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">{entry.book.title}</td>
              <td className="border px-4 py-2">{entry.book.isbn}</td>
              <td className="border px-4 py-2">{entry.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowSummaryPage;