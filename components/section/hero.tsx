import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface HeroProps{
  title: string
  pages: { title: string, href: string }[]
}

const Hero: React.FC<HeroProps> = ({title, pages}) => {
  return (
    <section className="bg-secondary-500 py-6 sm:py-10">
      <div className="container min-h-44 sm:min-h-60 md:min-h-80 lg:min-h-[370px] flex flex-col items-center justify-center">
        <h1 className="py-1 text-dynamic-6xl section-title title-light sm:text-dynamic-7.5xl font-[Unna]">
          {title}
        </h1>

        <Breadcrumb className="mt-2 sm:mt-4 lg:mt-5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {pages.map((page, idx) => (
              <div className="flex items-center gap-4" key={idx}>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  {idx == pages.length || pages.length == 1 ? (
                    <BreadcrumbPage>{page.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={page.href}>{title}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </section>
  );
};

export default Hero