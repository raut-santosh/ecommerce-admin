window.onload = function() {
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('main');
    const toggleIcon = document.getElementById('toggleIcon');

    toggleIcon?.addEventListener('click', () => {
        const currentLeft = window.getComputedStyle(sidebar).getPropertyValue('left');
        
        sidebar.style.left = currentLeft === '0px' ? '-300px' : '0px';
        main.style.marginLeft = currentLeft === '0px' ? '0px' : '300px';
    });
};
