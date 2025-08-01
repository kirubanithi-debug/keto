import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  CheckCircle,
  AlertCircle,
  FileText,
  ChevronDown,
  Lock,
} from "lucide-react"; //icon for forms like user, mail, phone, building, calendar, check circle, alert circle, file text, chevron down and lock
import NavbarOnly from "./NavbarOnly";

const JobApplication = () => {
  // Add department options
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

  // Get logged-in user info from localStorage
  const loggedInUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  })();

  // Initialize form state with name and email if available
  const [user, setUser] = useState({
    username: loggedInUser.username || "",
    email: loggedInUser.email || "",
    phone: "",
    workplace: "",
    Department: "",
    customDepartment: "",
    workplacename: "",
    experience: "",
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ischecked, setIsChecked] = useState(false);
  
  const handleCheckbox = () => {
    setIsChecked(!ischecked);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.username.trim()) newErrors.username = "Full name is required";
    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!user.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(user.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    if (!user.workplace.trim())
      newErrors.workplace = "Current position is required";
    if (!user.Department.trim()) {
      newErrors.Department = "Department name is required";
    } else if (user.Department === "Other" && !user.customDepartment.trim()) {
      newErrors.customDepartment = "Please specify your department";
    }
    if (!user.workplacename.trim())
      newErrors.workplacename = "College name is required";
    if (!user.experience.trim()) {
      newErrors.experience = "Experience is required";
    } else if (isNaN(user.experience) || user.experience < 0) {
      newErrors.experience = "Enter a valid number";
    }
    if (!user.resume) newErrors.resume = "Upload your resume";
    
    // Add checkbox validation
    if (!ischecked) newErrors.terms = "You must accept the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    // Clear custom department if user selects a different option
    if (name === "Department" && value !== "Other") {
      setUser((prev) => ({ ...prev, customDepartment: "" }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          resume: "Only PDF or Word documents allowed",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          resume: "File size must be under 5MB",
        }));
        return;
      }
      setUser((prev) => ({ ...prev, resume: file }));
      setErrors((prev) => ({ ...prev, resume: "" }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Prepare form data for backend
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    formData.append("workplace", user.workplace);
    
    // Fix the department handling
    if (user.Department === "Other") {
      formData.append("department", "Other");
      formData.append("custom_department", user.customDepartment);
    } else {
      formData.append("department", user.Department);
      formData.append("custom_department", "");
    }
    
    formData.append("workplacename", user.workplacename);
    formData.append("experience", user.experience);
    formData.append("resume", user.resume);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/apply/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setUser({
          username: loggedInUser.username || "",
          email: loggedInUser.email || "",
          phone: "",
          workplace: "",
          Department: "",
          customDepartment: "",
          workplacename: "",
          experience: "",
          resume: null,
        });
        setErrors({});
        setIsChecked(false); // Reset checkbox
        if (document.getElementById("resume-upload")) {
          document.getElementById("resume-upload").value = "";
        }
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        setErrors(data);
      }
    } catch (error) {
      setErrors({ general: "Submission failed. Try again." });
    }
    setIsSubmitting(false);
  };

  const handleNameFocus = () => {
    if (!user.username && loggedInUser.username) {
      setUser((prev) => ({ ...prev, username: loggedInUser.username }));
      setErrors((prev) => ({ ...prev, username: "" }));
    }
  };

  const handleEmailFocus = (e) => {
    if (!user.email) {
      setUser((prev) => ({ ...prev, email: loggedInEmail }));
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  // If you want to update autofill when user info changes in localStorage:
  useEffect(() => {
    setUser((prev) => ({
      ...prev,
      username: loggedInUser.username || "",
      email: loggedInUser.email || "",
    }));
  }, []);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800 mb-3">
            Application Submitted!
          </p>
          <p className="text-gray-600 text-lg mb-6">
            Thank you for applying. We will review your application shortly.
          </p>

          {/* Add this button */}
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Return to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <NavbarOnly />
      <div className="relative z-10 pt-20 min-h-screen bg-gradient-to-br from-blue-800 to-indigo-400 flex justify-center items-start py-12 px-4 overflow-y-auto">
        <div className="bg-white backdrop-blur-md shadow-2xl rounded-2xl w-full max-w-4xl p-10 border border-white/20">
          <div className="text-center mb-8">
            <p className="text-4xl font-bold text-black">Join Our Team</p>
            <p className="text-black text-lg mt-2">
              We'd love to hear from you. Please fill in the form below.
            </p>
          </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <FieldWrapper
            label="Full Name"
            icon={<User className="w-4 h-5 mr-3" />}
            name="username"
            value={user.username}
            onChange={handleChange}
            onFocus={handleNameFocus}
            error={errors.username}
            placeholder="Enter your full name"
            readOnly={true} //user can not fill this field
          />

          <FieldWrapper
            label="Email Address"
            icon={<Mail className="w-4 h-5 mr-3" />}
            name="email"
            value={user.email}
            onChange={handleChange}
            onFocus={handleEmailFocus}
            error={errors.email}
            placeholder="you@example.com"
            type="email"
            readOnly={true} //user can not fill this field
          />

          <FieldWrapper
            label="Phone Number"
            icon={<Phone className="w-4 h-5 mr-3" />}
            name="phone"
            value={user.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="9876543210"
            type="tel"
          />

          <FieldWrapper
            label="Current Position"
            icon={<Building className="w-4 h-5 mr-3" />}
            name="workplace"
            value={user.workplace}
            onChange={handleChange}
            error={errors.workplace}
            placeholder="e.g. Assistant Professor"
          />

          {/* Department Dropdown */}
          <SelectWrapper
            label="Department Name"
            icon={<Building className="w-4 h-5 mr-3" />}
            name="Department"
            value={user.Department}
            onChange={handleChange}
            error={errors.Department}
            options={departmentOptions}
            placeholder="Select your department"
          />

          {/* Custom Department Field - Shows only when "Other" is selected */}
          {user.Department === "Other" && (
            <FieldWrapper
              label="Specify Your Department"
              icon={<Building className="w-4 h-5 mr-3" />}
              name="customDepartment"
              value={user.customDepartment}
              onChange={handleChange}
              error={errors.customDepartment}
              placeholder="Enter your department name"
            />
          )}

          <FieldWrapper
            label="Working College Name"
            icon={<Building className="w-4 h-5 mr-3" />}
            name="workplacename"
            value={user.workplacename}
            onChange={handleChange}
            error={errors.workplacename}
            placeholder="e.g. college name"
          />

          <FieldWrapper
            label="Years of Experience"
            icon={<Calendar className="w-4 h-5 mr-3" />}
            name="experience"
            value={user.experience}
            onChange={handleChange}
            error={errors.experience}
            placeholder="e.g. 3"
            type="number"
            min="0"
            max="50"
          />

          {/* Resume Upload */}
          <div className="space-y-2 border border-gray-100 rounded-xl p-5">
            <label className="block text-lg font-medium text-gray-700">
              <FileText className="inline w-5 h-5 mr-2" />
              Upload Resume
            </label>
            <div className="border border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-gray-300 transition-colors">
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <FileText className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-lg text-gray-600 mb-1">
                  Click to upload your resume
                </p>
                <p className="text-sm text-gray-500">
                  PDF or DOC, Max size 5MB
                </p>
              </label>
              {user.resume && (
                <p className="text-green-600 mt-4">
                  ✓ {user.resume.name} uploaded
                </p>
              )}
            </div>
            {errors.resume && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.resume}
              </p>
            )}
          </div>
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-start space-x-3">
            <div className="flex items-center h-6">
              <input
                id="terms-checkbox"
                type="checkbox"
                checked={ischecked}
                onChange={handleCheckbox}
                className="w-5 h-5 text-violet-600 border-2 border-gray-300 rounded focus:ring-violet-500 focus:ring-2 focus:ring-offset-0"
              />
            </div>
            <div className="min-w-0 flex-1">
              <label 
                htmlFor="terms-checkbox" 
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                I accept the{" "}
                <a 
                  href="#" 
                  className="text-violet-600 hover:text-violet-700 underline"
                  onClick={(e) => e.preventDefault()}
                >
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a 
                  href="#" 
                  className="text-violet-600 hover:text-violet-700 underline"
                  onClick={(e) => e.preventDefault()}
                >
                  Privacy Policy
                </a>
              </label>
              {errors.terms && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.terms}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !ischecked}
            className={`w-full h-14 text-lg font-semibold border rounded-lg transition-all duration-300 ${
              isSubmitting || !ischecked
                ? "bg-gray-400 cursor-not-allowed text-gray-600"
                : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded hover:from-violet-700 hover:to-indigo-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Submitting...
              </div>
            ) : (
              "Submit Application"
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-sm text-gray-300">
          Questions? Email us at{" "}
          <a
            href="mailto:careers@company.com"
            className="text-blue-400 hover:underline"
          >
            Keto@company.com
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};

// Updated FieldWrapper with lighter border styling
const FieldWrapper = ({
  label,
  icon,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  readOnly = false,
}) => {
  const inputId = `field-${name}`;
  return (
    <div className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm space-y-3">
      <label
        className="text-lg font-medium text-gray-700 flex items-center"
        htmlFor={inputId}
      >
        {icon} {label}{" "}
        {readOnly && <Lock className="ml-2 w-4 h-4 text-gray-400" />}
      </label>
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full px-6 py-4 text-lg border rounded-lg focus:outline-none transition-colors focus:ring-2 h-10 ${
          error
            ? "border-red-200 focus:border-red-400 focus:ring-red-50"
            : "border-gray-200 focus:border-violet-300 focus:ring-violet-50"
        } ${readOnly ? "bg-gray-100 cursor-not-allowed text-gray-500" : ""}`}
      />
      {readOnly && (
        <p className="text-xs text-gray-400">
          This field is autofilled and cannot be edited.
        </p>
      )}
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" /> {error}
        </p>
      )}
    </div>
  );
};

const SelectWrapper = ({
  label,
  icon,
  name,
  value,
  onChange,
  error,
  placeholder,
  options,
}) => (
  <div className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm space-y-3">
    <label className="text-lg font-medium text-gray-700 flex items-center">
      {icon} {label}
    </label>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-6 py-4 text-lg border rounded-lg focus:outline-none transition-colors focus:ring-2 h-10 appearance-none cursor-pointer pr-12 ${
          error
            ? "border-red-200 focus:border-red-400 focus:ring-red-50"
            : "border-gray-200 focus:border-violet-300 focus:ring-violet-50"
        } ${!value ? "text-gray-400" : "text-gray-900"}`}
      >
        <option value="" disabled className="text-gray-400">
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="text-gray-900 bg-white"
          >
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none z-10" />
    </div>
    {error && (
      <p className="text-red-500 text-sm mt-1 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" /> {error}
      </p>
    )}
  </div>
);

export default JobApplication;
