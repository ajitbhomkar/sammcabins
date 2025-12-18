'use client';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const features = [
  {
    name: 'Site Offices',
    description: 'Customizable office spaces from single room to multiple rooms with pantry and toilet facilities.',
  },
  {
    name: 'Security Cabins',
    description: 'Fire-rated security cabins available in various sizes with optional toilet and AC installation.',
  },
  {
    name: 'Toilet Units',
    description: 'Single units to complete ablution facilities with professional plumbing and sanitary installations.',
  },
  {
    name: 'Quality Standards',
    description: 'High-level quality and safety maintained in our Sharjah-based manufacturing process.',
  },
  {
    name: 'Complete Solutions',
    description: 'Full service including supply, installation, and optional amenities across UAE.',
  },
  {
    name: 'Custom Projects',
    description: 'Innovative solutions matching the latest trends and specific client requirements.',
  },
] as const;

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <Hero />
        
        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-24 sm:py-32"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Porta Cabin Solutions
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                We provide innovative porta cabin solutions manufactured at our Sharjah facility,
                delivering quality products and professional installation across UAE.
              </p>
            </div>
            
            {/* Feature Grid */}
            <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
              <dl className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <motion.div
                    key={feature.name}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col"
                  >
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                      {feature.name}
                    </dt>
                    <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}
