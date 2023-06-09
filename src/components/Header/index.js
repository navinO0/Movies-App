import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'

import {HiOutlineSearch} from 'react-icons/hi'

import './index.css'

const lgOptions = [
  {id: 'HOME', linkRoute: '/', displayText: 'Home'},
  {id: 'POPULAR', linkRoute: '/popular', displayText: 'Popular'},
]

const lgOptionsSm = [
  {id: 'HOME', linkRoute: '/', displayText: 'Home'},
  {id: 'POPULAR', linkRoute: '/popular', displayText: 'Popular'},
  {
    id: 'PROFILE',
    linkRoute: '/account',
    displayText: 'Account',
  },
]

class Header extends Component {
  state = {isShownMenu: false}

  onClickHamBurger = () => {
    this.setState({isShownMenu: true})
  }

  onClickCloseMenu = () => {
    this.setState({isShownMenu: false})
  }

  onChangeInputWord = event => {
    const {onChangeSearchKey} = this.props
    onChangeSearchKey(event.target.value)
  }

  onclickSearch = event => {
    event.preventDefault()
    const {onClickSearchButton} = this.props
    onClickSearchButton()
  }

  searchComponent = () => {
    const {searchEn, searchekey} = this.props
    if (searchEn !== undefined) {
      return (
        <form className="search-comp-container" onSubmit={this.onclickSearch}>
          <input
            type="search"
            className="search-comp"
            placeholder="Search"
            value={searchekey}
            onChange={this.onChangeInputWord}
          />
          <button
            type="submit"
            testid="searchButton"
            onClick={this.onclickSearch}
            className="search-icon-container"
          >
            <HiOutlineSearch className="search-icon-search" />
          </button>
        </form>
      )
    }
    return (
      <button
        type="button"
        className="not-search-container"
        onClick={this.onClickSearchBtn}
        testid="searchButton"
      >
        <Link to="/search" className="link-item">
          <HiOutlineSearch className="search-icon" />
        </Link>
      </button>
    )
  }

  render() {
    const {isShownMenu} = this.state
    const dispSmBtn = isShownMenu ? '' : 'menu-none'
    const {match} = this.props

    return (
      <>
        <div className="header-null-space">
          <div className="header-main-container">
            <div className="header-sub-container">
              <div className="header-left">
                <div className="movies-icon-image-container">
                  <Link to="/" className="nav-link-item">
                    <img
                      src="https://res.cloudinary.com/dzapdxkgc/image/upload/v1668000958/moviesapp/Group_7399_2_b66ang.png"
                      alt="website logo"
                      className="website-logo"
                    />
                  </Link>
                </div>

                <ul className="header-nav-links-container">
                  {lgOptions.map(eachOne => {
                    const {id, linkRoute, displayText} = eachOne

                    const actived =
                      match.path === linkRoute
                        ? 'active-nav-link-item hover-underline-animation'
                        : 'nav-link-item hover-underline-animation'
                    return (
                      <li className="header-list-item" key={id}>
                        <Link to={linkRoute} className="link-item">
                          <p className={actived}>{displayText}</p>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <>
                <div className="header-nav-links-container-sm">
                  {this.searchComponent()}
                  <button
                    type="button"
                    onClick={this.onClickHamBurger}
                    className="ham-burger-sm-container"
                  >
                    <img
                      src="https://res.cloudinary.com/dzapdxkgc/image/upload/v1668124564/moviesapp/add-to-queue_1_quyadh.png"
                      alt="menu"
                      className="hamburger-menu"
                    />
                  </button>
                </div>
                <div className="header-right">
                  {this.searchComponent()}
                  <Link to="/account" className="nav-link-item">
                    <img
                      src="https://res.cloudinary.com/dzapdxkgc/image/upload/v1668000163/moviesapp/Avatar_r2uk1x.png"
                      alt="profile"
                      className="header-avatar"
                    />
                  </Link>
                </div>
              </>
            </div>
          </div>
          <div className={`header-main-container-sm-opt ${dispSmBtn} `}>
            <div className="header-sub-container-sm-opt">
              <ul className="header-nav-links-container-sm-opt">
                {lgOptionsSm.map(eachOne => {
                  const {id, linkRoute, displayText} = eachOne

                  const actived =
                    match.path === linkRoute
                      ? 'active-nav-link-item'
                      : 'nav-link-item'
                  return (
                    <li className="header-list-item" key={id}>
                      <Link to={linkRoute} className={actived}>
                        <p className={actived}>{displayText}</p>
                      </Link>
                    </li>
                  )
                })}

                <button
                  type="button"
                  onClick={this.onClickCloseMenu}
                  className="menu-close-button"
                >
                  <img
                    src="https://res.cloudinary.com/dzapdxkgc/image/upload/v1668193195/moviesapp/Solid_vuumdf.png"
                    alt="close"
                    className="menu-close-btn"
                  />
                </button>
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Header)
