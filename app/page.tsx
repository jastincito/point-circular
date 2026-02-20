"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabase';

// 1. CREAMOS EL MOLDE PARA TYPESCRIPT (Esto elimina los errores rojos)
interface Point {
  id: number;
  titulo: string;
  ubicacion: string;
  precio: string;
  estilo: string;
  imagen_url: string;
  es_premium: boolean;
}

const categories = ['Todos', 'Y2K', 'Streetwear', 'Denim', 'Remates'];

export default function Home() {
  // 2. LE DECIMOS A USESTATE QUE USARÁ ESE MOLDE
  const [pointsData, setPointsData] = useState<Point[]>([]);
  const [activeCategory, setActiveCategory] = useState('Todos');

  useEffect(() => {
async function cargarPuntos() {
      const { data, error } = await supabase.from('puntos').select('*');
      
      // ¡AGREGA ESTAS DOS LÍNEAS PARA VER QUÉ ESTÁ PASANDO!
      console.log("Datos que llegaron:", data);
      console.log("Posible error:", error);
      
      if (error) {
        console.error("Hubo un error al traer los datos:", error);
      } else if (data) {
        setPointsData(data as Point[]);
      }
    }
    

    cargarPuntos();
  }, []);

  const filteredPoints = activeCategory === 'Todos' 
    ? pointsData 
    : pointsData.filter(point => point.estilo === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* NAVBAR */}
      <nav className="bg-white px-6 py-4 shadow-sm sticky top-0 z-50 flex justify-between items-center">
        <div className="text-2xl font-black text-emerald-600 tracking-tighter">
          Point<span className="text-zinc-900">Circular</span>
        </div>
        <div className="flex gap-4">
          <button className="text-sm font-semibold text-gray-600 hover:text-zinc-900">Iniciar Sesión</button>
          <button className="text-sm font-bold bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition">
            Volverte Premium
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="bg-zinc-900 text-white pt-20 pb-20 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight max-w-3xl mx-auto leading-tight">
          Descubre los mejores <span className="text-emerald-400">Points</span> de ropa
        </h1>
        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
          Rutas secretas, llegada de fardos y moda circular a precios increíbles.
        </p>
        
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-3">
          <input 
            type="text" 
            placeholder="Ej. Casacas vintage, Tacora..." 
            className="w-full px-5 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-emerald-400/50 shadow-lg"
          />
          <button className="bg-emerald-500 hover:bg-emerald-400 transition text-zinc-900 font-bold px-8 py-4 rounded-xl text-lg shadow-lg">
            Buscar
          </button>
        </div>
      </header>

      {/* FILTROS Y GRID DE RESULTADOS */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        
        <div className="flex overflow-x-auto gap-3 mb-10 pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-semibold whitespace-nowrap transition border ${
                activeCategory === cat 
                ? 'bg-zinc-900 text-white border-zinc-900' 
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPoints.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center py-10 text-lg">Cargando points desde la base de datos...</p>
          ) : (
            filteredPoints.map((point) => (
              <article key={point.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 relative group cursor-pointer">
                
                {point.es_premium && (
                  <div className="absolute top-3 right-3 bg-zinc-900/90 backdrop-blur-sm text-yellow-400 text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-sm flex items-center gap-1">
                    ⭐ Premium
                  </div>
                )}
                
                <div className="overflow-hidden h-56 bg-gray-100">
                  <img src={point.imagen_url} alt={point.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                <div className="p-5">
                  <span className="text-xs font-black text-emerald-600 mb-2 block uppercase tracking-wider">{point.estilo}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight">{point.titulo}</h3>
                  <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">📍 {point.ubicacion}</p>
                  
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <span className="font-extrabold text-gray-900 text-lg">{point.precio}</span>
                    <Link href={`/punto/${point.id}`} className="text-sm font-bold text-emerald-600 group-hover:text-emerald-700">
                      Ver ruta ➔
                    </Link>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </main>

      {/* SECCIÓN DE PRECIOS / SUSCRIPCIÓN */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">Accede a las Rutas Secretas</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">Únete a la comunidad premium y descubre exactamente cómo llegar, mapas interactivos y a qué hora abren los fardos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Básico</h3>
              <p className="text-gray-500 text-sm mb-6">Para cazadores ocasionales.</p>
              <div className="mb-6"><span className="text-4xl font-black text-zinc-900">S/15</span><span className="text-gray-500 font-medium"> / 3 meses</span></div>
              <ul className="space-y-3 mb-8 text-sm text-gray-600 font-medium">
                <li>✓ Acceso a rutas en video</li>
                <li>✓ Tips de seguridad</li>
                <li>✗ Alertas de fardos nuevos</li>
              </ul>
              <button className="w-full bg-white border-2 border-zinc-900 text-zinc-900 font-bold py-3 rounded-xl hover:bg-zinc-50 transition">Elegir Plan</button>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 shadow-2xl transform md:-translate-y-4 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-zinc-900 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider">Más Elegido</div>
              <h3 className="text-xl font-bold text-white mb-2">Popular</h3>
              <p className="text-gray-400 text-sm mb-6">El equilibrio perfecto.</p>
              <div className="mb-6"><span className="text-4xl font-black text-white">S/25</span><span className="text-gray-400 font-medium"> / 6 meses</span></div>
              <ul className="space-y-3 mb-8 text-sm text-gray-300 font-medium">
                <li>✓ Acceso a rutas en mapa y video</li>
                <li>✓ Tips de seguridad y transporte</li>
                <li>✓ Alertas de fardos nuevos</li>
              </ul>
              <button className="w-full bg-emerald-500 text-zinc-900 font-bold py-3 rounded-xl hover:bg-emerald-400 transition">Elegir Plan</button>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Anual</h3>
              <p className="text-gray-500 text-sm mb-6">Para los verdaderos expertos.</p>
              <div className="mb-6"><span className="text-4xl font-black text-zinc-900">S/40</span><span className="text-gray-500 font-medium"> / 12 meses</span></div>
              <ul className="space-y-3 mb-8 text-sm text-gray-600 font-medium">
                <li>✓ Todo lo del plan Popular</li>
                <li>✓ Mapas descargables offline</li>
                <li>✓ Grupo VIP de WhatsApp</li>
              </ul>
              <button className="w-full bg-white border-2 border-zinc-900 text-zinc-900 font-bold py-3 rounded-xl hover:bg-zinc-50 transition">Elegir Plan</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-950 text-gray-400 py-12 text-center border-t border-zinc-900">
        <div className="text-2xl font-black text-emerald-600 tracking-tighter mb-4">
          Point<span className="text-white">Circular</span>
        </div>
        <p className="text-sm mb-4">© 2026. Democratizando la moda circular en Lima.</p>
        <div className="flex justify-center gap-6 text-sm font-medium">
          <span className="hover:text-white cursor-pointer transition">Términos</span>
          <span className="hover:text-white cursor-pointer transition">Privacidad</span>
          <span className="hover:text-white cursor-pointer transition">Contacto</span>
        </div>
      </footer>
    </div>
  );
}