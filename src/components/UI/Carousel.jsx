import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Carousel = ({ 
  items, 
  renderItem, 
  itemsToShow = { mobile: 1, tablet: 2, desktop: 3 }, 
  autoplay = false, 
  autoplaySpeed = 5000, 
  className = '',
  showArrows = true,
  showDots = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTouching, setIsTouching] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const autoplayTimerRef = useRef(null)
  
  // Calculate items to show based on screen size
  const [visibleItems, setVisibleItems] = useState(itemsToShow.desktop)
  
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(itemsToShow.mobile)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(itemsToShow.tablet)
      } else {
        setVisibleItems(itemsToShow.desktop)
      }
    }
    
    // Initial call
    updateVisibleItems()
    
    // Add event listener for window resize
    window.addEventListener('resize', updateVisibleItems)
    
    return () => window.removeEventListener('resize', updateVisibleItems)
  }, [itemsToShow.desktop, itemsToShow.mobile, itemsToShow.tablet])
  
  const maxIndex = Math.max(0, items.length - visibleItems)

  // Handle autoplay
  useEffect(() => {
    if (autoplay && !isTouching) {
      autoplayTimerRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => 
          prevIndex >= maxIndex ? 0 : prevIndex + 1
        )
      }, autoplaySpeed)
    }
    
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
      }
    }
  }, [autoplay, autoplaySpeed, isTouching, maxIndex])

  const handleNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex >= maxIndex ? prevIndex : prevIndex + 1
    )
  }

  const handlePrev = () => {
    setCurrentIndex(prevIndex => 
      prevIndex <= 0 ? 0 : prevIndex - 1
    )
  }

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex))
  }

  const handleTouchStart = (e) => {
    setIsTouching(true)
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    if (!isTouching) return
    
    const touchEnd = e.touches[0].clientX
    const diff = touchStart - touchEnd
    
    if (diff > 50) {
      handleNext()
      setIsTouching(false)
    } else if (diff < -50) {
      handlePrev()
      setIsTouching(false)
    }
  }

  const handleTouchEnd = () => {
    setIsTouching(false)
  }
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        className="flex"
        animate={{ x: `-${currentIndex * (100 / visibleItems)}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-full md:w-1/${itemsToShow.tablet} lg:w-1/${itemsToShow.desktop}`}
            style={{ width: `${100 / visibleItems}%` }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </motion.div>
      
      {/* Navigation Arrows */}
      {showArrows && items.length > visibleItems && (
        <>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow-md z-10 focus:outline-none ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-100'
            }`}
            aria-label="Previous slide"
          >
            <FiChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow-md z-10 focus:outline-none ${
              currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-100'
            }`}
            aria-label="Next slide"
          >
            <FiChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </>
      )}
      
      {/* Pagination Dots */}
      {showDots && items.length > visibleItems && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full focus:outline-none transition-colors ${
                currentIndex === index ? 'bg-primary-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

Carousel.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  itemsToShow: PropTypes.shape({
    mobile: PropTypes.number,
    tablet: PropTypes.number,
    desktop: PropTypes.number,
  }),
  autoplay: PropTypes.bool,
  autoplaySpeed: PropTypes.number,
  className: PropTypes.string,
  showArrows: PropTypes.bool,
  showDots: PropTypes.bool,
}

export default Carousel