import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

const menuItems = [
  { label: 'Tableau de bord', path: '/teacher', icon: '🏠' },
  { label: 'Mes Cours', path: '/teacher/courses', icon: '📚' },
  { label: 'Devoirs', path: '/teacher/assignments', icon: '📝' },
  { label: 'Notes', path: '/teacher/grades', icon: '📊' },
  { label: 'Présences', path: '/teacher/attendance', icon: '✅' },
  { label: 'Étudiants', path: '/teacher/students', icon: '👥' },
  { label: 'Messagerie', path: '/teacher/messages', icon: '💬' },
]

const courses = [
  {
    id: 1,
    name: 'Mathématiques Avancées',
    filiere: 'Licence 2 — Informatique',
    students: 87,
    average: 14.2,
    color: 'bg-blue-500',
    nextSession: 'Lundi 6 mai — 08h00',
    pendingSubmissions: 12,
  },
  {
    id: 2,
    name: 'Algèbre Linéaire',
    filiere: 'Licence 1 — Mathématiques',
    students: 64,
    average: 12.8,
    color: 'bg-purple-500',
    nextSession: 'Mercredi 8 mai — 10h00',
    pendingSubmissions: 5,
  },
  {
    id: 3,
    name: 'Analyse Numérique',
    filiere: 'Licence 3 — Informatique',
    students: 45,
    average: 15.1,
    color: 'bg-green-500',
    nextSession: 'Vendredi 10 mai — 14h00',
    pendingSubmissions: 0,
  },
]

const recentSubmissions = [
  { student: 'Amara Koné', course: 'Mathématiques Avancées', assignment: 'TD n°4', submitted: 'Il y a 2h', status: 'À corriger' },
  { student: 'Fatou Diallo', course: 'Mathématiques Avancées', assignment: 'TD n°4', submitted: 'Il y a 3h', status: 'À corriger' },
  { student: 'Kouassi Yao', course: 'Algèbre Linéaire', assignment: 'TP n°2', submitted: 'Hier', status: 'À corriger' },
  { student: 'Mariame Bah', course: 'Mathématiques Avancées', assignment: 'TD n°4', submitted: 'Hier', status: 'Corrigé' },
]

const schedule = [
  { day: 'Lun', date: '6 mai', sessions: [{ time: '08h00', course: 'Mathématiques Avancées', room: 'Salle A12' }] },
  { day: 'Mar', date: '7 mai', sessions: [] },
  { day: 'Mer', date: '8 mai', sessions: [{ time: '10h00', course: 'Algèbre Linéaire', room: 'Salle B04' }] },
  { day: 'Jeu', date: '9 mai', sessions: [] },
  { day: 'Ven', date: '10 mai', sessions: [{ time: '14h00', course: 'Analyse Numérique', room: 'Salle C08' }] },
]

export default function TeacherDashboard() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [activePage, setActivePage] = useState('Tableau de bord')
  const [activeAction, setActiveAction] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      if (data.user) {
        supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single()
          .then(({ data: profile }) => setProfile(profile))
      }
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const totalStudents = courses.reduce((sum, c) => sum + c.students, 0)
  const totalPending = courses.reduce((sum, c) => sum + c.pendingSubmissions, 0)
  const overallAverage = (courses.reduce((sum, c) => sum + c.average, 0) / courses.length).toFixed(1)

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* SIDEBAR */}
      <div className="w-64 bg-[#1A3C8F] flex flex-col shadow-xl flex-shrink-0">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
            <span className="text-sm font-black text-white">E<span className="text-[#22C55E]">N</span></span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">EduNova</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActivePage(item.label)}
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
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#22C55E] flex items-center justify-center text-white text-xs font-bold">
              {profile?.full_name?.[0] || 'P'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{profile?.full_name || 'Professeur'}</p>
              <p className="text-white/50 text-xs">Professeur</p>
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

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shadow-sm flex-shrink-0">
          <div>
            <h1 className="text-xl font-bold text-[#1A3C8F]">Tableau de bord</h1>
            <p className="text-sm text-gray-400">Bonjour, {profile?.full_name || 'Professeur'} 👋</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-400 hover:text-[#1A3C8F] transition">
              🔔
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">{totalPending}</span>
            </button>
            <div className="w-9 h-9 rounded-full bg-[#1A3C8F] flex items-center justify-center text-white text-sm font-bold">
              {profile?.full_name?.[0] || 'P'}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total étudiants', value: totalStudents, sub: 'dans tous vos cours', color: 'text-[#1A3C8F]' },
              { label: 'Cours actifs', value: courses.length, sub: 'ce semestre', color: 'text-purple-600' },
              { label: 'Moyenne générale', value: `${overallAverage}/20`, sub: 'tous cours confondus', color: 'text-[#22C55E]' },
              { label: 'À corriger', value: totalPending, sub: 'soumissions en attente', color: 'text-orange-500' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <h2 className="font-bold text-gray-800 mb-4">Actions rapides</h2>
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: '📝', label: 'Créer un devoir', color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
                { icon: '✅', label: 'Prendre les présences', color: 'bg-green-50 text-green-700 hover:bg-green-100' },
                { icon: '📊', label: 'Saisir les notes', color: 'bg-purple-50 text-purple-700 hover:bg-purple-100' },
                { icon: '📢', label: 'Publier une annonce', color: 'bg-orange-50 text-orange-700 hover:bg-orange-100' },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => setActiveAction(action.label)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl transition font-medium text-sm ${action.color}`}
                >
                  <span className="text-2xl">{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Courses + Schedule row */}
          <div className="grid grid-cols-3 gap-6 mb-6">

            {/* Courses */}
            <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-800">Mes Cours</h2>
                <button className="text-xs text-[#1A3C8F] hover:underline">Voir tout</button>
              </div>
              <div className="space-y-3">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${course.color} rounded-xl flex items-center justify-center text-white font-black`}>
                        {course.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{course.name}</p>
                        <p className="text-xs text-gray-400">{course.filiere} · {course.students} étudiants</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <p className="text-sm font-black text-[#1A3C8F]">{course.average}/20</p>
                        <p className="text-xs text-gray-400">Moyenne</p>
                      </div>
                      {course.pendingSubmissions > 0 && (
                        <span className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full">
                          {course.pendingSubmissions} à corriger
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly schedule */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-4">Emploi du temps</h2>
              <div className="space-y-2">
                {schedule.map((day) => (
                  <div key={day.day} className={`p-3 rounded-xl ${day.sessions.length > 0 ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-500">{day.day}</span>
                      <span className="text-xs text-gray-400">{day.date}</span>
                    </div>
                    {day.sessions.length > 0 ? (
                      day.sessions.map((s, i) => (
                        <div key={i}>
                          <p className="text-xs font-semibold text-[#1A3C8F]">{s.time} — {s.course}</p>
                          <p className="text-xs text-gray-400">{s.room}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-300">Pas de cours</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent submissions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">Soumissions récentes</h2>
              <span className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full">
                {totalPending} à corriger
              </span>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-400 border-b border-gray-100">
                  <th className="text-left pb-3 font-medium">Étudiant</th>
                  <th className="text-left pb-3 font-medium">Cours</th>
                  <th className="text-left pb-3 font-medium">Devoir</th>
                  <th className="text-left pb-3 font-medium">Soumis</th>
                  <th className="text-center pb-3 font-medium">Statut</th>
                  <th className="text-center pb-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentSubmissions.map((sub, i) => (
                  <tr key={i} className="text-sm hover:bg-gray-50 transition">
                    <td className="py-3 font-medium text-gray-800">{sub.student}</td>
                    <td className="py-3 text-gray-400 text-xs">{sub.course}</td>
                    <td className="py-3 text-gray-600">{sub.assignment}</td>
                    <td className="py-3 text-gray-400 text-xs">{sub.submitted}</td>
                    <td className="py-3 text-center">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        sub.status === 'À corriger'
                          ? 'bg-orange-100 text-orange-600'
                          : 'bg-green-100 text-green-600'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      {sub.status === 'À corriger' && (
                        <button className="text-xs bg-[#1A3C8F] text-white px-3 py-1.5 rounded-lg hover:bg-[#0f2460] transition">
                          Corriger
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}