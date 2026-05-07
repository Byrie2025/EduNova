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

const quizQuestions = [
  {
    id: 1,
    subject: 'Mathématiques Avancées',
    question: 'Quelle est la dérivée de f(x) = x³ + 2x² - 5x + 3 ?',
    options: ['f\'(x) = 3x² + 4x - 5', 'f\'(x) = 3x² + 2x - 5', 'f\'(x) = x² + 4x - 5', 'f\'(x) = 3x³ + 4x - 5'],
    correct: 0,
    explanation: 'La dérivée de xⁿ est nxⁿ⁻¹. Donc (x³)\' = 3x², (2x²)\' = 4x, (-5x)\' = -5, (3)\' = 0.',
  },
  {
    id: 2,
    subject: 'Base de Données',
    question: 'Quelle commande SQL permet de récupérer tous les enregistrements d\'une table ?',
    options: ['GET * FROM table', 'SELECT * FROM table', 'FETCH ALL FROM table', 'READ * FROM table'],
    correct: 1,
    explanation: 'SELECT * FROM table est la syntaxe SQL standard pour récupérer tous les enregistrements.',
  },
  {
    id: 3,
    subject: 'Programmation Web',
    question: 'Quel langage est principalement utilisé pour styliser les pages web ?',
    options: ['HTML', 'JavaScript', 'CSS', 'PHP'],
    correct: 2,
    explanation: 'CSS (Cascading Style Sheets) est le langage utilisé pour styliser et mettre en forme les pages web.',
  },
  {
    id: 4,
    subject: 'Mathématiques Avancées',
    question: 'Quelle est la limite de f(x) = 1/x quand x tend vers +∞ ?',
    options: ['1', '+∞', '0', '-∞'],
    correct: 2,
    explanation: 'Quand x tend vers +∞, 1/x tend vers 0 car le dénominateur devient infiniment grand.',
  },
  {
    id: 5,
    subject: 'Base de Données',
    question: 'Que signifie SQL ?',
    options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Logic', 'System Query Language'],
    correct: 0,
    explanation: 'SQL signifie Structured Query Language — Langage de requête structuré.',
  },
]

const flashcards = [
  { front: 'Qu\'est-ce qu\'un espace vectoriel ?', back: 'Un ensemble muni de deux opérations (addition et multiplication scalaire) vérifiant 8 axiomes.', subject: 'Mathématiques' },
  { front: 'Qu\'est-ce qu\'une clé primaire en SQL ?', back: 'Un attribut ou ensemble d\'attributs qui identifie de manière unique chaque enregistrement d\'une table.', subject: 'Base de Données' },
  { front: 'Qu\'est-ce que le modèle OSI ?', back: 'Un modèle de référence en 7 couches décrivant comment les données sont transmises sur un réseau.', subject: 'Systèmes' },
  { front: 'Qu\'est-ce que le responsive design ?', back: 'Une approche de conception web qui permet aux pages de s\'adapter à toutes les tailles d\'écran.', subject: 'Programmation Web' },
  { front: 'Qu\'est-ce qu\'un algorithme de tri par fusion ?', back: 'Un algorithme de tri divisant le tableau en deux moitiés, les triant récursivement, puis les fusionnant.', subject: 'Mathématiques' },
]

export default function Practice() {
  const [activePage, setActivePage] = useState('Entraînement')
  const [activeMode, setActiveMode] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)
  const [cardFlipped, setCardFlipped] = useState(false)
  const navigate = useNavigate()

  const handleAnswerSelect = (index) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)
    setShowExplanation(true)
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizFinished(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setQuizFinished(false)
  }

  const getScoreMention = () => {
    const pct = (score / quizQuestions.length) * 20
    if (pct >= 16) return { label: 'Très Bien', color: 'text-green-600', emoji: '🏆' }
    if (pct >= 14) return { label: 'Bien', color: 'text-blue-600', emoji: '🎉' }
    if (pct >= 12) return { label: 'Assez Bien', color: 'text-yellow-600', emoji: '👍' }
    if (pct >= 10) return { label: 'Passable', color: 'text-orange-600', emoji: '📚' }
    return { label: 'Insuffisant', color: 'text-red-600', emoji: '💪' }
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
            {activeMode && (
              <button
                onClick={() => { setActiveMode(null); resetQuiz(); setCurrentCard(0); setCardFlipped(false) }}
                className="text-gray-400 hover:text-[#1A3C8F] transition mr-1"
              >
                ← Retour
              </button>
            )}
            <div>
              <h1 className="text-xl font-bold text-[#1A3C8F]">
                {!activeMode && 'Entraînement et Révisions'}
                {activeMode === 'quiz' && 'Quiz'}
                {activeMode === 'flashcards' && 'Fiches de Révision'}
                {activeMode === 'exam' && 'Épreuve Blanche'}
              </h1>
              <p className="text-sm text-gray-400">
                {!activeMode && 'Choisissez un mode d\'entraînement'}
                {activeMode === 'quiz' && `Question ${currentQuestion + 1} sur ${quizQuestions.length}`}
                {activeMode === 'flashcards' && `Fiche ${currentCard + 1} sur ${flashcards.length}`}
                {activeMode === 'exam' && 'Simulation d\'examen'}
              </p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#1A3C8F] flex items-center justify-center text-white text-sm font-bold">E</div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">

          {/* HOME — mode selection */}
          {!activeMode && (
            <div>
              {/* Feature cards */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  {
                    mode: 'quiz',
                    icon: '🧠',
                    title: 'Quiz',
                    desc: 'Testez vos connaissances avec des questions à choix multiples. Obtenez une note sur 20 à la fin.',
                    color: 'from-blue-500 to-blue-700',
                    stats: `${quizQuestions.length} questions disponibles`,
                    btn: 'Commencer le quiz',
                  },
                  {
                    mode: 'flashcards',
                    icon: '🃏',
                    title: 'Fiches de Révision',
                    desc: 'Révisez les notions clés avec des fiches interactives. Retournez la carte pour voir la réponse.',
                    color: 'from-purple-500 to-purple-700',
                    stats: `${flashcards.length} fiches disponibles`,
                    btn: 'Commencer les fiches',
                  },
                  {
                    mode: 'exam',
                    icon: '🏆',
                    title: 'Épreuve Blanche',
                    desc: 'Simulez une composition complète dans les conditions d\'examen avec un chronomètre.',
                    color: 'from-green-500 to-green-700',
                    stats: 'Conditions réelles',
                    btn: 'Commencer l\'épreuve',
                  },
                ].map((item) => (
                  <div key={item.mode} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                    <div className={`bg-gradient-to-br ${item.color} p-6 text-white`}>
                      <span className="text-4xl">{item.icon}</span>
                      <h3 className="text-xl font-black mt-3">{item.title}</h3>
                      <p className="text-white/80 text-sm mt-1">{item.stats}</p>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-gray-500 mb-4">{item.desc}</p>
                      <button
                        onClick={() => { setActiveMode(item.mode); resetQuiz() }}
                        className="w-full bg-[#1A3C8F] hover:bg-[#0f2460] text-white font-semibold py-2.5 rounded-xl transition text-sm"
                      >
                        {item.btn}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent activity */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-800 mb-4">Activité récente</h2>
                <div className="space-y-3">
                  {[
                    { icon: '🧠', label: 'Quiz — Mathématiques', result: '16/20', mention: 'Très Bien', color: 'text-green-600', date: 'Hier' },
                    { icon: '🃏', label: 'Fiches — Base de Données', result: '5/5 fiches', mention: 'Complété', color: 'text-blue-600', date: 'Il y a 2 jours' },
                    { icon: '🏆', label: 'Épreuve Blanche — Informatique', result: '13/20', mention: 'Assez Bien', color: 'text-yellow-600', date: 'Il y a 4 jours' },
                  ].map((a, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{a.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{a.label}</p>
                          <p className="text-xs text-gray-400">{a.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-black ${a.color}`}>{a.result}</p>
                        <p className="text-xs text-gray-400">{a.mention}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* QUIZ MODE */}
          {activeMode === 'quiz' && !quizFinished && (
            <div className="max-w-2xl mx-auto">
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Question {currentQuestion + 1} sur {quizQuestions.length}</span>
                  <span className="font-medium text-[#1A3C8F]">Score : {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-[#1A3C8F] h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + (selectedAnswer !== null ? 1 : 0)) / quizQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">
                    {quizQuestions[currentQuestion].subject}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-6 leading-relaxed">
                  {quizQuestions[currentQuestion].question}
                </h2>
                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, index) => {
                    let style = 'border-gray-200 bg-white hover:border-[#1A3C8F] hover:bg-blue-50'
                    if (selectedAnswer !== null) {
                      if (index === quizQuestions[currentQuestion].correct) {
                        style = 'border-green-400 bg-green-50'
                      } else if (index === selectedAnswer && selectedAnswer !== quizQuestions[currentQuestion].correct) {
                        style = 'border-red-400 bg-red-50'
                      } else {
                        style = 'border-gray-100 bg-gray-50 opacity-60'
                      }
                    } else if (selectedAnswer === index) {
                      style = 'border-[#1A3C8F] bg-blue-50'
                    }
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={selectedAnswer !== null}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${style}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-sm font-medium text-gray-700">{option}</span>
                          {selectedAnswer !== null && index === quizQuestions[currentQuestion].correct && (
                            <span className="ml-auto text-green-500">✓</span>
                          )}
                          {selectedAnswer === index && index !== quizQuestions[currentQuestion].correct && (
                            <span className="ml-auto text-red-500">✗</span>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Explanation */}
              {showExplanation && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-4">
                  <p className="text-xs font-semibold text-blue-600 mb-1">💡 Explication</p>
                  <p className="text-sm text-gray-700">{quizQuestions[currentQuestion].explanation}</p>
                </div>
              )}

              {selectedAnswer !== null && (
                <button
                  onClick={handleNextQuestion}
                  className="w-full bg-[#1A3C8F] hover:bg-[#0f2460] text-white font-semibold py-3 rounded-xl transition shadow-md"
                >
                  {currentQuestion < quizQuestions.length - 1 ? 'Question suivante →' : 'Voir mes résultats'}
                </button>
              )}
            </div>
          )}

          {/* QUIZ RESULTS */}
          {activeMode === 'quiz' && quizFinished && (
            <div className="max-w-lg mx-auto text-center">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <span className="text-6xl">{getScoreMention().emoji}</span>
                <h2 className="text-2xl font-black text-gray-800 mt-4">Quiz terminé !</h2>
                <div className="my-6 p-6 bg-gray-50 rounded-2xl">
                  <p className="text-6xl font-black text-[#1A3C8F]">
                    {((score / quizQuestions.length) * 20).toFixed(1)}
                    <span className="text-2xl text-gray-400">/20</span>
                  </p>
                  <p className={`text-lg font-bold mt-2 ${getScoreMention().color}`}>
                    {getScoreMention().label}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {score} bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''} sur {quizQuestions.length}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={resetQuiz}
                    className="flex-1 bg-[#1A3C8F] hover:bg-[#0f2460] text-white font-semibold py-3 rounded-xl transition"
                  >
                    Recommencer
                  </button>
                  <button
                    onClick={() => { setActiveMode(null); resetQuiz() }}
                    className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold py-3 rounded-xl transition"
                  >
                    Retour
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FLASHCARDS MODE */}
          {activeMode === 'flashcards' && (
            <div className="max-w-xl mx-auto">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Fiche {currentCard + 1} sur {flashcards.length}</span>
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                    {flashcards[currentCard].subject}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${((currentCard + 1) / flashcards.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Flashcard */}
              <div
                onClick={() => setCardFlipped(!cardFlipped)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-64 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition mb-4"
              >
                {!cardFlipped ? (
                  <div className="text-center">
                    <span className="text-4xl mb-4 block">❓</span>
                    <p className="text-lg font-bold text-gray-800">{flashcards[currentCard].front}</p>
                    <p className="text-sm text-gray-400 mt-4">Cliquez pour voir la réponse</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <span className="text-4xl mb-4 block">💡</span>
                    <p className="text-lg font-bold text-[#1A3C8F] mb-3">{flashcards[currentCard].front}</p>
                    <div className="w-12 h-0.5 bg-gray-200 mx-auto mb-3" />
                    <p className="text-gray-700 leading-relaxed">{flashcards[currentCard].back}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setCurrentCard(Math.max(0, currentCard - 1)); setCardFlipped(false) }}
                  disabled={currentCard === 0}
                  className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 font-semibold py-3 rounded-xl transition"
                >
                  ← Précédente
                </button>
                <button
                  onClick={() => { setCurrentCard(Math.min(flashcards.length - 1, currentCard + 1)); setCardFlipped(false) }}
                  disabled={currentCard === flashcards.length - 1}
                  className="flex-1 bg-[#1A3C8F] hover:bg-[#0f2460] disabled:opacity-40 text-white font-semibold py-3 rounded-xl transition"
                >
                  Suivante →
                </button>
              </div>
            </div>
          )}

          {/* MOCK EXAM MODE */}
          {activeMode === 'exam' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-[#1A3C8F] to-[#0f2460] rounded-2xl p-6 mb-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black">Épreuve Blanche — Informatique</h2>
                    <p className="text-white/70 text-sm mt-1">Licence 2 · Durée : 2h00 · Coefficient 4</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/50 text-xs">Temps restant</p>
                    <p className="text-3xl font-black">1:47:32</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
                <h3 className="font-bold text-gray-800 mb-4">Instructions générales</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📌 Tous les documents sont interdits sauf mention contraire.</p>
                  <p>📌 Répondez à toutes les questions dans l'ordre.</p>
                  <p>📌 La clarté et la rigueur de la rédaction seront prises en compte.</p>
                  <p>📌 Barème total : 20 points.</p>
                </div>
              </div>

              {[
                {
                  part: 'Partie A — Base de Données (8 points)',
                  questions: [
                    'Question 1 (2 pts) : Définissez la notion de clé étrangère et donnez un exemple.',
                    'Question 2 (3 pts) : Écrivez une requête SQL permettant d\'afficher les étudiants ayant une moyenne supérieure à 12.',
                    'Question 3 (3 pts) : Expliquez la différence entre une jointure interne (INNER JOIN) et une jointure externe (LEFT JOIN).',
                  ],
                },
                {
                  part: 'Partie B — Programmation Web (7 points)',
                  questions: [
                    'Question 4 (2 pts) : Qu\'est-ce que le DOM en JavaScript ? Comment y accéder ?',
                    'Question 5 (2 pts) : Expliquez la différence entre display:flex et display:grid en CSS.',
                    'Question 6 (3 pts) : Écrivez une fonction JavaScript qui valide un formulaire de connexion.',
                  ],
                },
                {
                  part: 'Partie C — Mathématiques (5 points)',
                  questions: [
                    'Question 7 (2 pts) : Calculez la dérivée de f(x) = 3x⁴ - 2x³ + x - 7.',
                    'Question 8 (3 pts) : Résolvez le système d\'équations : 2x + 3y = 7 et x - y = 1.',
                  ],
                },
              ].map((section, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
                  <h3 className="font-bold text-[#1A3C8F] mb-4">{section.part}</h3>
                  <div className="space-y-4">
                    {section.questions.map((q, j) => (
                      <div key={j}>
                        <p className="text-sm font-medium text-gray-700 mb-2">{q}</p>
                        <textarea
                          placeholder="Rédigez votre réponse ici..."
                          rows={3}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3C8F] transition resize-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button className="w-full bg-[#22C55E] hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition shadow-md mb-6">
                Remettre l'épreuve
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}