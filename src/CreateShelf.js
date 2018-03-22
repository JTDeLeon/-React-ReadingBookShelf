import React, { Component } from 'react';
import './App.css';

class CreateShelf extends Component {

  state = {
    value: 'none',
    currentBookShelf:[]
  }

  updateState = (state)=>{
    this.setState({ value: state });
  }

  checkShelf(book){

    this.props.bookShelf.forEach((shelfBook)=>{
      console.log("Comparing against shelfBook ",shelfBook)
      if(shelfBook.id === book.id){
        console.log("Hello I'm in the shelf book if statement")
        book.shelf = shelfBook.shelf;
      }

    })


  }

  componentWillMount(){

  }

  render(){

    console.log("BOOKSHELF ADDED TO COMPONENT IS  ",this.props.bookShelf)



    return (

      <li className="customBook">
    {this.props.categoryShelf &&
      this.props.books.filter((book)=>book.shelf === this.props.categoryShelf).map((book)=>(
        <div key={book.id}>
          {console.log("BOOK.SHELF is ",book.shelf)}
          {console.log("BOOK INITIALLY in ",book)}
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
      ))
    }


    {!this.props.categoryShelf &&
      this.props.books.map((book)=>(

        <div key={book.id}>
          {console.log("BOOK INITIALLY in ",book)}
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

              {/* {console.log("BOOK Before Passed in ",book)} */}
              {/* {book = this.checkShelf(book)} */}
              {book.shelf = 'None'}
              {console.log("BOOK AFTER is ",book)}


              {console.log("BOOK.SHELF AFTER is ",book.shelf)}
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
                    <option value="None">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
          </div>
        </div>
      ))
    }



    </li>
    )
  }
}

export default CreateShelf;
