import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import CreateShelf from './CreateShelf';
import * as BooksAPI from './BooksAPI';

class ListBooks extends Component {

  state = {
    bookShelf:[
    {
      shelf:'currentlyReading',
      bookCoverURL: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',
      name: 'To Kill a Mockingbird',
      author: 'Harper Lee'
    }
    ,
    {
      shelf:'currentlyReading',
      bookCoverURL: 'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api',
      name: "Ender's Game",
      author: 'Orson Scott Card'
    },
    {
      shelf:'wantToRead',
      bookCoverURL: 'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api',
      name: "1776",
      author: 'David McCullough'
    },
    {
      shelf:'wantToRead',
      bookCoverURL: 'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api',
      name: "Harry Potter and the Sorcerer's Stone",
      author: 'J.K. Rowling'
    },
    {
      shelf:'read',
      bookCoverURL: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api',
      name: "The Hobbit",
      author: 'J.R.R. Tolkien'
    },
    {
      shelf:'read',
      bookCoverURL: 'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api',
      name: "The Adventures of Tom Sawyer",
      author: 'Mark Twain'
    }
    ]
  }

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
