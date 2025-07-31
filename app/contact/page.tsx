import ContactForm from '@/components/form/contact-form'
import Faq from '@/components/section/faq'
import Hero from '@/components/section/hero'
import OurOffice from '@/components/section/our-office'
import React from 'react'

const ContactPage = () => {
  return (
    <div>
      <Hero pages={[{ title: "Contact Us" , href: '/contact'}]} title="Contact Us" />
      <ContactForm />
      <OurOffice />
      <Faq />
    </div>
  );
}

export default ContactPage