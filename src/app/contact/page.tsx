import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Contact Us - SAAM Cabins',
  description: 'Get in touch with SAAM Cabins for inquiries about our porta cabin solutions across UAE. Manufacturing unit based in Sharjah.',
};

export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg leading-8 text-teal-100">
              Need a custom porta cabin solution? Our team of experts is here to help you with your requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <p className="text-gray-600 mb-8">
                Whether you need a site office, security cabin, or custom porta cabin solution, our team of experts is ready to assist you. We manufacture and supply across UAE.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <PhoneIcon className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Phone Numbers</p>
                    <p className="mt-1 text-gray-600">Direct: +971 58 201 2073</p>
                    <p className="text-gray-600">Landline: +971 6 714 4832</p>
                    <p className="text-gray-600">Fax: +971 6 714 4801</p>
                  </div>
                </div>

                <div className="flex items-start gap-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <EnvelopeIcon className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Email</p>
                    <p className="mt-1 text-gray-600">sales@saamcabins.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <MapPinIcon className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Main Office</p>
                    <p className="mt-1 text-gray-600">
                      P2 Hamriyah<br />
                      P.O. Box 662<br />
                      UAE
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <ClockIcon className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Business Hours</p>
                    <p className="mt-1 text-gray-600">Saturday - Thursday: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Friday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose SAAM Cabins?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">UAE-based manufacturing facility in Sharjah</span>
                </li>
                <li className="flex items-start gap-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Custom solutions tailored to your needs</span>
                </li>
                <li className="flex items-start gap-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">High-quality materials and construction</span>
                </li>
                <li className="flex items-start gap-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Fast delivery across UAE</span>
                </li>
                <li className="flex items-start gap-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Experienced team with 20+ years in the industry</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section (Optional - can be added later with Google Maps) */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Visit Our Facility</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our state-of-the-art manufacturing facility is located in Hamriyah, Sharjah
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-96 flex items-center justify-center">
            <p className="text-gray-500">Map location coming soon</p>
          </div>
        </div>
      </div>
    </main>
  );
}