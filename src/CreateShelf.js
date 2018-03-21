import React, { Component } from 'react';
import './App.css';

class CreateShelf extends Component {

  render(){
    return (
      <li className="customBook">
      {this.props.books.filter((book)=>book.shelf === this.props.categoryShelf).map((book)=>(
        <div key={book.name}>
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
        </div>
      ))}
    </li>
    )
  }
}

export default CreateShelf;
