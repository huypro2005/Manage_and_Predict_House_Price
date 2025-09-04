import { baseUrl } from '../base';

// Cache for API responses to reduce redundant calls
const apiCache = new Map();
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes

// Utility function to get cached response
const getCachedResponse = (url, params = {}) => {
  const cacheKey = `${url}?${new URLSearchParams(params).toString()}`;
  const cached = apiCache.get(cacheKey);
  
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return cached.data;
  }
  
  return null;
};

// Utility function to set cached response
const setCachedResponse = (url, params = {}, data) => {
  const cacheKey = `${url}?${new URLSearchParams(params).toString()}`;
  apiCache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
};

// Optimized API service with caching
const apiService = {
  // GET request with caching
  async get(endpoint, params = {}, useCache = true) {
    const url = `${baseUrl}${endpoint}`;
    
    // Check cache first for GET requests
    if (useCache) {
      const cached = getCachedResponse(url, params);
      if (cached) {
        console.log('Using cached response for:', url);
        return cached;
      }
    }
    
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    
    try {
      const response = await fetch(fullUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Cache successful GET responses
      if (useCache && response.ok) {
        setCachedResponse(url, params, data);
      }
      
      return data;
    } catch (error) {
      console.error('API GET error:', error);
      throw error;
    }
  },

  // POST request without caching
  async post(endpoint, data = {}) {
    const url = `${baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API POST error:', error);
      throw error;
    }
  },

  // POST with FormData (for file uploads)
  async postFormData(endpoint, formData) {
    const url = `${baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API POST FormData error:', error);
      throw error;
    }
  },

  // PUT request
  async put(endpoint, data = {}) {
    const url = `${baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API PUT error:', error);
      throw error;
    }
  },

  // DELETE request
  async delete(endpoint) {
    const url = `${baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API DELETE error:', error);
      throw error;
    }
  },

  // Authenticated requests - only add token when needed
  async authenticatedGet(endpoint, params = {}, useCache = true) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const url = `${baseUrl}${endpoint}`;
    
    // Check cache first
    if (useCache) {
      const cached = getCachedResponse(url, params);
      if (cached) {
        console.log('Using cached authenticated response for:', url);
        return cached;
      }
    }
    
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    
    try {
      const response = await fetch(fullUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Cache successful authenticated GET responses
      if (useCache && response.ok) {
        setCachedResponse(url, params, data);
      }
      
      return data;
    } catch (error) {
      console.error('Authenticated API GET error:', error);
      throw error;
    }
  },

  async authenticatedPost(endpoint, data = {}) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const url = `${baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Authenticated API POST error:', error);
      throw error;
    }
  },

  // Clear cache
  clearCache() {
    apiCache.clear();
  },

  // Clear specific cache entry
  clearCacheEntry(endpoint, params = {}) {
    const url = `${baseUrl}${endpoint}`;
    const cacheKey = `${url}?${new URLSearchParams(params).toString()}`;
    apiCache.delete(cacheKey);
  }
};

export default apiService;
