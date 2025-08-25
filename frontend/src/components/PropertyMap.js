import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';
import './PropertyMap.css';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const PropertyMap = ({ property, formatPrice, lat, lng, onMapClick, showMarker = false }) => {
  const [mapError, setMapError] = React.useState(false);
  const [mapLoaded, setMapLoaded] = React.useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    // Force map to invalidate size when component mounts
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 100);
    }
  }, []);

  // Determine coordinates - either from props or property object
  let coordinates = null;
  if (lat && lng) {
    coordinates = { lat: parseFloat(lat), lng: parseFloat(lng) };
  } else if (property && property.coord_x && property.coord_y) {
    coordinates = { 
      lat: parseFloat(property.coord_x), 
      lng: parseFloat(property.coord_y) 
    };
  }

  // Kiểm tra xem có tọa độ không
  if (!coordinates) {
    return (
      <div className="property-map-fallback">
        <div className="property-map-fallback-content">
          <MapPin className="h-12 w-12 mx-auto mb-2" />
          <p>Không có tọa độ bản đồ</p>
        </div>
      </div>
    );
  }

  // Kiểm tra tọa độ hợp lệ
  if (isNaN(coordinates.lat) || isNaN(coordinates.lng)) {
    return (
      <div className="property-map-fallback">
        <div className="property-map-fallback-content">
          <MapPin className="h-12 w-12 mx-auto mb-2" />
          <p>Tọa độ không hợp lệ</p>
        </div>
      </div>
    );
  }


  // Kiểm tra tọa độ hợp lệ
  if (isNaN(lat) || isNaN(lng)) {
    return (
      <div className="property-map-fallback">
        <div className="property-map-fallback-content">
          <MapPin className="h-12 w-12 mx-auto mb-2" />
          <p>Tọa độ không hợp lệ</p>
        </div>
      </div>
    );
  }

  // Handle map load error
  const handleMapError = () => {
    setMapError(true);
  };

  // Handle map load success
  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  // Show error state
  if (mapError) {
    return (
      <div className="property-map-fallback">
        <div className="property-map-fallback-content">
          <MapPin className="h-12 w-12 mx-auto mb-2" />
          <p>Lỗi tải bản đồ</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-sm text-blue-600 hover:text-blue-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="property-map-container">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Đang tải bản đồ...</p>
          </div>
        </div>
      )}
      <MapContainer
        ref={mapRef}
        center={[coordinates.lat, coordinates.lng]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        zoomControl={true}
        attributionControl={true}
        whenReady={handleMapLoad}
        onClick={onMapClick ? (e) => onMapClick(e.latlng.lat, e.latlng.lng) : undefined}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          eventHandlers={{
            error: handleMapError
          }}
        />
        {showMarker && (
          <Marker position={[coordinates.lat, coordinates.lng]}>
            <Popup>
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 text-sm">
                  {property?.title || 'Vị trí đã chọn'}
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  {property?.address || 'Tọa độ: ' + coordinates.lat.toFixed(4) + ', ' + coordinates.lng.toFixed(4)}
                </p>
                {property?.price && (
                  <p className="text-xs font-medium text-red-600 mt-1">
                    {formatPrice ? formatPrice(property.price) : property.price}
                  </p>
                )}
                {property?.area_m2 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {parseFloat(property.area_m2).toFixed(0)} m²
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
