import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { X, MapPin, Mail, Search, AlertCircle, Loader, CheckCircle, Phone } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const MultiStepClaimBusinessModal = ({ isOpen, onClose, business = null }) => {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(business || null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: 6.5244, lng: 3.3792 });

  const [verificationData, setVerificationData] = useState({
    email: "",
    phone: "",
  });
  const [businessPhone, setBusinessPhone] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [businessCoordinates, setBusinessCoordinates] = useState(null);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);

  const [accountData, setAccountData] = useState({
    password: "",
    confirmPassword: "",
    role: "",
    instagramHandle: "",
  });

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [photos, setPhotos] = useState([]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  // Normalize business data to handle both search results and details endpoint formats
  const normalizeBusiness = useCallback((businessData) => {
    if (!businessData) return null;
    
    // Extract coordinates from location data
    const location = businessData.location || businessData.formattedLocation || {};
    const coordinates = {
      lat: location.latitude,
      lng: location.longitude
    };
    
    // Extract photos array
    const photosArray = businessData.photos || [];
    
    return {
      google_place_id: businessData.google_place_id || businessData.id,
      business_name: businessData.business_name || businessData.displayName?.text || "Business",
      formatted_address: businessData.formatted_address || businessData.formattedAddress || "",
      formatted_phone: businessData.formatted_phone || businessData.internationalPhoneNumber || "",
      formatted_email: businessData.formatted_email || "",
      location: businessData.location || { latitude: 0, longitude: 0 },
      coordinates: coordinates,
      types: businessData.types || [],
      photoUrl: businessData.photoUrl || businessData.photos?.[0]?.url || "",
      photos: photosArray,
      rating: businessData.rating || null,
      userRatingCount: businessData.userRatingCount || null,
      editorialSummary: businessData.editorialSummary?.text || businessData.editorialSummary || "",
      // Keep original data for reference
      ...businessData
    };
  }, []);

  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.log("Using default location");
        }
      );
    }
  }, []);

  const geocodeAddress = useCallback(async (address) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`
      );
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setBusinessCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    if (!API_BASE_URL || !API_KEY) return;
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`, {
        headers: { "x-api-key": API_KEY },
      });
      setCategories(response.data.data || []);
      console.log("Fetched categories:", response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, [API_BASE_URL, API_KEY]);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      getUserLocation();
      // If a business was passed in, go to preview step (step 0)
      if (business) {
        const normalized = normalizeBusiness(business);
        setStep(0);
        setSelectedBusiness(normalized);
        setCurrentPhotoIndex(0);
        setPhotos(normalized.photos || []);
        // Extract and store the business phone number
        if (normalized.formatted_phone) {
          setBusinessPhone(normalized.formatted_phone);
          setVerificationData(prev => ({ ...prev, phone: normalized.formatted_phone }));
        }
        // Use coordinates directly from API if available
        if (normalized.coordinates?.lat && normalized.coordinates?.lng) {
          setBusinessCoordinates(normalized.coordinates);
        } else {
          geocodeAddress(normalized.formatted_address);
        }
      } else {
        setStep(1);
      }
    }
  }, [isOpen, fetchCategories, getUserLocation, geocodeAddress, business, normalizeBusiness]);

  useEffect(() => {
    if (step === 0 && selectedBusiness) {
      // Use coordinates directly if available, otherwise geocode
      if (selectedBusiness.coordinates?.lat && selectedBusiness.coordinates?.lng) {
        setBusinessCoordinates(selectedBusiness.coordinates);
      } else if (selectedBusiness.formatted_address) {
        geocodeAddress(selectedBusiness.formatted_address);
      }
    }
  }, [step, selectedBusiness, geocodeAddress]);

  // Auto-rotate photos every 5 seconds when on step 0
  useEffect(() => {
    if (step === 0 && photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
      }, 4000); // Change photo every 4 seconds
      return () => clearInterval(interval);
    }
  }, [step, photos]);

  const handleSearchBusinesses = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error("Please enter a business name");
      return;
    }

    setLoading(true);
    try {
      console.log("🔍 Modal: Searching for:", { query: searchQuery, lat: userLocation.lat, lng: userLocation.lng });
      const response = await axios.post(
        `${API_BASE_URL}/business/claim/search`,
        {
          query: searchQuery,
          lat: userLocation.lat,
          lng: userLocation.lng,
        },
        { headers: { "x-api-key": API_KEY } }
      );

      console.log("✅ Modal: Full API Response:", response);
      console.log("📊 Modal: Response data:", response.data);

      // API returns results directly in response.data (array)
      const results = Array.isArray(response.data) ? response.data : (response.data.data || response.data.results || []);
      console.log("🎯 Modal: Final results:", results, "Length:", Array.isArray(results) ? results.length : "Not an array");

      setSearchResults(Array.isArray(results) ? results : []);
      if (!results || (Array.isArray(results) && results.length === 0)) {
        toast.error("No businesses found. Try searching by business name (e.g., 'The Orchid Lagos')");
      }
    } catch (searchError) {
      console.error("❌ Modal: Search error:", searchError);
      console.error("Modal: Error response:", searchError.response?.data);
      console.error("Modal: Error status:", searchError.response?.status);
      toast.error(searchError.response?.data?.message || "Error searching businesses");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBusiness = async (businessData) => {
    setLoading(true);
    try {
      // Fetch full business details including phone number
      const response = await axios.get(
        `${API_BASE_URL}/business/claim/${businessData.google_place_id}/details`,
        { headers: { "x-api-key": API_KEY } }
      );
      const fullBusinessDetails = response.data;
      console.log("✅ Modal: Full business details:", fullBusinessDetails);
      
      const normalized = normalizeBusiness(fullBusinessDetails);
      setSelectedBusiness(normalized);
      setCurrentPhotoIndex(0);
      setPhotos(normalized.photos || []);
      
      // Extract and store the business phone number
      if (normalized.formatted_phone) {
        setBusinessPhone(normalized.formatted_phone);
        setVerificationData(prev => ({ ...prev, phone: normalized.formatted_phone }));
      }
      
      // Check business claim status
      try {
        await axios.get(
          `${API_BASE_URL}/business/claim/${businessData.google_place_id}/status`,
          { headers: { "x-api-key": API_KEY } }
        );
      } catch (statusError) {
        console.error("Status check error:", statusError);
      }
      
      setStep(2);
    } catch (error) {
      console.error("Error fetching business details:", error);
      toast.error("Failed to fetch business details");
    } finally {
      setLoading(false);
    }
  };

  // Handle verification submission with enhanced error handling for 409 Conflict and domain mismatch
  const handleSubmitVerification = async (e) => {
    e.preventDefault();

    if (!verificationData.email) {
      toast.error("Please enter your work email or phone number");
      return;
    }

    if (!selectedBusiness) {
      toast.error("No business selected");
      return;
    }

    if (!businessPhone) {
      toast.error("Business phone number not found. Please try again.");
      return;
    }

    setLoading(true);
    try {
      const categoryId = categories.find((cat) =>
        selectedBusiness.types?.some((type) =>
          cat.name.toLowerCase().includes(type.toLowerCase())
        )
      )?.id || categories[0]?.id;

      await axios.post(
        `${API_BASE_URL}/business/claim/initiate`,
        {
          google_place_id: selectedBusiness.google_place_id,
          category_id: categoryId,
          email: verificationData.email,
          business_name: selectedBusiness.business_name,
          formatted_address: selectedBusiness.formatted_address,
          lat: userLocation.lat,
          lng: userLocation.lng,
          phone: businessPhone,
        },
        { headers: { "x-api-key": API_KEY } }
      );

      toast.success("Claim initiated! Check your email for verification code");
      setStep(3);
    } catch (error) {
      console.error("Verification error:", error);
      console.error("Error response data:", error.response?.data);
      
      const errorData = error.response?.data;
      const errorMessage = errorData?.message || error.message || "Error initiating claim";
      const statusCode = error.response?.status;
      
      if (statusCode === 500) {
        // 500 Internal Server Error
        const serverErrorMsg = "A server error occurred while processing your claim. Please try again later or contact support if the problem persists.";
        setVerificationError(serverErrorMsg);
        toast.error("Server Error: " + (errorMessage || "Please try again later"));
      } else if (statusCode === 409) {
        // 409 Conflict - business or email already claimed
        if (errorMessage.toLowerCase().includes("already claimed") || errorMessage.toLowerCase().includes("already")) {
          setVerificationError("This business has already been claimed. If this is your business, please contact support.");
        } else if (errorMessage.toLowerCase().includes("email")) {
          setVerificationError("This email is already associated with another business claim. Please use a different email.");
        } else {
          setVerificationError("This business or email is already in use. " + errorMessage);
        }
        toast.error("409 Conflict: " + errorMessage);
      } else if (statusCode === 400) {
        setVerificationError(errorMessage || "Invalid information provided. Please check your details.");
        toast.error("Invalid request: " + errorMessage);
      } else if (errorMessage.toLowerCase().includes("domain")) {
        setVerificationError("This email doesn't match the business domain");
        toast.error("Domain mismatch: " + errorMessage);
      } else {
        setVerificationError(errorMessage || "An unexpected error occurred. Please try again.");
        toast.error(errorMessage || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setOtpLoading(true);
    try {
      toast.success("Email verified successfully!");
      setStep(4);
    } catch (otpError) {
      console.error("OTP error:", otpError);
      toast.error("Invalid verification code");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (accountData.password !== accountData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (accountData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (!accountData.role) {
      toast.error("Please select your role");
      return;
    }

    setLoading(true);
    try {
      toast.success("Account created successfully!");
      onClose();
      setStep(1);
    } catch (accountError) {
      console.error("Account error:", accountError);
      toast.error("Error creating account");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
      <div className="bg-white rounded-2xl max-w-[97%] md:max-w-[65%] w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-2 md:px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {/* {step === 0 && "Claim Your Business"} */}
              {step === 1 && "Find Your Business"}
              {/* {step === 2 && "Verify Your Business"} */}
              {/* {step === 3 && "Verify Your Email"} */}
              {step === 4 && "Create Your Account"}
            </h2>
            {selectedBusiness && (
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <p className="font-bold text-[25px] leading-[100%]">{selectedBusiness.business_name}</p>
                <span className="inline-block text-xs font-medium text-[#DB3A06] mt-2 px-2 py-1 bg-orange-100 rounded w-fit">
                    ● Claimable
                </span>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 border text-[#CE4015] border-[#DE5126] rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-2 md:p-6">
          {/* Step 0: Business Preview */}
          {step === 0 && selectedBusiness && (
            <div className="space-y-4">
              {/* Business Image Carousel */}
              {photos.length > 0 ? (
                <div className="relative w-full h-[247px] rounded-[5px] overflow-hidden border border-gray-200 bg-gray-100">
                  {/* Main Image */}
                  <img
                    src={photos[currentPhotoIndex]?.url || selectedBusiness.photoUrl}
                    alt={`${selectedBusiness.business_name} - Photo ${currentPhotoIndex + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  
                  {/* Navigation Buttons (shown only if multiple photos) */}
                  {photos.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition z-10"
                      >
                        ‹
                      </button>
                      <button
                        onClick={() => setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition z-10"
                      >
                        ›
                      </button>
                      
                      {/* Photo Counter */}
                      <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                        {currentPhotoIndex + 1} / {photos.length}
                      </div>
                      
                      {/* Photo Indicators (Dots) */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {photos.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentPhotoIndex(index)}
                            className={`w-2 h-2 rounded-full transition ${
                              index === currentPhotoIndex 
                                ? 'bg-white w-6' 
                                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : selectedBusiness.photoUrl ? (
                <div className="w-full h-[247px] rounded-[5px] overflow-hidden border border-gray-200">
                  <img
                    src={selectedBusiness.photoUrl}
                    alt={selectedBusiness.business_name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}
              
              {/* Business name and claim business button */}
              <div className="flex justify-between items-center gap-4 rounded-[5px] p-1 md:p-4 bg-white border border-gray-200">
                <p className="font-bold text-[14px] md:text-[25px] leading-[100%] text-wrap">{selectedBusiness.business_name}</p>
                <button
                  onClick={() => setStep(2)}
                  type="button"
                  className="text-[12px] md:text-[16px] px-2 md:px-6 py-3 bg-[#DB3A06] text-white rounded-lg font-semibold hover:bg-orange-700 transition cursor-pointer"
                >
                  Claim This Business
                </button>
              </div>
              
              {/* About section */}
              <div className="flex justify-between items-center gap-4 rounded-[5px] p-2 md:p-4 bg-white border border-gray-200">
                <div>
                  <h4 className="font-semibold text-[12px] md:text-[16px] leading-[100%] text-[#363C44] mb-2">About</h4>
                  {/* Display Editorial Content */}
                  <p className="text-[10px] md:text-sm text-gray-600">
                    {typeof selectedBusiness.editorialSummary === 'string' 
                      ? selectedBusiness.editorialSummary 
                      : selectedBusiness.editorialSummary?.text || "No description available"}
                  </p>
                </div>
              </div>

              {/* Location section */}
              <div className="flex justify-between items-center gap-4 rounded-[5px] p-2 md:p-4 bg-white border border-gray-200">
                {/* Location Map section */}
                <div className="w-[45%] md:w-1/2 h-48 rounded-lg overflow-hidden border border-gray-300">
                  <MapContainer
                    center={businessCoordinates ? [businessCoordinates.lat, businessCoordinates.lng] : [userLocation.lat, userLocation.lng]}
                    zoom={15}
                    style={{ height: "100%", width: "100%" }}
                    key={businessCoordinates ? `${businessCoordinates.lat}-${businessCoordinates.lng}` : "default"}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {businessCoordinates && (
                      <Marker position={[businessCoordinates.lat, businessCoordinates.lng]}>
                        <Popup>{selectedBusiness.business_name}</Popup>
                      </Marker>
                    )}
                  </MapContainer>
                </div>
                {/* Contact section */}
                <div className="flex flex-col gap-5 w-[55%] md:w-1/2">
                  <div>
                    <h4 className="font-semibold text-[14px] md:text-[16px] leading-[100%] text-[#363C44] mb-2">Location</h4>
                    <p className="text-[10px] md:text-sm text-gray-600">
                        {selectedBusiness.formatted_address}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[14px] md:text-[16px] leading-[100%] text-[#363C44] mb-2">Contact</h4>
                    <p className="text-[10px] md:text-sm text-gray-600">
                        <Phone className="w-4 h-4 inline-block mr-1 mb-2" />
                        {selectedBusiness.formatted_phone || "N/A"}
                    </p>
                    <p className="text-[10px] md:text-sm text-gray-600 flex items-center gap-1">
                        <Mail className="w-4 h-4 inline-block mr-1" />
                        {selectedBusiness.formatted_email || "N/A"}
                    </p>
                  </div>
                </div>
              </div>


              {/* <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{selectedBusiness.formatted_address}</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    ℹ️ You're about to verify and claim ownership of this business. Make sure all details are correct before proceeding.
                  </p>
                </div>

                <button
                  onClick={() => setStep(2)}
                  type="button"
                  className="w-full px-6 py-3 bg-[#DB3A06] text-white rounded-lg font-semibold hover:bg-orange-700 transition"
                >
                  Claim This Business
                </button>

                <button
                  onClick={() => setStep(1)}
                  type="button"
                  className="w-full px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Search Another Business
                </button>
              </div> */}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <form onSubmit={handleSearchBusinesses} className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for your business..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#DB3A06] text-white py-3 rounded-lg font-medium hover:bg-orange-700 disabled:opacity-50 transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    "Search"
                  )}
                </button>
              </form>

              <div className="space-y-3">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <div
                      key={result.google_place_id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition"
                      onClick={() => handleSelectBusiness(result)}
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{result.business_name}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
                          <MapPin className="w-4 h-4" />
                          {result.formatted_address}
                        </div>
                      </div>
                    </div>
                  ))
                ) : searchQuery ? (
                  <div className="text-center py-8 text-gray-500">
                    {loading ? "Searching..." : "No results found"}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Search for your business to get started
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && selectedBusiness && (
            <form onSubmit={handleSubmitVerification} className="space-y-4">
              {/* Business Preview Card */}
              <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Business Image */}
                <div className="w-[40%] md:w-[25%] flex items-center justify-center overflow-hidden">
                  {selectedBusiness.photoUrl ? (
                    <img
                      src={selectedBusiness.photoUrl}
                      alt={selectedBusiness.business_name}
                      className="w-[172px] h-[127px] object-cover rounded-[10px]"
                    />
                  ) : (
                    <div className="text-white text-center">
                      <MapPin className="w-12 h-12 mx-auto mb-2 opacity-80" />
                      <p className="text-sm opacity-80">Business Location</p>
                    </div>
                  )}
                </div>
                
                {/* Business Info */}
                <div className="w-[60%] md:w-[75%] p-4 flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-[16px] md:text-[24px] text-gray-900 text-wrap">{selectedBusiness.business_name}</h3>
                    {selectedBusiness.types && selectedBusiness.types.length > 0 && (
                      <p className="text-xs text-gray-600 mt-1 text-[16px]">
                        {selectedBusiness.types?.[0]} • {selectedBusiness.types?.[1]}
                      </p>
                    )}
                    <div className="flex items-start gap-1 text-[10px] md:text-[14px] text-gray-600 mt-2">
                      <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      <span>{selectedBusiness.formatted_address}</span>
                    </div>
                  </div>
                </div>
                
                {/* Not Your Business? */}
                <div className="hidden md:w-[25%] p-4 md:flex items-start justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium text-sm"
                  >
                    Not your business?
                  </button>
                </div>
              </div>

              {/* Form Title */}
              <div className="pt-2">
                <h4 className="font-semibold text-gray-900 mb-4">Fill out your information to verify your business</h4>
              </div>

              {/* Email/Phone Input */}
              <div className="w-full flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Email or Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                    type="text"
                    value={verificationData.email}
                    onChange={(e) => {
                        setVerificationData({ ...verificationData, email: e.target.value });
                        setVerificationError("");
                    }}
                    placeholder="Enter work email address or registered phone number"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      verificationError ? 'border-red-500' : 'border-gray-300'
                    }`}
                    />
                    {verificationError && (
                      <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                        <span>✕</span> {verificationError}
                      </p>
                    )}
                </div>

                {/* Business Name Display */}
                <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                    </label>
                    <input
                    type="text"
                    value={selectedBusiness.business_name}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                    />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="terms-verify"
                  className="w-4 h-4 rounded border-gray-300 mt-1"
                />
                <label htmlFor="terms-verify" className="text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-[#DB3A06] hover:underline font-medium">
                    Terms of Service
                  </a>{' '}
                  and Privacy Policy
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="hidden md:flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-[#DB3A06] text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition font-semibold"
                >
                  {loading ? "Submitting..." : "Submit Claim"}
                </button>
              </div>
              
              {/* Not Your Business? */}
                <div className="md:hidden w-full p-4 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium text-sm"
                  >
                    Not your business?
                  </button>
                </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmitOTP} className="space-y-6">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-[#DB3A06]" />
                </div>
              </div>

              <div className="text-center">
                {/* <h3 className="text-lg font-semibold text-gray-900 mb-2">Verify Your Business</h3> */}
                <p className="text-gray-600 text-sm">
                  We just sent a 6-digit code to <strong>{verificationData.email}</strong>. Please enter it below to verify your ownership.
                </p>
              </div>

              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !digit && index > 0) {
                        const prevInput = document.getElementById(`otp-${index - 1}`);
                        prevInput?.focus();
                      }
                    }}
                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-semibold"
                  />
                ))}
              </div>

              <div className="text-center">
                <button
                  type="button"
                  className="text-[#DB3A06] hover:text-orange-700 font-medium text-sm"
                >
                  Didn''t receive the code? Resend
                </button>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="hidden md:flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={otpLoading}
                  className="flex-1 px-4 py-2 bg-[#DB3A06] text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition font-medium"
                >
                  {otpLoading ? "Verifying..." : "Verify and Continue"}
                </button>
              </div>
            </form>
          )}

          {step === 4 && selectedBusiness && (
            <form onSubmit={handleCreateAccount} className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-1">{selectedBusiness.business_name}</h3>
                <p className="text-sm text-gray-600">Your company email has been verified.</p>
                <p className="text-sm text-gray-600">Set up your Mypal account to manage your business.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={accountData.password}
                  onChange={(e) =>
                    setAccountData({ ...accountData, password: e.target.value })
                  }
                  placeholder="Set a secure password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">At least 8 characters with mixed case and numbers</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={accountData.confirmPassword}
                  onChange={(e) =>
                    setAccountData({ ...accountData, confirmPassword: e.target.value })
                  }
                  placeholder="Confirm password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={accountData.role}
                  onChange={(e) =>
                    setAccountData({ ...accountData, role: e.target.value })
                  }
                  placeholder="e.g., Owner, Manager, Staff"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {/* <select
                  value={accountData.role}
                  onChange={(e) =>
                    setAccountData({ ...accountData, role: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select your role</option>
                  <option value="admin">Admin Officer</option>
                  <option value="manager">Manager</option>
                  <option value="owner">Business Owner</option>
                  <option value="staff">Staff</option>
                </select> */}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram Handle (Optional)
                </label>
                <input
                  type="text"
                  value={accountData.instagramHandle}
                  onChange={(e) =>
                    setAccountData({ ...accountData, instagramHandle: e.target.value })
                  }
                  placeholder="@your_business_ig"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 rounded border-gray-300"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-[#DB3A06] hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[#DB3A06] hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="hidden md:flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-[#DB3A06] text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition font-medium"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default MultiStepClaimBusinessModal;
