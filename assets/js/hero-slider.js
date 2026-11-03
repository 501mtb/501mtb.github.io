(function(){
  const container=document.getElementById("hero-slides");
  const hero=document.getElementById("home");
  if(!container||!hero)return;
  const safeUrl=value=>String(value||"").trim();
  const imageFor=(row)=>{
    const path=safeUrl(row.image);
    if(!path)return "";
    if(/^https?:\/\//i.test(path))return path;
    const clean=path.replace(/^\.\//,"").replace(/^\//,"");
    if(clean.startsWith("images/event/"))return "./assets/"+clean;
    if(clean.startsWith("assets/")||clean.startsWith("../"))return "./"+clean;
    if(clean.includes("/"))return "./"+clean;
    return "./assets/images/event/"+clean;
  };
  const startWithEvents=(rows)=>{
    try{
      const unique=[...new Set((rows||[]).map(imageFor).filter(Boolean))];
      if(!unique.length)return;
      for(let i=unique.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[unique[i],unique[j]]=[unique[j],unique[i]];}
      container.innerHTML=unique.map((url,i)=>'<div class="hero-slide'+(i===0?' is-active':'')+'" style="background-image:url(&quot;'+url.replace(/&/g,"%26").replace(/&quot;/g,"%22")+'&quot;)" aria-hidden="true"></div>').join("");
      const slides=[...container.querySelectorAll(".hero-slide")];
      if(slides.length<2)return;
      let index=0,timer=null,resumeTimer=null,scrolling=false;
      const mobileView=()=>window.matchMedia("(max-width:720px)").matches;
      const stop=()=>{if(timer){clearInterval(timer);timer=null;}};
      const activateNext=()=>{slides[index].classList.remove("is-active","slide-from-top","slide-from-bottom","pan-left","pan-right");index=(index+1)%slides.length;slides[index].classList.remove("slide-from-top","slide-from-bottom","pan-left","pan-right");if(mobileView())slides[index].classList.add(Math.random()<0.5?"pan-left":"pan-right");else slides[index].classList.add(Math.random()<0.5?"slide-from-top":"slide-from-bottom");void slides[index].offsetWidth;slides[index].classList.add("is-active");};
      const start=()=>{stop();if(document.hidden||scrolling)return;timer=setInterval(activateNext,7000);};
      const onScroll=()=>{scrolling=true;stop();clearTimeout(resumeTimer);resumeTimer=setTimeout(()=>{scrolling=false;start();},1800);};
      window.addEventListener("scroll",onScroll,{passive:true});
      document.addEventListener("visibilitychange",()=>{if(document.hidden)stop();else start();});
      start();
    }catch(error){/* Keep the existing dark hero background if event photos cannot load. */}
  };
  if(Array.isArray(window.__501MTB_EVENT_ROWS__))startWithEvents(window.__501MTB_EVENT_ROWS__);
  else window.addEventListener("501mtb:history-ready",event=>startWithEvents(event.detail?.events||[]),{once:true});
})();
