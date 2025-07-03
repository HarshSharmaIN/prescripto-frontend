import { ChevronRight, Calendar, User, Search, Filter } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const DoctorBlogs = () => {
  const navigate = useNavigate();
  const [blogsData, setBlogsData] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const { backendUrl } = useContext(AppContext);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/get-blogs");
      if (data.success) {
        setBlogsData(data.blogs);
        setFilteredBlogs(data.blogs);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    let filtered = blogsData;
    
    if (searchTerm) {
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedAuthor) {
      filtered = filtered.filter(blog => blog.author === selectedAuthor);
    }
    
    setFilteredBlogs(filtered);
  }, [searchTerm, selectedAuthor, blogsData]);

  const authors = [...new Set(blogsData.map(blog => blog.author))];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 py-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 px-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
          Medical <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Insights</span>
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Expert medical advice and insights from our trusted healthcare professionals.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-12"
        >
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search blogs by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* Author Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="pl-12 pr-8 py-4 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm appearance-none cursor-pointer min-w-[200px]"
            >
              <option value="">All Authors</option>
              {authors.map(author => (
                <option key={author} value={author}>{author}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <p className="text-neutral-600">
            Showing {filteredBlogs.length} of {blogsData.length} articles
          </p>
        </motion.div>

        {/* Blogs Grid */}
        {filteredBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-neutral-700 mb-2">No articles found</h3>
            <p className="text-neutral-500">Try adjusting your search criteria</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  navigate(`/blog/${blog._id}`);
                  window.scrollTo(0, 0);
                }}
                className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-neutral-100 flex flex-col"
              >
                {blog.coverImg && (
                  <div className="relative overflow-hidden h-48 flex-shrink-0">
                    <img 
                      src={blog.coverImg} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                )}
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{blog.date}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-800 mb-3 group-hover:text-primary transition-colors line-clamp-2 flex-shrink-0">
                    {blog.title}
                  </h3>
                  
                  <p className="text-neutral-600 leading-relaxed mb-4 line-clamp-3 flex-1">
                    {blog.summary.substring(0, 120)}...
                  </p>
                  
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors self-start"
                  >
                    <span>Read More</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DoctorBlogs;