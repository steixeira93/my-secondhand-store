export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  condition: 'novo' | 'usado' | 'semi-novo';
  available: boolean;
  // link: string[];
}
