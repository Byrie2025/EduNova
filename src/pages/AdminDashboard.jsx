import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

const menuItems = [
  { label: 'Tableau de bord', icon: '🏠' },
  { label: 'Étudiants', icon: '👥' },
  { label: 'Professeurs', icon: '👨‍🏫' },
  { label: 'Cours', icon: '📚' },
  { label: 'Présences', icon: '✅' },
  { label: 'Notes', icon: '📊' },
  { label: 'Annonces', icon: '📢' },
  { label: 'Paramètres', icon: '⚙️' },
]

const stats = [
  { label: 'Total Étudiants', value: '1,247', change: '+12%', color: 'text-[#1A3C8F]', bg: 'bg-blue-50', icon: '👥' },
  { label: 'Total Professeurs', value: '48', change: '+3%', color: 'text-purple-600', bg: 'bg-purple-50', icon: '👨‍🏫' },
  { label: 'Cours actifs', value: '86', change: '+8%', color: 'text-green-600', bg: 'bg-green-50', icon: '📚' },
  { label: 'Taux de présence', value: '87%', change: '-2%', color: 'text-orange-500', bg: 'bg-orange-50', icon: '✅' },
]

const departments = [
  { name: 'Informatique', students: 423, courses: 28, average: 13.8, color: 'bg-blue-500' },
  { name: 'Mathématiques', students: 312, courses: 22, average: 12.4, color: 'bg-purple-500' },
  { name: 'Physique', students: 198, courses: 18, average: 14.1, color: 'bg-green-500' },
  { name: 'Économie', students: 314, courses: 18, average: 13.2, color: 'bg-orange-500' },
]

const recentActivity = [
  { type: 'inscription', message: 'Amara Koné s\'est inscrit(e) en Licence 2 Informatique', time: 'Il y a 5 min', icon: '👤' },
  { type: 'cours', message: 'Prof. Bamba a publié un nouveau cours : Programmation Web', time: 'Il y a 1h', icon: '📚' },
  { type: 'note', message: '87 notes ont été saisies en Mathématiques Avancées', time: 'Il y a 2h', icon: '📊' },
  { type: 'annonce', message: 'Nouvelle annonce : Calendrier des examens du 2ème semestre', time: 'Il y a 3h', icon: '📢' },
  { type: 'presence', message: 'Taux de présence faible détecté en Physique Quantique', time: 'Hier', icon: '⚠️' },
]

const topStudents = [
  { name: 'Fatou Diallo', filiere: 'Informatique L3', average: 18.2, rank: 1 },
  { name: 'Kouassi Yao', filiere: 'Mathématiques L2', average: 17.8, rank: 2 },
  { name: 'Mariame Bah', filiere: 'Informatique L2', average: 17.1, rank: 3 },
  { name: 'Ibrahim Touré', filiere: 'Physique L3', average: 16.9, rank: 4 },
  { name: 'Aïcha Coulibaly', filiere: 'Économie L2', average: 16.7, rank: 5 },
]

function getMention(grade) {
  if (grade >= 16) return { label: 'Très Bien', color: 'bg-green-100 text-green-700' }
  if (grade >= 14) return { label: 'Bien', color: 'bg-blue-100 text-blue-700' }
  if (grade >= 12) return { label: 'Assez Bien', color: 'bg-yellow-100 text-yellow-700' }
  if (grade >= 10) return { label: 'Passable', color: 'bg-orange-100 text-orange-700' }
  return { label: 'Insuffisant', color: 'bg-red-100 text-red-700' }
}

export default function AdminDashboard() {
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
              {profile?.full_name?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{profile?.full_name || 'Administrateur'}</p>
              <p className="text-white/50 text-xs">Administrateur</p>
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
            <h1 className="text-xl font-bold text-[#1A3C8F]">Tableau de bord administrateur</h1>
            <p className="text-sm text-gray-400">Bonjour, {profile?.full_name || 'Administrateur'} 👋</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-400 hover:text-[#1A3C8F] transition">
              🔔
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">5</span>
            </button>
            <div className="w-9 h-9 rounded-full bg-[#1A3C8F] flex items-center justify-center text-white text-sm font-bold">
              {profile?.full_name?.[0] || 'A'}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-gray-400">{stat.label}</p>
                  <span className={`text-xl p-2 rounded-xl ${stat.bg}`}>{stat.icon}</span>
                </div>
                <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
                <p className={`text-xs mt-1 font-medium ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-400'}`}>
                  {stat.change} ce semestre
                </p>
              </div>
            ))}
          </div>

          {/* Departments + Activity row */}
          <div className="grid grid-cols-3 gap-6 mb-6">

            {/* Departments */}
            <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-800">Performance par filière</h2>
                <button className="text-xs text-[#1A3C8F] hover:underline">Voir tout</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-400 border-b border-gray-100">
                    <th className="text-left pb-3 font-medium">Filière</th>
                    <th className="text-center pb-3 font-medium">Étudiants</th>
                    <th className="text-center pb-3 font-medium">Cours</th>
                    <th className="text-center pb-3 font-medium">Moyenne</th>
                    <th className="text-center pb-3 font-medium">Mention</th>
                    <th className="text-left pb-3 font-medium">Progression</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {departments.map((dept) => {
                    const mention = getMention(dept.average)
                    return (
                      <tr key={dept.name} className="text-sm hover:bg-gray-50 transition">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 ${dept.color} rounded-lg flex items-center justify-center text-white text-xs font-black`}>
                              {dept.name[0]}
                            </div>
                            <span className="font-medium text-gray-800">{dept.name}</span>
                          </div>
                        </td>
                        <td className="py-3 text-center text-gray-500">{dept.students}</td>
                        <td className="py-3 text-center text-gray-500">{dept.courses}</td>
                        <td className="py-3 text-center font-black text-[#1A3C8F]">{dept.average}/20</td>
                        <td className="py-3 text-center">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${mention.color}`}>
                            {mention.label}
                          </span>
                        </td>
                        <td className="py-3 w-32">
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div
                              className={`${dept.color} h-1.5 rounded-full`}
                              style={{ width: `${(dept.average / 20) * 100}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Recent activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-4">Activité récente</h2>
              <div className="space-y-3">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <span className="text-lg flex-shrink-0">{a.icon}</span>
                    <div>
                      <p className="text-xs text-gray-700 leading-relaxed">{a.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top students + Quick actions */}
          <div className="grid grid-cols-3 gap-6">

            {/* Top students */}
            <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-800">🏆 Meilleurs étudiants</h2>
                <button className="text-xs text-[#1A3C8F] hover:underline">Voir tout</button>
              </div>
              <div className="space-y-3">
                {topStudents.map((student) => {
                  const mention = getMention(student.average)
                  return (
                    <div key={student.rank} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${
                          student.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                          student.rank === 2 ? 'bg-gray-100 text-gray-600' :
                          student.rank === 3 ? 'bg-orange-100 text-orange-600' :
                          'bg-blue-50 text-blue-600'
                        }`}>
                          {student.rank === 1 ? '🥇' : student.rank === 2 ? '🥈' : student.rank === 3 ? '🥉' : student.rank}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{student.name}</p>
                          <p className="text-xs text-gray-400">{student.filiere}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-black text-[#1A3C8F]">{student.average}/20</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${mention.color}`}>
                          {mention.label}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-4">Actions rapides</h2>
              <div className="space-y-2">
                {[
                  { icon: '👤', label: 'Ajouter un étudiant', color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
                  { icon: '👨‍🏫', label: 'Ajouter un professeur', color: 'bg-purple-50 text-purple-700 hover:bg-purple-100' },
                  { icon: '📚', label: 'Créer une filière', color: 'bg-green-50 text-green-700 hover:bg-green-100' },
                  { icon: '📢', label: 'Publier une annonce', color: 'bg-orange-50 text-orange-700 hover:bg-orange-100' },
                  { icon: '📊', label: 'Exporter les notes', color: 'bg-gray-50 text-gray-700 hover:bg-gray-100' },
                  { icon: '📅', label: 'Gérer le calendrier', color: 'bg-red-50 text-red-700 hover:bg-red-100' },
                ].map((action) => (
                  <button
                    key={action.label}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${action.color}`}
                  >
                    <span>{action.icon}</span>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}