import type { NextApiRequest, NextApiResponse } from 'next';
import { products } from '../../mocks/products';
import { Product } from '../../types/product';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[] | { message: string }>
) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      try {
        const category = query.category as string;
        const filteredProducts = category
          ? products.filter(p => p.category === category)
          : products;
        
        res.status(200).json(filteredProducts);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produtos' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
} 