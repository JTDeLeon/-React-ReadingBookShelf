import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
  BooksAPI.getAll().then(books => {
    this.setState({ books: books });
  })
}

  render() {
    BooksAPI.search('R').then((response)=>console.log(response))
    
    return (
      <div className="app">
        <Route path="/search" render={()=>(
          <SearchBooks />
        )}/>

        <Route exact path="/" render={()=>(
          <ListBooks
            bookShelf={this.state.books}
          />
        )}/>
      </div>
    )
  }

}


export default BooksApp
