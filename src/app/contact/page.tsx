import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Contact Us - SAAM Cabins',
  description: 'Get in touch with SAAM Cabins for inquiries about our porta cabin solutions across UAE. Manufacturing unit based in Sharjah.',
};

export default function Contact() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white pt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Contact Us
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Need a custom porta cabin solution? Our team of experts is here to help you with your requirements.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="mx-auto w-full max-w-xl">
              <ContactForm />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
                <p className="mt-4 text-gray-600">
                  Whether you need a site office, security cabin, or custom porta cabin solution, our team of experts is ready to assist you. We manufacture and supply across UAE.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-x-4">
                  <PhoneIcon className="h-6 w-6 text-gray-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Direct Number</p>
                    <p className="mt-1 text-gray-600">+971 58 201 2073</p>
                    <p className="text-sm font-semibold text-gray-900 mt-2">Landline</p>
                    <p className="mt-1 text-gray-600">+971 6 714 4832</p>
                  </div>
                </div>

                <div className="flex items-center gap-x-4">
                  <EnvelopeIcon className="h-6 w-6 text-gray-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Email</p>
                    <p className="mt-1 text-gray-600">sales@saamcabins.com</p>
                    <p className="text-sm font-semibold text-gray-900 mt-2">Fax</p>
                    <p className="mt-1 text-gray-600">+971 6 714 4801</p>
                  </div>
                </div>

                <div className="flex items-center gap-x-4">
                  <MapPinIcon className="h-6 w-6 text-gray-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Main Office</p>
                    <p className="mt-1 text-gray-600">P2 Hamriyah<br />P.O. Box 662<br />UAE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}