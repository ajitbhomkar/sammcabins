import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'amenity',
  title: 'Amenity',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Amenity Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Outdoor Activities', value: 'outdoor'},
          {title: 'Indoor Comfort', value: 'indoor'},
          {title: 'Kitchen & Dining', value: 'kitchen'},
          {title: 'Entertainment', value: 'entertainment'},
          {title: 'Safety & Security', value: 'safety'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Heroicons icon name (e.g., "wifi", "fire", "home")',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
  },
})
