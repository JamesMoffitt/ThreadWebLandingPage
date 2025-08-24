import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://sdegvehgvdbchxjbjauc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZWd2ZWhndmRiY2h4amJqYXVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NjU3NDEsImV4cCI6MjA2MTI0MTc0MX0.mQ96YNbPI-dW32JtioFqwf0YxPS1-7QbIwXZLcT25fE'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for contact form data
export interface ContactFormData {
  name: string
  email: string
  message: string
  user: boolean
  creator: boolean
  retailer: boolean
  other: boolean
}

// Database operations
export const contactAPI = {
  // Submit contact form
  async submitForm(formData: ContactFormData) {
    try {
      const { data, error } = await supabase
        .from('landing_page')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            user: formData.user,
            creator: formData.creator,
            retailer: formData.retailer,
            other: formData.other,
          }
        ])

      if (error) {
        console.error('Supabase error:', error)
        return { success: false, error: error.message }
      }

      return { success: true, data }
    } catch (error) {
      console.error('Unexpected error:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  },
}
