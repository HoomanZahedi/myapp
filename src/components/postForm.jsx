import React from "react";
import { Form } from "semantic-ui-react";
import { useForm } from "../utils/costumHook";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {FETCH_POST_QUERY} from '../utils/graphql'

function PostForm() {
  const value = { body: "" };
  
  const { handleChangeInput, submitForm, values } = useForm(
    createPostCallback,
    value
  );
  function createPostCallback() {
    createPost();
  }

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    update(_, result) {
      const data = _.readQuery({
        query:FETCH_POST_QUERY
      });
      data.getPosts = [result.data.createPost,...data.getPosts]
      _.writeQuery({query:FETCH_POST_QUERY,data})
      values.body = "";
    },
    onError(e){
      console.log(e);
    }
  });
  return (
    <div>
      <Form onSubmit={submitForm}>
        <h2>create post: </h2>
        <Form.Field>
          <Form.Input
            placeholder="Create Post..."
            name="body"
            value={values.body}
            onChange={handleChangeInput}
            error={error?true:false}
          ></Form.Input>
          <Form.Button type="submit" color="teal">
            submit post
          </Form.Button>
        </Form.Field>
      </Form>
      {error && <div className="ui message error">
          <ul className="list">
            <li >{error.graphQLErrors[0].message}</li>
          </ul>
        </div>}
    </div>
  );
}

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      _id
      body
      userName
      createdAt
      comments {
        id
        body
        createdAt
        userName
      }
      likes {
        id
        userName
        createdAt
      }
      likeCount
      commentCount
    }
  }
`;

export default PostForm;
