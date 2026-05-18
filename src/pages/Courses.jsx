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

const courses = [
  {
    id: 1, code: 'INFO301',
    name: 'Architecture des Ordinateurs et Téléinformatique',
    teacher: 'Prof. Kouassi', coefficient: 3, progress: 65,
    color: 'bg-blue-500', students: 42, nextClass: 'Lundi 12 mai — 08h00',
    lastGrade: 14,
    objective: "Ce cours vise à donner aux étudiants une compréhension approfondie de l'architecture matérielle des ordinateurs et des principes fondamentaux des réseaux informatiques.",
    expectations: ['Comprendre le modèle de Von Neumann', 'Maîtriser les composants matériels', 'Configurer un réseau TCP/IP', 'Comprendre les protocoles de communication'],
    resources: [
      { title: 'Cours — Architecture de Von Neumann', type: 'PDF', size: '3.2 MB' },
      { title: 'Cours — Réseaux et protocoles', type: 'PDF', size: '2.8 MB' },
      { title: 'TP — Configuration réseau', type: 'PDF', size: '1.1 MB' },
    ],
    assignments: [
      { title: 'TP n°2 — Schéma architecture', due: 'Lundi 12 mai', status: 'Non rendu' },
    ],
    syllabus: [
      { module: 1, title: "Introduction à l'architecture des ordinateurs", duration: '3 séances', completed: true, topics: ['Historique des ordinateurs', 'Modèle de Von Neumann', 'Composants principaux'] },
      { module: 2, title: 'Le processeur et la mémoire', duration: '4 séances', completed: true, topics: ['Architecture du CPU', 'Types de mémoire', 'Hiérarchie mémoire', 'Bus système'] },
      { module: 3, title: 'Réseaux informatiques', duration: '4 séances', completed: false, topics: ['Modèle OSI', 'Protocoles TCP/IP', 'Adressage IP', 'Configuration réseau'] },
      { module: 4, title: 'Téléinformatique et communications', duration: '3 séances', completed: false, topics: ['Transmission de données', 'Modulation', 'Fibres optiques', 'WiFi et Bluetooth'] },
    ],
    modules: [
      { module: 1, title: "Introduction à l'architecture des ordinateurs", duration: '3 séances', completed: true, topics: ['Historique des ordinateurs', 'Modèle de Von Neumann', 'Composants principaux'],
        quiz: [
          { question: 'Qui a proposé le modèle Von Neumann ?', options: ['Alan Turing', 'John Von Neumann', 'Bill Gates', 'Steve Jobs'], correct: 1 },
          { question: 'Combien de couches dans le modèle OSI ?', options: ['5', '6', '7', '8'], correct: 2 },
        ]},
      { module: 2, title: 'Le processeur et la mémoire', duration: '4 séances', completed: true, topics: ['Architecture du CPU', 'Types de mémoire', 'Hiérarchie mémoire', 'Bus système'],
        quiz: [
          { question: 'Que signifie CPU ?', options: ['Central Processing Unit', 'Computer Power Unit', 'Core Processing Unit', 'Central Power Unit'], correct: 0 },
          { question: 'Quelle mémoire est la plus rapide ?', options: ['Disque dur', 'RAM', 'Cache', 'ROM'], correct: 2 },
        ]},
      { module: 3, title: 'Réseaux informatiques', duration: '4 séances', completed: false, topics: ['Modèle OSI', 'Protocoles TCP/IP', 'Adressage IP', 'Configuration réseau'],
        quiz: [
          { question: 'Combien de couches dans le modèle OSI ?', options: ['5', '6', '7', '8'], correct: 2 },
          { question: 'Que signifie IP ?', options: ['Internet Protocol', 'Internal Process', 'Input Port', 'Internet Port'], correct: 0 },
        ]},
      { module: 4, title: 'Téléinformatique et communications', duration: '3 séances', completed: false, topics: ['Transmission de données', 'Modulation', 'Fibres optiques', 'WiFi et Bluetooth'],
        quiz: [
          { question: 'Quelle technologie utilise la lumière pour transmettre des données ?', options: ['WiFi', 'Bluetooth', 'Fibre optique', 'Ethernet'], correct: 2 },
          { question: 'Quelle est la fréquence du WiFi 5GHz ?', options: ['2.4 GHz', '5 GHz', '10 GHz', '1 GHz'], correct: 1 },
        ]},
    ],
  },
  {
    id: 2, code: 'INFO303',
    name: 'Algorithmique',
    teacher: 'Prof. Traoré', coefficient: 4, progress: 78,
    color: 'bg-purple-500', students: 42, nextClass: 'Mercredi 14 mai — 08h00',
    lastGrade: 15,
    objective: "Ce cours forme les étudiants à la conception et à l'analyse d'algorithmes efficaces.",
    expectations: ['Concevoir des algorithmes efficaces', 'Analyser la complexité temporelle et spatiale', 'Implémenter des structures de données avancées', 'Résoudre des problèmes de graphes'],
    resources: [
      { title: 'Cours — Complexité et récursivité', type: 'PDF', size: '2.1 MB' },
      { title: 'Cours — Arbres et graphes', type: 'PDF', size: '3.4 MB' },
    ],
    assignments: [
      { title: 'TP n°3 — Tri et recherche', due: 'Demain', status: 'Non rendu' },
    ],
    syllabus: [
      { module: 1, title: 'Introduction aux algorithmes', duration: '2 séances', completed: true, topics: ['Définition et propriétés', 'Pseudo-code', 'Flowcharts', 'Complexité O(n)'] },
      { module: 2, title: 'Structures de données', duration: '3 séances', completed: true, topics: ['Tableaux et listes', 'Piles et files', 'Arbres binaires', 'Tables de hachage'] },
      { module: 3, title: 'Algorithmes de tri', duration: '4 séances', completed: true, topics: ['Tri à bulles', 'Tri par insertion', 'Tri rapide', 'Tri fusion'] },
      { module: 4, title: 'Graphes et arbres', duration: '4 séances', completed: false, topics: ['Représentation des graphes', 'Parcours BFS et DFS', 'Arbres couvrants', 'Chemin le plus court'] },
    ],
    modules: [
      { module: 1, title: 'Introduction aux algorithmes', duration: '2 séances', completed: true, topics: ['Définition et propriétés', 'Pseudo-code', 'Flowcharts', 'Complexité O(n)'],
        quiz: [
          { question: "Qu'est-ce qu'un algorithme ?", options: ['Un langage de programmation', 'Une suite d\'instructions pour résoudre un problème', 'Un logiciel', 'Un ordinateur'], correct: 1 },
          { question: 'Que représente O(n) ?', options: ['Complexité constante', 'Complexité linéaire', 'Complexité quadratique', 'Complexité logarithmique'], correct: 1 },
        ]},
      { module: 2, title: 'Structures de données', duration: '3 séances', completed: true, topics: ['Tableaux et listes', 'Piles et files', 'Arbres binaires', 'Tables de hachage'],
        quiz: [
          { question: 'Une pile fonctionne selon quel principe ?', options: ['FIFO', 'LIFO', 'FILO', 'LILO'], correct: 1 },
          { question: "Qu'est-ce qu'une file ?", options: ['LIFO', 'FIFO', 'Aucun ordre', 'Aléatoire'], correct: 1 },
        ]},
      { module: 3, title: 'Algorithmes de tri', duration: '4 séances', completed: true, topics: ['Tri à bulles', 'Tri par insertion', 'Tri rapide', 'Tri fusion'],
        quiz: [
          { question: 'Quelle est la complexité du tri rapide en moyenne ?', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], correct: 1 },
          { question: 'Le tri à bulles a une complexité de ?', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'], correct: 2 },
        ]},
      { module: 4, title: 'Graphes et arbres', duration: '4 séances', completed: false, topics: ['Représentation des graphes', 'Parcours BFS et DFS', 'Arbres couvrants', 'Chemin le plus court'],
        quiz: [
          { question: 'BFS signifie ?', options: ['Breadth First Search', 'Binary Fast Search', 'Back First Search', 'Best First Search'], correct: 0 },
          { question: 'DFS utilise quelle structure ?', options: ['File', 'Tableau', 'Pile', 'Arbre'], correct: 2 },
        ]},
    ],
  },
  {
    id: 3, code: 'INFO308',
    name: 'Base de Données',
    teacher: 'Prof. Traoré', coefficient: 4, progress: 85,
    color: 'bg-indigo-500', students: 42, nextClass: 'Vendredi 16 mai — 10h00',
    lastGrade: 17,
    objective: "Ce cours couvre les fondements des systèmes de gestion de bases de données relationnelles.",
    expectations: ['Modéliser une base de données relationnelle', 'Écrire des requêtes SQL complexes', 'Normaliser une base de données', 'Créer des procédures stockées et triggers'],
    resources: [
      { title: 'Cours — SQL avancé', type: 'PDF', size: '2.8 MB' },
      { title: 'TP — Requêtes complexes', type: 'PDF', size: '1.3 MB' },
    ],
    assignments: [
      { title: 'TP n°3 — Procédures stockées', due: 'Vendredi 16 mai', status: 'Non rendu' },
    ],
    syllabus: [
      { module: 1, title: 'Introduction aux bases de données', duration: '2 séances', completed: true, topics: ['Concepts fondamentaux', 'Modèle relationnel', 'SGBD', 'Installation MySQL'] },
      { module: 2, title: 'Modélisation et normalisation', duration: '3 séances', completed: true, topics: ['Entités et relations', '1NF, 2NF, 3NF', 'Clés primaires et étrangères', 'Diagrammes E/R'] },
      { module: 3, title: 'SQL — Requêtes de base', duration: '3 séances', completed: true, topics: ['SELECT, WHERE, ORDER BY', 'INSERT, UPDATE, DELETE', 'JOIN (INNER, LEFT, RIGHT)', 'GROUP BY et HAVING'] },
      { module: 4, title: 'SQL avancé', duration: '4 séances', completed: false, topics: ['Sous-requêtes', 'Vues et index', 'Procédures stockées', 'Triggers'] },
    ],
    modules: [
      { module: 1, title: 'Introduction aux bases de données', duration: '2 séances', completed: true, topics: ['Concepts fondamentaux', 'Modèle relationnel', 'SGBD', 'Installation MySQL'],
        quiz: [
          { question: 'Que signifie SGBD ?', options: ['Système de Gestion de Base de Données', 'Système Global de Base de Données', 'Super Gestion BD', 'Système de Gestion de Bases Distribuées'], correct: 0 },
          { question: 'SQL signifie ?', options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Logic', 'System Query Language'], correct: 0 },
        ]},
      { module: 2, title: 'Modélisation et normalisation', duration: '3 séances', completed: true, topics: ['Entités et relations', '1NF, 2NF, 3NF', 'Clés primaires et étrangères', 'Diagrammes E/R'],
        quiz: [
          { question: "Qu'est-ce qu'une clé primaire ?", options: ['Un attribut qui peut être NULL', 'Un identifiant unique d\'un enregistrement', 'Une relation entre tables', 'Un index de table'], correct: 1 },
          { question: 'La 3NF élimine quelle dépendance ?', options: ['Partielle', 'Transitive', 'Fonctionnelle', 'Totale'], correct: 1 },
        ]},
      { module: 3, title: 'SQL — Requêtes de base', duration: '3 séances', completed: true, topics: ['SELECT, WHERE, ORDER BY', 'INSERT, UPDATE, DELETE', 'JOIN', 'GROUP BY et HAVING'],
        quiz: [
          { question: 'Quelle clause filtre les groupes en SQL ?', options: ['WHERE', 'FILTER', 'HAVING', 'GROUP'], correct: 2 },
          { question: 'Quelle commande supprime un enregistrement ?', options: ['REMOVE', 'DROP', 'DELETE', 'ERASE'], correct: 2 },
        ]},
      { module: 4, title: 'SQL avancé', duration: '4 séances', completed: false, topics: ['Sous-requêtes', 'Vues et index', 'Procédures stockées', 'Triggers'],
        quiz: [
          { question: "Qu'est-ce qu'un trigger ?", options: ['Un type de requête', 'Une procédure déclenchée automatiquement', 'Un index', 'Une vue'], correct: 1 },
          { question: 'Une vue en SQL est ?', options: ['Une table physique', 'Une requête sauvegardée comme table virtuelle', 'Un index', 'Un trigger'], correct: 1 },
        ]},
    ],
  },
  {
    id: 4, code: 'INFO307',
    name: 'Méthodologie MERISE',
    teacher: 'Prof. Coulibaly', coefficient: 3, progress: 88,
    color: 'bg-teal-500', students: 42, nextClass: 'Jeudi 15 mai — 08h00',
    lastGrade: 16,
    objective: "Ce cours introduit la méthode MERISE pour la conception de systèmes d'information.",
    expectations: ['Réaliser un MCD complet', 'Transformer un MCD en MLD', 'Modéliser les traitements avec le MCT', 'Produire un dossier de conception complet'],
    resources: [
      { title: 'Cours — MCD et MLD', type: 'PDF', size: '3.5 MB' },
    ],
    assignments: [
      { title: 'Projet MERISE — Système de pharmacie', due: 'Vendredi 23 mai', status: 'Rendu' },
    ],
    syllabus: [
      { module: 1, title: 'Introduction à MERISE', duration: '2 séances', completed: true, topics: ['Historique et contexte', 'Niveaux conceptuel, logique, physique', 'Dictionnaire de données', 'Règles de gestion'] },
      { module: 2, title: 'Modèle Conceptuel des Données (MCD)', duration: '4 séances', completed: true, topics: ['Entités et attributs', 'Associations', 'Cardinalités', 'Héritage'] },
      { module: 3, title: 'Modèle Logique des Données (MLD)', duration: '3 séances', completed: true, topics: ['Transformation MCD vers MLD', 'Tables et colonnes', 'Clés et contraintes', 'Normalisation'] },
      { module: 4, title: 'Modèles de traitement (MCT/MOT)', duration: '3 séances', completed: false, topics: ['Modèle Conceptuel des Traitements', 'Modèle Organisationnel', 'Événements et opérations', 'Synchronisation'] },
    ],
    modules: [
      { module: 1, title: 'Introduction à MERISE', duration: '2 séances', completed: true, topics: ['Historique et contexte', 'Niveaux conceptuel, logique, physique', 'Dictionnaire de données', 'Règles de gestion'],
        quiz: [
          { question: 'MERISE est une méthode de ?', options: ['Programmation', "Conception de systèmes d'information", 'Gestion de projet', 'Test logiciel'], correct: 1 },
          { question: 'Combien de niveaux dans MERISE ?', options: ['2', '3', '4', '5'], correct: 1 },
        ]},
      { module: 2, title: 'Modèle Conceptuel des Données (MCD)', duration: '4 séances', completed: true, topics: ['Entités et attributs', 'Associations', 'Cardinalités', 'Héritage'],
        quiz: [
          { question: 'Dans un MCD, une entité représente ?', options: ['Une relation', 'Un objet du monde réel', 'Une table', 'Un attribut'], correct: 1 },
          { question: 'Que signifie la cardinalité (1,n) ?', options: ['Au moins 1, au plus n', 'Exactement 1', 'Au moins n', 'Exactement n'], correct: 0 },
        ]},
      { module: 3, title: 'Modèle Logique des Données (MLD)', duration: '3 séances', completed: true, topics: ['Transformation MCD vers MLD', 'Tables et colonnes', 'Clés et contraintes', 'Normalisation'],
        quiz: [
          { question: 'Le MLD est la transformation du ?', options: ['MPD', 'MCD', 'MCT', 'MOT'], correct: 1 },
          { question: 'Une association (n,n) devient en MLD ?', options: ['Une colonne', 'Une table intermédiaire', 'Une contrainte', 'Un index'], correct: 1 },
        ]},
      { module: 4, title: 'Modèles de traitement (MCT/MOT)', duration: '3 séances', completed: false, topics: ['Modèle Conceptuel des Traitements', 'Modèle Organisationnel', 'Événements et opérations', 'Synchronisation'],
        quiz: [
          { question: 'Le MCT modélise quoi ?', options: ['Les données', 'Les traitements', 'Les interfaces', 'Les tests'], correct: 1 },
          { question: "Un événement dans le MCT est ?", options: ['Une table', "Un déclencheur d'opération", 'Un attribut', 'Une entité'], correct: 1 },
        ]},
    ],
  },
  {
    id: 5, code: 'INFO304',
    name: 'Langage Pascal et C',
    teacher: 'Prof. Bamba', coefficient: 4, progress: 82,
    color: 'bg-green-500', students: 42, nextClass: 'Vendredi 16 mai — 08h00',
    lastGrade: 16,
    objective: "Ce cours couvre deux langages de programmation fondamentaux : Pascal et C.",
    expectations: ['Programmer en Pascal et en C', 'Maîtriser les pointeurs et la gestion mémoire', 'Manipuler des fichiers binaires', 'Développer des applications structurées'],
    resources: [
      { title: 'Cours — Pointeurs et mémoire', type: 'PDF', size: '2.6 MB' },
      { title: 'TP — Programmation C avancée', type: 'PDF', size: '1.5 MB' },
    ],
    assignments: [
      { title: 'Projet — Gestionnaire de fichiers en C', due: 'Vendredi 16 mai', status: 'Non rendu' },
    ],
    syllabus: [
      { module: 1, title: 'Introduction au Pascal', duration: '3 séances', completed: true, topics: ["Structure d'un programme Pascal", 'Types de données', 'Instructions de base', 'Procédures et fonctions'] },
      { module: 2, title: 'Bases du langage C', duration: '3 séances', completed: true, topics: ["Structure d'un programme C", 'Types de données', 'Opérateurs', 'Entrées/sorties'] },
      { module: 3, title: 'Pointeurs et mémoire', duration: '4 séances', completed: true, topics: ['Déclaration de pointeurs', 'Déréférencement', 'Allocation dynamique', 'Gestion mémoire'] },
      { module: 4, title: 'Fichiers et structures', duration: '4 séances', completed: false, topics: ['Structures en C', 'Fichiers texte et binaires', 'Lecture et écriture', 'Gestion des erreurs'] },
    ],
    modules: [
      { module: 1, title: 'Introduction au Pascal', duration: '3 séances', completed: true, topics: ["Structure d'un programme Pascal", 'Types de données', 'Instructions de base', 'Procédures et fonctions'],
        quiz: [
          { question: 'Comment commence un programme Pascal ?', options: ['#include', 'program', 'begin', 'void'], correct: 1 },
          { question: 'Quel mot clé démarre le bloc principal en Pascal ?', options: ['start', 'main', 'begin', 'run'], correct: 2 },
        ]},
      { module: 2, title: 'Bases du langage C', duration: '3 séances', completed: true, topics: ["Structure d'un programme C", 'Types de données', 'Opérateurs', 'Entrées/sorties'],
        quiz: [
          { question: 'Quelle fonction affiche du texte en C ?', options: ['print()', 'printf()', 'cout', 'display()'], correct: 1 },
          { question: 'Comment inclure la bibliothèque standard en C ?', options: ['import stdio', '#include <stdio.h>', 'use stdio', 'load stdio'], correct: 1 },
        ]},
      { module: 3, title: 'Pointeurs et mémoire', duration: '4 séances', completed: true, topics: ['Déclaration de pointeurs', 'Déréférencement', 'Allocation dynamique', 'Gestion mémoire'],
        quiz: [
          { question: 'Quel opérateur déréférence un pointeur en C ?', options: ['&', '*', '->', '#'], correct: 1 },
          { question: 'Quelle fonction alloue de la mémoire dynamiquement ?', options: ['alloc()', 'malloc()', 'new()', 'create()'], correct: 1 },
        ]},
      { module: 4, title: 'Fichiers et structures', duration: '4 séances', completed: false, topics: ['Structures en C', 'Fichiers texte et binaires', 'Lecture et écriture', 'Gestion des erreurs'],
        quiz: [
          { question: 'Quel mot clé définit une structure en C ?', options: ['class', 'struct', 'type', 'object'], correct: 1 },
          { question: 'Quelle fonction ouvre un fichier en C ?', options: ['open()', 'fopen()', 'file()', 'read()'], correct: 1 },
        ]},
    ],
  },
  {
    id: 6, code: 'INFO312',
    name: 'Web',
    teacher: 'Prof. Koné', coefficient: 3, progress: 72,
    color: 'bg-cyan-500', students: 42, nextClass: 'Jeudi 22 mai — 10h00',
    lastGrade: 15,
    objective: "Ce cours forme les étudiants au développement web complet.",
    expectations: ['Créer des pages web avec HTML5 et CSS3', 'Programmer en JavaScript', 'Développer des applications PHP', 'Connecter un site web à une base de données MySQL'],
    resources: [
      { title: 'Cours — HTML5, CSS3, JavaScript', type: 'PDF', size: '3.8 MB' },
      { title: 'TP — Site web dynamique', type: 'PDF', size: '1.7 MB' },
    ],
    assignments: [
      { title: 'Mini-projet — Site dynamique PHP', due: 'Dans 5 jours', status: 'Non rendu' },
    ],
    syllabus: [
      { module: 1, title: 'HTML5 et CSS3', duration: '3 séances', completed: true, topics: ['Structure HTML5', 'Balises sémantiques', 'CSS3 et sélecteurs', 'Flexbox et Grid'] },
      { module: 2, title: 'JavaScript', duration: '4 séances', completed: true, topics: ['Variables et types', 'Fonctions et événements', 'DOM manipulation', 'Fetch API'] },
      { module: 3, title: 'PHP et formulaires', duration: '3 séances', completed: false, topics: ['Syntaxe PHP', 'Variables et tableaux', 'Formulaires GET/POST', 'Validation'] },
      { module: 4, title: 'PHP et MySQL', duration: '4 séances', completed: false, topics: ['Connexion à MySQL', 'Requêtes depuis PHP', 'CRUD complet', 'Sécurité SQL injection'] },
    ],
    modules: [
      { module: 1, title: 'HTML5 et CSS3', duration: '3 séances', completed: true, topics: ['Structure HTML5', 'Balises sémantiques', 'CSS3 et sélecteurs', 'Flexbox et Grid'],
        quiz: [
          { question: 'Quelle balise HTML définit la navigation ?', options: ['<section>', '<div>', '<nav>', '<header>'], correct: 2 },
          { question: 'Quelle propriété CSS centre du contenu avec Flexbox ?', options: ['center-content', 'justify-content: center', 'align: center', 'text-center'], correct: 1 },
        ]},
      { module: 2, title: 'JavaScript', duration: '4 séances', completed: true, topics: ['Variables et types', 'Fonctions et événements', 'DOM manipulation', 'Fetch API'],
        quiz: [
          { question: 'Comment déclarer une variable en JavaScript moderne ?', options: ['var', 'let/const', 'dim', 'int'], correct: 1 },
          { question: 'Quelle méthode sélectionne un élément par ID ?', options: ['querySelector', 'getElementById', 'getElement', 'selectId'], correct: 1 },
        ]},
      { module: 3, title: 'PHP et formulaires', duration: '3 séances', completed: false, topics: ['Syntaxe PHP', 'Variables et tableaux', 'Formulaires GET/POST', 'Validation'],
        quiz: [
          { question: 'PHP signifie ?', options: ['Personal Home Page', 'PHP Hypertext Preprocessor', 'Private Hosting Platform', 'Public HTML Page'], correct: 1 },
          { question: 'Comment afficher du texte en PHP ?', options: ['print()', 'echo', 'console.log()', 'printf()'], correct: 1 },
        ]},
      { module: 4, title: 'PHP et MySQL', duration: '4 séances', completed: false, topics: ['Connexion à MySQL', 'Requêtes depuis PHP', 'CRUD complet', 'Sécurité SQL injection'],
        quiz: [
          { question: 'Quelle fonction PHP se connecte à MySQL ?', options: ['mysql_connect()', 'mysqli_connect()', 'db_connect()', 'sql_open()'], correct: 1 },
          { question: "Qu'est-ce qu'une injection SQL ?", options: ['Un type de requête', 'Une attaque de sécurité', 'Un framework', 'Une bibliothèque'], correct: 1 },
        ]},
    ],
  },
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

function getMention(grade) {
  if (grade >= 16) return { label: 'Très Bien', color: 'bg-green-100 text-green-700' }
  if (grade >= 14) return { label: 'Bien', color: 'bg-blue-100 text-blue-700' }
  if (grade >= 12) return { label: 'Assez Bien', color: 'bg-yellow-100 text-yellow-700' }
  if (grade >= 10) return { label: 'Passable', color: 'bg-orange-100 text-orange-700' }
  return { label: 'Insuffisant', color: 'bg-red-100 text-red-700' }
}

function getStatusColor(status) {
  if (status === 'Non rendu') return 'bg-red-100 text-red-600'
  if (status === 'Rendu') return 'bg-green-100 text-green-600'
  return 'bg-gray-100 text-gray-500'
}

export default function Courses() {
  const [activePage, setActivePage] = useState('Mes Matières')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [activeTab, setActiveTab] = useState('Syllabus')
  const [quizModule, setQuizModule] = useState(null)
  const [quizQuestion, setQuizQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const navigate = useNavigate()
  const tabs = ['Syllabus', 'Modules', 'Ressources', 'Devoirs', 'Notes']

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)
    if (index === quizModule.quiz[quizQuestion].correct) setQuizScore(quizScore + 1)
  }

  const handleNextQuestion = () => {
    if (quizQuestion < quizModule.quiz.length - 1) {
      setQuizQuestion(quizQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setQuizDone(true)
    }
  }

  const resetQuiz = () => {
    setQuizModule(null)
    setQuizQuestion(0)
    setSelectedAnswer(null)
    setQuizScore(0)
    setQuizDone(false)
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

      {/* SIDEBAR desktop */}
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

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between shadow-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            {(selectedCourse || quizModule) && (
              <button onClick={() => { if (quizModule) resetQuiz(); else setSelectedCourse(null) }}
                className="text-gray-400 hover:text-[#0F172A] transition mr-1">
                ←
              </button>
            )}
            <div>
              <h1 className="text-lg md:text-xl font-bold text-[#0F172A]">
                {quizModule ? `Quiz — Module ${quizModule.module}` : selectedCourse ? selectedCourse.name : 'Mes Matières'}
              </h1>
              <p className="text-xs md:text-sm text-gray-400">
                {selectedCourse ? `${selectedCourse.teacher} · Coeff. ${selectedCourse.coefficient}` : "Licence 3 Développeur d'Application"}
              </p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#0F172A] flex items-center justify-center text-white text-sm font-bold">E</div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6 pb-24 md:pb-6">

          {/* QUIZ MODE */}
          {quizModule && (
            <div className="max-w-2xl mx-auto">
              {!quizDone ? (
                <div>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Question {quizQuestion + 1} sur {quizModule.quiz.length}</span>
                      <span className="font-medium text-[#0F172A]">Score : {quizScore}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-[#0F172A] h-2 rounded-full transition-all"
                        style={{ width: `${((quizQuestion + (selectedAnswer !== null ? 1 : 0)) / quizModule.quiz.length) * 100}%` }} />
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
                    <h2 className="text-lg font-bold text-gray-800 mb-6">{quizModule.quiz[quizQuestion].question}</h2>
                    <div className="space-y-3">
                      {quizModule.quiz[quizQuestion].options.map((option, index) => {
                        let style = 'border-gray-200 bg-white hover:border-[#0F172A]'
                        if (selectedAnswer !== null) {
                          if (index === quizModule.quiz[quizQuestion].correct) style = 'border-green-400 bg-green-50'
                          else if (index === selectedAnswer) style = 'border-red-400 bg-red-50'
                          else style = 'border-gray-100 bg-gray-50 opacity-60'
                        }
                        return (
                          <button key={index} onClick={() => handleAnswer(index)} disabled={selectedAnswer !== null}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${style}`}>
                            <div className="flex items-center gap-3">
                              <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                                {String.fromCharCode(65 + index)}
                              </span>
                              <span className="text-sm font-medium text-gray-700">{option}</span>
                              {selectedAnswer !== null && index === quizModule.quiz[quizQuestion].correct && <span className="ml-auto text-green-500">✓</span>}
                              {selectedAnswer === index && index !== quizModule.quiz[quizQuestion].correct && <span className="ml-auto text-red-500">✗</span>}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  {selectedAnswer !== null && (
                    <button onClick={handleNextQuestion} className="w-full bg-[#0F172A] text-white font-semibold py-3 rounded-xl">
                      {quizQuestion < quizModule.quiz.length - 1 ? 'Question suivante →' : 'Voir les résultats'}
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                  <span className="text-5xl">{quizScore === quizModule.quiz.length ? '🏆' : '👍'}</span>
                  <h2 className="text-2xl font-black text-gray-800 mt-4 mb-2">Quiz terminé !</h2>
                  <p className="text-4xl font-black text-[#0F172A] my-4">
                    {((quizScore / quizModule.quiz.length) * 20).toFixed(1)}/20
                  </p>
                  <button onClick={resetQuiz} className="bg-[#0F172A] text-white font-semibold px-8 py-3 rounded-xl">
                    Retour aux modules
                  </button>
                </div>
              )}
            </div>
          )}

          {/* COURSE LIST */}
          {!selectedCourse && !quizModule && (
            <div>
              <div className="grid grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Total</p>
                  <p className="text-2xl md:text-3xl font-black text-[#0F172A]">{courses.length}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Coefficients</p>
                  <p className="text-2xl md:text-3xl font-black text-[#F43F5E]">{courses.reduce((s, c) => s + c.coefficient, 0)}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Progression</p>
                  <p className="text-2xl md:text-3xl font-black text-purple-600">
                    {Math.round(courses.reduce((s, c) => s + c.progress, 0) / courses.length)}%
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {courses.map((course) => {
                  const mention = getMention(course.lastGrade)
                  const completedModules = course.modules.filter(m => m.completed).length
                  return (
                    <div key={course.id} onClick={() => { setSelectedCourse(course); setActiveTab('Syllabus') }}
                      className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 ${course.color} rounded-xl flex items-center justify-center text-white font-black text-xs flex-shrink-0`}>
                          {course.code.slice(-2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400">{course.code} · Coeff. {course.coefficient}</p>
                          <h3 className="font-bold text-gray-800 text-sm leading-tight truncate">{course.name}</h3>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mb-3">{course.teacher}</p>
                      <div className="mb-2">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Progression</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className="bg-[#0F172A] h-1.5 rounded-full" style={{ width: `${course.progress}%` }} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-400">{completedModules}/{course.modules.length} modules</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${mention.color}`}>{course.lastGrade}/20</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* COURSE DETAIL */}
          {selectedCourse && !quizModule && (
            <div>
              <div className="bg-gradient-to-r from-[#0F172A] to-[#1e293b] rounded-2xl p-4 md:p-6 mb-4 md:mb-6 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className={`w-12 h-12 md:w-14 md:h-14 ${selectedCourse.color} rounded-2xl flex items-center justify-center text-white font-black text-base md:text-lg`}>
                      {selectedCourse.code.slice(-2)}
                    </div>
                    <div>
                      <p className="text-white/60 text-xs">{selectedCourse.code} · Coeff. {selectedCourse.coefficient}</p>
                      <h2 className="text-base md:text-xl font-black leading-tight">{selectedCourse.name}</h2>
                      <p className="text-white/70 text-sm">{selectedCourse.teacher}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-white/70 mb-1">
                    <span>Progression</span>
                    <span>{selectedCourse.progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-[#F43F5E] h-2 rounded-full" style={{ width: `${selectedCourse.progress}%` }} />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mb-4 md:mb-6 overflow-x-auto pb-1">
                {tabs.map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex-shrink-0 ${
                      activeTab === tab ? 'bg-[#0F172A] text-white' : 'bg-white text-gray-500 border border-gray-100'
                    }`}
                  >{tab}</button>
                ))}
              </div>

              {activeTab === 'Syllabus' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-3">Objectif du cours</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{selectedCourse.objective}</p>
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">Compétences attendues</h3>
                    <div className="space-y-3">
                      {selectedCourse.expectations.map((exp, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
                          <p className="text-sm text-gray-700">{exp}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">Programme — {selectedCourse.syllabus.length} modules</h3>
                    <div className="space-y-3">
                      {selectedCourse.syllabus.map((mod) => (
                        <div key={mod.module} className={`flex items-center gap-3 p-3 rounded-xl border ${mod.completed ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-gray-50'}`}>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 ${mod.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                            {mod.completed ? '✓' : mod.module}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800 text-sm">Module {mod.module} — {mod.title}</p>
                            <p className="text-xs text-gray-400 mt-0.5 truncate">{mod.duration} · {mod.topics.join(', ')}</p>
                          </div>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${mod.completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                            {mod.completed ? 'Complété' : 'En cours'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Modules' && (
                <div className="space-y-4">
                  {selectedCourse.modules.map((module) => (
                    <div key={module.module} className={`bg-white rounded-2xl p-5 shadow-sm border ${module.completed ? 'border-green-200' : 'border-gray-100'}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 ${module.completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                            {module.completed ? '✓' : module.module}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800 text-sm">Module {module.module} — {module.title}</h4>
                            <p className="text-xs text-gray-400 mt-1">⏱ {module.duration}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${module.completed ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-600'}`}>
                          {module.completed ? 'Complété' : 'En cours'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                        {module.topics.map((topic, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0F172A] flex-shrink-0"></span>
                            {topic}
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span>🎯</span>
                          <div>
                            <p className="text-sm font-semibold text-gray-700">Quiz du module</p>
                            <p className="text-xs text-gray-400">{module.quiz.length} questions</p>
                          </div>
                        </div>
                        <button
                          onClick={() => { setQuizModule(module); setQuizQuestion(0); setSelectedAnswer(null); setQuizScore(0); setQuizDone(false) }}
                          className={`text-sm font-semibold px-4 py-2 rounded-xl transition ${module.completed ? 'bg-[#0F172A] text-white' : 'bg-[#F43F5E] text-white'}`}
                        >
                          {module.completed ? 'Réviser' : 'Commencer'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Ressources' && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4">Ressources du cours</h3>
                  <div className="space-y-3">
                    {selectedCourse.resources.map((r) => (
                      <div key={r.title} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{r.type === 'PDF' ? '📄' : '🎬'}</span>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{r.title}</p>
                            <p className="text-xs text-gray-400">{r.type} · {r.size}</p>
                          </div>
                        </div>
                        <button className="text-xs bg-[#0F172A] text-white px-3 py-2 rounded-lg">Télécharger</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Devoirs' && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4">Travaux à rendre</h3>
                  <div className="space-y-3">
                    {selectedCourse.assignments.map((a) => (
                      <div key={a.title} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{a.title}</p>
                          <p className="text-xs text-gray-400 mt-1">📅 {a.due}</p>
                        </div>
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(a.status)}`}>{a.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Notes' && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4">Ma note</h3>
                  <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-xl">
                    <p className="text-5xl font-black text-[#0F172A]">{selectedCourse.lastGrade}/20</p>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${getMention(selectedCourse.lastGrade).color}`}>
                      {getMention(selectedCourse.lastGrade).label}
                    </span>
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