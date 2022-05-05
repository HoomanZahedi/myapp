import {useState} from 'react';

export const useForm=(callback,initialState={})=>{
    const [values, setValues] = useState(initialState);
    const handleChangeInput=(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
      }

    const submitForm=(e)=>{
      e.preventDefault();
      callback();
    }
    return{
        handleChangeInput,
        submitForm,
        values
    }
}