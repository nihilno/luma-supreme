import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconLogin2,
  IconShoppingBagSearch,
  IconUserPlus,
} from "@tabler/icons-react";

export const headerNav = [
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "About Us", href: "/about-us" },
];

export const mobileNav = [
  { label: "Cart", href: "/cart", icon: IconShoppingBagSearch },
  { label: "Sign In", href: "/sign-in", icon: IconLogin2 },
  { label: "Sign Up", href: "/sign-up", icon: IconUserPlus },
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
