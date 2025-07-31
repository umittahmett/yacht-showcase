import { StaticImageData } from "next/image";

export interface SidebarItemProps{
    title: string;
    url: string;
    icon: LucideIcon;
}

export interface Language {
  id: number;
  code: string;
  name: string;
}

export interface InfoBlockProps{
  indicator: ReactNode | number;
  title: string
  content: string
  link?: string
  variant?: 'horizontal' | 'vertical'
  iconSize?: 'default' | 'lg'
}

export interface StatProps{
  value: number
  suffix: string
  content: string
}

export interface ClientCommentProps{
  text: string
  point: number
  author: {
    picture: StaticImageData | string
    name: string
    title: string
  }
}

export interface BaseLinkProps {
  label: string
  href: string
}

export interface FooterGroupProps {
  title: string
  links: BaseLinkProps[]
}

export interface HighLightVideoProps{
  videoSrc: string
  thumbnailSrc: string
  thumbnailAlt: string
}

export interface ContentCardProps{
  indicator?: ReactNode | number;
  title: string
  content: string
  reverse?: boolean
}