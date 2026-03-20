import { useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-[#0c0b0a] flex items-center justify-center">
      <div className="bg-[#111110] p-10 rounded-2xl shadow-xl border border-white/8 text-center">
        <h1 className="text-3xl font-bold text-white uppercase tracking-tight mb-4"
            style={{ fontFamily: 'Cinzel, serif' }}>
          ¡Bienvenido!
        </h1>
        <p className="text-white/50 text-sm mb-8">Iniciaste sesión correctamente.</p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-xl transition-all active:scale-95">
          Cerrar sesión
        </button>
      </div>
    </section>
  );
}