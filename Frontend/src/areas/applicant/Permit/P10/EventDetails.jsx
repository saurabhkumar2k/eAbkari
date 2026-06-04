import React, { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Compass,
  ChevronDown
} from "lucide-react";

// Premise Options & Addresses for Delhi
const PREMISE_DATA = {
  "Banquet Hall/Party Hall": [
    {
      name: "The Leela Ambience Banquet",
      address: "NH 8, Ambience Island, DLF Phase 3, Delhi NCR 122002",
      lat: "28.5035",
      lng: "77.0975"
    },
    {
      name: "Seven Heaven Banquets",
      address: "A-53, West Shivaji Marg, Shivaji Place, Kirti Nagar, New Delhi 110015",
      lat: "28.6496",
      lng: "77.1211"
    },
    {
      name: "Golden Tulip Banquet",
      address: "Sector 2, Vasundhara, Delhi Border, Ghaziabad 201012",
      lat: "28.6601",
      lng: "77.3415"
    }
  ],
  "Farmhouse": [
    {
      name: "Tivoli Garden Resort & Farm",
      address: "Chattarpur Mandir Road, Chhattarpur Hills, New Delhi 110074",
      lat: "28.4975",
      lng: "77.1812"
    },
    {
      name: "The Kundan Farmhouse",
      address: "Kapashera Estate, Opp Petrol Pump, Kapashera, New Delhi 110037",
      lat: "28.5284",
      lng: "77.0851"
    },
    {
      name: "Radiance Motel & Orchards",
      address: "2, Tania Farm, Chattarpur Mandir Road, Chhattarpur, New Delhi 110074",
      lat: "28.4921",
      lng: "77.1793"
    }
  ],
  "MCD Park/Community Hall": [
    {
      name: "MCD Community Park, Saket",
      address: "J-Block Community Ground, Saket, New Delhi 110017",
      lat: "28.5222",
      lng: "77.2144"
    },
    {
      name: "GK-2 Community Center Hall",
      address: "M-Block Market Road, Greater Kailash II, New Delhi 110048",
      lat: "28.5342",
      lng: "77.2421"
    }
  ],
  "Own Residence": [
    {
      name: "Private Home Terrace, Vasant Vihar",
      address: "C-4, Vasant Vihar Lawns, New Delhi 110057",
      lat: "28.5612",
      lng: "77.1610"
    },
    {
      name: "Rooftop Duplex, Rajouri Garden",
      address: "J-12, Main Ring Road, Rajouri Garden, New Delhi 115027",
      lat: "28.6415",
      lng: "77.1215"
    }
  ]
};

export default function EventDetailsPage({ formData, onChange, errors = {} }) {
  const iframeRef = useRef(null);

  // Initialize helper states if empty
  const currentPremisesType = formData.premisesType || "Farmhouse";
  const currentPremiseName = formData.premiseName || "";
  const currentPremiseAddress = formData.premiseAddress || "";
  const currentLatitude = formData.latitude || "28.5284";
  const currentLongitude = formData.longitude || "77.1643";
  const currentEventType = formData.eventType || "Birthday";

  const premiseOptions = PREMISE_DATA[currentPremisesType] || [];

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
    if (value === "MCD Park/Community Hall") category = "Club/Association";
    if (value === "Own Residence") category = "Private Residence";
    onChange("venueCategory", category);

    // Reset fields for the new group
    onChange("premiseName", "");
    onChange("premiseAddress", "");
    onChange("venueAddress", "");
    onChange("latitude", "28.6139");
    onChange("longitude", "77.2090");
    syncMapCoordinates("28.6139", "77.2090");
  };

  // Handler for premise name selection dropdown
  const handlePremiseNameChange = (name) => {
    onChange("premiseName", name);
    const matched = premiseOptions.find((p) => p.name === name);
    if (matched) {
      onChange("premiseAddress", matched.address);
      onChange("venueAddress", `${matched.name}, ${matched.address}`);
      onChange("latitude", matched.lat);
      onChange("longitude", matched.lng);
      syncMapCoordinates(matched.lat, matched.lng);
    } else {
      onChange("premiseAddress", "");
      onChange("venueAddress", "");
      onChange("latitude", "28.6139");
      onChange("longitude", "77.2090");
      syncMapCoordinates("28.6139", "77.2090");
    }
  };

  // Premise Address select / text handler
  const handlePremiseAddressChange = (address) => {
    onChange("premiseAddress", address);
    onChange("venueAddress", currentPremiseName ? `${currentPremiseName}, ${address}` : address);
  };

  // Event Type handler
  const handleEventTypeChange = (value) => {
    onChange("eventType", value);
    // Sync with existing occasionName parameter
    onChange("occasionName", `${value} Special Reception Event`);
  };

  // Map Iframe content via safe and fast srcdoc
  const mapSrcDoc = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body, html, #map { margin: 0; padding: 0; width: 100%; height: 100%; font-family: sans-serif; overflow: hidden; }
        /* Map styling */
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

  return (
    <div className="space-y-6 animate-fade">
      {/* Dynamic Centered Sub-Header matches the Image blueprint */}
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
            {[
              "Banquet Hall/Party Hall",
              "Farmhouse",
              "MCD Park/Community Hall",
              "Own Residence"
            ].map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 cursor-pointer text-slate-750 text-xs font-bold select-none"
              >
                <input
                  type="radio"
                  name="premisesType"
                  value={option}
                  checked={currentPremisesType === option}
                  onChange={() => handlePremisesTypeChange(option)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer accent-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 2. Premise Name and Premise Address Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Premise Name Dropdown */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Premise Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={currentPremiseName}
                onChange={(e) => handlePremiseNameChange(e.target.value)}
                className={`w-full bg-slate-50/50 border rounded-xl pl-4 pr-10 py-2.5 text-xs sm:text-sm font-bold text-slate-800 transition appearance-none cursor-pointer ${
                  errors.premiseName ? "border-red-500 bg-red-50/10" : "border-slate-250 focus:border-blue-500 focus:bg-white"
                }`}
              >
                <option value="">--Select--</option>
                {premiseOptions.map((opt) => (
                  <option key={opt.name} value={opt.name}>
                    {opt.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
            </div>
            {errors.premiseName && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.premiseName}</p>
            )}
          </div>

          {/* Premise Address Dropdown / text */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Premise Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={currentPremiseAddress}
                onChange={(e) => handlePremiseAddressChange(e.target.value)}
                className={`w-full bg-slate-50/50 border rounded-xl pl-4 pr-10 py-2.5 text-xs sm:text-sm font-bold text-slate-800 transition appearance-none cursor-pointer ${
                  errors.venueAddress ? "border-red-500 bg-red-50/10" : "border-slate-250 focus:border-blue-500 focus:bg-white"
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
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
            </div>
            {errors.venueAddress && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{errors.venueAddress}</p>
            )}
          </div>
        </div>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
              Start Date of Event <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.servingStartDate || ""}
                onChange={(e) => {
                  onChange("servingStartDate", e.target.value);
                  onChange("servingEndDate", e.target.value); // keep in sync
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
              Event Start Time <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="time"
                value={formData.startTime || ""}
                onChange={(e) => onChange("startTime", e.target.value)}
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
              Event End Time <span className="text-red-500">*</span>
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
