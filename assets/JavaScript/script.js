let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (slides.length === 0 || dots.length === 0) {
    console.error("No slides or dots found.");
    return;
  }
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

let slideInterval = setInterval(function() {
  plusSlides(1);
}, 5000);

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(function() {
    plusSlides(1);
  }, 5000);
}

document.querySelectorAll('.prev, .next, .dot').forEach(element => {
  element.addEventListener('click', resetInterval);
});

document.addEventListener('DOMContentLoaded', (event) => {
  showSlides(slideIndex);
});




/* Resim kaydırmaca */

function initComparisons() {
  var x, i;
  /* "overlay" sınıfına sahip tüm öğeleri bulun: */
  x = document.getElementsByClassName("img-comp-overlay");
  for (i = 0; i < x.length; i++) {
    /* her "overlay" öğesi için bir kez:
    compareImages işlevini yürütürken "overlay" öğesini bir parametre olarak geçirin: */
    compareImages(x[i]);
  }
  function compareImages(img) {
    var slider, img, clicked = 0, w, h;
    /* img öğesinin genişliğini ve yüksekliğini alın */
    w = img.offsetWidth;
    h = img.offsetHeight;
    /* img öğesinin genişliğini %50 olarak ayarlayın: */
    img.style.width = (w / 2) + "px";
    /* kaydırıcı oluşturun: */
    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    /* kaydırıcıyı ekleyin */
    img.parentElement.insertBefore(slider, img);
    /* kaydırıcıyı ortada konumlandırın: */
    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
    /* fare düğmesine basıldığında bir işlev yürütün: */
    slider.addEventListener("mousedown", slideReady);
    /* ve fare düğmesi bırakıldığında başka bir işlev: */
    window.addEventListener("mouseup", slideFinish);
    /* veya dokunulduğunda (dokunmatik ekranlar için): */
    slider.addEventListener("touchstart", slideReady);
    /* ve bırakıldığında (dokunmatik ekranlar için): */
    window.addEventListener("touchend", slideFinish);
    function slideReady(e) {
      /* görüntü üzerinde hareket ederken meydana gelebilecek diğer eylemleri önleyin: */
      e.preventDefault();
      /* kaydırıcı şimdi tıklanmış ve hareket etmeye hazır: */
      clicked = 1;
      /* kaydırıcı hareket ettirildiğinde bir işlev yürütün: */
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      /* kaydırıcı artık tıklanmadı: */
      clicked = 0;
    }
    function slideMove(e) {
      var pos;
      /* kaydırıcı artık tıklanmadıysa, bu işlevden çıkın: */
      if (clicked == 0) return false;
      /* imlecin x konumunu alın: */
      pos = getCursorPos(e)
      /* kaydırıcının görüntü dışında konumlandırılmasını önleyin: */
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      /* imlece göre kaplama görüntüsünü yeniden boyutlandıracak bir işlev yürütün: */
      slide(pos);
    }
    function getCursorPos(e) {
      var a, x = 0;
      e = (e.changedTouches) ? e.changedTouches[0] : e;
      /* görüntünün x konumlarını alın: */
      a = img.getBoundingClientRect();
      /* imlecin x koordinatını hesaplayın, görüntüye göre: */
      x = e.pageX - a.left;
      /* sayfa kaydırmasını dikkate alın: */
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      /* görüntüyü yeniden boyutlandırın: */
      img.style.width = x + "px";
      /* kaydırıcıyı konumlandırın: */
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
  }
}


initComparisons();