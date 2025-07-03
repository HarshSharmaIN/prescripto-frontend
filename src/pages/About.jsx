import React from "react";
import { motion } from "framer-motion";
import { Heart, Shield, Users, Award, CheckCircle, Star } from "lucide-react";

import { assets } from "../assets/assets";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Efficiency",
      description: "Streamlined appointment scheduling that fits into your busy lifestyle."
    },
    {
      icon: Users,
      title: "Convenience", 
      description: "Access to a network of trusted healthcare professionals in your area."
    },
    {
      icon: Heart,
      title: "Personalization",
      description: "Tailored recommendations and reminders to help you stay on top of your health."
    }
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Happy Patients" },
    { icon: Award, value: "100+", label: "Expert Doctors" },
    { icon: Star, value: "4.9", label: "Average Rating" },
    { icon: CheckCircle, value: "99%", label: "Success Rate" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
          About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Prescripto</span>
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Your trusted partner in managing healthcare needs conveniently and efficiently.
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 px-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-neutral-100"
          >
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold text-neutral-800 mb-1">{stat.value}</div>
            <div className="text-sm text-neutral-600">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-center gap-12 mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="lg:w-1/2"
          >
            <img
              src={assets.about_image}
              alt="About Prescripto"
              className="w-full rounded-3xl shadow-2xl"
            />
          </motion.div>
          
          <div className="lg:w-1/2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-lg text-neutral-700 leading-relaxed">
                Welcome to Prescripto, your trusted partner in managing your
                healthcare needs conveniently and efficiently. At Prescripto, we
                understand the challenges individuals face when it comes to
                scheduling doctor appointments and managing their health records.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-lg text-neutral-700 leading-relaxed">
                Prescripto is committed to excellence in healthcare technology. We
                continuously strive to enhance our platform, integrating the latest
                advancements to improve user experience and deliver superior
                service. Whether you're booking your first appointment or managing
                ongoing care, Prescripto is here to support you every step of the
                way.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20"
            >
              <h3 className="text-xl font-bold text-neutral-800 mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Our Vision
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                Our vision at Prescripto is to create a seamless healthcare
                experience for every user. We aim to bridge the gap between patients
                and healthcare providers, making it easier for you to access the
                care you need, when you need it.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Why <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Choose Us</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            We're committed to providing the best healthcare experience through innovation and care.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-100 text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;