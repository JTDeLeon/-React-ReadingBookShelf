import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import CreateShelf from './CreateShelf'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SearchBooks extends Component {

  state = {
    books: [],
    query: ''
  }

  searchForBook = (query) => {
    BooksAPI.search(query).then(books => {
      this.setState({ books:[]});
      this.setState({ books: books });
    }).catch((err)=>{
      console.log('Book Not Found',err)
    })
  }
  // searchForBook('React');

  updateQuery = (query)=>{
    this.setState({ query: query})
    console.log("Query in update query is ",this.state.query)

  }

  clearQuery = ()=>{
    this.setState({ query: '' });
  }

  // componentWillMount () {
  //   this.clearQuery();
  // }

  //TODO: COMPLETE : Breaks when a query search is not found!!!!
  //TODO COMPLETE : Breaks when query is deleted and a new query is made .. mixes this up
  //TODO COMPLETE : continues to rerender and loop
  //TODO: Make space (2 word) searching available
  //TODO: Make it possible to view books even with a missing thumbnail
  render(){
    // let showingContacts;
    // if(this.state.query){
    //   const match = new RegExp(escapeRegExp(this.state.query),'i');
    //   showingContacts = this.state.books.filter((book)=>match.test(book.title));
    // }
    // else {
    //   showingContacts = this.state.books;
    // }
    //
    // console.log("SHOWING CONTACTS:");
    // console.log(showingContacts);

    //showingContacts.sort(sortBy('title'));

    // if(this.state.query || this.state.books.length > 0){
    //   this.searchForBook(this.state.query);
    // }

    // console.log(this.state.books);

    const availSearchTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
];

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input
                type="text" placeholder="Search by title or author"
                value={this.state.query}
                onChange={
                  (event)=>{
                    console.log("The On Change Event is ",event);
                    console.log("The On Change Event TARGET VALUE is ",event.target.value);
                    this.updateQuery(event.target.value)
                    if(event.target.value){
                      //Add a way to check if the words are listed in the array
                      let count = 0;
                      availSearchTerms.forEach((word)=>{
                        const len = event.target.value.length;
                        console.log("WORD IS ",word);
                        console.log("QUERY To MATCH IS  ",event.target.value);
                        console.log("LENGTH IS ",len);
                        console.log("SUBSTRING OF WORD IS ",word.substring(0,len))

                        if(word.toLowerCase().substring(0,len) === event.target.value.toLowerCase()){
                        // if(word.toLowerCase().includes(event.target.value.toLowerCase())){
                          console.log("=========");
                          this.searchForBook(event.target.value);
                          count++;
                        }
                        else{
                          console.log("WORD NOT MATCHED");
                        }
                      })
                      console.log("COUNT IS ",count);
                      // if(count>0){
                      //   this.searchForBook(event.target.value);
                      // }
                    }
                    else{
                      console.log(">>>> THE QUERY IS EMPTY");
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
                {console.log('Passing into CreateShelf',this.state.books)}
              <CreateShelf
                books={this.state.books}
                // onSearchForBook={this.searchForBook(this.state.query)}
              />
            </ol>
          </div>
        </div>
    )
  }
}

export default SearchBooks;
