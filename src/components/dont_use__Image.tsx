interface ResponsiveImageProps {
  images: string[][];
  alt?: string;
  className?: string;
  placeholder?: any;
}

const breakpoints = [
  { name: "small", width: 320 },
  { name: "medium", width: 640 },
  { name: "large", width: 1280 }
];

export function ResponsiveImage({ images, alt = "", className = "", placeholder }: ResponsiveImageProps) {
  return (
    <picture className={className}>
      {breakpoints.map((breakpoint, i) => (
        <source key={i} media={`(min-width: ${breakpoint.width}px)`} srcSet={images[i].join(", ")} />
      ))}
      <img src={images[0][0].split(" ")[0]} alt={alt} loading="lazy" />
      {placeholder && <div className="placeholder-image">{placeholder}</div>}
    </picture>
  );
}
