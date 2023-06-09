import {Component} from 'react'

import Cookies from 'js-cookie'
import './index.css'
import MovieCarousal from '../MovieCarousal'
import FooterSection from '../FooterSection'

import Header from '../Header'
import MoviesContext from '../../MoviesContext/MoviesContext'
import LoaderComponent from '../LoaderComponent'

const getApiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class HomeRoute extends Component {
  state = {homePoster: {}}

  componentDidMount() {
    this.getOriginalsData()
  }

  onClickTryAgain = () => {
    this.getOriginalsData()
  }

  getOriginalsData = async () => {
    this.setState({apistatus: getApiStatus.inprogress})

    const token = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const trendingData = await response.json()
      const resultData = trendingData.results

      const modifiedTrendingData = resultData.map(e => ({
        backdropPath: e.backdrop_path,
        id: e.id,
        overview: e.overview,
        posterPath: e.poster_path,
        title: e.title,
      }))

      const len = modifiedTrendingData.length
      const x = Math.floor(Math.random() * len)

      this.setState({
        homePoster: modifiedTrendingData[x],
        apistatus: getApiStatus.success,
      })
    } else {
      this.setState({apistatus: getApiStatus.failure})
    }
  }

  getOriginalsData = async () => {
    this.setState({apistatus: getApiStatus.inprogress})

    const token = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const trendingData = await response.json()
      const resultData = trendingData.results

      const modifiedTrendingData = resultData.map(e => ({
        backdropPath: e.backdrop_path,
        id: e.id,
        overview: e.overview,
        posterPath: e.poster_path,
        title: e.title,
      }))

      const len = modifiedTrendingData.length
      const x = Math.floor(Math.random() * len)

      this.setState({
        homePoster: modifiedTrendingData[x],
        apistatus: getApiStatus.success,
      })
    } else {
      this.setState({apistatus: getApiStatus.failure})
    }
  }

  failureView = () => (
    <>
      <Header />
      <div className="home-failure-view-main-container">
        <div className="failure-view-card-container">
          <img
            src="https://res.cloudinary.com/dzapdxkgc/image/upload/v1668213303/moviesapp/alert-triangle_jiah9l.png"
            alt="failure view"
            className="coution-image"
          />
          <p className="try-again-text">
            Something went wrong. Please try again
          </p>
          <button
            type="button"
            className="try-again-button"
            onClick={this.onClickTryAgain}
          >
            try again
          </button>
        </div>
      </div>
    </>
  )

  renderLoaderView = () => (
    <>
      <Header />
      <div className="home-react-loader-super-container">
        <div className="loader-container" testid="loader">
          <LoaderComponent />
        </div>
      </div>
    </>
  )

  renderMovieDetailsUl = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case 'SUCCESS':
        return this.renderBanner()
      case 'FAILURE':
        return this.failureView()
      case 'IN_PROGRESS':
        return this.renderLoaderView()
      default:
        return null
    }
  }

  renderBanner = () => {
    const {homePoster} = this.state
    const {backdropPath, title, overview} = homePoster
    return (
      <>
        <div
          className="movie-banner-home"
          style={{
            backgroundImage: `
            linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(24, 24, 24, 0.546875) 38.26%,
    #181818 92.82%,
    #181818 98.68%,
    #181818 108.61%
  ),url(${backdropPath})`,
          }}
        >
          <Header />

          <div className="home-banner-content-super-container">
            <div className="banner-content-container">
              <h1 className="home-movie-item-details-banner-movie-name">
                {title}
              </h1>

              <p className="home-movie-description">{overview}</p>
              <button type="button" className="home-play-banner-container">
                play
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  render() {
    const trendingUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const originalUrl = 'https://apis.ccbp.in/movies-app/originals'
    const topRated = 'https://apis.ccbp.in/movies-app/top-rated-movies'

    return (
      <MoviesContext.Consumer>
        {value => {
          const {watchList} = value

          const renderWatchedList = () => {
            if (watchList.length > 0) {
              return (
                <>
                  <h1 className="movies-section-title">Watch List</h1>
                  <div className="carausal-container">
                    <MovieCarousal movieListDets={watchList} />
                  </div>
                </>
              )
            }
            return ''
          }
          return (
            <div className="home-main-container">
              {this.renderMovieDetailsUl()}
              <div className="movies-sections-container-home">
                {renderWatchedList()}
                <h1 className="movies-section-title">Trending Now</h1>
                <div className="carausal-container">
                  <MovieCarousal apiUrl={trendingUrl} />
                </div>
                <h1 className="movies-section-title">Top Rated</h1>
                <div className="carausal-container">
                  <MovieCarousal apiUrl={topRated} />
                </div>
                <h1 className="movies-section-title">Originals</h1>
                <div className="carausal-container">
                  <MovieCarousal
                    apiUrl={originalUrl}
                    getApiStatusHome={this.getApiStatusHome}
                    getRandomMovieDetails={this.getRandomMovieDetails}
                  />
                </div>
              </div>

              <FooterSection />
            </div>
          )
        }}
      </MoviesContext.Consumer>
    )
  }
}

export default HomeRoute
