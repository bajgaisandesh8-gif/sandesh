/* SANDESH // ACCESSIBILITY + UX PASS */
(function(){
  "use strict";
  function boot(){
    if(document.documentElement.dataset.sbA11y === "1") return;
    document.documentElement.dataset.sbA11y = "1";

    const live=document.getElementById("a11yLive")||document.createElement("div");
    live.className="a11y-live"; live.setAttribute("aria-live","polite"); live.setAttribute("aria-atomic","true"); live.id="a11yLive";
    if(!live.isConnected) document.body.appendChild(live);
    const announce=text=>{live.textContent="";requestAnimationFrame(()=>{live.textContent=text})};

    // Filter controls behave like an accessible tablist with arrow-key navigation.
    document.querySelectorAll('[role="tablist"]').forEach(list=>{
      list.querySelectorAll('.filter-btn').forEach(btn=>{
        btn.setAttribute('role','tab');
        btn.setAttribute('tabindex',btn.getAttribute('aria-selected')==='true'?'0':'-1');
        btn.addEventListener('keydown',e=>{
          if(!['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Home','End'].includes(e.key)) return;
          const tabs=[...list.querySelectorAll('.filter-btn')]; if(!tabs.length)return;
          let i=tabs.indexOf(btn);
          if(e.key==='Home')i=0; else if(e.key==='End')i=tabs.length-1; else i=(i+(e.key==='ArrowRight'||e.key==='ArrowDown'?1:-1)+tabs.length)%tabs.length;
          e.preventDefault();tabs[i].focus();tabs[i].click();
        });
      });
      const sync=()=>list.querySelectorAll('.filter-btn').forEach(b=>b.setAttribute('tabindex',b.getAttribute('aria-selected')==='true'?'0':'-1'));
      list.addEventListener('click',sync);
    });

    // Announce the dynamically-created project dialog. Focus management is owned by projects.js.
    let modalObserver=new MutationObserver(()=>{
      const modal=document.getElementById('projectModal'); if(!modal||modal.dataset.a11yBound==='1')return;
      modal.dataset.a11yBound='1';
      const sync=new MutationObserver(()=>{
        if(modal.classList.contains('open')) announce('Project details dialog opened');
        else announce('Project details dialog closed');
      });
      sync.observe(modal,{attributes:true,attributeFilter:['class']});
    });
    modalObserver.observe(document.body,{childList:true,subtree:true});

    // Contact form: connect visible errors to their fields and provide consistent status announcements.
    const form=document.getElementById('contactForm');
    if(form){
      const fields=[...form.querySelectorAll('input[required],textarea[required],select[required]')];
      fields.forEach(field=>{
        const err=document.getElementById('err-'+field.id.replace('cf-',''));
        if(err){err.id=err.id;field.setAttribute('aria-describedby',err.id)}
        field.addEventListener('input',()=>{field.removeAttribute('aria-invalid');field.closest('.field')?.classList.remove('has-error')});
        field.addEventListener('blur',()=>{
          if(field.checkValidity())return;
          field.setAttribute('aria-invalid','true');field.closest('.field')?.classList.add('has-error');
        });
      });
      form.addEventListener('submit',()=>{
        requestAnimationFrame(()=>{
          const invalid=fields.filter(f=>!f.checkValidity());
          invalid.forEach(f=>{f.setAttribute('aria-invalid','true');f.closest('.field')?.classList.add('has-error')});
          if(invalid.length){announce(`${invalid.length} required field${invalid.length===1?' is':'s are'} invalid`);invalid[0].focus()}
        });
      },true);
    }

  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
