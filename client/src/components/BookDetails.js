import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo';

const BOOK_QUERY = gql`
  query BookQuery($id: ID){
    book(id:$id){
      id
      name
      genre
      author{
        id
        name
        age
        books{
          name
          id
        }
      }
    }
  }
`

class BookDetails extends Component {
  render() {
    return (
      <div id="book-details">
        <Query query={BOOK_QUERY} variables={{ id: this.props.bookId }}>
          {
            ({ loading, error, data }) => {
              if (loading) return <div>Loading....</div>
              if (error) return console.log(error)

              const { book } = data;
              if (!book) return <div>No books.....</div>
              if (book) return (
                <div>
                  <h2>{book.name}</h2>
                  <p>{book.genre}</p>
                  <p>{book.author.name}</p>
                  <p>All books by this author:</p>
                  <ul className="other-books">
                    {
                      book.author.books.map(item => {
                        return <li key={item.id}>{item.name}</li>
                      })
                    }
                  </ul>
                </div>
              )
            }
          }
        </Query>
      </div>
    );
  }
}

export default BookDetails
