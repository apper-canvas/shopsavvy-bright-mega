import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrackingContext } from '../contexts/TrackingContext';
import Header from '../components/Header';
import { Search, Package, MapPin, Clock, CheckCircle, Truck, Home } from 'lucide-react';
import toast from 'react-hot-toast';

function Tracking() {
  const navigate = useNavigate();
  const { trackings, getTrackingByNumber } = useContext(TrackingContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTracking, setSelectedTracking] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error('Please enter a tracking number');
      return;
    }

    setIsSearching(true);
    try {
      const tracking = getTrackingByNumber(searchQuery.trim());
      if (tracking) {
        setSelectedTracking(tracking);
        toast.success('Tracking information found');
      } else {
        toast.error('Tracking number not found');
        setSelectedTracking(null);
      }
    } catch (error) {
      toast.error('Error searching for tracking information');
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-yellow-500" />;
      case 'in_transit':
        return <MapPin className="w-5 h-5 text-orange-500" />;
      case 'out_for_delivery':
        return <Clock className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'shipped':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'in_transit':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-primary-50 to-white dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-2">
              Track Your Package
            </h1>
            <p className="text-surface-600 dark:text-surface-300">
              Enter your tracking number to see the latest delivery status
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter tracking number (e.g., TRK123456789)"
                  className="w-full pl-10 pr-4 py-3 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-800 text-surface-900 dark:text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSearching ? 'Searching...' : 'Track'}
              </button>
            </div>
          </form>

          {/* Tracking Results */}
          {selectedTracking && (
            <div className="bg-white dark:bg-surface-800 rounded-lg shadow-lg p-6 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
                    Tracking Details
                  </h2>
                  <p className="text-surface-600 dark:text-surface-300">
                    Tracking Number: {selectedTracking.trackingNumber}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTracking.status)}`}>
                  {selectedTracking.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-medium text-surface-900 dark:text-white mb-2">Order Information</h3>
                  <p className="text-surface-600 dark:text-surface-300">Order #{selectedTracking.orderId}</p>
                  <p className="text-surface-600 dark:text-surface-300">
                    Estimated Delivery: {selectedTracking.estimatedDelivery}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-surface-900 dark:text-white mb-2">Shipping Address</h3>
                  <p className="text-surface-600 dark:text-surface-300">
                    {selectedTracking.shippingAddress}
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="font-medium text-surface-900 dark:text-white mb-4">Delivery Timeline</h3>
                <div className="space-y-4">
                  {selectedTracking.timeline.map((event, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(event.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-surface-900 dark:text-white">
                            {event.description}
                          </h4>
                          <span className="text-sm text-surface-500 dark:text-surface-400">
                            {event.timestamp}
                          </span>
                        </div>
                        {event.location && (
                          <p className="text-surface-600 dark:text-surface-300 text-sm">
                            {event.location}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-surface-100 dark:bg-surface-700 text-surface-900 dark:text-white rounded-lg hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tracking;