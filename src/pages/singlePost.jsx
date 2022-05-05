import React,{useContext, useState, useRef} from 'react';
import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {AuthContext} from '../context/auth';
import { Grid,Button, Card, Form, Image, Icon, Label } from 'semantic-ui-react';
import DeletePost from '../components/deletePost';
import moment from 'moment';
import {useParams} from 'react-router-dom';
import { useNavigate } from "react-router-dom";


function SinglePost() {
    const {postId} = useParams();
    const ref = useRef(null);
    const [comment, setComment] = useState('');
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [submitComment]=useMutation(POST_COMMENT,{
        update(){
            setComment('');
            ref.current.blur();
        },
        variables:{
            postId:postId,
            body:comment
        }
    })
    const {loading,data}=useQuery(FETCH_POST_QUERY,{
        variables:{
            postId
        }
    });
    let postMarkup;
    function redirection() {
        navigate('/');
    }
    
    if(!data){
        postMarkup = <p>loading posts...</p>
    }else{
        const {_id, body, userName, createdAt, likeCount,commentCount,comments}=data.getPost;
        postMarkup =(
            <Grid>
                <Grid.Column width={2}>
                    <Image
                        src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                        size='small'
                        float='right'
                    />
                </Grid.Column>
                <Grid.Column width={10}>
                <Card.Group >
                    <Card fluid>
                        <Card.Content>
                        <Card.Header>{userName}</Card.Header>
                        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                        <Card.Description>
                        {body}
                        </Card.Description>
                        </Card.Content>
                        <hr/>
                        <Card.Content extra>
                        
                        {
                            context.user.userName===userName?(

                                <Button as='div' labelPosition='right' >
                                    <Button color='teal' >
                                    <Icon name='heart'/>
                                </Button>
                                <Label as='a' basic color='teal' pointing='left'>
                                {likeCount}
                                </Label>
                                </Button>
                                ):(
                                    <Button as='div' labelPosition='right' >
                                    <Button color='teal' basic>
                                        <Icon name='heart'/>
                                    </Button>
                                    <Label as='a' basic color='teal' pointing='left'>
                                        {likeCount}
                                    </Label>
                                    </Button>
                                )
                            
                        }
                        
                        
                        <Button as='div' labelPosition='right'>
                            <Button color='blue'>
                                <Icon name='comment'/>
                            </Button>
                            <Label as='a' basic color='blue' pointing='left'>
                                {commentCount}
                            </Label>
                            </Button>
                            {
                            context.user?.userName === userName?
                                <DeletePost postId={_id} callback={redirection}/>:
                            null
                            }
                        </Card.Content>
                        </Card>
                    </Card.Group>
                    {context.user && 
                        <Card fluid>
                            <Card.Content>
                                <p>post a comment</p>
                                <Form onSubmit={submitComment}>
                                    <div className='ui action fluid input'>
                                        <input
                                            placeholder='Comment...'
                                            type='text'
                                            name='comment'
                                            value={comment}
                                            onChange={(e)=>setComment(e.target.value)}
                                            ref={ref}
                                        />
                                        <button 
                                            type='submit'
                                            className='ui button teal'
                                            disabled={comment.trim()===''}
                                        >post comment</button>
                                    </div>
                                </Form>
                            </Card.Content>
                        </Card>
                    }
                    <Grid.Row>
                        {comments.map(comment=>
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {context.user.userName === comment.userName &&
                                    <DeletePost postId={_id} commentId={comment.id}/>}
                                    <Card.Header>{comment.userName}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        )}
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        )
    }
  return postMarkup 
  
}

const FETCH_POST_QUERY = gql`
    query getPost($postId:ID!){
        getPost(postId:$postId){
            _id
            body
            userName
            createdAt
            likeCount
            commentCount
            comments{
                id body userName createdAt
            }
        }
    }
`

const POST_COMMENT=gql`
    mutation createComment($postId:ID!,$body:String!){
        createComment(postId:$postId,body:$body){
            _id
            body
            userName
            createdAt
            likeCount
            commentCount
            comments{
                id body userName createdAt
            }
        }
    }
`

export default SinglePost