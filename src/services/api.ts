import { Product } from '../types/product';

export const api = {
  async getProducts(category?: string): Promise<Product[]> {
    const url = new URL('/api/products', window.location.origin);
    if (category) {
      url.searchParams.append('category', category);
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos');
    }

    return response.json();
  },

  // Adicione mais métodos conforme necessário
}; 