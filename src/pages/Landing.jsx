
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()
  const features = [
    { icon: '📚', title: 'Gestion des cours', desc: 'Accdez a tous vos cours et documents.', bg: 'bg-blue-50' },
    { icon: '📝', title: 'Devoirs en ligne', desc: 'Soumettez vos travaux et recevez des corrections.', bg: 'bg-purple-50' },
    { icon: '📊', title: 'Notes en temps reel', desc: 'Consultez vos notes sur 20 avec moyennes.', bg: 'bg-green-50' },
    { icon: '✅', title: 'Suivi des presences', desc: 'Suivez votre taux de presence par matiere.', bg: 'bg-orange-50' },
    { icon: '🎯', title: 'Entrainement', desc: 'Preparez vos examens avec des quiz.', bg: 'bg-red-50' },
    { icon: '💬', title: 'Messagerie', desc: 'Communiquez avec vos professeurs.', bg: 'bg-teal-50' },
  ]
  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0F172A] rounded-xl flex items-center justify-center">
              <span className="text-sm font-black text-white">E<span className="text-[#F43F5E]">N</span></span>
            </div>
            <span className="font-bold text-xl text-[#0F172A]">EduNova</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <a href="#features" className="hover:text-[#0F172A] transition">Fonctionnalites</a>
            <a href="#demo" className="hover:text-[#0F172A] transition">Demo</a>
          </div>
          <button onClick={() => navigate('/login')} className="bg-[#0F172A] hover:bg-[#1e293b] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition">
            Se connecter
          </button>
        </div>
      </nav>
      <section className="pt-32 pb-20 bg-[#0F172A] text-white text-center px-6">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm mb-8">
          <span>Concu pour education ivoirienne</span>
        </div>
        <h1 className="text-5xl font-black mb-6 max-w-3xl mx-auto leading-tight">
          La plateforme educative <span className="text-[#F43F5E]">nouvelle generation</span> pour la Cote d-Ivoire
        </h1>
        <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
          EduNova digitalise l-education superieure ivoirienne. Cours, devoirs, notes, presences et communication.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate('/login')} className="bg-[#F43F5E] hover:bg-rose-600 text-white font-bold px-8 py-4 rounded-2xl text-lg transition shadow-lg">
            Acceder a la demo
          </button>
          <a href="#features" className="bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl text-lg hover:bg-white/20 transition">
            Decouvrir les fonctionnalites
          </a>
        </div>
        <p className="text-white/40 text-sm mt-6">Identifiants demo disponibles</p>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 grid grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <p className="text-4xl font-black text-[#0F172A]">3</p>
            <p className="text-sm text-gray-400 mt-1">Roles utilisateurs</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <p className="text-4xl font-black text-[#0F172A]">100%</p>
            <p className="text-sm text-gray-400 mt-1">En francais</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <p className="text-4xl font-black text-[#0F172A]">24/7</p>
            <p className="text-sm text-gray-400 mt-1">Accessible</p>
          </div>
        </div>
      </section>
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-black text-center text-gray-800 mb-12">Tout ce dont vous avez besoin</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${f.bg}`}>{f.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-black text-center text-gray-800 mb-12">Le probleme que nous resolvons</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-8">
              <h3 className="font-black text-xl text-red-700 mb-6">Situation actuelle</h3>
              <div className="space-y-4">
                {['Pas de plateforme numerique unifiee','Notes et devoirs sur papier','Communication difficile','Ressources inaccessibles hors cours','Calcul manuel des moyennes'].map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span>❌</span>
                    <p className="text-gray-700 text-sm">{p}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-2xl p-8">
              <h3 className="font-black text-xl text-green-700 mb-6">Avec EduNova</h3>
              <div className="space-y-4">
                {['Plateforme complete accessible partout','Devoirs soumis et corriges en ligne','Messagerie directe entre tous','Cours disponibles 24h/24','Moyennes calculees automatiquement'].map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span>✅</span>
                    <p className="text-gray-700 text-sm">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="demo" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-[#0F172A] rounded-3xl p-12 text-white text-center">
            <h2 className="text-3xl font-black mb-4">Essayez EduNova maintenant</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">Connectez-vous avec les identifiants de demonstration.</p>
            <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
              {[
                { role: 'Etudiant', email: 'etudiant@edunova.ci' },
                { role: 'Professeur', email: 'professeur@edunova.ci' },
                { role: 'Administrateur', email: 'admin@edunova.ci' },
              ].map((c) => (
                <div key={c.role} className="bg-white/10 border border-white/20 rounded-2xl p-4 text-left">
                  <p className="font-bold text-sm mb-1">{c.role}</p>
                  <p className="text-white/60 text-xs">{c.email}</p>
                  <p className="text-white/60 text-xs">edunova123</p>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/login')} className="bg-[#F43F5E] hover:bg-rose-600 text-white font-bold px-10 py-4 rounded-2xl text-lg transition shadow-lg">
              Acceder a la demo
            </button>
          </div>
        </div>
      </section>
      <footer className="bg-[#0F172A] text-white py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-sm font-black text-white">E<span className="text-[#F43F5E]">N</span></span>
            </div>
            <div>
              <p className="font-bold text-lg">EduNova</p>
              <p className="text-white/40 text-xs">Plateforme educative ivoirienne</p>
            </div>
          </div>
          <p className="text-white/60 text-sm">Concu avec amour pour la Cote d-Ivoire</p>
          <p className="text-white/40 text-xs">2025 EduNova</p>
        </div>
      </footer>
    </div>
  )
}
