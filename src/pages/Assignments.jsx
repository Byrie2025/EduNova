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
    id: 1,
    subject: 'Mathématiques Avancées',
    title: 'TD n°4 — Espaces vectoriels',
    description: 'Résoudre les exercices 1 à 8 du chapitre sur les espaces vectoriels. Montrer toutes les étapes de calcul. Le travail doit être rédigé de manière claire et structurée.',
    due: 'Lundi 6 mai 2025',
    dueShort: 'Demain',
    status: 'Non rendu',
    urgent: true,
    color: 'bg-blue-500',
    teacher: 'Prof. Kouassi',
    maxGrade: 20,
    feedback: null,
    grade: null,
  },
  {
    id: 2,
    subject: 'Programmation Web',
    title: 'Projet — Site web personnel',
    description: 'Créer un site web personnel en HTML, CSS et JavaScript. Le site doit comporter au moins 3 pages : Accueil, À propos, et Portfolio. Le design doit être responsive.',
    due: 'Mercredi 8 mai 2025',
    dueShort: 'Dans 3 jours',
    status: 'Non rendu',
    urgent: false,
    color: 'bg-purple-500',
    teacher: 'Prof. Bamba',
    maxGrade: 20,
    feedback: null,
    grade: null,
  },
  {
    id: 3,
    subject: 'Base de Données',
    title: 'TP noté — Requêtes SQL',
    description: 'Écrire les requêtes SQL pour les 10 questions posées. Chaque requête doit être testée et commentée. Joindre une capture d\'écran des résultats.',
    due: 'Vendredi 10 mai 2025',
    dueShort: 'Dans 5 jours',
    status: 'Non rendu',
    urgent: false,
    color: 'bg-green-500',
    teacher: 'Prof. Traoré',
    maxGrade: 20,
    feedback: null,
    grade: null,
  },
  {
    id: 4,
    subject: 'Mathématiques Avancées',
    title: 'TD n°3 — Matrices',
    description: 'Exercices sur la multiplication matricielle et le calcul de déterminants.',
    due: 'Lundi 29 avril 2025',
    dueShort: 'Rendu',
    status: 'Corrigé',
    urgent: false,
    color: 'bg-blue-500',
    teacher: 'Prof. Kouassi',
    maxGrade: 20,
    grade: 16,
    feedback: 'Excellent travail ! Les démonstrations sont claires et bien structurées. Attention aux signes dans l\'exercice 5.',
  },
  {
    id: 5,
    subject: 'Programmation Web',
    title: 'TP n°2 — Formulaires HTML',
    description: 'Créer un formulaire de contact complet avec validation JavaScript.',
    due: 'Mercredi 24 avril 2025',
    dueShort: 'Rendu',
    status: 'Rendu',
    urgent: false,
    color: 'bg-purple-500',
    teacher: 'Prof. Bamba',
    maxGrade: 20,
    grade: null,
    feedback: null,
  },
]

function getStatusStyle(status) {
  if (status === 'Non rendu') return 'bg-red-100 text-red-600'
  if (status === 'Rendu') return 'bg-blue-100 text-blue-600'
  if (status === 'Corrigé') return 'bg-green-100 text-green-600'
  if (status === 'À venir') return 'bg-gray-100 text-gray-500'
  return 'bg-gray-100 text-gray-500'
}

function getMention(grade) {
  if (grade >= 16) return { label: 'Très Bien', color: 'text-green-600' }
  if (grade >= 14) return { label: 'Bien', color: 'text-blue-600' }
  if (grade >= 12) return { label: 'Assez Bien', color: 'text-yellow-600' }
  if (grade >= 10) return { label: 'Passable', color: 'text-orange-600' }
  return { label: 'Insuffisant', color: 'text-red-600' }
}

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

  const filtered = activeFilter === 'Tous'
    ? assignments
    : assignments.filter(a => a.status === activeFilter)

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
    if (uploadedFile || textSubmission) {
      setSubmitted(true)
    }
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
            {selectedAssignment && (
              <button
                onClick={() => { setSelectedAssignment(null); setSubmitted(false); setUploadedFile(null); setTextSubmission('') }}
                className="text-gray-400 hover:text-[#1A3C8F] transition mr-1"
              >
                ← Retour
              </button>
            )}
            <div>
              <h1 className="text-xl font-bold text-[#1A3C8F]">
                {selectedAssignment ? selectedAssignment.title : 'Mes Devoirs'}
              </h1>
              <p className="text-sm text-gray-400">
                {selectedAssignment ? selectedAssignment.subject : 'Tous vos travaux à rendre'}
              </p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#1A3C8F] flex items-center justify-center text-white text-sm font-bold">E</div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">

          {/* ASSIGNMENT LIST */}
          {!selectedAssignment && (
            <div>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">À rendre</p>
                  <p className="text-3xl font-black text-red-500">{pending}</p>
                  <p className="text-xs text-gray-400 mt-1">travaux en attente</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Rendus</p>
                  <p className="text-3xl font-black text-blue-500">{submitted_count}</p>
                  <p className="text-xs text-gray-400 mt-1">en attente de correction</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Corrigés</p>
                  <p className="text-3xl font-black text-green-500">{graded}</p>
                  <p className="text-xs text-gray-400 mt-1">notes disponibles</p>
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-2 mb-6">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeFilter === f
                        ? 'bg-[#1A3C8F] text-white'
                        : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Assignment cards */}
              <div className="space-y-3">
                {filtered.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => { setSelectedAssignment(a); setSubmitted(false); setUploadedFile(null) }}
                    className={`bg-white rounded-2xl p-5 shadow-sm border cursor-pointer hover:shadow-md transition ${
                      a.urgent ? 'border-red-200' : 'border-gray-100'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 ${a.color} rounded-xl flex items-center justify-center text-white font-black flex-shrink-0`}>
                          {a.subject[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-800">{a.title}</h3>
                            {a.urgent && (
                              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                                Urgent
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400">{a.subject} · {a.teacher}</p>
                          <p className="text-xs text-gray-400 mt-1">📅 {a.due}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {a.grade && (
                          <span className={`text-sm font-black ${getMention(a.grade).color}`}>
                            {a.grade}/20
                          </span>
                        )}
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusStyle(a.status)}`}>
                          {a.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ASSIGNMENT DETAIL */}
          {selectedAssignment && (
            <div className="max-w-3xl">
              {/* Header card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${selectedAssignment.color} rounded-xl flex items-center justify-center text-white font-black text-lg flex-shrink-0`}>
                      {selectedAssignment.subject[0]}
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-gray-800">{selectedAssignment.title}</h2>
                      <p className="text-gray-400">{selectedAssignment.subject} · {selectedAssignment.teacher}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusStyle(selectedAssignment.status)}`}>
                    {selectedAssignment.status}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">📋 Consignes</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{selectedAssignment.description}</p>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <span>📅 Date limite : <span className="font-medium text-gray-700">{selectedAssignment.due}</span></span>
                  <span>📊 Barème : <span className="font-medium text-gray-700">{selectedAssignment.maxGrade} points</span></span>
                </div>
              </div>

              {/* If graded — show feedback */}
              {selectedAssignment.status === 'Corrigé' && selectedAssignment.grade && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200 mb-6">
                  <h3 className="font-bold text-gray-800 mb-4">✅ Devoir corrigé</h3>
                  <div className="flex items-center gap-6 p-4 bg-green-50 rounded-xl mb-4">
                    <div className="text-center">
                      <p className="text-4xl font-black text-[#1A3C8F]">{selectedAssignment.grade}/20</p>
                      <p className="text-xs text-gray-400 mt-1">Votre note</p>
                    </div>
                    <div className="h-12 w-px bg-green-200" />
                    <div>
                      <span className={`text-sm font-bold ${getMention(selectedAssignment.grade).color}`}>
                        {getMention(selectedAssignment.grade).label}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">Mention</p>
                    </div>
                  </div>
                  {selectedAssignment.feedback && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                      <p className="text-xs font-semibold text-blue-600 mb-1">💬 Appréciation du professeur</p>
                      <p className="text-sm text-gray-700 italic">"{selectedAssignment.feedback}"</p>
                    </div>
                  )}
                </div>
              )}

              {/* Submission area — only for non-submitted */}
              {selectedAssignment.status === 'Non rendu' && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4">📤 Remettre votre travail</h3>

                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">✅</span>
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">Travail remis avec succès !</h4>
                      <p className="text-sm text-gray-400">Votre professeur recevra une notification. Vous serez informé(e) dès que votre travail sera corrigé.</p>
                    </div>
                  ) : (
                    <div>
                      {/* Drag and drop zone */}
                      <div
                        onDrop={handleDrop}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                        onDragLeave={() => setDragOver(false)}
                        className={`border-2 border-dashed rounded-xl p-8 text-center mb-4 transition-all ${
                          dragOver
                            ? 'border-[#1A3C8F] bg-blue-50'
                            : uploadedFile
                            ? 'border-green-400 bg-green-50'
                            : 'border-gray-200 hover:border-[#1A3C8F] hover:bg-gray-50'
                        }`}
                      >
                        {uploadedFile ? (
                          <div>
                            <span className="text-3xl">📄</span>
                            <p className="font-medium text-gray-800 mt-2">{uploadedFile.name}</p>
                            <p className="text-xs text-gray-400 mt-1">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                            <button
                              onClick={() => setUploadedFile(null)}
                              className="text-xs text-red-400 hover:text-red-600 mt-2"
                            >
                              Supprimer
                            </button>
                          </div>
                        ) : (
                          <div>
                            <span className="text-4xl">📁</span>
                            <p className="font-medium text-gray-700 mt-3">Déposez votre fichier ici</p>
                            <p className="text-sm text-gray-400 mt-1">ou</p>
                            <label className="mt-3 inline-block cursor-pointer bg-[#1A3C8F] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#0f2460] transition">
                              Choisir un fichier
                              <input type="file" className="hidden" onChange={handleFileInput} />
                            </label>
                            <p className="text-xs text-gray-400 mt-2">PDF, Word, ZIP — max 50 MB</p>
                          </div>
                        )}
                      </div>

                      {/* Text submission */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ou répondez directement ici
                        </label>
                        <textarea
                          value={textSubmission}
                          onChange={(e) => setTextSubmission(e.target.value)}
                          placeholder="Écrivez votre réponse ici..."
                          rows={4}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3C8F] transition resize-none"
                        />
                      </div>

                      <button
                        onClick={handleSubmit}
                        disabled={!uploadedFile && !textSubmission}
                        className="w-full bg-[#22C55E] hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all shadow-md"
                      >
                        Remettre le devoir
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Already submitted */}
              {selectedAssignment.status === 'Rendu' && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-200">
                  <div className="text-center py-6">
                    <span className="text-4xl">⏳</span>
                    <h4 className="font-bold text-gray-800 mt-3 mb-2">Travail remis — en attente de correction</h4>
                    <p className="text-sm text-gray-400">Votre professeur corrigera votre travail prochainement. Vous recevrez une notification dès que votre note sera disponible.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}