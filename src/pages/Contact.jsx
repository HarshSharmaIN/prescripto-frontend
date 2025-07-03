import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle, Users, Award } from 'lucide-react';

import { assets } from '../assets/assets';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+91 012 345 6789",
      description: "Available 24/7 for emergencies"
    },
    {
      icon: Mail,
      title: "Email",
      details: "admin@prescripto.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Bidhannagar, Durgapur",
      description: "West Bengal, India"
    }
  ];

  const stats = [
    { icon: MessageCircle, value: "24/7", label: "Support" },
    { icon: Users, value: "50K+", label: "Happy Patients" },
    { icon: Award, value: "100+", label: "Expert Doctors" },
    { icon: Clock, value: "<1hr", label: "Response Time" }
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
          Get In <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Touch</span>
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 px-4 max-w-4xl mx-auto"
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
            <div className="text-2xl font-bold text-neutral-800 mb-1">{stat.value}</div>
            <div className="text-sm text-neutral-600">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-neutral-800 mb-6">
                Let's Start a Conversation
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                We're here to help and answer any question you might have. 
                We look forward to hearing from you.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-neutral-100"
                >
                  <div className="p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-1">
                      {info.title}
                    </h3>
                    <p className="text-primary font-medium mb-1">{info.details}</p>
                    <p className="text-sm text-neutral-600">{info.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-neutral-100"
          >
            <h3 className="text-2xl font-bold text-neutral-800 mb-6">
              Send us a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="What's this about?"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us more about your inquiry..."
                  required
                ></textarea>
              </div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <img
            src={assets.contact_image}
            alt="Contact us"
            className="max-w-md mx-auto rounded-3xl shadow-2xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;