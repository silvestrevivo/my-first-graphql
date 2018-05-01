import React, { Component } from 'react';
import { gql } from 'apollo-boost'
import { graphql, compose } from 'react-apollo'

const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`

const getAuthorsQuery = gql`
  {
    authors{
      name
      id
    }
  }
`

const AddBookMutation = gql`
  mutation($name:String!,$genre:String!,$authorId:ID!){
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

  displayAuthors = () => {
    const data = this.props.getAuthorsQuery
    console.log(this.props)
    if (data.loading) {
      return <option disabled>Loading Authors....</option>
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.name}>{author.name}</option>
        )
      })
    }
  }

  submitForm = (e) => {
    e.preventDefault()
    //console.log(this.state)
    this.props.AddBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm}>
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
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(AddBookMutation, { name: "AddBookMutation" })
)(AddBook);
