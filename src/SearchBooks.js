import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import CreateShelf from './CreateShelf'

class SearchBooks extends Component {

  state = {
    books: [],
    query: '',
  }

  //Updates the current books state
  updateShelf = (target,newShelf)=>{
    this.setState(this.props.bookShelf.map((book)=>{
      if(book.id === target.id){
        book.shelf = newShelf;
      }
      return true
    })
    )

    //Updates the books in the server
    BooksAPI.update(target,newShelf);
  }

  //Adds the shelf property to the current search queried list if the book queried is also on the current bookshelves
  testShelf = (searchedShelf) =>{
    for(let i = 0; i<searchedShelf.length; i++){
      for(let x = 0; x<this.props.bookShelf.length; x++){
        //Checks the bookshelf & the searched book IDs
        if(searchedShelf[i].id === this.props.bookShelf[x].id){
          //Set the searched book shelf property if a match is found
          searchedShelf[i].shelf = this.props.bookShelf[x].shelf;
        }
      }
    }
    //Return the updated Search Shelf
    return searchedShelf;
  }

  //Sets the shelf property within a searched query to "None" when the book is not on the current bookshelf
  setNone = (searchedShelf) => {
    for(let i = 0; i<searchedShelf.length; i++){
      if(searchedShelf[i].shelf === undefined){
        searchedShelf[i].shelf = "None";
      }
    }
    //Return the updated shelf
    return searchedShelf;
  }

  //Queries the server for the queried string
  searchForBook = (query) => {
    BooksAPI.search(query).then(books => {
      //Sets the books state with the new results
      this.setState({ books:[]});
      this.setState({ books: books });
    }).catch((err)=>{
      console.log('Book Not Found',err)
    })
  }

  //Sets the query STATE
  updateQuery = (query)=>{
    this.setState({ query: query})
  }


  render(){

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
                    //Add a way to check if the words are listed in the array

                    if(event.target.value){

                      this.searchForBook(event.target.value);

                    }
                    else{
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

              {/* These two lines will massage the data for the passed in queries where the shelves will be created */}
              {console.log(this.testShelf(this.state.books))}
              {console.log(this.setNone(this.state.books))}


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
