import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  useEffect(() => {
    fetch('/api/usuarios')
      .then(res => res.json())
      .then(data => { setUsuarios(data); setLoading(false); })
      .catch(() => { setError('Error al cargar usuarios'); setLoading(false); });
  }, []);

  return (
    <section className="min-h-screen bg-[#0c0b0a] py-12 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white uppercase tracking-tight"
              style={{ fontFamily: 'Cinzel, serif' }}>
            Panel de Administrador
          </h1>
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-xl transition-all active:scale-95 text-sm">
            Cerrar sesión
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-900/40 text-red-400 rounded-lg text-sm text-center font-bold">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-white/40 text-center text-sm">Cargando usuarios...</p>
        ) : (
          <div className="bg-[#111110] rounded-2xl border border-white/8 overflow-hidden">
            <table className="w-full text-sm text-white">
              <thead>
                <tr className="border-b border-white/8 text-white/40 uppercase text-xs tracking-wider">
                  <th className="px-6 py-4 text-left">ID</th>
                  <th className="px-6 py-4 text-left">Nombre</th>
                  <th className="px-6 py-4 text-left">Documento</th>
                  <th className="px-6 py-4 text-left">Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u, i) => (
                  <tr key={u.ID_usuario}
                      className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                        i % 2 === 0 ? 'bg-white/2' : ''
                      }`}>
                    <td className="px-6 py-4 text-white/40">{u.ID_usuario}</td>
                    <td className="px-6 py-4 font-medium">{u.Nombre}</td>
                    <td className="px-6 py-4 text-white/70">{u.Documento}</td>
                    <td className="px-6 py-4 text-white/70">{u.Telefono}</td>
                  </tr>
                ))}
                {usuarios.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-white/30">
                      No hay usuarios registrados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
}