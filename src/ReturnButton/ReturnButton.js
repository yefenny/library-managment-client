import { Link } from 'react-router-dom';
import AccountService from '../Services/AccountService';
import BookService from '../Services/BookService';

export default function ReturnButton({
  book,
  color,
  setAlertModalOpen,
  setAlertText
}) {
  const returnBook = () => {
    const values = {
      barcode: AccountService.getBarcode(),
      number: AccountService.getCardNumber(),
      book: book.barcode
    };
    BookService.returnBook(values)
      .then(async (res) => {
        window.alert(res.message);
        window.location.reload();
      })
      .catch((error) => {
        window.alert(error.message.message);
      });
    return;
  };
  return (
    <Link to=''>
      <button className={color} onClick={returnBook}>
        Return
      </button>{' '}
    </Link>
  );
}
