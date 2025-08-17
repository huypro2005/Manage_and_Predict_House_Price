import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SearchPage from './pages/SearchPage';
import PropertyList from './pages/PropertyList';
import PropertyDetail from './pages/PropertyDetail';
import { RowsIcon } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
        <Route path='/' element={<App />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/property-list' element={<PropertyList />} />
        <Route path='/property/:id' element={<PropertyDetail />} />
    </Routes>
  </Router>
);
