import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Building,
  Users,
  Calendar,
  Star,
  Filter,
  ArrowRight,
  Briefcase,
  GraduationCap
} from "lucide-react";
import NavbarOnly from "./NavbarOnly";

const SearchJobs = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Demo job data based on colleges/locations
  const demoJobs = [
    {
      id: 1,
      title: "Assistant Professor - Computer Science",
      college: "Tech University",
      location: "Chennai, Tamil Nadu",
      type: "Full-time",
      experience: "2-5 years",
      salary: "₹8-12 LPA",
      description: "Looking for experienced faculty in Computer Science with strong research background.",
      requirements: ["PhD in Computer Science", "2+ years teaching experience", "Research publications"],
      rating: 4.5,
      employees: "5000+",
      established: 1965
    },
    {
      id: 2,
      title: "Associate Professor - Electronics",
      college: "Engineering Institute",
      location: "Bangalore, Karnataka",
      type: "Full-time",
      experience: "5-8 years",
      salary: "₹12-18 LPA",
      description: "Seeking qualified candidate for Electronics & Communication department.",
      requirements: ["PhD in ECE", "5+ years experience", "Industry exposure"],
      rating: 4.3,
      employees: "3000+",
      established: 1980
    },
    {
      id: 3,
      title: "Lecturer - Mathematics",
      college: "Science College",
      location: "Mumbai, Maharashtra",
      type: "Full-time",
      experience: "1-3 years",
      salary: "₹6-9 LPA",
      description: "Mathematics faculty position available for fresh graduates.",
      requirements: ["MSc Mathematics", "NET/SET qualified", "Good communication"],
      rating: 4.1,
      employees: "2000+",
      established: 1975
    },
    {
      id: 4,
      title: "Professor - Business Administration",
      college: "Management Institute",
      location: "Delhi, NCR",
      type: "Full-time",
      experience: "8-12 years",
      salary: "₹15-25 LPA",
      description: "Senior faculty position in MBA program with industry connections.",
      requirements: ["PhD in Management", "10+ years experience", "Industry background"],
      rating: 4.7,
      employees: "1500+",
      established: 1990
    },
    {
      id: 5,
      title: "Assistant Professor - Physics",
      college: "Research University",
      location: "Pune, Maharashtra",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹7-11 LPA",
      description: "Physics department seeking research-oriented faculty member.",
      requirements: ["PhD in Physics", "Research experience", "Publication record"],
      rating: 4.4,
      employees: "4000+",
      established: 1960
    },
    {
      id: 6,
      title: "Lecturer - English Literature",
      college: "Arts College",
      location: "Kolkata, West Bengal",
      type: "Full-time",
      experience: "1-2 years",
      salary: "₹5-8 LPA",
      description: "English department faculty position for literature enthusiasts.",
      requirements: ["MA English", "NET qualified", "Teaching passion"],
      rating: 4.0,
      employees: "1800+",
      established: 1955
    }
  ];

  useEffect(() => {
    setFilteredJobs(demoJobs);
  }, []);

  const handleSearch = () => {
    let filtered = demoJobs;

    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  };

  const handleApplyNow = (job) => {
    alert(`Applied for ${job.title} at ${job.college}!\n\nThis is a demo application. In a real scenario, this would redirect to the application form or external college portal.`);
  };

  const locations = ["Chennai", "Bangalore", "Mumbai", "Delhi", "Pune", "Kolkata"];

  return (
    <div className="w-full overflow-hidden">
      <NavbarOnly />
      
      <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Find Your <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Dream Position</span>
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Discover academic positions at top colleges and universities across India
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
            <div className="grid md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Job Title or Keywords</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Assistant Professor, Computer Science"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 appearance-none"
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location} className="bg-gray-800">
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search Jobs
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              {filteredJobs.length} Positions Found
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-white border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Job Cards */}
          <div className="grid gap-6">
            {filteredJobs.map(job => (
              <div key={job.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                        <div className="flex items-center gap-4 text-gray-300 text-sm mb-2">
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {job.college}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            {job.rating}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-400 text-sm">
                          <span>{job.type}</span>
                          <span>Experience: {job.experience}</span>
                          <span>{job.salary}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{job.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-white font-medium mb-2">Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req, index) => (
                          <span key={index} className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-gray-400 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {job.employees} employees
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Est. {job.established}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => handleApplyNow(job)}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                    >
                      Apply Now
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="border border-white/20 text-white py-2 px-6 rounded-lg hover:bg-white/10 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No positions found</h3>
              <p className="text-gray-300">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchJobs;