import type { NextApiRequest, NextApiResponse } from 'next';
import { products } from '../../mocks/products';
import { Product } from '../../types/product';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[] | Product | { message: string }>
) {
  const { method, query, body } = req;

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
        console.error(error);
      }
      break;

    case 'POST':
      try {
        const newProduct = body as Product;
        products.push(newProduct);
        res.status(201).json(newProduct);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao criar produto' });
        console.error(error);
      }
      break;

    case 'PUT':
      try {
        const { id } = query;
        const updatedProduct = body as Product;
        
        if (!id) {
          return res.status(400).json({ message: 'ID do produto é obrigatório' });
        }

        const index = products.findIndex(p => p.id === id);
        if (index === -1) {
          return res.status(404).json({ message: 'Produto não encontrado' });
        }
        
        // Mantém o ID original e atualiza os outros campos
        products[index] = { ...products[index], ...updatedProduct };
        res.status(200).json(products[index]);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar produto' });
        console.error(error);
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
} 