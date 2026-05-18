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

const subjects = [
  { code: 'INFO301', name: 'Architecture des Ordinateurs', color: 'bg-blue-500', icon: '🖥️',
    quiz: [
      { question: 'Qui a proposé le modèle Von Neumann ?', options: ['Alan Turing', 'John Von Neumann', 'Bill Gates', 'Steve Jobs'], correct: 1, explanation: 'John Von Neumann a proposé ce modèle en 1945, base de tous les ordinateurs modernes.' },
      { question: 'Combien de couches dans le modèle OSI ?', options: ['5', '6', '7', '8'], correct: 2, explanation: 'Le modèle OSI comporte 7 couches : physique, liaison, réseau, transport, session, présentation, application.' },
      { question: 'Quelle mémoire est la plus rapide ?', options: ['Disque dur', 'RAM', 'Cache', 'ROM'], correct: 2, explanation: 'La mémoire cache est intégrée dans le processeur, ce qui la rend la plus rapide.' },
      { question: 'Que signifie IP ?', options: ['Internet Protocol', 'Internal Process', 'Input Port', 'Internet Port'], correct: 0, explanation: 'IP signifie Internet Protocol, le protocole fondamental d\'adressage sur internet.' },
    ],
    flashcards: [
      { front: 'Qu\'est-ce que le modèle Von Neumann ?', back: 'Architecture avec 4 composants : unité centrale, mémoire, entrées et sorties. Proposée en 1945.' },
      { front: 'Différence RAM et ROM ?', back: 'RAM : volatile et modifiable. ROM : permanente et en lecture seule.' },
      { front: 'Qu\'est-ce qu\'une adresse IP ?', back: 'Identifiant numérique unique attribué à chaque appareil sur un réseau. Ex: 192.168.1.1' },
      { front: 'Modèle OSI — combien de couches ?', back: '7 couches : Physique, Liaison, Réseau, Transport, Session, Présentation, Application.' },
    ]},
  { code: 'INFO302', name: 'Mathématique du Signal', color: 'bg-red-500', icon: '📡',
    quiz: [
      { question: 'Que représente la transformée de Fourier ?', options: ['Une dérivée', 'Décomposition en fréquences', 'Une intégrale', 'Un vecteur'], correct: 1, explanation: 'La transformée de Fourier décompose un signal en somme de sinusoïdes de différentes fréquences.' },
      { question: 'Un signal numérique est ?', options: ['Continu', 'Discret', 'Analogique', 'Infini'], correct: 1, explanation: 'Un signal numérique est discret — il prend des valeurs définies à des instants précis.' },
      { question: 'Que signifie Hz ?', options: ['Hertz — unité de fréquence', 'Henry — inductance', 'Hecto — préfixe', 'Hybride — signal'], correct: 0, explanation: 'Hertz (Hz) est l\'unité de fréquence, représentant le nombre de cycles par seconde.' },
      { question: 'Le théorème de Shannon concerne ?', options: ['La compression', 'Le taux d\'échantillonnage', 'La modulation', 'L\'amplitude'], correct: 1, explanation: 'Shannon stipule que la fréquence d\'échantillonnage doit être au moins 2 fois la fréquence maximale.' },
    ],
    flashcards: [
      { front: 'Qu\'est-ce qu\'une fréquence ?', back: 'Nombre de cycles par seconde d\'un signal périodique, mesurée en Hertz (Hz).' },
      { front: 'Qu\'est-ce que la modulation ?', back: 'Technique de modification d\'une onde porteuse pour transporter de l\'information (AM, FM, etc.).' },
      { front: 'Signal analogique vs numérique ?', back: 'Analogique : continu, valeurs infinies. Numérique : discret, valeurs binaires 0 et 1.' },
      { front: 'Qu\'est-ce que l\'amplitude ?', back: 'Valeur maximale d\'un signal, représentant sa puissance ou son intensité.' },
    ]},
  { code: 'INFO303', name: 'Algorithmique', color: 'bg-purple-500', icon: '🧮',
    quiz: [
      { question: 'Complexité du tri rapide en moyenne ?', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], correct: 1, explanation: 'Le quicksort divise le tableau en deux parties à chaque étape, donnant O(n log n) en moyenne.' },
      { question: 'Une pile fonctionne selon quel principe ?', options: ['FIFO', 'LIFO', 'FILO', 'LILO'], correct: 1, explanation: 'LIFO : Last In First Out — le dernier élément inséré est le premier sorti.' },
      { question: 'BFS signifie ?', options: ['Breadth First Search', 'Binary Fast Search', 'Back First Search', 'Best First Search'], correct: 0, explanation: 'Breadth First Search — algorithme de parcours en largeur qui explore niveau par niveau.' },
      { question: 'Complexité du tri à bulles ?', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'], correct: 2, explanation: 'Le tri à bulles compare chaque paire adjacente, donnant O(n²) dans le pire cas.' },
    ],
    flashcards: [
      { front: 'Qu\'est-ce qu\'une pile (stack) ?', back: 'Structure de données LIFO. Opérations : push (ajout) et pop (retrait) au sommet.' },
      { front: 'Différence BFS vs DFS ?', back: 'BFS : parcours en largeur avec une file. DFS : parcours en profondeur avec une pile.' },
      { front: 'Qu\'est-ce que la récursivité ?', back: 'Technique où une fonction s\'appelle elle-même jusqu\'à une condition de base.' },
      { front: 'Complexité O(n log n) ?', back: 'Temps d\'exécution proportionnel à n × log(n). Typique des bons algorithmes de tri.' },
    ]},
  { code: 'INFO304', name: 'Langage Pascal et C', color: 'bg-green-500', icon: '💻',
    quiz: [
      { question: 'Opérateur déréférencement en C ?', options: ['&', '*', '->', '#'], correct: 1, explanation: 'L\'opérateur * devant un pointeur accède à la valeur à l\'adresse mémoire pointée.' },
      { question: 'Allocation mémoire dynamique ?', options: ['alloc()', 'malloc()', 'new()', 'create()'], correct: 1, explanation: 'malloc() alloue un bloc de mémoire de la taille spécifiée en octets.' },
      { question: 'Début d\'un programme Pascal ?', options: ['#include', 'program', 'begin', 'void'], correct: 1, explanation: 'Un programme Pascal commence par le mot-clé "program" suivi du nom.' },
      { question: 'Affichage texte en C ?', options: ['print()', 'printf()', 'cout', 'display()'], correct: 1, explanation: 'printf() est la fonction standard d\'affichage en C, définie dans <stdio.h>.' },
    ],
    flashcards: [
      { front: 'Qu\'est-ce qu\'un pointeur en C ?', back: 'Variable contenant l\'adresse mémoire d\'une autre variable. Déclaré avec *, adresse avec &.' },
      { front: 'Différence malloc() vs calloc() ?', back: 'malloc() alloue de la mémoire non initialisée. calloc() alloue et initialise à zéro.' },
      { front: 'Qu\'est-ce qu\'une structure en C ?', back: 'Type de données personnalisé regroupant plusieurs variables de types différents. Déclaré avec struct.' },
      { front: 'Libérer la mémoire en C ?', back: 'Avec la fonction free() appliquée à un pointeur alloué avec malloc() ou calloc().' },
    ]},
  { code: 'INFO305', name: 'Visual Basic', color: 'bg-yellow-500', icon: '🖱️',
    quiz: [
      { question: 'Déclaration variable en VB ?', options: ['var', 'Dim', 'let', 'int'], correct: 1, explanation: 'Dim (abréviation de Dimension) est le mot-clé de déclaration de variables en Visual Basic.' },
      { question: 'Créer un bouton en VB ?', options: ['Button.New()', 'Glisser depuis toolbox', 'CreateButton()', 'AddControl()'], correct: 1, explanation: 'En VB, on crée les contrôles en les glissant depuis la boîte à outils vers le formulaire.' },
      { question: 'Propriété texte d\'un Label ?', options: ['Value', 'Text', 'Caption', 'Content'], correct: 1, explanation: 'La propriété Text contient le texte affiché par un contrôle Label en Visual Basic.' },
      { question: 'MsgBox sert à ?', options: ['Créer un formulaire', 'Afficher une boîte de dialogue', 'Déclarer une variable', 'Ouvrir un fichier'], correct: 1, explanation: 'MsgBox affiche une boîte de dialogue modale avec un message et des boutons.' },
    ],
    flashcards: [
      { front: 'Qu\'est-ce qu\'un formulaire (Form) ?', back: 'Fenêtre graphique servant de conteneur pour les contrôles d\'une application.' },
      { front: 'Qu\'est-ce qu\'un événement en VB ?', back: 'Action déclenchée par l\'utilisateur (clic, chargement) qui exécute du code.' },
      { front: 'TextBox vs Label ?', back: 'TextBox : saisie et modification de texte. Label : texte statique non modifiable.' },
      { front: 'Propriété Enabled ?', back: 'Booléenne contrôlant si un contrôle peut interagir (True) ou est grisé (False).' },
    ]},
  { code: 'INFO306', name: "Système d'Exploitation", color: 'bg-gray-600', icon: '⚙️',
    quiz: [
      { question: 'Commande Linux pour les processus ?', options: ['ls', 'ps', 'cd', 'grep'], correct: 1, explanation: 'ps (Process Status) affiche les processus en cours.' },
      { question: 'Qu\'est-ce qu\'un deadlock ?', options: ['Un virus', 'Blocage mutuel de processus', 'Panne mémoire', 'Arrêt système'], correct: 1, explanation: 'Un deadlock est une situation où deux processus s\'attendent mutuellement indéfiniment.' },
      { question: 'UNIX créé par ?', options: ['Microsoft', 'Apple', 'Bell Labs', 'IBM'], correct: 2, explanation: 'UNIX a été développé aux Bell Labs par Ken Thompson et Dennis Ritchie.' },
      { question: 'Commande chmod ?', options: ['Change répertoire', 'Modifie permissions', 'Copie fichier', 'Affiche contenu'], correct: 1, explanation: 'chmod (change mode) modifie les permissions d\'accès aux fichiers sous Linux.' },
    ],
    flashcards: [
      { front: 'Processus vs thread ?', back: 'Processus : programme avec espace mémoire propre. Thread : sous-unité partageant la mémoire.' },
      { front: 'Pagination mémoire ?', back: 'Technique divisant la mémoire en pages fixes pour gérer la mémoire virtuelle.' },
      { front: 'Qu\'est-ce qu\'un ordonnanceur ?', back: 'Composant du SE décidant quel processus utilise le CPU selon un algorithme.' },
      { front: 'Kernel vs shell ?', back: 'Kernel : noyau gérant le matériel. Shell : interface CLI pour interagir avec le kernel.' },
    ]},
  { code: 'INFO307', name: 'Méthodologie MERISE', color: 'bg-teal-500', icon: '📐',
    quiz: [
      { question: 'Entité dans un MCD ?', options: ['Une relation', 'Un objet du monde réel', 'Une table', 'Un attribut'], correct: 1, explanation: 'Une entité MERISE représente un objet ou concept du monde réel.' },
      { question: 'Cardinalité (1,n) signifie ?', options: ['Au moins 1, au plus n', 'Exactement 1', 'Au moins n', 'Exactement n'], correct: 0, explanation: '(1,n) signifie minimum 1 et maximum n occurrences dans l\'association.' },
      { question: 'MLD est la transformation du ?', options: ['MPD', 'MCD', 'MCT', 'MOT'], correct: 1, explanation: 'Le MLD est obtenu par transformation des entités et associations du MCD.' },
      { question: 'Association (n,n) en MLD ?', options: ['Une colonne', 'Table intermédiaire', 'Une contrainte', 'Un index'], correct: 1, explanation: 'Une association many-to-many génère une table de jonction.' },
    ],
    flashcards: [
      { front: 'Qu\'est-ce qu\'un MCD ?', back: 'Modèle Conceptuel des Données — représentation des entités et associations, indépendante de toute technique.' },
      { front: 'Qu\'est-ce qu\'une cardinalité ?', back: 'Couple (min, max) indiquant le nombre de participations d\'une entité dans une association.' },
      { front: 'MCD vs MLD ?', back: 'MCD : vue conceptuelle avec entités. MLD : vue logique avec tables et clés.' },
      { front: 'Qu\'est-ce qu\'un MCT ?', back: 'Modèle Conceptuel des Traitements — représente les processus métier.' },
    ]},
  { code: 'INFO308', name: 'Base de Données', color: 'bg-indigo-500', icon: '🗄️',
    quiz: [
      { question: 'Clause filtrant les groupes SQL ?', options: ['WHERE', 'FILTER', 'HAVING', 'GROUP'], correct: 2, explanation: 'HAVING filtre après GROUP BY, contrairement à WHERE qui filtre avant.' },
      { question: 'Qu\'est-ce qu\'un trigger ?', options: ['Un type de requête', 'Procédure déclenchée automatiquement', 'Un index', 'Une vue'], correct: 1, explanation: 'Un trigger est déclenché automatiquement lors d\'opérations INSERT, UPDATE ou DELETE.' },
      { question: 'SGBD signifie ?', options: ['Système de Gestion de Base de Données', 'Système Global BD', 'Super Gestion BD', 'Système BD Distribuées'], correct: 0, explanation: 'SGBD = Système de Gestion de Base de Données. Ex: MySQL, PostgreSQL.' },
      { question: '3NF élimine quelle dépendance ?', options: ['Partielle', 'Transitive', 'Fonctionnelle', 'Totale'], correct: 1, explanation: 'La 3NF élimine les dépendances transitives.' },
    ],
    flashcards: [
      { front: 'Qu\'est-ce qu\'une clé primaire ?', back: 'Attribut identifiant de façon unique chaque enregistrement. Ne peut pas être NULL.' },
      { front: 'INNER JOIN vs LEFT JOIN ?', back: 'INNER : retourne les lignes avec correspondance dans les deux tables. LEFT : retourne toutes les lignes de gauche.' },
      { front: 'Qu\'est-ce qu\'une vue SQL ?', back: 'Table virtuelle définie par une requête SELECT sauvegardée.' },
      { front: 'Normalisation ?', back: 'Organisation des données pour réduire la redondance. Niveaux : 1NF, 2NF, 3NF.' },
    ]},
  { code: 'INFO309', name: 'Logiciels', color: 'bg-pink-500', icon: '📦',
    quiz: [
      { question: 'Génie logiciel ?', options: ['Programmation uniquement', 'Science de développement de logiciels', 'Test uniquement', 'Vente de logiciels'], correct: 1, explanation: 'Le génie logiciel couvre tout le cycle de vie : analyse, conception, développement, test, maintenance.' },
      { question: 'UML signifie ?', options: ['Universal Modeling Language', 'Unified Modeling Language', 'Unit Model Logic', 'User Model Layer'], correct: 1, explanation: 'UML (Unified Modeling Language) est un langage de modélisation graphique.' },
      { question: 'Diagramme de cas d\'utilisation ?', options: ['Structure BD', 'Interactions utilisateur-système', 'Code source', 'Les bugs'], correct: 1, explanation: 'Montre les fonctionnalités du système du point de vue des utilisateurs.' },
      { question: 'Test unitaire ?', options: ['Test interface', 'Test fonction isolée', 'Test système complet', 'Test performance'], correct: 1, explanation: 'Un test unitaire vérifie le comportement d\'une fonction de façon isolée.' },
    ],
    flashcards: [
      { front: 'Cycle de vie d\'un logiciel ?', back: 'Analyse → Conception → Développement → Tests → Déploiement → Maintenance.' },
      { front: 'Test unitaire vs intégration ?', back: 'Unitaire : vérifie une fonction isolément. Intégration : vérifie l\'interaction entre composants.' },
      { front: 'Diagramme de classes UML ?', back: 'Représentation des classes, attributs, méthodes et relations (héritage, association).' },
      { front: 'Méthode Agile ?', back: 'Approche itérative en sprints courts, avec livraisons fréquentes et collaboration client.' },
    ]},
  { code: 'INFO310', name: 'Négociation Informatique', color: 'bg-amber-500', icon: '🤝',
    quiz: [
      { question: 'Appel d\'offre (AO) ?', options: ['Une facture', 'Demande de propositions commerciales', 'Un contrat', 'Un devis'], correct: 1, explanation: 'Un AO invite des fournisseurs à soumettre des propositions commerciales.' },
      { question: 'BATNA signifie ?', options: ['Best Alternative To a Negotiated Agreement', 'Business Analysis Tool', 'Basic Agreement Terms', 'Budget Allocation'], correct: 0, explanation: 'BATNA est votre meilleure alternative si la négociation échoue.' },
      { question: 'SLA définit ?', options: ['Le prix', 'Niveaux de qualité de service', 'Technologies utilisées', 'Nombre employés'], correct: 1, explanation: 'Un SLA définit les engagements de qualité : disponibilité, temps de réponse, support.' },
      { question: 'ROI signifie ?', options: ['Return On Investment', 'Rate Of Interest', 'Risk Of Implementation', 'Revenue Integration'], correct: 0, explanation: 'ROI = (Bénéfice - Coût) / Coût × 100. Mesure la rentabilité d\'un investissement.' },
    ],
    flashcards: [
      { front: 'Cahier des charges ?', back: 'Document décrivant les besoins fonctionnels et techniques d\'un projet informatique.' },
      { front: 'Devis vs facture ?', back: 'Devis : estimation du coût avant prestation. Facture : document comptable après prestation.' },
      { front: 'TVA en informatique CI ?', back: 'Taxe sur la Valeur Ajoutée appliquée aux ventes de matériels et services informatiques (18% en CI).' },
      { front: 'Contrat de maintenance ?', back: 'Accord définissant les services d\'entretien, mises à jour et support pour un système.' },
    ]},
  { code: 'INFO311', name: 'Projet', color: 'bg-red-600', icon: '🚀',
    quiz: [
      { question: 'Sprint en Agile ?', options: ['Une réunion', 'Itération de développement courte', 'Un test', 'Un déploiement'], correct: 1, explanation: 'Un sprint est une période fixe (1-4 semaines) de travail pour réaliser des tâches.' },
      { question: 'Diagramme de Gantt ?', options: ['Le code source', 'Planification temporelle', 'Les tests', 'Le budget'], correct: 1, explanation: 'Visualise les tâches du projet sur une timeline avec durées et dépendances.' },
      { question: 'Product Backlog ?', options: ['Liste de bugs', 'Liste de fonctionnalités à développer', 'Un rapport', 'Un planning'], correct: 1, explanation: 'Liste priorisée de toutes les fonctionnalités et corrections à réaliser.' },
      { question: 'Chef de projet responsable de ?', options: ['Uniquement code', 'Délais, budget et qualité', 'Uniquement tests', 'Documentation'], correct: 1, explanation: 'Le chef de projet gère la triple contrainte : délais, budget et qualité.' },
    ],
    flashcards: [
      { front: 'Cahier des charges fonctionnel ?', back: 'Document décrivant les besoins et fonctionnalités du point de vue utilisateur.' },
      { front: 'Chef de projet vs développeur ?', back: 'Chef : planifie et coordonne. Développeur : conçoit et code les fonctionnalités.' },
      { front: 'Méthode Scrum ?', back: 'Cadre Agile avec rôles (Product Owner, Scrum Master), sprints et cérémonies.' },
      { front: 'Qu\'est-ce qu\'un livrable ?', back: 'Résultat concret produit à une étape : document, prototype, module logiciel.' },
    ]},
  { code: 'INFO312', name: 'Web', color: 'bg-cyan-500', icon: '🌐',
    quiz: [
      { question: 'Balise navigation HTML ?', options: ['<section>', '<div>', '<nav>', '<header>'], correct: 2, explanation: 'La balise <nav> est sémantique HTML5 pour les zones de navigation.' },
      { question: 'PHP signifie ?', options: ['Personal Home Page', 'PHP Hypertext Preprocessor', 'Private Hosting', 'Public HTML Page'], correct: 1, explanation: 'PHP Hypertext Preprocessor est un langage de script côté serveur.' },
      { question: 'Variable JavaScript moderne ?', options: ['var uniquement', 'let/const', 'dim', 'int'], correct: 1, explanation: 'let et const sont les mots-clés modernes ES6+.' },
      { question: 'Connexion MySQL depuis PHP ?', options: ['mysql_connect()', 'mysqli_connect()', 'db_connect()', 'sql_open()'], correct: 1, explanation: 'mysqli_connect() est l\'extension moderne pour se connecter à MySQL.' },
    ],
    flashcards: [
      { front: 'HTML vs CSS vs JavaScript ?', back: 'HTML : structure. CSS : mise en forme. JavaScript : interactivité.' },
      { front: 'Qu\'est-ce que le DOM ?', back: 'Document Object Model — représentation en arbre de la page HTML.' },
      { front: 'GET vs POST en PHP ?', back: 'GET : données dans l\'URL, limité. POST : dans le corps de la requête, illimité.' },
      { front: 'CRUD ?', back: 'Create, Read, Update, Delete — les 4 opérations de base sur les données.' },
    ]},
]

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

export default function Practice() {
  const [activePage, setActivePage] = useState('Entraînement')
  const [activeMode, setActiveMode] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)
  const [cardFlipped, setCardFlipped] = useState(false)
  const navigate = useNavigate()

  const handleAnswerSelect = (index) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)
    if (index === selectedSubject.quiz[currentQuestion].correct) setScore(score + 1)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < selectedSubject.quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setQuizFinished(true)
    }
  }

  const resetAll = () => {
    setActiveMode(null)
    setSelectedSubject(null)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setQuizFinished(false)
    setCurrentCard(0)
    setCardFlipped(false)
  }

  const startMode = (mode, subject) => {
    setActiveMode(mode)
    setSelectedSubject(subject)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setQuizFinished(false)
    setCurrentCard(0)
    setCardFlipped(false)
  }

  const getScoreMention = () => {
    const pct = (score / selectedSubject.quiz.length) * 20
    if (pct >= 16) return { label: 'Très Bien', color: 'text-green-600', emoji: '🏆' }
    if (pct >= 14) return { label: 'Bien', color: 'text-blue-600', emoji: '🎉' }
    if (pct >= 12) return { label: 'Assez Bien', color: 'text-yellow-600', emoji: '👍' }
    if (pct >= 10) return { label: 'Passable', color: 'text-orange-600', emoji: '📚' }
    return { label: 'Insuffisant', color: 'text-red-600', emoji: '💪' }
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
            {(activeMode || selectedSubject) && (
              <button onClick={resetAll} className="text-gray-400 hover:text-[#0F172A] transition mr-1">←</button>
            )}
            <div>
              <h1 className="text-lg md:text-xl font-bold text-[#0F172A]">
                {!activeMode && !selectedSubject && 'Entraînement'}
                {!activeMode && selectedSubject && `Choisir un mode`}
                {activeMode === 'quiz' && `Quiz — ${selectedSubject?.name}`}
                {activeMode === 'flashcards' && `Fiches — ${selectedSubject?.name}`}
                {activeMode === 'exam' && 'Épreuve Blanche'}
              </h1>
              <p className="text-xs md:text-sm text-gray-400">Licence 3 · GECOS Formation</p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#0F172A] flex items-center justify-center text-white text-sm font-bold">E</div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6 pb-24 md:pb-6">

          {/* HOME */}
          {!activeMode && !selectedSubject && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { mode: 'quiz', icon: '🧠', title: 'Quiz', desc: 'QCM par matière avec note sur 20', color: 'from-blue-500 to-blue-700', btn: 'Choisir une matière' },
                  { mode: 'flashcards', icon: '🃏', title: 'Fiches de Révision', desc: 'Fiches interactives par matière', color: 'from-purple-500 to-purple-700', btn: 'Choisir une matière' },
                  { mode: 'exam', icon: '🏆', title: 'Épreuve Blanche', desc: 'Simulation examen complet 3h', color: 'from-[#0F172A] to-[#1e293b]', btn: 'Commencer' },
                ].map((item) => (
                  <div key={item.mode} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className={`bg-gradient-to-br ${item.color} p-5 text-white`}>
                      <span className="text-3xl">{item.icon}</span>
                      <h3 className="text-lg font-black mt-2">{item.title}</h3>
                      <p className="text-white/80 text-sm mt-1">{item.desc}</p>
                    </div>
                    <div className="p-4">
                      <button
                        onClick={() => {
                          if (item.mode === 'exam') { setActiveMode('exam'); setSelectedSubject(subjects[0]) }
                          else setSelectedSubject({ pendingMode: item.mode })
                        }}
                        className="w-full bg-[#0F172A] text-white font-semibold py-2.5 rounded-xl text-sm"
                      >
                        {item.btn}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-800 mb-4">Activité récente</h2>
                <div className="space-y-3">
                  {[
                    { icon: '🧠', label: 'Quiz — Algorithmique', result: '15/20', mention: 'Bien', color: 'text-blue-600', date: 'Hier' },
                    { icon: '🃏', label: 'Fiches — Base de Données', result: '4/4', mention: 'Complété', color: 'text-green-600', date: 'Il y a 2 jours' },
                    { icon: '🏆', label: 'Épreuve Blanche', result: '13/20', mention: 'Assez Bien', color: 'text-yellow-600', date: 'Il y a 4 jours' },
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

          {/* SUBJECT SELECTION */}
          {selectedSubject && selectedSubject.pendingMode && (
            <div>
              <p className="text-sm text-gray-500 mb-4">
                {selectedSubject.pendingMode === 'quiz' ? 'Choisissez la matière pour le quiz' : 'Choisissez la matière pour les fiches'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {subjects.map((subject) => (
                  <button key={subject.code} onClick={() => startMode(selectedSubject.pendingMode, subject)}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-[#0F172A] hover:shadow-md transition text-left">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${subject.color} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>
                        {subject.icon}
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">{subject.code}</p>
                        <p className="font-bold text-gray-800 text-sm leading-tight">{subject.name}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {selectedSubject.pendingMode === 'quiz' ? `${subject.quiz.length} questions` : `${subject.flashcards.length} fiches`}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUIZ */}
          {activeMode === 'quiz' && !quizFinished && selectedSubject && (
            <div className="max-w-2xl mx-auto">
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Question {currentQuestion + 1}/{selectedSubject.quiz.length}</span>
                  <span className="font-medium text-[#0F172A]">Score : {score}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-[#0F172A] h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + (selectedAnswer !== null ? 1 : 0)) / selectedSubject.quiz.length) * 100}%` }} />
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-7 h-7 ${selectedSubject.color} rounded-lg flex items-center justify-center text-white text-sm`}>{selectedSubject.icon}</div>
                  <span className="text-sm font-medium text-gray-600">{selectedSubject.name}</span>
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-800 mb-5">{selectedSubject.quiz[currentQuestion].question}</h2>
                <div className="space-y-3">
                  {selectedSubject.quiz[currentQuestion].options.map((option, index) => {
                    let style = 'border-gray-200 bg-white'
                    if (selectedAnswer !== null) {
                      if (index === selectedSubject.quiz[currentQuestion].correct) style = 'border-green-400 bg-green-50'
                      else if (index === selectedAnswer) style = 'border-red-400 bg-red-50'
                      else style = 'border-gray-100 bg-gray-50 opacity-60'
                    }
                    return (
                      <button key={index} onClick={() => handleAnswerSelect(index)} disabled={selectedAnswer !== null}
                        className={`w-full text-left p-3 md:p-4 rounded-xl border-2 transition-all ${style}`}>
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-sm font-medium text-gray-700">{option}</span>
                          {selectedAnswer !== null && index === selectedSubject.quiz[currentQuestion].correct && <span className="ml-auto text-green-500">✓</span>}
                          {selectedAnswer === index && index !== selectedSubject.quiz[currentQuestion].correct && <span className="ml-auto text-red-500">✗</span>}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
              {selectedAnswer !== null && (
                <div>
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-4">
                    <p className="text-xs font-semibold text-blue-600 mb-1">Explication</p>
                    <p className="text-sm text-gray-700">{selectedSubject.quiz[currentQuestion].explanation}</p>
                  </div>
                  <button onClick={handleNextQuestion} className="w-full bg-[#0F172A] text-white font-semibold py-3 rounded-xl">
                    {currentQuestion < selectedSubject.quiz.length - 1 ? 'Question suivante →' : 'Voir mes résultats'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* QUIZ RESULTS */}
          {activeMode === 'quiz' && quizFinished && selectedSubject && (
            <div className="max-w-lg mx-auto text-center">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <span className="text-6xl">{getScoreMention().emoji}</span>
                <h2 className="text-2xl font-black text-gray-800 mt-4">Quiz terminé !</h2>
                <p className="text-gray-400 mt-1">{selectedSubject.name}</p>
                <div className="my-6 p-6 bg-gray-50 rounded-2xl">
                  <p className="text-5xl font-black text-[#0F172A]">
                    {((score / selectedSubject.quiz.length) * 20).toFixed(1)}<span className="text-xl text-gray-400">/20</span>
                  </p>
                  <p className={`text-lg font-bold mt-2 ${getScoreMention().color}`}>{getScoreMention().label}</p>
                  <p className="text-sm text-gray-400 mt-1">{score}/{selectedSubject.quiz.length} bonnes réponses</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => startMode('quiz', selectedSubject)} className="flex-1 bg-[#0F172A] text-white font-semibold py-3 rounded-xl">
                    Recommencer
                  </button>
                  <button onClick={resetAll} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl">
                    Retour
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FLASHCARDS */}
          {activeMode === 'flashcards' && selectedSubject && (
            <div className="max-w-xl mx-auto">
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Fiche {currentCard + 1}/{selectedSubject.flashcards.length}</span>
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">{selectedSubject.name}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${((currentCard + 1) / selectedSubject.flashcards.length) * 100}%` }} />
                </div>
              </div>
              <div onClick={() => setCardFlipped(!cardFlipped)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-56 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition mb-4">
                {!cardFlipped ? (
                  <div className="text-center">
                    <span className="text-4xl mb-4 block">❓</span>
                    <p className="text-base md:text-lg font-bold text-gray-800">{selectedSubject.flashcards[currentCard].front}</p>
                    <p className="text-sm text-gray-400 mt-4">Touchez pour voir la réponse</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <span className="text-4xl mb-4 block">💡</span>
                    <p className="text-sm font-bold text-[#0F172A] mb-3">{selectedSubject.flashcards[currentCard].front}</p>
                    <div className="w-12 h-0.5 bg-gray-200 mx-auto mb-3" />
                    <p className="text-gray-700 leading-relaxed text-sm">{selectedSubject.flashcards[currentCard].back}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setCurrentCard(Math.max(0, currentCard - 1)); setCardFlipped(false) }}
                  disabled={currentCard === 0}
                  className="flex-1 border border-gray-200 text-gray-600 disabled:opacity-40 font-semibold py-3 rounded-xl">
                  ← Précédente
                </button>
                <button onClick={() => { setCurrentCard(Math.min(selectedSubject.flashcards.length - 1, currentCard + 1)); setCardFlipped(false) }}
                  disabled={currentCard === selectedSubject.flashcards.length - 1}
                  className="flex-1 bg-[#0F172A] disabled:opacity-40 text-white font-semibold py-3 rounded-xl">
                  Suivante →
                </button>
              </div>
              {currentCard === selectedSubject.flashcards.length - 1 && (
                <button onClick={resetAll} className="w-full mt-3 bg-[#F43F5E] text-white font-semibold py-3 rounded-xl">
                  Choisir une autre matière
                </button>
              )}
            </div>
          )}

          {/* EXAM */}
          {activeMode === 'exam' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-[#0F172A] to-[#1e293b] rounded-2xl p-5 mb-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-black">Épreuve Blanche — Licence 3</h2>
                    <p className="text-white/70 text-sm mt-1">GECOS Formation · Durée : 3h00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/50 text-xs">Temps restant</p>
                    <p className="text-2xl font-black">2:47:15</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
                <h3 className="font-bold text-gray-800 mb-3">Instructions</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📌 Documents interdits sauf mention contraire.</p>
                  <p>📌 Répondez dans l'ordre.</p>
                  <p>📌 Barème : 20 points · Durée : 3 heures.</p>
                </div>
              </div>
              {[
                { part: 'Partie A — Algorithmique (6 pts)', questions: [
                  'Q1 (2 pts) : Définissez la complexité algorithmique. Comparez O(n) et O(n²).',
                  'Q2 (2 pts) : Écrivez en pseudo-code le tri par insertion.',
                  'Q3 (2 pts) : Tri rapide sur [5, 3, 8, 1, 9].',
                ]},
                { part: 'Partie B — Base de Données (7 pts)', questions: [
                  'Q4 (2 pts) : Expliquez les 3 formes normales avec exemple.',
                  'Q5 (3 pts) : SQL pour les étudiants au-dessus de la moyenne.',
                  'Q6 (2 pts) : Transaction SQL — propriétés ACID.',
                ]},
                { part: 'Partie C — MERISE (4 pts)', questions: [
                  'Q7 (2 pts) : MCD d\'une bibliothèque universitaire.',
                  'Q8 (2 pts) : Transformer le MCD en MLD.',
                ]},
                { part: 'Partie D — Architecture (3 pts)', questions: [
                  'Q9 (1 pt) : Rôle CPU, RAM et disque dur.',
                  'Q10 (2 pts) : Deadlock — définition et prévention.',
                ]},
              ].map((section, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
                  <h3 className="font-bold text-[#0F172A] mb-4 text-sm">{section.part}</h3>
                  <div className="space-y-4">
                    {section.questions.map((q, j) => (
                      <div key={j}>
                        <p className="text-sm font-medium text-gray-700 mb-2">{q}</p>
                        <textarea placeholder="Rédigez votre réponse ici..." rows={3}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A] resize-none" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button className="w-full bg-[#F43F5E] text-white font-semibold py-3 rounded-xl mb-6">
                Remettre l'épreuve
              </button>
            </div>
          )}
        </div>
      </div>

      <BottomNav activePage={activePage} setActivePage={setActivePage} navigate={navigate} />
    </div>
  )
}