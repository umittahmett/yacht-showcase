import Link from 'next/link';
import { Button } from '../ui/button';
import { InfoBlockProps } from '@/types';
import clsx from 'clsx';

const InfoBlock:React.FC<InfoBlockProps> = ({indicator,title, content, link, variant="vertical", iconSize="default" }) => {
  return (
    <article
      className={clsx(
        "flex",
        variant == "horizontal" && "flex-row items-start gap-4 sm:gap-5 lg:gap-6",
        variant == "vertical" && "flex-col items-start gap-2.5"
      )}
    >
      <div
        className={clsx(
          "bg-secondary rounded-[10px] flex items-center justify-center leading-1.6 text-white shrink-0 mb-1 lg:mb-1.5",
          {
            "size-10 sm:size-11 lg:size-12": iconSize == "default",
            "size-14 sm:size-16 lg:size-[74px]": iconSize == "lg",
          }
        )}
      >
        {indicator}
      </div>

      <div className="space-y-2.5 text-start">
        <h3 className="text-dynamic-2xl leading-1.4 text-primary">{title}</h3>
        <p className="text-text-color leading-1.6">{content}</p>
        {link && (
          <Button variant="link" asChild>
            <Link href={link}>Read More</Link>
          </Button>
        )}
      </div>
    </article>
  );
}

export default InfoBlock