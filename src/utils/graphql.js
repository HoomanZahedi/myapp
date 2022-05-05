import gql from 'graphql-tag';

export const FETCH_POST_QUERY= gql`
{
  getPosts{
    _id
    body
    createdAt
    userName
    likeCount
    likes{
      userName
    }
    commentCount
    comments{
      id
      userName
      createdAt
      body
    }
  }
}
`