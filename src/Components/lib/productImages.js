const images = import.meta.glob(
  "/src/assets/**/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    import: "default",
  }
);

export function getProductImage(imagePath) {
  if (!imagePath) return "";

  // Agar database mein complete URL hai
  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  const cleanPath = imagePath
    .replace(/^\/?src\/assets\//, "")
    .replace(/^\/?assets\//, "")
    .replace(/^\/+/, "");

  const matchedKey = Object.keys(images).find(
    (key) => key.endsWith(`/${cleanPath}`)
  );

  if (!matchedKey) {
    console.log("Image not found:", imagePath);
    return "";
  }

  return images[matchedKey];
}