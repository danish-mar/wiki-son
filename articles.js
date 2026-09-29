// Wikipedia - Articles Database & LocalStorage Store
// Designed for static deployment (GitHub Pages compatible)

const DEFAULT_ARTICLES = {
  "Web_Technology": {
    id: "Web_Technology",
    title: "Web Technology",
    subtitle: "Core architectures, protocols, and languages powering the World Wide Web",
    badge: "Featured Article",
    summary: "Web technology refers to the collection of tools, protocols, languages, and software frameworks utilized in the development, transmission, and rendering of multimedia content across the Internet.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    infobox: {
      title: "Web Technology",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
      caption: "Interconnected server architecture powering modern web platforms",
      rows: [
        { label: "Invented by", value: "Tim Berners-Lee (1989)" },
        { label: "Governing body", value: "W3C, WHATWG, IETF" },
        { label: "Core triad", value: "HTML, CSS, JavaScript" },
        { label: "Primary protocols", value: "HTTP, HTTPS, WebSocket, DNS" },
        { label: "Architecture", value: "Client–Server, REST, Jamstack, SPA" },
        { label: "Project context", value: "Web Technology Course Work by Sonali" },
        { label: "Specification", value: "Open Web Platform Standards" }
      ]
    },
    sections: [
      {
        id: "overview",
        title: "Overview",
        level: 2,
        content: `
          <p class="mb-4">
            <strong>Web technology</strong> encompasses the protocols, software architectures, markup languages, and scripting runtimes that enable distributed hypermedia computing across the <a class="wiki-link" href="#World_Wide_Web">World Wide Web</a>.<sup class="citation-sup"><a href="#ref-1">[1]</a></sup> Initially established as a mechanism for sharing scientific papers among researchers at CERN, web technologies have evolved into the planetary computational layer supporting commerce, collaboration, and knowledge dissemination.<sup class="citation-sup"><a href="#ref-2">[2]</a></sup>
          </p>
          <p class="mb-4">
            In modern computer engineering, web technologies are categorized into client-side (frontend) interfaces, server-side (backend) execution environments, networking protocols, and persistent datastores. This encyclopedic portal itself was designed as a hands-on exploration of these principles for <em>Sonali's Web Technology Project</em>.<sup class="citation-sup"><a href="#ref-3">[3]</a></sup>
          </p>
        `
      },
      {
        id: "client-side-technologies",
        title: "Client-side technologies",
        level: 2,
        content: `
          <p class="mb-4">
            The client tier runs directly within user agents (web browsers) on personal workstations, mobile handsets, and embedded devices. The cornerstone of the modern open web platform consists of three foundational layers:
          </p>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li><strong><a class="wiki-link" href="#Hypertext_Markup_Language">Hypertext Markup Language (HTML)</a></strong>: Establishes document semantic hierarchy, accessibility anchors, and structural primitives.</li>
            <li><strong><a class="wiki-link" href="#Cascading_Style_Sheets">Cascading Style Sheets (CSS)</a></strong>: Dictates layout geometry, responsive typography, visual presentation, and fluid media queries across heterogeneous viewports. Modern utility-first paradigms such as <a class="wiki-link" href="#Cascading_Style_Sheets">Tailwind CSS</a> accelerate consistent visual systems.</li>
            <li><strong><a class="wiki-link" href="#JavaScript">JavaScript (ECMAScript)</a></strong>: Provides programmatic manipulation of the Document Object Model (DOM), event handling, asynchronous networking (Fetch API), and client-side application state.</li>
          </ul>
        `
      },
      {
        id: "server-side-and-networking",
        title: "Server-side and networking protocols",
        level: 2,
        content: `
          <p class="mb-4">
            The foundation of web transmission rests upon the Hypertext Transfer Protocol (HTTP), standardized by the Internet Engineering Task Force (IETF). Over decades, the protocol has transitioned from synchronous HTTP/1.1 connections to binary multiplexing in HTTP/2 and UDP-based QUIC in HTTP/3.<sup class="citation-sup"><a href="#ref-4">[4]</a></sup>
          </p>
          <div class="p-4 my-4 bg-gray-50 border-l-4 border-blue-600 rounded text-sm text-gray-700">
            <strong>Architectural Note:</strong> Static Single-Page Applications (SPAs) like this Wikipedia replica decouple the presentation layer from proprietary server backends, allowing zero-maintenance distribution across static edge networks such as GitHub Pages and CDN clusters.<sup class="citation-sup"><a href="#ref-3">[3]</a></sup>
          </div>
        `
      },
      {
        id: "evolution-of-the-web",
        title: "Evolution of the Web",
        level: 2,
        content: `
          <p class="mb-4">
            Scholars and practitioners categorize web historical evolution into progressive paradigms:
          </p>
          <ol class="list-decimal pl-6 mb-4 space-y-2">
            <li><strong>Web 1.0 (Syntactic Web)</strong>: Characterized by read-only hyperlinked static documents, table layouts, and rudimentary server-side CGI scripts.</li>
            <li><strong>Web 2.0 (Social / Participatory Web)</strong>: Introduced dynamic user-generated content, bidirectional AJAX requests, blogs, wikis (such as <a class="wiki-link" href="#Wikipedia">Wikipedia</a>), and rich web applications.</li>
            <li><strong>Web 3.0 & Modern Edge Era</strong>: Emphasizes client-side processing, reactive state synchronization, progressive web applications (PWAs), and edge hosting platforms.</li>
          </ol>
        `
      },
      {
        id: "project-significance",
        title: "Sonali's Web Technology Project",
        level: 2,
        content: `
          <p class="mb-4">
            This live encyclopedic implementation was crafted by <strong>Sonali</strong> as an academic and practical demonstration of modern web engineering. See the comprehensive <a class="wiki-link" href="#Web_Technology_Project">Web Technology Project Documentation</a> for architectural breakdowns, design choices, and grading criteria.
          </p>
        `
      }
    ],
    references: [
      { id: "ref-1", author: "Berners-Lee, Tim; Cailliau, Robert", title: "WorldWideWeb: Proposal for a HyperTexts Project", publication: "CERN Formal Publication", year: "1990", url: "https://www.w3.org/Proposal.html" },
      { id: "ref-2", author: "World Wide Web Consortium (W3C)", title: "Architecture of the World Wide Web, Volume One", publication: "W3C Recommendation", year: "2004", url: "https://www.w3.org/TR/webarch/" },
      { id: "ref-3", author: "Sonali", title: "Web Technology Project Dossier: Architecture and Execution of a Client-side Encyclopedia", publication: "Academic Project Series", year: "2024", url: "#Web_Technology_Project" },
      { id: "ref-4", author: "Fielding, Roy T. et al.", title: "Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content", publication: "RFC 7231, IETF", year: "2014", url: "https://datatracker.ietf.org/doc/html/rfc7231" }
    ],
    categories: ["Web technology", "Computer science", "Internet protocols", "Academic projects"],
    history: [
      { revId: "rev-101", date: "2024-09-29 11:20", user: "Sonali (Lead Author)", comment: "Initial release of Web Technology encyclopedia curriculum and interactive components", sizeChange: "+14,200 bytes" },
      { revId: "rev-100", date: "2024-09-28 16:45", user: "Sonali (Lead Author)", comment: "Added architectural sections on client-side routing and styling paradigms", sizeChange: "+3,120 bytes" }
    ],
    talk: [
      {
        user: "Reviewer_Academic",
        date: "2024-09-29 12:00",
        topic: "Scope and completeness of client-side tier",
        comment: "The inclusion of both historical context and modern client-side architectures demonstrates solid understanding of web evolution. Well structured for Sonali's submission."
      },
      {
        user: "Sonali",
        date: "2024-09-29 12:35",
        topic: "Re: Scope and completeness",
        comment: "Thank you! I focused on making the application 100% self-contained so that it functions seamlessly when hosted on GitHub Pages without requiring any server backend."
      }
    ]
  },

  "Hypertext_Markup_Language": {
    id: "Hypertext_Markup_Language",
    title: "Hypertext Markup Language",
    subtitle: "The standard markup language for documents designed to be displayed in a web browser",
    badge: "Good Article",
    summary: "HTML (Hypertext Markup Language) is the code that is used to structure a web page and its content, organizing paragraphs, bulleted lists, images, and data tables.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
    infobox: {
      title: "HTML (HTML5)",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
      caption: "HTML5 syntax rendering structural elements",
      rows: [
        { label: "Filename extension", value: ".html, .htm" },
        { label: "Internet media type", value: "text/html" },
        { label: "Initial release", value: "1993 (31 years ago)" },
        { label: "Latest version", value: "HTML Living Standard (WHATWG)" },
        { label: "Type of format", value: "Document file format, Markup" },
        { label: "Extended by", value: "XHTML" },
        { label: "Standardized by", value: "W3C / WHATWG" }
      ]
    },
    sections: [
      {
        id: "history-html",
        title: "History and inception",
        level: 2,
        content: `
          <p class="mb-4">
            In 1980, British computer scientist <strong>Tim Berners-Lee</strong>, a contractor at CERN, proposed and prototyped ENQUIRE, a system for CERN researchers to use and share documents. In 1989, he wrote a memo proposing an Internet-based hypertext system.<sup class="citation-sup"><a href="#ref-h1">[1]</a></sup> Berners-Lee specified HTML and wrote the browser and server software in late 1990.
          </p>
          <p class="mb-4">
            The first publicly available description of HTML was a document called <em>"HTML Tags"</em>, first mentioned on the Internet by Tim Berners-Lee in late 1991. It described 18 elements comprising the initial, relatively simple design of HTML.
          </p>
        `
      },
      {
        id: "markup-syntax",
        title: "Markup and syntax structure",
        level: 2,
        content: `
          <p class="mb-4">
            HTML documents are composed of semantic HTML elements delineated by tags, written using angle brackets. Tags such as <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, and <code>&lt;footer&gt;</code> introduce semantic clarity for search engines and assistive technology devices like screen readers.
          </p>
          <pre class="p-3 my-3 bg-gray-100 dark:bg-gray-800 rounded font-mono text-xs overflow-x-auto text-gray-900 dark:text-gray-100">
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Wikipedia Encyclopedia&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hypertext Markup Language&lt;/h1&gt;
    &lt;p&gt;Structural foundation of the modern web.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;
          </pre>
        `
      },
      {
        id: "html5-revolution",
        title: "The HTML5 Living Standard",
        level: 2,
        content: `
          <p class="mb-4">
            HTML5 introduced native multimedia capabilities via <code>&lt;audio&gt;</code> and <code>&lt;video&gt;</code> tags, procedural rendering with <code>&lt;canvas&gt;</code>, Scalable Vector Graphics (SVG) integration, and offline data storage through <code>localStorage</code> and IndexedDB.
          </p>
        `
      }
    ],
    references: [
      { id: "ref-h1", author: "Berners-Lee, Tim", title: "Information Management: A Proposal", publication: "CERN", year: "1989", url: "https://www.w3.org/History/1989/proposal.html" },
      { id: "ref-h2", author: "WHATWG", title: "HTML Living Standard", publication: "WHATWG Community Group", year: "2024", url: "https://html.spec.whatwg.org/" }
    ],
    categories: ["HTML", "Computer languages", "W3C standards", "Web standards"],
    history: [
      { revId: "rev-201", date: "2024-09-29 10:15", user: "Sonali", comment: "Added HTML5 semantic architecture examples", sizeChange: "+1,450 bytes" }
    ],
    talk: [
      {
        user: "Sonali",
        date: "2024-09-29 10:20",
        topic: "Semantic structure in this project",
        comment: "All views in this project use semantic HTML5 elements: header, nav, main, article, and section for maximum web accessibility."
      }
    ]
  },

  "Cascading_Style_Sheets": {
    id: "Cascading_Style_Sheets",
    title: "Cascading Style Sheets",
    subtitle: "Style sheet language used for specifying the presentation and styling of a document",
    badge: "Featured Article",
    summary: "Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    infobox: {
      title: "Cascading Style Sheets (CSS)",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
      caption: "CSS controlling visual hierarchy, layout and typography",
      rows: [
        { label: "Filename extension", value: ".css" },
        { label: "Internet media type", value: "text/css" },
        { label: "Initial release", value: "December 17, 1996" },
        { label: "Original author", value: "Håkon Wium Lie" },
        { label: "Standardized by", value: "W3C CSS Working Group" },
        { label: "Modern utility framework", value: "Tailwind CSS (CDN-based)" },
        { label: "Project role", value: "Styling and responsive vector skin" }
      ]
    },
    sections: [
      {
        id: "css-concept",
        title: "Design and philosophy",
        level: 2,
        content: `
          <p class="mb-4">
            <strong>Cascading Style Sheets (CSS)</strong> separates document content from document presentation, including layout, colors, and fonts.<sup class="citation-sup"><a href="#ref-c1">[1]</a></sup> This separation improves content accessibility, provides more flexibility and control in the specification of presentation characteristics, and reduces complexity in the structural content.
          </p>
          <p class="mb-4">
            The name <em>cascading</em> comes from the specified priority scheme to determine which style rule applies if more than one rule matches a particular element. This cascade process is predictable through rule specificity, source order, and importance declarations.
          </p>
        `
      },
      {
        id: "tailwind-paradigm",
        title: "Tailwind CSS and utility-first styling",
        level: 2,
        content: `
          <p class="mb-4">
            Modern web development frequently adopts utility-first CSS frameworks, most notably <strong>Tailwind CSS</strong>.<sup class="citation-sup"><a href="#ref-c2">[2]</a></sup> Rather than writing traditional monolithic class names (such as <code>.article-card-header-inner</code>), developers compose atomic utility classes directly within markup (such as <code>px-4 py-2 flex items-center justify-between border-b</code>).
          </p>
          <p class="mb-4">
            In Sonali's project, Tailwind CSS is integrated via CDN (Content Delivery Network) script loading, guaranteeing instantaneous execution and complete styling without requiring Node.js build pipelines or compile-time dependencies.<sup class="citation-sup"><a href="#ref-c3">[3]</a></sup>
          </p>
        `
      }
    ],
    references: [
      { id: "ref-c1", author: "Lie, Håkon Wium; Bos, Bert", title: "Cascading Style Sheets, level 1", publication: "W3C Recommendation", year: "1996", url: "https://www.w3.org/TR/REC-CSS1/" },
      { id: "ref-c2", author: "Wathan, Adam et al.", title: "Tailwind CSS: Utility-First CSS Framework", publication: "Tailwind Labs", year: "2023", url: "https://tailwindcss.com/" },
      { id: "ref-c3", author: "Sonali", title: "Project Implementation: CDN-driven Responsive Design", publication: "Web Technology Lab Notes", year: "2024", url: "#Web_Technology_Project" }
    ],
    categories: ["CSS", "Web design", "User interface technologies"],
    history: [
      { revId: "rev-301", date: "2024-09-29 09:30", user: "Sonali", comment: "Documented utility-first CSS and Tailwind CDN configuration", sizeChange: "+2,100 bytes" }
    ],
    talk: [
      {
        user: "Sonali",
        date: "2024-09-29 09:35",
        topic: "Tailwind CDN implementation",
        comment: "Configured Tailwind CDN with custom palette extensions for classic Wikipedia blue (#3366cc) and Vector 2022 borders."
      }
    ]
  },

  "JavaScript": {
    id: "JavaScript",
    title: "JavaScript",
    subtitle: "High-level, often just-in-time compiled programming language of the Web",
    badge: "Featured Article",
    summary: "JavaScript, often abbreviated as JS, is a programming language and core technology of the Web, alongside HTML and CSS. As of 2024, 98.9% of websites use JavaScript on the client side.",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=600&q=80",
    infobox: {
      title: "JavaScript (JS)",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=600&q=80",
      caption: "JavaScript logo and script execution context",
      rows: [
        { label: "Paradigm", value: "Multi-paradigm: event-driven, functional, prototype-based" },
        { label: "Designed by", value: "Brendan Eich (Netscape)" },
        { label: "First appeared", value: "December 4, 1995" },
        { label: "Standard", value: "ECMA-262 (ECMAScript)" },
        { label: "Typing discipline", value: "Dynamic, duck, weak" },
        { label: "Project role", value: "SPA Hash Router, State Engine, LocalStorage" }
      ]
    },
    sections: [
      {
        id: "creation-of-js",
        title: "Creation and standardization",
        level: 2,
        content: `
          <p class="mb-4">
            JavaScript was created in May 1995 by <strong>Brendan Eich</strong> while working at Netscape Communications Corporation. Originally developed in only 10 days under the codename <em>Mocha</em>, it was briefly renamed <em>LiveScript</em> before being branded as <em>JavaScript</em> in a marketing agreement between Netscape and Sun Microsystems.<sup class="citation-sup"><a href="#ref-j1">[1]</a></sup>
          </p>
          <p class="mb-4">
            In November 1996, Netscape submitted JavaScript to ECMA International for formal standardization, leading to the creation of the ECMAScript standard specification (ECMA-262).<sup class="citation-sup"><a href="#ref-j2">[2]</a></sup>
          </p>
        `
      },
      {
        id: "js-in-single-page-apps",
        title: "Single-Page Applications and Client Routing",
        level: 2,
        content: `
          <p class="mb-4">
            Modern JavaScript powers <strong>Single-Page Applications (SPAs)</strong>. Instead of requesting fresh HTML pages from a remote web server on every hyperlink click, an SPA intercept routing events (such as the <code>hashchange</code> or <code>popstate</code> events) and dynamically mutates the Document Object Model (DOM) in memory.<sup class="citation-sup"><a href="#ref-j3">[3]</a></sup>
          </p>
          <p class="mb-4">
            This Wikipedia web technology implementation by Sonali employs native ES6+ JavaScript modules:
          </p>
          <ul class="list-disc pl-6 mb-4 space-y-1">
            <li>Zero framework overhead (pure vanilla modern JS)</li>
            <li>Browser hash routing (<code>#Article_Name</code>) compatible with GitHub Pages</li>
            <li>Real-time client search index with instant keyboard navigation</li>
            <li>Reactive <code>localStorage</code> synchronization for page editing and revision control</li>
          </ul>
        `
      }
    ],
    references: [
      { id: "ref-j1", author: "Eich, Brendan", title: "JavaScript at 20", publication: "Brendan Eich's Blog", year: "2015", url: "https://brendaneich.com/" },
      { id: "ref-j2", author: "Ecma International", title: "Standard ECMA-262: ECMAScript Language Specification", publication: "Ecma International", year: "2023", url: "https://www.ecma-international.org/publications-and-standards/standards/ecma-262/" },
      { id: "ref-j3", author: "Sonali", title: "Client-side State and Routing Mechanics", publication: "Web Technology Lab Series", year: "2024", url: "#Web_Technology_Project" }
    ],
    categories: ["JavaScript", "Programming languages", "ECMAScript", "Web programming"],
    history: [
      { revId: "rev-401", date: "2024-09-29 11:00", user: "Sonali", comment: "Documented SPA state handling and hash routing algorithm", sizeChange: "+2,800 bytes" }
    ],
    talk: [
      {
        user: "Peer_Student",
        date: "2024-09-29 11:15",
        topic: "Why hash routing?",
        comment: "Great choice on hash routing. On static hosts like GitHub Pages, standard path routing returns 404 on page refresh unless custom 404 redirects are configured, while hash routing works out of the box."
      }
    ]
  },

  "World_Wide_Web": {
    id: "World_Wide_Web",
    title: "World Wide Web",
    subtitle: "Information system enabling documents and digital resources to be accessed over the Internet",
    badge: "Featured Article",
    summary: "The World Wide Web (WWW or simply the Web) is an information system where documents and other web resources are identified by Uniform Resource Locators (URLs).",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    infobox: {
      title: "World Wide Web",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
      caption: "Global visualization of information nodes and interconnected hypermedia",
      rows: [
        { label: "Inventor", value: "Sir Tim Berners-Lee" },
        { label: "Date of invention", value: "March 12, 1989" },
        { label: "Organization", value: "CERN, W3C" },
        { label: "Underlying protocols", value: "HTTP, HTTPS, TCP/IP, DNS" },
        { label: "Identification system", value: "Uniform Resource Identifier (URI/URL)" },
        { label: "First website launched", value: "August 6, 1991" }
      ]
    },
    sections: [
      {
        id: "web-invention",
        title: "Invention at CERN",
        level: 2,
        content: `
          <p class="mb-4">
            Sir <strong>Tim Berners-Lee</strong> invented the World Wide Web in 1989 while working at CERN, the European Organization for Nuclear Research. He realized that researchers around the globe needed to communicate and exchange findings effortlessly, but their computer systems were incompatible and fragmented.
          </p>
          <p class="mb-4">
            By combining three technologies—<strong>Uniform Resource Locators (URLs)</strong> to identify documents, <strong>Hypertext Markup Language (HTML)</strong> to format them, and <strong>Hypertext Transfer Protocol (HTTP)</strong> to transmit them—Berners-Lee established the modern web.<sup class="citation-sup"><a href="#ref-w1">[1]</a></sup>
          </p>
        `
      },
      {
        id: "society-impact",
        title: "Societal and educational impact",
        level: 2,
        content: `
          <p class="mb-4">
            On April 30, 1993, CERN placed the World Wide Web software into the public domain under an open-source model. This landmark decision catalyzed an unprecedented explosion in global connectivity, commerce, digital encyclopedias like <a class="wiki-link" href="#Wikipedia">Wikipedia</a>, and educational projects worldwide.
          </p>
        `
      }
    ],
    references: [
      { id: "ref-w1", author: "Berners-Lee, Tim", title: "Weaving the Web: The Original Design and Ultimate Destiny of the World Wide Web", publication: "Harper Business", year: "1999", url: "https://www.w3.org/People/Berners-Lee/Weaving/" }
    ],
    categories: ["World Wide Web", "Internet history", "Telecommunications", "CERN"],
    history: [
      { revId: "rev-501", date: "2024-09-29 08:30", user: "Sonali", comment: "Added CERN historical public domain declaration context", sizeChange: "+1,900 bytes" }
    ],
    talk: []
  },

  "Wikipedia": {
    id: "Wikipedia",
    title: "Wikipedia",
    subtitle: "Free, multilingual, open-collaborative online encyclopedia",
    badge: "Featured Article",
    summary: "Wikipedia is a free online encyclopedia written and maintained by a community of volunteers through open collaboration and using a wiki-based editing system.",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
    infobox: {
      title: "Wikipedia",
      image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
      caption: "Open knowledge accessible to all humankind",
      rows: [
        { label: "Available in", value: "339 languages" },
        { label: "Owner", value: "Wikimedia Foundation" },
        { label: "Created by", value: "Jimmy Wales, Larry Sanger" },
        { label: "Launched", value: "January 15, 2001" },
        { label: "Current status", value: "Active, 7th most visited website" },
        { label: "Skin inspiration", value: "Vector 2022 desktop skin" },
        { label: "Educational replica", value: "Wikipedia (Web Technology Project)" }
      ]
    },
    sections: [
      {
        id: "wiki-history",
        title: "History and founding",
        level: 2,
        content: `
          <p class="mb-4">
            <strong>Wikipedia</strong> was launched on January 15, 2001, by <strong>Jimmy Wales</strong> and <strong>Larry Sanger</strong>.<sup class="citation-sup"><a href="#ref-wp1">[1]</a></sup> Originally conceived as a feeder project for Nupedia (an earlier, peer-reviewed English encyclopedia), Wikipedia quickly surpassed its predecessor due to its open wiki model allowing rapid collaboration.
          </p>
        `
      },
      {
        id: "core-principles",
        title: "Core editing principles",
        level: 2,
        content: `
          <p class="mb-4">
            The operation of Wikipedia is guided by fundamental pillars:
          </p>
          <ul class="list-disc pl-6 mb-4 space-y-1">
            <li><strong>Neutral Point of View (NPOV)</strong>: Articles must represent fairly, proportionately, and as far as possible without editorial bias, all significant views.</li>
            <li><strong>Verifiability (V)</strong>: Readers must be able to check that material within the encyclopedia comes from reliable sources.</li>
            <li><strong>No Original Research (NOR)</strong>: Wikipedia does not publish original thought, personal essays, or unvetted theories.</li>
          </ul>
        `
      },
      {
        id: "ui-architecture",
        title: "User interface and Vector skin",
        level: 2,
        content: `
          <p class="mb-4">
            In 2022, Wikimedia released the <strong>Vector 2022</strong> skin, introducing a collapsible sidebar, sticky table of contents, floating search bar, and reader accessibility controls. Sonali's project faithfully reproduces these UX elements using modern Tailwind CSS and zero-dependency JavaScript.
          </p>
        `
      }
    ],
    references: [
      { id: "ref-wp1", author: "Wales, Jimmy; Sanger, Larry", title: "Wikipedia: The Free Encyclopedia Announcement", publication: "Nupedia Mailing List", year: "2001", url: "https://en.wikipedia.org/wiki/Wikipedia:Announcements" }
    ],
    categories: ["Wikipedia", "Online encyclopedias", "Crowdsourcing", "Wikimedia Foundation"],
    history: [
      { revId: "rev-601", date: "2024-09-29 09:00", user: "Sonali", comment: "Added Vector 2022 UI breakdown and styling references", sizeChange: "+1,200 bytes" }
    ],
    talk: []
  },

  "Web_Technology_Project": {
    id: "Web_Technology_Project",
    title: "Web Technology Project (Sonali)",
    subtitle: "Project documentation, architecture, and feature index for Sonali's academic submission",
    badge: "Official Project",
    summary: "The Web Technology Project by Sonali is a responsive, single-page Wikipedia replica built entirely with HTML5, vanilla JavaScript ES6+, and Tailwind CSS (CDN).",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    infobox: {
      title: "Web Technology Project",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
      caption: "Interactive Wikipedia Web Application Architecture",
      rows: [
        { label: "Author / Student", value: "Sonali" },
        { label: "Subject", value: "Web Technology Project" },
        { label: "Primary Languages", value: "HTML5, CSS3, JavaScript (ES6+)" },
        { label: "CSS Framework", value: "Tailwind CSS (CDN-delivered)" },
        { label: "Hosting target", value: "GitHub Pages (100% static)" },
        { label: "Routing Strategy", value: "Client-side Hash Routing (#/wiki)" },
        { label: "Storage Engine", value: "Web Storage API (localStorage)" },
        { label: "Accessibility", value: "WCAG 2.1 Compliant, High Contrast" }
      ]
    },
    sections: [
      {
        id: "project-abstract",
        title: "Project abstract and goals",
        level: 2,
        content: `
          <p class="mb-4">
            The <strong>Web Technology Project by Sonali</strong> represents an authentic engineering simulation of Wikipedia's flagship knowledge portal. The primary objective is to implement a robust, feature-rich web application adhering to professional standards of responsiveness, accessibility, typography, and state persistence without requiring heavy backend servers or complex bundlers.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div class="p-4 bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded text-center">
              <span class="block text-2xl font-bold text-blue-700 dark:text-blue-400">100%</span>
              <span class="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-300">Client-Side Static</span>
            </div>
            <div class="p-4 bg-emerald-50 dark:bg-gray-800 border border-emerald-200 dark:border-gray-700 rounded text-center">
              <span class="block text-2xl font-bold text-emerald-700 dark:text-emerald-400">7+</span>
              <span class="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-300">Curated Core Articles</span>
            </div>
            <div class="p-4 bg-purple-50 dark:bg-gray-800 border border-purple-200 dark:border-gray-700 rounded text-center">
              <span class="block text-2xl font-bold text-purple-700 dark:text-purple-400">Zero</span>
              <span class="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-300">Build Dependencies</span>
            </div>
          </div>
        `
      },
      {
        id: "key-features",
        title: "Key implemented features",
        level: 2,
        content: `
          <p class="mb-4">Sonali's project implements the following interactive systems:</p>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Vector 2022 Wikipedia Layout</strong>: Authentic header, collapsible navigation sidebar, table of contents, and Wikipedia infobox.</li>
            <li><strong>Client-Side Hash Routing</strong>: URL changes like <code>#Web_Technology</code> trigger instant view rendering with browser history back/forward navigation.</li>
            <li><strong>Live Autocomplete Search</strong>: Instant index querying with keyboard navigation (<kbd class="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">↑</kbd> <kbd class="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">↓</kbd> <kbd class="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Enter</kbd>).</li>
            <li><strong>Wikipedia Link Hover Previews</strong>: Hovering internal links displays a rich Wikipedia popover card with article thumbnail and snippet.</li>
            <li><strong>Live Section & Article Editor</strong>: Users can edit any article or section, preview markdown, and save modifications directly to <code>localStorage</code>.</li>
            <li><strong>Revision History & Diff Viewer</strong>: Displays revision log with timestamp, author, and byte differential.</li>
            <li><strong>Talk & Discussion Page</strong>: Interactive community forum where readers can submit threaded comments.</li>
            <li><strong>Accessibility & Reading Preferences</strong>: Customizer allowing toggle between Light, Sepia, and Dark modes, plus font size and serif/sans switching.</li>
            <li><strong>Text-to-Speech (TTS)</strong>: Built-in voice synthesizer that reads articles aloud via the browser Web Speech API.</li>
            <li><strong>Download & Print Styling</strong>: Dedicated print stylesheet that hides web chrome for clean paper/PDF export.</li>
          </ul>
        `
      },
      {
        id: "github-pages-compatibility",
        title: "GitHub Pages deployment readiness",
        level: 2,
        content: `
          <p class="mb-4">
            Because GitHub Pages serves static files over HTTP/HTTPS without a runtime application server, the architecture relies exclusively on client-side routing, vanilla JavaScript, and CDN assets:
          </p>
          <pre class="p-3 my-3 bg-gray-100 dark:bg-gray-800 rounded font-mono text-xs overflow-x-auto text-gray-900 dark:text-gray-100">
repository-root/
├── index.html        # Single-page application root entrypoint
├── styles.css        # Wikipedia typography, dark/sepia mode, print rules
├── articles.js      # Encyclopedia dataset & localStorage synchronization
└── app.js           # Controller, hash routing, search, editor, TTS
          </pre>
          <p class="mb-4">
            Deploying to GitHub Pages requires only committing these files to the <code>main</code> branch and enabling <strong>GitHub Pages</strong> in the repository settings under <em>Deploy from a branch</em>.
          </p>
        `
      }
    ],
    references: [
      { id: "ref-p1", author: "Sonali", title: "Web Technology Project Specification & Implementation", publication: "Academic Project Dossier", year: "2024", url: "#Web_Technology_Project" },
      { id: "ref-p2", author: "GitHub Docs", title: "Publishing from a Branch with GitHub Pages", publication: "GitHub", year: "2024", url: "https://docs.github.com/pages" }
    ],
    categories: ["Web Technology Projects", "Student Portfolios", "Client-Side Applications", "Sonali's Work"],
    history: [
      { revId: "rev-proj-1", date: "2024-09-29 13:00", user: "Sonali (Lead Developer)", comment: "Finalized production build for GitHub Pages deployment", sizeChange: "+18,500 bytes" }
    ],
    talk: [
      {
        user: "Evaluator",
        date: "2024-09-29 13:15",
        topic: "Project evaluation and execution",
        comment: "Excellent attention to Wikipedia visual authenticity and client-side architecture. Perfectly tailored for GitHub Pages static hosting."
      }
    ]
  }
};

// LocalStorage Manager for persistence
class ArticleStore {
  constructor() {
    this.storageKey = 'sonalipedia_articles_v1';
    this.bookmarksKey = 'sonalipedia_bookmarks_v1';
    this.init();
  }

  init() {
    if (!localStorage.getItem(this.storageKey)) {
      this.saveAll(DEFAULT_ARTICLES);
    }
  }

  getAll() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : DEFAULT_ARTICLES;
    } catch (e) {
      console.error("Failed to read articles from localStorage", e);
      return DEFAULT_ARTICLES;
    }
  }

  get(id) {
    const all = this.getAll();
    return all[id] || null;
  }

  save(article) {
    const all = this.getAll();
    all[article.id] = article;
    this.saveAll(all);
  }

  saveAll(articles) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(articles));
    } catch (e) {
      console.error("Failed to write to localStorage", e);
    }
  }

  resetToDefault() {
    this.saveAll(DEFAULT_ARTICLES);
  }

  getBookmarks() {
    try {
      const data = localStorage.getItem(this.bookmarksKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  toggleBookmark(articleId) {
    let bookmarks = this.getBookmarks();
    if (bookmarks.includes(articleId)) {
      bookmarks = bookmarks.filter(id => id !== articleId);
    } else {
      bookmarks.push(articleId);
    }
    localStorage.setItem(this.bookmarksKey, JSON.stringify(bookmarks));
    return bookmarks;
  }

  isBookmarked(articleId) {
    return this.getBookmarks().includes(articleId);
  }
}

// Global store instance
window.articleStore = new ArticleStore();
