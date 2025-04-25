"use client";
import Image from "next/image";
import WavesBackground from "@assets/images/waves-background.webp";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  searchParams: { error?: string; error_description?: string };
}>) {
  const searchParams = useSearchParams();
  const errorMessage =
    searchParams?.get("error_description") ||
    searchParams?.get("error")?.replace("Error: ", "");

  const resetParams = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("error");
    params.delete("error_description");
    const newUrl = `${window.location.pathname}`;
    window.history.replaceState({}, "", newUrl);
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error([errorMessage], {
        onAutoClose: () => resetParams(),
        onDismiss: () => resetParams(),
        action: {
          label: "Dismiss",
          onClick: () => resetParams(),
        },
      });
    }
  }, [searchParams]);

  return (
    <div className="h-dvh relative">
      <div className="relative z-10">
        <div className="flex items-center justify-center w-full h-dvh">
          <div className="border relative border-neutral-200 shadow-sm max-w-md overflow-hidden rounded-3xl p-10 w-full">
            {/* Form Element */}
            {children}

            {/* Gradient */}
            <div className="bg-gradient-to-bl from-sky-400 via-white to-white absolute top-0 left-0 w-full h-full opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Background */}
      <Image
        className="size-full absolute inset-0"
        src={WavesBackground}
        alt="auth-background"
      />
    </div>
  );
}
