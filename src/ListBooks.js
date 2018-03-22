import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import CreateShelf from './CreateShelf';
import * as BooksAPI from './BooksAPI';

class ListBooks extends Component {



  updateShelf = (target,newShelf)=>{
    this.setState(this.props.bookShelf.map((book)=>{
        if(book.id === target.id){
          book.shelf = newShelf;
        }

      })
    )
    //Updates the books in the server
    BooksAPI.update(target,newShelf);
  }


  render(){
    return (
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

                  <CreateShelf
                    books={this.props.bookShelf}
                    categoryShelf='currentlyReading'
                    onUpdateShelf={(target,newShelf)=>{
                      this.updateShelf(target,newShelf);
                    }}
                  />

                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">

                  <CreateShelf
                    books={this.props.bookShelf}
                    categoryShelf='wantToRead'
                    onUpdateShelf={(target,newShelf)=>{
                      this.updateShelf(target,newShelf);
                    }}
                  />

                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  <CreateShelf
                    books={this.props.bookShelf}
                    categoryShelf='read'
                    onUpdateShelf={(target,newShelf)=>{
                      this.updateShelf(target,newShelf);
                    }}
                  />

                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks;
