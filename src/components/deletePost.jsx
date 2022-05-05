import React, {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import { Button,Confirm,Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import {FETCH_POST_QUERY} from '../utils/graphql'

function DeletePost({postId,commentId,callback}) {
    const mutationType = commentId ? DELETE_COMMENT:DELETE_POST;
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [deletePost] = useMutation(mutationType,{
        update(proxy){
            setConfirmOpen(false);
            if(!commentId){
                const data = proxy.readQuery({query:FETCH_POST_QUERY});
                data.getPosts=data.getPosts.filter(post=>post._id !== postId);
                console.log(data);
                proxy.writeQuery({query:FETCH_POST_QUERY,data})
            }
            callback();
        },
        variables:{postId,commentId}
    })
    function deleting(){
        deletePost();
    }
  return (
    <div>
        <Button color='red' floated='right' onClick={()=>setConfirmOpen(true)}>
            <Icon name='trash'/>
        </Button>
        <Confirm
            open={confirmOpen}
            onConfirm={deleting}
            onCancel={()=>setConfirmOpen(false)}
        />
    </div>
  )
}

const DELETE_POST=gql`
    mutation deletePost($postId:ID!){
        deletePost(postId:$postId)
    }
`
const DELETE_COMMENT=gql`
    mutation deleteComment($postId:ID!,$commentId:ID!){
        deleteComment(postId:$postId,commentId:$commentId){
            _id
            commentCount
            comments{
                id body userName createdAt
            }
        }
    }
`

export default DeletePost