import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // <--- ESTA TAMBIÉN para que carguen las fotos
  },
};

export default nextConfig;