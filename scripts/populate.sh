#!/bin/bash

echo "🚀 Populating content from saamcabins.com..."
echo ""

# Add Cabins
echo "🏠 Adding cabins..."

curl -s -X POST http://localhost:3000/api/admin/content \
  -H "Content-Type: application/json" \
  -d '{
    "type": "cabin",
    "data": {
      "name": "FS-001 VIP Cabin",
      "description": "Premium VIP porta cabin with high-quality finishes and modern amenities. Perfect for executive offices and high-end temporary accommodations. Features include spacious interior, climate control, and premium fixtures.",
      "price": 15000,
      "capacity": 4,
      "bedrooms": 1,
      "bathrooms": 1,
      "size": "20ft x 8ft",
      "amenities": ["Air Conditioning", "Premium Fixtures", "Insulated Walls", "Electrical Setup", "Modern Design"],
      "images": ["/images/cabins/vip-cabin.jpg"],
      "featured": true
    }
  }' > /dev/null && echo "  ✅ Added: FS-001 VIP Cabin"

curl -s -X POST http://localhost:3000/api/admin/content \
  -H "Content-Type: application/json" \
  -d '{
    "type": "cabin",
    "data": {
      "name": "Office Porta Cabin",
      "description": "Office porta cabin with attached bathroom and pantry. Ideal for construction sites, events, and temporary office spaces. Fully equipped with electrical fittings and comfortable working environment.",
      "price": 12000,
      "capacity": 6,
      "bedrooms": 0,
      "bathrooms": 1,
      "size": "20ft x 8ft",
      "amenities": ["Bathroom Attached", "Pantry Area", "Air Conditioning", "Electrical Setup", "Work Desks"],
      "images": ["/images/cabins/office-cabin.jpg"],
      "featured": true
    }
  }' > /dev/null && echo "  ✅ Added: Office Porta Cabin"

curl -s -X POST http://localhost:3000/api/admin/content \
  -H "Content-Type: application/json" \
  -d '{
    "type": "cabin",
    "data": {
      "name": "Security Cabin (1 Person)",
      "description": "Compact security porta cabin designed for single guard duty. Weather-resistant construction with viewing windows and comfortable seating. Perfect for entrance gates and perimeter security.",
      "price": 5000,
      "capacity": 1,
      "bedrooms": 0,
      "bathrooms": 0,
      "size": "6ft x 6ft",
      "amenities": ["Compact Design", "Viewing Windows", "Weather Resistant", "Ventilation", "Lighting"],
      "images": ["/images/cabins/security-1person.jpg"],
      "featured": false
    }
  }' > /dev/null && echo "  ✅ Added: Security Cabin (1 Person)"

curl -s -X POST http://localhost:3000/api/admin/content \
  -H "Content-Type: application/json" \
  -d '{
    "type": "cabin",
    "data": {
      "name": "Security Cabin (2 Person)",
      "description": "Spacious security porta cabin for two guards with comfortable seating and storage space. Includes climate control and multiple viewing angles for enhanced security monitoring.",
      "price": 7000,
      "capacity": 2,
      "bedrooms": 0,
      "bathrooms": 0,
      "size": "10ft x 8ft",
      "amenities": ["Seating for 2", "Storage Space", "Climate Control", "Multiple Windows", "Security Features"],
      "images": ["/images/cabins/security-2person.jpg"],
      "featured": false
    }
  }' > /dev/null && echo "  ✅ Added: Security Cabin (2 Person)"

curl -s -X POST http://localhost:3000/api/admin/content \
  -H "Content-Type: application/json" \
  -d '{
    "type": "cabin",
    "data": {
      "name": "Security Cabin (3 Person)",
      "description": "Large security porta cabin accommodating three guards with attached toilet facility. Ideal for 24/7 security operations with shift changes. Includes rest area and monitoring equipment space.",
      "price": 9000,
      "capacity": 3,
      "bedrooms": 0,
      "bathrooms": 1,
      "size": "15ft x 8ft",
      "amenities": ["Seating for 3", "Attached Toilet", "Rest Area", "Climate Control", "Equipment Storage"],
      "images": ["/images/cabins/security-3person.jpg"],
      "featured": false
    }
  }' > /dev/null && echo "  ✅ Added: Security Cabin (3 Person)"

curl -s -X POST http://localhost:3000/api/admin/content \
  -H "Content-Type": application/json" \
  -d '{
    "type": "cabin",
    "data": {
      "name": "Site Office Cabin",
      "description": "Professional site office porta cabin for construction project management. Equipped with work desks, storage cabinets, and meeting area. Includes electrical setup for computers and equipment.",
      "price": 13000,
      "capacity": 8,
      "bedrooms": 0,
      "bathrooms": 1,
      "size": "30ft x 10ft",
      "amenities": ["Work Desks", "Meeting Area", "Storage Cabinets", "Bathroom", "Air Conditioning", "Electrical Setup"],
      "images": ["/images/cabins/site-office.jpg"],
      "featured": true
    }
  }' > /dev/null && echo "  ✅ Added: Site Office Cabin"

# Add Amenities
echo ""
echo "✨ Adding amenities..."

curl -s -X POST http://localhost:3000/api/admin/content \
  -H "Content-Type: application/json" \
  -d '{
    "type": "amenity",
    "data": {
      "name": "Air Conditioning",
      "description": "High-efficiency air conditioning systems to keep your porta cabin comfortable in UAE climate",
      "category": "Comfort",
      "icon": "❄️",
      "image": "/images/amenities/air-conditioning.jpg"
    }
  }' > /dev/null && echo "  ✅ Added: Air Conditioning"

curl -s -X POST http://localhost:3000/api/admin/content \
  -H "Content-Type: application/json" \
  -d '{
    "type": "amenity",
    "data": {
      "name": "Electrical Setup",
      "description": "Complete electrical installations including power outlets, lighting fixtures, and circuit breakers",
      "category": "Utilities",
      "icon": "⚡",
      "image": "/images/amenities/electrical.jpg"
    }
  }' > /dev/null && echo "  ✅ Added: Electrical Setup"

curl -s -X POST http://localhost:3000/api/admin/content \
  -H "Content-Type: application/json" \
  -d '{
    "type": "amenity",
    "data": {
      "name": "Insulated Walls",
      "description": "Premium insulation materials for temperature control and noise reduction",
      "category": "Construction",
      "icon": "🏗️",
      "image": "/images/amenities/insulation.jpg"
    }
  }' > /dev/null && echo "  ✅ Added: Insulated Walls"

curl -s -X POST http://localhost:3000/api/admin/content \
  -H "Content-Type: application/json" \
  -d '{
    "type": "amenity",
    "data": {
      "name": "Plumbing Fixtures",
      "description": "Quality plumbing installations including toilets, sinks, and water supply systems",
      "category": "Utilities",
      "icon": "🚰",
      "image": "/images/amenities/plumbing.jpg"
    }
  }' > /dev/null && echo "  ✅ Added: Plumbing Fixtures"

# Add Gallery Items
echo ""
echo "📸 Adding gallery items..."

curl -s -X POST http://localhost:3000/api/admin/content \
  -H "Content-Type: application/json" \
  -d '{
    "type": "gallery",
    "data": {
      "title": "VIP Cabin Exterior",
      "description": "Premium VIP porta cabin exterior view showcasing modern design",
      "category": "Exterior",
      "image": "/images/gallery/vip-exterior.jpg"
    }
  }' > /dev/null && echo "  ✅ Added: VIP Cabin Exterior"

curl -s -X POST http://localhost:3000/api/admin/content \
  -H "Content-Type: application/json" \
  -d '{
    "type": "gallery",
    "data": {
      "title": "Office Cabin Interior",
      "description": "Spacious office cabin interior with work desks",
      "category": "Interior",
      "image": "/images/gallery/office-interior.jpg"
    }
  }' > /dev/null && echo "  ✅ Added: Office Cabin Interior"

curl -s -X POST http://localhost:3000/api/admin/content \
  -H "Content-Type: application/json" \
  -d '{
    "type": "gallery",
    "data": {
      "title": "Security Cabin Setup",
      "description": "Security cabin installation at construction site",
      "category": "Exterior",
      "image": "/images/gallery/security-setup.jpg"
    }
  }' > /dev/null && echo "  ✅ Added: Security Cabin Setup"

echo ""
echo "✅ Content population complete!"
echo "   Visit http://localhost:3000/admin to view and modify the content."
echo ""
