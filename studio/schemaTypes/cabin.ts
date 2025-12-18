import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'cabin',
  title: 'Cabin',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Cabin Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'price',
      title: 'Price per Night',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'capacity',
      title: 'Guest Capacity',
      type: 'number',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'bedrooms',
      title: 'Number of Bedrooms',
      type: 'number',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'bathrooms',
      title: 'Number of Bathrooms',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'amenity'}]}],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Cabin',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'available',
      title: 'Available for Booking',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'mainImage',
      subtitle: 'price',
    },
    prepare(selection) {
      const {title, media, subtitle} = selection
      return {
        title,
        media,
        subtitle: subtitle ? `$${subtitle}/night` : 'No price set',
      }
    },
  },
})
