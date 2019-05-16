import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import { Route, Link } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  changeShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(()=>(
      BooksAPI.getAll().then(books => {
        this.setState({ books });
      })
    ))
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <ListBooks
              books={this.state.books}
              onChangeShelf={(book, shelf) => {
                this.changeShelf(book, shelf)
              }}
            />
          )}/>
          <Route path="/search" render={() => (
            <div>
            <div className="search-books">
              <div className="search-books-bar">
                <button className="close-search">Close</button>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input type="text" placeholder="Search by title or author"/>

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid"></ol>
              </div>
            </div>
          </div>
          )}/>
      </div>
    )
  }
}

export default BooksApp
