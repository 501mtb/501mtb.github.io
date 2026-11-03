(async function loadWorkbookContent(){
  const lang = () => document.getElementById("language").value || "en";
  const safe = value => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const val = (row, key) => row[key] == null ? "" : String(row[key]).trim();
  const visible = rows => rows.filter(r => String(r.published || "").trim().toLowerCase() === "yes");
  const readSheet = (wb, name) => wb.Sheets[name] ? XLSX.utils.sheet_to_json(wb.Sheets[name], {defval:"", raw:false}) : [];
  function renderCards(target, rows, build, emptyText){
    const el=document.getElementById(target);
    el.innerHTML = rows.length ? rows.map(build).join("") : '<article class="card"><p>'+safe(emptyText)+'</p></article>';
  }
  function localized(row, base){
    // Keep each language isolated: never fill a missing MG field with French (or vice versa).
    const l=lang();
    return val(row, base+"_"+l);
  }
  try {
    const response = await fetch("./Classeur_501MTB_V2.xlsx?v=3", {cache:"no-store"});
    if (!response.ok) throw new Error("Workbook not found");
    const workbook = XLSX.read(await response.arrayBuffer(), {type:"array", cellDates:true});
    const pastEvents = readSheet(workbook,"Events").filter(r => val(r,"id") && val(r,"status").toLowerCase() === "completed");
    window.__501MTB_EVENT_ROWS__ = pastEvents;
    window.dispatchEvent(new CustomEvent("501mtb:history-ready", {detail:{events:pastEvents}}));
    const dateLabel = value => {
      const s=String(value ?? "").trim();
      if (/^\d{4}-\d{2}-\d{2}/.test(s)) { const [y,m,d]=s.slice(0,10).split("-"); return d+"/"+m+"/"+y; }
      if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)) { const [d,m,y]=s.split("/"); return d.padStart(2,"0")+"/"+m.padStart(2,"0")+"/"+y; }
      return s;
    };
    const riders = visible(readSheet(workbook,"Riders")).filter(r => val(r,"id") && val(r,"name"));
    const leaders = visible(readSheet(workbook,"Leaders")).filter(r => val(r,"id") && val(r,"name"));
    const image = (path, alt, preserveRatio = false) => path ? '<img src="'+safe(path)+'" alt="'+safe(alt)+'" loading="lazy" style="display:block;width:100%;height:auto;max-height:'+(preserveRatio ? "none" : "210px")+' ;object-fit:'+(preserveRatio ? "contain" : "cover")+' ;margin-bottom:12px">' : "";
    const storyImage = (path, name, url, context) => '<div class="story-photo">' + image(path,(name ? name+" — " : "")+(context || "501MTB community photo"),true) + (url ? '<a class="story-link" href="'+safe(url)+'" target="_blank" rel="noopener" aria-label="Open '+safe(name)+'" title="Open link">↗</a>' : '') + '</div>';
    const eventImage = (path,alt,url) => { const src=String(path||"").trim(); const descriptiveAlt=(alt ? alt+" — " : "")+"501MTB mountain biking ride or event in Madagascar"; return src ? '<div class="event-photo">' + image(src,descriptiveAlt) + (url ? '<a class="story-link" href="'+safe(url)+'" target="_blank" rel="noopener" aria-label="More information: '+safe(alt)+'" title="More information">↗</a>' : '') + '</div>' : ""; };
    const pastRideCard = r => '<article class="card past-ride-card">'+eventImage(val(r,"image"),localized(r,"title"),val(r,"url"))+'<div class="ride-glass"><div class="ride-glass-side ride-glass-date"><strong>'+safe(dateLabel(val(r,"date_start")))+'</strong></div><div class="ride-glass-side ride-glass-location"><strong>'+safe(localized(r,"location"))+'</strong></div><div class="ride-glass-side ride-glass-title"><strong>'+safe(localized(r,"title"))+'</strong></div></div></article>';
    const renderEventLists = () => { renderCards("past-events-list",pastEvents,pastRideCard,lang()==="fr"?"Aucune sortie terminée publiée.":lang()==="mg"?"Tsy mbola misy dia vita.":"No completed rides or past events published."); document.querySelectorAll("[data-event-heading]").forEach(el=>{const k=el.dataset.eventHeading;el.textContent=lang()==="fr"?(k==="upcoming"?"Sorties et événements à venir":"Sorties terminées et événements passés"):lang()==="mg"?(k==="upcoming"?"Dia sy hetsika ho avy":"Dia vita sy hetsika lasa"):(k==="upcoming"?"Upcoming rides & events":"Completed rides & past events");}); };
    renderEventLists();
    renderCards("riders-list", riders, r => '<article class="card profile-card">'+storyImage(val(r,"photo"),val(r,"name"),val(r,"profile_url"),"501MTB mountain bike rider")+'<div class="profile-badge">'+safe(val(r,"category") || val(r,"country") || "Rider")+'</div><h3 class="profile-name">'+safe(val(r,"name"))+'</h3><p class="profile-extra">'+safe(val(r,"country"))+'</p></article>', "Rider profiles will appear here.");
    renderCards("leaders-list", leaders, r => '<article class="card profile-card">'+storyImage(val(r,"photo"),val(r,"name"),val(r,"profile_url"),"501MTB team member")+'<div class="profile-badge">'+safe(val(r,"role_en") || val(r,"role") || "Leader")+'</div><h3 class="profile-name">'+safe(val(r,"name"))+'</h3><p class="profile-extra">'+safe(localized(r,"bio"))+'</p></article>', "Team profiles will appear here.");

    document.getElementById("language").addEventListener("change", () => {
      renderEventLists();
      renderCards("riders-list", riders, r => '<article class="card profile-card">'+storyImage(val(r,"photo"),val(r,"name"),val(r,"profile_url"),"501MTB mountain bike rider")+'<div class="profile-badge">'+safe(val(r,"category") || val(r,"country") || "Rider")+'</div><h3 class="profile-name">'+safe(val(r,"name"))+'</h3><p class="profile-extra">'+safe(val(r,"country"))+'</p></article>', "Rider profiles will appear here.");
      renderCards("leaders-list", leaders, r => '<article class="card profile-card">'+storyImage(val(r,"photo"),val(r,"name"),val(r,"profile_url"),"501MTB team member")+'<div class="profile-badge">'+safe(val(r,"role_en") || val(r,"role") || "Leader")+'</div><h3 class="profile-name">'+safe(val(r,"name"))+'</h3><p class="profile-extra">'+safe(localized(r,"bio"))+'</p></article>', "Team profiles will appear here.");
    });
  } catch(error) {
    // Keep the crawlable HTML fallback content visible if the workbook cannot be loaded.
    console.warn("501MTB workbook content could not be refreshed; keeping static page content.", error);
  }
})();
