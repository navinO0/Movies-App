import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import './App.css'

import HomeRoute from './components/HomeRoute'
import LoginRoute from './components/LoginRoute'
import MovieItemDetailsRoute from './components/MovieItemDetailsRoute'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import PopularRoute from './components/PopularRoute'
import SearchRoute from './components/SearchRoute'
import AccountRoute from './components/AccountRoute'
import NotFound from './components/NotFoundRoute'
import MoviesContext from './MoviesContext/MoviesContext'

class App extends Component {
  state = {popularList: [], watchlist: []}

  componentDidMount() {
    const retrivedDataFromLocalStorage = localStorage.getItem('watchLaterList')
    if (retrivedDataFromLocalStorage !== null) {
      const parsedData = JSON.parse(retrivedDataFromLocalStorage)
      this.updateStateWatchList(parsedData)
    }
  }

  updateStateWatchList = list => {
    this.setState({watchlist: list})
  }

  addToWatchList = movie => {
    const {watchlist} = this.state
    const movieObject = watchlist.find(eachOne => eachOne.id === movie.id)
    if (movieObject === undefined) {
      this.setState(
        prevState => ({watchlist: [...prevState.watchlist, movie]}),
        this.storeDataInStr,
      )
    } else {
      this.setState(
        {
          watchlist: watchlist.filter(eachOne => eachOne.id !== movie.id),
        },
        this.storeDataInStr,
      )
    }
  }

  storeDataInStr = () => {
    const {watchlist} = this.state
    const stringifyList = JSON.stringify(watchlist)
    localStorage.setItem('watchLaterList', stringifyList)
  }

  getPopularContext = popularContent => {
    this.setState({popularList: popularContent})
  }

  render() {
    const {watchlist, popularList} = this.state

    return (
      <MoviesContext.Provider
        value={{
          addToWatchList: this.addToWatchList,
          watchList: watchlist,
          getPopularContext: this.getPopularContext,
          popularHomeList: popularList,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={LoginRoute} />
            <ProtectedRoute exact path="/" component={HomeRoute} />
            <ProtectedRoute exact path="/popular" component={PopularRoute} />
            <ProtectedRoute
              exact
              path="/movies/:id"
              component={MovieItemDetailsRoute}
            />
            <ProtectedRoute exact path="/search" component={SearchRoute} />
            <ProtectedRoute exact path="/account" component={AccountRoute} />
            <Route component={NotFound} />
          </Switch>
        </>
      </MoviesContext.Provider>
    )
  }
}

export default App
