import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconPackages,
  IconShield,
  IconShoppingBagSearch,
  IconUserCog,
} from "@tabler/icons-react";

export const headerNav = [
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "About Us", href: "/about-us" },
];

export const publicButtons = [
  {
    label: "Cart",
    href: "/cart",
    icon: IconShoppingBagSearch,
  },
];

export const sessionButtons = [
  {
    label: "User Profile",
    href: "#",
    icon: IconUserCog,
  },
  {
    label: "Order History",
    href: "#",
    icon: IconPackages,
  },
  {
    label: "Admin",
    href: "#",
    icon: IconShield,
  },
];

export const socials = [
  {
    label: "X",
    icon: IconBrandX,
  },
  {
    label: "Instagram",
    icon: IconBrandInstagram,
  },
  {
    label: "LinkedIn",
    icon: IconBrandLinkedin,
  },
  {
    label: "Github",
    icon: IconBrandGithub,
  },
  {
    label: "Discord",
    icon: IconBrandDiscord,
  },
];
