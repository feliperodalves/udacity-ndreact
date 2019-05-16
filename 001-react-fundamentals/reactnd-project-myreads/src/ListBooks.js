import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  render() {
    const { books, onChangeShelf} = this.props;

    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books
                      .filter(b => b.shelf === "currentlyReading")
                      .map(b => {
                        return (
                          <li key={b.id}>
                            <div className="book">
                              <div className="book-top">
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${
                                      b.imageLinks.thumbnail
                                    })`
                                  }}
                                />
                                <div className="book-shelf-changer">
                                  <select value={b.shelf} onChange={(v) => onChangeShelf(b, v.target.value)}>
                                    <option value="move" disabled>
                                      Move to...
                                    </option>
                                    <option value="currentlyReading">
                                      Currently Reading
                                    </option>
                                    <option value="wantToRead" >
                                      Want to Read
                                    </option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{b.title}</div>
                              <div className="book-authors">
                                {b.authors.join(", ")}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books
                      .filter(b => b.shelf === "wantToRead")
                      .map(b => {
                        return (
                          <li key={b.id}>
                            <div className="book">
                              <div className="book-top">
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${
                                      b.imageLinks.thumbnail
                                    })`
                                  }}
                                />
                                <div className="book-shelf-changer">
                                    <select value={b.shelf} onChange={(v) => onChangeShelf(b, v.target.value)}>
                                    <option value="move" disabled>
                                      Move to...
                                    </option>
                                    <option value="currentlyReading">
                                      Currently Reading
                                    </option>
                                    <option value="wantToRead">
                                      Want to Read
                                    </option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{b.title}</div>
                              <div className="book-authors">
                                {b.authors.join(", ")}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books
                      .filter(b => b.shelf === "read")
                      .map(b => {
                        return (
                          <li key={b.id}>
                            <div className="book">
                              <div className="book-top">
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${
                                      b.imageLinks.thumbnail
                                    })`
                                  }}
                                />
                                <div className="book-shelf-changer">
                                  <select value={b.shelf} onChange={(v) => onChangeShelf(b, v.target.value)}>
                                    <option value="move" disabled>
                                      Move to...
                                    </option>
                                    <option value="currentlyReading">
                                      Currently Reading
                                    </option>
                                    <option value="wantToRead">
                                      Want to Read
                                    </option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{b.title}</div>
                              <div className="book-authors">
                                {b.authors.join(", ")}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ol>
                </div>
              </div>

            </div>
          </div>
          <Link className="open-search" to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;
