let highestZ = 1;

class Paper {
  holdingPaper = false;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    // --- TOUCH EVENTS ---
    paper.addEventListener('touchstart', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      
      paper.style.zIndex = highestZ;
      highestZ += 1;

      this.prevTouchX = e.touches[0].clientX;
      this.prevTouchY = e.touches[0].clientY;
    });

    window.addEventListener('touchmove', (e) => {
      if (!this.holdingPaper) return;
      
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      
      this.velX = touchX - this.prevTouchX;
      this.velY = touchY - this.prevTouchY;
      
      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;
      
      this.prevTouchX = touchX;
      this.prevTouchY = touchY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });

    // --- MOUSE EVENTS (Desktop) ---
    paper.addEventListener('mousedown', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      
      paper.style.zIndex = highestZ;
      highestZ += 1;

      this.prevTouchX = e.clientX;
      this.prevTouchY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.holdingPaper) return;
      
      this.velX = e.clientX - this.prevTouchX;
      this.velY = e.clientY - this.prevTouchY;
      
      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;
      
      this.prevTouchX = e.clientX;
      this.prevTouchY = e.clientY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    });

    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});