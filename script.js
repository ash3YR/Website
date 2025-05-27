document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.terminal-controls .close');
    const terminalContainer = document.querySelector('.terminal-container');
    const mainContent = document.querySelector('.main-content');

    closeBtn.addEventListener('click', () => {
        terminalContainer.style.display = 'none';
        mainContent.classList.add('active');
    });
}); 