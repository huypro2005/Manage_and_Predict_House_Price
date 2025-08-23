import React, { createContext, useContext, useState, useEffect } from 'react';
import { baseUrl } from '../base';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [user_fullname, setUser_fullname] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Check token validity on app start
  useEffect(() => {
    const checkToken = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        // Optimistically set token to avoid clearing it on transient errors
        setToken(storedToken);
        try {
          const response = await fetch(`${baseUrl}auth/check/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${storedToken}`
            }
          });

          if (response.ok) {
            const userData = await response.json().catch(() => ({}));
            console.log('User data from check token:', userData);
            // Dữ liệu trả về là object trực tiếp chứa thông tin user
            if (userData && (userData.id || userData.username)) {
              setUser(userData);
              setUser_fullname(userData.full_name);
            }
          } else if (response.status === 401 || response.status === 403) {
            // Only clear token on unauthorized/forbidden
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          } else {
            // Keep token on other errors (e.g., 404 if no check endpoint)
          }
        } catch (error) {
          // Network or server error: keep token, just log
          console.warn('Token verification skipped due to error:', error);
        }
      }
      setLoading(false);
    };

    checkToken();
  }, []);

  const persistAuth = (authResponse) => {
    // Chỉ lưu token khi login/register, không lưu user data
    const receivedToken = authResponse?.access || authResponse?.token || authResponse?.jwt;

    if (receivedToken) {
      localStorage.setItem('token', receivedToken);
      setToken(receivedToken);
      // Không set user ở đây, sẽ lấy từ check token
    }
  };

  // Hàm riêng để lấy thông tin user từ API
  const fetchUserData = async () => {
    const currentToken = localStorage.getItem('token');
    if (!currentToken) return;

    try {
      const response = await fetch(`${baseUrl}auth/check/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentToken}`
        }
      });

             if (response.ok) {
         const userData = await response.json().catch(() => ({}));
         // Dữ liệu trả về là object trực tiếp chứa thông tin user
         if (userData && (userData.id || userData.username)) {
           setUser(userData);
         }
       }
    } catch (error) {
      console.warn('Failed to fetch user data:', error);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch(`${baseUrl}auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Chỉ lưu token, không lưu user data
        persistAuth(data);
        
        // Sau khi lưu token, gọi API để lấy thông tin user
        await fetchUserData();
        
        return { success: true, data };
      } else {
        return { success: false, error: data.message || data.detail || 'Đăng nhập thất bại' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Lỗi kết nối' };
    }
  };

  const register = async (userData) => {
    try {
      console.log(userData);
      const response = await fetch(`${baseUrl}auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // Chỉ lưu token, không lưu user data
        persistAuth(data);
        
        // Sau khi lưu token, gọi API để lấy thông tin user
        await fetchUserData();
        
        return { success: true, data };
      } else {
        return { success: false, error: data.message || data.detail || 'Đăng ký thất bại' };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Lỗi kết nối' };
    }
  };

  const googleLogin = async (googleToken) => {
    try {
      const response = await fetch(`${baseUrl}oauth/firebase/google/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ token: googleToken }),
      });

      console.log('googleToken is length: ', googleToken.length);
      const data = await response.json();

      if (response.ok) {
        // Chỉ lưu token, không lưu user data
        persistAuth(data);
        
        // Sau khi lưu token, gọi API để lấy thông tin user
        await fetchUserData();
        
        return { success: true, data };
      } else {
        console.log('data', data);
        return { success: false, error: data.error || 'Đăng nhập Google thất bại' };
      }
    } catch (error) {
      console.error('Google login error:', error);
      return { success: false, error: 'Lỗi kết nối' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    googleLogin,
    logout,
    updateUser,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
