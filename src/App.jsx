import { createContext, useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, clearUser } from './store/userSlice'
import { CartProvider } from './contexts/CartContext'
import { DealsProvider } from './contexts/DealsContext'
import { TrackingProvider } from './contexts/TrackingContext'
import { ProductsProvider } from './contexts/ProductsContext'
import Deals from './pages/Deals'
import Home from './pages/Home'
import Products from './pages/Products'
import Categories from './pages/Categories'
import CategoryView from './pages/CategoryView'
import Checkout from './pages/Checkout'
import Tracking from './pages/Tracking'
import ProductDetail from './pages/ProductDetail'
import NotFound from './pages/NotFound'
import Wishlist from './pages/Wishlist'
import HelpCenter from './pages/HelpCenter'
import ShippingInfo from './pages/ShippingInfo'
import Returns from './pages/Returns'
import ContactUs from './pages/ContactUs'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Callback from './pages/Callback'
import ErrorPage from './pages/ErrorPage'
import { Toaster } from 'react-hot-toast'

// Create auth context
export const AuthContext = createContext(null);

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Get authentication status with proper error handling
  const userState = useSelector((state) => state.user);
  const isAuthenticated = userState?.isAuthenticated || false;

  // Initialize ApperUI once when the app loads
  useEffect(() => {
    const { ApperClient, ApperUI } = window.ApperSDK;
    const client = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Initialize but don't show login yet
    ApperUI.setup(client, {
      target: '#authentication',
      clientId: import.meta.env.VITE_APPER_PROJECT_ID,
      view: 'both',
      onSuccess: function (user) {
        setIsInitialized(true);
        // CRITICAL: This exact currentPath logic must be preserved in all implementations
        // DO NOT simplify or modify this pattern as it ensures proper redirection flow
        let currentPath = window.location.pathname + window.location.search;
        let redirectPath = new URLSearchParams(window.location.search).get('redirect');
        const isAuthPage = currentPath.includes('/login') || currentPath.includes('/signup') || currentPath.includes(
            '/callback') || currentPath.includes('/error');
        if (user) {
          // User is authenticated
          if (redirectPath) {
            navigate(redirectPath);
          } else if (!isAuthPage) {
            if (!currentPath.includes('/login') && !currentPath.includes('/signup')) {
              navigate(currentPath);
            } else {
              navigate('/');
            }
          } else {
            navigate('/');
          }
          // Store user information in Redux
          dispatch(setUser(JSON.parse(JSON.stringify(user))));
        } else {
          // User is not authenticated
          if (!isAuthPage) {
            navigate(
              currentPath.includes('/signup')
                ? `/signup?redirect=${currentPath}`
                : currentPath.includes('/login')
                ? `/login?redirect=${currentPath}`
                : '/login');
          } else if (redirectPath) {
            if (
              ![
                'error',
                'signup',
                'login',
                'callback'
              ].some((path) => currentPath.includes(path)))
              navigate(`/login?redirect=${redirectPath}`);
            else {
              navigate(currentPath);
            }
          } else if (isAuthPage) {
            navigate(currentPath);
          } else {
            navigate('/login');
          }
          dispatch(clearUser());
        }
      },
      onError: function(error) {
        console.error("Authentication failed:", error);
      }
    });
  }, []);

  // Authentication methods to share via context
  const authMethods = {
    isInitialized,
    logout: async () => {
      try {
        const { ApperUI } = window.ApperSDK;
        await ApperUI.logout();
        dispatch(clearUser());
        navigate('/login');
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  // Don't render routes until initialization is complete
  if (!isInitialized) {
    return <div className="loading">Initializing application...</div>;
  }

  return (
    <AuthContext.Provider value={authMethods}>
    <CartProvider>
      <DealsProvider>
        <ProductsProvider>
          <TrackingProvider>
            <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-50 to-white dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/callback" element={<Callback />} />
              <Route path="/error" element={<ErrorPage />} />
              {isAuthenticated ? (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/deals" element={<Deals />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/category/:categoryId" element={<CategoryView />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/tracking" element={<Tracking />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/help" element={<HelpCenter />} />
                  <Route path="/shipping" element={<ShippingInfo />} />
                  <Route path="/returns" element={<Returns />} />
                  <Route path="/contact" element={<ContactUs />} />
                </>
              ) : (
                <Route path="*" element={<Login />} />
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster position="bottom-right" />
            </div>
          </TrackingProvider>
        </ProductsProvider>
      </DealsProvider>
    </CartProvider>
    </AuthContext.Provider>
  )
}

export default App