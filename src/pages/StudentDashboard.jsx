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
  { name: 'Algorithmique', teacher: 'Prof. Traoré', progress: 78, deadline: 'Lundi 12 mai', color: 'bg-purple-500' },
  { name: 'Base de Données', teacher: 'Prof. Traoré', progress: 85, deadline: 'Vendredi 16 mai', color: 'bg-indigo-500' },
  { name: 'Langage Pascal et C', teacher: 'Prof. Bamba', progress: 60, deadline: 'Vendredi 16 mai', color: 'bg-green-500' },
  { name: 'Web', teacher: 'Prof. Koné', progress: 72, deadline: 'Jeudi 22 mai', color: 'bg-cyan-500' },
]

const recentGrades = [
  { subject: 'Algorithmique', type: 'Contrôle', grade: 15, max: 20 },
  { subject: 'Base de Données', type: 'TP noté', grade: 17, max: 20 },
  { subject: "Système d'Exploitation", type: 'Examen', grade: 13, max: 20 },
  { subject: 'Méthodologie MERISE', type: 'Devoir', grade: 16, max: 20 },
]

const upcomingAssignments = [
  { subject: 'Algorithmique', title: 'TP n°3 — Tri et recherche', due: 'Demain', urgent: true },
  { subject: 'Projet', title: "Rapport d'avancement — Sprint 2", due: 'Dans 3 jours', urgent: false },
  { subject: 'Web', title: 'Mini-projet — Site dynamique', due: 'Dans 5 jours', urgent: false },
]

const weeklySchedule = [
  { day: 'Lun', sessions: [
    { time: '08h00', subject: 'Algorithmique', room: 'Salle A01', color: 'bg-purple-500' },
    { time: '10h00', subject: 'Base de Données', room: 'Salle B02', color: 'bg-indigo-500' },
    { time: '14h00', subject: 'Visual Basic', room: 'Labo 1', color: 'bg-yellow-500' },
  ]},
  { day: 'Mar', sessions: [
    { time: '08h00', subject: 'Syst. Exploitation', room: 'Labo 2', color: 'bg-gray-600' },
    { time: '10h00', subject: 'Maths du Signal', room: 'Salle A02', color: 'bg-red-500' },
    { time: '14h00', subject: 'Négociation Info.', room: 'Salle C01', color: 'bg-amber-500' },
  ]},
  { day: 'Mer', sessions: [
    { time: '08h00', subject: 'Architecture', room: 'Salle A01', color: 'bg-blue-500' },
    { time: '14h00', subject: 'Logiciels', room: 'Salle B01', color: 'bg-pink-500' },
  ]},
  { day: 'Jeu', sessions: [
    { time: '08h00', subject: 'MERISE', room: 'Salle A02', color: 'bg-teal-500' },
    { time: '10h00', subject: 'Web', room: 'Labo 1', color: 'bg-cyan-500' },
    { time: '14h00', subject: 'Projet', room: 'Salle B02', color: 'bg-red-600' },
  ]},
  { day: 'Ven', sessions: [
    { time: '08h00', subject: 'Pascal et C', room: 'Labo 2', color: 'bg-green-500' },
    { time: '10h00', subject: 'Base de Données', room: 'Salle B02', color: 'bg-indigo-500' },
  ]},
]

function getMention(grade) {
  if (grade >= 16) return { label: 'Très Bien', color: 'bg-green-100 text-green-700' }
  if (grade >= 14) return { label: 'Bien', color: 'bg-blue-100 text-blue-700' }
  if (grade >= 12) return { label: 'Assez Bien', color: 'bg-yellow-100 text-yellow-700' }
  if (grade >= 10) return { label: 'Passable', color: 'bg-orange-100 text-orange-700' }
  return { label: 'Insuffisant', color: 'bg-red-100 text-red-700' }
}

export default function StudentDashboard() {
  const [profile, setProfile] = useState(null)
  const [activePage, setActivePage] = useState('Tableau de bord')
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
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

  const average = (recentGrades.reduce((sum, g) => sum + g.grade, 0) / recentGrades.length).toFixed(1)

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 font-sans overflow-hidden">

      {/* SIDEBAR — desktop only */}
      <div className="hidden md:flex w-64 bg-[#0F172A] flex-col shadow-xl flex-shrink-0">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
            <span className="text-sm font-black text-white">E<span className="text-[#F43F5E]">N</span></span>
          </div>
          <div>
            <span className="text-white font-bold text-lg tracking-tight">EduNova</span>
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
              {profile?.full_name?.[0] || 'E'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{profile?.full_name || 'Étudiant'}</p>
              <p className="text-white/50 text-xs">Licence 3 — Dév. Application</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full text-xs text-white/50 hover:text-white transition py-1">
            Se déconnecter
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="bg-white border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between shadow-sm flex-shrink-0">
          <div>
            <h1 className="text-lg md:text-xl font-bold text-[#0F172A]">Tableau de bord</h1>
            <p className="text-xs md:text-sm text-gray-400">Bonjour, {profile?.full_name || 'Étudiant'} 👋</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/notifications')} className="relative text-gray-400 hover:text-[#0F172A] transition text-xl">
              🔔
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F43F5E] rounded-full text-white text-xs flex items-center justify-center">3</span>
            </button>
            <div className="w-9 h-9 rounded-full bg-[#0F172A] flex items-center justify-center text-white text-sm font-bold">
              {profile?.full_name?.[0] || 'E'}
            </div>
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6 pb-24 md:pb-6">

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
            {[
              { label: 'Moyenne Générale', value: `${average}/20`, sub: 'Semestre en cours', color: 'text-[#0F172A]' },
              { label: 'Devoirs rendus', value: '8/10', sub: 'Ce semestre', color: 'text-[#F43F5E]' },
              { label: 'Présence', value: '91%', sub: 'Ce mois-ci', color: 'text-purple-600' },
              { label: 'Rang', value: '3ème', sub: 'Sur 42 étudiants', color: 'text-orange-500' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                <p className={`text-xl md:text-2xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1 hidden md:block">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* WEEKLY SCHEDULE */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 mb-4 md:mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800 text-sm md:text-base">Emploi du temps</h2>
              <span className="text-xs text-gray-400 hidden md:block">Licence 3 Dév. Application</span>
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
                        <p className="text-xs opacity-70 hidden md:block">{session.room}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COURSES + ASSIGNMENTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
            <div className="md:col-span-2 bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-800">Mes Matières</h2>
                <button onClick={() => navigate('/courses')} className="text-xs text-[#0F172A] hover:underline">Voir tout</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {courses.map((course) => (
                  <div key={course.name} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-8 h-8 ${course.color} rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {course.name[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">{course.name}</h3>
                        <p className="text-xs text-gray-400">{course.teacher}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1">
                      <div className="bg-[#0F172A] h-1.5 rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{course.progress}% complété</span>
                      <span>📅 {course.deadline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-800">Travaux à rendre</h2>
                <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">{upcomingAssignments.length}</span>
              </div>
              <div className="space-y-3">
                {upcomingAssignments.map((a) => (
                  <div key={a.title} className={`p-3 rounded-xl border ${a.urgent ? 'border-red-200 bg-red-50' : 'border-gray-100 bg-gray-50'}`}>
                    <p className="text-xs font-semibold text-[#0F172A]">{a.subject}</p>
                    <p className="text-xs text-gray-700 mt-0.5">{a.title}</p>
                    <p className={`text-xs mt-1 font-medium ${a.urgent ? 'text-red-500' : 'text-gray-400'}`}>⏰ {a.due}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GRADES */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">Dernières Notes</h2>
              <button onClick={() => navigate('/grades')} className="text-xs text-[#0F172A] hover:underline">Voir tout</button>
            </div>

            {/* Mobile — cards */}
            <div className="space-y-3 md:hidden">
              {recentGrades.map((g) => {
                const mention = getMention(g.grade)
                return (
                  <div key={g.subject} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{g.subject}</p>
                      <p className="text-xs text-gray-400">{g.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-[#0F172A]">{g.grade}/20</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${mention.color}`}>{mention.label}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Desktop — table */}
            <table className="w-full hidden md:table">
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
                      <td className="py-3 text-center font-black text-[#0F172A]">{g.grade}/20</td>
                      <td className="py-3 text-center">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${mention.color}`}>{mention.label}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* BOTTOM NAV — mobile only */}
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
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-white/40"
          >
            <span className="text-xl">🚪</span>
            <span className="text-xs">Sortir</span>
          </button>
        </div>
      </div>
    </div>
  )
}