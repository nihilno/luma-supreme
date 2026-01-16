export {};

declare global {
  type TitleProps = {
    title?: string;
    subtitle?: string;
  };

  type Product = {
    rating: number;
    price: number;
    name: string;
    id: string;
    slug: string;
    category: string;
    description: string;
    images: string[];
    brand: string;
    numReviews: number;
    stock: number;
    isFeatured: boolean;
    banner: string | null;
    createdAt: Date;
  } | null;

  type CtaProps = {
    price: number;
    stock: number;
  };

  type ButtonsProps = {
    className?: string;
    col?: boolean;
    names?: boolean;
  };
}
