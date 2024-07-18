import React, { useState } from "react";
import logo from "@/assets/logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ListItem from "@/components/molecules/ListItem";


import { ShoppingCart } from "lucide-react";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import ShoppingCartSlide from "@/components/molecules/ShoppingCartSlide";

const Header = () => {
  const { cartQuantity, openCart} = useShoppingCart();
  const navigationMenus = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ];

  return (
    <>
      <div className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow-sm">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <a href="#" className="flex items-center">
            <img src={logo} className="w-16 h-16 mr-3" />
          </a>

          <div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex flex-col justify-end w-full h-full p-6 no-underline rounded-md outline-none select-none bg-gradient-to-b from-muted/50 to-muted focus:shadow-md"
                            href="/"
                          >
                            {/* <Icons.logo className="w-6 h-6" /> */}
                            <div className="mt-4 mb-2 text-lg font-medium">
                              shadcn/ui
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Beautifully designed components that you can copy
                              and paste into your apps. Accessible.
                              Customizable. Open Source.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/docs" title="Introduction">
                        Re-usable components built using Radix UI and Tailwind
                        CSS.
                      </ListItem>
                      <ListItem href="/docs/installation" title="Installation">
                        How to install dependencies and structure your app.
                      </ListItem>
                      <ListItem
                        href="/docs/primitives/typography"
                        title="Typography"
                      >
                        Styles for headings, paragraphs, lists...etc
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {navigationMenus.map((navigationMenu) => (
                        <ListItem
                          key={navigationMenu.title}
                          title={navigationMenu.title}
                          href={navigationMenu.href}
                        >
                          {navigationMenu.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  {/* <Link href="/docs" legacyBehavior passHref> */}
                  <NavigationMenuLink>Documentation</NavigationMenuLink>
                  {/* </Link> */}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center justify-center gap-5">
            <div className="relative">
              <div className="border border-gray-200 rounded-full hover:bg-gray-200">
                <button className="p-2" onClick={openCart}>
                  <ShoppingCart />
                </button>
              </div>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {cartQuantity}
              </span>
            </div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      <ShoppingCartSlide/>

    </>
  );
};

export default Header;
