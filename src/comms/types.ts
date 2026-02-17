export type ProductCategory = {
  id: string;
  name: string;
  tagline: string;
  items: string[];
  lead: string;
  availability: string;
};

export type Product = {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  images: string[];
  capacity: string;
  sizes?: string[];
  material: string;
  color: string;
  structure: string;
  usage: string;
  size: string;
  grade?: string;
  finish?: string;
  description: string;
  features: string[];
  minimumOrder?: number;
};

export type TrustMetric = {
  value: string;
  label: string;
};

export type Differentiator = {
  title: string;
  description: string;
  icon: string;
};

export type Industry = {
  name: string;
  icon: string;
};

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

export type HeroSlide = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
};
