import Link from 'next/link'
import Image from 'next/image'
import Logo from '@assets/images/logos/logo.png'
import { Button } from '../ui/button'

const Header = () => {
  const navigationLinks = [
    { name: 'Home', href: '/', isActive: true },
    { name: 'About Us', href: '/about', isActive: false },
    { name: 'Services', href: '/services', isActive: false },
    { name: 'Boat Rental', href: '/pages', isActive: false },
    { name: 'Contact Us', href: '/contact', isActive: false },
  ]

  return (
    <header className="bg-white py-4 sm:py-5 lg:py-6">
      <div className="container flex items-center justify-between">
      <Image src={Logo} alt="Denizdebirhafta Logo" className="w-fit h-10" />

      <nav className="hidden lg:flex items-center space-x-8">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className='font-[Unna] text-dynamic-base tracking-tight uppercase leading-1.1 hover:text-accent duration-200'
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <Button size="lg" asChild>
          <Link href={"/"}>Book Now</Link>
        </Button>
      </div>
    </header>
  );
}

export default Header