'use client';

import { forwardRef } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card({ children, className = '', hover = false }, ref) {
    const baseStyles = 'card';
    const hoverStyles = hover ? 'cardHover' : '';
    
    return (
      <div ref={ref} className={`${baseStyles} ${hoverStyles} ${className}`}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
