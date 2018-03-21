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
        <div key={book.name}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.bookCoverURL})` }}></div>
              <div className="book-shelf-changer">
                <select
                  onChange={(e)=>{
                    console.log("The state value is ",this.state.value);
                    this.setState({value:e.target.value},()=>{
                      console.log(book.name);
                      console.log("The state value is ",this.state.value);
                      this.props.onUpdateShelf(book.name,this.state.value);
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
