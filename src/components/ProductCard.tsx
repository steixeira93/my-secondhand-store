import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types/product';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {

  return (
    <>
      <Link href={`/produtos/${product.id}`} className="block w-full">
        <div className={styles.card}>
          <div className={styles.content}>
            <div 
              className={styles['image-container']}
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-contain hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className={styles['product-name']}>
              {product.name}
            </h3>
            <p className={styles['product-description']}>
              {product.description}
            </p>
            <div className={styles['price-container']}>
              R$ {product.price.toFixed(2)}
              <div className="flex gap-2 flex-wrap">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm">
                  {product.category}
                </span>
                <span className={`inline-block rounded-full px-3 py-1 text-sm ${
                  product.available ? 'bg-green-200' : 'bg-red-200'
                }`}>
                  {product.available ? 'Disponível' : 'Vendido'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
