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

const grades = [
  {
    id: 1,
    subject: 'Mathématiques Avancées',
    teacher: 'Prof. Kouassi',
    color: 'bg-blue-500',
    coefficient: 4,
    evaluations: [
      { title: 'TD n°1', type: 'TD noté', date: '15 janv. 2025', grade: 15, max: 20, feedback: 'Bon travail, continuez ainsi.' },
      { title: 'Partiel n°1', type: 'Examen', date: '10 fév. 2025', grade: 16, max: 20, feedback: 'Excellent ! Très bonne maîtrise des concepts.' },
      { title: 'TD n°2', type: 'TD noté', date: '5 mars 2025', grade: 14, max: 20, feedback: 'Quelques erreurs de calcul mais bonne compréhension.' },
      { title: 'TD n°3', type: 'TD noté', date: '29 avril 2025', grade: 16, max: 20, feedback: 'Excellent travail ! Les démonstrations sont claires.' },
    ],
  },
  {
    id: 2,
    subject: 'Programmation Web',
    teacher: 'Prof. Bamba',
    color: 'bg-purple-500',
    coefficient: 3,
    evaluations: [
      { title: 'TP n°1', type: 'TP noté', date: '20 janv. 2025', grade: 13, max: 20, feedback: 'Code fonctionnel mais manque de commentaires.' },
      { title: 'Projet mi-semestre', type: 'Projet', date: '15 mars 2025', grade: 15, max: 20, feedback: 'Bon projet, interface soignée.' },
      { title: 'TP n°2', type: 'TP noté', date: '24 avril 2025', grade: 14, max: 20, feedback: 'En attente de correction.' },
    ],
  },
  {
    id: 3,
    subject: 'Base de Données',
    teacher: 'Prof. Traoré',
    color: 'bg-green-500',
    coefficient: 3,
    evaluations: [
      { title: 'TP n°1 — Modélisation', type: 'TP noté', date: '25 janv. 2025', grade: 17, max: 20, feedback: 'Excellent schéma, très bien normalisé.' },
      { title: 'Partiel n°1', type: 'Examen', date: '20 fév. 2025', grade: 18, max: 20, feedback: 'Parfait ! Toutes les requêtes sont correctes.' },
      { title: 'TP n°2 — SQL', type: 'TP noté', date: '10 avril 2025', grade: 16, max: 20, feedback: 'Très bon travail.' },
    ],
  },
  {
    id: 4,
    subject: "Systèmes d'Exploitation",
    teacher: 'Prof. Koné',
    color: 'bg-orange-500',
    coefficient: 2,
    evaluations: [
      { title: 'TP n°1 — Shell', type: 'TP noté', date: '1 fév. 2025', grade: 11, max: 20, feedback: 'Des efforts à fournir sur les scripts.' },
      { title: 'Contrôle n°1', type: 'Contrôle', date: '1 mars 2025', grade: 12, max: 20, feedback: 'Passable, revoir les processus.' },
      { title: 'TP n°2 — Processus', type: 'TP noté', date: '15 avril 2025', grade: 13, max: 20, feedback: 'Amélioration notable.' },
    ],
  },
]

function getMention(grade) {
  if (grade >= 16) return { label: 'Très Bien', color: 'bg-green-100 text-green-700', bar: 'bg-green-500' }
  if (grade >= 14) return { label: 'Bien', color: 'bg-blue-100 text-blue-700', bar: 'bg-blue-500' }
  if (grade >= 12) return { label: 'Assez Bien', color: 'bg-yellow-100 text-yellow-700', bar: 'bg-yellow-500' }
  if (grade >= 10) return { label: 'Passable', color: 'bg-orange-100 text-orange-700', bar: 'bg-orange-500' }
  return { label: 'Insuffisant', color: 'bg-red-100 text-red-700', bar: 'bg-red-500' }
}

function getSubjectAverage(evaluations) {
  const total = evaluations.reduce((sum, e) => sum + e.grade, 0)
  return (total / evaluations.length).toFixed(1)
}

function getWeightedAverage() {
  let totalPoints = 0
  let totalCoeff = 0
  grades.forEach(subject => {
    const avg = parseFloat(getSubjectAverage(subject.evaluations))
    totalPoints += avg * subject.coefficient
    totalCoeff += subject.coefficient
  })
  return (totalPoints / totalCoeff).toFixed(2)
}

export default function Grades() {
  const [activePage, setActivePage] = useState('Notes')
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [expandedRow, setExpandedRow] = useState(null)
  const navigate = useNavigate()

  const weightedAverage = getWeightedAverage()
  const mention = getMention(parseFloat(weightedAverage))

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
            {selectedSubject && (
              <button
                onClick={() => setSelectedSubject(null)}
                className="text-gray-400 hover:text-[#1A3C8F] transition mr-1"
              >
                ← Retour
              </button>
            )}
            <div>
              <h1 className="text-xl font-bold text-[#1A3C8F]">
                {selectedSubject ? selectedSubject.subject : 'Mes Notes'}
              </h1>
              <p className="text-sm text-gray-400">
                {selectedSubject ? selectedSubject.teacher : 'Relevé de notes — Licence 2 Informatique'}
              </p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#1A3C8F] flex items-center justify-center text-white text-sm font-bold">E</div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">

          {/* GRADES OVERVIEW */}
          {!selectedSubject && (
            <div>
              {/* Summary cards */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="col-span-2 bg-gradient-to-r from-[#1A3C8F] to-[#0f2460] rounded-2xl p-6 text-white">
                  <p className="text-white/60 text-sm mb-1">Moyenne Générale Pondérée</p>
                  <p className="text-5xl font-black">{weightedAverage}<span className="text-2xl font-normal text-white/60">/20</span></p>
                  <span className={`mt-2 inline-block text-xs font-medium px-3 py-1 rounded-full bg-white/20 text-white`}>
                    {mention.label}
                  </span>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Meilleure matière</p>
                  <p className="text-lg font-black text-green-600">Base de Données</p>
                  <p className="text-2xl font-black text-gray-800 mt-1">17.0<span className="text-sm text-gray-400">/20</span></p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Total évaluations</p>
                  <p className="text-3xl font-black text-[#1A3C8F]">
                    {grades.reduce((sum, s) => sum + s.evaluations.length, 0)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">ce semestre</p>
                </div>
              </div>

              {/* Grades table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="font-bold text-gray-800">Relevé de notes par matière</h2>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-xs text-gray-400 border-b border-gray-100">
                      <th className="text-left px-6 py-3 font-medium">Matière</th>
                      <th className="text-center px-4 py-3 font-medium">Coefficient</th>
                      <th className="text-center px-4 py-3 font-medium">Nb. évals</th>
                      <th className="text-center px-4 py-3 font-medium">Moyenne</th>
                      <th className="text-center px-4 py-3 font-medium">Mention</th>
                      <th className="text-center px-4 py-3 font-medium">Progression</th>
                      <th className="text-center px-4 py-3 font-medium">Détail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {grades.map((subject) => {
                      const avg = getSubjectAverage(subject.evaluations)
                      const m = getMention(parseFloat(avg))
                      return (
                        <tr key={subject.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 ${subject.color} rounded-lg flex items-center justify-center text-white text-xs font-black`}>
                                {subject.subject[0]}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 text-sm">{subject.subject}</p>
                                <p className="text-xs text-gray-400">{subject.teacher}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="text-sm font-bold text-gray-600">×{subject.coefficient}</span>
                          </td>
                          <td className="px-4 py-4 text-center text-sm text-gray-500">
                            {subject.evaluations.length}
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="text-lg font-black text-[#1A3C8F]">{avg}</span>
                            <span className="text-xs text-gray-400">/20</span>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${m.color}`}>
                              {m.label}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-100 rounded-full h-2">
                                <div
                                  className={`${m.bar} h-2 rounded-full transition-all`}
                                  style={{ width: `${(parseFloat(avg) / 20) * 100}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-400 w-8">{Math.round((parseFloat(avg) / 20) * 100)}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <button
                              onClick={() => setSelectedSubject(subject)}
                              className="text-xs bg-[#1A3C8F] text-white px-3 py-1.5 rounded-lg hover:bg-[#0f2460] transition"
                            >
                              Voir
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Grade legend */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-700 text-sm mb-3">Barème des mentions</h3>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { range: '16 – 20', label: 'Très Bien', color: 'bg-green-100 text-green-700' },
                    { range: '14 – 15', label: 'Bien', color: 'bg-blue-100 text-blue-700' },
                    { range: '12 – 13', label: 'Assez Bien', color: 'bg-yellow-100 text-yellow-700' },
                    { range: '10 – 11', label: 'Passable', color: 'bg-orange-100 text-orange-700' },
                    { range: '0 – 9', label: 'Insuffisant', color: 'bg-red-100 text-red-700' },
                  ].map((m) => (
                    <div key={m.label} className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${m.color}`}>
                      <span className="text-xs font-bold">{m.range}</span>
                      <span className="text-xs">→ {m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUBJECT DETAIL */}
          {selectedSubject && (
            <div>
              {/* Subject summary */}
              <div className="bg-gradient-to-r from-[#1A3C8F] to-[#0f2460] rounded-2xl p-6 mb-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 ${selectedSubject.color} rounded-2xl flex items-center justify-center text-white font-black text-2xl`}>
                      {selectedSubject.subject[0]}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black">{selectedSubject.subject}</h2>
                      <p className="text-white/70">{selectedSubject.teacher} · Coefficient {selectedSubject.coefficient}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/50 text-sm">Moyenne actuelle</p>
                    <p className="text-4xl font-black">{getSubjectAverage(selectedSubject.evaluations)}<span className="text-lg text-white/60">/20</span></p>
                    <span className={`text-xs px-2 py-1 rounded-full bg-white/20 text-white`}>
                      {getMention(parseFloat(getSubjectAverage(selectedSubject.evaluations))).label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Evaluations list */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-800">Toutes les évaluations</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {selectedSubject.evaluations.map((ev, index) => {
                    const m = getMention(ev.grade)
                    const isExpanded = expandedRow === index
                    return (
                      <div key={index}>
                        <div
                          className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition cursor-pointer"
                          onClick={() => setExpandedRow(isExpanded ? null : index)}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 text-sm">{ev.title}</p>
                              <p className="text-xs text-gray-400">{ev.type} · {ev.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-24">
                              <div className="w-full bg-gray-100 rounded-full h-1.5">
                                <div
                                  className={`${m.bar} h-1.5 rounded-full`}
                                  style={{ width: `${(ev.grade / ev.max) * 100}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-lg font-black text-[#1A3C8F] w-16 text-right">
                              {ev.grade}/{ev.max}
                            </span>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full w-24 text-center ${m.color}`}>
                              {m.label}
                            </span>
                            <span className="text-gray-300">{isExpanded ? '▲' : '▼'}</span>
                          </div>
                        </div>
                        {isExpanded && ev.feedback && (
                          <div className="px-6 pb-4 bg-blue-50">
                            <div className="bg-white border border-blue-100 rounded-xl p-4">
                              <p className="text-xs font-semibold text-blue-600 mb-1">💬 Appréciation du professeur</p>
                              <p className="text-sm text-gray-700 italic">"{ev.feedback}"</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}