import React from "react";
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./ListBooks";
import { Route, Link, withRouter} from "react-router-dom";
import "./App.css";
import sortBy from "sort-by";

class BooksApp extends React.Component {
  state = {
    books: [],
    shelfs: [
      {name: 'currentlyReading', title: 'Currently Reading'},
      {name: 'wantToRead', title: 'Want To Read'},
      {name: 'read', title: 'Read'}
    ],
    searchBooks: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  changeShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(() =>
      BooksAPI.getAll().then(books => {
        this.setState({ books });
      })
    );
    this.setState({ searchBooks: [] })
    this.props.history.push('/')
  }

  handleSearch = e => {
    e.preventDefault();
    if (e.target.value.length > 0)
      BooksAPI.search(e.target.value).then(books => {
        if (books.length>0){
          this.setState({ searchBooks: books })
        }else{
          this.setState({ searchBooks: []})
        }
      })
  }

  render() {
    let allBooks = this.state.books
    allBooks.sort(sortBy("title"));
    let showingBooks

    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                {this.state.shelfs.map((s) => {
                  showingBooks = allBooks.filter((books) => (books.shelf === s.name))
                  return (
                  <div className="bookshelf" key={s.name}>
                    <h2 className="bookshelf-title">{s.title}</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                      <ListBooks
                        books={showingBooks}
                        onChangeShelf={(book, shelf) => this.changeShelf(book, shelf)}
                      />
                      </ol>
                    </div>
                  </div>
                )})}
              </div>
              <Link className="open-search" to="/search">
                <button>Add a book</button>
              </Link>
            </div>
          )}
        />
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  onChange={this.handleSearch}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                <ListBooks
                  books={this.state.searchBooks}
                  onChangeShelf={(book, shelf) => this.changeShelf(book, shelf)}
                />
              </ol>
            </div>
          </div>
        )}
        />
      </div>
    );
  }
}

export default withRouter(BooksApp);
