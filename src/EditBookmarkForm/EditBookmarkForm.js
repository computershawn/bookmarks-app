import React, { Component } from 'react';
import config from '../config';

export default class EditBookmarkForm extends Component {
  /* state for inputs etc... */
  state = {
    id: '',
    title: '',
    url: '',
    description: '',
    rating: 2
  }

  componentDidMount() {
    const bookmarkId = this.props.match.params.bookmarkId
    fetch(`https://localhost:8000/api/bookmarks/${bookmarkId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(responseData => {
        this.setState({
          id: responseData.id,
          title: responseData.title,
          url: responseData.url,
          description: responseData.description,
          rating: responseData.rating
        })
      })
      .catch(error => {console.error(error)})
  }

  handleEditTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { id, url, title, description, rating } = this.state;
    const editedBookmark = { id, url, title, description, rating };
    
    fetch(`https://localhost:8000/api/bookmarks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(editedBookmark),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(() => {
      this.resetBookmark(editedBookmark)
    })
    .catch(error => {console.error(error)})
  }

  resetBookmark(newEntry) {
    this.setState({
      id: newEntry.id,
      url: newEntry.url,
      title: newEntry.title,
      description: newEntry.description,
      rating: newEntry.rating
    })
  }

      // .then(responseData => {
      //   this.context.updateArticle(responseData)
      // })


  render() {
    return (
      <section className='EditBookmarkForm'>
        <h2>Edit bookmark</h2>
        <form>
          {/* inputs etc... */}
        </form>
      </section>
    )
  }
}