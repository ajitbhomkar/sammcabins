'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative isolate min-h-screen">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-blue-900">
          {/* Placeholder gradient background until image is available */}
        </div>
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 sm:py-48 lg:py-56">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            PORTA CABIN SOLUTIONS
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Manufacturing and supplying high-quality porta cabins across UAE. 
            From site offices to custom solutions, we provide innovative designs that save your valuable time and money.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Contact Us
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/cabins"
              className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20"
            >
              View Products
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}