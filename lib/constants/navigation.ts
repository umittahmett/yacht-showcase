import { SidebarItemProps } from "@/types";
import { FileType2, Home, Package2, Settings } from "lucide-react";

export const sidebarNavigation:SidebarItemProps[] = [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Products",
      url: "/dashboard/products", 
      icon: Package2,
    },
    {
      title: "Blogs",
      url: "/dashboard/blogs", 
      icon: FileType2,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
]