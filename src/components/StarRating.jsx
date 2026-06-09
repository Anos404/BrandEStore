import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ rating }) {
  const stars = [];
  const rounded = Math.round(rating);
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        size={14}
        fill={i <= rounded ? '#ff9017' : 'none'}
        color={i <= rounded ? '#ff9017' : '#d1d5db'}
      />
    );
  }
  return <div className="stars-row">{stars}</div>;
}
