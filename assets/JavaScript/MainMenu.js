const words = [
    "mods",
    "texture pack",
    "haberler",
    "youtube"
  ];
  
  const textElement = document.getElementById("animated-text");
  let index = 0;
  
  function animateWordIn(word) {
    textElement.innerHTML = ''; // Temizle
    for (let i = 0; i < word.length; i++) {
      const span = document.createElement('span');
      span.textContent = word[i];
      span.className = 'letter';
      span.style.animationDelay = `${i * 0.1}s`;
      textElement.appendChild(span);
    }
  }
  
  function animateWordOut(callback) {
    const letters = document.querySelectorAll(".letter");
    letters.forEach((letter, i) => {
      letter.classList.add("out");
      letter.style.animationDelay = `${i * 0.05}s`;
    });
  
    // Animasyon bittikten sonra yeni kelimeye geç
    setTimeout(callback, letters.length * 50 + 600);
  }
  
  // İlk kelimeyi göster
  animateWordIn(words[index]);
  
  setInterval(() => {
    animateWordOut(() => {
      index = (index + 1) % words.length;
      animateWordIn(words[index]);
    });
  }, 4000);
  
  
  

  
  
const gozlenecek = document.querySelectorAll('.animasyonlu');

const observer = new IntersectionObserver(entries => {
  console.log(entries);
  entries.forEach(entry => {
    console.log(entry);
    if (entry.isIntersecting) {
      console.log('Göründü!');
      entry.target.classList.add('gorundu');
      // İstersen bir kez çalıştıktan sonra observer'dan çıkar:
      observer.unobserve(entry.target);
    }
  });
});

gozlenecek.forEach(el => observer.observe(el));