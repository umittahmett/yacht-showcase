"use client";

import { Input } from "@/components/ui/input";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

const ContactForm = () => {
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    surname: z.string().min(2, {
      message: "Surname must be at least 2 characters.",
    }),
    phone: z.string().min(2, {
      message: "Phone must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    message: z.string().min(2, {
      message: "Message must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section className="container grid lg:grid-cols-11 gap-10 sm:gap-16 lg:gap-24">
      <div className="lg:col-span-5">
        <h2 className="section-title">Get in Touch with Our Team</h2>
        <p className="section-content">
          Id dignissim ac ultrices sed imperdiet id. Odio velit morbi cum a
          magna euismod. Commodo amet mauris quis at.
        </p>

        <div className="flex items-start flex-wrap gap-6 sm:gap-10 lg:gap-20 mt-6 sm:mt-8 lg:mt-10">
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            <h3 className="font-[Unna] text-dynamic-xl leading-1.1 tracking-wide">
              EMAIL
            </h3>
            <div className="space-y-2 lg:space-y-3">
              <Link
                href="/"
                className="flex items-center gap-1.5 text-secondary-500 text-sm leading-1.4"
              >
                <Mail />
                support@loremipsum.com
              </Link>
              <Link
                href="/"
                className="flex items-center gap-1.5 text-secondary-500 text-sm leading-1.4"
              >
                <Mail />
                office@loremipsum.com
              </Link>
            </div>
          </div>
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            <h3 className="font-[Unna] text-dynamic-xl leading-1.1 tracking-wide">
              PHONE
            </h3>
            <div className="space-y-2 lg:space-y-3">
              <Link
                href="/"
                className="flex items-center gap-1.5 text-secondary-500 text-sm leading-1.4"
              >
                <Phone />
                1-856-256-2896 x972
              </Link>
              <Link
                href="/"
                className="flex items-center gap-1.5 text-secondary-500 text-sm leading-1.4"
              >
                <Phone />
                1-854-440-6416 x862
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid sm:grid-cols-2 gap-x-7 sm:gap-x-8 lg:gap-x-9 gap-y-6 sm:gap-y-7 lg:gap-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input size="lg" placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input size="lg" placeholder="Enter your surname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input size="lg" placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input size="lg" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="lg:col-span-2">
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder="Enter your message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button radius='full' size="lg" className="w-fit" type="submit">
              Send Message
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ContactForm;
