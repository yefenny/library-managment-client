import { Component } from 'react';
import AccountService from '../Services/AccountService';
import LibraryService from '../Services/LibraryService';

export default class LibraryForm extends Component {
  state = {
    barcode: '',
    number: '',
    libraryName: '',
    streetAddress: '',
    city: '',
    zipcode: '',
    country: '',
    error: ''
  };
  componentDidMount() {
    if (
      !AccountService.getCardNumber() ||
      !AccountService.getBarcode() ||
      AccountService.getUserType() !== 'LIBRARIAN'
    ) {
      window.location = 'login';
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: '' });
    const { libraryName, streetAddress, city, zipcode, country } = this.state;
    const required = {
      libraryName,
      streetAddress,
      city,
      zipcode,
      country
    };
    for (const [key, value] of Object.entries(required)) {
      if (value.trim().length < 1) {
        this.setState({ error: `${key} is required` });
        return;
      }
    }
    const library = required;
    library.barcode = AccountService.getBarcode();
    library.number = AccountService.getCardNumber();
    console.log(library);

    LibraryService.createLibrary(library)
      .then((res) => {
        window.location = '/libraries'
      })
      .catch((error) => {
        this.setState({ error: error.message.message });
      });
  };
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    const { libraryName, streetAddress, city, zipcode, country, error } =
      this.state;
    return (
      <div className='form-background'>
        <div className='add-form'>
          <h2>New Library</h2>
          <form
            onSubmit={(e) => {
              this.handleSubmit(e);
            }}
          >
            <div className='error'>{error}</div>
            <label htmlFor='libraryName'>Name:</label>
            <input
              type='text'
              id='libraryName'
              name='libraryName'
              value={libraryName}
              onChange={(e) => {
                this.handleInputChange(e);
              }}
            />
            <label htmlFor='streetAddress'>Street Address:</label>
            <input
              type='text'
              id='streetAddress'
              name='streetAddress'
              value={streetAddress}
              onChange={(e) => {
                this.handleInputChange(e);
              }}
            />
            <label htmlFor='city'>City:</label>
            <input
              type='text'
              id='city'
              name='city'
              value={city}
              onChange={(e) => {
                this.handleInputChange(e);
              }}
            />
            <label htmlFor='zipcode'>Zipcode:</label>
            <input
              type='text'
              id='zipcode'
              name='zipcode'
              value={zipcode}
              onChange={(e) => {
                this.handleInputChange(e);
              }}
            />
            <label htmlFor='country'>Country:</label>
            <input
              type='text'
              id='country'
              name='country'
              value={country}
              onChange={(e) => {
                this.handleInputChange(e);
              }}
            />

            <button type='submit'>Save</button>
          </form>
        </div>
      </div>
    );
  }
}
