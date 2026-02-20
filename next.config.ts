import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // <--- AGREGA ESTA LÍNEA
  images: {
    unoptimized: true, // <--- ESTA TAMBIÉN para que carguen las fotos
  },
};

export default nextConfig;