import React, { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Compass,
  ChevronDown,
  Loader2
} from "lucide-react";
import { getPremises } from "../../../../api/permitApi";

export default function EventDetailsPage({ formData, onChange, errors = {}, showToast }) {
  const iframeRef = useRef(null);
  const [premisesList, setPremisesList] = useState([]);
  const [loadingPremises, setLoadingPremises] = useState(false);
  const [selectedPremise, setSelectedPremise] = useState(null);

  // Initialize helper states if empty
  const currentPremisesType = formData.premisesType || "";
  const currentPremiseName = formData.premiseName || "";
  const currentPremiseAddress = formData.premiseAddress || "";
  const currentLatitude = formData.latitude || "";
  const currentLongitude = formData.longitude || "";
  const currentEventType = formData.eventType || "Birthday";

  // Fetch premises from API
  useEffect(() => {
    const fetchPremises = async () => {
      setLoadingPremises(true);
      try {
        const response = await getPremises();
        console.log("Premises API Response:", response.data);
        
        // Extract the list from the response
        let premises = [];
        if (response.data && Array.isArray(response.data)) {
          premises = response.data;
        } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
          premises = response.data.data;
        } else if (response.data && response.data.result && Array.isArray(response.data.result)) {
          premises = response.data.result;
        }
        
        setPremisesList(premises);
        
        // If we have premises and formData has a premiseName, find and set it
        if (formData.premiseName && premises.length > 0) {
          const matched = premises.find(p => p.premiseName === formData.premiseName);
          if (matched) {
            setSelectedPremise(matched);
            // Auto-fill address if found
            const fullAddress = [matched.premiseAddress1, matched.premiseAddress2]
              .filter(Boolean)
              .join(", ");
            onChange("premiseAddress", fullAddress);
            onChange("venueAddress", `${matched.premiseName || ""}, ${fullAddress}`);
          }
        }
      } catch (error) {
        console.error("Failed to fetch premises:", error);
        if (showToast) showToast("Failed to load premises list", "error");
      } finally {
        setLoadingPremises(false);
      }
    };

    fetchPremises();
  }, []);

  // Update map coordinates in iframe
  const syncMapCoordinates = (lat, lng) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: "SET_MAP_COORDINATES",
          lat: lat,
          lng: lng
        },
        "*"
      );
    }
  };

  // Sync when initial values exist or premiseName is updated
  useEffect(() => {
    const timer = setTimeout(() => {
      syncMapCoordinates(currentLatitude, currentLongitude);
    }, 400);
    return () => clearTimeout(timer);
  }, [currentPremiseName, currentPremisesType]);

  // Handle messages from the leaflet map inside iframe
  useEffect(() => {
    const handleMapMessage = (event) => {
      if (event.data && event.data.type === "MAP_COORDINATES_CHANGED") {
        onChange("latitude", event.data.lat);
        onChange("longitude", event.data.lng);
      }
    };
    window.addEventListener("message", handleMapMessage);
    return () => window.removeEventListener("message", handleMapMessage);
  }, [onChange]);

  // Handler for premises type radio selection
  const handlePremisesTypeChange = (value) => {
    onChange("premisesType", value);
    
    // Synced with existing schema's venueCategory
    let category = "Hotel/Resort";
    if (value === "Banquet Hall/Party Hall") category = "Banquet Hall";
    if (value === "Farmhouse") category = "Farmhouse";
    if (value === "Others") category = "Private Residence";
    onChange("venueCategory", category);

    // Reset fields
    onChange("premiseName", "");
    onChange("premiseAddress", "");
    onChange("venueAddress", "");
    onChange("latitude", "28.6139");
    onChange("longitude", "77.2090");
    setSelectedPremise(null);
    syncMapCoordinates("28.6139", "77.2090");
  };

  // Handler for premise selection from dropdown
  const handlePremiseSelect = (premise) => {
    if (!premise) {
      onChange("premiseName", "");
      onChange("premiseAddress", "");
      onChange("venueAddress", "");
      setSelectedPremise(null);
      return;
    }

    setSelectedPremise(premise);
    onChange("premiseName", premise.premiseName || "");
    
    // Concatenate PremiseAddress1 and PremiseAddress2
    const fullAddress = [premise.premiseAddress1, premise.premiseAddress2]
      .filter(Boolean)
      .join(", ");
    
    onChange("premiseAddress", fullAddress);
    onChange("venueAddress", `${premise.premiseName || ""}, ${fullAddress}`);
    
    // If latitude and longitude are available from the API
    if (premise.latitude && premise.longitude) {
      onChange("latitude", premise.latitude);
      onChange("longitude", premise.longitude);
      syncMapCoordinates(premise.latitude, premise.longitude);
    }
  };

  // Free-text handler used only when Premises Type is "Others"
  const handlePremiseNameTextChange = (name) => {
    onChange("premiseName", name);
    onChange(
      "venueAddress",
      currentPremiseAddress ? `${name}, ${currentPremiseAddress}` : name
    );
  };

  // Free-text handler used only when Premises Type is "Others"
  const handlePremiseAddressTextChange = (address) => {
    onChange("premiseAddress", address);
    onChange(
      "venueAddress",
      currentPremiseName ? `${currentPremiseName}, ${address}` : address
    );
  };

  // Event Type handler
  const handleEventTypeChange = (value) => {
    onChange("eventType", value);
    onChange("occasionName", `${value} Special Reception Event`);
  };

  // Auto-fill End Time as Start Time + 6 hours, capped at midnight (23:59)
  const calculateAutoEndTime = (startTimeValue) => {
    if (!startTimeValue) return "";

    const [hours, minutes] = startTimeValue.split(":").map(Number);
    const startMinutes = hours * 60 + minutes;
    const sixHoursLater = startMinutes + 6 * 60;

    const cappedMinutes = Math.min(sixHoursLater, 23 * 60 + 59);

    const endHours = Math.floor(cappedMinutes / 60);
    const endMins = cappedMinutes % 60;

    return `${String(endHours).padStart(2, "0")}:${String(endMins).padStart(2, "0")}`;
  };

  const handleStartTimeChange = (value) => {
    onChange("startTime", value);
    onChange("endTime", calculateAutoEndTime(value));
  };

  // Map Iframe content
  const mapSrcDoc = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body, html, #map { margin: 0; padding: 0; width: 100%; height: 100%; font-family: sans-serif; overflow: hidden; }
        .leaflet-control-zoom { border: 2px solid rgba(0,0,0,0.2) !important; border-radius: 4px !important; }
        .logo-attribution { display: none; }
      </style>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map', {
          zoomControl: true,
          attributionControl: false
        }).setView([28.6139, 77.2090], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        var marker = L.marker([28.6139, 77.2090], {
          draggable: true
        }).addTo(map);

        function notifyParent(lat, lng) {
          window.parent.postMessage({
            type: 'MAP_COORDINATES_CHANGED',
            lat: lat.toFixed(6),
            lng: lng.toFixed(6)
          }, '*');
        }

        marker.on('dragend', function (e) {
          var position = marker.getLatLng();
          notifyParent(position.lat, position.lng);
        });

        map.on('click', function (e) {
          marker.setLatLng(e.latlng);
          notifyParent(e.latlng.lat, e.latlng.lng);
        });

        window.addEventListener('message', function(event) {
          if (event.data && event.data.type === 'SET_MAP_COORDINATES') {
            var lat = parseFloat(event.data.lat);
            var lng = parseFloat(event.data.lng);
            if (!isNaN(lat) && !isNaN(lng)) {
              marker.setLatLng([lat, lng]);
              map.setView([lat, lng], 14);
            }
          }
        });
      </script>
    </body>
    </html>
  `;

  // Filter premises by selected type
  const getFilteredPremises = () => {
    if (!currentPremisesType || currentPremisesType === "Others") {
      return [];
    }
    
    // Filter based on PremiseType
    return premisesList.filter(p => {
      if (currentPremisesType === "Banquet Hall/Party Hall") {
        return p.premiseType && p.premiseType.toLowerCase() === "banquet";
      }
      if (currentPremisesType === "Farmhouse") {
        return p.premiseType && p.premiseType.toLowerCase() === "farm";
      }
      return false;
    });
  };

  const filteredPremises = getFilteredPremises();
  const isOthers = currentPremisesType === "Others";

  // Only these three options
  const PREMISE_OPTIONS = [
    "Banquet Hall/Party Hall",
    "Farmhouse",
    "Others"
  ];

  return (
    <div className="event-details-wrapper">
      {/* Dynamic Centered Sub-Header matches the Image blueprint */}
      <div className="event-details-banner">
        Event Details
      </div>

      <div className="event-details-content">
        {/* 1. Premises Type Container */}
        <div>
          <label className="event-field-label">
            Premises Type <span className="event-required-star">*</span>
          </label>
          <div className="event-radio-group">
            {[
              "Banquet Hall/Party Hall",
              "Farmhouse",
              "MCD Park/Community Hall",
              "Own Residence"
            ].map((option) => (
              <label
                key={option}
                className="event-radio-label"
              >
                <input
                  type="radio"
                  name="premisesType"
                  value={option}
                  checked={currentPremisesType === option}
                  onChange={() => handlePremisesTypeChange(option)}
                  className="event-radio-input"
                />
                <span>{type}</span>
              </label>
            ))}
            
            {loadingPremises && <Loader2 className="w-4 h-4 animate-spin text-blue-500 ml-2" />}
          </div>
        </div>

        {/* 2. Premise Name and Premise Address Grid */}
        <div className="event-grid-2">
          {/* Premise Name Dropdown */}
          <div className="event-field-item">
            <label className="event-field-label">
              Premise Name <span className="event-required-star">*</span>
            </label>
            <div className="event-select-wrapper">
              <select
                value={currentPremiseName}
                onChange={(e) => handlePremiseNameChange(e.target.value)}
                className={`event-select-input ${
                  errors.premiseName ? "event-input-error" : ""
                }`}
              >
                <option value="">--Select--</option>
                {premiseOptions.map((opt) => (
                  <option key={opt.name} value={opt.name}>
                    {opt.name}
                  </option>
                ))}
              </select>
              <div className="event-select-icon-wrap">
                <ChevronDown style={{ width: '1rem', height: '1rem', color: '#94a3b8' }} />
              </div>
            )}
            {errors.premiseName && (
              <p className="event-error-text">{errors.premiseName}</p>
            )}
          </div>

          {/* Premise Address Dropdown / text */}
          <div className="event-field-item">
            <label className="event-field-label">
              Premise Address <span className="event-required-star">*</span>
            </label>
            <div className="event-select-wrapper">
              <select
                value={currentPremiseAddress}
                onChange={(e) => handlePremiseAddressChange(e.target.value)}
                className={`event-select-input ${
                  errors.venueAddress ? "event-input-error" : ""
                }`}
              >
                <option value="">--Select--</option>
                {currentPremiseAddress && (
                  <option value={currentPremiseAddress}>{currentPremiseAddress}</option>
                )}
                {premiseOptions
                  .filter((p) => p.address !== currentPremiseAddress)
                  .map((opt) => (
                    <option key={opt.address} value={opt.address}>
                      {opt.address}
                    </option>
                  ))}
              </select>
              <div className="event-select-icon-wrap">
                <ChevronDown style={{ width: '1rem', height: '1rem', color: '#94a3b8' }} />
              </div>
            </div>
            {errors.venueAddress && (
              <p className="event-error-text">{errors.venueAddress}</p>
            )}
          </div>
        </div>
<br />

        {/* 3. Fully Interactive Live Leaflet Map Container */}
        <div className="event-field-item">
          <div className="event-map-container">
            <iframe
              ref={iframeRef}
              title="Excise Event Venue GIS Map Service"
              srcDoc={mapSrcDoc}
              className="event-map-iframe"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>

        {/* 4. Latitude & Longitude Input Fields side-by-side */}
        <div className="event-grid-2">
          <div className="event-field-item">
            <label className="event-field-label">
              Latitude <span className="event-required-star">*</span>
            </label>
            <input
              type="text"
              readOnly
              value={currentLatitude}
              className="event-readonly-input"
              placeholder="e.g. 28.613900"
            />
          </div>

          <div className="event-field-item">
            <label className="event-field-label">
              Longitude <span className="event-required-star">*</span>
            </label>
            <input
              type="text"
              readOnly
              value={currentLongitude}
              className="event-readonly-input"
              placeholder="e.g. 77.209000"
            />
          </div>
        </div>

        {/* 5. Event Type Container */}
        <div>
          <label className="event-field-label">
            Event Type <span className="event-required-star">*</span>
          </label>
          <div className="event-radio-group">
            {["Marriage", "Birthday", "Party", "Other"].map((option) => (
              <label
                key={option}
                className="event-radio-label"
              >
                <input
                  type="radio"
                  name="eventType"
                  value={option}
                  checked={currentEventType === option}
                  onChange={() => handleEventTypeChange(option)}
                  className="event-radio-input"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 6. Four Column Inputs: No. of Guests, Start Date, Start Time, End Time */}
        <div className="event-grid-4">
          {/* No. of Guests */}
          <div className="event-field-item">
            <label className="event-field-label">
              No. of Guests <span className="event-required-star">*</span>
            </label>
            <div className="event-input-wrapper">
              <input
                type="number"
                value={formData.estimatedGuests || ""}
                onChange={(e) => onChange("estimatedGuests", e.target.value)}
                className={`event-input ${
                  errors.estimatedGuests ? "event-input-error" : ""
                }`}
                placeholder="No. of Guests"
              />
            </div>
            {errors.estimatedGuests && (
              <p className="event-error-text">{errors.estimatedGuests}</p>
            )}
          </div>

          {/* Start Date of Event */}
          <div className="event-field-item">
            <label className="event-field-label">
              Start Date of Event <span className="event-required-star">*</span>
            </label>
            <div className="event-input-wrapper">
              <input
                type="date"
                value={formData.servingStartDate || ""}
                onChange={(e) => {
                  onChange("servingStartDate", e.target.value);
                  onChange("servingEndDate", e.target.value);
                }}
                className={`event-input event-input-has-icon ${
                  errors.servingStartDate ? "event-input-error" : ""
                }`}
              />
              <div className="event-input-icon-wrap">
                <Calendar style={{ width: '1rem', height: '1rem', color: '#94a3b8' }} />
              </div>
            </div>
            {errors.servingStartDate && (
              <p className="event-error-text">{errors.servingStartDate}</p>
            )}
          </div>

          {/* Event Start Time */}
          <div className="event-field-item">
            <label className="event-field-label">
              Event Start Time <span className="event-required-star">*</span>
            </label>
            <div className="event-input-wrapper">
              <input
                type="time"
                value={formData.startTime || ""}
                onChange={(e) => onChange("startTime", e.target.value)}
                className={`event-input event-input-has-icon ${
                  errors.startTime ? "event-input-error" : ""
                }`}
              />
              <div className="event-input-icon-wrap">
                <Clock style={{ width: '1rem', height: '1rem', color: '#94a3b8' }} />
              </div>
            </div>
            {errors.startTime && (
              <p className="event-error-text">{errors.startTime}</p>
            )}
          </div>

          {/* Event End Time */}
          <div className="event-field-item">
            <label className="event-field-label">
              Event End Time <span className="event-required-star">*</span>
            </label>
            <div className="event-input-wrapper">
              <input
                type="time"
                value={formData.endTime || ""}
                onChange={(e) => onChange("endTime", e.target.value)}
                className={`event-input event-input-has-icon ${
                  errors.endTime ? "event-input-error" : ""
                }`}
              />
              <div className="event-input-icon-wrap">
                <Clock style={{ width: '1rem', height: '1rem', color: '#94a3b8' }} />
              </div>
            </div>
            {errors.endTime && (
              <p className="event-error-text">{errors.endTime}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}