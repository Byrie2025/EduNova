import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

const menuItems = [
  { label: 'Tableau de bord', path: '/teacher', icon: '🏠' },
  { label: 'Mes Cours', path: '/teacher', icon: '📚' },
  { label: 'Devoirs', path: '/teacher', icon: '📝' },
  { label: 'Notes', path: '/teacher', icon: '📊' },
  { label: 'Présences', path: '/teacher', icon: '✅' },
  { label: 'Messagerie', path: '/messages', icon: '💬' },
]

const weeklySchedule = [
  { day: 'Lun', sessions: [
    { time: '08h00', subject: 'Algorithmique', room: 'Salle A01', class: 'Licence 3', color: 'bg-purple-500' },
    { time: '14h00', subject: 'Base de Données', room: 'Salle B02', class: 'Licence 3', color: 'bg-indigo-500' },
  ]},
  { day: 'Mar', sessions: [
    { time: '10h00', subject: 'Algorithmique', room: 'Salle A02', class: 'Licence 2', color: 'bg-purple-400' },
    { time: '14h00', subject: 'Base de Données', room: 'Labo 1', class: 'Licence 2', color: 'bg-indigo-400' },
  ]},
  { day: 'Mer', sessions: [
    { time: '08h00', subject: 'Algorithmique', room: 'Salle A01', class: 'Licence 3', color: 'bg-purple-500' },
    { time: '10h00', subject: 'Base de Données', room: 'Salle B02', class: 'Licence 3', color: 'bg-indigo-500' },
  ]},
  { day: 'Jeu', sessions: [
    { time: '08h00', subject: 'Algorithmique', room: 'Labo 2', class: 'Licence 1', color: 'bg-purple-300' },
  ]},
  { day: 'Ven', sessions: [
    { time: '10h00', subject: 'Base de Données', room: 'Salle B02', class: 'Licence 3', color: 'bg-indigo-500' },
    { time: '14h00', subject: 'Algorithmique', room: 'Salle A01', class: 'Licence 2', color: 'bg-purple-400' },
  ]},
]

const myCourses = [
  { id: 1, name: 'Algorithmique', code: 'INFO303', color: 'bg-purple-500', students: 42, level: 'Licence 3', progress: 78, nextClass: 'Lundi 08h00', pendingCorrections: 3 },
  { id: 2, name: 'Base de Données', code: 'INFO308', color: 'bg-indigo-500', students: 42, level: 'Licence 3', progress: 85, nextClass: 'Lundi 14h00', pendingCorrections: 1 },
  { id: 3, name: 'Algorithmique', code: 'INFO203', color: 'bg-purple-400', students: 38, level: 'Licence 2', progress: 65, nextClass: 'Mardi 10h00', pendingCorrections: 0 },
  { id: 4, name: 'Base de Données', code: 'INFO208', color: 'bg-indigo-400', students: 38, level: 'Licence 2', progress: 70, nextClass: 'Mardi 14h00', pendingCorrections: 2 },
]

const recentSubmissions = [
  { student: 'Amara Koné', subject: 'Algorithmique', assignment: 'TP n°2 — Graphes', submitted: 'Il y a 2h', status: 'À corriger', grade: null },
  { student: 'Fatou Diallo', subject: 'Base de Données', assignment: 'TP n°3 — Procédures', submitted: 'Il y a 3h', status: 'À corriger', grade: null },
  { student: 'Kofi Mensah', subject: 'Algorithmique', assignment: 'TP n°2 — Graphes', submitted: 'Il y a 5h', status: 'Corrigé', grade: 15 },
  { student: 'Jean Baptiste', subject: 'Algorithmique', assignment: 'TP n°2 — Graphes', submitted: 'Hier', status: 'Corrigé', grade: 17 },
  { student: 'Marie Ouattara', subject: 'Base de Données', assignment: 'TP n°3 — Procédures', submitted: 'Hier', status: 'À corriger', grade: null },
]

const announcements = [
  { id: 1, title: 'Rappel — TP n°3 à remettre demain', course: 'Algorithmique — Licence 3', time: 'Il y a 1h', urgent: true },
  { id: 2, title: 'Correction du contrôle n°1 disponible', course: 'Base de Données — Licence 3', time: 'Hier', urgent: false },
  { id: 3, title: 'Séance annulée — Mercredi 14 mai', course: 'Algorithmique — Licence 2', time: 'Il y a 2 jours', urgent: false },
]

export default function TeacherDashboard() {
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

  const totalStudents = [...new Set(myCourses.map(c => c.students))].reduce((a, b) => a + b, 0)
  const totalPending = myCourses.reduce((sum, c) => sum + c.pendingCorrections, 0)

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
            <p className="text-white/40 text-xs">GECOS Formation</p>
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
              {profile?.full_name?.[0] || 'P'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{profile?.full_name || 'Professeur'}</p>
              <p className="text-white/50 text-xs">Algorithmique · Base de Données</p>
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
            <p className="text-xs md:text-sm text-gray-400">Bonjour, {profile?.full_name || 'Professeur'} 👋 — GECOS Formation</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/notifications')} className="relative text-gray-400 hover:text-[#0F172A] transition text-xl">
              🔔
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F43F5E] rounded-full text-white text-xs flex items-center justify-center">2</span>
            </button>
            <div className="w-9 h-9 rounded-full bg-[#0F172A] flex items-center justify-center text-white text-sm font-bold">
              {profile?.full_name?.[0] || 'P'}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6 pb-24 md:pb-6">

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
            {[
              { label: 'Mes cours', value: myCourses.length, sub: 'ce semestre', color: 'text-[#0F172A]' },
              { label: 'Étudiants', value: totalStudents, sub: 'au total', color: 'text-[#F43F5E]' },
              { label: 'À corriger', value: totalPending, sub: 'travaux en attente', color: 'text-orange-500' },
              { label: 'Séances/semaine', value: weeklySchedule.reduce((sum, d) => sum + d.sessions.length, 0), sub: 'cette semaine', color: 'text-purple-600' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                <p className={`text-2xl md:text-3xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1 hidden md:block">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* WEEKLY SCHEDULE */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 mb-4 md:mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">Mon emploi du temps</h2>
              <span className="text-xs text-gray-400 hidden md:block">Semaine en cours</span>
            </div>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-5 gap-2 min-w-[500px]">
                {weeklySchedule.map((day) => (
                  <div key={day.day} className="space-y-2">
                    <p className="text-xs font-bold text-center text-gray-500 pb-1 border-b border-gray-100">{day.day}</p>
                    {day.sessions.map((session, i) => (
                      <div key={i} className={`${session.color} rounded-xl p-2 text-white`}>
                        <p className="text-xs font-bold">{session.time}</p>
                        <p className="text-xs leading-tight mt-0.5">{session.subject}</p>
                        <p className="text-xs opacity-70">{session.class}</p>
                        <p className="text-xs opacity-60 hidden md:block">{session.room}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COURSES + SUBMISSIONS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
            <div className="md:col-span-2 bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-4">Mes Cours</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {myCourses.map((course) => (
                  <div key={course.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-9 h-9 ${course.color} rounded-xl flex items-center justify-center text-white font-black text-xs flex-shrink-0`}>
                        {course.code.slice(-2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 text-sm truncate">{course.name}</h3>
                        <p className="text-xs text-gray-400">{course.level} · {course.students} étudiants</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                      <div className="bg-[#0F172A] h-1.5 rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>📅 {course.nextClass}</span>
                      {course.pendingCorrections > 0 && (
                        <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">
                          {course.pendingCorrections} à corriger
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-4">Annonces récentes</h2>
              <div className="space-y-3">
                {announcements.map((a) => (
                  <div key={a.id} className={`p-3 rounded-xl border ${a.urgent ? 'border-red-200 bg-red-50' : 'border-gray-100 bg-gray-50'}`}>
                    <p className={`text-xs font-semibold ${a.urgent ? 'text-red-600' : 'text-[#0F172A]'}`}>{a.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{a.course}</p>
                    <p className="text-xs text-gray-400 mt-1">{a.time}</p>
                  </div>
                ))}
                <button className="w-full bg-[#0F172A] text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-[#1e293b] transition">
                  Nouvelle annonce
                </button>
              </div>
            </div>
          </div>

          {/* RECENT SUBMISSIONS */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">Derniers travaux rendus</h2>
              {totalPending > 0 && (
                <span className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full">
                  {totalPending} à corriger
                </span>
              )}
            </div>

            {/* Mobile — cards */}
            <div className="space-y-3 md:hidden">
              {recentSubmissions.map((sub, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{sub.student}</p>
                    <p className="text-xs text-gray-400">{sub.assignment}</p>
                    <p className="text-xs text-gray-400">{sub.submitted}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {sub.grade && <span className="font-black text-[#0F172A] text-sm">{sub.grade}/20</span>}
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${sub.status === 'À corriger' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                      {sub.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop — table */}
            <table className="w-full hidden md:table">
              <thead>
                <tr className="text-xs text-gray-400 border-b border-gray-100">
                  <th className="text-left pb-3 font-medium">Étudiant</th>
                  <th className="text-left pb-3 font-medium">Devoir</th>
                  <th className="text-left pb-3 font-medium">Matière</th>
                  <th className="text-left pb-3 font-medium">Rendu</th>
                  <th className="text-center pb-3 font-medium">Note</th>
                  <th className="text-center pb-3 font-medium">Statut</th>
                  <th className="text-center pb-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentSubmissions.map((sub, i) => (
                  <tr key={i} className="text-sm hover:bg-gray-50 transition">
                    <td className="py-3 font-medium text-gray-800">{sub.student}</td>
                    <td className="py-3 text-gray-600 text-xs">{sub.assignment}</td>
                    <td className="py-3 text-gray-400 text-xs">{sub.subject}</td>
                    <td className="py-3 text-gray-400 text-xs">{sub.submitted}</td>
                    <td className="py-3 text-center font-black text-[#0F172A]">
                      {sub.grade ? `${sub.grade}/20` : '—'}
                    </td>
                    <td className="py-3 text-center">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${sub.status === 'À corriger' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      {sub.status === 'À corriger' && (
                        <button className="text-xs bg-[#0F172A] text-white px-3 py-1.5 rounded-lg hover:bg-[#1e293b] transition">
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