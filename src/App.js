import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import BookmarksContext from './BookmarksContext';
import Nav from './Nav/Nav';
import EditBookmarkForm from './EditBookmarkForm/EditBookmarkForm';
import config from './config';
import './App.css';


class App extends Component {
  state = {
    bookmarks: [],
    error: null,
  };

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark],
    })
  }
  deleteBookmark = bookmarkId => {
    const newBookmarks = this.state.bookmarks.filter(bm =>
      bm.id !== bookmarkId
    )
    this.setState({
      bookmarks: newBookmarks
    })
  }

  // componentDidMount() {
  //   fetch(config.API_ENDPOINT, {
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //       'Authorization': `Bearer ${config.API_KEY}`
  //     }
  //   })
  //     .then(res => {
  //       if (!res.ok) {
  //         throw new Error(res.status)
  //       }
  //       return res.json()
  //     })
  //     .then(this.setBookmarks)
  //     .catch(error => this.setState({ error }))
  // }

  componentDidMount() {
    const bookmarkId = this.props.match.params.bookmarkId
    fetch(`https://localhost:8000/api/bookmarks/${bookmarkId}`, {
      method: 'GET'
    })
      // .then(/* some content omitted */)
      // .then(responseData => {
      //   this.setState({
      //     /* fields state updates here */
      //   })
      // })
      .then(responseData => {
        this.context.updateArticle(responseData)
      })
      .catch(error => {/* some content omitted */ })
  }

  // componentDidMount() {
  //   const bookmarkId = this.props.match.params.bookmarkId
  //   fetch(`https://localhost:8000/api/bookmarks/${bookmarkId}`, {
  //     method: 'GET'
  //   })
  //     // .then(/* some content omitted */)
  //     // .then(responseData => {
  //     //   this.setState({
  //     //     /* fields state updates here */
  //     //   })
  //     // })
  //     .then(responseData => {
  //       this.context.updateArticle(responseData)
  //     })      
  //     .catch(error => {/* some content omitted */ })
  // }

  updateBookmark = updatedBookmark => {
    const newBookmarks = this.state.bookmarks.map(bm =>
      (bm.id === updatedBookmark.id)
        ? updatedBookmark
        : bm
    )
    this.setState({
      bookmarks: newBookmarks
    })
  };

  render() {
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      deleteBookmark: this.deleteBookmark,
      updateBookmark: this.updateBookmark
    }
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <BookmarksContext.Provider value={contextValue}>
          <div className='content' aria-live='polite'>
            <Nav />
            <Route
              exact
              path='/'
              component={BookmarkList}
            />
            <Route
              path='/add-bookmark'
              component={AddBookmark}
            />
            <Route
              path='/edit-bookmark/:bookmark-id'
              component={EditBookmarkForm}
            />
          </div>
        </BookmarksContext.Provider>
      </main>
    );
  }
}

export default App;
