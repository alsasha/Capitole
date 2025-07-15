// CSS loading utility to prevent FOUC (Flash of Unstyled Content)

export function preventFOUC() {
  // Hide content until CSS is loaded
  const style = document.createElement('style');
  style.textContent = `
    .js-loading {
      visibility: hidden;
    }
    .js-loaded {
      visibility: visible;
    }
  `;
  document.head.appendChild(style);

  // Add loading class to body
  document.body.classList.add('js-loading');

  // Remove loading class when CSS is loaded
  const removeLoadingClass = () => {
    document.body.classList.remove('js-loading');
    document.body.classList.add('js-loaded');
  };

  // Check if CSS is already loaded
  if (document.readyState === 'complete') {
    removeLoadingClass();
  } else {
    window.addEventListener('load', removeLoadingClass);
  }
}

// Auto-initialize when this module is imported
if (typeof window !== 'undefined') {
  preventFOUC();
} 