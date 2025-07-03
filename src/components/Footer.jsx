import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Heart, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

import { assets } from "../assets/assets";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "COMPANY",
      links: ["Home", "About us", "Contact us", "Privacy Policy"]
    },
    {
      title: "GET IN TOUCH",
      links: [
        { icon: Phone, text: "+91 012 345 6789" },
        { icon: Mail, text: "admin@prescripto.com" },
        { icon: MapPin, text: "Bidhannagar, Durgapur" }
      ]
    }
  ];

  const socialIcons = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white mt-20 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="relative px-4 md:px-8 lg:px-16 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <img src={assets.logo} alt="Logo" className="w-8 h-8 brightness-0 invert" />
                </div>
                <span className="text-2xl font-bold">Prescripto</span>
              </div>
              
              <p className="text-neutral-300 leading-relaxed text-lg">
                Your trusted partner in managing healthcare needs conveniently and efficiently. 
                We connect you with the best medical professionals for comprehensive care.
              </p>
              
              <div className="flex space-x-4">
                {socialIcons.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center cursor-pointer hover:from-primary/30 hover:to-secondary/30 transition-all duration-300 group"
                  >
                    <social.icon className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-white relative">
                  {section.title}
                  <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-3 text-neutral-300 hover:text-white transition-colors cursor-pointer group"
                    >
                      {link.icon ? (
                        <>
                          <div className="w-8 h-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 transition-all">
                            <link.icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-lg">{link.text}</span>
                        </>
                      ) : (
                        <span className="text-lg hover:text-primary transition-colors">{link}</span>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl border border-white/10"
          >
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-white">Stay Updated</h3>
              <p className="text-neutral-300 text-lg">Subscribe to our newsletter for health tips and updates</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
            className="border-t border-neutral-700 mt-16 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-neutral-400 text-lg flex items-center gap-2">
                Copyright © {currentYear} Harsh Sharma - All Rights Reserved
                <Heart className="w-5 h-5 text-red-500 animate-pulse" />
              </p>
              <div className="flex space-x-8 text-lg text-neutral-400">
                <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
                <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                <span className="hover:text-white transition-colors cursor-pointer">Cookie Policy</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;