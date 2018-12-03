import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo';
import BookDetails from './BookDetails'

export const BOOKS_QUERY = gql`
  query BooksQuery {
    books{
      id
      name
    }
  }
`

class BookList extends Component {
  state = {
    selected: null
  }

  displayBooks = (data) => {
    return data.books.map(book => {
      return (
        <li key={book.id} onClick={(e) => { this.setState({ selected: book.id }) }}>{book.name}</li>
      )
    })
  }

  render() {
    return (
      <Query query={BOOKS_QUERY}>
        {
          ({ loading, error, data }) => {
            if (loading) return <div>Loading books.....!</div>
            if (error) return console.log(error)
            return (
              <Fragment>
                <ul id="book-list">
                  {this.displayBooks(data)}
                </ul>
                <BookDetails bookId={this.state.selected} />
              </Fragment>
            )
          }
        }
      </Query>
    );
  }
}

export default BookList;
