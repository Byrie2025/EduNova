import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
  {
    id: 1,
    name: 'Mathématiques Avancées',
    teacher: 'Prof. Kouassi',
    classe: 'Licence 2 — Informatique',
    progress: 72,
    color: 'bg-blue-500',
    students: 87,
    nextClass: 'Lundi 6 mai — 08h00',
    resources: [
      { title: 'Cours — Algèbre linéaire', type: 'PDF', size: '2.4 MB' },
      { title: 'Exercices — Chapitre 4', type: 'PDF', size: '1.1 MB' },
      { title: 'Corrigés TD n°3', type: 'PDF', size: '0.8 MB' },
      { title: 'Vidéo — Introduction aux matrices', type: 'Vidéo', size: '45 MB' },
    ],
    assignments: [
      { title: 'TD n°4 — Espaces vectoriels', due: 'Lundi 6 mai', status: 'Non rendu' },
      { title: 'Examen partiel', due: 'Vendredi 10 mai', status: 'À venir' },
    ],
    lastGrade: 16,
  },
  {
    id: 2,
    name: 'Programmation Web',
    teacher: 'Prof. Bamba',
    classe: 'Licence 2 — Informatique',
    progress: 85,
    color: 'bg-purple-500',
    students: 87,
    nextClass: 'Mardi 7 mai — 10h00',
    resources: [
      { title: 'Cours — HTML, CSS, JavaScript', type: 'PDF', size: '1.8 MB' },
      { title: 'TP — Création de sites web', type: 'PDF', size: '3.2 MB' },
      { title: 'Méthode — Responsive Design', type: 'PDF', size: '1.0 MB' },
    ],
    assignments: [
      { title: 'Projet — Site web personnel', due: 'Mercredi 8 mai', status: 'Non rendu' },
    ],
    lastGrade: 14,
  },
  {
    id: 3,
    name: 'Base de Données',
    teacher: 'Prof. Traoré',
    classe: 'Licence 2 — Informatique',
    progress: 60,
    color: 'bg-green-500',
    students: 87,
    nextClass: 'Jeudi 9 mai — 14h00',
    resources: [
      { title: 'Cours — SQL et modélisation', type: 'PDF', size: '4.1 MB' },
      { title: 'TP — Création de bases de données', type: 'PDF', size: '2.2 MB' },
    ],
    assignments: [
      { title: 'TP noté — Requêtes SQL', due: 'Vendredi 10 mai', status: 'Non rendu' },
    ],
    lastGrade: 17,
  },
  {
    id: 4,
    name: "Systèmes d'Exploitation",
    teacher: 'Prof. Koné',
    classe: 'Licence 2 — Informatique',
    progress: 45,
    color: 'bg-orange-500',
    students: 87,
    nextClass: 'Mercredi 8 mai — 08h00',
    resources: [
      { title: 'Cours — Linux et processus', type: 'PDF', size: '3.5 MB' },
      { title: 'TP — Commandes shell', type: 'PDF', size: '1.4 MB' },
    ],
    assignments: [
      { title: 'Rapport TP — Gestion des processus', due: 'Lundi 13 mai', status: 'Non rendu' },
    ],
    lastGrade: 12,
  },
]

function getMention(grade) {
  if (grade >= 16) return { label: 'Très Bien', color: 'bg-green-100 text-green-700' }
  if (grade >= 14) return { label: 'Bien', color: 'bg-blue-100 text-blue-700' }
  if (grade >= 12) return { label: 'Assez Bien', color: 'bg-yellow-100 text-yellow-700' }
  if (grade >= 10) return { label: 'Passable', color: 'bg-orange-100 text-orange-700' }
  return { label: 'Insuffisant', color: 'bg-red-100 text-red-700' }
}

function getStatusColor(status) {
  if (status === 'Non rendu') return 'bg-red-100 text-red-600'
  if (status === 'Rendu') return 'bg-green-100 text-green-600'
  return 'bg-gray-100 text-gray-500'
}

function getTypeIcon(type) {
  if (type === 'PDF') return '📄'
  if (type === 'Vidéo') return '🎬'
  return '🔗'
}

export default function Courses() {
  const [activePage, setActivePage] = useState('Mes Matières')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [activeTab, setActiveTab] = useState('Ressources')
  const navigate = useNavigate()

  const tabs = ['Ressources', 'Devoirs', 'Notes']

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
              onClick={() => { setActivePage(item.label); navigate(item.path) }}
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
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#22C55E] flex items-center justify-center text-white text-xs font-bold">E</div>
            <div>
              <p className="text-white text-xs font-medium">Étudiant</p>
              <p className="text-white/50 text-xs">Licence 2 — Informatique</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shadow-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            {selectedCourse && (
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-gray-400 hover:text-[#1A3C8F] transition mr-1"
              >
                ← Retour
              </button>
            )}
            <div>
              <h1 className="text-xl font-bold text-[#1A3C8F]">
                {selectedCourse ? selectedCourse.name : 'Mes Matières'}
              </h1>
              <p className="text-sm text-gray-400">
                {selectedCourse ? `${selectedCourse.teacher} · ${selectedCourse.classe}` : 'Toutes vos matières'}
              </p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#1A3C8F] flex items-center justify-center text-white text-sm font-bold">E</div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">

          {/* COURSE LIST */}
          {!selectedCourse && (
            <div className="grid grid-cols-2 gap-6">
              {courses.map((course) => {
                const mention = getMention(course.lastGrade)
                return (
                  <div
                    key={course.id}
                    onClick={() => { setSelectedCourse(course); setActiveTab('Ressources') }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 ${course.color} rounded-xl flex items-center justify-center text-white font-black text-lg`}>
                          {course.name[0]}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{course.name}</h3>
                          <p className="text-sm text-gray-400">{course.teacher}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${mention.color}`}>
                        {course.lastGrade}/20
                      </span>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progression</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-[#1A3C8F] h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>👥 {course.students} étudiants</span>
                      <span>📅 {course.nextClass}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* COURSE DETAIL */}
          {selectedCourse && (
            <div>
              <div className="bg-gradient-to-r from-[#1A3C8F] to-[#0f2460] rounded-2xl p-6 mb-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 ${selectedCourse.color} rounded-2xl flex items-center justify-center text-white font-black text-2xl`}>
                      {selectedCourse.name[0]}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black">{selectedCourse.name}</h2>
                      <p className="text-white/70">{selectedCourse.teacher} · {selectedCourse.classe}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/50 text-sm">Prochaine séance</p>
                    <p className="text-white font-medium">📅 {selectedCourse.nextClass}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-white/70 mb-1">
                    <span>Progression du cours</span>
                    <span>{selectedCourse.progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-[#22C55E] h-2 rounded-full"
                      style={{ width: `${selectedCourse.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeTab === tab
                        ? 'bg-[#1A3C8F] text-white'
                        : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Ressources */}
              {activeTab === 'Ressources' && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4">Ressources du cours</h3>
                  <div className="space-y-3">
                    {selectedCourse.resources.map((r) => (
                      <div key={r.title} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getTypeIcon(r.type)}</span>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{r.title}</p>
                            <p className="text-xs text-gray-400">{r.type} · {r.size}</p>
                          </div>
                        </div>
                        <button className="text-xs bg-[#1A3C8F] text-white px-4 py-2 rounded-lg hover:bg-[#0f2460] transition">
                          Télécharger
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Devoirs */}
              {activeTab === 'Devoirs' && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4">Travaux à rendre</h3>
                  <div className="space-y-3">
                    {selectedCourse.assignments.map((a) => (
                      <div key={a.title} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{a.title}</p>
                          <p className="text-xs text-gray-400 mt-1">📅 Date limite : {a.due}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(a.status)}`}>
                            {a.status}
                          </span>
                          <button className="text-xs bg-[#22C55E] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                            Remettre
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {activeTab === 'Notes' && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4">Mes notes en {selectedCourse.name}</h3>
                  <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-xl mb-4">
                    <div className="text-center">
                      <p className="text-4xl font-black text-[#1A3C8F]">{selectedCourse.lastGrade}/20</p>
                      <p className="text-sm text-gray-400 mt-1">Dernière note</p>
                    </div>
                    <div className="h-12 w-px bg-gray-200" />
                    <div>
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${getMention(selectedCourse.lastGrade).color}`}>
                        {getMention(selectedCourse.lastGrade).label}
                      </span>
                      <p className="text-xs text-gray-400 mt-2">Mention obtenue</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 text-center">
                    L'historique complet des notes sera disponible prochainement.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}