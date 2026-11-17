// Häkchen werden pro Browser/Gerät in localStorage gespeichert (kein Login, kein Server) -
// dafür zuverlässig ohne Anmeldung erreichbar, auch mobil.
function initChecklist(key){
  var storeKey = 'aqw:' + key;
  var state = {};
  try{ state = JSON.parse(localStorage.getItem(storeKey) || '{}'); }catch(e){}

  function apply(){
    var boxes = document.querySelectorAll('input[type=checkbox][data-id]');
    var done = 0;
    boxes.forEach(function(cb){
      var checked = !!state[cb.dataset.id];
      cb.checked = checked;
      var item = cb.closest('.item');
      if(item) item.classList.toggle('done', checked);
      if(checked) done++;
    });
    var prog = document.querySelector('[data-progress]');
    if(prog) prog.textContent = done + ' / ' + boxes.length;
    var bar = document.querySelector('[data-progressbar]');
    if(bar) bar.style.width = (boxes.length ? (100*done/boxes.length) : 0) + '%';
  }

  document.querySelectorAll('input[type=checkbox][data-id]').forEach(function(cb){
    cb.addEventListener('change', function(){
      if(cb.checked){ state[cb.dataset.id] = true; } else { delete state[cb.dataset.id]; }
      try{ localStorage.setItem(storeKey, JSON.stringify(state)); }catch(e){}
      apply();
    });
  });

  apply();
}

// Aktiven Nav-Punkt markieren
document.addEventListener('DOMContentLoaded', function(){
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.topnav a').forEach(function(a){
    if(a.getAttribute('href') === here) a.classList.add('active');
  });
});
