// Script to populate the admin panel with content from saamcabins.com
// Run with: npx tsx scripts/populate-content.ts

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
    images: ['/images/cabins/vip-cabin-1.jpg', '/images/cabins/vip-cabin-2.jpg'],
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
    images: ['/images/cabins/office-cabin-1.jpg', '/images/cabins/office-cabin-2.jpg'],
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
    images: ['/images/cabins/security-1person.jpg'],
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
    images: ['/images/cabins/security-2person.jpg'],
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
    images: ['/images/cabins/security-3person.jpg'],
    featured: false
  },
  {
    name: 'Security Cabin with Toilet',
    description: 'Enhanced security cabin with integrated toilet facility. Perfect for long-duty shifts and remote locations. Features comfortable seating area and basic amenities for extended use.',
    price: 8500,
    capacity: 2,
    bedrooms: 0,
    bathrooms: 1,
    size: '12ft x 8ft',
    amenities: ['Integrated Toilet', 'Comfortable Seating', 'Climate Control', 'Storage', 'Lighting'],
    images: ['/images/cabins/security-toilet.jpg'],
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
    images: ['/images/cabins/site-office-1.jpg', '/images/cabins/site-office-2.jpg'],
    featured: true
  },
  {
    name: 'Toilet Units',
    description: 'Porta cabin toilet units starting from 1 unit to customized up to 20 units. Complete with plumbing fixtures, ventilation, and lighting. Available in various configurations to suit your needs.',
    price: 4000,
    capacity: 1,
    bedrooms: 0,
    bathrooms: 1,
    size: '8ft x 6ft',
    amenities: ['Plumbing Fixtures', 'Ventilation', 'Lighting', 'Water Tank', 'Waste Management'],
    images: ['/images/cabins/toilet-unit.jpg'],
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
    images: ['/images/cabins/modified-container.jpg'],
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
    images: ['/images/cabins/double-story.jpg'],
    featured: true
  }
];

const amenitiesData = [
  {
    name: 'Air Conditioning',
    description: 'High-efficiency air conditioning systems to keep your porta cabin comfortable in UAE\'s hot climate. Energy-efficient cooling solutions suitable for all cabin sizes.',
    category: 'Comfort',
    icon: '❄️',
    image: '/images/amenities/air-conditioning.jpg'
  },
  {
    name: 'Electrical Setup',
    description: 'Complete electrical installations including power outlets, lighting fixtures, and circuit breakers. Compliant with UAE electrical safety standards.',
    category: 'Utilities',
    icon: '⚡',
    image: '/images/amenities/electrical.jpg'
  },
  {
    name: 'Insulated Walls',
    description: 'Premium insulation materials for temperature control and noise reduction. Keeps interiors cool and reduces energy costs.',
    category: 'Construction',
    icon: '🏗️',
    image: '/images/amenities/insulation.jpg'
  },
  {
    name: 'Plumbing Fixtures',
    description: 'Quality plumbing installations including toilets, sinks, and water supply systems. Water-efficient fixtures with reliable performance.',
    category: 'Utilities',
    icon: '🚰',
    image: '/images/amenities/plumbing.jpg'
  },
  {
    name: 'Security Features',
    description: 'Enhanced security with reinforced doors, window grills, and lockable systems. Secure storage solutions integrated into design.',
    category: 'Safety',
    icon: '🔒',
    image: '/images/amenities/security.jpg'
  },
  {
    name: 'Climate Control',
    description: 'Advanced HVAC systems for year-round comfort. Maintains optimal temperature and humidity levels in all weather conditions.',
    category: 'Comfort',
    icon: '🌡️',
    image: '/images/amenities/climate-control.jpg'
  },
  {
    name: 'Fire Safety',
    description: 'Fire-resistant materials and safety equipment including extinguishers and smoke detectors. Compliant with UAE fire safety regulations.',
    category: 'Safety',
    icon: '🧯',
    image: '/images/amenities/fire-safety.jpg'
  },
  {
    name: 'Custom Interiors',
    description: 'Tailored interior designs to match your specific requirements. Choice of flooring, wall finishes, and ceiling options.',
    category: 'Customization',
    icon: '🎨',
    image: '/images/amenities/custom-interior.jpg'
  },
  {
    name: 'Ventilation',
    description: 'Proper ventilation systems ensuring fresh air circulation. Includes exhaust fans and air vents strategically placed.',
    category: 'Comfort',
    icon: '💨',
    image: '/images/amenities/ventilation.jpg'
  },
  {
    name: 'Furniture Packages',
    description: 'Optional furniture packages including desks, chairs, storage cabinets, and shelving. Quality furniture suitable for office use.',
    category: 'Customization',
    icon: '🪑',
    image: '/images/amenities/furniture.jpg'
  },
  {
    name: 'Water Tanks',
    description: 'Integrated water storage tanks for reliable water supply. Available in various capacities based on cabin size and usage.',
    category: 'Utilities',
    icon: '💧',
    image: '/images/amenities/water-tank.jpg'
  },
  {
    name: 'Weather Resistant',
    description: 'Durable exterior materials resistant to harsh UAE weather conditions. UV-protected coatings and rust-resistant components.',
    category: 'Construction',
    icon: '☀️',
    image: '/images/amenities/weather-resistant.jpg'
  }
];

const galleryData = [
  {
    title: 'VIP Cabin Exterior',
    description: 'Premium VIP porta cabin exterior view showcasing modern design and quality finishes',
    category: 'Exterior',
    image: '/images/gallery/vip-exterior.jpg'
  },
  {
    title: 'Office Cabin Interior',
    description: 'Spacious office cabin interior with work desks and comfortable seating',
    category: 'Interior',
    image: '/images/gallery/office-interior.jpg'
  },
  {
    title: 'Security Cabin Setup',
    description: 'Security cabin installation at construction site entrance',
    category: 'Exterior',
    image: '/images/gallery/security-setup.jpg'
  },
  {
    title: 'Site Office Workspace',
    description: 'Professional site office workspace with meeting area',
    category: 'Interior',
    image: '/images/gallery/site-office-workspace.jpg'
  },
  {
    title: 'Toilet Unit Installation',
    description: 'Modern toilet unit with quality plumbing fixtures',
    category: 'Amenities',
    image: '/images/gallery/toilet-unit.jpg'
  },
  {
    title: 'Double Story Cabin',
    description: 'Impressive double-story porta cabin with staircase access',
    category: 'Exterior',
    image: '/images/gallery/double-story.jpg'
  },
  {
    title: 'Manufacturing Facility',
    description: 'Our state-of-the-art manufacturing facility in Sharjah',
    category: 'Custom',
    image: '/images/gallery/manufacturing.jpg'
  },
  {
    title: 'Custom Container Conversion',
    description: 'Modified shipping container with custom interior',
    category: 'Custom',
    image: '/images/gallery/container-conversion.jpg'
  },
  {
    title: 'Climate Control System',
    description: 'Advanced HVAC installation in porta cabin',
    category: 'Amenities',
    image: '/images/gallery/climate-control.jpg'
  },
  {
    title: 'Multiple Cabin Setup',
    description: 'Multiple porta cabins installed at large construction project',
    category: 'Exterior',
    image: '/images/gallery/multiple-setup.jpg'
  }
];

async function populateContent() {
  console.log('🚀 Starting content population from saamcabins.com...\n');

  try {
    // Fetch current content
    console.log('📊 Fetching current content...');
    const response = await fetch(`${BASE_URL}/api/admin/content`);
    const currentContent = await response.json();
    
    console.log(`Current content: ${currentContent.cabins.length} cabins, ${currentContent.amenities.length} amenities, ${currentContent.gallery.length} gallery items\n`);

    // Add Cabins
    console.log('🏠 Adding cabins...');
    for (const cabin of cabinsData) {
      try {
        const res = await fetch(`${BASE_URL}/api/admin/content`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'cabin', data: cabin })
        });
        await res.json();
        console.log(`  ✅ Added: ${cabin.name}`);
      } catch {
        console.log(`  ❌ Failed to add: ${cabin.name}`);
      }
    }

    // Add Amenities
    console.log('\n✨ Adding amenities...');
    for (const amenity of amenitiesData) {
      try {
        const res = await fetch(`${BASE_URL}/api/admin/content`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'amenity', data: amenity })
        });
        await res.json();
        console.log(`  ✅ Added: ${amenity.name} (Category: ${amenity.category})`);
      } catch {
        console.log(`  ❌ Failed to add: ${amenity.name}`);
      }
    }

    // Add Gallery Items
    console.log('\n📸 Adding gallery items...');
    for (const item of galleryData) {
      try {
        const res = await fetch(`${BASE_URL}/api/admin/content`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'gallery', data: item })
        });
        await res.json();
        console.log(`  ✅ Added: ${item.title} (Category: ${item.category})`);
      } catch {
        console.log(`  ❌ Failed to add: ${item.title}`);
      }
    }

    // Fetch updated content
    console.log('\n📊 Fetching updated content...');
    const updatedResponse = await fetch(`${BASE_URL}/api/admin/content`);
    const updatedContent = await updatedResponse.json();
    
    console.log(`\n✅ Content population complete!`);
    console.log(`   ${updatedContent.cabins.length} cabins`);
    console.log(`   ${updatedContent.amenities.length} amenities`);
    console.log(`   ${updatedContent.gallery.length} gallery items`);
    console.log(`\n🎉 All content from saamcabins.com has been added to your admin panel!`);
    console.log(`   Visit ${BASE_URL}/admin to view and modify the content.\n`);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error populating content:', errorMessage);
    console.log('\n⚠️  Make sure the development server is running: npm run dev\n');
  }
}

populateContent();
