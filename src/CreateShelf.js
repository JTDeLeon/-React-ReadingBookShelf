import React, { Component } from 'react';
import './App.css';

class CreateShelf extends Component {
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
    }
    ]
  }


  render(){
    return (
      <li className="customBook">
      {this.state.bookShelf.filter((book)=>book.shelf === this.props.categoryShelf).map((book)=>(
        <li key={book.name}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.bookCoverURL})` }}></div>
              <div className="book-shelf-changer">
                <select>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.name}</div>
            <div className="book-authors">{book.author}</div>
          </div>
        </li>
      ))}
    </li>
    )
  }
}

export default CreateShelf;
