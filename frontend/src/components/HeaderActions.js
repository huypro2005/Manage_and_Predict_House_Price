import React from 'react';
import NotificationDropdown from './NotificationDropdown';
import FavoriteHeart from './FavoriteHeart';
import useNotificationCount from '../hooks/useNotificationCount';

const HeaderActions = ({
  favoriteCount = 0,
  onFavoriteClick,
  isFavoritePage = false,
  showOnMobile = true,
  showOnDesktop = true,
  className = ""
}) => {
  const { notificationCount } = useNotificationCount();
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
                    {/* Desktop Actions */}
              {showOnDesktop && (
                <div className="hidden sm:flex items-center space-x-3">
                  <FavoriteHeart
                    favoriteCount={favoriteCount}
                    onClick={onFavoriteClick}
                    isFavoritePage={isFavoritePage}
                  />
                  <NotificationDropdown />
                </div>
              )}

              {/* Mobile Actions */}
              {showOnMobile && (
                <div className="flex sm:hidden items-center space-x-2">
                  <NotificationDropdown
                    className="relative"
                  />
                  <FavoriteHeart
                    favoriteCount={favoriteCount}
                    onClick={onFavoriteClick}
                    isFavoritePage={isFavoritePage}
                  />
                </div>
              )}
    </div>
  );
};

export default HeaderActions;
