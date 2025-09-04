import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import App from './App';
import SearchPage from './pages/SearchPage';
import PropertyList from './pages/PropertyList';
import PropertyDetail from './pages/PropertyDetail';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Favorites from './pages/Favorites';
import MyProperties from './pages/MyProperties';
import MapTest from './components/MapTest';
import PostProperty from './pages/PostProperty';
import PricePrediction from './pages/PricePrediction';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <NotificationProvider>
      <Router>
      <Routes>
        {/* Trang chủ */}
        <Route path='/' element={<App />} />
        
        {/* Trang tìm kiếm */}
        <Route path='/search' element={<SearchPage />} />
        
        {/* Trang danh sách bất động sản */}
        <Route path='/property-list' element={<PropertyList />} />
        
                 {/* Trang chi tiết bất động sản */}
         <Route path='/property/:id' element={<PropertyDetail />} />
         
         {/* Test bản đồ */}
         <Route path='/map-test' element={<MapTest />} />
         
         {/* Các trang yêu cầu đăng nhập */}
        <Route 
          path='/profile' 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path='/favorites' 
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path='/messages' 
          element={
            <ProtectedRoute>
              <div style={{cursor: 'pointer'}}>Trang tin nhắn</div>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path='/post-property' 
          element={
            <ProtectedRoute>
              <PostProperty />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path='/my-properties' 
          element={
            <ProtectedRoute>
              <MyProperties />
            </ProtectedRoute>
          } 
        />
        
                  <Route 
            path='/price-prediction' 
            element={
              <ProtectedRoute>
                <PricePrediction />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path='/notifications' 
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            } 
          />
        </Routes>
    </Router>
    </NotificationProvider>
  </AuthProvider>
);
