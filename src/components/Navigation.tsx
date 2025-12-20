'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';
import TopContactBar from './TopContactBar';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Cabins', href: '/cabins' },
  { name: 'Gallery', href: '/gallery' },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [settings, setSettings] = useState<{
    logo?: string;
    siteName?: string;
    theme?: { primaryColor: string; secondaryColor: string };
  } | null>(null);

  useEffect(() => {
    fetch('/api/admin/content')
      .then((res) => res.json())
      .then((data) => {
        if (data.siteSettings) {
          setSettings(data.siteSettings);
        }
      })
      .catch((error) => console.error('Error loading settings:', error));
  }, []);

  const primaryColor = settings?.theme?.primaryColor || '#0d9488';
  const secondaryColor = settings?.theme?.secondaryColor || '#06b6d4';


  return (
    <>
      <TopContactBar />
      <header className="fixed top-0 left-0 right-0 z-50 shadow-lg">
        {/* Main Navigation - White */}
        <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Global">
            <div className="flex h-20 items-center justify-between">
            <div className="flex lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-3">
                {settings && settings.logo ? (
                  <>
                    <div className="relative h-12 w-32">
                      {settings.logo && (
                        <Image
                          src={settings.logo as string}
                          alt={settings.siteName || 'Logo'}
                          fill
                          className="object-contain"
                          priority
                        />
                      )}
                    </div>
                    {settings.siteName && (
                      <span className="text-2xl font-bold" style={{
                        background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}>
                        {settings.siteName}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    SAAM Cabins
                  </span>
                )}
              </Link>
            </div>

            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-semibold leading-6 transition-colors ${
                    pathname === item.href
                      ? ''
                      : 'text-gray-900 hover:text-teal-600'
                  }`}
                  style={pathname === item.href ? { color: primaryColor } : {}}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Link
                href="/admin"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-lg transition-all"
                style={{
                  background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
                }}
              >
                Admin Panel
              </Link>
            </div>
            </div>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 z-50 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                  {settings && settings.logo ? (
                    <>
                      <div className="relative h-10 w-24">
                        {settings.logo && (
                          <Image
                            src={settings.logo as string}
                            alt={settings.siteName || 'Logo'}
                            fill
                            className="object-contain"
                            priority
                          />
                        )}
                      </div>
                      {settings.siteName && (
                        <span className="text-xl font-bold" style={{
                          background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>
                          {settings.siteName}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                      SAAM Cabins
                    </span>
                  )}
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                          pathname === item.href
                            ? 'bg-teal-50 text-teal-600'
                            : 'text-gray-900 hover:bg-gray-50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <Link
                      href="/admin"
                      className="block rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 px-3 py-2.5 text-center text-base font-semibold text-white shadow-sm hover:from-teal-700 hover:to-cyan-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
