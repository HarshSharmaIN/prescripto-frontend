import { Star, User, Calendar, ThumbsUp, Quote } from "lucide-react";
import { motion } from "framer-motion";

const Review = ({ review }) => {
  const { userName, stars, date, content } = review;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const renderStars = (stars) => {
    return [...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.2, rotate: 360 }}
        transition={{ duration: 0.3 }}
      >
        <Star
          className={`w-5 h-5 ${
            i < stars ? "text-yellow-500 fill-yellow-500" : "text-neutral-300"
          }`}
        />
      </motion.div>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group my-6 p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-neutral-100 relative overflow-hidden"
    >
      {/* Animated background on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />

      {/* Quote decoration */}
      <motion.div
        className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Quote className="w-12 h-12 text-primary" />
      </motion.div>

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-14 h-14 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center border border-primary/20"
            >
              <User className="w-7 h-7 text-primary" />
            </motion.div>
            <div>
              <motion.h4
                className="text-xl font-bold text-neutral-900 group-hover:text-primary transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
              >
                {userName}
              </motion.h4>
              <motion.div
                className="flex items-center gap-2 text-sm text-neutral-500"
                whileHover={{ scale: 1.05 }}
              >
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="flex items-center gap-1"
            whileHover={{ scale: 1.1 }}
          >
            {renderStars(stars)}
          </motion.div>
        </div>

        <motion.p
          className="text-neutral-700 leading-relaxed text-lg mb-6 relative"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          "{content}"
        </motion.p>

        {/* Action buttons */}
        <div className="flex items-center gap-4">
          <motion.div
            className="w-1 h-1 bg-neutral-300 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <motion.span
            className="text-sm text-neutral-500"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Verified Patient
          </motion.span>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-2 left-2 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 right-2 w-1.5 h-1.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default Review;
