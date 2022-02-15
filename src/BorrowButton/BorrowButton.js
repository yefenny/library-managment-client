import { Link, useNavigate } from 'react-router-dom';
import AccountService from '../Services/AccountService';
import BookService from '../Services/BookService';

export default function BorrowButton({
  book,
  color,
  setError,
  setAlert,
  state,
  path
}) {
  if (path) console.log(path);
  let navigate = useNavigate();
  const borrowBook = () => {
    const values = {
      barcode: AccountService.getBarcode(),
      number: AccountService.getCardNumber(),
      book: book.barcode
    };
    BookService.borrowBook(values)
      .then((res) => {
        if (path) {
          state.book.status = 'LOANED'
          navigate(`${path}`, {
            state: {
              book: state.book,
              isBorrowed: state.bookIsBorrowed(state.book),
              isReserved: state.bookIsReserved
            }
          });
        } else {
          window.location.reload();
        }
      })
      .catch((error) => {
        window.alert(error.message.message);
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
