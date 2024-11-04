// components/FadeInItem.tsx
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

interface FadeInItemProps {
  children: React.ReactNode;
}

const FadeInItem: React.FC<FadeInItemProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={classNames('transition-opacity duration-700', {
        'opacity-0': !isVisible,
        'opacity-100': isVisible,
      })}
    >
      {children}
    </div>
  );
};

export default FadeInItem;
