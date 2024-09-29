"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from 'next/navigation'; 
import { siteConfig } from "@/src/config/site";
import { Logo } from "@/src/assets/icons";
import { useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { ThemeSwitch } from "../ThemeSwitch/theme-switch";
import NavbarDropdown from "./NavbarDropdown";

export const Navbar = () => {
  
   const pathname = usePathname();
  // State to track the active link
  const [activeLink, setActiveLink] = useState(pathname);

  // const user = {
  //   name: "Mir",
  //   email:'noman@gmail.com',
  //   token: "adsf asda",
  //   role: "ADMIN",
  //   profilePhoto: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Fprofile-icon&psig=AOvVaw1LOvv6Oq8ZVQiNhW-cdf0o&ust=1727690354142000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNClrqDy54gDFQAAAAAdAAAAABAE'
     
  // };

  const user = undefined;

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky" className="bg-opacity-50" >
      {/* Left section with logo */}
      <NavbarContent className="basis-1/5" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-center items-center gap-1" href="/">
            <Logo />
            
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Center the navigation items */}
      <NavbarContent className="hidden lg:flex basis-2/6 justify-center gap-4">
        <ul className="flex gap-6">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                href={item.href}
                onClick={() => handleLinkClick(item.href)}
                className={clsx(
                  activeLink === item.href ? styles.active1 : styles.default
                )}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* End section with ThemeSwitch icon pushed to the far right */}
      <NavbarContent className="hidden sm:flex basis-1/5 justify-end items-center">
        <div className=" ml-auto flex items-center">
          <ThemeSwitch />
          
        </div>
        {user?.email ? (
          <NavbarItem className="hidden sm:flex gap-2">
            <NavbarDropdown />
          </NavbarItem>
        ) : (
           <NavbarItem className="hidden md:flex">
         <Button
         as={Link}
         className="text-sm font-normal text-default-600 bg-default-200"
         href='/login'

        variant="flat"
        >
       Login
      </Button>
     </NavbarItem>
        )}
      </NavbarContent>
        
      {/* Mobile Menu */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <div>
        {user?.email ? (
          <NavbarItem className=" gap-2">
            <NavbarDropdown />
          </NavbarItem>
        ) : (
           <NavbarItem className="gap-2">
         <Button
         as={Link}
         className="text-sm font-normal text-default-600 bg-default-200"
         href='/login'

        variant="flat"
        >
       Login
      </Button>
     </NavbarItem>
        )}
        </div>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NextLink href={item.href}>{item.label}</NextLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};





