import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconGridScan,
  IconListTree,
  IconPackages,
  IconShield,
  IconShoppingBagSearch,
  IconTagStarred,
  IconUserCog,
  IconUserSearch,
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
    icon: IconListTree,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: IconTagStarred,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: IconGridScan,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: IconUserSearch,
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
