import { useState } from "react";
import {useNavigate} from 'react-router-dom';


export default function Registrarse() {
  const navigate     = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '', apellido: '', telefono: '', email: '', contrasena: ''
  });
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    setLoading(true);
    setMensaje({ texto: '', tipo: '' });

    const result = await register(formData);

    if (result.ok) {
      setMensaje({ texto: 'Usuario registrado correctamente', tipo: 'success' });
      setTimeout(() => navigate('/login'), 1000);
    } else {
      setMensaje({ texto: result.error || 'Error al registrar', tipo: 'error' });
    }
    setLoading(false);
  };

  const CAMPOS = [
    { name: 'nombre',     placeholder: 'Nombre',             type: 'text',     maxLength: 100, autoComplete: 'given-name',   required: true  },
    { name: 'apellido',   placeholder: 'Apellido',           type: 'text',     maxLength: 100, autoComplete: 'family-name',  required: true  },
    { name: 'telefono',   placeholder: 'Teléfono (opcional)',type: 'text',     maxLength: 20,  autoComplete: 'tel',          required: false },
    { name: 'email',      placeholder: 'Correo electrónico', type: 'email',    maxLength: 255, autoComplete: 'email',        required: true  },
    { name: 'contrasena', placeholder: 'Contraseña',         type: 'password', maxLength: 128, autoComplete: 'new-password', required: true  },
  ];

  return (
    <section className="min-h-screen bg-[#0c0b0a] flex items-center justify-center py-20 px-4">
      <div className="bg-[#111110] p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-white/8">

        <h2 className="text-2xl font-bold text-center text-white mb-8 uppercase tracking-tight"
            style={{ fontFamily: 'Cinzel, serif' }}>
          Registro de Usuario
        </h2>

        {mensaje.texto && (
          <div className={`mb-6 text-center font-bold p-3 rounded-lg text-sm ${
            mensaje.tipo === 'success'
              ? 'bg-green-900/40 text-green-400'
              : 'bg-red-900/40 text-red-400'
          }`}>
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {CAMPOS.map(({ name, placeholder, type, maxLength, autoComplete, required }) => (
            <div key={name}>
              <input
                type={type} name={name} placeholder={placeholder}
                required={required} maxLength={maxLength} autoComplete={autoComplete}
                className={inputCls(name)}
                onChange={handleChange}
              />
              {/* Indicador de fuerza solo para contraseña */}
              {name === 'contrasena' && formData.contrasena && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1,2,3,4].map((n) => (
                      <div
                        key={n}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          fuerza >= n ? fuerzaColor[fuerza] : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] mt-1 ml-1 text-white/40" style={{ fontFamily: 'DM Mono, monospace' }}>
                    Contraseña {fuerzaLabel[fuerza]}
                  </p>
                </div>
              )}
              {errores[name] && (
                <p className="text-red-400 text-[11px] mt-1 ml-1" style={{ fontFamily: 'DM Mono, monospace' }}>
                  {errores[name]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit" disabled={loading}
            className="w-full py-3 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-bold rounded-xl transition-all active:scale-95"
          >
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
