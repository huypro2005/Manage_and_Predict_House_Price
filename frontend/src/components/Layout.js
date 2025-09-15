import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthWrapper from './auth/AuthWrapper';
import HeaderActions from './HeaderActions';

const Layout = ({ children, showNavigation = true, navigationItems = [] }) => {
  const navigate = useNavigate();

  const defaultNavigationItems = [
    { id: 'ban', label: 'Nhà đất bán', icon: '🏠' },
    { id: 'thue', label: 'Nhà đất thuê', icon: '🔑' },
    { id: 'tin-tuc', label: 'Tin tức', icon: '📰' }
  ];

  const navItems = navigationItems.length > 0 ? navigationItems : defaultNavigationItems;

  const handleNavigateToPropertyList = (type) => {
    navigate('/property-list', { state: { type } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🏢</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">RealEstate</h1>
            </motion.div>

            {/* Navigation */}
            {showNavigation && (
              <nav className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    onClick={() => handleNavigateToPropertyList(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            )}

            {/* Header Actions */}
            <div className="flex items-center space-x-2">
              <HeaderActions 
                onFavoriteClick={() => navigate('/favorites')}
                showOnMobile={true}
                showOnDesktop={true}
              />
              <AuthWrapper />
              <button 
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                onClick={() => navigate('/post-property')}
              >
                Đăng tin
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;

