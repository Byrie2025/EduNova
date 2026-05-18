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

const notifications = [
  { id: 1, type: 'grade', read: false, title: 'Nouvelle note disponible', message: 'Prof. Traoré a publié votre note pour le TP n3 — Algorithmique : 15/20 (Bien)', time: 'Il y a 10 minutes', icon: '📊', iconBg: 'bg-blue-100 text-blue-600' },
  { id: 2, type: 'assignment', read: false, title: 'Devoir à rendre demain', message: 'Rappel : TP n3 — Tri et recherche (Algorithmique) est à rendre demain avant 23h59.', time: 'Il y a 30 minutes', icon: '⏰', iconBg: 'bg-red-100 text-red-600' },
  { id: 3, type: 'announcement', read: false, title: 'Annonce de GECOS Formation', message: 'Les examens de fin de semestre auront lieu du 2 au 13 juin 2025.', time: 'Il y a 1 heure', icon: '📢', iconBg: 'bg-orange-100 text-orange-600' },
  { id: 4, type: 'grade', read: false, title: 'Note corrigée', message: 'Prof. Bamba a corrigé votre Projet — Gestionnaire de fichiers en C : 16/20 (Très Bien)', time: 'Il y a 2 heures', icon: '🏆', iconBg: 'bg-green-100 text-green-600' },
  { id: 5, type: 'attendance', read: true, title: 'Absence enregistrée', message: 'Une absence a été enregistrée pour le cours de Mathématique du Signal du Mardi 6 mai.', time: 'Il y a 3 heures', icon: '🔴', iconBg: 'bg-gray-100 text-gray-500' },
  { id: 6, type: 'message', read: true, title: 'Nouveau message de Prof. Coulibaly', message: 'Votre projet MERISE a été bien reçu. Quelques corrections mineures à apporter.', time: 'Hier à 16h30', icon: '💬', iconBg: 'bg-gray-100 text-gray-500' },
  { id: 7, type: 'assignment', read: true, title: 'Nouveau devoir publié', message: 'Prof. Koné a publié un nouveau devoir : Mini-projet — Site dynamique PHP. Date limite : 21 mai 2025.', time: 'Hier à 14h00', icon: '📝', iconBg: 'bg-gray-100 text-gray-500' },
  { id: 8, type: 'announcement', read: true, title: "Modification de l'emploi du temps", message: "Le cours d'Architecture des Ordinateurs du Mercredi 14 mai est déplacé en Salle B03.", time: 'Il y a 2 jours', icon: '📅', iconBg: 'bg-gray-100 text-gray-500' },
  { id: 9, type: 'grade', read: true, title: 'Résultats du contrôle publiés', message: 'Les résultats du Contrôle n1 de Base de Données sont disponibles. Moyenne : 13.4/20.', time: 'Il y a 3 jours', icon: '📊', iconBg: 'bg-gray-100 text-gray-500' },
  { id: 10, type: 'announcement', read: true, title: 'Réunion pédagogique', message: 'Une réunion pédagogique est organisée le Vendredi 16 mai à 12h00 en Salle C01.', time: 'Il y a 4 jours', icon: '🏫', iconBg: 'bg-gray-100 text-gray-500' },
]

const filters = ['Toutes', 'Notes', 'Devoirs', 'Annonces', 'Présences', 'Messages']
const filterMap = { 'Toutes': null, 'Notes': 'grade', 'Devoirs': 'assignment', 'Annonces': 'announcement', 'Présences': 'attendance', 'Messages': 'message' }

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

export default function Notifications() {
  const [activePage, setActivePage] = useState('Notifications')
  const [activeFilter, setActiveFilter] = useState('Toutes')
  const [notifs, setNotifs] = useState(notifications)
  const navigate = useNavigate()

  const filtered = activeFilter === 'Toutes' ? notifs : notifs.filter(n => n.type === filterMap[activeFilter])
  const unreadCount = notifs.filter(n => !n.read).length

  const markAllRead = () => setNotifs(notifs.map(n => ({ ...n, read: true })))
  const markRead = (id) => setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n))

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
          <div>
            <h1 className="text-lg md:text-xl font-bold text-[#0F172A]">Notifications</h1>
            <p className="text-xs md:text-sm text-gray-400">
              {unreadCount > 0 ? `${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}` : 'Tout est à jour'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs text-[#0F172A] border border-gray-200 hover:bg-gray-50 px-3 py-2 rounded-xl font-medium">
                Tout lire
              </button>
            )}
            <div className="w-9 h-9 rounded-full bg-[#0F172A] flex items-center justify-center text-white text-sm font-bold">E</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6 pb-24 md:pb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
            {[
              { label: 'Non lues', value: unreadCount, color: 'text-[#F43F5E]' },
              { label: 'Notes', value: notifs.filter(n => n.type === 'grade').length, color: 'text-blue-600' },
              { label: 'Devoirs', value: notifs.filter(n => n.type === 'assignment').length, color: 'text-orange-500' },
              { label: 'Annonces', value: notifs.filter(n => n.type === 'announcement').length, color: 'text-purple-600' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                <p className={`text-2xl md:text-3xl font-black ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
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
            {filtered.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                <span className="text-4xl">🎉</span>
                <p className="font-bold text-gray-700 mt-3">Aucune notification ici</p>
                <p className="text-sm text-gray-400 mt-1">Vous êtes à jour !</p>
              </div>
            )}
            {filtered.map((notif) => (
              <div key={notif.id} onClick={() => markRead(notif.id)}
                className={`bg-white rounded-2xl p-4 md:p-5 shadow-sm cursor-pointer hover:shadow-md transition border ${!notif.read ? 'border-l-4 border-l-[#F43F5E] border-gray-100' : 'border-gray-100'}`}>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${notif.iconBg}`}>
                    {notif.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-gray-800 text-sm truncate">{notif.title}</p>
                          {!notif.read && <span className="w-2 h-2 rounded-full bg-[#F43F5E] flex-shrink-0"></span>}
                        </div>
                        <p className="text-xs md:text-sm text-gray-500 mt-1 leading-relaxed">{notif.message}</p>
                      </div>
                      <p className="text-xs text-gray-400 flex-shrink-0">{notif.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav activePage={activePage} setActivePage={setActivePage} navigate={navigate} />
    </div>
  )
}