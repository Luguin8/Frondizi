// Asegurar que la página vuelva al inicio al recargar
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.onload = function() {
  window.scrollTo(0, 0);
}

// Manejar el scroll suave con offset personalizado
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const offset = targetId === '#header' ? 0 : 76; // Sin offset para el header, 76px para las secciones
      const targetPosition = targetElement.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.custom-navbar');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navLogo = document.querySelector('.nav-logo');
  const header = document.querySelector('header');
  
  // Función para manejar el scroll del navbar
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Escuchar el evento scroll
  window.addEventListener('scroll', handleNavbarScroll);

  // Función para cerrar el menú
  function closeMenu() {
    if (navbarCollapse.classList.contains('show')) {
      navbarToggler.click();
    }
  }

  // Manejar clicks en los enlaces del navbar
  document.querySelectorAll('.nav-link, .navbar-brand').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      const navbarHeight = document.querySelector('.custom-navbar').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      // Cerrar el menú después de hacer clic
      closeMenu();
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  // Activar el ítem del menú según la sección visible
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 77;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });

  function checkScroll() {
    // Obtener la posición del final del header
    const headerBottom = header.offsetTop + header.offsetHeight;
    
    // Verificar si hemos scrolleado más allá del header
    if (window.scrollY >= headerBottom - navbar.offsetHeight) {
      navLogo.classList.add('visible');
      navbar.classList.add('scrolled');
    } else {
      navLogo.classList.remove('visible');
      navbar.classList.remove('scrolled');
    }
  }

  // Verificar el scroll al cargar la página
  checkScroll();

  // Verificar el scroll cuando el usuario se desplaza
  window.addEventListener('scroll', checkScroll);

  // Manejar el menú móvil
  navbarToggler.addEventListener('click', function() {
    const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
    
    // Si estamos en el header y el menú se está abriendo, agregar temporalmente la clase scrolled
    if (!navbar.classList.contains('scrolled') && !isExpanded) {
      navbar.classList.add('temp-background');
    } else if (navbar.classList.contains('temp-background') && isExpanded) {
      navbar.classList.remove('temp-background');
    }
  });

  // Cerrar el menú móvil al hacer clic en un enlace
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
      }
    });
  });


});
