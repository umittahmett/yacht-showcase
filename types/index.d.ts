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

export interface InforBlockProps{
  indicator: ReactNode | number;
  title: string
  content: string
  link?: string
}

export interface StatProps{
  value: number
  suffix: string
  content: string
}