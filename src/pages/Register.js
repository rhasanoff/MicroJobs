import React, { useState } from 'react'
import RegisterForm from 'components/authentication/RegisterForm'
import { useToasts } from 'react-toast-notifications'
import { Redirect } from 'react-router-dom'
import hidepage from 'components/helpers/hidepage'
import {register} from 'actions'

const Register = (props) => {

    const [redirect, setRedirect] = useState(false)
    const { addToast } = useToasts()

    const registerUser = (userData) => {
        register(userData)
        .then(
            ()=>setRedirect(true) ,
            errorMessage => addToast(errorMessage, { appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000 }))
    }
    if(redirect) {return <Redirect to="/"/>}
    return (
    <div className="auth-page">
        <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
            <h3 className="title has-text-grey">Register</h3>
            <p className="subtitle has-text-grey">Please Register to proceed.</p>
            <div className="box">
                <figure className="avatar">
                <img src="https://placehold.it/128x128" alt = "avatar" />
                </figure>
                <RegisterForm onRegister={registerUser}/>
                
            </div>
            <p className="has-text-grey">
                <a>Sign In With Google</a>&nbsp;
                <a href="/">Sign Up</a> &nbsp;·&nbsp;
            </p>
            </div>
        </div>
</div>
    )
}

export default hidepage(Register)