import config from '../config';

const AccountService = {
  storeUser(user) {
    const { barcode, type, cardNumber } = user;
    localStorage.setItem(config.USER_BARCODE, barcode);
    localStorage.setItem(config.USER_TYPE, type);
    localStorage.setItem(config.USER_CARDNUMBER, cardNumber);
  },
  getBarcode() {
    const barcode = localStorage.getItem(config.USER_BARCODE);
    return barcode;
  },
  getUserType() {
    const userType = localStorage.getItem(config.USER_TYPE);
    return userType;
  },
  getCardNumber() {
    const cardNumber = localStorage.getItem(config.USER_ACTIVE);
    return cardNumber;
  },
  clearUser() {
    localStorage.removeItem(config.USER_BARCODE);
    localStorage.removeItem(config.USER_TYPE);
    localStorage.removeItem(config.USER_CARDNUMBER);
    sessionStorage.clear();
  }
};

export default AccountService;
