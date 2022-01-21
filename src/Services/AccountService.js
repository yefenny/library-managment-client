import config from '../config';

const AccountService = {
  storeUser(user) {
    const { barcode, type, cardNumber } = user;
    localStorage.setItem('USER_BARCODE', barcode);
    localStorage.setItem('USER_TYPE', type);
    localStorage.setItem('USER_CARDNUMBER', cardNumber);
  },
  getBarcode() {
    const barcode = localStorage.getItem('USER_BARCODE');
    return barcode;
  },
  getUserType() {
    const userType = localStorage.getItem('USER_TYPE');
    return userType;
  },
  getCardNumber() {
    const cardNumber = localStorage.getItem('USER_CARDNUMBER');
    return cardNumber;
  },
  clearUser() {
    localStorage.removeItem('USER_BARCODE');
    localStorage.removeItem('USER_TYPE');
    localStorage.removeItem('USER_CARDNUMBER');
    localStorage.clear();
  }
};

export default AccountService;
