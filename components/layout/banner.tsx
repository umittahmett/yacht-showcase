import { Mail, Phone } from 'lucide-react';
import Link from 'next/link'
import InstagramIcon from '@assets/brand/instagram.svg';
import XIcon from '@assets/brand/x.svg';

const Banner = () => {
  return (
    <div className="bg-secondary-500 py-2.5 sm:py-3 lg:py-3.5">
      <div className="container flex items-center justify-between gap-2.5 sm:gap-6 lg:gap-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-6 lg:gap-8">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-white hover:text-white/90 duration-200 text-xs md:text-sm leading-1.4"
          >
            <InstagramIcon className='max-md:w-4' />
            official.denizdebirhafta
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-white hover:text-white/90 duration-200 text-xs md:text-sm leading-1.4"
          >
            <XIcon className='max-md:w-4' />
            denizdebirhafta
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-6 lg:gap-8">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-white hover:text-white/90 duration-200 text-xs md:text-sm leading-1.4"
          >
            <Phone className='max-md:w-4' />
            +905424051413
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-white hover:text-white/90 duration-200 text-xs md:text-sm leading-1.4"
          >
            <Mail className='max-md:w-4' />
            support@denizdebirhafta.com
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banner