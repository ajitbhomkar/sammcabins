export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SAAM Cabins',
    alternateName: 'SAAM Group',
    url: 'https://saamzgroup.com',
    logo: 'https://saamzgroup.com/images/uploads/logo.png',
    description: 'Leading porta cabin manufacturer in UAE, providing premium quality portable cabins for offices, security, and accommodation.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AE',
      addressRegion: 'Sharjah',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      areaServed: 'AE',
      availableLanguage: ['English', 'Arabic'],
    },
    sameAs: [
      'https://www.facebook.com/saamcabins',
      'https://www.instagram.com/saamcabins',
      'https://www.linkedin.com/company/saamcabins',
    ],
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'SAAM Cabins',
    image: 'https://saamzgroup.com/images/uploads/logo.png',
    '@id': 'https://saamzgroup.com',
    url: 'https://saamzgroup.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AE',
      addressRegion: 'Sharjah',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.3463,
      longitude: 55.4209,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SAAM Cabins',
    url: 'https://saamzgroup.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://saamzgroup.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://saamzgroup.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Porta Cabins',
        item: 'https://saamzgroup.com/cabins',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Gallery',
        item: 'https://saamzgroup.com/gallery',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Contact',
        item: 'https://saamzgroup.com/contact',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
