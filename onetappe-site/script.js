(function(){
  // sticky header shadow/compact state
  var header = document.getElementById('siteHeader');
  var onScroll = function(){
    if(window.scrollY > 10){ header.classList.add('scrolled'); }
    else{ header.classList.remove('scrolled'); }
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // mobile menu
  var toggle = document.getElementById('menuToggle');
  var panel = document.getElementById('mobilePanel');
  panel.style.display = 'block';
  toggle.addEventListener('click', function(){
    panel.classList.toggle('open');
  });
  panel.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ panel.classList.remove('open'); });
  });

  // faq accordion
  document.querySelectorAll('[data-faq]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = btn.closest('.faq-item');
      var answer = item.querySelector('.faq-a');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(openItem){
        if(openItem !== item){
          openItem.classList.remove('open');
          openItem.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      if(isOpen){
        item.classList.remove('open');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // scroll reveal
  try{
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  }catch(err){
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
  }
})();
