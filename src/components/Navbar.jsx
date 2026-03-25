"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const ASILI_URL = "https://asili.immo";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Acheter", href: `${ASILI_URL}/Search?listing_type=sale` },
    { label: "Louer", href: `${ASILI_URL}/Search?listing_type=rent` },
    { label: "Rechercher", href: `${ASILI_URL}/Search` },
    { label: "Publier une annonce", href: `${ASILI_URL}/CreateProperty` },
    { label: "Guides & reperes", href: "/" },
  ];

  return (
    <header className="bg-gray-900 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6926d34fc8112c409d32c74d/b60f090ea_LOGO-ASILI.png"
            alt="Asili"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            )
          )}
          <a
            href={`${ASILI_URL}/Login`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-amber-400 transition-colors"
          >
            Se connecter
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-gray-800 px-4 pb-4">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            )
          )}
          <a
            href={`${ASILI_URL}/Login`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block rounded-md bg-amber-500 px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-amber-400 transition-colors"
          >
            Se connecter
          </a>
        </nav>
      )}
    </header>
  );
}
