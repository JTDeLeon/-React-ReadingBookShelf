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

  refreshBookShelf = ()=>{
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    })
  }

  render() {

    return (
      <div className="app">
        <Route path="/search" render={()=>(
          <SearchBooks
            onRefreshBookShelf={this.refreshBookShelf}
            bookShelf={this.state.books}
          />
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
