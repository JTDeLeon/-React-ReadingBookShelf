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
    query: '',
  }

  updateShelf = (target,newShelf)=>{
    //Updates the books in the server
    BooksAPI.update(target,newShelf);
  }

  searchForBook = (query) => {
    BooksAPI.search(query).then(books => {

      this.setState({ books:[]});
      this.setState({ books: books });
    }).catch((err)=>{
      console.log('Book Not Found',err)
    })

  }

  updateQuery = (query)=>{
    this.setState({ query: query})
  }

  clearQuery = ()=>{
    this.setState({ query: '' });
  }


      //TODO the searched bookshelf dropdown should be showing the appropriate shelf the books on the current bookshelf are on
  render(){


    const availSearchTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
];

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search" to="/"
            onClick={(event)=>{
              this.props.onRefreshBookShelf();
            }}
          >Close</Link>
          <div className="search-books-input-wrapper">

              <input
                type="text" placeholder="Search by title or author"
                value={this.state.query}
                onChange={
                  (event)=>{
                    this.updateQuery(event.target.value)
                    if(event.target.value){
                      //Add a way to check if the words are listed in the array
                      let count = 0;
                      availSearchTerms.forEach((word)=>{
                        const len = event.target.value.length;

                        if(word.toLowerCase().substring(0,len) === event.target.value.toLowerCase()){
                          this.searchForBook(event.target.value);
                          count++;
                        }
                      })
                    }
                    else{
                      console.log(">>>> THE QUERY IS EMPTY");
                      //Clears the showing books on empty query
                      this.setState({books:[]});
                    }
                  }

                }
              />

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.books.length > 0 && (
                <CreateShelf
                  books={this.state.books}
                  setCategory='none'
                  onUpdateShelf={(target,newShelf)=>{
                    this.updateShelf(target,newShelf);
                  }}
                  bookShelf={this.props.bookShelf}
                />
                )
              }
            </ol>
          </div>
        </div>
    )
  }
}

export default SearchBooks;
