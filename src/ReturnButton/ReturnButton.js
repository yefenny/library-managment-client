import { Link } from 'react-router-dom';
import AccountService from '../Services/AccountService';
import BookService from '../Services/BookService';

export default function ReturnButton({ book, color }) {
  const returnBook = () => {
    const values = {
      barcode: AccountService.getBarcode(),
      number: AccountService.getCardNumber(),
      book: book.barcode
    };
    console.log(values);
    BookService.returnBook(values)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Link to=''>
      <button className={color} onClick={returnBook}>
        Return
      </button>{' '}
    </Link>
  );
}
