import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

const hidepage = Component => {
    class hidePage extends React.Component {

        render(){
            const{ auth }  = this.props
            return auth.isAuth ?  <Redirect to="/"/> : <Component {...this.props}/>   
        }
    }
    const mapState = ({auth}) => ({auth})
    return connect(mapState)(hidePage)
}

export default hidepage