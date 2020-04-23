import scroller from './Scroller';
import SetupParallaxEnviroment from './SetupParallaxEnviroment';

class AnimateMyNameOnScroll extends SetupParallaxEnviroment {
  constructor() {
    super('.me__my-name', { top: document.querySelector('.me__my-name').clientHeight / 2, bottom: -240 });
    this.myImage = document.querySelector('.me__my-image');
    this.limits = { start: -300, end: 0 };
    this.waypoints = [300, 250, 160, 65];
    this.texts = ['hello!', "keep scrolling, don't stop", 'almost', 'yossri'];

    this.setTransformObjects();
    this.fixedContainersWidth();

    scroller.addListener(this.changeText.bind(this));
  }

  transformFunction() {
    this.element.style.transform = `translateY(${this.getCurrentValue()}px)`;
  }

  changeText() {
    const yValue = this.getYValue();

    this.texts.forEach((text, i) => {
      if (yValue <= this.waypoints[i]) {
        this.elements[0].innerText = text;

        if (i === 1) {
          this.elements[0].classList.add('me__my-name--stroke');
        } else {
          this.elements[0].classList.remove('me__my-name--stroke');
        }
      }
    });

    if (yValue === 0) {
      this.elements[0].classList.add('me__my-name--stroke');
      this.myImage.classList.add('me__my-image--is-visible');
    } else {
      this.myImage.classList.remove('me__my-image--is-visible');
    }
  }

  getYValue() {
    return Math.abs(parseInt(this.elements[0].style.transform.slice(11, -3)));
  }

  fixedContainersWidth() {
    const container = document.querySelector('.me');
    const wrapper = document.querySelector('.me__wrapper');

    container.style.width = `${container.clientWidth}px`;
    wrapper.style.width = `${wrapper.clientWidth}px`;
  }
}

export default AnimateMyNameOnScroll;
