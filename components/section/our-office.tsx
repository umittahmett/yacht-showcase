import React from 'react'
import { Button } from '../ui/button';
import { Clock } from 'lucide-react';

const OurOffice = () => {
  const businessHours = [
    { day: 'Monday - Friday', hours: '9am - 5pm' },
    { day: 'Saturdays', hours: '11am - 5pm' },
    { day: 'Sundays', hours: '9am - 3pm' },
  ];

  return (
    <section className="bg-main-background">
      <div className="container grid lg:grid-cols-11 gap-10 sm:gap-16 lg:gap-24">
        <div className="lg:col-span-6">
          <h2 className="section-title">Visit Our Office</h2>
          <p className="section-content">
            Eget lorem mattis amet elementum. Aliquet elementum amet nascetur
            cras at arcu cras eget. Enim vitae egestas in pulvinar ullamcorper.
            Orci turpis ante et gravida. Tortor in adipiscing in vitae velit.
            Tincidunt suspendisse et aenean egestas lectus arcu. Quisque erat
            sit massa id sed eleifend ac.
          </p>
          <Button size="lg" className="mt-3 sm:mt-4 lg:mt-5" type="submit">
            Send Message
          </Button>
        </div>

        <div className="lg:col-span-5 py-8 sm:py-10 lg:py-12 px-10 sm:px-12 lg:px-14 bg-secondary rounded-[20px]">
          <h3 className="text-dynamic-4xl mb-2 sm:mb-4 lg:mb-6 text-white">
            Business Hours
          </h3>

          <div className="divide-y divide-border-100">
            {businessHours.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-4 sm:gap-4 lg:gap-5 text-white py-2">
                  <Clock className="text-accent" />
                  <span className="text-dynamic-2xl leading-1.4">
                    {item.day}: {item.hours}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurOffice