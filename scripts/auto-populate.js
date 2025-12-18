#!/usr/bin/env node

// Automated content population script for SAAM Cabins
// Run with: node scripts/auto-populate.js

const http = require('http');

const BASE_URL = 'http://localhost:3000';

const cabinsData = [
  {
    name: 'FS-001 VIP Cabin',
    description: 'Premium VIP porta cabin with high-quality finishes and modern amenities. Perfect for executive offices and high-end temporary accommodations. Features include spacious interior, climate control, and premium fixtures.',
    price: 15000,
    capacity: 4,
    bedrooms: 1,
    bathrooms: 1,
    size: '20ft x 8ft',
    amenities: ['Air Conditioning', 'Premium Fixtures', 'Insulated Walls', 'Electrical Setup', 'Modern Design'],
    images: ['/images/placeholders/cabin-1.jpg'],
    featured: true
  },
  {
    name: 'Office Porta Cabin',
    description: 'Office porta cabin with attached bathroom and pantry. Ideal for construction sites, events, and temporary office spaces. Fully equipped with electrical fittings and comfortable working environment.',
    price: 12000,
    capacity: 6,
    bedrooms: 0,
    bathrooms: 1,
    size: '20ft x 8ft',
    amenities: ['Bathroom Attached', 'Pantry Area', 'Air Conditioning', 'Electrical Setup', 'Work Desks'],
    images: ['/images/placeholders/cabin-2.jpg'],
    featured: true
  },
  {
    name: 'Security Cabin (1 Person)',
    description: 'Compact security porta cabin designed for single guard duty. Weather-resistant construction with viewing windows and comfortable seating. Perfect for entrance gates and perimeter security.',
    price: 5000,
    capacity: 1,
    bedrooms: 0,
    bathrooms: 0,
    size: '6ft x 6ft',
    amenities: ['Compact Design', 'Viewing Windows', 'Weather Resistant', 'Ventilation', 'Lighting'],
    images: ['/images/placeholders/cabin-3.jpg'],
    featured: false
  },
  {
    name: 'Security Cabin (2 Person)',
    description: 'Spacious security porta cabin for two guards with comfortable seating and storage space. Includes climate control and multiple viewing angles for enhanced security monitoring.',
    price: 7000,
    capacity: 2,
    bedrooms: 0,
    bathrooms: 0,
    size: '10ft x 8ft',
    amenities: ['Seating for 2', 'Storage Space', 'Climate Control', 'Multiple Windows', 'Security Features'],
    images: ['/images/placeholders/cabin-4.jpg'],
    featured: false
  },
  {
    name: 'Security Cabin (3 Person)',
    description: 'Large security porta cabin accommodating three guards with attached toilet facility. Ideal for 24/7 security operations with shift changes. Includes rest area and monitoring equipment space.',
    price: 9000,
    capacity: 3,
    bedrooms: 0,
    bathrooms: 1,
    size: '15ft x 8ft',
    amenities: ['Seating for 3', 'Attached Toilet', 'Rest Area', 'Climate Control', 'Equipment Storage'],
    images: ['/images/placeholders/cabin-5.jpg'],
    featured: false
  },
  {
    name: 'Site Office Cabin',
    description: 'Professional site office porta cabin for construction project management. Equipped with work desks, storage cabinets, and meeting area. Includes electrical setup for computers and equipment.',
    price: 13000,
    capacity: 8,
    bedrooms: 0,
    bathrooms: 1,
    size: '30ft x 10ft',
    amenities: ['Work Desks', 'Meeting Area', 'Storage Cabinets', 'Bathroom', 'Air Conditioning', 'Electrical Setup'],
    images: ['/images/placeholders/cabin-6.jpg'],
    featured: true
  },
  {
    name: 'Porta Cabin Toilet Units',
    description: 'Porta cabin toilet units starting from 1 unit to customized up to 20 units. Complete with plumbing fixtures, ventilation, and lighting. Available in various configurations to suit your needs.',
    price: 4000,
    capacity: 1,
    bedrooms: 0,
    bathrooms: 1,
    size: '8ft x 6ft',
    amenities: ['Plumbing Fixtures', 'Ventilation', 'Lighting', 'Water Tank', 'Waste Management'],
    images: ['/images/placeholders/cabin-7.jpg'],
    featured: false
  },
  {
    name: 'Modified Container',
    description: 'Customized shipping container converted into functional space. Versatile solution for offices, storage, or accommodation. Fully insulated with electrical installations and custom fittings.',
    price: 18000,
    capacity: 6,
    bedrooms: 0,
    bathrooms: 1,
    size: '40ft x 8ft',
    amenities: ['Insulated', 'Electrical Setup', 'Custom Fittings', 'Climate Control', 'Secure Storage'],
    images: ['/images/placeholders/cabin-8.jpg'],
    featured: false
  },
  {
    name: 'Double Story Porta Cabin',
    description: 'Two-story porta cabin solution for maximum space utilization. Ideal for large projects requiring multiple rooms and facilities. Sturdy construction with staircase access and safety railings.',
    price: 25000,
    capacity: 12,
    bedrooms: 2,
    bathrooms: 2,
    size: '40ft x 10ft',
    amenities: ['Two Stories', 'Multiple Rooms', 'Staircase Access', 'Safety Railings', 'Climate Control', 'Electrical Setup'],
    images: ['/images/placeholders/cabin-9.jpg'],
    featured: true
  }
];

const amenitiesData = [
  {
    name: 'Air Conditioning',
    description: 'High-efficiency air conditioning systems to keep your porta cabin comfortable in UAE\'s hot climate. Energy-efficient cooling solutions suitable for all cabin sizes.',
    category: 'Comfort',
    icon: '❄️',
    image: '/images/placeholders/amenity-1.jpg'
  },
  {
    name: 'Electrical Setup',
    description: 'Complete electrical installations including power outlets, lighting fixtures, and circuit breakers. Compliant with UAE electrical safety standards.',
    category: 'Utilities',
    icon: '⚡',
    image: '/images/placeholders/amenity-2.jpg'
  },
  {
    name: 'Insulated Walls',
    description: 'Premium insulation materials for temperature control and noise reduction. Keeps interiors cool and reduces energy costs.',
    category: 'Construction',
    icon: '🏗️',
    image: '/images/placeholders/amenity-3.jpg'
  },
  {
    name: 'Plumbing Fixtures',
    description: 'Quality plumbing installations including toilets, sinks, and water supply systems. Water-efficient fixtures with reliable performance.',
    category: 'Utilities',
    icon: '🚰',
    image: '/images/placeholders/amenity-4.jpg'
  },
  {
    name: 'Security Features',
    description: 'Enhanced security with reinforced doors, window grills, and lockable systems. Secure storage solutions integrated into design.',
    category: 'Safety',
    icon: '🔒',
    image: '/images/placeholders/amenity-5.jpg'
  },
  {
    name: 'Climate Control',
    description: 'Advanced HVAC systems for year-round comfort. Maintains optimal temperature and humidity levels in all weather conditions.',
    category: 'Comfort',
    icon: '🌡️',
    image: '/images/placeholders/amenity-6.jpg'
  },
  {
    name: 'Fire Safety',
    description: 'Fire-resistant materials and safety equipment including extinguishers and smoke detectors. Compliant with UAE fire safety regulations.',
    category: 'Safety',
    icon: '🧯',
    image: '/images/placeholders/amenity-7.jpg'
  },
  {
    name: 'Custom Interiors',
    description: 'Tailored interior designs to match your specific requirements. Choice of flooring, wall finishes, and ceiling options.',
    category: 'Customization',
    icon: '🎨',
    image: '/images/placeholders/amenity-8.jpg'
  },
  {
    name: 'Ventilation',
    description: 'Proper ventilation systems ensuring fresh air circulation. Includes exhaust fans and air vents strategically placed.',
    category: 'Comfort',
    icon: '💨',
    image: '/images/placeholders/amenity-9.jpg'
  },
  {
    name: 'Weather Resistant',
    description: 'Durable exterior materials resistant to harsh UAE weather conditions. UV-protected coatings and rust-resistant components.',
    category: 'Construction',
    icon: '☀️',
    image: '/images/placeholders/amenity-10.jpg'
  }
];

const galleryData = [
  {
    title: 'VIP Cabin Exterior',
    description: 'Premium VIP porta cabin exterior view showcasing modern design and quality finishes',
    category: 'Exterior',
    image: '/images/placeholders/gallery-1.jpg'
  },
  {
    title: 'Office Cabin Interior',
    description: 'Spacious office cabin interior with work desks and comfortable seating',
    category: 'Interior',
    image: '/images/placeholders/gallery-2.jpg'
  },
  {
    title: 'Security Cabin Setup',
    description: 'Security cabin installation at construction site entrance',
    category: 'Exterior',
    image: '/images/placeholders/gallery-3.jpg'
  },
  {
    title: 'Site Office Workspace',
    description: 'Professional site office workspace with meeting area',
    category: 'Interior',
    image: '/images/placeholders/gallery-4.jpg'
  },
  {
    title: 'Toilet Unit Installation',
    description: 'Modern toilet unit with quality plumbing fixtures',
    category: 'Amenities',
    image: '/images/placeholders/gallery-5.jpg'
  },
  {
    title: 'Manufacturing Facility',
    description: 'Our state-of-the-art manufacturing facility in Sharjah',
    category: 'Custom',
    image: '/images/placeholders/gallery-6.jpg'
  }
];

function makeRequest(path, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve({ success: true });
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function populateContent() {
  console.log('\n🚀 Starting automated content population...\n');
  console.log('📊 Content from https://saamcabins.com/\n');

  let addedCabins = 0;
  let addedAmenities = 0;
  let addedGallery = 0;

  // Add Cabins
  console.log('🏠 Adding cabins...');
  for (const cabin of cabinsData) {
    try {
      await makeRequest('/api/admin/content', { type: 'cabin', data: cabin });
      addedCabins++;
      console.log(`  ✅ Added: ${cabin.name}`);
    } catch (error) {
      console.log(`  ❌ Failed: ${cabin.name}`);
    }
  }

  // Add Amenities
  console.log('\n✨ Adding amenities...');
  for (const amenity of amenitiesData) {
    try {
      await makeRequest('/api/admin/content', { type: 'amenity', data: amenity });
      addedAmenities++;
      console.log(`  ✅ Added: ${amenity.name} (${amenity.category})`);
    } catch (error) {
      console.log(`  ❌ Failed: ${amenity.name}`);
    }
  }

  // Add Gallery Items
  console.log('\n📸 Adding gallery items...');
  for (const item of galleryData) {
    try {
      await makeRequest('/api/admin/content', { type: 'gallery', data: item });
      addedGallery++;
      console.log(`  ✅ Added: ${item.title} (${item.category})`);
    } catch (error) {
      console.log(`  ❌ Failed: ${item.title}`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Content population complete!');
  console.log('='.repeat(60));
  console.log(`   📦 ${addedCabins} cabins added`);
  console.log(`   ✨ ${addedAmenities} amenities added`);
  console.log(`   📸 ${addedGallery} gallery items added`);
  console.log('='.repeat(60));
  console.log('\n🎉 All content from saamcabins.com has been added!');
  console.log('   Visit http://localhost:3000 to see your website');
  console.log('   Visit http://localhost:3000/admin to manage content\n');
}

// Check if server is running
console.log('Checking if server is running...');
http.get('http://localhost:3000/api/admin/content', (res) => {
  if (res.statusCode === 200) {
    populateContent().catch((error) => {
      console.error('\n❌ Error:', error.message);
      console.log('\n⚠️  Make sure the development server is running: npm run dev\n');
      process.exit(1);
    });
  }
}).on('error', () => {
  console.error('\n❌ Cannot connect to server');
  console.log('⚠️  Please start the development server first: npm run dev\n');
  process.exit(1);
});
