import React,{useContext,useEffect,useState} from 'react'
import {useQuery} from '@apollo/react-hooks';
import { Grid,Button, Card, Image,Icon,Label } from 'semantic-ui-react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/auth';
import PostForm from '../components/postForm';
import {FETCH_POST_QUERY} from '../utils/graphql';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import DeletePost from '../components/deletePost';


function Home() {
  const context = useContext(AuthContext);
  const [LikedPost, setLikedPost] = useState('44');
  const handleClickLike =(postId)=>{
    setLikedPost(postId);
    setTimeout(() => {
      
      likePost();
    }, 0);
  }
    
    const [likePost ,{error}]=useMutation(LIKE_POST_MUTATION,{
      variables:{postId:LikedPost}
    })
  
  const {loading,data} = useQuery(FETCH_POST_QUERY);
  
  const commentPost=()=>{
    console.log('comment post');
  }

  
  
  return (
    <Grid columns={3} >
      <Grid.Row>
        <h1 style={{marginLeft:'10px'}}>Recent Posts</h1>
      </Grid.Row>
      {context.user && 
      <Grid.Column>
        <PostForm/>
        </Grid.Column>}
    <Grid.Row>
      {loading? <h1>loading posts...</h1>:
      data?.getPosts.map((post,index)=>
        <Grid.Column key={post._id} style={{marginBottom:'10px'}}>
          <Card.Group >
            <Card fluid>
              <Card.Content>
              <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
              />
              <Card.Header>{post.userName}</Card.Header>
              <Card.Meta as={Link} to={`/posts/${post._id}`}>{moment(post.createdAt).fromNow()}</Card.Meta>
              <Card.Description>
               {post.body}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
            
              {
                context.user?(
                  context.user.userName===post.userName?(

                    <Button as='div' labelPosition='right'  onClick={()=>handleClickLike(post._id)}>
                        <Button color='teal' >
                          <Icon name='heart'/>
                      </Button>
                      <Label as='a' basic color='teal' pointing='left'>
                      {post.likeCount}
                      </Label>
                    </Button>
                      ):(
                        <Button as='div' labelPosition='right'  onClick={likePost}>
                          <Button color='teal' basic>
                              <Icon name='heart'/>
                          </Button>
                          <Label as='a' basic color='teal' pointing='left'>
                            {post.likeCount}
                          </Label>
                        </Button>
                      )
                  ):(
                    <Button as='div' labelPosition='right'  onClick={likePost}>
                      <Button as={Link} to='/login' color='teal'>
                              <Icon name='heart'/>
                      </Button>
                      <Label as='a' basic color='teal' pointing='left'>
                        {post.likeCount}
                      </Label>
                    </Button>
                  )
              }
              
           
            <Button as='div' labelPosition='right' onClick={commentPost}>
              <Button color='blue'>
                <Icon name='comment'/>
              </Button>
              <Label as='a' basic color='blue' pointing='left'>
                {post.commentCount}
              </Label>
            </Button>
            {
              context.user?.userName === post.userName?
              <DeletePost postId={post._id}/>:
              null
            }
            </Card.Content>
            </Card>
          </Card.Group>
        </Grid.Column>
      )
      }
    </Grid.Row>
  </Grid>
  )
}
const LIKE_POST_MUTATION=gql`
    mutation likePost($postId:ID!){
        likePost(postId: $postId){
        likes{
            id
            userName
        }
        likeCount
        }
    }
`
export default Home