import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo';
import { BOOKS_QUERY } from './BookList';

const AUTHORS_QUERY = gql`
  query AuthorsQuery {
    authors{
      id
      name
    }
  }
`

const ADDBOOK_MUTATION = gql`
  mutation AddBookMutation($name:String!,$genre:String!,$authorId:ID!){
    addBook(name:$name,genre:$genre,authorId:$authorId){
      name
      genre
    }
  }
`

class AddBook extends Component {
  state = {
    name: '',
    genre: '',
    authorId: ''
  }

  render() {
    return (
      <Query query={AUTHORS_QUERY}>
        {
          ({ data, loading, error }) => {
            if (loading) return <select disabled><option>Loading authors...</option></select>
            if (error) return console.log(error)
            const dataAuthors = data;
            return (
              <Mutation mutation={ADDBOOK_MUTATION}>
                {(addBook, { data }) => (
                  <Fragment>
                    <form id="add-book"
                      onSubmit={e => {
                        e.preventDefault();
                        addBook({
                          variables: {
                            name: this.state.name,
                            genre: this.state.genre,
                            authorId: this.state.authorId
                          },
                          refetchQueries: [{ query: BOOKS_QUERY }]
                        })

                        this.setState({
                          name: '',
                          genre: '',
                          authorId: ''
                        })
                      }}
                    >
                      <div className="field">
                        <label>Book name:</label>
                        <input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
                      </div>
                      <div className="field">
                        <label>Genre:</label>
                        <input type="text" onChange={(e) => this.setState({ genre: e.target.value })} />
                      </div>
                      <div className="field">
                        <label>Author:</label>
                        <select onChange={(e) => this.setState({ authorId: e.target.value })}>
                          <option>Select author</option>
                          {
                            dataAuthors.authors.map(author => {
                              return (
                                <option key={author.id} value={author.id}>{author.name}</option>
                              )
                            })
                          }
                        </select>
                      </div>
                      <button type="submit">+</button>
                    </form>
                  </Fragment>
                )}
              </Mutation>
            )
          }
        }
      </Query>
    )
  }
}

export default AddBook
