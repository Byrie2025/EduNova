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

const contacts = [
  { id: 1, name: 'Prof. Traoré', role: 'Algorithmique · Base de Données', avatar: 'T', color: 'bg-purple-500', online: true, unread: 2,
    messages: [
      { id: 1, from: 'them', text: 'Bonjour, votre TP n2 a ete corrige. Vous avez obtenu 15/20.', time: '09:30', date: "Aujourd'hui" },
      { id: 2, from: 'me', text: 'Merci beaucoup Prof. Traore ! Est-ce que je peux voir les corrections ?', time: '09:45', date: "Aujourd'hui" },
      { id: 3, from: 'them', text: 'Bien sur, je les publierai sur la plateforme cet apres-midi. Continuez comme ca !', time: '10:00', date: "Aujourd'hui" },
      { id: 4, from: 'them', text: 'Noubliez pas le TP n3 a remettre demain avant 23h59.', time: '10:02', date: "Aujourd'hui" },
    ]},
  { id: 2, name: 'Prof. Bamba', role: 'Langage Pascal et C', avatar: 'B', color: 'bg-green-500', online: false, unread: 0,
    messages: [
      { id: 1, from: 'them', text: 'Excellent travail sur le projet de gestionnaire de fichiers ! 16/20.', time: 'Hier', date: 'Hier' },
      { id: 2, from: 'me', text: "Merci Prof. Bamba, j'ai beaucoup travaille sur la gestion des pointeurs.", time: 'Hier', date: 'Hier' },
      { id: 3, from: 'them', text: 'Ca se voit ! Pour le prochain projet, pensez a commenter votre code davantage.', time: 'Hier', date: 'Hier' },
    ]},
  { id: 3, name: 'Prof. Coulibaly', role: 'Methodologie MERISE', avatar: 'C', color: 'bg-teal-500', online: true, unread: 1,
    messages: [
      { id: 1, from: 'them', text: 'Votre projet MERISE a ete bien recu. Quelques corrections mineures a apporter.', time: '16:30', date: 'Hier' },
      { id: 2, from: 'me', text: 'Quelles sont les corrections a apporter Prof. Coulibaly ?', time: '17:00', date: 'Hier' },
      { id: 3, from: 'them', text: 'Les cardinalites de association Prescription sont incorrectes. Revoir le module 2.', time: '08:15', date: "Aujourd'hui" },
    ]},
  { id: 4, name: 'Prof. Kone', role: 'Visual Basic · Web', avatar: 'K', color: 'bg-cyan-500', online: false, unread: 0,
    messages: [
      { id: 1, from: 'me', text: "Bonjour Prof. Kone, j'ai une question sur le mini-projet PHP.", time: 'Lun', date: 'Lundi' },
      { id: 2, from: 'them', text: 'Bonjour ! Quelle est votre question ?', time: 'Lun', date: 'Lundi' },
      { id: 3, from: 'me', text: 'Est-ce que on doit utiliser PDO ou mysqli pour la connexion MySQL ?', time: 'Lun', date: 'Lundi' },
      { id: 4, from: 'them', text: 'Vous pouvez utiliser un ou autre, mais je recommande mysqli pour ce niveau.', time: 'Lun', date: 'Lundi' },
    ]},
  { id: 5, name: 'Prof. Kouassi', role: 'Architecture · Projet', avatar: 'K', color: 'bg-blue-500', online: true, unread: 0,
    messages: [
      { id: 1, from: 'them', text: 'Rappel : soutenance mi-parcours du projet vendredi a 14h00.', time: 'Mar', date: 'Mardi' },
      { id: 2, from: 'me', text: 'Bien recu Prof. Kouassi. Notre groupe sera pret.', time: 'Mar', date: 'Mardi' },
    ]},
  { id: 6, name: 'Groupe Projet Sprint 2', role: 'Amara · Kofi · Fatou · Jean', avatar: 'G', color: 'bg-red-500', online: false, unread: 3,
    messages: [
      { id: 1, from: 'them', text: "Kofi: J'ai termine le module de connexion, je push sur GitHub.", time: '11:00', date: "Aujourd'hui" },
      { id: 2, from: 'them', text: "Fatou: Super ! Je commence l'interface utilisateur cet apres-midi.", time: '11:30', date: "Aujourd'hui" },
      { id: 3, from: 'them', text: "Jean: N'oubliez pas le rapport d'avancement a remettre dans 3 jours.", time: '12:00', date: "Aujourd'hui" },
    ]},
]

export default function Messages() {
  const [activePage, setActivePage] = useState('Messagerie')
  const [selectedContact, setSelectedContact] = useState(contacts[0])
  const [newMessage, setNewMessage] = useState('')
  const [allContacts, setAllContacts] = useState(contacts)
  const navigate = useNavigate()

  const totalUnread = allContacts.reduce((sum, c) => sum + c.unread, 0)

  const handleSelectContact = (contact) => {
    setSelectedContact(contact)
    setAllContacts(allContacts.map(c =>
      c.id === contact.id ? { ...c, unread: 0 } : c
    ))
  }

  const handleSend = () => {
    if (!newMessage.trim()) return
    const updatedContacts = allContacts.map(c =>
      c.id === selectedContact.id
        ? { ...c, messages: [...c.messages, { id: c.messages.length + 1, from: 'me', text: newMessage, time: "A instant", date: "Aujourd'hui" }] }
        : c
    )
    setAllContacts(updatedContacts)
    setSelectedContact(updatedContacts.find(c => c.id === selectedContact.id))
    setNewMessage('')
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <div className="w-64 bg-[#0F172A] flex flex-col shadow-xl flex-shrink-0">
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
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F43F5E] flex items-center justify-center text-white text-xs font-bold">E</div>
            <div>
              <p className="text-white text-xs font-medium">Etudiant</p>
              <p className="text-white/50 text-xs">Licence 3 Dev. Application</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
          <div className="px-5 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-lg font-bold text-[#0F172A]">Messagerie</h1>
              {totalUnread > 0 && (
                <span className="bg-[#F43F5E] text-white text-xs font-bold px-2 py-1 rounded-full">{totalUnread}</span>
              )}
            </div>
            <div className="relative">
              <input type="text" placeholder="Rechercher..."
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A] transition pl-9"
              />
              <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {allContacts.map((contact) => (
              <button key={contact.id} onClick={() => handleSelectContact(contact)}
                className={`w-full flex items-center gap-3 px-5 py-4 border-b border-gray-50 hover:bg-gray-50 transition text-left ${
                  selectedContact?.id === contact.id ? 'bg-gray-50 border-l-4 border-l-[#0F172A]' : ''
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className={`w-11 h-11 ${contact.color} rounded-2xl flex items-center justify-center text-white font-black text-sm`}>
                    {contact.avatar}
                  </div>
                  {contact.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-800 text-sm truncate">{contact.name}</p>
                    <p className="text-xs text-gray-400 flex-shrink-0 ml-2">
                      {contact.messages[contact.messages.length - 1]?.time}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-xs text-gray-400 truncate">{contact.messages[contact.messages.length - 1]?.text}</p>
                    {contact.unread > 0 && (
                      <span className="ml-2 w-5 h-5 bg-[#F43F5E] rounded-full text-white text-xs flex items-center justify-center flex-shrink-0">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shadow-sm flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`w-10 h-10 ${selectedContact.color} rounded-2xl flex items-center justify-center text-white font-black text-sm`}>
                      {selectedContact.avatar}
                    </div>
                    {selectedContact.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{selectedContact.name}</p>
                    <p className="text-xs text-gray-400">{selectedContact.role} · {selectedContact.online ? 'En ligne' : 'Hors ligne'}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50">
                {selectedContact.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    {msg.from === 'them' && (
                      <div className={`w-8 h-8 ${selectedContact.color} rounded-xl flex items-center justify-center text-white font-black text-xs mr-2 flex-shrink-0 mt-1`}>
                        {selectedContact.avatar}
                      </div>
                    )}
                    <div className={`max-w-xs lg:max-w-md flex flex-col ${msg.from === 'me' ? 'items-end' : 'items-start'}`}>
                      <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.from === 'me'
                          ? 'bg-[#0F172A] text-white rounded-br-sm'
                          : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm shadow-sm'
                      }`}>
                        {msg.text}
                      </div>
                      <p className="text-xs text-gray-400 mt-1 px-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white border-t border-gray-100 px-6 py-4 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <input type="text" value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={`Message a ${selectedContact.name}...`}
                    className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A] transition"
                  />
                  <button onClick={handleSend} disabled={!newMessage.trim()}
                    className="w-11 h-11 bg-[#0F172A] hover:bg-[#1e293b] disabled:opacity-40 text-white rounded-2xl flex items-center justify-center transition flex-shrink-0 text-lg">
                    ➤
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">Appuyez sur Entree pour envoyer</p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <span className="text-6xl">💬</span>
                <p className="font-bold text-gray-700 mt-4">Selectionnez une conversation</p>
                <p className="text-sm text-gray-400 mt-1">Choisissez un contact pour commencer</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}