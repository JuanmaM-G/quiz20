import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate   = useNavigate();
  const [formData, setFormData] = useState({ documento: '', contrasena: '' });
  const [mensaje,  setMensaje]  = useState({ texto: '', tipo: '' });
  const [loading,  setLoading]  = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ texto: '', tipo: '' });

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Documento: parseInt(formData.documento),
          Password:  formData.contrasena,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje({ texto: 'Sesión iniciada correctamente', tipo: 'success' });
        setTimeout(() => navigate('/trabajos'), 800);
      } else {
        setMensaje({ texto: data.error || 'Credenciales incorrectas', tipo: 'error' });
      }
    } catch {
      setMensaje({ texto: 'Error de conexión', tipo: 'error' });
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-[#0c0b0a] flex items-center justify-center py-20 px-4">
      <div className="bg-[#111110] p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-white/8">

        <h2 className="text-2xl font-bold text-center text-white mb-8 uppercase tracking-tight"
            style={{ fontFamily: 'Cinzel, serif' }}>
          Iniciar Sesión
        </h2>

        {mensaje.texto && (
          <div className={`mb-6 text-center font-bold p-3 rounded-lg text-sm ${
            mensaje.tipo === 'success' ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'
          }`}>
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <input type="text"     name="documento"  placeholder="Número de documento" required onChange={handleChange}
            className="w-full p-3 text-white placeholder:text-white/30 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:outline-none transition-all" />
          <input type="password" name="contrasena" placeholder="Contraseña"          required onChange={handleChange}
            className="w-full p-3 text-white placeholder:text-white/30 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:outline-none transition-all" />

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-bold rounded-xl transition-all active:scale-95">
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/registrarse" className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors">
            ¿No tienes cuenta? Regístrate
          </a>
        </div>
      </div>
    </section>
  );
}