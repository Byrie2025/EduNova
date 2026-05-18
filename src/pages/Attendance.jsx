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

const attendanceData = [
  { id: 1, code: 'INFO301', subject: 'Architecture des Ordinateurs et Téléinformatique', teacher: 'Prof. Kouassi', color: 'bg-blue-500', totalSessions: 20,
    records: [
      { date: 'Lundi 5 mai 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Lundi 28 avril 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Lundi 14 avril 2025', time: '08h00 – 10h00', status: 'Absent' },
      { date: 'Lundi 7 avril 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Lundi 31 mars 2025', time: '08h00 – 10h00', status: 'Retard' },
      { date: 'Lundi 24 mars 2025', time: '08h00 – 10h00', status: 'Présent' },
    ]},
  { id: 2, code: 'INFO302', subject: 'Mathématique du Signal', teacher: 'Prof. Diallo', color: 'bg-red-500', totalSessions: 18,
    records: [
      { date: 'Mardi 6 mai 2025', time: '10h00 – 12h00', status: 'Présent' },
      { date: 'Mardi 29 avril 2025', time: '10h00 – 12h00', status: 'Absent' },
      { date: 'Mardi 15 avril 2025', time: '10h00 – 12h00', status: 'Présent' },
      { date: 'Mardi 8 avril 2025', time: '10h00 – 12h00', status: 'Excusé' },
      { date: 'Mardi 1 avril 2025', time: '10h00 – 12h00', status: 'Présent' },
      { date: 'Mardi 25 mars 2025', time: '10h00 – 12h00', status: 'Présent' },
    ]},
  { id: 3, code: 'INFO303', subject: 'Algorithmique', teacher: 'Prof. Traoré', color: 'bg-purple-500', totalSessions: 22,
    records: [
      { date: 'Mercredi 7 mai 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Mercredi 30 avril 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Mercredi 16 avril 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Mercredi 9 avril 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Mercredi 2 avril 2025', time: '08h00 – 10h00', status: 'Retard' },
      { date: 'Mercredi 26 mars 2025', time: '08h00 – 10h00', status: 'Présent' },
    ]},
  { id: 4, code: 'INFO304', subject: 'Langage Pascal et C', teacher: 'Prof. Bamba', color: 'bg-green-500', totalSessions: 20,
    records: [
      { date: 'Jeudi 8 mai 2025', time: '14h00 – 16h00', status: 'Présent' },
      { date: 'Jeudi 24 avril 2025', time: '14h00 – 16h00', status: 'Présent' },
      { date: 'Jeudi 17 avril 2025', time: '14h00 – 16h00', status: 'Présent' },
      { date: 'Jeudi 10 avril 2025', time: '14h00 – 16h00', status: 'Absent' },
      { date: 'Jeudi 3 avril 2025', time: '14h00 – 16h00', status: 'Présent' },
      { date: 'Jeudi 27 mars 2025', time: '14h00 – 16h00', status: 'Présent' },
    ]},
  { id: 5, code: 'INFO305', subject: 'Visual Basic', teacher: 'Prof. Koné', color: 'bg-yellow-500', totalSessions: 16,
    records: [
      { date: 'Lundi 5 mai 2025', time: '14h00 – 16h00', status: 'Présent' },
      { date: 'Lundi 28 avril 2025', time: '14h00 – 16h00', status: 'Présent' },
      { date: 'Lundi 14 avril 2025', time: '14h00 – 16h00', status: 'Présent' },
      { date: 'Lundi 7 avril 2025', time: '14h00 – 16h00', status: 'Présent' },
      { date: 'Lundi 31 mars 2025', time: '14h00 – 16h00', status: 'Excusé' },
      { date: 'Lundi 24 mars 2025', time: '14h00 – 16h00', status: 'Présent' },
    ]},
  { id: 6, code: 'INFO306', subject: "Système d'Exploitation", teacher: 'Prof. Ouattara', color: 'bg-gray-600', totalSessions: 18,
    records: [
      { date: 'Mardi 6 mai 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Mardi 29 avril 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Mardi 15 avril 2025', time: '08h00 – 10h00', status: 'Absent' },
      { date: 'Mardi 8 avril 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Mardi 1 avril 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Mardi 25 mars 2025', time: '08h00 – 10h00', status: 'Retard' },
    ]},
  { id: 7, code: 'INFO307', subject: 'Méthodologie MERISE', teacher: 'Prof. Coulibaly', color: 'bg-teal-500', totalSessions: 16,
    records: [
      { date: 'Jeudi 8 mai 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Jeudi 24 avril 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Jeudi 17 avril 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Jeudi 10 avril 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Jeudi 3 avril 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Jeudi 27 mars 2025', time: '08h00 – 10h00', status: 'Présent' },
    ]},
  { id: 8, code: 'INFO308', subject: 'Base de Données', teacher: 'Prof. Traoré', color: 'bg-indigo-500', totalSessions: 20,
    records: [
      { date: 'Vendredi 9 mai 2025', time: '10h00 – 12h00', status: 'Présent' },
      { date: 'Vendredi 25 avril 2025', time: '10h00 – 12h00', status: 'Présent' },
      { date: 'Vendredi 11 avril 2025', time: '10h00 – 12h00', status: 'Présent' },
      { date: 'Vendredi 4 avril 2025', time: '10h00 – 12h00', status: 'Présent' },
      { date: 'Vendredi 28 mars 2025', time: '10h00 – 12h00', status: 'Présent' },
      { date: 'Vendredi 21 mars 2025', time: '10h00 – 12h00', status: 'Présent' },
    ]},
  { id: 9, code: 'INFO309', subject: 'Logiciels', teacher: 'Prof. Yao', color: 'bg-pink-500', totalSessions: 14,
    records: [
      { date: 'Lundi 5 mai 2025', time: '10h00 – 12h00', status: 'Présent' },
      { date: 'Lundi 28 avril 2025', time: '10h00 – 12h00', status: 'Absent' },
      { date: 'Lundi 14 avril 2025', time: '10h00 – 12h00', status: 'Présent' },
      { date: 'Lundi 7 avril 2025', time: '10h00 – 12h00', status: 'Présent' },
      { date: 'Lundi 31 mars 2025', time: '10h00 – 12h00', status: 'Présent' },
      { date: 'Lundi 24 mars 2025', time: '10h00 – 12h00', status: 'Présent' },
    ]},
  { id: 10, code: 'INFO310', subject: 'Négociation Informatique', teacher: 'Prof. Diabaté', color: 'bg-amber-500', totalSessions: 12,
    records: [
      { date: 'Mardi 6 mai 2025', time: '14h00 – 16h00', status: 'Présent' },
      { date: 'Mardi 29 avril 2025', time: '14h00 – 16h00', status: 'Présent' },
      { date: 'Mardi 15 avril 2025', time: '14h00 – 16h00', status: 'Présent' },
      { date: 'Mardi 8 avril 2025', time: '14h00 – 16h00', status: 'Présent' },
      { date: 'Mardi 1 avril 2025', time: '14h00 – 16h00', status: 'Retard' },
      { date: 'Mardi 25 mars 2025', time: '14h00 – 16h00', status: 'Présent' },
    ]},
  { id: 11, code: 'INFO311', subject: 'Projet', teacher: 'Prof. Kouassi', color: 'bg-red-600', totalSessions: 16,
    records: [
      { date: 'Vendredi 9 mai 2025', time: '14h00 – 16h00', status: 'Présent' },
      { date: 'Vendredi 25 avril 2025', time: '14h00 – 16h00', status: 'Présent' },
      { date: 'Vendredi 11 avril 2025', time: '14h00 – 16h00', status: 'Présent' },
      { date: 'Vendredi 4 avril 2025', time: '14h00 – 16h00', status: 'Absent' },
      { date: 'Vendredi 28 mars 2025', time: '14h00 – 16h00', status: 'Présent' },
      { date: 'Vendredi 21 mars 2025', time: '14h00 – 16h00', status: 'Présent' },
    ]},
  { id: 12, code: 'INFO312', subject: 'Web', teacher: 'Prof. Koné', color: 'bg-cyan-500', totalSessions: 16,
    records: [
      { date: 'Jeudi 8 mai 2025', time: '10h00 – 12h00', status: 'Présent' },
      { date: 'Jeudi 24 avril 2025', time: '10h00 – 12h00', status: 'Présent' },
      { date: 'Jeudi 17 avril 2025', time: '10h00 – 12h00', status: 'Présent' },
      { date: 'Jeudi 10 avril 2025', time: '10h00 – 12h00', status: 'Présent' },
      { date: 'Jeudi 3 avril 2025', time: '10h00 – 12h00', status: 'Présent' },
      { date: 'Jeudi 27 mars 2025', time: '10h00 – 12h00', status: 'Présent' },
    ]},
]

function getStatusStyle(status) {
  if (status === 'Présent') return 'bg-green-100 text-green-700'
  if (status === 'Absent') return 'bg-red-100 text-red-600'
  if (status === 'Retard') return 'bg-orange-100 text-orange-600'
  if (status === 'Excusé') return 'bg-blue-100 text-blue-600'
  return 'bg-gray-100 text-gray-500'
}

function getStatusIcon(status) {
  if (status === 'Présent') return '✅'
  if (status === 'Absent') return '❌'
  if (status === 'Retard') return '⏰'
  if (status === 'Excusé') return '📋'
  return '—'
}

function getRate(records) {
  const present = records.filter(r => r.status === 'Présent' || r.status === 'Excusé').length
  return Math.round((present / records.length) * 100)
}

function getRateColor(rate) {
  if (rate >= 90) return 'text-green-600'
  if (rate >= 75) return 'text-orange-500'
  return 'text-red-600'
}

function getRateBar(rate) {
  if (rate >= 90) return 'bg-green-500'
  if (rate >= 75) return 'bg-orange-500'
  return 'bg-red-500'
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

export default function Attendance() {
  const [activePage, setActivePage] = useState('Présences')
  const [selectedSubject, setSelectedSubject] = useState(null)
  const navigate = useNavigate()

  const overallRate = Math.round(
    attendanceData.reduce((sum, s) => sum + getRate(s.records), 0) / attendanceData.length
  )
  const totalAbsent = attendanceData.reduce((sum, s) => sum + s.records.filter(r => r.status === 'Absent').length, 0)
  const totalRetard = attendanceData.reduce((sum, s) => sum + s.records.filter(r => r.status === 'Retard').length, 0)

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
                {selectedSubject ? selectedSubject.subject : 'Mes Présences'}
              </h1>
              <p className="text-xs md:text-sm text-gray-400">
                {selectedSubject ? `${selectedSubject.teacher} · ${selectedSubject.code}` : 'Suivi de présence — Licence 3'}
              </p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#0F172A] flex items-center justify-center text-white text-sm font-bold">E</div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6 pb-24 md:pb-6">
          {!selectedSubject && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="col-span-2 bg-gradient-to-r from-[#0F172A] to-[#1e293b] rounded-2xl p-5 text-white">
                  <p className="text-white/60 text-sm mb-1">Taux de présence global</p>
                  <p className="text-4xl md:text-5xl font-black">{overallRate}<span className="text-xl font-normal text-white/60">%</span></p>
                  <div className="mt-3 w-full bg-white/20 rounded-full h-2">
                    <div className="bg-[#F43F5E] h-2 rounded-full" style={{ width: `${overallRate}%` }} />
                  </div>
                  <p className="text-white/50 text-xs mt-2">
                    {overallRate >= 90 ? 'Excellent — continuez ainsi !' : 'Attention — taux limite'}
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Absences</p>
                  <p className="text-3xl font-black text-red-500">{totalAbsent}</p>
                  <p className="text-xs text-gray-400 mt-1">ce semestre</p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Retards</p>
                  <p className="text-3xl font-black text-orange-500">{totalRetard}</p>
                  <p className="text-xs text-gray-400 mt-1">ce semestre</p>
                </div>
              </div>

              {overallRate < 90 && (
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-4 flex items-start gap-3">
                  <span className="text-xl">⚠️</span>
                  <div>
                    <p className="font-semibold text-orange-700 text-sm">Attention à votre taux de présence</p>
                    <p className="text-xs text-orange-600 mt-1">Un taux inférieur à 75% peut entraîner une exclusion des examens à GECOS Formation.</p>
                  </div>
                </div>
              )}

              {/* Mobile — cards */}
              <div className="space-y-3 md:hidden">
                {attendanceData.map((subject) => {
                  const rate = getRate(subject.records)
                  const absent = subject.records.filter(r => r.status === 'Absent').length
                  return (
                    <div key={subject.id} onClick={() => setSelectedSubject(subject)}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 ${subject.color} rounded-lg flex items-center justify-center text-white text-xs font-black`}>
                            {subject.code.slice(-2)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 text-sm">{subject.subject}</p>
                            <p className="text-xs text-gray-400">{subject.teacher}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-black ${getRateColor(rate)}`}>{rate}%</p>
                          {absent > 0 && <p className="text-xs text-red-500">{absent} absence{absent > 1 ? 's' : ''}</p>}
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className={`${getRateBar(rate)} h-1.5 rounded-full`} style={{ width: `${rate}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Desktop — table */}
              <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="font-bold text-gray-800">Présence par matière — 12 matières</h2>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-xs text-gray-400 border-b border-gray-100">
                      <th className="text-left px-6 py-3 font-medium">Matière</th>
                      <th className="text-center px-4 py-3 font-medium">Présent</th>
                      <th className="text-center px-4 py-3 font-medium">Absent</th>
                      <th className="text-center px-4 py-3 font-medium">Retard</th>
                      <th className="text-center px-4 py-3 font-medium">Taux</th>
                      <th className="text-center px-4 py-3 font-medium">Détail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {attendanceData.map((subject) => {
                      const rate = getRate(subject.records)
                      const present = subject.records.filter(r => r.status === 'Présent').length
                      const absent = subject.records.filter(r => r.status === 'Absent').length
                      const retard = subject.records.filter(r => r.status === 'Retard').length
                      return (
                        <tr key={subject.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-7 h-7 ${subject.color} rounded flex items-center justify-center text-white text-xs font-black`}>
                                {subject.code.slice(-2)}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 text-sm">{subject.subject}</p>
                                <p className="text-xs text-gray-400">{subject.teacher}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center"><span className="text-sm font-bold text-green-600">{present}</span></td>
                          <td className="px-4 py-3 text-center"><span className="text-sm font-bold text-red-500">{absent}</span></td>
                          <td className="px-4 py-3 text-center"><span className="text-sm font-bold text-orange-500">{retard}</span></td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                                <div className={`${getRateBar(rate)} h-1.5 rounded-full`} style={{ width: `${rate}%` }} />
                              </div>
                              <span className={`text-xs font-bold ${getRateColor(rate)}`}>{rate}%</span>
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

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-700 text-sm mb-3">Légende</h3>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { status: 'Présent', style: 'bg-green-100 text-green-700', icon: '✅' },
                    { status: 'Absent', style: 'bg-red-100 text-red-600', icon: '❌' },
                    { status: 'Retard', style: 'bg-orange-100 text-orange-600', icon: '⏰' },
                    { status: 'Excusé', style: 'bg-blue-100 text-blue-600', icon: '📋' },
                  ].map((s) => (
                    <div key={s.status} className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${s.style}`}>
                      <span className="text-xs">{s.icon}</span>
                      <span className="text-xs font-medium">{s.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedSubject && (
            <div>
              <div className="bg-gradient-to-r from-[#0F172A] to-[#1e293b] rounded-2xl p-5 mb-5 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 ${selectedSubject.color} rounded-2xl flex items-center justify-center text-white font-black`}>
                    {selectedSubject.code.slice(-2)}
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">{selectedSubject.code}</p>
                    <h2 className="text-lg font-black">{selectedSubject.subject}</h2>
                    <p className="text-white/70 text-sm">{selectedSubject.teacher}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white/50 text-sm">Taux de présence</p>
                  <p className="text-3xl font-black">{getRate(selectedSubject.records)}<span className="text-lg text-white/60">%</span></p>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-[#F43F5E] h-2 rounded-full" style={{ width: `${getRate(selectedSubject.records)}%` }} />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-800">Historique des séances</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {selectedSubject.records.map((record, index) => (
                    <div key={index} className="flex items-center justify-between px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{getStatusIcon(record.status)}</span>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{record.date}</p>
                          <p className="text-xs text-gray-400">{record.time}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusStyle(record.status)}`}>
                        {record.status}
                      </span>
                    </div>
                  ))}
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