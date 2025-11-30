'use client';

import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  return <h1>Категория {params.id}</h1>;
}
//  создать лаяулт для категорий, вместо треки, должны быть названия плейлистов