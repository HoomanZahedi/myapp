import React,{useState,useContext} from 'react';
import { Form, Input, Button} from 'semantic-ui-react'
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import { useNavigate } from "react-router-dom";
import {useForm} from '../utils/costumHook';
import {AuthContext} from '../context/auth';

function Register() {
  const context = useContext(AuthContext);
  const history = useNavigate();
  const [errors, setErrors] = useState([]);
  const initialState = {
    userName:'',
    password:'',
    confirmPassword:'',
    email:'',
  }
  const{handleChangeInput,submitForm,values} = useForm(submitUser,initialState);
  
  const [addUser,{loading}]=useMutation(REGISTER_USER,{
    update(proxy,result){
      context.login(result.data.register)
      history('/');
    },
    onError(err){
      console.log(Object.values(err.graphQLErrors[0].extensions.errors));
      setErrors(Object.values(err.graphQLErrors[0].extensions.errors));
      
    },
    variables:values
  })

  function submitUser(){
    addUser();
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
      <Form.Field
        control={Input}
        type='password'
        label='Confirm Password'
        placeholder='Confirm Password'
        name='confirmPassword'
        value={values.confirmPassword}
        onChange={handleChangeInput}
      />
    </Form.Group>
    <Form.Field
      id='form-input-control-error-email'
      control={Input}
      label='Email'
      placeholder='joe@schmoe.com'
      name='email'
      value={values.email}
      onChange={handleChangeInput}
      error={{
        content: 'Please enter a valid email address',
        pointing: 'below',
      }}
    />
    <Form.Field
      type='submit'
      id='form-button-control-public'
      content='Confirm'
      label='submit'
      control={Button}
    />
  </Form>
  {errors.length?<div /*className=' error message'*/>
        {
        errors.map((err,index)=>{
            <p key={index}>{err}</p>
          })
        }
  </div>:null
  }
 </div>
  )
}

const REGISTER_USER = gql`
  mutation register(
    $userName:String!
    $password:String!
    $confirmPassword:String!
    $email:String!
  ){
    register(
      registerInput:{
        userName:$userName,
        password:$password,
        confirmPassword:$confirmPassword,
        email:$email
      }
    ){
      id userName email createdAt token
    }
  }
`

export default Register