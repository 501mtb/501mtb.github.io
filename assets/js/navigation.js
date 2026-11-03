(function(){
  const toggle=document.getElementById("menu-toggle");
  const menu=document.getElementById("main-nav");
  if(!toggle||!menu)return;
  const closeMenu=()=>{menu.classList.remove("is-open");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open navigation menu");};
  toggle.addEventListener("click",()=>{
    const opening=toggle.getAttribute("aria-expanded")!=="true";
    menu.classList.toggle("is-open",opening);
    toggle.setAttribute("aria-expanded",String(opening));
    toggle.setAttribute("aria-label",opening?"Close navigation menu":"Open navigation menu");
  });
  menu.querySelectorAll("a").forEach(link=>link.addEventListener("click",closeMenu));
  document.addEventListener("keydown",event=>{if(event.key==="Escape")closeMenu();});
  document.addEventListener("click",event=>{if(!menu.contains(event.target)&&!toggle.contains(event.target))closeMenu();});
})();
