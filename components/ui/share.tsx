"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Share2Icon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "./dropdown-menu";
import { Button } from "./button";
import { IconBrandFacebook, IconBrandInstagram, IconBrandTelegram, IconBrandWhatsapp, IconBrandX } from "@tabler/icons-react";
import { usePathname } from "next/navigation";


const Share: React.FC = () => {
  const [sharePopupSupport, setSharePopupSupport] = useState<boolean>(false);
  const pathName = usePathname();

  const handleSharebuttonClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Denizde 1 Hafta",
          text: "Yat kiralama sitesi üzerinden bir ürün paylaşılıyor.",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}${pathName}`,
        })
        .then(() => {
          setSharePopupSupport(true);
        })
        .catch((error) => console.error("Paylaşma hatası: ", error));
    } else {
      setSharePopupSupport(false);
    }
  };

  useEffect(() => {
    if (navigator && window.screen.width < 1440) {
      setSharePopupSupport(true);
    } else {
      setSharePopupSupport(false);
    }
  }, []);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(`${process.env.NEXT_PUBLIC_BASE_URL}${pathName}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      })
      .catch((error) =>
        console.error("Metin kopyalanırken bir hata oluştu:", error)
      );
  };

  return (
    <div>
      {!sharePopupSupport ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={clsx(
                "size-12 cursor-pointer hover:opacity-50 transition-all border rounded-md flex items-center justify-center border-primary-blue"
              )}
            >
              <Share2Icon className="w-5 h-5 text-blue-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-0">
            <DropdownMenuLabel className="p-2.5 text-lg font-semibold border-b">
              Share this link
            </DropdownMenuLabel>
            
            <div className="p-4 space-y-6">
              <div className="space-y-4">
                <p className="text-gray-700 font-medium">Share this link via</p>
                
                {/* Social Media Icons */}
                <div className="flex items-center justify-center space-x-2 *:cursor-pointer *:duration-200 *:size-12 *:rounded-full *:flex *:items-center *:justify-center *:text-white">
                  <button 
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}${pathName}`)}`, '_blank')}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <IconBrandFacebook />
                  </button>
                  
                  <button 
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}${pathName}`)}`, '_blank')}
                    className="bg-black hover:bg-black/80"
                  >
                   <IconBrandX />
                  </button>
                  
                  <button 
                    onClick={() => window.open(`https://www.instagram.com`, '_blank')}
                    className="bg-pink-600 hover:bg-pink-700"
                  >
                   <IconBrandInstagram />
                  </button>
                  
                  <button 
                    onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}${pathName}`)}`, '_blank')}
                    className="bg-green-500 hover:bg-green-600"
                  >
                   <IconBrandWhatsapp />
                  </button>
                  
                  <button 
                    onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}${pathName}`)}`, '_blank')}
                    className="bg-sky-500 hover:bg-sky-600"
                  >
                   <IconBrandTelegram />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-gray-700 font-medium">Or copy link</p>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border">
                  <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <input 
                    value={`${process.env.NEXT_PUBLIC_BASE_URL}${pathName}`} 
                    readOnly
                    className="flex-1 bg-transparent text-sm text-gray-600 focus:outline-none"
                  />
                  <Button 
                    size="sm" 
                    onClick={handleCopy}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      copied && 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <button
          onClick={handleSharebuttonClick}
          id="sharebutton"
          className={clsx(
            "size-12 cursor-pointer hover:opacity-50 transition-all border rounded-md flex items-center justify-center border-primary-blue"
          )}
        >
          <Share2Icon className="w-5 h-5 text-blue-500" />
        </button>
      )}
    </div>
  );
};

export default Share;