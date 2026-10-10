let highestZ = 1;

class Paper {
  holdingPaper = false;
  prevX = 0;
  prevY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    paper.addEventListener('pointerdown', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      
      paper.style.zIndex = highestZ;
      highestZ += 1;

      this.prevX = e.clientX;
      this.prevY = e.clientY;
      
      // Ensures tracking continues even if the cursor/finger moves slightly off the paper
      paper.setPointerCapture(e.pointerId);
    });

    window.addEventListener('pointermove', (e) => {
      if (!this.holdingPaper) return;
      
      this.velX = e.clientX - this.prevX;
      this.velY = e.clientY - this.prevY;
      
      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;
      
      this.prevX = e.clientX;
      this.prevY = e.clientY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    });

    window.addEventListener('pointerup', () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});