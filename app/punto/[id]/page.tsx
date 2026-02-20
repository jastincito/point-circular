import React from 'react';
import Link from 'next/link';

export default function DetallePoint({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* Barra de navegación superior */}
      <nav className="bg-white px-6 py-4 shadow-sm flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-2">
          <span>←</span> Volver al inicio
        </Link>
        <div className="text-xl font-black text-zinc-900 tracking-tighter">
          Point<span className="text-emerald-600">Circular</span>
        </div>
      </nav>
      
      <main className="max-w-3xl mx-auto px-6 mt-10">
        {/* Cabecera del lugar */}
        <div className="mb-8">
          <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Point #{params.id}
          </span>
          <h1 className="text-4xl font-extrabold text-zinc-900 mt-4 mb-2">
            Ruta Secreta y Datos
          </h1>
          <p className="text-gray-500">
            Estás a un paso de descubrir cómo llegar y qué días comprar.
          </p>
        </div>

        {/* El Muro de Pago (Paywall) */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative">
          
          {/* Capa que bloquea el contenido */}
          <div className="absolute inset-0 bg-white/60 backdrop-blur-md flex flex-col items-center justify-center z-10 p-6 text-center">
            <div className="bg-zinc-900 p-4 rounded-full mb-4 shadow-xl">
              <span className="text-4xl block">🔒</span>
            </div>
            <h3 className="text-2xl font-black text-zinc-900 mb-3">
              Ruta exclusiva para Premium
            </h3>
            <p className="text-gray-600 font-medium mb-8 max-w-sm">
              Desbloquea el mapa exacto, los videos guiados y las alertas de fardos nuevos para este point.
            </p>
            <Link href="/" className="bg-emerald-500 text-zinc-900 font-bold px-8 py-4 rounded-xl hover:bg-emerald-400 shadow-lg transition transform hover:-translate-y-1">
              Ver Planes de Suscripción
            </Link>
          </div>
          
          {/* Contenido "falso" que se ve borroso al fondo */}
          <div className="p-8 opacity-40 select-none pointer-events-none">
            <h4 className="font-bold text-xl mb-4">📍 ¿Cómo llegar?</h4>
            <p className="mb-4 bg-gray-200 h-4 rounded w-3/4"></p>
            <p className="mb-8 bg-gray-200 h-4 rounded w-1/2"></p>
            
            <h4 className="font-bold text-xl mb-4">🎥 Video del recorrido</h4>
            <div className="h-48 bg-gray-300 rounded-xl w-full flex items-center justify-center">
              <span className="text-gray-500 text-6xl">▶</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}