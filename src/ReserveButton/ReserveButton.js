import { Link } from 'react-router-dom';
import AccountService from '../Services/AccountService';
import BookService from '../Services/BookService';

export default function ReserveButton({ book, color, setError }) {
  const reserveBook = () => {
    const values = {
      barcode: AccountService.getBarcode(),
      number: AccountService.getCardNumber(),
      book: book.barcode
    };
    BookService.reserveBook(values)
      .then(async (res) => {
        window.location.reload();
      })
      .catch((error) => {
        window.alert(error.message.message);
      });
    return;
  };
  return (
    <Link to=''>
      <button className={color} onClick={reserveBook}>
        Reserve
      </button>{' '}
    </Link>
  );
}
