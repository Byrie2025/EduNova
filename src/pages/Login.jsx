import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('etudiant')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Email ou mot de passe incorrect. Vérifiez vos identifiants.')
      setLoading(false)
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    if (profile?.role === 'etudiant') navigate('/student')
    else if (profile?.role === 'professeur') navigate('/teacher')
    else if (profile?.role === 'admin') navigate('/admin')
    else navigate('/student')

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1e293b] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#0F172A] rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-2xl font-black text-white tracking-tight">
              E<span className="text-[#F43F5E]">N</span>
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-[#0F172A] mb-1">
          Bienvenue sur EduNova
        </h1>
        <p className="text-center text-gray-400 text-sm mb-6">
          Connectez-vous pour accéder à votre espace
        </p>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Role selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vous êtes
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['etudiant', 'professeur', 'admin'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                    role === r
                      ? 'bg-[#0F172A] text-white border-[#0F172A]'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#0F172A]'
                  }`}
                >
                  {r === 'etudiant' ? 'Étudiant' : r === 'professeur' ? 'Professeur' : 'Admin'}
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresse e-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@edunova.ci"
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A] transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A] transition"
            />
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <a href="#" className="text-sm text-[#0F172A] hover:underline">
              Mot de passe oublié ?
            </a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0F172A] hover:bg-[#1e293b] text-white font-semibold py-3 rounded-lg transition-all shadow-md disabled:opacity-50"
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Pas encore de compte ?{' '}
          <a href="#" className="text-[#0F172A] font-medium hover:underline">
            Contactez votre administration
          </a>
        </p>

        {/* Footer */}
        <p className="text-center text-xs text-gray-300 mt-4">
          EduNova © 2025 · Plateforme éducative ivoirienne
        </p>
      </div>
    </div>
  )
}