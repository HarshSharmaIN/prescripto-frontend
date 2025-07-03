import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

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

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white mt-20"
    >
      <div className="px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <img src={assets.logo} alt="Logo" className="w-48 h-auto brightness-0 invert" />
            <p className="text-neutral-300 leading-relaxed">
              Your trusted partner in managing healthcare needs conveniently and efficiently. 
              We connect you with the best medical professionals for comprehensive care.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <motion.div
                  key={social}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors"
                >
                  <div className="w-5 h-5 bg-white rounded-sm"></div>
                </motion.div>
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
              <h3 className="text-xl font-bold text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.icon ? (
                      <>
                        <link.icon className="w-4 h-4 text-primary" />
                        <span>{link.text}</span>
                      </>
                    ) : (
                      <span>{link}</span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="border-t border-neutral-700 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-400 text-sm flex items-center gap-2">
              Copyright © {currentYear} Harsh Sharma - All Rights Reserved
              <Heart className="w-4 h-4 text-red-500" />
            </p>
            <div className="flex space-x-6 text-sm text-neutral-400">
              <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Cookie Policy</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;