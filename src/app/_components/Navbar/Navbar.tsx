"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useContext, useState } from "react";
import { WishlistContext } from "@/context/WIshlistContext";
import { CartContext } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { data: session } = useSession();
  const { wishlistIds } = useContext(WishlistContext)!;
  const { CartCount } = useContext(CartContext)!;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const wishlistCount = wishlistIds.length;

  return (
    <nav className="border-b bg-white fixed top-0 left-0 right-0 z-50 shadow ">
      <div className="container mx-auto flex items-center justify-between px-6 py-3   w-[90%]">
        {/* Left */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/freshcart-logo.svg"
              alt="FreshCart"
              width={140}
              height={100}
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6 text-gray-700 font-medium relative">
            <li>
              <Link href="/" className="hover:text-emerald-600">
                Home
              </Link>
            </li>
            <li className="relative">
              <Link href="/cart" className="hover:text-emerald-600">
                Cart
                {CartCount > 0 && (
                  <span className="absolute top-0 left-full -ml-2 -mt-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {CartCount}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-emerald-600">
                Products
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-emerald-600">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/brands" className="hover:text-emerald-600">
                Brands
              </Link>
            </li>
            {session && (
              <li>
                <Link href="/allorders" className="hover:text-emerald-600">
                  Orders
                </Link>
              </li>
            )}
            <li className="relative">
              <Link
                href="/wishlist"
                className="inline-block relative hover:text-emerald-600"
              >
                <i className="fa-solid fa-heart text-lg text-red-600"></i>
                {wishlistCount > 0 && (
                  <span className="absolute top-0 left-full -ml-2 -mt-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5 text-lg">
          {/* Auth / Account */}
          {session ? (
            <div className="relative">
              <Button
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="text-sm font-medium hover:text-emerald-600"
              >
                {session.user?.name || "Account"}{" "}
                <i className="fa-solid fa-caret-down ml-1"></i>
              </Button>

              {accountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">
                  <Link
                    href="/changepassword"
                    className="block px-4 py-2 hover:bg-emerald-100"
                    onClick={() => setAccountDropdownOpen(false)}
                  >
                    Change Password
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-100 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium hover:text-emerald-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium hover:text-emerald-600"
              >
                Register
              </Link>
            </>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden text-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>

{/* Mobile Menu */}
{mobileMenuOpen && (
  <div
    className="md:hidden px-6 pb-4 
               transition-all duration-100 ease-in-out
               transform scale-95 opacity-0
               animate-mobile-menu"
  >
    <ul className="flex flex-col gap-4 text-gray-700 font-medium px-10">
      <li>
        <Link href="/" className="hover:text-emerald-600 ">
          Home
        </Link>
      </li>
      <li className="flex flex-wrap gap-16">
        <Link href="/cart" className="hover:text-emerald-600 relative">
          Cart
          {CartCount > 0 && (
            <span className="absolute top-0 left-full -ml-2 -mt-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {CartCount}
            </span>
          )}
        </Link>

        <Link
          href="/wishlist"
          className="inline-block relative hover:text-emerald-600"
        >
          <i className="fa-solid fa-heart text-lg text-red-600"></i>
          {wishlistCount > 0 && (
            <span className="absolute top-0 left-full -ml-2 -mt-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </Link>
      </li>
      <li>
        <Link href="/products" className="hover:text-emerald-600">
          Products
        </Link>
      </li>
      <li>
        <Link href="/categories" className="hover:text-emerald-600">
          Categories
        </Link>
      </li>
      <li>
        <Link href="/brands" className="hover:text-emerald-600">
          Brands
        </Link>
      </li>
      {session && (
        <li>
          <Link href="/allorders" className="hover:text-emerald-600">
            Orders
          </Link>
        </li>
      )}
    </ul>
  </div>
)}

    </nav>
  );
}
