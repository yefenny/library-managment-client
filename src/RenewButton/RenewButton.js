import { Link } from 'react-router-dom';
import AccountService from '../Services/AccountService';
import BookService from '../Services/BookService';

export default function RenewButton({ book, color, setError }) {
  const renewButton = () => {
    const values = {
      barcode: AccountService.getBarcode(),
      number: AccountService.getCardNumber(),
      book: book.barcode
    };
    console.log(values);
    BookService.renewBook(values)
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
      setError(error);
      });
  };
  return (
    <Link to=''>
      <button className={color} onClick={renewButton}>
        Renew
      </button>{' '}
    </Link>
  );
}
