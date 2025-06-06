/* ────────────────────────────────────────────────────────────────
   Terminal Overlay / Preview Controller
   ──────────────────────────────────────────────────────────────── */

   document.addEventListener('DOMContentLoaded', () => {
    /* ╭── Element hooks ───────────────────────────────────────────╮ */
    const openTerminalBtn   = document.getElementById('openTerminal');   // button in hero
    const terminalOverlay   = document.getElementById('terminalOverlay'); // full-screen overlay
    const closeTerminalBtn = document.getElementById('closeTerminal');
    const minimizeBtn       = document.getElementById('minimizeTerminal'); // optional 🔽
    const maximizeBtn       = document.getElementById('maximizeTerminal'); // optional ⬜
    const terminalWindow    = document.querySelector('.overlay-content');  // inner window
    const terminalContent   = document.getElementById('terminalContent');  // div where HTML is injected
  
    /* ╭── State ───────────────────────────────────────────────────╮ */
    let isMaximized = false;
    let originalSize = { width: '90%', height: '80vh' };
  
    /* ╭── Helpers ─────────────────────────────────────────────────╮ */
  
    // Fetch <div class="terminal-content"> from terminal.html
    async function loadTerminalContent () {
      if (!terminalContent) return;                                      // guard
      try {
        const res   = await fetch('terminal.html');
        const html  = await res.text();
        const temp  = new DOMParser().parseFromString(html, 'text/html');
        const inner = temp.querySelector('.terminal-content');
        terminalContent.innerHTML = inner ? inner.innerHTML
                                          : 'No .terminal-content found 🙁';
        initializeTerminal(); // set up command handler
      } catch (err) {
        console.error(err);
        terminalContent.textContent =
          'Error loading terminal content. Please try again.';
      }
    }
  
    // Attach Enter-key handler to the fake terminal input
    function initializeTerminal () {
      const input = terminalContent.querySelector('.terminal-input');
      if (!input) return;
      input.focus();
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const cmd = e.target.value.trim();
          if (cmd && typeof executeCommand === 'function') {
            executeCommand(cmd);  // ← defined in your terminal.js
          }
          e.target.value = '';
        }
      });
    }
  
    // Quick CLI-style greeting in the preview area
    function initPreviewContent () {
      const preview = document.querySelector('.terminal-preview-content');
      if (!preview) return;
      preview.innerHTML = `
  <div style="color:#00ff00;font-family:'Fira Code',monospace;">
  guest@portfolio:~$ whoami<br>
  Yash – Web Developer<br><br>
  guest@portfolio:~$ skills<br>
  Frontend: React, Vue<br>
  Backend: Node, Python<br>
  Tools: Git, Docker, VS Code<br><br>
  guest@portfolio:~$ <span class="cursor"></span>
  </div>`;
    }
  
    // Blinking cursor CSS (injected once)
    (function injectCursorCSS () {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes blink{0%,50%{opacity:1}51%,100%{opacity:0}}
        .cursor{display:inline-block;width:8px;height:16px;
                background:#00ff00;animation:blink 1s infinite;vertical-align:middle;}`;
      document.head.appendChild(style);
    })();
  
    /* ╭── Open / Close / Min / Max ────────────────────────────────╮ */
  
    if (openTerminalBtn && terminalOverlay && closeTerminalBtn) {
        openTerminalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            terminalOverlay.classList.remove('hidden');
            // Trigger reflow
            terminalOverlay.offsetHeight;
            terminalOverlay.classList.add('active');
        });

        closeTerminalBtn.addEventListener('click', () => {
            terminalOverlay.classList.remove('active');
            // Wait for animation to complete before hiding
            setTimeout(() => {
                terminalOverlay.classList.add('hidden');
            }, 300);
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !terminalOverlay.classList.contains('hidden')) {
                closeTerminalBtn.click();
            }
        });
    }
  
    minimizeBtn?.addEventListener('click', () =>
      terminalOverlay.classList.add('hidden')
    );
  
    maximizeBtn?.addEventListener('click', () => {
      if (!terminalWindow) return;
      if (!isMaximized) {
        originalSize = {
          width:  terminalWindow.style.width  || '90%',
          height: terminalWindow.style.height || '80vh',
        };
        terminalWindow.style.width  = '100%';
        terminalWindow.style.height = '100vh';
        terminalWindow.style.borderRadius = '0';
      } else {
        terminalWindow.style.width  = originalSize.width;
        terminalWindow.style.height = originalSize.height;
        terminalWindow.style.borderRadius = '8px';
      }
      isMaximized = !isMaximized;
    });
  
    // Click on dark backdrop = close overlay
    terminalOverlay?.addEventListener('click', (e) => {
      if (e.target === terminalOverlay) terminalOverlay.classList.add('hidden');
    });
  
    /* ╭── Init preview (optional small terminal view) ─────────────╮ */
    initPreviewContent();
  });
  
  /* ────────────────────────────────────────────────────────────────
     Global page fade-in
     ──────────────────────────────────────────────────────────────── */
  
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });
  