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

const assignments = [
  {
    id: 1, subject: 'Algorithmique', code: 'INFO303',
    title: 'TP n°3 — Tri et recherche',
    description: 'Implémenter en langage C les algorithmes de tri suivants : tri à bulles, tri par insertion, tri rapide. Comparer leurs complexités temporelles avec des tableaux de tailles différentes. Rédiger un rapport.',
    due: 'Mardi 13 mai 2025', dueShort: 'Demain', status: 'Non rendu', urgent: true,
    color: 'bg-purple-500', teacher: 'Prof. Traoré', maxGrade: 20, feedback: null, grade: null,
  },
  {
    id: 2, subject: 'Projet', code: 'INFO311',
    title: "Rapport d'avancement — Sprint 2",
    description: "Remettre le rapport d'avancement du Sprint 2. Le rapport doit inclure l'état d'avancement, les fonctionnalités développées, les difficultés rencontrées, et le planning du Sprint 3.",
    due: 'Vendredi 16 mai 2025', dueShort: 'Dans 3 jours', status: 'Non rendu', urgent: false,
    color: 'bg-red-600', teacher: 'Prof. Kouassi', maxGrade: 20, feedback: null, grade: null,
  },
  {
    id: 3, subject: 'Web', code: 'INFO312',
    title: 'Mini-projet — Site dynamique PHP',
    description: 'Développer un site web dynamique en PHP et MySQL avec authentification, interface de gestion de données (CRUD). Le code doit être commenté et structuré.',
    due: 'Mercredi 21 mai 2025', dueShort: 'Dans 5 jours', status: 'Non rendu', urgent: false,
    color: 'bg-cyan-500', teacher: 'Prof. Koné', maxGrade: 20, feedback: null, grade: null,
  },
  {
    id: 4, subject: 'Base de Données', code: 'INFO308',
    title: 'TP n°3 — Procédures stockées',
    description: 'Créer des procédures stockées et des triggers dans MySQL pour gérer une base de données de gestion d\'étudiants.',
    due: 'Vendredi 16 mai 2025', dueShort: 'Dans 3 jours', status: 'Non rendu', urgent: false,
    color: 'bg-indigo-500', teacher: 'Prof. Traoré', maxGrade: 20, feedback: null, grade: null,
  },
  {
    id: 5, subject: 'Méthodologie MERISE', code: 'INFO307',
    title: 'Projet MERISE — Système de pharmacie',
    description: 'Concevoir le système d\'information d\'une pharmacie en utilisant la méthode MERISE. Livrable : MCD, MLD, MPD, MCT et MOT complets.',
    due: 'Vendredi 23 mai 2025', dueShort: 'Rendu', status: 'Rendu', urgent: false,
    color: 'bg-teal-500', teacher: 'Prof. Coulibaly', maxGrade: 20, grade: null, feedback: null,
  },
  {
    id: 6, subject: 'Langage Pascal et C', code: 'INFO304',
    title: 'Projet — Gestionnaire de fichiers en C',
    description: 'Développer un gestionnaire de fichiers en langage C utilisant les structures, les pointeurs et la gestion de fichiers binaires.',
    due: 'Vendredi 16 mai 2025', dueShort: 'Corrigé', status: 'Corrigé', urgent: false,
    color: 'bg-green-500', teacher: 'Prof. Bamba', maxGrade: 20,
    grade: 16, feedback: 'Excellent travail ! Le gestionnaire est fonctionnel et bien structuré.',
  },
  {
    id: 7, subject: 'Algorithmique', code: 'INFO303',
    title: 'TP n°2 — Graphes',
    description: 'Implémenter les algorithmes de parcours de graphes : BFS et DFS.',
    due: 'Lundi 28 avril 2025', dueShort: 'Corrigé', status: 'Corrigé', urgent: false,
    color: 'bg-purple-500', teacher: 'Prof. Traoré', maxGrade: 20,
    grade: 15, feedback: 'Très bon travail sur les graphes. Les deux algorithmes fonctionnent correctement.',
  },
]

function getStatusStyle(status) {
  if (status === 'Non rendu') return 'bg-red-100 text-red-600'
  if (status === 'Rendu') return 'bg-blue-100 text-blue-600'
  if (status === 'Corrigé') return 'bg-green-100 text-green-600'
  return 'bg-gray-100 text-gray-500'
}

function getMention(grade) {
  if (grade >= 16) return { label: 'Très Bien', color: 'text-green-600' }
  if (grade >= 14) return { label: 'Bien', color: 'text-blue-600' }
  if (grade >= 12) return { label: 'Assez Bien', color: 'text-yellow-600' }
  if (grade >= 10) return { label: 'Passable', color: 'text-orange-600' }
  return { label: 'Insuffisant', color: 'text-red-600' }
}

const BottomNav = ({ activePage, setActivePage, navigate }) => (
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
      <button onClick={() => navigate('/')} className="flex flex-col items-center gap-0.5 px-2 py-1 text-white/40">
        <span className="text-xl">🚪</span>
        <span className="text-xs">Sortir</span>
      </button>
    </div>
  </div>
)

export default function Assignments() {
  const [activePage, setActivePage] = useState('Devoirs')
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [dragOver, setDragOver] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [textSubmission, setTextSubmission] = useState('')
  const navigate = useNavigate()

  const filters = ['Tous', 'Non rendu', 'Rendu', 'Corrigé']
  const filtered = activeFilter === 'Tous' ? assignments : assignments.filter(a => a.status === activeFilter)
  const pending = assignments.filter(a => a.status === 'Non rendu').length
  const submitted_count = assignments.filter(a => a.status === 'Rendu').length
  const graded = assignments.filter(a => a.status === 'Corrigé').length

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) setUploadedFile(file)
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    if (file) setUploadedFile(file)
  }

  const handleSubmit = () => {
    if (uploadedFile || textSubmission) setSubmitted(true)
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
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
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F43F5E] flex items-center justify-center text-white text-xs font-bold">E</div>
            <div>
              <p className="text-white text-xs font-medium">Étudiant</p>
              <p className="text-white/50 text-xs">Licence 3 — Dév. Application</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between shadow-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            {selectedAssignment && (
              <button onClick={() => { setSelectedAssignment(null); setSubmitted(false); setUploadedFile(null); setTextSubmission('') }}
                className="text-gray-400 hover:text-[#0F172A] transition mr-1">←</button>
            )}
            <div>
              <h1 className="text-lg md:text-xl font-bold text-[#0F172A]">
                {selectedAssignment ? selectedAssignment.title : 'Mes Devoirs'}
              </h1>
              <p className="text-xs md:text-sm text-gray-400">
                {selectedAssignment ? `${selectedAssignment.subject} · ${selectedAssignment.teacher}` : 'Licence 3 Développeur d\'Application'}
              </p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#0F172A] flex items-center justify-center text-white text-sm font-bold">E</div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6 pb-24 md:pb-6">
          {!selectedAssignment && (
            <div>
              <div className="grid grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">À rendre</p>
                  <p className="text-2xl md:text-3xl font-black text-red-500">{pending}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Rendus</p>
                  <p className="text-2xl md:text-3xl font-black text-blue-500">{submitted_count}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Corrigés</p>
                  <p className="text-2xl md:text-3xl font-black text-green-500">{graded}</p>
                </div>
              </div>

              <div className="flex gap-2 mb-4 md:mb-6 overflow-x-auto pb-1">
                {filters.map((f) => (
                  <button key={f} onClick={() => setActiveFilter(f)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex-shrink-0 ${
                      activeFilter === f ? 'bg-[#0F172A] text-white' : 'bg-white text-gray-500 border border-gray-100'
                    }`}
                  >{f}</button>
                ))}
              </div>

              <div className="space-y-3">
                {filtered.map((a) => (
                  <div key={a.id} onClick={() => { setSelectedAssignment(a); setSubmitted(false); setUploadedFile(null) }}
                    className={`bg-white rounded-2xl p-4 md:p-5 shadow-sm border cursor-pointer hover:shadow-md transition ${a.urgent ? 'border-red-200' : 'border-gray-100'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 ${a.color} rounded-xl flex items-center justify-center text-white font-black flex-shrink-0 text-xs`}>
                          {a.code.slice(-2)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-gray-800 text-sm">{a.title}</h3>
                            {a.urgent && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Urgent</span>}
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">{a.subject} · {a.teacher}</p>
                          <p className="text-xs text-gray-400 mt-1">📅 {a.due}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        {a.grade && <span className={`text-sm font-black ${getMention(a.grade).color}`}>{a.grade}/20</span>}
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusStyle(a.status)}`}>{a.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedAssignment && (
            <div className="max-w-3xl">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-12 h-12 ${selectedAssignment.color} rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0`}>
                    {selectedAssignment.code.slice(-2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400">{selectedAssignment.code} — {selectedAssignment.subject}</p>
                    <h2 className="text-lg font-black text-gray-800 leading-tight">{selectedAssignment.title}</h2>
                    <p className="text-gray-400 text-sm">{selectedAssignment.teacher}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${getStatusStyle(selectedAssignment.status)}`}>
                    {selectedAssignment.status}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Consignes</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{selectedAssignment.description}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>📅 <span className="font-medium text-gray-700">{selectedAssignment.due}</span></span>
                  <span>📊 <span className="font-medium text-gray-700">{selectedAssignment.maxGrade} pts</span></span>
                </div>
              </div>

              {selectedAssignment.status === 'Corrigé' && selectedAssignment.grade && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-200 mb-4">
                  <h3 className="font-bold text-gray-800 mb-4">Travail corrigé</h3>
                  <div className="flex items-center gap-6 p-4 bg-green-50 rounded-xl mb-4">
                    <p className="text-4xl font-black text-[#0F172A]">{selectedAssignment.grade}/20</p>
                    <span className={`text-sm font-bold ${getMention(selectedAssignment.grade).color}`}>
                      {getMention(selectedAssignment.grade).label}
                    </span>
                  </div>
                  {selectedAssignment.feedback && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                      <p className="text-xs font-semibold text-blue-600 mb-1">Appréciation du professeur</p>
                      <p className="text-sm text-gray-700 italic">"{selectedAssignment.feedback}"</p>
                    </div>
                  )}
                </div>
              )}

              {selectedAssignment.status === 'Non rendu' && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4">Remettre votre travail</h3>
                  {submitted ? (
                    <div className="text-center py-8">
                      <span className="text-4xl">✅</span>
                      <h4 className="font-bold text-gray-800 mt-4 mb-2">Travail remis avec succès !</h4>
                      <p className="text-sm text-gray-400">Votre professeur recevra une notification.</p>
                    </div>
                  ) : (
                    <div>
                      <div
                        onDrop={handleDrop}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                        onDragLeave={() => setDragOver(false)}
                        className={`border-2 border-dashed rounded-xl p-6 text-center mb-4 transition-all ${
                          dragOver ? 'border-[#0F172A] bg-blue-50' :
                          uploadedFile ? 'border-green-400 bg-green-50' : 'border-gray-200'
                        }`}
                      >
                        {uploadedFile ? (
                          <div>
                            <span className="text-3xl">📄</span>
                            <p className="font-medium text-gray-800 mt-2 text-sm">{uploadedFile.name}</p>
                            <button onClick={() => setUploadedFile(null)} className="text-xs text-red-400 mt-2">Supprimer</button>
                          </div>
                        ) : (
                          <div>
                            <span className="text-3xl">📁</span>
                            <p className="font-medium text-gray-700 mt-2 text-sm">Déposez votre fichier ici</p>
                            <label className="mt-3 inline-block cursor-pointer bg-[#0F172A] text-white text-sm px-4 py-2 rounded-lg">
                              Choisir un fichier
                              <input type="file" className="hidden" onChange={handleFileInput} />
                            </label>
                            <p className="text-xs text-gray-400 mt-2">PDF, Word, ZIP — max 50 MB</p>
                          </div>
                        )}
                      </div>
                      <textarea
                        value={textSubmission}
                        onChange={(e) => setTextSubmission(e.target.value)}
                        placeholder="Ou rédigez votre réponse ici..."
                        rows={4}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A] transition resize-none mb-4"
                      />
                      <button onClick={handleSubmit} disabled={!uploadedFile && !textSubmission}
                        className="w-full bg-[#F43F5E] hover:bg-rose-600 disabled:opacity-40 text-white font-semibold py-3 rounded-xl transition">
                        Remettre le devoir
                      </button>
                    </div>
                  )}
                </div>
              )}

              {selectedAssignment.status === 'Rendu' && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-blue-200">
                  <div className="text-center py-6">
                    <span className="text-4xl">⏳</span>
                    <h4 className="font-bold text-gray-800 mt-3 mb-2">En attente de correction</h4>
                    <p className="text-sm text-gray-400">Vous recevrez une notification dès que votre note sera disponible.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <BottomNav activePage={activePage} setActivePage={setActivePage} navigate={navigate} />
    </div>
  )
}