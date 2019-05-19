import React, { Component } from "react";
import PropTypes from "prop-types";
import Books from "./Books";

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  render() {
    const { books, onChangeShelf } = this.props;
    return (
      <>
        {books
          .map(b => (
            <Books book={b} onChangeShelf={onChangeShelf} key={b.id} />
          ))}
      </>
    );
  }
}

export default ListBooks;
