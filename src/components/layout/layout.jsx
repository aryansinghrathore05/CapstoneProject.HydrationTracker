import PropTypes from 'prop-types'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children, showFooter = true }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showFooter: PropTypes.bool,
}

export default Layout