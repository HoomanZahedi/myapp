import React,{createContext,useReducer} from 'react';

const initialState = {user:null}

const AuthContext = createContext({
    user:null,
    login:(userData)=>{},
    logout:()=>{}
})

const authReducer=(state,action)=>{
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user:action.payload
            }
        case 'LOGOUT':
            return{
                ...state,
                user:null
            }
        default:
            return state
    }
}

function Auth(props){
    const [state, dispatch] = useReducer(authReducer,{user:null} );
    function login(userData){
        localStorage.setItem('token',userData.token)
        dispatch({type:'LOGIN',payload:userData})
    }
    function logout(){
        localStorage.removeItem('token')
        dispatch({type:'LOGOUT'})
    }
    return(
        <AuthContext.Provider
        value={{ user:state.user ,login ,logout}}
        {...props}/>
    )
}
export { Auth, AuthContext }