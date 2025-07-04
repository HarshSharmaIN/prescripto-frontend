import { ChevronRight, Calendar, User, Search, Sparkles, BookOpen, TrendingUp } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const TopBlogs = () => {
  const navigate = useNavigate();
  const [blogsData, setBlogsData] = useState([]);
  const { backendUrl } = useContext(AppContext);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/get-blogs");

      if (data.success) {
        setBlogsData(data.blogs);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      // Don't show error toast for network issues in demo
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

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
    <div className="py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 40, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <BookOpen className="w-8 h-8 text-primary" />
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-800">
            Medical <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Insights</span>
          </h2>
          <BookOpen className="w-8 h-8 text-secondary" />
        </motion.div>
        <motion.p 
          className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Expert medical advice and insights from our trusted healthcare professionals.
        </motion.p>
      </motion.div>

      {blogsData.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            📚
          </motion.div>
          <h3 className="text-3xl font-bold text-neutral-700 mb-4">Coming Soon!</h3>
          <p className="text-xl text-neutral-500 max-w-md mx-auto">
            Our medical experts are preparing amazing content for you. Stay tuned!
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {blogsData.slice(0, 6).map((blog, index) => (
            <motion.div
              key={blog._id}
              variants={cardVariants}
              whileHover={{ y: -12, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/blog/${blog._id}`)}
              className="group bg-white/80 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-neutral-100 relative"
            >
              {/* Animated background on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />

              {blog.coverImg && (
                <div className="relative overflow-hidden h-48">
                  <motion.img 
                    src={blog.coverImg} 
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Trending badge */}
                  <motion.div
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="bg-white/90 backdrop-blur-md rounded-full p-2 shadow-lg">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                  </motion.div>
                </div>
              )}
              
              <div className="p-6 relative z-10">
                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <User className="w-4 h-4 text-primary" />
                    <span className="font-semibold">{blog.author}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Calendar className="w-4 h-4 text-secondary" />
                    <span>{blog.date}</span>
                  </motion.div>
                </div>
                
                <motion.h3 
                  className="text-xl font-bold text-neutral-800 mb-4 group-hover:text-primary transition-colors line-clamp-2"
                  whileHover={{ scale: 1.02 }}
                >
                  {blog.title}
                </motion.h3>
                
                <motion.p 
                  className="text-neutral-600 leading-relaxed mb-6 line-clamp-3"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {blog.summary.substring(0, 120)}...
                </motion.p>
                
                <motion.button
                  whileHover={{ x: 8, scale: 1.05 }}
                  className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors group-hover:gap-3 duration-300"
                >
                  <span>Read More</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute bottom-2 right-2 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-1/2 left-2 w-1.5 h-1.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(95, 111, 255, 0.3)",
            y: -3
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            navigate("/blogs");
            scrollTo(0, 0);
          }}
          className="group inline-flex items-center gap-4 bg-gradient-to-r from-primary via-secondary to-accent text-white px-10 py-5 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
          />
          <Sparkles className="w-6 h-6 relative z-10" />
          <span className="relative z-10">Explore All Articles</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronRight className="w-6 h-6 relative z-10" />
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default TopBlogs;