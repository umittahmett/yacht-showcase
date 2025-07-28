import Link from 'next/link';
import { Button } from '../ui/button';
import { InforBlockProps } from '@/types';

const InforBlock:React.FC<InforBlockProps> = ({indicator,title, content, link}) => {
  return (
    <article className='space-y-2.5 text-start'>
      <div className='bg-secondary rounded-[10px] flex items-center justify-center leading-1.6 text-white size-10 sm:size-11 lg:size-12'>
        {indicator}
      </div>
      <h3 className='text-dynamic-2xl leading-1.4 text-primary pt-1 lg:pt-1.5'>{title}</h3>
      <p className='text-text-color leading-1.6'>{content}</p>
      { link &&
        <Button variant='link' asChild>
          <Link href={link}>Read More</Link>
        </Button>
      }
    </article>
  )
}

export default InforBlock