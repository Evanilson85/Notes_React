import { Switch } from 'react-router-dom'
import Route from "./Router"

import Login from '../views/Login'
import Register from '../views/Register'
import Home from '../views/Home'
import Profile from '../views/Profile'

const Routes = () => {
   return(
    <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/home' isPrivate component={Home} />
        <Route exact path='/profile' isPrivate component={Profile} />
    </Switch>
   )
}



export default Routes