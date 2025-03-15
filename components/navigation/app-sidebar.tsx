"use client";
import Logo from "@assets/images/logos/logo.png";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { sidebarNavigation } from "@/lib/constants/navigation";
import Link from "next/link";

export function AppSidebar() {
  const [user, setUser] = useState<any>();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      setUser(res.data.user);
      console.log(res.data.user?.email);
    });
  }, []);

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/">
          <Image className="w-[80%]" src={Logo} alt="Denizdebirhafta Logo" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="h-full pb-4">
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent className="h-full">
            <SidebarMenu className="h-full">
              {sidebarNavigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
