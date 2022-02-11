import { Link } from 'react-router-dom';
import AccountService from '../Services/AccountService';
import BookService from '../Services/BookService';

export default function BorrowButton({ book, color, setError }) {
  const borrowBook = () => {
    const values = {
      barcode: AccountService.getBarcode(),
      number: AccountService.getCardNumber(),
      book: book.barcode
    };
    BookService.borrowBook(values)
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        setError(error);
      });
  };
  return (
    <Link to=''>
      <button className={color} onClick={borrowBook}>
        Borrow
      </button>{' '}
    </Link>
  );
}
