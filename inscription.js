document.addEventListener("DOMContentLoaded", function() {
  const pages = document.querySelectorAll(".page");
  const numpage = document.querySelector(".numpage");
  const nbPages = pages.length;
  let pageActive = 1;

  // On affiche la 1ère page du formulaire
  pages[0].style.display = "initial";

  // On récupère les boutons "Suivant" et "Précédent"
  const suivant = document.querySelector(".next");
  const precedent = document.querySelector(".prev");

  // On ajoute l'écouteur d'événement sur le bouton "Suivant"
  suivant.addEventListener("click", function() {
    // On masque la page actuelle
    pages[pageActive - 1].style.display = "none";
    // On incrémente la variable pageActive
    pageActive++;
    // On affiche la page suivante
    pages[pageActive - 1].style.display = "initial";
    // On met à jour le numéro de la page active dans l'entête
    document.querySelector(".page-num.active").classList.remove("active");
    document.querySelector("#num" + pageActive).classList.add("active");
    // On masque le bouton "Suivant" sur la dernière page
    if (pageActive === nbPages) {
      suivant.style.display = "none";
    }
    // On affiche le bouton "Précédent" s'il est caché
    if (precedent.style.display === "none") {
      precedent.style.display = "initial";
    }
  });

  // On ajoute l'écouteur d'événement sur le bouton "Précédent"
  precedent.addEventListener("click", function() {
    // On masque la page actuelle
    pages[pageActive - 1].style.display = "none";
    // On décrémente la variable pageActive
    pageActive--;
    // On affiche la page précédente
    pages[pageActive - 1].style.display = "initial";
    // On met à jour le numéro de la page active dans l'entête
    document.querySelector(".page-num.active").classList.remove("active");
    document.querySelector("#num" + pageActive).classList.add("active");
    // On masque le bouton "Précédent" sur la première page
    if (pageActive === 1) {
      precedent.style.display = "none";
    }
    // On affiche le bouton "Suivant" s'il est caché
    if (suivant.style.display === "none") {
      suivant.style.display = "initial";
    }
  });

  // On masque le bouton "Précédent" sur la première page
  precedent.style.display = "none";
});
