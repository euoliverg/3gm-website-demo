import type { ImageLoaderProps } from "next/image";

export default function staticImageLoader({ src, width }: ImageLoaderProps) {
  const match = /^(.*\/media\/)(spa-liberty-village-0[1-4])(\.webp)$/.exec(src);
  if (!match || width > 1080) return src;

  const [, directory, name, extension] = match;
  return `${directory}responsive/${name}-${width}${extension}`;
}
