import React,{useState,useContext} from 'react';
import { Form, Input, Button} from 'semantic-ui-react'
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import { useNavigate } from "react-router-dom";
import {useForm} from '../utils/costumHook';
import {AuthContext} from '../context/auth'

function Login() {
  const context = useContext(AuthContext);
  const history = useNavigate();
  const [errors, setErrors] = useState([]);
  const initialState = {
    userName:'',
    password:'',
  }

  const {handleChangeInput,submitForm,values} = useForm(loginUser,initialState);
  
  const [loginnew,{loading}]=useMutation(LOGIN_USER,{
    update(proxy,result){
      context.login(result.data.login)
      history('/');
    },
    onError(err){
      console.log(err);
      // setErrors(Object.values(err.graphQLErrors[0].extensions.errors));
    },
    variables:values
  })
  function loginUser(){
    loginnew()
  }
  return (
    <div>
    <Form  onSubmit={submitForm} className={loading?'loading':''}>
    <Form.Group widths='equal'>
      <Form.Field
        control={Input}
        label='UserName'
        placeholder='UserName'
        name='userName'
        value={values.userName}
        onChange={handleChangeInput}
      />
      <Form.Field
        control={Input}
        label='Password'
        type='password'
        placeholder='Password'
        name='password'
        value={values.password}
        onChange={handleChangeInput}
      />
    </Form.Group>
    
    <Form.Field
      type='submit'
      id='form-button-control-public'
      content='login'
      label='submit'
      control={Button}
    />
  </Form>
  
 </div>
  )
}

const LOGIN_USER = gql`
  mutation login(
    $userName:String!
    $password:String!
  ){
    login(
        userName:$userName,
        password:$password,
    ){
      id userName createdAt email token
    }
  }
`

export default Login