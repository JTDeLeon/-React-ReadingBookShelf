import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import CreateShelf from './CreateShelf'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SearchBooks extends Component {

  state = {
    books: [],
    query: ''
  }

  searchForBook = (query) => {
    BooksAPI.search(query).then(books => {
      this.setState({ books: books });
    }).catch((err)=>console.log('Book Not Found',err))
  }
  // searchForBook('React');

  updateQuery = (query)=>{
    this.setState({ query: query.trim() })
    console.log("Query in update query is ",this.state.query)

  }

  clearQuery = ()=>{
    this.setState({ query: '' });
  }

  //TODO: Breaks when a query search is not found && Breaks when query is deleted and a new query is made .. mixes this up
  render(){
    // let showingContacts;
    // if(this.state.query){
    //   const match = new RegExp(escapeRegExp(this.state.query),'i');
    //   showingContacts = this.state.books.filter((book)=>match.test(book.title));
    // }
    // else {
    //   showingContacts = this.state.books;
    // }
    //
    // showingContacts.sort(sortBy('title'));
    if(this.state.query){
      this.searchForBook(this.state.query);
    }
    console.log(this.state.books);

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input
                type="text" placeholder="Search by title or author"
                value={this.state.query}
                onChange={
                  (event)=>{
                    this.updateQuery(event.target.value)
                  }
                }
              />

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              <CreateShelf
                books={this.state.books}
                // onSearchForBook={this.searchForBook(this.state.query)}
              />
            </ol>
          </div>
        </div>
    )
  }
}

export default SearchBooks;
