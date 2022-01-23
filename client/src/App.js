import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import MovieDetails from './components/MovieDetails'
import Header from './components/Header'

export default function App() {
  return (      
      <Router>
        <Header />
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/movie/:id' component={MovieDetails} />
        </Switch>
      </Router>
  )
}