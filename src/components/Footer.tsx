import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              SAAM Cabins
            </span>
            <p className="mt-4 text-sm text-gray-600">
              Leading manufacturer of high-quality porta cabins in UAE.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Quick Links</h3>
              <ul className="mt-6 space-y-4">
                <li><Link href="/" className="text-sm text-gray-600 hover:text-teal-600">Home</Link></li>
                <li><Link href="/cabins" className="text-sm text-gray-600 hover:text-teal-600">Cabins</Link></li>
                <li><Link href="/about" className="text-sm text-gray-600 hover:text-teal-600">About Us</Link></li>
                <li><Link href="/gallery" className="text-sm text-gray-600 hover:text-teal-600">Gallery</Link></li>
                <li><Link href="/contact" className="text-sm text-gray-600 hover:text-teal-600">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">Contact Us</h3>
              <ul className="mt-6 space-y-4">
                <li className="text-sm text-gray-600">+971 58 201 2073</li>
                <li className="text-sm text-gray-600">sales@saamcabins.com</li>
                <li className="text-sm text-gray-600">P2 Hamriyah, UAE</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-300 pt-8">
          <p className="text-xs text-gray-500 text-center">
            &copy; {new Date().getFullYear()} SAAM Cabins. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
