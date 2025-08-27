document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null; // Cierra
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px"; // Abre con la altura real
    }
  });
});
