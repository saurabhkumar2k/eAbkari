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
    <div className="space-y-6 animate-fade">
      {/* Dynamic Centered Sub-Header */}
      <div className="w-full bg-[#0a3861] text-white py-2.5 px-4 text-center text-sm font-black rounded-lg select-none uppercase tracking-wider mb-2">
        Event Details
      </div>

      <div className="space-y-5 text-left">
        {/* 1. Premises Type Container */}
        <div>
          <label className="text-xs font-bold text-slate-700 flex items-center mb-1.5">
            Premises Type <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="w-full border border-slate-200/80 rounded-xl p-3 bg-[#fdfdfd] flex flex-wrap gap-5 sm:gap-8 items-center">
            {/* Only three options: Banquet Hall/Party Hall, Farmhouse, Others */}
            {PREMISE_OPTIONS.map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer text-slate-750 text-xs font-bold select-none"
              >
                <input
                  type="radio"
                  name="premisesType"
                  value={type}
                  checked={currentPremisesType === type}
                  onChange={() => handlePremisesTypeChange(type)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer accent-blue-600"
                />
                <span>{type}</span>
              </label>
            ))}
            
            {loadingPremises && <Loader2 className="w-4 h-4 animate-spin text-blue-500 ml-2" />}
          </div>
        </div>

        {/* 2. Premise Name and Premise Address Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Premise Name Dropdown / Text Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Premise Name <span className="text-red-500">*</span>
            </label>
            {isOthers ? (
              <input
                type="text"
                value={currentPremiseName}
                onChange={(e) => handlePremiseNameTextChange(e.target.value)}
                placeholder="Enter premise name"
                className={`w-full bg-slate-50/50 border rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 transition ${
                  errors.premiseName ? "border-red-500 bg-red-50/10" : "border-slate-250 focus:border-blue-500 focus:bg-white"
                }`}
              />
            ) : (
              <div className="relative">
                <select
                  value={currentPremiseName}
                  onChange={(e) => {
                    const selected = filteredPremises.find(p => p.premiseName === e.target.value);
                    handlePremiseSelect(selected);
                  }}
                  className={`w-full bg-slate-50/50 border rounded-xl pl-4 pr-10 py-2.5 text-xs sm:text-sm font-bold text-slate-800 transition appearance-none cursor-pointer ${
                    errors.premiseName ? "border-red-500 bg-red-50/10" : "border-slate-250 focus:border-blue-500 focus:bg-white"
                  }`}
                  disabled={loadingPremises || !currentPremisesType || currentPremisesType === "Others" || filteredPremises.length === 0}
                >
                  <option value="">--Select Premise--</option>
                  {filteredPremises.map((premise, index) => (
                    <option 
                      key={`${premise.premiseId || 'premise'}-${index}`} 
                      value={premise.premiseName}
                    >
                      {premise.premiseName}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {loadingPremises ? (
                    <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                {!loadingPremises && filteredPremises.length === 0 && currentPremisesType && currentPremisesType !== "Others" && (
                  <p className="text-[10px] text-amber-600 mt-1">No premises found for this type</p>
                )}
              </div>
            )}
            {errors.premiseName && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.premiseName}</p>
            )}
          </div>

          {/* Premise Address - Auto-filled from selection or text input for Others */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Premise Address <span className="text-red-500">*</span>
            </label>
            {isOthers ? (
              <input
                type="text"
                value={currentPremiseAddress}
                onChange={(e) => handlePremiseAddressTextChange(e.target.value)}
                placeholder="Enter full premise address"
                className={`w-full bg-slate-50/50 border rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 transition ${
                  errors.venueAddress ? "border-red-500 bg-red-50/10" : "border-slate-250 focus:border-blue-500 focus:bg-white"
                }`}
              />
            ) : (
              <input
                type="text"
                value={currentPremiseAddress}
                readOnly
                placeholder="Address will auto-fill"
                className={`w-full bg-slate-100/80 border rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-600 outline-none select-all ${
                  errors.venueAddress ? "border-red-500 bg-red-50/10" : "border-slate-250"
                }`}
              />
            )}
            {errors.venueAddress && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.venueAddress}</p>
            )}
          </div>
        </div>
<br />

        {/* 3. Fully Interactive Live Leaflet Map Container */}
        <div className="space-y-1">
          <div className="w-full h-[280px] sm:h-[340px] rounded-2xl overflow-hidden border-2 border-slate-200/80 shadow-md relative bg-slate-100">
            <iframe
              ref={iframeRef}
              title="Excise Event Venue GIS Map Service"
              srcDoc={mapSrcDoc}
              className="w-full h-full border-0 block"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>

        {/* 4. Latitude & Longitude Input Fields side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Latitude <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              readOnly
              value={currentLatitude}
              className="w-full bg-slate-100/80 border border-slate-250 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono font-bold text-slate-600 outline-none select-all"
              placeholder="e.g. 28.613900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Longitude <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              readOnly
              value={currentLongitude}
              className="w-full bg-slate-100/80 border border-slate-250 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono font-bold text-slate-600 outline-none select-all"
              placeholder="e.g. 77.209000"
            />
          </div>
        </div>

        {/* 5. Event Type Container */}
        <div>
          <label className="text-xs font-bold text-slate-700 flex items-center mb-1.5">
            Event Type <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="w-full border border-slate-200/80 rounded-xl p-3 bg-[#fdfdfd] flex flex-wrap gap-5 sm:gap-8 items-center">
            {["Marriage", "Birthday", "Party", "Other"].map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 cursor-pointer text-slate-750 text-xs font-bold select-none"
              >
                <input
                  type="radio"
                  name="eventType"
                  value={option}
                  checked={currentEventType === option}
                  onChange={() => handleEventTypeChange(option)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer accent-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 6. Four Column Inputs: No. of Guests, Start Date, Start Time, End Time */}
        <div className="grid grid-cols-4 gap-4">
          {/* No. of Guests */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              No. of Guests <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.estimatedGuests || ""}
                onChange={(e) => onChange("estimatedGuests", e.target.value)}
                className={`w-full bg-slate-50/50 border rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 transition ${
                  errors.estimatedGuests ? "border-red-500 bg-red-50/10" : "border-slate-250 focus:border-blue-500 focus:bg-white"
                }`}
                placeholder="No. of Guests"
              />
            </div>
            {errors.estimatedGuests && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.estimatedGuests}</p>
            )}
          </div>

          {/* Start Date of Event */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Start Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.servingStartDate || ""}
                onChange={(e) => {
                  onChange("servingStartDate", e.target.value);
                  onChange("servingEndDate", e.target.value);
                }}
                className={`w-full bg-slate-50/50 border rounded-xl pl-4 pr-10 py-2.5 text-xs sm:text-sm font-bold text-slate-800 transition ${
                  errors.servingStartDate ? "border-red-500 bg-red-50/10" : "border-slate-250 focus:border-blue-500 focus:bg-white"
                }`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Calendar className="w-4 h-4 text-slate-400" />
              </div>
            </div>
            {errors.servingStartDate && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.servingStartDate}</p>
            )}
          </div>

          {/* Event Start Time */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Start Time <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="time"
                value={formData.startTime || ""}
                onChange={(e) => handleStartTimeChange(e.target.value)}
                className={`w-full bg-slate-50/50 border rounded-xl pl-4 pr-10 py-2.5 text-xs sm:text-sm font-bold text-slate-800 transition ${
                  errors.startTime ? "border-red-500 bg-red-50/10" : "border-slate-250 focus:border-blue-500 focus:bg-white"
                }`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Clock className="w-4 h-4 text-slate-400" />
              </div>
            </div>
            {errors.startTime && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.startTime}</p>
            )}
          </div>

          {/* Event End Time */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              End Time <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="time"
                value={formData.endTime || ""}
                onChange={(e) => onChange("endTime", e.target.value)}
                className={`w-full bg-slate-50/50 border rounded-xl pl-4 pr-10 py-2.5 text-xs sm:text-sm font-bold text-slate-800 transition ${
                  errors.endTime ? "border-red-500 bg-red-50/10" : "border-slate-350 focus:border-blue-500 focus:bg-white"
                }`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Clock className="w-4 h-4 text-slate-400" />
              </div>
            </div>
            {errors.endTime && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.endTime}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}