import { Link } from 'react-router-dom'
import ApperIcon from './ApperIcon'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const shopLinks = [
    { name: 'All Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'Deals', href: '/deals' },
    { name: 'Wishlist', href: '/wishlist' }
  ]

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Contact Us', href: '/contact' }
  ]

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', href: 'https://facebook.com' },
    { name: 'Twitter', icon: 'Twitter', href: 'https://twitter.com' },
    { name: 'Instagram', icon: 'Instagram', href: 'https://instagram.com' },
    { name: 'LinkedIn', icon: 'Linkedin', href: 'https://linkedin.com' }
  ]

  return (
    <footer className="bg-surface-900 dark:bg-surface-950 text-surface-300 py-12 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500">
                <ApperIcon name="ShoppingBag" className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">ShopSavvy</h3>
            </Link>
            <p className="text-surface-400 max-w-xs">
              Your smart shopping companion for discovering amazing products and deals. Shop with confidence and save more.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <ApperIcon name="Award" className="h-4 w-4 text-primary-400" />
              <span className="text-surface-400">Trusted by 50K+ customers</span>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2">
              {shopLinks.map(link => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="hover:text-primary-400 transition-colors flex items-center space-x-2 group"
                  >
                    <ApperIcon name="ChevronRight" className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map(link => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="hover:text-primary-400 transition-colors flex items-center space-x-2 group"
                  >
                    <ApperIcon name="ChevronRight" className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <div className="space-y-4">
              <div className="flex space-x-4">
                {socialLinks.map(social => (
                  <a 
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-800 hover:bg-primary-600 transition-colors group"
                    aria-label={social.name}
                  >
                    <ApperIcon name={social.icon} className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <ApperIcon name="Mail" className="h-4 w-4 text-primary-400" />
                  <span className="text-surface-400">support@shopsavvy.com</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <ApperIcon name="Phone" className="h-4 w-4 text-primary-400" />
                  <span className="text-surface-400">1-800-SHOP-SAVVY</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-surface-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-surface-400 text-center md:text-left">
            © {currentYear} ShopSavvy. All rights reserved. Made with ❤️ for smart shoppers.
          </p>
          <div className="flex items-center space-x-6 text-sm">
            <Link to="/privacy" className="text-surface-400 hover:text-primary-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-surface-400 hover:text-primary-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer