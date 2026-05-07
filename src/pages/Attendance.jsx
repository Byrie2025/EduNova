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
  {
    id: 1,
    subject: 'Mathématiques Avancées',
    teacher: 'Prof. Kouassi',
    color: 'bg-blue-500',
    totalSessions: 24,
    records: [
      { date: 'Lundi 29 avril 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Lundi 22 avril 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Lundi 14 avril 2025', time: '08h00 – 10h00', status: 'Absent' },
      { date: 'Lundi 7 avril 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Lundi 31 mars 2025', time: '08h00 – 10h00', status: 'Retard' },
      { date: 'Lundi 24 mars 2025', time: '08h00 – 10h00', status: 'Présent' },
    ],
  },
  {
    id: 2,
    subject: 'Programmation Web',
    teacher: 'Prof. Bamba',
    color: 'bg-purple-500',
    totalSessions: 20,
    records: [
      { date: 'Mardi 29 avril 2025', time: '10h00 – 12h00', status: 'Présent' },
      { date: 'Mardi 22 avril 2025', time: '10h00 – 12h00', status: 'Présent' },
      { date: 'Mardi 15 avril 2025', time: '10h00 – 12h00', status: 'Présent' },
      { date: 'Mardi 8 avril 2025', time: '10h00 – 12h00', status: 'Excusé' },
      { date: 'Mardi 1 avril 2025', time: '10h00 – 12h00', status: 'Présent' },
      { date: 'Mardi 25 mars 2025', time: '10h00 – 12h00', status: 'Présent' },
    ],
  },
  {
    id: 3,
    subject: 'Base de Données',
    teacher: 'Prof. Traoré',
    color: 'bg-green-500',
    totalSessions: 18,
    records: [
      { date: 'Jeudi 1 mai 2025', time: '14h00 – 16h00', status: 'Présent' },
      { date: 'Jeudi 24 avril 2025', time: '14h00 – 16h00', status: 'Présent' },
      { date: 'Jeudi 17 avril 2025', time: '14h00 – 16h00', status: 'Absent' },
      { date: 'Jeudi 10 avril 2025', time: '14h00 – 16h00', status: 'Présent' },
      { date: 'Jeudi 3 avril 2025', time: '14h00 – 16h00', status: 'Présent' },
      { date: 'Jeudi 27 mars 2025', time: '14h00 – 16h00', status: 'Présent' },
    ],
  },
  {
    id: 4,
    subject: "Systèmes d'Exploitation",
    teacher: 'Prof. Koné',
    color: 'bg-orange-500',
    totalSessions: 16,
    records: [
      { date: 'Mercredi 30 avril 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Mercredi 23 avril 2025', time: '08h00 – 10h00', status: 'Retard' },
      { date: 'Mercredi 16 avril 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Mercredi 9 avril 2025', time: '08h00 – 10h00', status: 'Absent' },
      { date: 'Mercredi 2 avril 2025', time: '08h00 – 10h00', status: 'Présent' },
      { date: 'Mercredi 26 mars 2025', time: '08h00 – 10h00', status: 'Présent' },
    ],
  },
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

function getAttendanceRate(records) {
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

export default function Attendance() {
  const [activePage, setActivePage] = useState('Présences')
  const [selectedSubject, setSelectedSubject] = useState(null)
  const navigate = useNavigate()

  const overallRate = Math.round(
    attendanceData.reduce((sum, s) => sum + getAttendanceRate(s.records), 0) / attendanceData.length
  )

  const totalAbsent = attendanceData.reduce(
    (sum, s) => sum + s.records.filter(r => r.status === 'Absent').length, 0
  )

  const totalRetard = attendanceData.reduce(
    (sum, s) => sum + s.records.filter(r => r.status === 'Retard').length, 0
  )

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
                {selectedSubject ? selectedSubject.subject : 'Mes Présences'}
              </h1>
              <p className="text-sm text-gray-400">
                {selectedSubject ? selectedSubject.teacher : 'Suivi de présence — Semestre en cours'}
              </p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#1A3C8F] flex items-center justify-center text-white text-sm font-bold">E</div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">

          {/* OVERVIEW */}
          {!selectedSubject && (
            <div>
              {/* Summary cards */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="col-span-2 bg-gradient-to-r from-[#1A3C8F] to-[#0f2460] rounded-2xl p-6 text-white">
                  <p className="text-white/60 text-sm mb-1">Taux de présence global</p>
                  <p className="text-5xl font-black">{overallRate}<span className="text-2xl font-normal text-white/60">%</span></p>
                  <div className="mt-3 w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-[#22C55E] h-2 rounded-full transition-all"
                      style={{ width: `${overallRate}%` }}
                    />
                  </div>
                  <p className="text-white/50 text-xs mt-2">
                    {overallRate >= 90 ? '✅ Excellent — continuez ainsi !' : overallRate >= 75 ? '⚠️ Attention — taux limite' : '❌ Insuffisant — risque d\'exclusion'}
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Absences</p>
                  <p className="text-4xl font-black text-red-500">{totalAbsent}</p>
                  <p className="text-xs text-gray-400 mt-1">ce semestre</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Retards</p>
                  <p className="text-4xl font-black text-orange-500">{totalRetard}</p>
                  <p className="text-xs text-gray-400 mt-1">ce semestre</p>
                </div>
              </div>

              {/* Attendance warning */}
              {overallRate < 90 && (
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <p className="font-semibold text-orange-700">Attention à votre taux de présence</p>
                    <p className="text-sm text-orange-600 mt-1">Un taux de présence inférieur à 75% peut entraîner une exclusion des examens. Consultez votre administration si vous avez des absences justifiées.</p>
                  </div>
                </div>
              )}

              {/* Per subject table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="font-bold text-gray-800">Présence par matière</h2>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-xs text-gray-400 border-b border-gray-100">
                      <th className="text-left px-6 py-3 font-medium">Matière</th>
                      <th className="text-center px-4 py-3 font-medium">Séances</th>
                      <th className="text-center px-4 py-3 font-medium">Présent</th>
                      <th className="text-center px-4 py-3 font-medium">Absent</th>
                      <th className="text-center px-4 py-3 font-medium">Retard</th>
                      <th className="text-center px-4 py-3 font-medium">Excusé</th>
                      <th className="text-center px-4 py-3 font-medium">Taux</th>
                      <th className="text-center px-4 py-3 font-medium">Détail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {attendanceData.map((subject) => {
                      const rate = getAttendanceRate(subject.records)
                      const present = subject.records.filter(r => r.status === 'Présent').length
                      const absent = subject.records.filter(r => r.status === 'Absent').length
                      const retard = subject.records.filter(r => r.status === 'Retard').length
                      const excuse = subject.records.filter(r => r.status === 'Excusé').length
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
                          <td className="px-4 py-4 text-center text-sm text-gray-500">{subject.records.length}</td>
                          <td className="px-4 py-4 text-center">
                            <span className="text-sm font-bold text-green-600">{present}</span>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="text-sm font-bold text-red-500">{absent}</span>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="text-sm font-bold text-orange-500">{retard}</span>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="text-sm font-bold text-blue-500">{excuse}</span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-100 rounded-full h-2">
                                <div
                                  className={`${getRateBar(rate)} h-2 rounded-full`}
                                  style={{ width: `${rate}%` }}
                                />
                              </div>
                              <span className={`text-xs font-bold w-10 ${getRateColor(rate)}`}>{rate}%</span>
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

              {/* Legend */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-700 text-sm mb-3">Légende des statuts</h3>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { status: 'Présent', style: 'bg-green-100 text-green-700', icon: '✅' },
                    { status: 'Absent', style: 'bg-red-100 text-red-600', icon: '❌' },
                    { status: 'Retard', style: 'bg-orange-100 text-orange-600', icon: '⏰' },
                    { status: 'Excusé', style: 'bg-blue-100 text-blue-600', icon: '📋' },
                  ].map((s) => (
                    <div key={s.status} className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${s.style}`}>
                      <span>{s.icon}</span>
                      <span className="text-xs font-medium">{s.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUBJECT DETAIL */}
          {selectedSubject && (
            <div>
              {/* Banner */}
              <div className="bg-gradient-to-r from-[#1A3C8F] to-[#0f2460] rounded-2xl p-6 mb-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 ${selectedSubject.color} rounded-2xl flex items-center justify-center text-white font-black text-2xl`}>
                      {selectedSubject.subject[0]}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black">{selectedSubject.subject}</h2>
                      <p className="text-white/70">{selectedSubject.teacher}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/50 text-sm">Taux de présence</p>
                    <p className={`text-4xl font-black`}>
                      {getAttendanceRate(selectedSubject.records)}
                      <span className="text-lg text-white/60">%</span>
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-[#22C55E] h-2 rounded-full"
                      style={{ width: `${getAttendanceRate(selectedSubject.records)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Records list */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-800">Historique des séances</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {selectedSubject.records.map((record, index) => (
                    <div key={index} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition">
                      <div className="flex items-center gap-4">
                        <span className="text-xl">{getStatusIcon(record.status)}</span>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{record.date}</p>
                          <p className="text-xs text-gray-400">🕐 {record.time}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${getStatusStyle(record.status)}`}>
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
    </div>
  )
}