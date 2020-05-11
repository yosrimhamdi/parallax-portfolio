import scroller from './Scroller';
import CursorInteractions from './CursorInteractions';

class Preload {
  constructor() {
    this.DOM = {
      preloadOverlay: document.querySelector('.preload-overlay'),
      preloadState: document.querySelector('.preload-overlay__state'),
      loader: document.querySelector('.loader'),
      loaderCircle: document.querySelector('.loader__circle'),
      cursor: document.querySelector('.cursor'),
      frontal: document.querySelector('.frontal'),
    };
    this.timer = {
      start: 0,
      interval: null,
    };

    this.setReadyStateEvent();
    scroller.addListener(this.disableScrolling);
  }

  setReadyStateEvent() {
    document.addEventListener('readystatechange', this.handleReadyState.bind(this));
  }

  setMousePressEvents() {
    this.DOM.loader.addEventListener('mousedown', this.setTimer.bind(this));
    document.body.addEventListener('mouseup', this.letUserInteract.bind(this));
  }

  handleReadyState(e) {
    if (e.target.readyState === 'complete') {
      this.DOM.loaderCircle.style.animation = 'loaded 2000ms forwards';

      setTimeout(() => {
        this.informUserToInteract();
        this.setMousePressEvents();
        this.DOM.loader.classList.add('loader--interactive');
      }, 2000);
    }
  }

  setTimer() {
    this.timer.start = Date.now();
    this.timer.interval = setInterval(this.checkTimer.bind(this), 100);
  }

  clearInterval() {
    clearInterval(this.timer.interval);
  }

  disableScrolling() {
    scroller.scrollTo(0, 0, 0);
  }

  enableScrolling() {
    scroller.removeListener(this.disableScrolling);
  }

  informUserToInteract() {
    this.DOM.preloadState.innerHTML = 'click &amp; hold';
  }

  checkTimer() {
    if (Date.now() - this.timer.start >= 700) {
      this.showPageContent();
      this.clearInterval();
    }
  }

  showPageContent() {
    this.DOM.preloadOverlay.classList.add('preload-overlay--loaded');
    this.DOM.cursor.classList.add('cursor--is-visible');
    this.DOM.frontal.classList.add('frontal--animated');
    document.body.style.cursor = 'none';
  }

  letUserInteract() {
    this.clearInterval();

    if (Date.now() - this.timer.start >= 700) {
      this.enableMouseInteractions();
    }
  }

  enableMouseInteractions() {
    this.enableScrolling();
    new CursorInteractions();
  }
}

export default Preload;