import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

const menuItems = [
  { label: 'Tableau de bord', path: '/student', icon: '🏠' },
  { label: 'Mes Matières', path: '/courses', icon: '📚' },
  { label: 'Devoirs', path: '/assignments', icon: '📝' },
  { label: 'Notes', path: '/grades', icon: '📊' },
  { label: 'Présences', path: '/attendance', icon: '✅' },
  { label: 'Entraînement', path: '/practice', icon: '🎯' },
  { label: 'Messagerie', path: '/messages', icon: '💬' },
]

const courses = [
  { name: 'Mathématiques', teacher: 'M. Kouassi', progress: 72, deadline: 'Lundi 6 mai', color: 'bg-blue-500' },
  { name: 'Français', teacher: 'Mme. Bamba', progress: 85, deadline: 'Mercredi 8 mai', color: 'bg-purple-500' },
  { name: 'SVT', teacher: 'M. Traoré', progress: 60, deadline: 'Vendredi 10 mai', color: 'bg-green-500' },
  { name: 'Physique-Chimie', teacher: 'Mme. Koné', progress: 45, deadline: 'Lundi 13 mai', color: 'bg-orange-500' },
]

const recentGrades = [
  { subject: 'Mathématiques', type: 'Contrôle', grade: 16, max: 20 },
  { subject: 'Français', type: 'Devoir Maison', grade: 14, max: 20 },
  { subject: 'SVT', type: 'Composition', grade: 17, max: 20 },
  { subject: 'Physique-Chimie', type: 'Contrôle', grade: 12, max: 20 },
]

const upcomingAssignments = [
  { subject: 'Mathématiques', title: 'DM n°4 — Dérivées', due: 'Demain', urgent: true },
  { subject: 'Français', title: 'Dissertation — Littérature', due: 'Dans 3 jours', urgent: false },
  { subject: 'SVT', title: 'Rapport TP — Cellules', due: 'Dans 5 jours', urgent: false },
]

function getMention(grade) {
  if (grade >= 16) return { label: 'Très Bien', color: 'bg-green-100 text-green-700' }
  if (grade >= 14) return { label: 'Bien', color: 'bg-blue-100 text-blue-700' }
  if (grade >= 12) return { label: 'Assez Bien', color: 'bg-yellow-100 text-yellow-700' }
  if (grade >= 10) return { label: 'Passable', color: 'bg-orange-100 text-orange-700' }
  return { label: 'Insuffisant', color: 'bg-red-100 text-red-700' }
}

export default function StudentDashboard() {
  const [user, setUser] = useState(null)
  const [activePage, setActivePage] = useState('Tableau de bord')
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const average = (
    recentGrades.reduce((sum, g) => sum + g.grade, 0) / recentGrades.length
  ).toFixed(1)

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#1A3C8F] flex flex-col shadow-xl">

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
            <span className="text-sm font-black text-white">E<span className="text-[#22C55E]">N</span></span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">EduNova</span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setActivePage(item.label)
                navigate(item.path)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activePage === item.label
                  ? 'bg-white text-[#1A3C8F]'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User + logout */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#22C55E] flex items-center justify-center text-white text-xs font-bold">
              {user?.email?.[0]?.toUpperCase() || 'E'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{user?.email || 'Élève'}</p>
              <p className="text-white/50 text-xs">Élève</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-xs text-white/50 hover:text-white transition py-1"
          >
            Se déconnecter
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-[#1A3C8F]">Tableau de bord</h1>
            <p className="text-sm text-gray-400">Bienvenue sur EduNova 👋</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-400 hover:text-[#1A3C8F] transition">
              🔔
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#22C55E] rounded-full text-white text-xs flex items-center justify-center">3</span>
            </button>
            <div className="w-9 h-9 rounded-full bg-[#1A3C8F] flex items-center justify-center text-white text-sm font-bold">
              {user?.email?.[0]?.toUpperCase() || 'E'}
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Moyenne Générale', value: `${average}/20`, sub: 'Trimestre en cours', color: 'text-[#1A3C8F]' },
              { label: 'Devoirs rendus', value: '12/15', sub: 'Ce trimestre', color: 'text-[#22C55E]' },
              { label: 'Présence', value: '94%', sub: 'Ce mois-ci', color: 'text-purple-600' },
              { label: 'Rang de classe', value: '4ème', sub: 'Terminale C', color: 'text-orange-500' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Courses + Assignments row */}
          <div className="grid grid-cols-3 gap-6 mb-6">

            {/* Courses — 2/3 width */}
            <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-800">Mes Matières</h2>
                <button className="text-xs text-[#1A3C8F] hover:underline">Voir tout</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {courses.map((course) => (
                  <div key={course.name} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition cursor-pointer">
                    <div className={`w-8 h-8 ${course.color} rounded-lg mb-3 flex items-center justify-center text-white text-xs font-bold`}>
                      {course.name[0]}
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm">{course.name}</h3>
                    <p className="text-xs text-gray-400 mb-3">{course.teacher}</p>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1">
                      <div
                        className="bg-[#1A3C8F] h-1.5 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{course.progress}% complété</span>
                      <span>📅 {course.deadline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming assignments — 1/3 width */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-800">Devoirs à rendre</h2>
                <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                  {upcomingAssignments.length}
                </span>
              </div>
              <div className="space-y-3">
                {upcomingAssignments.map((a) => (
                  <div key={a.title} className={`p-3 rounded-xl border ${a.urgent ? 'border-red-200 bg-red-50' : 'border-gray-100 bg-gray-50'}`}>
                    <p className="text-xs font-semibold text-[#1A3C8F]">{a.subject}</p>
                    <p className="text-xs text-gray-700 mt-0.5">{a.title}</p>
                    <p className={`text-xs mt-1 font-medium ${a.urgent ? 'text-red-500' : 'text-gray-400'}`}>
                      ⏰ {a.due}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent grades */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">Dernières Notes</h2>
              <button className="text-xs text-[#1A3C8F] hover:underline">Voir tout</button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-400 border-b border-gray-100">
                  <th className="text-left pb-3 font-medium">Matière</th>
                  <th className="text-left pb-3 font-medium">Type</th>
                  <th className="text-center pb-3 font-medium">Note</th>
                  <th className="text-center pb-3 font-medium">Mention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentGrades.map((g) => {
                  const mention = getMention(g.grade)
                  return (
                    <tr key={g.subject} className="text-sm hover:bg-gray-50 transition">
                      <td className="py-3 font-medium text-gray-800">{g.subject}</td>
                      <td className="py-3 text-gray-400 text-xs">{g.type}</td>
                      <td className="py-3 text-center font-black text-[#1A3C8F]">{g.grade}/20</td>
                      <td className="py-3 text-center">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${mention.color}`}>
                          {mention.label}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}