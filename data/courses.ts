export interface Lesson {
  id: string
  title: string
  slug: string
  description: string
  videoPath: string
  duration: string
  durationSeconds: number
  points: number
  order: number
}

export interface Course {
  id: string
  title: string
  slug: string
  description: string
  longDescription: string
  thumbnail: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  color: string
  icon: string
  lessons: Lesson[]
  totalPoints: number
  prerequisites: string[]
  whatYouLearn: string[]
}

export const courses: Course[] = [
  {
    id: 'html-css-fundamentals',
    title: 'HTML & CSS Fundamentals',
    slug: 'html-css-fundamentals',
    description: 'Build the foundation of every website. Learn HTML structure and CSS styling from scratch — no experience needed.',
    longDescription: `HTML and CSS are the building blocks of the web. Every website you've ever visited was built with these two languages. In this course, you'll go from zero to building beautiful, structured web pages. We keep things practical — every lesson ends with something you can see and be proud of. Whether you want to become a developer, freelancer, or just understand how the web works, this is where your journey begins.`,
    thumbnail: '/thumbnails/html-css.svg',
    category: 'Web Fundamentals',
    difficulty: 'Beginner',
    color: '#f97316',
    icon: '🌐',
    prerequisites: [],
    whatYouLearn: [
      'Structure web pages with semantic HTML5',
      'Style elements with CSS properties and selectors',
      'Build responsive layouts with Flexbox and Grid',
      'Create beautiful forms and interactive UI elements',
      'Deploy your first website to the internet',
    ],
    lessons: [
      { id: 'html-1', title: 'What is HTML?', slug: 'what-is-html', description: 'Discover what HTML is and why it powers every website on the internet. We\'ll look at the structure of a web page and write our very first HTML document together.', videoPath: '/videos/html-css/lesson-1.mp4', duration: '8:24', durationSeconds: 504, points: 15, order: 1 },
      { id: 'html-2', title: 'HTML Tags & Elements', slug: 'html-tags-elements', description: 'Learn about opening and closing tags, nested elements, and the most important HTML tags you\'ll use every day as a developer.', videoPath: '/videos/html-css/lesson-2.mp4', duration: '11:05', durationSeconds: 665, points: 15, order: 2 },
      { id: 'html-3', title: 'Headings, Paragraphs & Text', slug: 'headings-paragraphs-text', description: 'Master text formatting in HTML. We cover h1-h6 headings, paragraphs, bold, italic, and how to create readable content hierarchy.', videoPath: '/videos/html-css/lesson-3.mp4', duration: '9:30', durationSeconds: 570, points: 10, order: 3 },
      { id: 'html-4', title: 'Links & Navigation', slug: 'links-navigation', description: 'Build connections between pages with anchor tags. Learn about relative vs absolute paths, opening links in new tabs, and creating nav menus.', videoPath: '/videos/html-css/lesson-4.mp4', duration: '10:15', durationSeconds: 615, points: 15, order: 4 },
      { id: 'html-5', title: 'Images & Media', slug: 'images-media', description: 'Add images, figures, and alt text to your pages. We\'ll also cover best practices for web performance and accessibility.', videoPath: '/videos/html-css/lesson-5.mp4', duration: '8:45', durationSeconds: 525, points: 10, order: 5 },
      { id: 'html-6', title: 'Lists & Tables', slug: 'lists-tables', description: 'Organize information beautifully with ordered and unordered lists. Create data tables with proper headers, rows, and columns.', videoPath: '/videos/html-css/lesson-6.mp4', duration: '12:00', durationSeconds: 720, points: 15, order: 6 },
      { id: 'html-7', title: 'Forms & User Input', slug: 'forms-user-input', description: 'Build interactive forms with text inputs, dropdowns, checkboxes, radio buttons, and submit buttons. Learn about labels and accessibility.', videoPath: '/videos/html-css/lesson-7.mp4', duration: '14:20', durationSeconds: 860, points: 20, order: 7 },
      { id: 'css-1', title: 'Introduction to CSS', slug: 'intro-to-css', description: 'Connect CSS to your HTML and start applying styles. Learn about selectors, properties, values, and the cascade that gives CSS its name.', videoPath: '/videos/html-css/lesson-8.mp4', duration: '10:50', durationSeconds: 650, points: 15, order: 8 },
      { id: 'css-2', title: 'Colors, Fonts & Text', slug: 'colors-fonts-text', description: 'Make your pages beautiful with color theory, Google Fonts, font sizing, line height, letter spacing, and text alignment.', videoPath: '/videos/html-css/lesson-9.mp4', duration: '13:10', durationSeconds: 790, points: 15, order: 9 },
      { id: 'css-3', title: 'The Box Model', slug: 'the-box-model', description: 'Understand how every element is a box with margin, border, padding, and content. This mental model unlocks CSS layout for you.', videoPath: '/videos/html-css/lesson-10.mp4', duration: '11:25', durationSeconds: 685, points: 20, order: 10 },
      { id: 'css-4', title: 'Flexbox Layout', slug: 'flexbox-layout', description: 'Flex your way to perfect layouts. Flexbox makes it easy to align, distribute, and reorder elements — we\'ll build a real nav bar and card grid.', videoPath: '/videos/html-css/lesson-11.mp4', duration: '16:40', durationSeconds: 1000, points: 25, order: 11 },
      { id: 'css-5', title: 'Responsive Design', slug: 'responsive-design', description: 'Make your site look great on phones, tablets, and desktops. Learn media queries, responsive units, and mobile-first design thinking.', videoPath: '/videos/html-css/lesson-12.mp4', duration: '15:00', durationSeconds: 900, points: 25, order: 12 },
    ],
    totalPoints: 200,
  },
  {
    id: 'javascript-beginners',
    title: 'JavaScript for Beginners',
    slug: 'javascript-beginners',
    description: 'Make your websites interactive. JavaScript is the language of the web — and one of the most in-demand skills on the planet.',
    longDescription: `JavaScript transforms static HTML pages into living, breathing experiences. It's what makes buttons do things, forms validate, and pages feel like apps. In this course, we start from absolute zero and build up to writing real programs that solve real problems. You'll finish this course having built a to-do app, a quiz game, and several interactive projects that you can show off to anyone.`,
    thumbnail: '/thumbnails/javascript.svg',
    category: 'JavaScript',
    difficulty: 'Beginner',
    color: '#eab308',
    icon: '⚡',
    prerequisites: ['html-css-fundamentals'],
    whatYouLearn: [
      'Variables, data types, and operators',
      'Functions, loops, and control flow',
      'DOM manipulation and event handling',
      'Arrays, objects, and modern ES6+ syntax',
      'Fetch API and working with JSON data',
      'Build 3 real projects from scratch',
    ],
    lessons: [
      { id: 'js-1', title: 'What is JavaScript?', slug: 'what-is-javascript', description: 'Understand what JavaScript is, where it runs, and why it\'s the most popular programming language in the world. We\'ll write our first script today.', videoPath: '/videos/javascript/lesson-1.mp4', duration: '9:15', durationSeconds: 555, points: 15, order: 1 },
      { id: 'js-2', title: 'Variables & Data Types', slug: 'variables-data-types', description: 'Store information in variables using let, const, and var. Learn about strings, numbers, booleans, null, and undefined.', videoPath: '/videos/javascript/lesson-2.mp4', duration: '12:30', durationSeconds: 750, points: 15, order: 2 },
      { id: 'js-3', title: 'Operators & Expressions', slug: 'operators-expressions', description: 'Do math, compare values, and combine conditions with arithmetic, comparison, and logical operators.', videoPath: '/videos/javascript/lesson-3.mp4', duration: '10:45', durationSeconds: 645, points: 15, order: 3 },
      { id: 'js-4', title: 'Conditionals & If/Else', slug: 'conditionals-if-else', description: 'Make decisions in your code with if, else if, else, and switch statements. Write programs that respond differently to different situations.', videoPath: '/videos/javascript/lesson-4.mp4', duration: '11:20', durationSeconds: 680, points: 15, order: 4 },
      { id: 'js-5', title: 'Functions', slug: 'functions', description: 'Package reusable logic into functions. Learn parameters, return values, scope, and the difference between function declarations and arrow functions.', videoPath: '/videos/javascript/lesson-5.mp4', duration: '15:10', durationSeconds: 910, points: 20, order: 5 },
      { id: 'js-6', title: 'Loops & Iteration', slug: 'loops-iteration', description: 'Repeat actions with for, while, and for...of loops. We\'ll loop through arrays, generate lists, and build a number guessing game.', videoPath: '/videos/javascript/lesson-6.mp4', duration: '13:45', durationSeconds: 825, points: 20, order: 6 },
      { id: 'js-7', title: 'Arrays', slug: 'arrays', description: 'Work with ordered lists of data. Learn push, pop, map, filter, reduce, and other array methods that professional developers use every day.', videoPath: '/videos/javascript/lesson-7.mp4', duration: '16:00', durationSeconds: 960, points: 20, order: 7 },
      { id: 'js-8', title: 'Objects', slug: 'objects', description: 'Group related data and functions together in objects. Learn property access, methods, and how objects model real-world concepts.', videoPath: '/videos/javascript/lesson-8.mp4', duration: '14:30', durationSeconds: 870, points: 20, order: 8 },
      { id: 'js-9', title: 'DOM Manipulation', slug: 'dom-manipulation', description: 'Control the page with JavaScript! Select elements, change text and styles, add/remove classes, and create new elements dynamically.', videoPath: '/videos/javascript/lesson-9.mp4', duration: '18:20', durationSeconds: 1100, points: 25, order: 9 },
      { id: 'js-10', title: 'Events & Interactivity', slug: 'events-interactivity', description: 'Respond to user actions with event listeners. Clicks, key presses, form submissions — make your page react to everything the user does.', videoPath: '/videos/javascript/lesson-10.mp4', duration: '17:00', durationSeconds: 1020, points: 25, order: 10 },
      { id: 'js-11', title: 'Fetch API & JSON', slug: 'fetch-api-json', description: 'Load data from the internet into your page. Make API calls with fetch, handle promises, and display real data in your projects.', videoPath: '/videos/javascript/lesson-11.mp4', duration: '19:15', durationSeconds: 1155, points: 25, order: 11 },
      { id: 'js-12', title: 'ES6+ Modern JavaScript', slug: 'es6-modern-javascript', description: 'Level up with modern syntax: destructuring, spread/rest, template literals, optional chaining, and nullish coalescing.', videoPath: '/videos/javascript/lesson-12.mp4', duration: '14:50', durationSeconds: 890, points: 20, order: 12 },
      { id: 'js-13', title: 'Error Handling', slug: 'error-handling', description: 'Write resilient code with try/catch blocks. Learn to handle errors gracefully and debug your programs like a professional.', videoPath: '/videos/javascript/lesson-13.mp4', duration: '11:30', durationSeconds: 690, points: 15, order: 13 },
      { id: 'js-14', title: 'Project: Build a Quiz App', slug: 'project-quiz-app', description: 'Put everything together! Build a full quiz game with questions, a timer, score tracking, and a results screen. Your most impressive project yet.', videoPath: '/videos/javascript/lesson-14.mp4', duration: '25:00', durationSeconds: 1500, points: 25, order: 14 },
      { id: 'js-15', title: 'Project: To-Do List App', slug: 'project-todo-app', description: 'Build a polished to-do app with add, complete, delete, and filter functionality. Save data with localStorage so tasks persist across page refreshes.', videoPath: '/videos/javascript/lesson-15.mp4', duration: '22:30', durationSeconds: 1350, points: 25, order: 15 },
    ],
    totalPoints: 320,
  },
  {
    id: 'python-programming',
    title: 'Python Programming',
    slug: 'python-programming',
    description: 'Python is beginner-friendly, insanely powerful, and used everywhere — from web apps to AI to data science. Let\'s dive in.',
    longDescription: `Python reads almost like English, which makes it the perfect first programming language — and it never stops being useful. Data scientists, AI researchers, web developers, and automation engineers all use Python daily. In this course, we start from scratch and build your Python skills systematically. You'll write scripts that do useful things, and by the end, you'll have the foundation to go anywhere in tech.`,
    thumbnail: '/thumbnails/python.svg',
    category: 'Python',
    difficulty: 'Beginner',
    color: '#3b82f6',
    icon: '🐍',
    prerequisites: [],
    whatYouLearn: [
      'Python syntax, variables, and data types',
      'Functions, modules, and packages',
      'Lists, dictionaries, tuples, and sets',
      'File I/O and working with data',
      'Object-oriented programming basics',
      'Build real scripts that solve real problems',
    ],
    lessons: [
      { id: 'py-1', title: 'Getting Started with Python', slug: 'getting-started-python', description: 'Install Python, set up your editor, and run your first Python script. We\'ll explain why Python is so beloved and what you can build with it.', videoPath: '/videos/python/lesson-1.mp4', duration: '10:20', durationSeconds: 620, points: 15, order: 1 },
      { id: 'py-2', title: 'Variables & Data Types', slug: 'variables-data-types-python', description: 'Store information in variables. Learn Python\'s built-in types: integers, floats, strings, booleans, and how to convert between them.', videoPath: '/videos/python/lesson-2.mp4', duration: '12:15', durationSeconds: 735, points: 15, order: 2 },
      { id: 'py-3', title: 'Strings & String Methods', slug: 'strings-string-methods', description: 'Work with text in Python. Slicing, formatting with f-strings, upper/lower/strip, split, join — strings are everywhere in Python programs.', videoPath: '/videos/python/lesson-3.mp4', duration: '13:40', durationSeconds: 820, points: 15, order: 3 },
      { id: 'py-4', title: 'Numbers & Math', slug: 'numbers-math', description: 'Do arithmetic, use the math module, understand integer division and modulo. Build a tip calculator as a hands-on project.', videoPath: '/videos/python/lesson-4.mp4', duration: '9:55', durationSeconds: 595, points: 10, order: 4 },
      { id: 'py-5', title: 'Control Flow: If/Elif/Else', slug: 'control-flow', description: 'Make your programs make decisions. Write conditions, compare values, and combine them with and/or/not.', videoPath: '/videos/python/lesson-5.mp4', duration: '11:10', durationSeconds: 670, points: 15, order: 5 },
      { id: 'py-6', title: 'Lists', slug: 'lists-python', description: 'Store collections of items in lists. Learn indexing, slicing, appending, sorting, and list comprehensions — Python\'s secret weapon.', videoPath: '/videos/python/lesson-6.mp4', duration: '15:25', durationSeconds: 925, points: 20, order: 6 },
      { id: 'py-7', title: 'Loops: For & While', slug: 'loops-python', description: 'Iterate through data with for loops and repeat actions with while loops. Learn break, continue, and range().', videoPath: '/videos/python/lesson-7.mp4', duration: '13:00', durationSeconds: 780, points: 15, order: 7 },
      { id: 'py-8', title: 'Functions', slug: 'functions-python', description: 'Write reusable functions with parameters, default values, and return statements. Learn about scope and why functions make code so much better.', videoPath: '/videos/python/lesson-8.mp4', duration: '14:35', durationSeconds: 875, points: 20, order: 8 },
      { id: 'py-9', title: 'Dictionaries & Sets', slug: 'dictionaries-sets', description: 'Store key-value pairs in dictionaries and unique items in sets. These data structures unlock powerful ways to organize and look up data.', videoPath: '/videos/python/lesson-9.mp4', duration: '12:50', durationSeconds: 770, points: 15, order: 9 },
      { id: 'py-10', title: 'File Handling', slug: 'file-handling', description: 'Read from and write to files. Open text files, process CSV data, and save your program\'s output — skills used in nearly every real Python project.', videoPath: '/videos/python/lesson-10.mp4', duration: '11:40', durationSeconds: 700, points: 20, order: 10 },
      { id: 'py-11', title: 'Modules & Packages', slug: 'modules-packages', description: 'Organize your code into modules and use Python\'s vast standard library. Install third-party packages with pip.', videoPath: '/videos/python/lesson-11.mp4', duration: '10:30', durationSeconds: 630, points: 15, order: 11 },
      { id: 'py-12', title: 'Intro to OOP', slug: 'intro-oop', description: 'Understand classes, objects, attributes, and methods. Model real-world concepts in code using object-oriented programming.', videoPath: '/videos/python/lesson-12.mp4', duration: '17:20', durationSeconds: 1040, points: 25, order: 12 },
      { id: 'py-13', title: 'Error Handling & Exceptions', slug: 'error-handling-python', description: 'Make your programs resilient with try/except blocks. Handle specific errors gracefully and write code that doesn\'t crash unexpectedly.', videoPath: '/videos/python/lesson-13.mp4', duration: '10:00', durationSeconds: 600, points: 15, order: 13 },
      { id: 'py-14', title: 'Project: Build a Password Manager', slug: 'project-password-manager', description: 'Apply everything you\'ve learned to build a real password manager that generates secure passwords and stores them in a local file.', videoPath: '/videos/python/lesson-14.mp4', duration: '24:00', durationSeconds: 1440, points: 25, order: 14 },
    ],
    totalPoints: 240,
  },
  {
    id: 'react-essentials',
    title: 'React.js Essentials',
    slug: 'react-essentials',
    description: 'Build modern, fast user interfaces with the most popular JavaScript framework. Used at Meta, Netflix, Airbnb, and thousands of startups.',
    longDescription: `React changed how developers build web applications. Instead of wrestling with the DOM, you describe what your UI should look like and React handles the rest. In this course, you'll learn everything you need to build production-quality React apps — from your first component to managing complex state, working with APIs, and deploying your app to the world.`,
    thumbnail: '/thumbnails/react.svg',
    category: 'JavaScript',
    difficulty: 'Intermediate',
    color: '#06b6d4',
    icon: '⚛️',
    prerequisites: ['javascript-beginners'],
    whatYouLearn: [
      'React components, props, and state',
      'Hooks: useState, useEffect, useContext, useMemo',
      'React Router for multi-page apps',
      'Fetch data from APIs and handle loading/error states',
      'Forms, controlled components, and validation',
      'Deploy a real React app to Vercel',
    ],
    lessons: [
      { id: 'react-1', title: 'Why React? The Component Model', slug: 'why-react-components', description: 'Understand the problems React solves and how it thinks about UIs. Set up a React project with Vite and write your first component.', videoPath: '/videos/react/lesson-1.mp4', duration: '12:00', durationSeconds: 720, points: 15, order: 1 },
      { id: 'react-2', title: 'JSX Deep Dive', slug: 'jsx-deep-dive', description: 'JSX is React\'s superpower. Learn its syntax, how it compiles to JavaScript, expressions inside JSX, and the rules you need to follow.', videoPath: '/videos/react/lesson-2.mp4', duration: '10:30', durationSeconds: 630, points: 15, order: 2 },
      { id: 'react-3', title: 'Props & Data Flow', slug: 'props-data-flow', description: 'Pass data from parent to child components with props. Learn about prop types, default props, and how data flows in one direction in React.', videoPath: '/videos/react/lesson-3.mp4', duration: '13:15', durationSeconds: 795, points: 20, order: 3 },
      { id: 'react-4', title: 'State with useState', slug: 'state-usestate', description: 'Make your components dynamic with state. Add interactivity, handle user input, and understand why state triggers re-renders.', videoPath: '/videos/react/lesson-4.mp4', duration: '15:45', durationSeconds: 945, points: 20, order: 4 },
      { id: 'react-5', title: 'Rendering Lists & Conditional UI', slug: 'rendering-lists-conditional', description: 'Render arrays of data with map() and show/hide elements based on conditions. Learn about keys and why React needs them.', videoPath: '/videos/react/lesson-5.mp4', duration: '11:20', durationSeconds: 680, points: 15, order: 5 },
      { id: 'react-6', title: 'Side Effects with useEffect', slug: 'useeffect-side-effects', description: 'Run code when components mount, update, or unmount. Fetch data, set up subscriptions, and manage cleanup with useEffect.', videoPath: '/videos/react/lesson-6.mp4', duration: '16:50', durationSeconds: 1010, points: 25, order: 6 },
      { id: 'react-7', title: 'Forms in React', slug: 'forms-react', description: 'Build controlled forms where React manages every input\'s state. Handle submission, validation, and error messages the React way.', videoPath: '/videos/react/lesson-7.mp4', duration: '14:10', durationSeconds: 850, points: 20, order: 7 },
      { id: 'react-8', title: 'React Context & useContext', slug: 'react-context', description: 'Share state across many components without prop drilling. Build a theme switcher and auth state system using React Context.', videoPath: '/videos/react/lesson-8.mp4', duration: '15:30', durationSeconds: 930, points: 25, order: 8 },
      { id: 'react-9', title: 'React Router', slug: 'react-router', description: 'Build multi-page apps with React Router. Define routes, use Link and NavLink, handle URL params, and create a 404 page.', videoPath: '/videos/react/lesson-9.mp4', duration: '17:00', durationSeconds: 1020, points: 25, order: 9 },
      { id: 'react-10', title: 'Custom Hooks', slug: 'custom-hooks', description: 'Extract and reuse logic with custom hooks. Build useFetch, useLocalStorage, and useDebounce hooks you can use in any project.', videoPath: '/videos/react/lesson-10.mp4', duration: '13:40', durationSeconds: 820, points: 20, order: 10 },
      { id: 'react-11', title: 'Performance: useMemo & useCallback', slug: 'performance-memo', description: 'Prevent unnecessary re-renders and expensive recalculations. Learn when and how to use React.memo, useMemo, and useCallback.', videoPath: '/videos/react/lesson-11.mp4', duration: '12:25', durationSeconds: 745, points: 20, order: 11 },
      { id: 'react-12', title: 'Project: Build a Movie Search App', slug: 'project-movie-search', description: 'Build a real React app that searches for movies using the OMDB API. Features include search, filtering, favorites, and a detail page.', videoPath: '/videos/react/lesson-12.mp4', duration: '28:00', durationSeconds: 1680, points: 25, order: 12 },
    ],
    totalPoints: 245,
  },
  {
    id: 'nodejs-express',
    title: 'Node.js & Express',
    slug: 'nodejs-express',
    description: 'Go full-stack! Build powerful backend APIs with Node.js and Express. Connect to databases and serve your React apps.',
    longDescription: `Node.js lets you run JavaScript on a server — which means if you know JavaScript, you can build the backend too. Express makes it incredibly simple to create APIs, handle routes, and connect to databases. In this course, we build a complete REST API from scratch, connect it to MongoDB, and add authentication. You'll finish knowing exactly how backend development works.`,
    thumbnail: '/thumbnails/nodejs.svg',
    category: 'Backend',
    difficulty: 'Intermediate',
    color: '#22c55e',
    icon: '🟢',
    prerequisites: ['javascript-beginners'],
    whatYouLearn: [
      'Node.js runtime and npm ecosystem',
      'Build REST APIs with Express',
      'Connect to MongoDB with Mongoose',
      'Authentication with JWT and bcrypt',
      'Middleware, error handling, and routing',
      'Deploy your API to Railway or Render',
    ],
    lessons: [
      { id: 'node-1', title: 'Introduction to Node.js', slug: 'intro-nodejs', description: 'Understand the Node.js runtime, the event loop, and why JavaScript on the server is such a big deal. Set up Node and run your first server.', videoPath: '/videos/nodejs/lesson-1.mp4', duration: '11:00', durationSeconds: 660, points: 15, order: 1 },
      { id: 'node-2', title: 'npm & Modules', slug: 'npm-modules', description: 'Use npm to manage packages and understand CommonJS vs ES Modules. Install and use popular packages like lodash, dotenv, and nodemon.', videoPath: '/videos/nodejs/lesson-2.mp4', duration: '12:30', durationSeconds: 750, points: 15, order: 2 },
      { id: 'node-3', title: 'Building with Express', slug: 'building-express', description: 'Create your first Express server. Define routes for GET, POST, PUT, DELETE and understand request and response objects.', videoPath: '/videos/nodejs/lesson-3.mp4', duration: '15:20', durationSeconds: 920, points: 20, order: 3 },
      { id: 'node-4', title: 'Middleware', slug: 'middleware', description: 'Understand how Express middleware works. Use built-in middleware, write custom middleware, and use popular packages like morgan and cors.', videoPath: '/videos/nodejs/lesson-4.mp4', duration: '13:45', durationSeconds: 825, points: 20, order: 4 },
      { id: 'node-5', title: 'MongoDB & Mongoose', slug: 'mongodb-mongoose', description: 'Connect Express to MongoDB with Mongoose. Define schemas and models, and perform CRUD operations through your API.', videoPath: '/videos/nodejs/lesson-5.mp4', duration: '18:00', durationSeconds: 1080, points: 25, order: 5 },
      { id: 'node-6', title: 'Authentication with JWT', slug: 'auth-jwt', description: 'Add sign up, login, and protected routes to your API using JSON Web Tokens and bcrypt for password hashing.', videoPath: '/videos/nodejs/lesson-6.mp4', duration: '20:30', durationSeconds: 1230, points: 25, order: 6 },
      { id: 'node-7', title: 'Error Handling & Validation', slug: 'error-handling-validation', description: 'Build robust APIs that return helpful error messages. Validate request data with express-validator and handle async errors properly.', videoPath: '/videos/nodejs/lesson-7.mp4', duration: '14:15', durationSeconds: 855, points: 20, order: 7 },
      { id: 'node-8', title: 'File Uploads', slug: 'file-uploads', description: 'Accept image and file uploads in your API using Multer. Save files to disk or cloud storage and return URLs to the client.', videoPath: '/videos/nodejs/lesson-8.mp4', duration: '12:00', durationSeconds: 720, points: 20, order: 8 },
      { id: 'node-9', title: 'API Design Best Practices', slug: 'api-design', description: 'Learn RESTful API conventions, versioning, rate limiting, and how to document your API with tools like Postman.', videoPath: '/videos/nodejs/lesson-9.mp4', duration: '11:30', durationSeconds: 690, points: 15, order: 9 },
      { id: 'node-10', title: 'Project: Build a Blog API', slug: 'project-blog-api', description: 'Build a complete blog API with users, posts, comments, and auth. Then connect it to a React frontend for a full-stack application.', videoPath: '/videos/nodejs/lesson-10.mp4', duration: '30:00', durationSeconds: 1800, points: 25, order: 10 },
    ],
    totalPoints: 200,
  },
  {
    id: 'git-github',
    title: 'Git & GitHub',
    slug: 'git-github',
    description: 'Version control is a superpower every developer needs. Learn Git and GitHub to track your code, collaborate with others, and never lose work again.',
    longDescription: `Git is the time machine every developer uses. It lets you track changes, experiment safely, collaborate with teams, and undo any mistake. GitHub is where the world's code lives. In this course, you'll go from never using Git to being confident with branches, merges, pull requests, and collaboration workflows. This is the course every coding bootcamp wishes they taught first.`,
    thumbnail: '/thumbnails/git.svg',
    category: 'Tools',
    difficulty: 'Beginner',
    color: '#f43f5e',
    icon: '🔧',
    prerequisites: [],
    whatYouLearn: [
      'Install Git and configure your identity',
      'Track changes with commits and staging',
      'Branch, merge, and resolve conflicts',
      'Push code to GitHub repositories',
      'Collaborate with pull requests and code reviews',
      'Use GitHub for portfolio and open source',
    ],
    lessons: [
      { id: 'git-1', title: 'What is Version Control?', slug: 'what-is-version-control', description: 'Understand why version control exists and how it saves developers from disaster. We\'ll install Git and configure it for the first time.', videoPath: '/videos/git/lesson-1.mp4', duration: '9:00', durationSeconds: 540, points: 10, order: 1 },
      { id: 'git-2', title: 'Your First Repository', slug: 'first-repository', description: 'Initialize a Git repository, track files with git add, save snapshots with git commit, and view your history with git log.', videoPath: '/videos/git/lesson-2.mp4', duration: '12:20', durationSeconds: 740, points: 15, order: 2 },
      { id: 'git-3', title: 'Staging & Committing', slug: 'staging-committing', description: 'Understand the staging area deeply. Learn to write great commit messages, amend commits, and use git diff to see what changed.', videoPath: '/videos/git/lesson-3.mp4', duration: '11:00', durationSeconds: 660, points: 15, order: 3 },
      { id: 'git-4', title: 'Branching & Merging', slug: 'branching-merging', description: 'Create branches to work on features safely. Merge branches back and understand what merge conflicts are and how to resolve them calmly.', videoPath: '/videos/git/lesson-4.mp4', duration: '16:30', durationSeconds: 990, points: 20, order: 4 },
      { id: 'git-5', title: 'GitHub: Push & Pull', slug: 'github-push-pull', description: 'Connect your local repo to GitHub. Push your code to the cloud, clone repositories, and sync changes with git pull.', videoPath: '/videos/git/lesson-5.mp4', duration: '13:15', durationSeconds: 795, points: 15, order: 5 },
      { id: 'git-6', title: 'Pull Requests & Collaboration', slug: 'pull-requests-collaboration', description: 'Learn the professional workflow: fork, branch, commit, push, and open a pull request. Collaborate with others and review code on GitHub.', videoPath: '/videos/git/lesson-6.mp4', duration: '18:00', durationSeconds: 1080, points: 25, order: 6 },
      { id: 'git-7', title: '.gitignore & Best Practices', slug: 'gitignore-best-practices', description: 'Exclude sensitive files and node_modules with .gitignore. Learn Git best practices used by professional development teams.', videoPath: '/videos/git/lesson-7.mp4', duration: '10:45', durationSeconds: 645, points: 15, order: 7 },
      { id: 'git-8', title: 'GitHub Pages & Portfolio', slug: 'github-pages-portfolio', description: 'Deploy your projects for free with GitHub Pages. Set up your developer profile and portfolio to impress employers and collaborators.', videoPath: '/videos/git/lesson-8.mp4', duration: '14:00', durationSeconds: 840, points: 20, order: 8 },
    ],
    totalPoints: 135,
  },
]

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug)
}

export function getLessonBySlug(courseSlug: string, lessonSlug: string) {
  const course = getCourseBySlug(courseSlug)
  if (!course) return null
  const lessonIndex = course.lessons.findIndex((l) => l.slug === lessonSlug)
  if (lessonIndex === -1) return null
  return {
    lesson: course.lessons[lessonIndex],
    course,
    prevLesson: lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null,
    nextLesson: lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : null,
  }
}

export function getLevel(points: number): string {
  if (points >= 1000) return 'Master'
  if (points >= 601) return 'Creator'
  if (points >= 301) return 'Builder'
  if (points >= 101) return 'Explorer'
  return 'Beginner'
}

export function getLevelProgress(points: number): { level: string; progress: number; nextLevel: string; pointsToNext: number } {
  if (points >= 1000) return { level: 'Master', progress: 100, nextLevel: 'Master', pointsToNext: 0 }
  if (points >= 601) return { level: 'Creator', progress: Math.round(((points - 601) / 399) * 100), nextLevel: 'Master', pointsToNext: 1000 - points }
  if (points >= 301) return { level: 'Builder', progress: Math.round(((points - 301) / 300) * 100), nextLevel: 'Creator', pointsToNext: 601 - points }
  if (points >= 101) return { level: 'Explorer', progress: Math.round(((points - 101) / 200) * 100), nextLevel: 'Builder', pointsToNext: 301 - points }
  return { level: 'Beginner', progress: Math.round((points / 100) * 100), nextLevel: 'Explorer', pointsToNext: 101 - points }
}
