// Wikipedia - Client-side Engine Application
// 100% Client-side, Vanilla ES6+, GitHub Pages compatible

class WikiApp {
  constructor() {
    this.currentArticleId = 'Web_Technology';
    this.currentTab = 'read'; // read, edit, talk, history
    this.activeSearchIndex = -1;
    this.searchResults = [];
    this.hoverTimeout = null;
    this.activePopover = null;
    this.speechUtterance = null;
    this.isSpeaking = false;

    this.initPreferences();
    this.initElements();
    this.bindEvents();
    this.handleRoute();
  }

  // --- Reading Preferences (Theme, Font, Size, Width) ---
  initPreferences() {
    this.theme = localStorage.getItem('sonalipedia_theme') || 'light';
    this.fontFamily = localStorage.getItem('sonalipedia_font') || 'sans';
    this.fontSize = localStorage.getItem('sonalipedia_size') || '100';
    this.pageWidth = localStorage.getItem('sonalipedia_width') || 'standard';

    this.applyPreferences();
  }

  applyPreferences() {
    document.body.setAttribute('data-theme', this.theme);
    if (this.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const contentArea = document.getElementById('article-content-body');
    if (contentArea) {
      if (this.fontFamily === 'serif') {
        contentArea.classList.add('font-serif');
      } else {
        contentArea.classList.remove('font-serif');
      }
      contentArea.style.setProperty('--wiki-font-size', `${this.fontSize}%`);
    }

    const mainContainer = document.getElementById('main-article-container');
    if (mainContainer) {
      if (this.pageWidth === 'wide') {
        mainContainer.classList.remove('max-w-4xl');
        mainContainer.classList.add('max-w-6xl');
      } else {
        mainContainer.classList.remove('max-w-6xl');
        mainContainer.classList.add('max-w-4xl');
      }
    }
  }

  setTheme(theme) {
    this.theme = theme;
    localStorage.setItem('sonalipedia_theme', theme);
    this.applyPreferences();
  }

  setFontFamily(font) {
    this.fontFamily = font;
    localStorage.setItem('sonalipedia_font', font);
    this.applyPreferences();
  }

  setFontSize(size) {
    this.fontSize = size;
    localStorage.setItem('sonalipedia_size', size);
    this.applyPreferences();
  }

  setPageWidth(width) {
    this.pageWidth = width;
    localStorage.setItem('sonalipedia_width', width);
    this.applyPreferences();
  }

  // --- DOM Element Caching ---
  initElements() {
    this.sidebar = document.getElementById('wiki-sidebar');
    this.sidebarOverlay = document.getElementById('sidebar-overlay');
    this.sidebarToggle = document.getElementById('sidebar-toggle-btn');
    this.searchInput = document.getElementById('wiki-search-input');
    this.searchDropdown = document.getElementById('wiki-search-dropdown');
    this.tocContainer = document.getElementById('table-of-contents-list');
    this.articleTitleEl = document.getElementById('article-title');
    this.articleSubtitleEl = document.getElementById('article-subtitle');
    this.articleContentEl = document.getElementById('article-content-body');
    this.articleBadgeEl = document.getElementById('article-badge-container');
    this.articleCategoriesEl = document.getElementById('article-categories-list');
    
    // Tab containers
    this.readView = document.getElementById('read-view');
    this.editView = document.getElementById('edit-view');
    this.talkView = document.getElementById('talk-view');
    this.historyView = document.getElementById('history-view');

    // Controls
    this.ttsBtn = document.getElementById('article-tts-btn');
    this.starBtn = document.getElementById('article-star-btn');
    this.newArticleModal = document.getElementById('new-article-modal');
  }

  // --- Event Bindings ---
  bindEvents() {
    // Hash Routing
    window.addEventListener('hashchange', () => this.handleRoute());

    // Sidebar Mobile Toggle
    if (this.sidebarToggle) {
      this.sidebarToggle.addEventListener('click', () => this.toggleSidebar());
    }
    if (this.sidebarOverlay) {
      this.sidebarOverlay.addEventListener('click', () => this.closeSidebar());
    }

    // Search Input Events
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => this.handleSearchInput(e.target.value));
      this.searchInput.addEventListener('keydown', (e) => this.handleSearchKeydown(e));
      this.searchInput.addEventListener('focus', () => {
        if (this.searchInput.value.trim().length > 0) {
          this.searchDropdown.classList.remove('hidden');
        }
      });
    }

    // Close search dropdown on click outside
    document.addEventListener('click', (e) => {
      if (!this.searchInput.contains(e.target) && !this.searchDropdown.contains(e.target)) {
        this.searchDropdown.classList.add('hidden');
      }
      // Close preview popover on click outside
      if (this.activePopover && !this.activePopover.contains(e.target)) {
        this.removePopover();
      }
      // Close any dropdown menus
      this.closeAllMenusExcept(e.target);
    });

    // Global keyboard shortcut ('/' or 'Ctrl+K' for search)
    document.addEventListener('keydown', (e) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && document.activeElement !== this.searchInput) {
        e.preventDefault();
        this.searchInput.focus();
        this.searchInput.select();
      }
      if (e.key === 'Escape') {
        this.searchDropdown.classList.add('hidden');
        this.closeModal();
        this.removePopover();
      }
    });

    // Link Hover Previews (Event Delegation)
    document.addEventListener('mouseover', (e) => this.handleLinkHover(e));
    document.addEventListener('mouseout', (e) => this.handleLinkHoverOut(e));

    // Text to Speech
    if (this.ttsBtn) {
      this.ttsBtn.addEventListener('click', () => this.toggleTTS());
    }

    // Bookmark / Star
    if (this.starBtn) {
      this.starBtn.addEventListener('click', () => this.toggleBookmarkCurrent());
    }

    // Appearance Menu Toggle
    const appearanceBtn = document.getElementById('appearance-menu-btn');
    const appearanceDropdown = document.getElementById('appearance-dropdown');
    if (appearanceBtn && appearanceDropdown) {
      appearanceBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        appearanceDropdown.classList.toggle('hidden');
      });
    }

    // Random Article Buttons
    document.querySelectorAll('.random-article-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.goToRandomArticle();
      });
    });

    // Print Buttons
    document.querySelectorAll('.print-page-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.print();
      });
    });

    // Share / Copy Link Buttons
    document.querySelectorAll('.copy-link-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.copyPageLink();
      });
    });

    // New Article Modal trigger
    document.querySelectorAll('.new-article-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openNewArticleModal();
      });
    });

    // Editor Form Submit
    const editForm = document.getElementById('edit-article-form');
    if (editForm) {
      editForm.addEventListener('submit', (e) => this.handleEditSubmit(e));
    }

    // Cancel Edit
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    if (cancelEditBtn) {
      cancelEditBtn.addEventListener('click', () => this.switchTab('read'));
    }

    // Talk Form Submit
    const talkForm = document.getElementById('talk-form');
    if (talkForm) {
      talkForm.addEventListener('submit', (e) => this.handleTalkSubmit(e));
    }

    // Reset Data button
    const resetDataBtn = document.getElementById('reset-wiki-data-btn');
    if (resetDataBtn) {
      resetDataBtn.addEventListener('click', () => {
        if (confirm('Reset all encyclopedia articles to Sonali\'s initial project defaults?')) {
          window.articleStore.resetToDefault();
          this.handleRoute();
          alert('Wikipedia articles have been reset to defaults.');
        }
      });
    }

    // Scrollspy for Table of Contents
    window.addEventListener('scroll', () => this.updateScrollspy(), { passive: true });
  }

  closeAllMenusExcept(target) {
    const appearanceDropdown = document.getElementById('appearance-dropdown');
    const appearanceBtn = document.getElementById('appearance-menu-btn');
    if (appearanceDropdown && appearanceBtn && !appearanceBtn.contains(target) && !appearanceDropdown.contains(target)) {
      appearanceDropdown.classList.add('hidden');
    }
  }

  // --- Routing ---
  handleRoute() {
    const hash = window.location.hash.replace(/^#\/?/, '');
    const [pathPart, queryPart] = hash.split('?');
    
    let articleId = pathPart || 'Web_Technology';
    articleId = articleId.replace(/^wiki\//, '');
    if (!articleId) articleId = 'Web_Technology';

    const params = new URLSearchParams(queryPart || '');
    const tab = params.get('tab') || 'read';

    let article = window.articleStore.get(articleId);
    if (!article) {
      // If article doesn't exist, fallback or create placeholder
      articleId = 'Web_Technology';
      article = window.articleStore.get(articleId);
      window.location.hash = `#${articleId}`;
      return;
    }

    this.currentArticleId = articleId;
    this.currentTab = tab;

    // Stop speaking if speech was running
    if (this.isSpeaking && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      this.updateTTSButtonUI();
    }

    this.renderCurrentArticle();
    this.updateActiveNavLinks();
    this.switchTab(this.currentTab, false);
    this.updateBookmarkButtonUI();

    // Scroll to top when loading new article
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  navigateToArticle(id, tab = 'read') {
    window.location.hash = `#${id}${tab !== 'read' ? `?tab=${tab}` : ''}`;
  }

  switchTab(tabName, updateHash = true) {
    this.currentTab = tabName;
    if (updateHash) {
      const hash = `#${this.currentArticleId}${tabName !== 'read' ? `?tab=${tabName}` : ''}`;
      window.location.hash = hash;
      return;
    }

    // Hide all tab views
    [this.readView, this.editView, this.talkView, this.historyView].forEach(view => {
      if (view) view.classList.add('hidden');
    });

    // Update tab bar buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      const target = btn.getAttribute('data-tab');
      if (target === tabName) {
        btn.classList.add('border-blue-600', 'text-blue-600', 'dark:text-blue-400', 'font-semibold');
        btn.classList.remove('border-transparent', 'text-gray-600', 'dark:text-gray-400');
      } else {
        btn.classList.remove('border-blue-600', 'text-blue-600', 'dark:text-blue-400', 'font-semibold');
        btn.classList.add('border-transparent', 'text-gray-600', 'dark:text-gray-400');
      }
    });

    const article = window.articleStore.get(this.currentArticleId);

    if (tabName === 'read') {
      if (this.readView) this.readView.classList.remove('hidden');
    } else if (tabName === 'edit') {
      if (this.editView) {
        this.editView.classList.remove('hidden');
        this.populateEditor(article);
      }
    } else if (tabName === 'talk') {
      if (this.talkView) {
        this.talkView.classList.remove('hidden');
        this.renderTalkPage(article);
      }
    } else if (tabName === 'history') {
      if (this.historyView) {
        this.historyView.classList.remove('hidden');
        this.renderHistoryPage(article);
      }
    }
  }

  // --- Article Rendering ---
  renderCurrentArticle() {
    const article = window.articleStore.get(this.currentArticleId);
    if (!article) return;

    document.title = `${article.title} - Wikipedia`;

    // Title & Subtitle
    if (this.articleTitleEl) this.articleTitleEl.textContent = article.title;
    if (this.articleSubtitleEl) this.articleSubtitleEl.textContent = article.subtitle || 'From Wikipedia, the free encyclopedia';

    // Badge
    if (this.articleBadgeEl) {
      if (article.badge) {
        this.articleBadgeEl.innerHTML = `
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
            <svg class="w-3.5 h-3.5 text-amber-500 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            ${article.badge}
          </span>
        `;
      } else {
        this.articleBadgeEl.innerHTML = '';
      }
    }

    // Infobox HTML
    let infoboxHtml = '';
    if (article.infobox) {
      const info = article.infobox;
      let rowsHtml = '';
      if (info.rows && info.rows.length) {
        rowsHtml = info.rows.map(row => `
          <tr class="border-t border-gray-200 dark:border-gray-700">
            <th class="py-1 px-2 text-left font-semibold text-xs text-gray-700 dark:text-gray-300 w-1/3 bg-gray-50/60 dark:bg-gray-800/60 align-top">${row.label}</th>
            <td class="py-1 px-2 text-xs text-gray-900 dark:text-gray-200 align-top">${row.value}</td>
          </tr>
        `).join('');
      }

      infoboxHtml = `
        <div class="wiki-infobox rounded overflow-hidden shadow-sm">
          <div class="wiki-infobox-title py-2 px-3 bg-gray-100 dark:bg-gray-800 text-sm font-bold border-b border-gray-300 dark:border-gray-700 text-center">
            ${info.title || article.title}
          </div>
          ${info.image ? `
            <div class="p-2 text-center bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <img src="${info.image}" alt="${info.title}" class="max-h-48 w-full object-cover rounded shadow-inner mb-1" loading="lazy" />
              ${info.caption ? `<p class="text-xs text-gray-500 dark:text-gray-400 italic">${info.caption}</p>` : ''}
            </div>
          ` : ''}
          <table class="w-full text-xs">
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      `;
    }

    // Sections HTML with [ edit ] buttons
    let sectionsHtml = '';
    if (article.sections && article.sections.length) {
      sectionsHtml = article.sections.map((sec, idx) => {
        const headingClass = sec.level === 3 ? 'text-lg font-bold mt-6 mb-2 border-b border-gray-200 dark:border-gray-700 pb-1' : 'text-xl font-bold mt-8 mb-3 border-b border-gray-300 dark:border-gray-700 pb-1';
        return `
          <section id="${sec.id}" class="wiki-section relative mb-6">
            <div class="flex items-center justify-between group">
              <h${sec.level} class="${headingClass} text-gray-900 dark:text-gray-100 flex-1">
                ${sec.title}
              </h${sec.level}>
              <button onclick="window.wikiApp.editSection(${idx})" class="opacity-0 group-hover:opacity-100 focus:opacity-100 text-xs text-blue-600 dark:text-blue-400 hover:underline px-2 py-1 transition-opacity" title="Edit section: ${sec.title}">
                [ edit ]
              </button>
            </div>
            <div class="section-content text-gray-800 dark:text-gray-200 text-base leading-relaxed">
              ${sec.content}
            </div>
          </section>
        `;
      }).join('');
    }

    // References List HTML
    let referencesHtml = '';
    if (article.references && article.references.length) {
      const refItems = article.references.map((ref, idx) => `
        <li id="${ref.id || `ref-${idx+1}`}" class="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
          <span class="font-medium mr-1">^</span>
          <span>${ref.author ? `<strong>${ref.author}</strong> ` : ''}</span>
          ${ref.title ? `"${ref.title}". ` : ''}
          ${ref.publication ? `<em>${ref.publication}</em>. ` : ''}
          ${ref.year ? `(${ref.year}). ` : ''}
          ${ref.url ? `<a href="${ref.url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">[Link]</a>` : ''}
        </li>
      `).join('');

      referencesHtml = `
        <section id="references" class="wiki-section mt-10 pt-4 border-t border-gray-300 dark:border-gray-700">
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 border-b border-gray-200 dark:border-gray-700 pb-1">References</h2>
          <ol class="list-decimal pl-6 space-y-1.5">
            ${refItems}
          </ol>
        </section>
      `;
    }

    // Combine into main body
    if (this.articleContentEl) {
      this.articleContentEl.innerHTML = `
        ${infoboxHtml}
        ${sectionsHtml}
        ${referencesHtml}
      `;
    }

    // Categories
    if (this.articleCategoriesEl) {
      if (article.categories && article.categories.length) {
        this.articleCategoriesEl.innerHTML = article.categories.map(cat => `
          <a href="#${encodeURIComponent(cat)}" class="text-blue-600 dark:text-blue-400 hover:underline text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">
            ${cat}
          </a>
        `).join('<span class="text-gray-400 mx-1 text-xs">|</span>');
      } else {
        this.articleCategoriesEl.innerHTML = '<span class="text-xs text-gray-500">None</span>';
      }
    }

    // Render Table of Contents
    this.renderTableOfContents(article);

    // Apply font styling rules
    this.applyPreferences();
  }

  // --- Table of Contents Generation ---
  renderTableOfContents(article) {
    if (!this.tocContainer) return;

    if (!article.sections || article.sections.length === 0) {
      this.tocContainer.innerHTML = '<p class="text-xs text-gray-400 italic">No contents</p>';
      return;
    }

    let tocItems = article.sections.map((sec, idx) => {
      const indent = sec.level === 3 ? 'pl-4 text-xs' : 'font-medium text-xs';
      return `
        <li class="toc-item py-1" data-section="${sec.id}">
          <a href="#${sec.id}" onclick="event.preventDefault(); window.wikiApp.scrollToSection('${sec.id}')" class="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 border-l-2 border-transparent pl-2.5 transition-all ${indent}">
            <span class="text-gray-400 dark:text-gray-500 mr-1.5">${idx + 1}</span>${sec.title}
          </a>
        </li>
      `;
    });

    if (article.references && article.references.length) {
      tocItems.push(`
        <li class="toc-item py-1" data-section="references">
          <a href="#references" onclick="event.preventDefault(); window.wikiApp.scrollToSection('references')" class="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 border-l-2 border-transparent pl-2.5 transition-all font-medium text-xs">
            <span class="text-gray-400 dark:text-gray-500 mr-1.5">${article.sections.length + 1}</span>References
          </a>
        </li>
      `);
    }

    this.tocContainer.innerHTML = tocItems.join('');
  }

  scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -70; // offset for fixed header
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  updateScrollspy() {
    if (!this.tocContainer) return;
    const sections = document.querySelectorAll('.wiki-section');
    const scrollPos = window.scrollY + 100;

    let currentSectionId = '';
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      const allTocItems = this.tocContainer.querySelectorAll('.toc-item');
      allTocItems.forEach(item => {
        if (item.getAttribute('data-section') === currentSectionId) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  }

  // --- Search System ---
  handleSearchInput(query) {
    query = query.trim().toLowerCase();
    if (!query) {
      this.searchDropdown.classList.add('hidden');
      this.searchResults = [];
      this.activeSearchIndex = -1;
      return;
    }

    const allArticles = window.articleStore.getAll();
    const results = [];

    Object.values(allArticles).forEach(art => {
      let score = 0;
      const titleLower = art.title.toLowerCase();
      const subtitleLower = (art.subtitle || '').toLowerCase();
      const summaryLower = (art.summary || '').toLowerCase();

      if (titleLower === query) score += 100;
      else if (titleLower.startsWith(query)) score += 50;
      else if (titleLower.includes(query)) score += 25;

      if (subtitleLower.includes(query)) score += 10;
      if (summaryLower.includes(query)) score += 5;

      if (score > 0) {
        results.push({ article: art, score });
      }
    });

    results.sort((a, b) => b.score - a.score);
    this.searchResults = results.slice(0, 6);
    this.activeSearchIndex = -1;
    this.renderSearchResults();
  }

  renderSearchResults() {
    if (this.searchResults.length === 0) {
      this.searchDropdown.innerHTML = `
        <div class="p-3 text-xs text-gray-500 dark:text-gray-400 text-center">
          No articles found. Press <kbd class="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Enter</kbd> to create a new page.
        </div>
      `;
      this.searchDropdown.classList.remove('hidden');
      return;
    }

    this.searchDropdown.innerHTML = this.searchResults.map((res, index) => {
      const art = res.article;
      return `
        <div class="search-result-item px-3 py-2 cursor-pointer flex items-center gap-3 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors ${index === this.activeSearchIndex ? 'bg-blue-100 dark:bg-gray-700' : ''}" data-index="${index}" onclick="window.wikiApp.selectSearchResult('${art.id}')">
          <div class="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 flex-shrink-0 overflow-hidden flex items-center justify-center">
            ${art.image ? `<img src="${art.image}" class="w-full h-full object-cover" alt="${art.title}">` : `
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            `}
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">${art.title}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 truncate">${art.subtitle || art.summary || ''}</div>
          </div>
        </div>
      `;
    }).join('');

    this.searchDropdown.classList.remove('hidden');
  }

  handleSearchKeydown(e) {
    if (this.searchResults.length === 0) {
      if (e.key === 'Enter') {
        const query = this.searchInput.value.trim();
        if (query) {
          this.searchDropdown.classList.add('hidden');
          this.openNewArticleModal(query);
        }
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.activeSearchIndex = (this.activeSearchIndex + 1) % this.searchResults.length;
      this.renderSearchResults();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.activeSearchIndex = (this.activeSearchIndex - 1 + this.searchResults.length) % this.searchResults.length;
      this.renderSearchResults();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (this.activeSearchIndex >= 0 && this.activeSearchIndex < this.searchResults.length) {
        this.selectSearchResult(this.searchResults[this.activeSearchIndex].article.id);
      } else if (this.searchResults.length > 0) {
        this.selectSearchResult(this.searchResults[0].article.id);
      }
    }
  }

  selectSearchResult(articleId) {
    this.searchDropdown.classList.add('hidden');
    this.searchInput.value = '';
    this.navigateToArticle(articleId);
  }

  // --- Wikipedia Link Hover Previews (Popover) ---
  handleLinkHover(e) {
    const link = e.target.closest('a.wiki-link');
    if (!link) return;

    const href = link.getAttribute('href') || '';
    if (!href.startsWith('#')) return;

    const targetId = href.replace(/^#/, '').split('?')[0];
    const targetArticle = window.articleStore.get(targetId);
    if (!targetArticle) return;

    clearTimeout(this.hoverTimeout);
    this.hoverTimeout = setTimeout(() => {
      this.showPopover(link, targetArticle);
    }, 280);
  }

  handleLinkHoverOut(e) {
    const link = e.target.closest('a.wiki-link');
    if (link) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = setTimeout(() => {
        if (this.activePopover && !this.activePopover.matches(':hover')) {
          this.removePopover();
        }
      }, 250);
    }
  }

  showPopover(targetElement, article) {
    this.removePopover();

    const rect = targetElement.getBoundingClientRect();
    const popover = document.createElement('div');
    popover.className = 'wiki-preview-popover';
    popover.innerHTML = `
      ${article.image ? `
        <div class="h-32 w-full overflow-hidden rounded-t border-b border-gray-200 dark:border-gray-700">
          <img src="${article.image}" class="w-full h-full object-cover" alt="${article.title}">
        </div>
      ` : ''}
      <div class="p-3">
        <h4 class="font-bold text-sm text-gray-900 dark:text-gray-100 mb-1 flex items-center justify-between">
          <span>${article.title}</span>
          ${article.badge ? `<span class="text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-1.5 py-0.5 rounded font-normal">${article.badge}</span>` : ''}
        </h4>
        <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-3 line-clamp-3">
          ${article.summary || article.subtitle || 'Read more on Wikipedia...'}
        </p>
        <div class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <span class="text-[11px] text-gray-400">Wikipedia Preview</span>
          <a href="#${article.id}" class="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Read article &rarr;
          </a>
        </div>
      </div>
    `;

    document.body.appendChild(popover);

    // Calculate position
    const popoverWidth = 320;
    let left = rect.left + window.scrollX;
    if (left + popoverWidth > window.innerWidth - 20) {
      left = window.innerWidth - popoverWidth - 20;
    }
    const top = rect.bottom + window.scrollY + 8;

    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;

    popover.addEventListener('mouseleave', () => {
      this.removePopover();
    });

    requestAnimationFrame(() => {
      popover.classList.add('visible');
    });

    this.activePopover = popover;
  }

  removePopover() {
    if (this.activePopover) {
      this.activePopover.remove();
      this.activePopover = null;
    }
  }

  // --- Article Editor (Section & Full) ---
  populateEditor(article) {
    const titleInput = document.getElementById('edit-title-input');
    const subtitleInput = document.getElementById('edit-subtitle-input');
    const contentTextarea = document.getElementById('edit-content-textarea');
    const summaryInput = document.getElementById('edit-summary-input');

    if (titleInput) titleInput.value = article.title;
    if (subtitleInput) subtitleInput.value = article.subtitle || '';
    if (summaryInput) summaryInput.value = '';

    // Convert sections back into editable text format
    if (contentTextarea) {
      let combined = '';
      if (article.sections && article.sections.length) {
        combined = article.sections.map(s => `== ${s.title} ==\n${s.content.replace(/<\/?[^>]+(>|$)/g, "").trim()}`).join('\n\n');
      } else {
        combined = article.summary || '';
      }
      contentTextarea.value = combined;
    }
  }

  editSection(sectionIndex) {
    this.switchTab('edit');
    const article = window.articleStore.get(this.currentArticleId);
    if (!article || !article.sections[sectionIndex]) return;

    const sec = article.sections[sectionIndex];
    const summaryInput = document.getElementById('edit-summary-input');
    if (summaryInput) summaryInput.value = `/* ${sec.title} */ Edit section`;

    const contentTextarea = document.getElementById('edit-content-textarea');
    if (contentTextarea) {
      contentTextarea.focus();
    }
  }

  handleEditSubmit(e) {
    e.preventDefault();
    const article = window.articleStore.get(this.currentArticleId);
    if (!article) return;

    const subtitleInput = document.getElementById('edit-subtitle-input');
    const contentTextarea = document.getElementById('edit-content-textarea');
    const summaryInput = document.getElementById('edit-summary-input');

    const updatedSubtitle = subtitleInput ? subtitleInput.value.trim() : article.subtitle;
    const rawContent = contentTextarea ? contentTextarea.value.trim() : '';
    const editSummary = summaryInput && summaryInput.value.trim() ? summaryInput.value.trim() : 'Updated article content';

    // Parse sections from text
    const sectionBlocks = rawContent.split(/==\s*([^=]+)\s*==/g);
    const newSections = [];

    if (sectionBlocks.length > 1) {
      for (let i = 1; i < sectionBlocks.length; i += 2) {
        const title = sectionBlocks[i].trim();
        const text = sectionBlocks[i + 1] ? sectionBlocks[i + 1].trim() : '';
        newSections.push({
          id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          title: title,
          level: 2,
          content: `<p class="mb-4">${text.replace(/\n\n/g, '</p><p class="mb-4">')}</p>`
        });
      }
    } else {
      newSections.push({
        id: 'overview',
        title: 'Overview',
        level: 2,
        content: `<p class="mb-4">${rawContent.replace(/\n\n/g, '</p><p class="mb-4">')}</p>`
      });
    }

    // Append to revision history
    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);
    article.history = article.history || [];
    article.history.unshift({
      revId: `rev-${Date.now()}`,
      date: dateStr,
      user: 'Sonali (Local User)',
      comment: editSummary,
      sizeChange: '+Saved'
    });

    article.subtitle = updatedSubtitle;
    article.sections = newSections;

    window.articleStore.save(article);
    this.switchTab('read');
  }

  // --- Talk & Discussions ---
  renderTalkPage(article) {
    const talkList = document.getElementById('talk-comments-list');
    if (!talkList) return;

    if (!article.talk || article.talk.length === 0) {
      talkList.innerHTML = `
        <div class="p-6 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
          No discussion topics yet for <strong>${article.title}</strong>. Start a new thread below.
        </div>
      `;
      return;
    }

    talkList.innerHTML = article.talk.map((item, index) => `
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900 shadow-sm">
        <div class="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2 mb-2">
          <div class="font-bold text-sm text-gray-900 dark:text-gray-100">${item.topic || 'Discussion Topic'}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">${item.date}</div>
        </div>
        <p class="text-sm text-gray-800 dark:text-gray-200 mb-3 leading-relaxed">${item.comment}</p>
        <div class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
          <span class="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
          <span>Posted by <strong>${item.user || 'Anonymous'}</strong></span>
        </div>
      </div>
    `).join('');
  }

  handleTalkSubmit(e) {
    e.preventDefault();
    const article = window.articleStore.get(this.currentArticleId);
    if (!article) return;

    const userInput = document.getElementById('talk-user-input');
    const topicInput = document.getElementById('talk-topic-input');
    const commentInput = document.getElementById('talk-comment-input');

    const user = userInput && userInput.value.trim() ? userInput.value.trim() : 'Sonali (Student)';
    const topic = topicInput && topicInput.value.trim() ? topicInput.value.trim() : 'Project Feedback';
    const comment = commentInput ? commentInput.value.trim() : '';

    if (!comment) return;

    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

    article.talk = article.talk || [];
    article.talk.push({ user, topic, comment, date: dateStr });

    window.articleStore.save(article);
    if (commentInput) commentInput.value = '';
    this.renderTalkPage(article);
  }

  // --- History & Revisions ---
  renderHistoryPage(article) {
    const historyTableBody = document.getElementById('history-table-body');
    if (!historyTableBody) return;

    if (!article.history || article.history.length === 0) {
      historyTableBody.innerHTML = `<tr><td colspan="4" class="p-4 text-center text-xs text-gray-500">No revision history found.</td></tr>`;
      return;
    }

    historyTableBody.innerHTML = article.history.map((rev, idx) => `
      <tr class="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-xs">
        <td class="p-3 font-mono text-gray-600 dark:text-gray-400">${rev.date}</td>
        <td class="p-3 font-semibold text-gray-900 dark:text-gray-200">${rev.user}</td>
        <td class="p-3 text-gray-700 dark:text-gray-300 italic">${rev.comment || 'Editorial updates'}</td>
        <td class="p-3 text-right">
          <span class="px-2 py-0.5 rounded font-mono text-[11px] ${rev.sizeChange.startsWith('+') ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}">
            ${rev.sizeChange}
          </span>
        </td>
      </tr>
    `).join('');
  }

  // --- Voice / Text To Speech ---
  toggleTTS() {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (this.isSpeaking) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      this.updateTTSButtonUI();
      return;
    }

    const article = window.articleStore.get(this.currentArticleId);
    if (!article) return;

    const speechText = `${article.title}. ${article.summary || article.subtitle || ''}`;
    this.speechUtterance = new SpeechSynthesisUtterance(speechText);
    this.speechUtterance.rate = 0.95;
    this.speechUtterance.pitch = 1.0;

    this.speechUtterance.onend = () => {
      this.isSpeaking = false;
      this.updateTTSButtonUI();
    };

    this.speechUtterance.onerror = () => {
      this.isSpeaking = false;
      this.updateTTSButtonUI();
    };

    window.speechSynthesis.speak(this.speechUtterance);
    this.isSpeaking = true;
    this.updateTTSButtonUI();
  }

  updateTTSButtonUI() {
    if (!this.ttsBtn) return;
    if (this.isSpeaking) {
      this.ttsBtn.classList.add('text-blue-600', 'animate-pulse');
      this.ttsBtn.setAttribute('title', 'Stop voice narration');
    } else {
      this.ttsBtn.classList.remove('text-blue-600', 'animate-pulse');
      this.ttsBtn.setAttribute('title', 'Listen to article (Text-to-speech)');
    }
  }

  // --- Bookmarks ---
  toggleBookmarkCurrent() {
    window.articleStore.toggleBookmark(this.currentArticleId);
    this.updateBookmarkButtonUI();
  }

  updateBookmarkButtonUI() {
    if (!this.starBtn) return;
    const isBookmarked = window.articleStore.isBookmarked(this.currentArticleId);
    const starIcon = this.starBtn.querySelector('svg');
    if (isBookmarked) {
      this.starBtn.classList.add('text-amber-500');
      if (starIcon) starIcon.classList.add('fill-current');
    } else {
      this.starBtn.classList.remove('text-amber-500');
      if (starIcon) starIcon.classList.remove('fill-current');
    }
  }

  // --- Navigation & Modals ---
  updateActiveNavLinks() {
    document.querySelectorAll('.sidebar-nav-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      const linkId = href.replace(/^#\/?/, '').replace(/^wiki\//, '');
      if (linkId === this.currentArticleId) {
        link.classList.add('bg-blue-50', 'text-blue-700', 'dark:bg-gray-800', 'dark:text-blue-400', 'font-semibold');
        link.classList.remove('text-gray-700', 'dark:text-gray-300');
      } else {
        link.classList.remove('bg-blue-50', 'text-blue-700', 'dark:bg-gray-800', 'dark:text-blue-400', 'font-semibold');
        link.classList.add('text-gray-700', 'dark:text-gray-300');
      }
    });
  }

  toggleSidebar() {
    if (this.sidebar) {
      this.sidebar.classList.toggle('-translate-x-full');
    }
    if (this.sidebarOverlay) {
      this.sidebarOverlay.classList.toggle('hidden');
    }
  }

  closeSidebar() {
    if (this.sidebar) {
      this.sidebar.classList.add('-translate-x-full');
    }
    if (this.sidebarOverlay) {
      this.sidebarOverlay.classList.add('hidden');
    }
  }

  goToRandomArticle() {
    const all = window.articleStore.getAll();
    const keys = Object.keys(all);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    this.navigateToArticle(randomKey);
  }

  copyPageLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Permanent URL copied to clipboard: ' + url);
    }).catch(() => {
      prompt('Copy URL:', url);
    });
  }

  openNewArticleModal(initialTitle = '') {
    if (!this.newArticleModal) return;
    const titleInput = document.getElementById('new-modal-title');
    if (titleInput && initialTitle) titleInput.value = initialTitle;
    this.newArticleModal.classList.remove('hidden');
  }

  closeModal() {
    if (this.newArticleModal) {
      this.newArticleModal.classList.add('hidden');
    }
  }

  handleCreateArticleSubmit(e) {
    e.preventDefault();
    const titleInput = document.getElementById('new-modal-title');
    const summaryInput = document.getElementById('new-modal-summary');
    const categoryInput = document.getElementById('new-modal-category');

    const title = titleInput ? titleInput.value.trim() : '';
    if (!title) return;

    const id = title.replace(/\s+/g, '_');
    const summary = summaryInput ? summaryInput.value.trim() : '';
    const categories = categoryInput ? categoryInput.value.split(',').map(s => s.trim()).filter(Boolean) : ['General'];

    const newArt = {
      id: id,
      title: title,
      subtitle: `Article about ${title}`,
      badge: "Community Article",
      summary: summary || `Encyclopedia entry for ${title}.`,
      image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
      infobox: {
        title: title,
        rows: [
          { label: "Created By", value: "Wikipedia Contributor" },
          { label: "Date Created", value: new Date().toLocaleDateString() }
        ]
      },
      sections: [
        {
          id: "introduction",
          title: "Introduction",
          level: 2,
          content: `<p class="mb-4">${summary || `Content for ${title}.`}</p>`
        }
      ],
      references: [],
      categories: categories,
      history: [
        { revId: `rev-${Date.now()}`, date: new Date().toISOString().substring(0, 16), user: "Sonali (Contributor)", comment: "Created new article", sizeChange: "+800 bytes" }
      ],
      talk: []
    };

    window.articleStore.save(newArt);
    this.closeModal();
    this.navigateToArticle(id);
  }
}

// Global initialization when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.wikiApp = new WikiApp();

  const newArticleForm = document.getElementById('new-article-modal-form');
  if (newArticleForm) {
    newArticleForm.addEventListener('submit', (e) => window.wikiApp.handleCreateArticleSubmit(e));
  }
});
