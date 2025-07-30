import ContactForm from '@/components/form/contact-form'
import Faq from '@/components/section/faq'
import OurOffice from '@/components/section/our-office'
import React from 'react'

const ContactPage = () => {
  return (
    <div>
      <ContactForm />
      <OurOffice />
      <Faq />
    </div>
  )
}

export default ContactPage