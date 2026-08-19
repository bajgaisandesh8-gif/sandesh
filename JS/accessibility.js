/* SANDESH // ACCESSIBILITY + UX PASS */
(function(){
  "use strict";
  function boot(){
    if(document.documentElement.dataset.sbA11y === "1") return;
    document.documentElement.dataset.sbA11y = "1";

    const style=document.createElement("style");
    style.textContent=`
      .skip-link{position:fixed;left:12px;top:12px;z-index:1000001;padding:10px 14px;background:#07120f;color:#64f3b0;border:1px solid #64f3b0;font:700 10px "JetBrains Mono",monospace;letter-spacing:.08em;text-decoration:none;transform:translateY(-160%);transition:transform .18s ease}.skip-link:focus{transform:none;outline:2px solid #eafff5;outline-offset:3px}
      :focus-visible{outline:2px solid #64f3b0!important;outline-offset:3px!important}
      button,a,input,textarea,select{font-family:inherit}
      .field-error{display:block;min-height:1.2em;color:#ff8f8f;font-size:.72rem;margin-top:5px}
      .field.has-error input,.field.has-error textarea,.field.has-error select{border-color:#ff6666!important;box-shadow:0 0 0 2px rgba(255,102,102,.08)}
      .a11y-live{position:fixed;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
      @media(prefers-reduced-motion:reduce){.skip-link{transition:none}}
    `;
    document.head.appendChild(style);

    const live=document.createElement("div");
    live.className="a11y-live"; live.setAttribute("aria-live","polite"); live.setAttribute("aria-atomic","true"); live.id="a11yLive";
    document.body.appendChild(live);
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

    // Mobile navigation gets focus management instead of trapping the user in the page.
    const nav=document.getElementById('navLinks'), toggle=document.getElementById('navToggle');
    if(nav&&toggle){
      let lastTrigger=null;
      const observer=new MutationObserver(()=>{
        const open=nav.classList.contains('is-open');
        if(open){lastTrigger=document.activeElement;const first=nav.querySelector('a');if(first)requestAnimationFrame(()=>first.focus());announce('Navigation menu opened');}
        else if(lastTrigger&&typeof lastTrigger.focus==='function'){requestAnimationFrame(()=>lastTrigger.focus());}
      });
      observer.observe(nav,{attributes:true,attributeFilter:['class']});
      nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>announce('Navigation menu closed')));
    }

    // Robust focus trap + focus restoration for the dynamically-created project dialog.
    let modalObserver=new MutationObserver(()=>{
      const modal=document.getElementById('projectModal'); if(!modal||modal.dataset.a11yBound==='1')return;
      modal.dataset.a11yBound='1';
      let opener=null;
      const remember=()=>{opener=document.activeElement};
      const trap=e=>{
        if(!modal.classList.contains('open'))return;
        if(e.key==='Escape')return; // projects.js owns closing the dialog
        if(e.key!=='Tab')return;
        const focusables=[...modal.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])')];
        if(!focusables.length)return;
        const first=focusables[0],last=focusables[focusables.length-1];
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
        else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
      };
      modal.addEventListener('keydown',trap);
      const sync=new MutationObserver(()=>{
        if(modal.classList.contains('open')){remember();announce('Project details dialog opened');}
        else if(opener&&typeof opener.focus==='function'){requestAnimationFrame(()=>opener.focus());announce('Project details dialog closed');}
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

    // Make dynamically-generated interactive cards keyboard-safe without changing their visual behavior.
    const cardObserver=new MutationObserver(()=>{
      document.querySelectorAll('#skillsGrid .skill-card,#certsGrid .cert-card').forEach(card=>{
        if(!card.hasAttribute('tabindex'))card.setAttribute('tabindex','0');
      });
    });
    cardObserver.observe(document.body,{childList:true,subtree:true});

    // Keep Escape behavior predictable for overlays and menus.
    document.addEventListener('keydown',e=>{
      if(e.key!=='Escape')return;
      const openMenu=document.getElementById('navLinks');
      if(openMenu?.classList.contains('is-open')) document.getElementById('navToggle')?.focus();
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
