import { render } from '@testing-library/react'
import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

const authorization = Component => {
    class Authorization extends React.Component {

        render(){
            const{ auth }  = this.props
            return auth.isAuth ? <Component {...this.props}/> : <Redirect to="/login"/>
        }
    }
    const mapState = ({auth}) => ({auth})
    return connect(mapState)(Authorization)
}

export default authorization