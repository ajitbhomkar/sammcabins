import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'About Us',
  description: 'Learn about SAAM Cabins - your trusted provider of innovative porta cabin solutions in UAE with in-house production and quality craftsmanship.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About SAAM Cabins
            </h1>
            <p className="text-xl md:text-2xl text-teal-50 max-w-3xl mx-auto">
              Safe Industry Solutions with In-House Production
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              To Provide Innovative Solutions Matching to Latest Trends
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  SAAM CABINS have an extensive range of standard cabins that can be 
                  constructed to your specifications. We offer an extensive range of 
                  Porta Cabin ablution Units, site offices, Security Cabins, Porta Cabin 
                  Toilets, and Portable toilets in different standard pre-designed units 
                  to choose from, with economical designs and quality fittings and furnishings.
                </p>
                <p>
                  We pride ourselves in our ability to design and create affordable, 
                  customized and environmentally friendly portable buildings as well as 
                  professional requirements. This is why we continue to lead the way in 
                  modular buildings.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20" />
              <Image
                src="/images/placeholders/cabin-1.jpg"
                alt="SAAM Cabins facility"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Affordable Solutions
              </h3>
              <p className="text-gray-700 leading-relaxed">
                If you&apos;re looking for a temporary low cost Porta Cabin solution, 
                check out our Porta Cabins. These units are not only affordable but 
                also practical, comfortable and extremely secure.
              </p>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quality Features
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Fabricated in our factory, these units are insulated and feature a 
                range of options including fire security, doors and windows, vinyl 
                flooring, split system air conditioner, kitchenette with zip hot water 
                system, and bathroom with partition wall.
              </p>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Fast Delivery
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our Cabins are available for UAE delivery and can be built to order 
                within a few days. We ensure quick turnaround times without 
                compromising on quality.
              </p>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Custom Solutions
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We specialize in creating customized and environmentally friendly 
                portable buildings tailored to your professional requirements, 
                maintaining our leadership in modular buildings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Want To Work With Us?
          </h2>
          <p className="text-xl text-teal-50 mb-8">
            Get in touch today for a quote on our porta cabin solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-teal-600 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
            >
              Let&apos;s Work Together
            </Link>
            <a
              href="tel:+971582012073"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-lg hover:bg-white hover:text-teal-600 transition-colors"
            >
              Call: +971 58 201 2073
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-gray-300">Sharjah, UAE</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-300">+971 58 201 2073</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-300">info@saamcabins.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
