"use client"

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";


export default function AnimatedMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  const isLinkActive = (href: string) => {
    return pathname == href
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex justify-center">
      <div className="relative w-full max-w-[2000px] pointer-events-none">
        {/* Menu Button - Responsive positioning */}
        <button
          onClick={toggleMenu}
          className={`
          pointer-events-auto
          absolute z-50 border border-(--main-50) shadow-lg
          transition-all duration-300 flex items-center justify-center group cursor-pointer
          
          /* Mobile: Square button in top-left corner */
          top-2 right-2 w-12 h-12 rounded-lg
          
          /* Tablet: Full height vertical bar on left side */
          // md:top-2 md:right-2 z-100 md:w-10 md:h-10

          /* Desktop */
          lg:top-1/2 lg:-translate-y-1/2 lg:left-4
        `}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >

          {/*  */}
          <div className="relative w-6 xl:w-8 h-6 xl:h-8 flex items-center justify-center">
            <div className="space-y-1">
              <div
                className={`w-6 h-0.5 bg-(--main-50) transition-all duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-1.5 opacity-80" : "opacity-100"
                  }`}
              />
              <div
                className={`w-6 h-0.5 bg-(--main-50) transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"
                  }`}
              />
              <div
                className={`w-6 h-0.5 bg-(--main-50) transition-all duration-300 ease-in-out ${isOpen ? "-rotate-45 -translate-y-1.5 opacity-80" : "opacity-100"
                  }`}
              />
            </div>
          </div>
        </button>

        {/* Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          onClick={toggleMenu}
        >
          {/* Menu Panel */}
          <div
            className={`fixed left-0 top-0 h-full w-full px-5 bg-(--main-500) border-r-2 border-(--main-200) shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 pt-10 md:pt-20 xl:pl-20">

              {/* Links */}
              <nav className="space-y-6">
                <Link
                  href="/"
                  onClick={handleLinkClick}
                  className={`block text-2xl font-playfair transition-colors duration-300 ${isLinkActive("/") ? "text-(--main-10) font-semibold" : "text-(--main-200) hover:text-(--main-100)"
                    }`}
                >
                  Home
                </Link>
                <Link
                  href="/hair/"
                  onClick={handleLinkClick}
                  className={`block text-2xl font-playfair transition-colors duration-300 ${isLinkActive("/hair") ? "text-(--main-10) font-semibold" : "text-(--main-200) hover:text-(--main-100)"
                    }`}
                >
                  Hair
                </Link>
                <Link
                  href="/nail"
                  onClick={handleLinkClick}
                  className={`block text-2xl font-playfair transition-colors duration-300 ${isLinkActive("/nail") ? "text-(--main-10) font-semibold" : "text-(--main-200) hover:text-(--main-100)"
                    }`}
                >
                  Nails
                </Link>
                <Link
                  href="/beauty"
                  onClick={handleLinkClick}
                  className={`block text-2xl font-playfair transition-colors duration-300 ${isLinkActive("/beauty") ? "text-(--main-10) font-semibold" : "text-(--main-200) hover:text-(--main-100)"
                    }`}
                >
                  Beauty
                </Link>
                <Link
                  href="/products"
                  onClick={handleLinkClick}
                  className={`block text-2xl font-playfair transition-colors duration-300 ${isLinkActive("/beauty") ? "text-(--main-10) font-semibold" : "text-(--main-200) hover:text-(--main-100)"
                    }`}
                >
                  Products
                </Link>
              </nav>

              <div className="mt-12 pt-8 border-t border-[#B8860B] border-opacity-30">
                <div className="space-y-4 text-(--main-100)">
                  <div className="font-source-sans">
                    <strong>Address:</strong>
                    <br />
                    195A Upper Richmond Road
                    <br />
                    Putney
                    <br />
                    London
                    <br />
                    SW15 6SG
                  </div>
                  <div className="font-source-sans">
                    <strong>Hours:</strong>

                    <div className="flex w-53 justify-between">
                      <span>Monday</span>
                      <span>9:00 - 19:00</span>
                    </div>
                    <div className="flex w-53 justify-between">
                      <span>Tuesday</span>
                      <span>9:00 - 19:00</span>
                    </div>
                    <div className="flex w-53 justify-between">
                      <span>Wednesday</span>
                      <span>9:00 - 19:00</span>
                    </div>
                    <div className="flex w-53 justify-between">
                      <span>Thursday</span>
                      <span>9:00 - 19:00</span>
                    </div>
                    <div className="flex w-53 justify-between">
                      <span>Friday</span>
                      <span>9:00 - 19:00</span>
                    </div>
                    <div className="flex w-53 justify-between">
                      <span>Saturday</span>
                      <span>10:00 - 17:00</span>
                    </div>
                    <div className="flex w-53 justify-between">
                      <span>Sunday</span>
                      <span>10:00 - 17:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}