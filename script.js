const glow = document.querySelector('.cursor-glow');

window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        document.body.style.opacity = '0';

        setTimeout(() => {
            window.location = this.href;
        }, 300);
    });
});