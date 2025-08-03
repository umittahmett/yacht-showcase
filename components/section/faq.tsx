'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    title: "Booking and Reservations",
    items: [
      {
        id: "booking-1",
        question: "How do I book a yacht with Yachtera?",
        answer: "Id dignissim ac ultrices sed imperdiet id. Odio velit morbi cum a magna euismod. Commodo amet mauris quis at."
      },
      {
        id: "booking-2",
        question: "Can I modify my booking after it has been confirmed?",
        answer: "Id dignissim ac ultrices sed imperdiet id. Odio velit morbi cum a magna euismod. Commodo amet mauris quis at."
      },
      {
        id: "booking-3",
        question: "What is the cancellation policy?",
        answer: "Id dignissim ac ultrices sed imperdiet id. Odio velit morbi cum a magna euismod. Commodo amet mauris quis at."
      },
      {
        id: "booking-4",
        question: "Are there any additional fees I should be aware of?",
        answer: "Id dignissim ac ultrices sed imperdiet id. Odio velit morbi cum a magna euismod. Commodo amet mauris quis at."
      },
      {
        id: "booking-5",
        question: "How far in advance should I book my yacht?",
        answer: "Id dignissim ac ultrices sed imperdiet id. Odio velit morbi cum a magna euismod. Commodo amet mauris quis at."
      }
    ]
  },
  {
    title: "Onboard Experience",
    items: [
      {
        id: "onboard-1",
        question: "What amenities are included on the yacht?",
        answer: "Id dignissim ac ultrices sed imperdiet id. Odio velit morbi cum a magna euismod. Commodo amet mauris quis at."
      },
      {
        id: "onboard-2",
        question: "Are meals included in the charter?",
        answer: "Id dignissim ac ultrices sed imperdiet id. Odio velit morbi cum a magna euismod. Commodo amet mauris quis at."
      },
      {
        id: "onboard-3",
        question: "Can I bring my own food and beverages on board?",
        answer: "Id dignissim ac ultrices sed imperdiet id. Odio velit morbi cum a magna euismod. Commodo amet mauris quis at."
      },
      {
        id: "onboard-4",
        question: "Is there Wi-Fi available on the yacht?",
        answer: "Id dignissim ac ultrices sed imperdiet id. Odio velit morbi cum a magna euismod. Commodo amet mauris quis at."
      },
      {
        id: "onboard-5",
        question: "What activities are available during the voyage?",
        answer: "Id dignissim ac ultrices sed imperdiet id. Odio velit morbi cum a magna euismod. Commodo amet mauris quis at."
      }
    ]
  }
];

const Faq = () => {
  return (
    <section>
      <div className="container grid md:grid-cols-2 gap-12 lg:gap-36">
        {faqData.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            className="space-y-4 sm:space-y-6 lg:space-y-9"
          >
            <h3 className="text-primary-500 text-dynamic-4xl leading-1.4">
              {category.title}
              <div className="mt-3 sm:mt-4 lg:mt-5 w-1/6 h-px bg-secondary-500"></div>
            </h3>
            <Accordion
              type="multiple"
              className="w-full"
              defaultValue={[category.items[0].id]}
            >
              {category.items.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance text-gray-600">
                    <p>{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
