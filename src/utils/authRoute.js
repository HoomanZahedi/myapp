import React,{useContext} from "react";
import { Route,Navigate } from "react-router-dom";
import {AuthContext} from '../context/auth'

function AuthRoute({component:Component,...rest}){   
    const context = useContext(AuthContext); 
    return(
        <Route
            {...rest}
            render={props=>
                context.user?<Navigate to='/'/>:<Navigate {...props}/>
            }
        />
    )
}
export default AuthRoute