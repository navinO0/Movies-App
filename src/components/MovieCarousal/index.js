import {Component} from 'react'

import Cookies from 'js-cookie'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

import LoaderComponent from '../LoaderComponent'
import CostumeCarousel from '../CostumeCarousel'

const getApiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class MovieCarousal extends Component {
  state = {trendingVideos: [], apistatus: getApiStatus.initial}

  componentDidMount() {
    this.getOriginalsData()
  }

  onClickTryAgain = () => {
    this.getOriginalsData()
  }

  getOriginalsData = async () => {
    const {movieListDets, apiUrl} = this.props
    if (apiUrl === undefined) {
      this.setState({
        trendingVideos: movieListDets,
        apistatus: getApiStatus.success,
      })
    } else {
      this.setState({apistatus: getApiStatus.inprogress})

      const token = Cookies.get('jwt_token')

      const url = apiUrl
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

        this.setState({
          trendingVideos: modifiedTrendingData,
          apistatus: getApiStatus.success,
        })
      } else {
        this.setState({apistatus: getApiStatus.failure})
      }
    }
  }

  renderLoaderView = () => (
    <>
      <div className="carou-react-loader-super-container">
        <div className="loader-container" testid="loader">
          <LoaderComponent />
        </div>
      </div>
    </>
  )

  failureView = () => (
    <>
      <div className="carou-failure-view-main-container">
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

  renderMovieDetailsUl = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case 'SUCCESS':
        return this.renderSlider()
      case 'FAILURE':
        return this.failureView()
      case 'IN_PROGRESS':
        return this.renderLoaderView()
      default:
        return null
    }
  }

  renderSlider = () => {
    const {trendingVideos} = this.state

    return (
      <>
        <div className="slider-main-container">
          <CostumeCarousel movieListDets={trendingVideos} />
        </div>
      </>
    )
  }

  render() {
    return (
      <div className="main-container-carousals">
        <div className="slick-container">{this.renderMovieDetailsUl()}</div>
      </div>
    )
  }
}

export default MovieCarousal
