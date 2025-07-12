import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react";

const JobApplication = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    workplace: "",
    workplacename: "",
    experience: "",
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    if (!user.workplacename.trim())
      newErrors.workplacename = "Company name is required";
    if (!user.experience.trim()) {
      newErrors.experience = "Experience is required";
    } else if (isNaN(user.experience) || user.experience < 0) {
      newErrors.experience = "Enter a valid number";
    }
    if (!user.resume) newErrors.resume = "Upload your resume";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
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
    await new Promise((res) => setTimeout(res, 2000));
    setIsSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setUser({
        username: "",
        email: "",
        phone: "",
        workplace: "",
        workplacename: "",
        experience: "",
        resume: null,
      });
      setErrors({});
      if (document.getElementById("resume-upload")) {
        document.getElementById("resume-upload").value = "";
      }
    }, 4000);
  };

  if (submitted) {
    return (
      <div className="h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center items-start py-12 px-4 overflow-y-auto">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-10">
        <div className="text-center mb-8">
          <p className="text-4xl font-bold text-gray-800">Join Our Team</p>
          <p className="text-gray-500 text-lg mt-2">
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
            error={errors.username}
            placeholder="Enter your full name"
          />

          <FieldWrapper
            label="Email Address"
            icon={<Mail className="w-4 h-5 mr-3" />}
            name="email"
            value={user.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="you@example.com"
            type="email"
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
            placeholder="e.g. Assitant Professor"
          />

          <FieldWrapper
            label="working college Name"
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
          <div className="space-y-2 border-2 border-violet-300 rounded-xl p-5">
            <label className="block text-lg font-medium text-gray-700">
              <FileText className="inline w-5 h-5 mr-2" />
              Upload Resume
            </label>
            <div className="border-2 border-dashed border-violet-300 rounded-xl p-8 text-center hover:border-violet-500 transition-colors">
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

        {/* Submit Button */}
        <div className="pt-10">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full h-14 text-lg font-semibold boder-r rounded-lg transition-all duration-300 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded hover:from-violet-700 hover:to-indigo-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue mr-3"></div>
                Submitting...
              </div>
            ) : (
              "Submit Application"
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-sm text-gray-500">
          Questions? Email us at{" "}
          <a
            href="mailto:careers@company.com"
            className="text-violet-600 hover:underline"
          >
            Keto@company.com
          </a>
        </div>
      </div>
    </div>
  );
};

// Updated FieldWrapper with focused border and ring styling
const FieldWrapper = ({
  label,
  icon,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  ...rest
}) => (
  <div className="p-5 rounded-xl border-2 border-violet-300 bg-white shadow-sm space-y-3">
    <label className="block text-lg font-medium text-gray-700">
      {icon}
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-6 py-4 text-lg border-3 rounded-lg focus:outline-none transition-colors focus:ring-2 h-10 ${
        error
          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
          : "border-violet-600 focus:border-violet-600 focus:ring-violet-600"
      }`}
      {...rest}
    />
    {error && (
      <p className="text-red-500 text-sm mt-1 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

export default JobApplication;
