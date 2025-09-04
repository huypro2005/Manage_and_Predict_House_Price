import React from 'react';
import { Heart } from 'lucide-react';

const FavoriteHeart = ({ 
  favoriteCount = 0, 
  onClick, 
  isFavoritePage = false,
  className = "p-2 text-gray-400 hover:text-red-500 transition-colors",
  iconClassName = "h-5 w-5",
  badgeClassName = "absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center"
}) => {
  return (
    <button 
      className={`relative ${className}`}
      onClick={onClick}
      aria-label="Yêu thích"
    >
      <Heart className={`${iconClassName} ${isFavoritePage ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
      {favoriteCount > 0 && (
        <div className={badgeClassName}>
          {favoriteCount > 9 ? '9+' : favoriteCount}
        </div>
      )}
    </button>
  );
};

export default FavoriteHeart;
