import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/auth'

const RouterConfig = ({ component: Component, isPrivate, ...rest }) => {

    const { signed, load } = useContext(AuthContext)

    if(load) {
      return <div></div>
    } 

    if(!signed && isPrivate) { 
      return <Redirect to='/'/>
    }
      
    if(signed && !isPrivate) { 
      return <Redirect to='/home' />
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />
    
}

export default RouterConfig