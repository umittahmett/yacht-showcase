import Image from 'next/image';
import Logo from "@assets/images/logos/logo.png";
import { Button } from '../ui/button';
import { BaseLinkProps, FooterGroupProps } from '@/types';
import Link from 'next/link';

const Footer = () => {
  const footerData: FooterGroupProps[] = [
    {
      title: "Company",
      links: [
        { label: "Home", href: "/" },
        { label: "About us", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Destinations", href: "/destinations" },
        { label: "Yacht Rental", href: "/yacht-rental" },
        { label: "Documentation", href: "/documentation" },
        { label: "Blog & News", href: "/blog" },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "Customer Support", href: "/support" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];
  return (
    <footer className="py-12 sm:py-14 lg:py-16 bg-primary-500">
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 sm:gap-14 lg:gap-20">
          <div className="max-w-80 w-full space-y-4 lg:space-y-5">
            <Image
              src={Logo}
              alt="Denizdebirhafta Logo"
              className="w-fit h-14"
            />
            <p className="leading-1.6 text-text-color">
              Faucibus quis fringilla scelerisque dui. Amet parturient dui
              venenatis amet sagittis viverra vel tincidunt. Orci tincidunt.
            </p>
            <Button size="lg">Book Now</Button>
          </div>

          <div className="flex flex-wrap sm:grid grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
            {footerData.map((group: FooterGroupProps, idx: number) => (
              <div key={idx}>
                <h2 className="text-white font-[Unna] text-dynamic-2xl mb-3 sm:mb-4 lg:mb-5">
                  {group.title}
                </h2>
                <div className="space-y-3.5 text-text-color leading-1.6">
                  {group.links.map((link: BaseLinkProps, linkIdx: number) => (
                    <div key={linkIdx}>
                      <Link
                        className="text-text-color hover:text-white duration-200 hover:underline"
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between gap-2.5 border-t border-border-200 pt-3 sm:pt-4 lg:pt-5 mt-8 sm:mt-12 lg:mt-16 text-gray-100 leading-1.6 ">
          <p>Copyright © 2025 Denizdebirhafta</p>
          <div>
            <span>Design By</span>
            {" "}
            <Link
              className="text-text-color hover:text-white duration-200 hover:underline"
              href="https://umitahmet.com"
            >
              umitahmet.com
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer