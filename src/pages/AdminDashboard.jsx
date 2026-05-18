import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

const menuItems = [
  { label: 'Tableau de bord', path: '/admin', icon: '🏠' },
  { label: 'Étudiants', path: '/admin', icon: '👨‍🎓' },
  { label: 'Professeurs', path: '/admin', icon: '👨‍🏫' },
  { label: 'Cours', path: '/admin', icon: '📚' },
  { label: 'Paramètres', path: '/admin', icon: '⚙️' },
  { label: 'Messagerie', path: '/messages', icon: '💬' },
]

const stats = [
  { label: 'Étudiants inscrits', value: '247', sub: '+12 ce semestre', color: 'text-[#0F172A]', icon: '👨‍🎓' },
  { label: 'Professeurs actifs', value: '18', sub: '6 matières enseignées', color: 'text-[#F43F5E]', icon: '👨‍🏫' },
  { label: 'Cours dispensés', value: '12', sub: 'Licence 3 Dév. App.', color: 'text-purple-600', icon: '📚' },
  { label: 'Taux de présence', value: '87%', sub: 'Ce mois-ci', color: 'text-green-600', icon: '✅' },
]

const departments = [
  { name: 'Licence 3 — Développeur Application', students: 42, teachers: 8, courses: 12, avgGrade: 14.2, attendance: 91, status: 'Actif' },
  { name: 'Licence 2 — Développeur Application', students: 55, teachers: 7, courses: 11, avgGrade: 13.8, attendance: 88, status: 'Actif' },
  { name: 'Licence 1 — Développeur Application', students: 68, teachers: 6, courses: 10, avgGrade: 12.9, attendance: 85, status: 'Actif' },
  { name: 'BTS — Informatique de Gestion', students: 82, teachers: 8, courses: 14, avgGrade: 13.1, attendance: 83, status: 'Actif' },
]

const recentActivity = [
  { icon: '📝', text: 'Prof. Traoré a publié les notes du Contrôle n°1 — Algorithmique L3', time: 'Il y a 10 min', color: 'bg-blue-100 text-blue-600' },
  { icon: '👤', text: 'Nouvel étudiant inscrit : Aminata Coulibaly — Licence 1', time: 'Il y a 30 min', color: 'bg-green-100 text-green-600' },
  { icon: '⚠️', text: 'Taux de présence bas : Mathématique du Signal L3 — 72%', time: 'Il y a 1h', color: 'bg-orange-100 text-orange-600' },
  { icon: '📢', text: 'Annonce publiée : Examens de fin de semestre — 2 au 13 juin', time: 'Il y a 2h', color: 'bg-purple-100 text-purple-600' },
  { icon: '✅', text: 'Prof. Bamba a corrigé 15 travaux — Langage Pascal et C', time: 'Il y a 3h', color: 'bg-teal-100 text-teal-600' },
  { icon: '📊', text: 'Rapport mensuel de présence généré automatiquement', time: 'Hier', color: 'bg-gray-100 text-gray-600' },
]

const topStudents = [
  { name: 'Kofi Mensah', level: 'Licence 3', avg: 17.2, rank: 1 },
  { name: 'Aminata Bah', level: 'Licence 3', avg: 16.8, rank: 2 },
  { name: 'Jean-Claude Yao', level: 'Licence 3', avg: 16.5, rank: 3 },
  { name: 'Fatou Camara', level: 'Licence 2', avg: 16.1, rank: 4 },
  { name: 'Moussa Sanogo', level: 'Licence 3', avg: 15.9, rank: 5 },
]

const quickActions = [
  { icon: '📢', label: 'Publier une annonce', color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
  { icon: '👤', label: 'Ajouter un étudiant', color: 'bg-green-50 text-green-700 hover:bg-green-100' },
  { icon: '👨‍🏫', label: 'Ajouter un professeur', color: 'bg-purple-50 text-purple-700 hover:bg-purple-100' },
  { icon: '📊', label: 'Générer un rapport', color: 'bg-orange-50 text-orange-700 hover:bg-orange-100' },
  { icon: '📅', label: 'Modifier le calendrier', color: 'bg-teal-50 text-teal-700 hover:bg-teal-100' },
  { icon: '⚙️', label: 'Paramètres système', color: 'bg-gray-50 text-gray-700 hover:bg-gray-100' },
]

export default function AdminDashboard() {
  const [profile, setProfile] = useState(null)
  const [activePage, setActivePage] = useState('Tableau de bord')
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        supabase.from('profiles').select('*').eq('id', data.user.id).single()
          .then(({ data: profile }) => setProfile(profile))
      }
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 font-sans overflow-hidden">

      {/* SIDEBAR desktop */}
      <div className="hidden md:flex w-64 bg-[#0F172A] flex-col shadow-xl flex-shrink-0">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
            <span className="text-sm font-black text-white">E<span className="text-[#F43F5E]">N</span></span>
          </div>
          <div>
            <span className="text-white font-bold text-lg">EduNova</span>
            <p className="text-white/40 text-xs">GECOS Formation — Admin</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => (
            <button key={item.label}
              onClick={() => { setActivePage(item.label); navigate(item.path) }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activePage === item.label ? 'bg-white text-[#0F172A]' : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#F43F5E] flex items-center justify-center text-white text-xs font-bold">
              {profile?.full_name?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{profile?.full_name || 'Administrateur'}</p>
              <p className="text-white/50 text-xs">Administration — GECOS</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full text-xs text-white/50 hover:text-white transition py-1">
            Se déconnecter
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="bg-white border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between shadow-sm flex-shrink-0">
          <div>
            <h1 className="text-lg md:text-xl font-bold text-[#0F172A]">Tableau de bord</h1>
            <p className="text-xs md:text-sm text-gray-400">Bonjour, {profile?.full_name || 'Administrateur'} 👋 — GECOS Formation, Abidjan</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/notifications')} className="relative text-gray-400 hover:text-[#0F172A] transition text-xl">
              🔔
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F43F5E] rounded-full text-white text-xs flex items-center justify-center">3</span>
            </button>
            <div className="w-9 h-9 rounded-full bg-[#0F172A] flex items-center justify-center text-white text-sm font-bold">
              {profile?.full_name?.[0] || 'A'}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6 pb-24 md:pb-6">

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-gray-400">{stat.label}</p>
                  <span className="text-xl">{stat.icon}</span>
                </div>
                <p className={`text-2xl md:text-3xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1 hidden md:block">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 mb-4 md:mb-6">
            <h2 className="font-bold text-gray-800 mb-4">Actions rapides</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {quickActions.map((action) => (
                <button key={action.label} className={`flex flex-col items-center gap-2 p-3 md:p-4 rounded-2xl transition ${action.color}`}>
                  <span className="text-2xl">{action.icon}</span>
                  <span className="text-xs font-medium text-center leading-tight">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* DEPARTMENTS + ACTIVITY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">

            {/* Departments */}
            <div className="md:col-span-2 bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-4">Performance par filière</h2>

              {/* Mobile — cards */}
              <div className="space-y-3 md:hidden">
                {departments.map((dept, i) => (
                  <div key={i} className="p-4 border border-gray-100 rounded-xl">
                    <p className="font-bold text-gray-800 text-sm mb-2">{dept.name}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><span className="text-gray-400">Étudiants : </span><span className="font-bold">{dept.students}</span></div>
                      <div><span className="text-gray-400">Moyenne : </span><span className="font-bold text-[#0F172A]">{dept.avgGrade}/20</span></div>
                      <div><span className="text-gray-400">Présence : </span><span className={`font-bold ${dept.attendance >= 90 ? 'text-green-600' : 'text-orange-500'}`}>{dept.attendance}%</span></div>
                      <div><span className="text-gray-400">Cours : </span><span className="font-bold">{dept.courses}</span></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop — table */}
              <table className="w-full hidden md:table">
                <thead>
                  <tr className="text-xs text-gray-400 border-b border-gray-100">
                    <th className="text-left pb-3 font-medium">Filière</th>
                    <th className="text-center pb-3 font-medium">Étudiants</th>
                    <th className="text-center pb-3 font-medium">Profs</th>
                    <th className="text-center pb-3 font-medium">Moyenne</th>
                    <th className="text-center pb-3 font-medium">Présence</th>
                    <th className="text-center pb-3 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {departments.map((dept, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition text-sm">
                      <td className="py-3 font-medium text-gray-800">{dept.name}</td>
                      <td className="py-3 text-center text-gray-600">{dept.students}</td>
                      <td className="py-3 text-center text-gray-600">{dept.teachers}</td>
                      <td className="py-3 text-center font-black text-[#0F172A]">{dept.avgGrade}/20</td>
                      <td className="py-3 text-center">
                        <span className={`font-bold ${dept.attendance >= 90 ? 'text-green-600' : 'text-orange-500'}`}>{dept.attendance}%</span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">{dept.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Activity */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-4">Activité récente</h2>
              <div className="space-y-3">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 ${activity.color}`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-700 leading-relaxed">{activity.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TOP STUDENTS */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-800 mb-4">Meilleurs étudiants</h2>
            <div className="space-y-3">
              {topStudents.map((student) => (
                <div key={student.rank} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 ${
                    student.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                    student.rank === 2 ? 'bg-gray-100 text-gray-600' :
                    student.rank === 3 ? 'bg-orange-100 text-orange-600' :
                    'bg-gray-50 text-gray-500'
                  }`}>
                    {student.rank === 1 ? '🥇' : student.rank === 2 ? '🥈' : student.rank === 3 ? '🥉' : student.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 text-sm">{student.name}</p>
                    <p className="text-xs text-gray-400">{student.level}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-[#0F172A]">{student.avg}/20</p>
                    <p className="text-xs text-green-600">Très Bien</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM NAV mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0F172A] border-t border-white/10 z-50">
        <div className="flex items-center justify-around px-2 py-2">
          {menuItems.slice(0, 5).map((item) => (
            <button key={item.label}
              onClick={() => { setActivePage(item.label); navigate(item.path) }}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all ${
                activePage === item.label ? 'text-white' : 'text-white/40'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs">{item.label.split(' ')[0]}</span>
            </button>
          ))}
          <button onClick={handleLogout} className="flex flex-col items-center gap-0.5 px-2 py-1 text-white/40">
            <span className="text-xl">🚪</span>
            <span className="text-xs">Sortir</span>
          </button>
        </div>
      </div>
    </div>
  )
}