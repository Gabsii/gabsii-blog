import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    maxLoginAttempts: 5, // Automatically lock a user out after X amount of failed logins
    lockTime: 60 * 60 * 100, // Time period to allow the max login attempts in seconds
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
