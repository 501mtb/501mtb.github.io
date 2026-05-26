// attendre que le HTML soit chargé
document.addEventListener("DOMContentLoaded", () => {

    // éléments
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    // ouvrir / fermer menu
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    // fermer le menu quand on clique sur un lien
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburger.classList.remove("active");
        });
    });

});

// bouton shop
function comingSoon() {
    alert("Shop coming soon 🚧");
}


