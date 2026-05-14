import { Metadata } from 'next';
import { PRODUCTS } from '@/lib/data';
import { ProductDetails } from './ProductDetails';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.name,
    description: product.specs,
    openGraph: {
      title: product.name,
      description: product.specs,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    notFound();
  }

  return <ProductDetails id={id} />;
}
