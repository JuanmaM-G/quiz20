import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Registrarse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nombre: '', documento: '', telefono: '', contrasena: '' });
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Nombre:    formData.nombre,
          Documento: parseInt(formData.documento),
          Telefono:  parseInt(formData.telefono),
          Password:  formData.contrasena,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje({ texto: 'Usuario registrado correctamente', tipo: 'success' });
        setTimeout(() => navigate('/login'), 1000);
      } else {
        setMensaje({ texto: data.error || 'Error al registrar', tipo: 'error' });
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
          Registro de Usuario
        </h2>

        {mensaje.texto && (
          <div className={`mb-6 text-center font-bold p-3 rounded-lg text-sm ${
            mensaje.tipo === 'success' ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'
          }`}>
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <input type="text"     name="nombre"     placeholder="Nombre"     required onChange={handleChange}
            className="w-full bg-white/5 text-white placeholder-white/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500/60" />
          <input type="text"     name="documento"  placeholder="Documento"  required onChange={handleChange}
            className="w-full bg-white/5 text-white placeholder-white/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500/60" />
          <input type="text"     name="telefono"   placeholder="Teléfono"            onChange={handleChange}
            className="w-full bg-white/5 text-white placeholder-white/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500/60" />
          <input type="password" name="contrasena" placeholder="Contraseña" required onChange={handleChange}
            className="w-full bg-white/5 text-white placeholder-white/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500/60" />

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-bold rounded-xl transition-all active:scale-95">
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/login" className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors">
            ¿Ya tienes cuenta? Inicia sesión
          </a>
        </div>
      </div>
    </section>
  );
}