import { useAppInitialization } from './useAppInitialization';

/**
 * Hook để lấy số lượng favorite properties
 * Sử dụng AppInitializationService để lấy dữ liệu
 */
export const useFavoriteCount = () => {
  const { favoriteCount, fetchFavoriteCount } = useAppInitialization();

  return {
    favoriteCount,
    refreshFavoriteCount: fetchFavoriteCount
  };
};

export default useFavoriteCount;
