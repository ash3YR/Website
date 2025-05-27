let bootComplete = false;
let currentDirectory = '~';
let commandHistory = [];
let historyIndex = -1;

const filesystem = {
    '~': {
        'README.md': 'Welcome to my portfolio! Use the available commands to explore my work.',
        'about.txt': `John Doe - Full Stack Developer

I'm a passionate developer with 5+ years of experience building web applications and systems. I love working with modern technologies and solving complex problems.

Skills:
- Frontend: React, Vue.js, JavaScript, TypeScript, CSS
- Backend: Node.js, Python, Go, PostgreSQL, MongoDB
- DevOps: Docker, Kubernetes, AWS, CI/CD
- Tools: Git, Linux, VS Code, Vim

Currently looking for new opportunities where I can contribute to meaningful projects and continue growing as a developer.`,
        'projects/': 'directory',
        'skills/': 'directory',
        'contact.txt': `Contact Information:

Email: john.doe@email.com
LinkedIn: https://linkedin.com/in/johndoe
GitHub: https://github.com/johndoe
Website: https://johndoe.dev
Phone: +1 (555) 123-4567

Feel free to reach out! I'm always interested in discussing new opportunities or interesting projects.`,
        'resume.pdf': 'Binary file - John_Doe_Resume.pdf',
        'portfolio': 'executable'
    },
    '~/projects': {
        '../': 'directory',
        'ecommerce-platform/': 'directory',
        'task-manager/': 'directory',
        'weather-app/': 'directory',
        'portfolio-site/': 'directory'
    },
    '~/skills': {
        '../': 'directory',
        'frontend.json': '{"react": 90, "javascript": 95, "css": 85, "typescript": 80}',
        'backend.json': '{"nodejs": 88, "python": 82, "databases": 75, "apis": 90}',
        'devops.json': '{"docker": 70, "aws": 65, "linux": 85, "git": 95}'
    }
};

// Boot sequence
setTimeout(() => {
    document.getElementById('bootScreen').classList.add('hidden');
    document.getElementById('terminalContent').classList.remove('hidden');
    bootComplete = true;
    focusInput();
}, 4000);

function focusInput() {
    document.getElementById('terminalInput').focus();
}

function addCommandToHistory(command, output) {
    const historyDiv = document.getElementById('commandHistory');
    
    const commandLine = document.createElement('div');
    commandLine.className = 'command-line';
    commandLine.innerHTML = `
        <span class="prompt">guest@portfolio:${currentDirectory}$</span>
        <span class="command">${command}</span>
    `;
    
    const outputDiv = document.createElement('div');
    outputDiv.className = 'output';
    outputDiv.innerHTML = output;
    
    historyDiv.appendChild(commandLine);
    historyDiv.appendChild(outputDiv);
    
    // Scroll to bottom
    document.getElementById('terminalContent').scrollTop = 
        document.getElementById('terminalContent').scrollHeight;
}

function executeCommand(command) {
    const args = command.trim().split(' ');
    const cmd = args[0].toLowerCase();
    
    commandHistory.push(command);
    historyIndex = commandHistory.length;
    
    let output = '';
    
    switch(cmd) {
        case 'help':
            output = `
<div class="help-section">
<strong>Available Commands:</strong><br>
• <code>ls</code> - List files and directories<br>
• <code>cat [file]</code> - Display file contents<br>
• <code>cd [directory]</code> - Change directory<br>
• <code>./portfolio</code> - Run portfolio application<br>
• <code>skills</code> - Show technical skills<br>
• <code>projects</code> - List all projects<br>
• <code>contact</code> - Get contact information<br>
• <code>resume</code> - Display resume<br>
• <code>clear</code> - Clear terminal<br>
• <code>neofetch</code> - System information<br>
• <code>whoami</code> - User information<br>
• <code>history</code> - Command history
</div>`;
            break;
            
        case 'ls':
            const currentPath = currentDirectory === '~' ? '~' : currentDirectory;
            const contents = filesystem[currentPath];
            if (contents) {
                output = '<div class="file-listing">';
                Object.keys(contents).forEach(item => {
                    const className = contents[item] === 'directory' ? 'directory' : 
                                   contents[item] === 'executable' ? 'executable' : '';
                    output += `<div class="file-item ${className}">${item}</div>`;
                });
                output += '</div>';
            } else {
                output = 'Directory not found.';
            }
            break;
            
        case 'cat':
            if (args[1]) {
                const currentPath = currentDirectory === '~' ? '~' : currentDirectory;
                const file = filesystem[currentPath] && filesystem[currentPath][args[1]];
                if (file && file !== 'directory' && file !== 'executable') {
                    output = `<pre>${file}</pre>`;
                } else {
                    output = `cat: ${args[1]}: No such file or directory`;
                }
            } else {
                output = 'Usage: cat [filename]';
            }
            break;
            
        case 'cd':
            if (args[1]) {
                if (args[1] === '..') {
                    currentDirectory = '~';
                } else if (args[1].startsWith('~/')) {
                    const newPath = args[1];
                    if (filesystem[newPath]) {
                        currentDirectory = newPath;
                    } else {
                        output = `cd: ${args[1]}: No such file or directory`;
                    }
                } else {
                    const newPath = currentDirectory === '~' ? `~/${args[1]}` : `${currentDirectory}/${args[1]}`;
                    if (filesystem[newPath]) {
                        currentDirectory = newPath;
                    } else {
                        output = `cd: ${args[1]}: No such file or directory`;
                    }
                }
            } else {
                currentDirectory = '~';
            }
            break;
            
        case 'whoami':
            output = `John Doe - Full Stack Developer<br>
Location: San Francisco, CA<br>
Status: Available for new opportunities<br>
Interests: Linux, JavaScript, Python, DevOps`;
            break;
            
        case 'skills':
            output = `
<div class="project-card">
<strong>Technical Skills</strong><br><br>
<strong>Frontend Development:</strong><br>
JavaScript/TypeScript <div class="skill-bar"><div class="skill-progress" style="width: 95%"></div></div>
React/Vue.js <div class="skill-bar"><div class="skill-progress" style="width: 90%"></div></div>
CSS/Sass <div class="skill-bar"><div class="skill-progress" style="width: 85%"></div></div><br>

<strong>Backend Development:</strong><br>
Node.js <div class="skill-bar"><div class="skill-progress" style="width: 88%"></div></div>
Python <div class="skill-bar"><div class="skill-progress" style="width: 82%"></div></div>
Databases <div class="skill-bar"><div class="skill-progress" style="width: 75%"></div></div><br>

<strong>DevOps & Tools:</strong><br>
Linux <div class="skill-bar"><div class="skill-progress" style="width: 85%"></div></div>
Git <div class="skill-bar"><div class="skill-progress" style="width: 95%"></div></div>
Docker <div class="skill-bar"><div class="skill-progress" style="width: 70%"></div></div>
</div>`;
            break;
            
        case 'projects':
            output = `
<div class="project-card">
<strong>🛒 E-Commerce Platform</strong><br>
Full-featured online store with user auth, payment processing, and inventory management.<br>
<em>Tech: React, Node.js, MongoDB, Stripe API</em>
</div>

<div class="project-card">
<strong>📋 Task Management System</strong><br>
Collaborative project management tool with real-time updates and team features.<br>
<em>Tech: Vue.js, Express, Socket.io, PostgreSQL</em>
</div>

<div class="project-card">
<strong>🌤️ Weather Dashboard</strong><br>
Responsive weather app with beautiful data visualizations and forecasts.<br>
<em>Tech: JavaScript, Chart.js, OpenWeather API</em>
</div>

<div class="project-card">
<strong>💼 This Portfolio Site</strong><br>
Interactive terminal-based portfolio inspired by JSLinux.<br>
<em>Tech: HTML5, CSS3, JavaScript</em>
</div>`;
            break;
            
        case 'contact':
            output = `
<div class="project-card">
<strong>📧 Contact Information</strong><br><br>
<strong>Email:</strong> john.doe@email.com<br>
<strong>LinkedIn:</strong> linkedin.com/in/johndoe<br>
<strong>GitHub:</strong> github.com/johndoe<br>
<strong>Website:</strong> johndoe.dev<br>
<strong>Phone:</strong> +1 (555) 123-4567<br><br>
<em>Feel free to reach out for opportunities or collaboration!</em>
</div>`;
            break;
            
        case 'neofetch':
            output = `
<pre style="color: #4a90e2;">
        _,met$$$$$gg.          guest@portfolio 
     ,g$$$$$$$$$$$$$$$P.       ──────────────────
   ,g$$P"     """Y$$.".        <strong>OS:</strong> Portfolio Linux x86_64
  ,$$P'              \`$$$.     <strong>Host:</strong> Terminal Portfolio v2.1.0
 ',$$P       ,ggs.     \`$$b:   <strong>Kernel:</strong> 5.15.0-portfolio-custom
 \`d$$'     ,$P"'   .    $$$    <strong>Uptime:</strong> ${Math.floor(Date.now() / 60000)} mins
  $$P      d$'     ,    $$P    <strong>Packages:</strong> 42 (npm), 18 (pip)
  $$:      $$.   -    ,d$$'    <strong>Shell:</strong> bash 5.1.16
  $$;      Y$b._   _,d$P'      <strong>Resolution:</strong> ${window.innerWidth}x${window.innerHeight}
  Y$$.    \`."Y$$$$P"'         <strong>DE:</strong> Terminal
  \`$$b      "-.__             <strong>WM:</strong> Awesome
   \`Y$$                       <strong>Theme:</strong> Matrix Green
    \`Y$$.                     <strong>Icons:</strong> Awesome Font
     \`$$b.                    <strong>Terminal:</strong> Custom Terminal
      \`Y$$b.                  <strong>CPU:</strong> Intel i7-9700K (8) @ 3.6GHz
        \`"Y$b._               <strong>Memory:</strong> 2048MiB / 16384MiB
            \`"""
</pre>`;
            break;
            
        case './portfolio':
            output = `
<div class="typewriter">
Launching Portfolio Application...
</div>
<br>
<div class="project-card">
<strong>🚀 Portfolio Application Started</strong><br><br>
Welcome to my interactive portfolio! This terminal interface showcases my work in a unique, developer-focused way.<br><br>
<strong>Features:</strong><br>
• Interactive command-line interface<br>
• File system navigation<br>
• Real-time command execution<br>
• Responsive design<br>
• JSLinux-inspired aesthetic<br><br>
<em>Continue exploring with the available commands!</em>
</div>`;
            break;
            
        case 'history':
            output = commandHistory.map((cmd, i) => `${i + 1}  ${cmd}`).join('<br>');
            break;
            
        case 'clear':
            document.getElementById('commandHistory').innerHTML = '';
            return;
            
        case '':
            break;
            
        default:
            output = `bash: ${cmd}: command not found<br><br>Type 'help' to see available commands.`;
    }
    
    if (cmd !== 'clear') {
        addCommandToHistory(command, output);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('terminalInput');
    const closeBtn = document.querySelector('.terminal-controls .close');
    
    input.addEventListener('keydown', function(e) {
        if (!bootComplete) return;
        
        if (e.key === 'Enter') {
            const command = this.value;
            this.value = '';
            executeCommand(command);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                this.value = commandHistory[historyIndex] || '';
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                this.value = commandHistory[historyIndex] || '';
            } else {
                historyIndex = commandHistory.length;
                this.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            // Tab completion could be implemented here
        }
    });
    
    // Keep input focused
    document.addEventListener('click', function() {
        if (bootComplete) {
            input.focus();
        }
    });

    // Handle close button click
    closeBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});

// Matrix rain effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.className = 'matrix-bg';
    document.body.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '0123456789ABCDEF';
    const charSize = 14;
    const columns = canvas.width / charSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff00';
        ctx.font = charSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * charSize, drops[i] * charSize);
            
            if (drops[i] * charSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 100);
}

createMatrixRain(); 