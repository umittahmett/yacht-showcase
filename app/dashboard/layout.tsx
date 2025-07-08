import { AppSidebar } from "@/components/navigation/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import WavesBackground from "@assets/images/waves-background.webp";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="relative w-full overflow-hidden max-h-dvh p-6 lg:p-8 !pb-0 bg-repeat bg-cover ">
          <SidebarTrigger className="relative z-10" />
          <div className="relative mx-auto z-10 max-h-full scrollbar-hidden overflow-y-auto container px-2.5">
            {children}
          </div>
          {/* Background */}
          <Image
            className="size-full -z-1- absolute inset-0"
            src={WavesBackground}
            alt="auth-background"
          />
        </main>
      </SidebarProvider>
    </div>
  );
}
