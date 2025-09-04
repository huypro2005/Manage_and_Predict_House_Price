import { useState, useEffect, useCallback } from 'react';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../config/firebase';

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const useFirebaseAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for redirect result when component mounts
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          setUser(result.user);
          setError(null);
        }
      } catch (error) {
        console.error('Redirect result error:', error);
        setError('Lỗi xác thực Google. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    checkRedirectResult();
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Thử popup với timeout
      const popupPromise = signInWithPopup(auth, provider);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Popup timeout')), 10000)
      );
      
      const result = await Promise.race([popupPromise, timeoutPromise]);
      setUser(result.user);
      setError(null);
      return { success: true, user: result.user };
    } catch (popupError) {
      console.log('Popup failed, trying redirect:', popupError);
      
      // Nếu popup thất bại, thử redirect
      try {
        await signInWithRedirect(auth, provider);
        // Redirect sẽ xử lý kết quả trong useEffect
        return { success: true, redirect: true };
      } catch (redirectError) {
        console.error('Both popup and redirect failed:', redirectError);
        
        // Xử lý các loại lỗi cụ thể
        let errorMessage = 'Không thể đăng nhập với Google. ';
        if (redirectError.code === 'auth/network-request-failed') {
          errorMessage += 'Lỗi kết nối mạng. Vui lòng kiểm tra internet và thử lại.';
        } else if (redirectError.code === 'auth/popup-closed-by-user') {
          errorMessage += 'Popup bị đóng. Vui lòng thử lại.';
        } else if (redirectError.code === 'auth/popup-blocked') {
          errorMessage += 'Popup bị chặn. Vui lòng cho phép popup và thử lại.';
        } else if (redirectError.code === 'auth/cancelled-popup-request') {
          errorMessage += 'Yêu cầu popup bị hủy. Vui lòng thử lại.';
        } else {
          errorMessage += 'Vui lòng thử lại.';
        }
        
        setError(errorMessage);
        setLoading(false);
        return { success: false, error: errorMessage };
      }
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setError(null);
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      setError('Lỗi khi đăng xuất: ' + error.message);
      return { success: false, error: error.message };
    }
  }, []);

  const getIdToken = useCallback(async (forceRefresh = false) => {
    if (!user) return null;
    try {
      return await user.getIdToken(forceRefresh);
    } catch (error) {
      console.error('Error getting ID token:', error);
      return null;
    }
  }, [user]);

  return {
    user,
    loading,
    error,
    signInWithGoogle,
    signOut,
    getIdToken,
    clearError: () => setError(null)
  };
};
