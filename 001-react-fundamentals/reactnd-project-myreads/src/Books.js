import React, { Component } from "react";

class Books extends Component {
  render() {
    const { book, onChangeShelf } = this.props;
    console.log(book)
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={book.shelf || 'none'}
                onChange={v => onChangeShelf(book, v.target.value)}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors && book.authors.join(", ")}</div>
        </div>
      </li>
    );
  }
}

export default Books;
