import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  FileText,
  Edit2,
  Save,
  X,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  MapPin,
  Briefcase,
  Linkedin,
  Github,
  Twitter,
  Globe,
  ExternalLink
} from "lucide-react";
import NavbarOnly from "./NavbarOnly";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState({});
  const [errors, setErrors] = useState({});

  // Department options (same as JobApplication)
  const departmentOptions = [
    "Computer Science",
    "Information Technology",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Business Administration",
    "Mathematics",
    "Physics",
    "Chemistry",
    "English",
    "Economics",
    "Psychology",
    "Other",
  ];

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      if (!loggedInUser || !loggedInUser.email) {
        navigate("/login");
        return;
      }

      // Get the email from the logged in user
      const userEmail = loggedInUser.email || loggedInUser.user?.email;

      // Use the list endpoint with email parameter
      const response = await fetch(`http://127.0.0.1:8000/api/apply/list/?email=${userEmail}`);
      
      if (response.ok) {
        const applications = await response.json();
        if (applications && applications.length > 0) {
          // Get the latest application
          const latestApplication = applications[0];
          setUser({
            ...latestApplication,
            hasApplication: true,
            userType: loggedInUser.userType
          });
          setEditData(latestApplication);
        } else {
          // No application found
          setUser({
            username: loggedInUser.username || loggedInUser.user?.username,
            email: userEmail,
            userType: loggedInUser.userType,
            hasApplication: false
          });
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      // Fallback to localStorage data
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      setUser({
        username: loggedInUser.username || loggedInUser.user?.username,
        email: loggedInUser.email || loggedInUser.user?.email,
        userType: loggedInUser.userType,
        hasApplication: false
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...user });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...user });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!editData.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(editData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    if (!editData.workplace?.trim()) {
      newErrors.workplace = "Current position is required";
    }
    if (!editData.department?.trim()) {
      newErrors.department = "Department is required";
    }
    if (!editData.workplacename?.trim()) {
      newErrors.workplacename = "College name is required";
    }
    if (!editData.experience?.toString().trim()) {
      newErrors.experience = "Experience is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/apply/${user.email}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUser(updatedData);
        setIsEditing(false);
        setErrors({});
      } else {
        const errorData = await response.json();
        setErrors(errorData);
      }
    } catch (error) {
      setErrors({ general: "Update failed. Please try again." });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  if (loading) {
    return (
      <div className="w-full overflow-hidden">
        <NavbarOnly />
        <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-800 to-indigo-400 flex justify-center items-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <NavbarOnly />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-800 to-indigo-400 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
              <div className="w-16"></div>
            </div>

            {/* Profile Header */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{user.username}</h2>
                <p className="text-gray-600">{user.email}</p>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mt-2">
                  {user.userType === "college" ? "College User" : "General User"}
                </span>
              </div>
            </div>

            {/* Application Status */}
            {user.hasApplication !== false ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">Application Submitted</span>
                </div>
                <p className="text-green-700 text-sm mt-1">
                  Your job application has been submitted and is under review.
                </p>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <span className="text-yellow-800 font-medium">No Application Found</span>
                </div>
                <p className="text-yellow-700 text-sm mt-1">
                  You haven't submitted a job application yet.{" "}
                  <button
                    onClick={() => navigate("/apply")}
                    className="text-blue-600 hover:text-blue-700 underline font-medium"
                  >
                    Apply now
                  </button>
                </p>
              </div>
            )}
          </div>

          {/* Bio & Social Media Section */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">About & Social Links</h3>
            
            {/* Bio Section */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Bio</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600">
                  {user.hasApplication !== false ? (
                    `${user.workplace} at ${user.workplacename} with ${user.experience} years of experience in ${user.department}.`
                  ) : (
                    "Complete your application to show your professional summary here."
                  )}
                </p>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Connect with me</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SocialMediaButton 
                  icon={<Linkedin className="w-5 h-5" />}
                  label="LinkedIn"
                  href="#"
                  color="bg-blue-600 hover:bg-blue-700"
                />
                <SocialMediaButton 
                  icon={<Github className="w-5 h-5" />}
                  label="GitHub"
                  href="#"
                  color="bg-gray-800 hover:bg-gray-900"
                />
                <SocialMediaButton 
                  icon={<Twitter className="w-5 h-5" />}
                  label="Twitter"
                  href="#"
                  color="bg-blue-400 hover:bg-blue-500"
                />
                <SocialMediaButton 
                  icon={<Globe className="w-5 h-5" />}
                  label="Portfolio"
                  href="#"
                  color="bg-green-600 hover:bg-green-700"
                />
              </div>
            </div>
          </div>

          {/* Profile Details */}
          {user.hasApplication !== false && (
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Application Details</h3>
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <ProfileField
                  icon={<Phone className="w-5 h-5" />}
                  label="Phone Number"
                  value={user.phone}
                  name="phone"
                  isEditing={isEditing}
                  editValue={editData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                />

                {/* Current Position */}
                <ProfileField
                  icon={<Briefcase className="w-5 h-5" />}
                  label="Current Position"
                  value={user.workplace}
                  name="workplace"
                  isEditing={isEditing}
                  editValue={editData.workplace}
                  onChange={handleInputChange}
                  error={errors.workplace}
                />

                {/* Department */}
                <ProfileField
                  icon={<Building className="w-5 h-5" />}
                  label="Department"
                  value={user.department === "Other" ? user.custom_department : user.department}
                  name="department"
                  isEditing={isEditing}
                  editValue={editData.department}
                  onChange={handleInputChange}
                  error={errors.department}
                  isSelect={true}
                  options={departmentOptions}
                />

                {/* College Name */}
                <ProfileField
                  icon={<MapPin className="w-5 h-5" />}
                  label="College Name"
                  value={user.workplacename}
                  name="workplacename"
                  isEditing={isEditing}
                  editValue={editData.workplacename}
                  onChange={handleInputChange}
                  error={errors.workplacename}
                />

                {/* Experience */}
                <ProfileField
                  icon={<Calendar className="w-5 h-5" />}
                  label="Years of Experience"
                  value={`${user.experience} years`}
                  name="experience"
                  isEditing={isEditing}
                  editValue={editData.experience}
                  onChange={handleInputChange}
                  error={errors.experience}
                  type="number"
                />

                {/* Resume */}
                <div className="col-span-1 md:col-span-2">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-700">Resume</span>
                    </div>
                    {user.resume ? (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Resume uploaded</span>
                        <button
                          onClick={() => window.open(user.resume, '_blank')}
                          className="text-blue-600 hover:text-blue-700 underline"
                        >
                          View Resume
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500">No resume uploaded</span>
                    )}
                  </div>
                </div>
              </div>

              {errors.general && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700">{errors.general}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Profile Field Component
const ProfileField = ({
  icon,
  label,
  value,
  name,
  isEditing,
  editValue,
  onChange,
  error,
  type = "text",
  isSelect = false,
  options = []
}) => (
  <div className="border border-gray-200 rounded-lg p-4">
    <div className="flex items-center gap-3 mb-2">
      <span className="text-gray-600">{icon}</span>
      <span className="font-medium text-gray-700">{label}</span>
    </div>
    {isEditing ? (
      <div>
        {isSelect ? (
          <select
            name={name}
            value={editValue || ""}
            onChange={onChange}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? "border-red-300" : "border-gray-300"
            }`}
          >
            <option value="">Select {label}</option>
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={editValue || ""}
            onChange={onChange}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? "border-red-300" : "border-gray-300"
            }`}
          />
        )}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    ) : (
      <p className="text-gray-800">{value || "Not provided"}</p>
    )}
  </div>
);

// Social Media Button Component
const SocialMediaButton = ({ icon, label, href, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`${color} text-white p-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2 group`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
  </a>
);

export default Profile;