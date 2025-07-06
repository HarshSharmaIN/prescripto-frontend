import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, User, Clock, ArrowLeft, BookOpen, Share2, Heart, Eye, Copy, MessageCircle, Facebook, Twitter, Linkedin } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const Blog = () => {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
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
        setLikeCount(data.blog.likes || 89); // Default likes count
        // Check if user has liked this blog (you can implement this with user context)
        setIsLiked(false);
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

  const handleLike = async () => {
    try {
      // Toggle like state immediately for better UX
      setIsLiked(!isLiked);
      setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
      
      // Here you would make an API call to update likes in the backend
      // const { data } = await axios.post(backendUrl + "/api/blog/toggle-like", { blogId });
      
      toast.success(isLiked ? "Removed from favorites" : "Added to favorites!");
    } catch (error) {
      // Revert the state if API call fails
      setIsLiked(isLiked);
      setLikeCount(prev => isLiked ? prev + 1 : prev - 1);
      toast.error("Failed to update like status");
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blogData?.title || "Check out this medical article";
    const text = blogData?.summary || "Interesting medical insights";

    switch (platform) {
      case 'copy':
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
        setShowShareModal(false);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: title,
            text: text,
            url: url,
          });
        } else {
          navigator.clipboard.writeText(url);
          toast.success("Link copied to clipboard!");
        }
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
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-4xl sm:text-6xl mb-4">📝</div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-700 mb-2">Blog not found</h2>
          <p className="text-neutral-500 text-sm sm:text-base">The article you're looking for doesn't exist.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 py-4 sm:py-8">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 30, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-56 h-56 sm:w-72 sm:h-72 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-4">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/blogs")}
          className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 text-primary hover:text-secondary transition-colors font-semibold text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Back to Articles
        </motion.button>

        {/* Article Card */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden relative"
        >
          {/* Decorative elements */}
          <motion.div
            className="absolute top-4 right-4 opacity-10"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
          </motion.div>

          {/* Cover Image */}
          {blogData.coverImg && (
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden"
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
                className="absolute bottom-3 sm:bottom-4 lg:bottom-6 right-3 sm:right-4 lg:right-6 flex flex-col sm:flex-row gap-2 sm:gap-4"
              >
                <div className="flex items-center gap-1 sm:gap-2 bg-white/90 backdrop-blur-md px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-lg sm:rounded-2xl">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-semibold text-neutral-700">1.2k views</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 bg-white/90 backdrop-blur-md px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-lg sm:rounded-2xl">
                  <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-red-500'}`} />
                  <span className="text-xs sm:text-sm font-semibold text-neutral-700">{likeCount} likes</span>
                </div>
              </motion.div>
            </motion.div>
          )}
          
          <div className="p-4 sm:p-6 md:p-8 lg:p-12 relative z-10">
            {/* Article Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 sm:mb-8"
            >
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 mb-4 sm:mb-6 leading-tight"
                whileHover={{ scale: 1.01 }}
              >
                {blogData.title}
              </motion.h1>

              {/* Author & Date Info */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-neutral-600 mb-4 sm:mb-6">
                <motion.div 
                  className="flex items-center gap-2 sm:gap-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl sm:rounded-2xl flex items-center justify-center">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800 text-sm sm:text-base">{blogData.author}</p>
                    <p className="text-xs sm:text-sm text-neutral-500">Medical Expert</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-1 sm:gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                  <span className="font-medium text-sm sm:text-base">{blogData.date}</span>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-1 sm:gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                  <span className="font-medium text-sm sm:text-base">5 min read</span>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLike}
                  className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                    isLiked 
                      ? 'bg-red-100 text-red-600 border border-red-200' 
                      : 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isLiked ? 'fill-red-500' : ''}`} />
                  {isLiked ? 'Liked' : 'Like'} Article ({likeCount})
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowShareModal(true)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 border border-primary/20 text-sm sm:text-base"
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  Share Article
                </motion.button>
              </div>
            </motion.div>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Summary Section */}
              <motion.section
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-blue-100"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-800">Summary</h2>
                </div>
                <div 
                  className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-neutral-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: blogData.summary }}
                />
              </motion.section>

              {/* Main Content Section */}
              <motion.section
                whileHover={{ scale: 1.005 }}
                className="bg-white/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-neutral-100"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-primary to-secondary rounded-lg sm:rounded-xl flex items-center justify-center">
                    <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-800">Full Article</h2>
                </div>
                <div 
                  className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-neutral-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: blogData.content }}
                />
              </motion.section>
            </motion.div>

            {/* Article Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-neutral-200"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                      isLiked 
                        ? 'bg-red-100 text-red-600 border border-red-200' 
                        : 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200'
                    }`}
                  >
                    <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isLiked ? 'fill-red-500' : ''}`} />
                    {isLiked ? 'Liked' : 'Like'} Article
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowShareModal(true)}
                    className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 text-sm sm:text-base"
                  >
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    Share
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/blogs")}
                  className="bg-gradient-to-r from-primary to-secondary text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                >
                  Read More Articles
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.article>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowShareModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 max-w-sm sm:max-w-md w-full shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-neutral-800">Share Article</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-neutral-600 rotate-45" />
              </motion.button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShare('copy')}
                className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-neutral-50 hover:bg-neutral-100 rounded-xl sm:rounded-2xl transition-colors"
              >
                <Copy className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                <span className="text-xs sm:text-sm font-medium text-neutral-700">Copy Link</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShare('whatsapp')}
                className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-green-50 hover:bg-green-100 rounded-xl sm:rounded-2xl transition-colors"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                <span className="text-xs sm:text-sm font-medium text-green-700">WhatsApp</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShare('facebook')}
                className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-xl sm:rounded-2xl transition-colors"
              >
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                <span className="text-xs sm:text-sm font-medium text-blue-700">Facebook</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShare('twitter')}
                className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-sky-50 hover:bg-sky-100 rounded-xl sm:rounded-2xl transition-colors"
              >
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
                <span className="text-xs sm:text-sm font-medium text-sky-700">Twitter</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShare('linkedin')}
                className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-xl sm:rounded-2xl transition-colors"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" />
                <span className="text-xs sm:text-sm font-medium text-blue-800">LinkedIn</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShare('native')}
                className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-purple-50 hover:bg-purple-100 rounded-xl sm:rounded-2xl transition-colors"
              >
                <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                <span className="text-xs sm:text-sm font-medium text-purple-700">More</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Blog;