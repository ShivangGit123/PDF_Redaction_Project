document.querySelectorAll('.faq-item h4').forEach(q => {
  q.addEventListener('click', () => {
    const p = q.nextElementSibling;
    if(p.style.display === 'block') {
      p.style.display = 'none';
    } else {
      p.style.display = 'block';
    }
  });
});

const pdfInput = document.getElementById('pdfInput');
const selectedFile = document.getElementById('selectedFile');

pdfInput.addEventListener('change', () => {
  if (pdfInput.files.length > 0) {
    selectedFile.textContent = `Selected File: ${pdfInput.files[0].name}`;
  } else {
    selectedFile.textContent = '';
  }
});

// Reviews carousel simple rotator
(function(){
  const carousel = document.getElementById('reviewsCarousel');
  const cards = Array.from(carousel.querySelectorAll('.review-card'));
  const prevBtn = document.getElementById('prevReview');
  const nextBtn = document.getElementById('nextReview');
  let index = 0;

  function showIndex(i) {
    index = (i + cards.length) % cards.length;
    // translate so that selected card is centered for wide screens
    if (window.innerWidth > 900) {
      const cardWidth = cards[0].offsetWidth + 20; // width + gap
      const offset = (cardWidth * index) - ((carousel.offsetWidth - cardWidth) / 2);
      carousel.style.transform = `translateX(${-offset}px)`;
    } else {
      // for small screens just scroll into view
      cards[index].scrollIntoView({behavior:'smooth', inline:'center'});
    }
    // subtle focus styling
    cards.forEach((c, idx) => {
      c.style.opacity = (idx === index ? '1' : '0.6');
      c.style.transform = (idx === index ? 'scale(1.02)' : 'scale(0.98)');
    });
  }

  nextBtn.addEventListener('click', () => showIndex(index + 1));
  prevBtn.addEventListener('click', () => showIndex(index - 1));

  // autoplay every 4s
  let autoplay = setInterval(() => showIndex(index + 1), 4000);
  // pause on hover
  carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
  carousel.addEventListener('mouseleave', () => autoplay = setInterval(() => showIndex(index + 1), 4000));

  // init after small delay so sizes are available
  setTimeout(() => showIndex(0), 100);
})();
