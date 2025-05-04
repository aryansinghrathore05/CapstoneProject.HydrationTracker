import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const HeroSection = ({ 
  backgroundImage,
  title,
  subtitle,
  showContactForm = false,
  children,
  height = "md",
  alignment = "left"
}) => {
  // Determine height class based on prop
  const heightClass = {
    sm: 'min-h-[400px]',
    md: 'min-h-[500px]',
    lg: 'min-h-[600px]',
    xl: 'min-h-[700px]',
  }[height] || 'min-h-[500px]'

  // Determine alignment class based on prop
  const alignmentClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[alignment] || 'text-left items-start'
  
  return (
    <section 
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className={`w-full ${heightClass} relative flex flex-col justify-center ${alignmentClass} px-4 sm:px-6 lg:px-8`}
    >
      <div className="container-custom z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            {title && (
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            )}
            {subtitle && (
              <p className="text-xl md:text-2xl mb-8 max-w-xl">{subtitle}</p>
            )}
          </motion.div>
          
          {showContactForm ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Get in Touch</h3>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Your Name"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Your Email"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          ) : (
            children && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {children}
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  )
}

HeroSection.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  showContactForm: PropTypes.bool,
  children: PropTypes.node,
  height: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  alignment: PropTypes.oneOf(['left', 'center', 'right']),
}

export default HeroSection