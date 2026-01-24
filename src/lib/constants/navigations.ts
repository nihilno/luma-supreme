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
    href: "/profile",
    icon: IconUserCog,
  },
  {
    label: "Orders History",
    href: "/orders",
    icon: IconPackages,
  },
  {
    label: "Admin (Demo)",
    href: "/admin/overview",
    icon: IconShield,
  },
];

export const adminButtons = [
  {
    label: "Overview",
    href: "/admin/overview",
  },
  {
    label: "Orders",
    href: "/admin/orders",
  },
  {
    label: "Products",
    href: "/admin/products",
  },

  {
    label: "Add product",
    href: "/admin/products/new",
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

export const checkoutSteps = [
  "User Login",
  "Shipping Address",
  "Payment Method",
  "Place Order",
];
