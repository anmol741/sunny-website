export type Listing = {
  slug: string;
  mlsNumber: string;
  status: "Active" | "Pending" | "Sold";
  price: number;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  beds: number;
  baths: number;
  sqft: number;
  lotSize?: string;
  yearBuilt?: number;
  propertyType: "Single Family" | "Condo" | "Townhouse" | "Land";
  description: string;
  features: string[];
  photoCount: number;
  lat: number;
  lng: number;
  featured?: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  source: string;
  quote: string;
  rating: number;
};

export type NewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  category: string;
};
