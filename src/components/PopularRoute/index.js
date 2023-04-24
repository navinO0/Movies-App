import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'

import PaginationComponent from '../PaginationComponent'
import './index.css'
import FooterSection from '../FooterSection'
import LoaderComponent from '../LoaderComponent'

const getApiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class PopularRoute extends Component {
  state = {
    popularmovieslist: [],
    apistatus: getApiStatus.initial,
  }

  componentDidMount() {
    this.getPopularMoviesData()
  }

  onClickTryAgain = () => {
    this.getPopularMoviesData()
  }

  getPopularMoviesData = async () => {
    this.setState({apistatus: getApiStatus.inprogress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const jsonData = await response.json()
      const moviesList = jsonData.results

      const modifiedmoviesList = moviesList.map(e => ({
        backdropPath: e.backdrop_path,
        id: e.id,
        overview: e.overview,
        posterPath: e.poster_path,
        title: e.title,
      }))
      this.setState({
        popularmovieslist: modifiedmoviesList,
        apistatus: getApiStatus.success,
      })
    } else {
      this.setState({apistatus: getApiStatus.failure})
    }
  }

  renderPoplurContent = () => {
    const {popularmovieslist} = this.state
    return (
      <>
        <div className="sm-list">
          <PaginationComponent
            videosList={popularmovieslist}
            itemsPerPage={9}
          />
        </div>
        <div className="lg-list">
          <PaginationComponent
            videosList={popularmovieslist}
            itemsPerPage={15}
          />
        </div>
      </>
    )
  }

  renderLoaderView = () => (
    <>
      <div className="react-loader-super-container">
        <div className="loader-container" testid="loader">
          <LoaderComponent />
        </div>
      </div>
    </>
  )

  failureView = () => (
    <>
      <div className="failure-view-main-container">
        <div className="failure-view-card-container">
          <img
            src="https://res.cloudinary.com/dzapdxkgc/image/upload/v1668012331/moviesapp/Background-Complete_hxribz.png"
            alt="failure view"
            className="failure-view-image"
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
        return this.renderPoplurContent()
      case 'FAILURE':
        return this.failureView()
      case 'IN_PROGRESS':
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-main-contaier">
        <Header />
        {this.renderMovieDetailsUl()}

        <FooterSection />
      </div>
    )
  }
}

export default PopularRoute
