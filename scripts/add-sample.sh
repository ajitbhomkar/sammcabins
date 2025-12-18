#!/bin/bash
echo "Adding sample cabin..."
curl -X POST http://localhost:3000/api/admin/content \
  -H "Content-Type: application/json" \
  -d '{"type":"cabin","data":{"name":"FS-001 VIP Cabin","description":"Premium VIP porta cabin with high-quality finishes and modern amenities","price":15000,"capacity":4,"bedrooms":1,"bathrooms":1,"size":"20ft x 8ft","amenities":["Air Conditioning","Premium Fixtures"],"images":["/images/cabins/vip-cabin.jpg"],"featured":true}}'
echo ""
echo "Done! Visit http://localhost:3000/admin to see it"
