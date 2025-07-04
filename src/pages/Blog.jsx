import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, User, Clock, ArrowLeft, BookOpen, Share2, Heart, Eye } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const Blog = () => {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState(false);
  const { backendUrl, Loader, isLoading, setIsLoading } = useContext(AppContext);
  const navigate = useNavigate();

  const getBlogData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(backendUrl + "/api/doctor/get-blog", {
        blogId,
      });

      if (data.success) {
        setBlogData(data.blog);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlogData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-neutral-700 mb-2">Blog not found</h2>
          <p className="text-neutral-500">The article you're looking for doesn't exist.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 py-8">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 30, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/blogs")}
          className="flex items-center gap-3 mb-8 text-primary hover:text-secondary transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Articles
        </motion.button>

        {/* Article Card */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden relative"
        >
          {/* Decorative elements */}
          <motion.div
            className="absolute top-4 right-4 opacity-10"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <BookOpen className="w-16 h-16 text-primary" />
          </motion.div>

          {/* Cover Image */}
          {blogData.coverImg && (
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-96 overflow-hidden"
            >
              <img
                src={blogData.coverImg}
                alt="Blog Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              {/* Floating stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 right-6 flex gap-4"
              >
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl">
                  <Eye className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-neutral-700">1.2k views</span>
                </div>
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-semibold text-neutral-700">89 likes</span>
                </div>
              </motion.div>
            </motion.div>
          )}

          <div className="p-8 md:p-12 relative z-10">
            {/* Article Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6 leading-tight"
                whileHover={{ scale: 1.01 }}
              >
                {blogData.title}
              </motion.h1>

              {/* Author & Date Info */}
              <div className="flex flex-wrap items-center gap-6 text-neutral-600 mb-6">
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800">{blogData.author}</p>
                    <p className="text-sm text-neutral-500">Medical Expert</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <Calendar className="w-5 h-5 text-secondary" />
                  <span className="font-medium">{blogData.date}</span>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="font-medium">5 min read</span>
                </motion.div>
              </div>

              {/* Share Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary px-6 py-3 rounded-2xl font-semibold hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 border border-primary/20"
              >
                <Share2 className="w-5 h-5" />
                Share Article
              </motion.button>
            </motion.div>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-8"
            >
              {/* Summary Section */}
              <motion.section
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold text-neutral-800">Summary</h2>
                </div>
                <div 
                  className="prose prose-lg max-w-none text-neutral-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: blogData.summary }}
                />
              </motion.section>

              {/* Main Content Section */}
              <motion.section
                whileHover={{ scale: 1.005 }}
                className="bg-white/50 rounded-3xl p-8 border border-neutral-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800">Full Article</h2>
                </div>
                <div 
                  className="prose prose-lg max-w-none text-neutral-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: blogData.content }}
                />
              </motion.section>
            </motion.div>

            {/* Article Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-12 pt-8 border-t border-neutral-200"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
                  >
                    <Heart className="w-5 h-5" />
                    Like Article
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-600 px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/blogs")}
                  className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Read More Articles
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default Blog;