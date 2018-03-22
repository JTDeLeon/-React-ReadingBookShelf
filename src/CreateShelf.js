import React, { Component } from 'react';
import './App.css';

class CreateShelf extends Component {

  state = {
    value: ''
  }

  updateState = (state)=>{
    this.setState({ value: state });
  }

  render(){
    return (
      <li className="customBook">
      {this.props.books.filter((book)=>book.shelf === this.props.categoryShelf).map((book)=>(
        <div key={book.id}>
          <div className="book">
            <div className="book-top">
              {/* The following conditionals allow to check if thumbnail image is or is not available */}
              {book.imageLinks && (
                <div
                  className="book-cover"
                  style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.thumbnail})`}}
                >
                </div>
              )}
              {!book.imageLinks && (
                <div
                  className="book-cover"
                  style={{ width: 128, height: 193, backgroundImage:`url()`}}
                >
                </div>
              )}


              <div className="book-shelf-changer">
                <select
                  onChange={(e)=>{
                    console.log("The state value is ",this.state.value);
                    this.setState({value:e.target.value},()=>{
                      console.log(book.title);
                      console.log("The state value is ",this.state.value);
                      this.props.onUpdateShelf(book,this.state.value);
                    });
                  }
                  }
                  value={book.shelf}
                >
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
          </div>
        </div>
      ))}
    </li>
    )
  }
}

export default CreateShelf;
