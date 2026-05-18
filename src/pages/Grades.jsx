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
  { id: 1, code: 'INFO301', subject: 'Architecture des Ordinateurs et Téléinformatique', teacher: 'Prof. Kouassi', coefficient: 3, color: 'bg-blue-500',
    evaluations: [
      { title: 'Contrôle n°1', type: 'Contrôle', date: '20 janv. 2025', grade: 13, max: 20, feedback: 'Bonne compréhension des bases, revoir les bus système.' },
      { title: 'TP n°1 — Schéma', type: 'TP noté', date: '10 fév. 2025', grade: 15, max: 20, feedback: 'Schéma bien réalisé, quelques erreurs mineures.' },
      { title: 'Examen partiel', type: 'Examen', date: '15 mars 2025', grade: 14, max: 20, feedback: 'Bon travail général.' },
    ]},
  { id: 2, code: 'INFO302', subject: 'Mathématique du Signal', teacher: 'Prof. Diallo', coefficient: 3, color: 'bg-red-500',
    evaluations: [
      { title: 'DM n°1', type: 'Devoir Maison', date: '25 janv. 2025', grade: 11, max: 20, feedback: 'Des lacunes sur la transformée de Fourier.' },
      { title: 'Contrôle n°1', type: 'Contrôle', date: '20 fév. 2025', grade: 12, max: 20, feedback: 'Progression notable, continuez.' },
      { title: 'Examen partiel', type: 'Examen', date: '20 mars 2025', grade: 13, max: 20, feedback: 'Passable, revoir les signaux numériques.' },
    ]},
  { id: 3, code: 'INFO303', subject: 'Algorithmique', teacher: 'Prof. Traoré', coefficient: 4, color: 'bg-purple-500',
    evaluations: [
      { title: 'TP n°1 — Récursivité', type: 'TP noté', date: '15 janv. 2025', grade: 16, max: 20, feedback: 'Excellent ! Très bonne maîtrise de la récursivité.' },
      { title: 'Contrôle n°1', type: 'Contrôle', date: '12 fév. 2025', grade: 15, max: 20, feedback: 'Bonne maîtrise des algorithmes de tri.' },
      { title: 'TP n°2 — Graphes', type: 'TP noté', date: '10 mars 2025', grade: 15, max: 20, feedback: 'Très bon travail sur les graphes.' },
    ]},
  { id: 4, code: 'INFO304', subject: 'Langage Pascal et C', teacher: 'Prof. Bamba', coefficient: 4, color: 'bg-green-500',
    evaluations: [
      { title: 'TP n°1 — Pointeurs', type: 'TP noté', date: '18 janv. 2025', grade: 17, max: 20, feedback: 'Excellent travail sur les pointeurs.' },
      { title: 'Contrôle n°1', type: 'Contrôle', date: '15 fév. 2025', grade: 16, max: 20, feedback: 'Très bonne maîtrise du langage C.' },
      { title: 'Projet — Mini compilateur', type: 'Projet', date: '20 mars 2025', grade: 16, max: 20, feedback: 'Projet ambitieux et bien réalisé.' },
    ]},
  { id: 5, code: 'INFO305', subject: 'Visual Basic', teacher: 'Prof. Koné', coefficient: 3, color: 'bg-yellow-500',
    evaluations: [
      { title: 'TP n°1 — Interface', type: 'TP noté', date: '22 janv. 2025', grade: 14, max: 20, feedback: 'Interface bien conçue, quelques bugs mineurs.' },
      { title: 'Mini-projet', type: 'Projet', date: '5 mars 2025', grade: 15, max: 20, feedback: 'Bonne application, fonctionnelle.' },
    ]},
  { id: 6, code: 'INFO306', subject: "Système d'Exploitation", teacher: 'Prof. Ouattara', coefficient: 3, color: 'bg-gray-600',
    evaluations: [
      { title: 'Contrôle n°1', type: 'Contrôle', date: '28 janv. 2025', grade: 12, max: 20, feedback: 'Revoir la gestion des processus.' },
      { title: 'TP n°1 — Linux', type: 'TP noté', date: '25 fév. 2025', grade: 13, max: 20, feedback: 'Bonne pratique des commandes Linux.' },
      { title: 'Examen partiel', type: 'Examen', date: '25 mars 2025', grade: 13, max: 20, feedback: 'Assez bien, continuez les efforts.' },
    ]},
  { id: 7, code: 'INFO307', subject: 'Méthodologie MERISE', teacher: 'Prof. Coulibaly', coefficient: 3, color: 'bg-teal-500',
    evaluations: [
      { title: 'TP n°1 — MCD', type: 'TP noté', date: '20 janv. 2025', grade: 16, max: 20, feedback: 'Excellent MCD, très bien normalisé.' },
      { title: 'TP n°2 — MLD', type: 'TP noté', date: '18 fév. 2025', grade: 17, max: 20, feedback: 'Parfait ! Très bonne transition MCD vers MLD.' },
      { title: 'Projet MERISE', type: 'Projet', date: '16 mars 2025', grade: 16, max: 20, feedback: 'Projet complet et bien documenté.' },
    ]},
  { id: 8, code: 'INFO308', subject: 'Base de Données', teacher: 'Prof. Traoré', coefficient: 4, color: 'bg-indigo-500',
    evaluations: [
      { title: 'TP n°1 — SQL', type: 'TP noté', date: '25 janv. 2025', grade: 17, max: 20, feedback: 'Excellent ! Requêtes SQL très bien maîtrisées.' },
      { title: 'Contrôle n°1', type: 'Contrôle', date: '20 fév. 2025', grade: 18, max: 20, feedback: 'Parfait ! Meilleure note de la promotion.' },
      { title: 'TP n°2 — Procédures', type: 'TP noté', date: '18 mars 2025', grade: 17, max: 20, feedback: 'Très bon travail sur les procédures stockées.' },
    ]},
  { id: 9, code: 'INFO309', subject: 'Logiciels', teacher: 'Prof. Yao', coefficient: 2, color: 'bg-pink-500',
    evaluations: [
      { title: 'Contrôle n°1', type: 'Contrôle', date: '30 janv. 2025', grade: 14, max: 20, feedback: 'Bonne compréhension du génie logiciel.' },
      { title: 'Rapport', type: 'Rapport', date: '27 fév. 2025', grade: 15, max: 20, feedback: 'Rapport bien rédigé et structuré.' },
    ]},
  { id: 10, code: 'INFO310', subject: 'Négociation Informatique', teacher: 'Prof. Diabaté', coefficient: 2, color: 'bg-amber-500',
    evaluations: [
      { title: 'Jeu de rôle n°1', type: 'Oral', date: '5 fév. 2025', grade: 15, max: 20, feedback: 'Bonne présentation, argumentaire convaincant.' },
      { title: 'Dossier commercial', type: 'Rapport', date: '5 mars 2025', grade: 16, max: 20, feedback: 'Excellent dossier, très professionnel.' },
    ]},
  { id: 11, code: 'INFO311', subject: 'Projet', teacher: 'Prof. Kouassi', coefficient: 4, color: 'bg-red-600',
    evaluations: [
      { title: 'Rapport Sprint 1', type: 'Rapport', date: '28 fév. 2025', grade: 14, max: 20, feedback: 'Bon démarrage, planning à respecter.' },
      { title: 'Soutenance mi-parcours', type: 'Oral', date: '28 mars 2025', grade: 15, max: 20, feedback: 'Bonne présentation, projet bien avancé.' },
    ]},
  { id: 12, code: 'INFO312', subject: 'Web', teacher: 'Prof. Koné', coefficient: 3, color: 'bg-cyan-500',
    evaluations: [
      { title: 'TP n°1 — HTML/CSS', type: 'TP noté', date: '22 janv. 2025', grade: 15, max: 20, feedback: 'Bon design, code bien structuré.' },
      { title: 'TP n°2 — PHP/MySQL', type: 'TP noté', date: '20 fév. 2025', grade: 16, max: 20, feedback: 'Très bon travail sur la partie dynamique.' },
      { title: 'Mini-projet', type: 'Projet', date: '20 mars 2025', grade: 15, max: 20, feedback: 'Site fonctionnel et bien réalisé.' },
    ]},
]

function getMention(grade) {
  if (grade >= 16) return { label: 'Très Bien', color: 'bg-green-100 text-green-700', bar: 'bg-green-500' }
  if (grade >= 14) return { label: 'Bien', color: 'bg-blue-100 text-blue-700', bar: 'bg-blue-500' }
  if (grade >= 12) return { label: 'Assez Bien', color: 'bg-yellow-100 text-yellow-700', bar: 'bg-yellow-500' }
  if (grade >= 10) return { label: 'Passable', color: 'bg-orange-100 text-orange-700', bar: 'bg-orange-500' }
  return { label: 'Insuffisant', color: 'bg-red-100 text-red-700', bar: 'bg-red-500' }
}

function getAverage(evaluations) {
  return (evaluations.reduce((s, e) => s + e.grade, 0) / evaluations.length).toFixed(1)
}

function getWeightedAverage() {
  let total = 0, coeff = 0
  grades.forEach(s => {
    total += parseFloat(getAverage(s.evaluations)) * s.coefficient
    coeff += s.coefficient
  })
  return (total / coeff).toFixed(2)
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

export default function Grades() {
  const [activePage, setActivePage] = useState('Notes')
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [expandedRow, setExpandedRow] = useState(null)
  const navigate = useNavigate()

  const weightedAverage = getWeightedAverage()
  const mention = getMention(parseFloat(weightedAverage))
  const totalCoeff = grades.reduce((s, g) => s + g.coefficient, 0)
  const bestSubject = [...grades].sort((a, b) =>
    parseFloat(getAverage(b.evaluations)) - parseFloat(getAverage(a.evaluations))
  )[0]

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
            {selectedSubject && (
              <button onClick={() => setSelectedSubject(null)} className="text-gray-400 hover:text-[#0F172A] transition mr-1">←</button>
            )}
            <div>
              <h1 className="text-lg md:text-xl font-bold text-[#0F172A]">
                {selectedSubject ? selectedSubject.subject : 'Mes Notes'}
              </h1>
              <p className="text-xs md:text-sm text-gray-400">
                {selectedSubject ? `${selectedSubject.teacher} · Coeff. ${selectedSubject.coefficient}` : 'Relevé de notes — Licence 3'}
              </p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#0F172A] flex items-center justify-center text-white text-sm font-bold">E</div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6 pb-24 md:pb-6">
          {!selectedSubject && (
            <div>
              {/* Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="col-span-2 bg-gradient-to-r from-[#0F172A] to-[#1e293b] rounded-2xl p-5 text-white">
                  <p className="text-white/60 text-sm mb-1">Moyenne Générale Pondérée</p>
                  <p className="text-4xl md:text-5xl font-black">{weightedAverage}<span className="text-xl font-normal text-white/60">/20</span></p>
                  <span className="mt-2 inline-block text-xs font-medium px-3 py-1 rounded-full bg-white/20 text-white">{mention.label}</span>
                  <p className="text-white/40 text-xs mt-2">Total coefficients : {totalCoeff}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Meilleure matière</p>
                  <p className="text-sm font-black text-green-600">{bestSubject.subject.split(' ')[0]}</p>
                  <p className="text-2xl font-black text-gray-800 mt-1">{getAverage(bestSubject.evaluations)}<span className="text-sm text-gray-400">/20</span></p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Total évaluations</p>
                  <p className="text-3xl font-black text-[#0F172A]">{grades.reduce((s, g) => s + g.evaluations.length, 0)}</p>
                  <p className="text-xs text-gray-400 mt-1">ce semestre</p>
                </div>
              </div>

              {/* Mobile — cards */}
              <div className="space-y-3 md:hidden">
                {grades.map((subject) => {
                  const avg = getAverage(subject.evaluations)
                  const m = getMention(parseFloat(avg))
                  return (
                    <div key={subject.id} onClick={() => setSelectedSubject(subject)}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 ${subject.color} rounded-lg flex items-center justify-center text-white text-xs font-black`}>
                            {subject.code.slice(-2)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 text-sm">{subject.subject}</p>
                            <p className="text-xs text-gray-400">{subject.teacher} · Coeff. ×{subject.coefficient}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-black text-[#0F172A]">{avg}/20</p>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${m.color}`}>{m.label}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Desktop — table */}
              <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="font-bold text-gray-800">Relevé de notes — 12 matières</h2>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-xs text-gray-400 border-b border-gray-100">
                      <th className="text-left px-6 py-3 font-medium">Matière</th>
                      <th className="text-center px-4 py-3 font-medium">Coeff.</th>
                      <th className="text-center px-4 py-3 font-medium">Moyenne</th>
                      <th className="text-center px-4 py-3 font-medium">Mention</th>
                      <th className="text-left px-4 py-3 font-medium">Barre</th>
                      <th className="text-center px-4 py-3 font-medium">Détail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {grades.map((subject) => {
                      const avg = getAverage(subject.evaluations)
                      const m = getMention(parseFloat(avg))
                      return (
                        <tr key={subject.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-6 h-6 ${subject.color} rounded flex items-center justify-center text-white text-xs font-black`}>
                                {subject.code.slice(-2)}
                              </div>
                              <p className="font-medium text-gray-800 text-sm">{subject.subject}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center font-bold text-gray-600">×{subject.coefficient}</td>
                          <td className="px-4 py-3 text-center">
                            <span className="text-lg font-black text-[#0F172A]">{avg}</span>
                            <span className="text-xs text-gray-400">/20</span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${m.color}`}>{m.label}</span>
                          </td>
                          <td className="px-4 py-3 w-28">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                                <div className={`${m.bar} h-1.5 rounded-full`} style={{ width: `${(parseFloat(avg) / 20) * 100}%` }} />
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button onClick={() => setSelectedSubject(subject)}
                              className="text-xs bg-[#0F172A] text-white px-3 py-1.5 rounded-lg">Voir</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Legend */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-700 text-sm mb-3">Barème des mentions</h3>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { range: '16–20', label: 'Très Bien', color: 'bg-green-100 text-green-700' },
                    { range: '14–15', label: 'Bien', color: 'bg-blue-100 text-blue-700' },
                    { range: '12–13', label: 'Assez Bien', color: 'bg-yellow-100 text-yellow-700' },
                    { range: '10–11', label: 'Passable', color: 'bg-orange-100 text-orange-700' },
                    { range: '0–9', label: 'Insuffisant', color: 'bg-red-100 text-red-700' },
                  ].map((m) => (
                    <div key={m.label} className={`flex items-center gap-1 px-2 py-1 rounded-full ${m.color}`}>
                      <span className="text-xs font-bold">{m.range}</span>
                      <span className="text-xs">→ {m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Subject detail */}
          {selectedSubject && (
            <div>
              <div className="bg-gradient-to-r from-[#0F172A] to-[#1e293b] rounded-2xl p-5 mb-5 text-white">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${selectedSubject.color} rounded-2xl flex items-center justify-center text-white font-black`}>
                    {selectedSubject.code.slice(-2)}
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">{selectedSubject.code} · Coefficient {selectedSubject.coefficient}</p>
                    <h2 className="text-lg font-black">{selectedSubject.subject}</h2>
                    <p className="text-white/70 text-sm">{selectedSubject.teacher}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-white/50 text-sm">Moyenne actuelle</p>
                  <p className="text-3xl font-black">{getAverage(selectedSubject.evaluations)}<span className="text-lg text-white/60">/20</span></p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-800">Toutes les évaluations</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {selectedSubject.evaluations.map((ev, index) => {
                    const m = getMention(ev.grade)
                    const isExpanded = expandedRow === index
                    return (
                      <div key={index}>
                        <div className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50"
                          onClick={() => setExpandedRow(isExpanded ? null : index)}>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 text-sm">{ev.title}</p>
                              <p className="text-xs text-gray-400">{ev.type} · {ev.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-black text-[#0F172A]">{ev.grade}/20</span>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${m.color}`}>{m.label}</span>
                            <span className="text-gray-300 text-xs">{isExpanded ? '▲' : '▼'}</span>
                          </div>
                        </div>
                        {isExpanded && ev.feedback && (
                          <div className="px-5 pb-4 bg-blue-50">
                            <div className="bg-white border border-blue-100 rounded-xl p-4">
                              <p className="text-xs font-semibold text-blue-600 mb-1">Appréciation du professeur</p>
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

      <BottomNav activePage={activePage} setActivePage={setActivePage} navigate={navigate} />
    </div>
  )
}