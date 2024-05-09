// Carousel.tsx
import React, { useState, useRef } from "react";
import styles from "./Carousel.module.css";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef<HTMLDivElement>(null);

  const changeSlide = (offset: number) => {
    const newIndex = (currentIndex + offset + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.carouselContainer}>
      {/* 幻灯片 */}
      <div
        ref={slidesRef}
        className={styles.slides}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className={styles.slide} key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* 导航按钮 */}
      <button className={styles.prev} onClick={() => changeSlide(-1)}>
        ❮
      </button>
      <button className={styles.next} onClick={() => changeSlide(1)}>
        ❯
      </button>

      {/* 指示点 */}
      <div className={styles.dots}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.active : ""
            }`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
