import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import UserDropdown from './UserDropdown';

const AuthWrapper = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  const handleShowLogin = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
  };

  const handleShowRegister = () => {
    setShowRegisterModal(true);
    setShowLoginModal(false);
  };

  const handleCloseModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  const switchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const switchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span className="text-gray-600">Đang tải...</span>
      </div>
    );
  }

  if (isAuthenticated) {
    return <UserDropdown />;
  }

  return (
    <>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleShowLogin}
          className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          Đăng Nhập
        </button>
        <button
          onClick={handleShowRegister}
          className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          Đăng Ký
        </button>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={handleCloseModals}
        onSwitchToRegister={switchToRegister}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={handleCloseModals}
        onSwitchToLogin={switchToLogin}
      />
    </>
  );
};

export default AuthWrapper;
