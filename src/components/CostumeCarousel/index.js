import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import PopularMoviesCard from '../PopularMoviesCard'
import './index.css'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: {max: 4000, min: 3000},
    items: 5,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: {max: 3000, min: 1024},
    items: 5,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: {max: 1024, min: 464},
    items: 5,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: {max: 464, min: 0},
    items: 3,
    slidesToSlide: 1,
  },
}

const CostumeCarousel = props => {
  const {movieListDets} = props
  return (
    <div>
      <Carousel
        responsive={responsive}
        autoPlay
        partialVisible={false}
        autoPlaySpeed={5000}
        infinite
        itemClass="slider-class-name"
        rewindWithAnimation
        customTransition="all ease 2000ms"
        removeArrowOnDeviceType={['mobile', 'tablet']}
      >
        {movieListDets.map(eachOne => (
          <PopularMoviesCard eachOne={eachOne} />
        ))}
      </Carousel>
      ;
    </div>
  )
}

export default CostumeCarousel
