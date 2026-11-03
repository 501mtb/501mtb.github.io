(function(){
  const lang=()=>document.getElementById("language")?.value||"en";
  const safe=value=>String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const renderUsefulLinks = () => {
  const el=document.getElementById("links-list");
  el.classList.add("useful-links-box");
  const items=[
{category:{en:"Social",fr:"Réseaux sociaux",mg:"Tambajotra sosialy"},label:"501 MTB",url:"https://www.facebook.com/501MTB",icon:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.6-4.3 4.5v1.8H7V13h2.9v8z"/></svg>'},
{category:{en:"Contact",fr:"Contact",mg:"Fifandraisana"},label:"WhatsApp · +261 34 93 715 00",url:"https://wa.me/261349371500",icon:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 2 17.7L.5 23.5l6-1.6A11.8 11.8 0 0 0 20.5 3.5ZM12 21a9.7 9.7 0 0 1-4.9-1.3l-.4-.2-3.5.9.9-3.4-.2-.4A9.6 9.6 0 1 1 12 21Zm5.3-7.2c-.3-.2-1.7-.8-2-.9s-.5-.2-.7.2-.8.9-1 1.1-.4.2-.7.1a7.8 7.8 0 0 1-2.3-1.4 8.6 8.6 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5s0-.4 0-.5-.7-1.7-.9-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.2 3 2 3.1 5 4.3c.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4s.2-1.3.2-1.4-.2-.3-.5-.4Z"/></svg>'},
{category:{en:"Contact",fr:"Contact",mg:"Fifandraisana"},label:"toamasina501mtb@gmail.com",url:"mailto:toamasina501mtb@gmail.com",icon:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5zm2 .1v.2l8 5.4 8-5.4v-.2a.5.5 0 0 0-.5-.5h-15a.5.5 0 0 0-.5.5Zm16 2.6-8 5.4-8-5.4v10.3c0 .3.2.5.5.5h15c.3 0 .5-.2.5-.5Z"/></svg>'},
{category:{en:"Location",fr:"Localisation",mg:"Toerana"},label:"Lot 099bis Andranomena, Ambodisaina, Toamasina 2",url:"https://www.google.com/maps/search/?api=1&query=Lot+099bis+Andranomena%2C+Ambodisaina%2C+Toamasina+2",icon:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7.2 7.2 0 0 0-7.2 7.2c0 5.2 7.2 12.8 7.2 12.8s7.2-7.6 7.2-12.8A7.2 7.2 0 0 0 12 2Zm0 10a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Z"/></svg>'},
{category:{en:"Website",fr:"Site web",mg:"Tranonkala"},label:"501MTB Official Website",url:"https://501mtb.github.io/",icon:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.9 9h-3.1a15.7 15.7 0 0 0-1.3-5.1A8 8 0 0 1 19.9 11ZM12 4c.9 1.2 1.8 3.6 2 7h-4c.2-3.4 1.1-5.8 2-7ZM4.1 13h3.1a15.7 15.7 0 0 0 1.3 5.1A8 8 0 0 1 4.1 13Zm3.1-2H4.1a8 8 0 0 1 4.4-5.1A15.7 15.7 0 0 0 7.2 11Zm2.8 2h4c-.2 3.4-1.1 5.8-2 7-.9-1.2-1.8-3.6-2-7Zm5.5 5.1a15.7 15.7 0 0 0 1.3-5.1h3.1a8 8 0 0 1-4.4 5.1Z"/></svg>'},
{category:{en:"Community",fr:"Communauté",mg:"Fiaraha-monina"},label:"Code of Conduct / Conduite interne",url:"./conduct-fr.html",icon:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4 5v6c0 5.2 3.4 9.1 8 11 4.6-1.9 8-5.8 8-11V5Zm-1.2 13.5-3.3-3.3 1.4-1.4 1.9 1.9 4.5-4.5 1.4 1.4Z"/></svg>'},
{category:{en:"Community",fr:"Communauté",mg:"Fiaraha-monina"},label:"Join 501MTB",url:"./join.html",icon:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5Zm8-8v3h-3v2h3v3h2v-3h3V9h-3V6Z"/></svg>'}
  ];
  el.innerHTML='<article class="card useful-links-card"><div class="useful-links-grid">'+items.map(item=>'<a class="useful-link-item" href="'+safe(item.url)+'" target="'+(item.url.startsWith("mailto:")?"_self":"_blank")+'" rel="noopener"><span class="useful-link-category">'+safe(item.category[lang()]||item.category.en)+'</span><strong>'+safe(item.label)+'</strong><span class="useful-link-icon" aria-hidden="true">'+item.icon+'</span></a>').join("")+'</div></article>';
};
  renderUsefulLinks();
  document.getElementById("language")?.addEventListener("change",renderUsefulLinks);
})();
