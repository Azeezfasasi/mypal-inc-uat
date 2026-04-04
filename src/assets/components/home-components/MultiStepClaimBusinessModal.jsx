import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { X, MapPin, Mail, Search, AlertCircle, Loader, CheckCircle, Phone } from "lucide-react";
import toast from "react-hot-toast";
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

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

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
        setStep(0);
        setSelectedBusiness(business);
        geocodeAddress(business.formatted_address);
      } else {
        setStep(1);
      }
    }
  }, [isOpen, fetchCategories, getUserLocation, geocodeAddress, business]);

  useEffect(() => {
    if (step === 0 && selectedBusiness?.formatted_address) {
      geocodeAddress(selectedBusiness.formatted_address);
    }
  }, [step, selectedBusiness, geocodeAddress]);

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
    setSelectedBusiness(businessData);
    try {
      await axios.get(
        `${API_BASE_URL}/business/claim/${businessData.google_place_id}/status`,
        { headers: { "x-api-key": API_KEY } }
      );
    } catch (statusError) {
      console.error("Status check error:", statusError);
    }
    setStep(2);
  };

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
          phone: verificationData.email,
        },
        { headers: { "x-api-key": API_KEY } }
      );

      toast.success("Claim initiated! Check your email for verification code");
      setStep(3);
    } catch (error) {
      console.error("Verification error:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Error initiating claim";
      
      if (error.response?.status === 409) {
        setVerificationError("An account with this email already exists");
      } else if (errorMessage.includes("domain")) {
        setVerificationError("This email doesn't match the business domain");
      } else {
        setVerificationError(errorMessage);
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
              <div className="flex items-center gap-4">
                <p className="font-bold text-[25px] leading-[100%]">{selectedBusiness.business_name}</p>
                <span className="inline-block text-xs font-medium text-[#DB3A06] mt-2 px-2 py-1 bg-orange-100 rounded">
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
              <div className="bg-orange-50 border-l-4 border-[#DB3A06] rounded-lg p-4 mb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{selectedBusiness.business_name}</h3>
                    <span className="inline-block text-xs font-medium text-[#DB3A06] mt-2 px-2 py-1 bg-orange-100 rounded">
                      ● Claimable
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Business name and claim business button */}
              <div className="flex justify-between items-center gap-4 rounded-[5px] p-2 md:p-4 bg-white border border-gray-200">
                <p className="font-bold text-[14px] md:text-[25px] leading-[100%]">{selectedBusiness.business_name}</p>
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
                  <p className="text-[10px] md:text-sm text-gray-600">
                    
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
                        {selectedBusiness.formatted_phone || "+234 815 123 4567"}
                    </p>
                    <p className="text-[10px] md:text-sm text-gray-600">
                        <Mail className="w-4 h-4 inline-block mr-1" />
                        {selectedBusiness.formatted_email || "manager@sigapartment.com"}
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
                <div className="w-[40%] md:w-[25%] h-40 bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-2 opacity-80" />
                    <p className="text-sm opacity-80">Business Location</p>
                  </div>
                </div>
                
                {/* Business Info */}
                <div className="w-[60%] md:w-[75%] p-4 flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900">{selectedBusiness.business_name}</h3>
                    <p className="text-xs text-gray-600 mt-1">
                      {selectedBusiness.types?.[0] || "Business"} • {selectedBusiness.types?.[1] || "Service"}
                    </p>
                    <div className="flex items-start gap-1 text-xs text-gray-600 mt-2">
                      <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      <span>{selectedBusiness.formatted_address}</span>
                    </div>
                  </div>
                </div>
                
                {/* Not Your Business? */}
                <div className="hidden w-[25%] p-4 md:flex items-start justify-end">
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
    </div>
  );
};

export default MultiStepClaimBusinessModal;
