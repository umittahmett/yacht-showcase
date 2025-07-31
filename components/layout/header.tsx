"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import Logo from '@assets/images/logos/logo.png'
import { Button } from '../ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navigationLinks = [
    { name: 'Home', href: '/', isActive: true },
    { name: 'About Us', href: '/about-us', isActive: false },
    { name: 'Services', href: '/services', isActive: false },
    { name: 'Boat Rental', href: '/pages', isActive: false },
    { name: 'Contact Us', href: '/contact', isActive: false },
  ]

  return (
    <header className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="container flex items-center justify-between">
        <Link href='/'>
          <Image src={Logo} alt="Denizdebirhafta Logo" className="w-fit h-10" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-[Unna] text-dynamic-base tracking-tight uppercase leading-1.1 hover:text-accent duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button size="lg" asChild>
            <Link href={"/"}>Book Now</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center space-x-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2 cursor-pointer">
                <Menu className="size-6" />
                <span className="sr-only">Open menu</span>
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-l-0 bg-white text-black w-[280px] sm:w-[350px]"
            >
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Image
                    src={Logo}
                    alt="Denizdebirhafta Logo"
                    className="w-fit h-8"
                  />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-6 mt-8 p-4 pt-0">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-[Unna] stracking-tight uppercase leading-1.1 hover:text-secondary duration-200 text-dynamic-lg"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <Button size="lg" asChild className="w-full">
                    <Link href={"/"} onClick={() => setIsOpen(false)}>
                      Book Now
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header