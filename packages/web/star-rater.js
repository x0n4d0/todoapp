class StarRater extends HTMLElement {
  #stars
  #currentRatingValue

  constructor() {
    super();

    this.build();
  }

  build() {
    const shadowDOM = this.attachShadow({ mode: 'open' });
    
    shadowDOM.appendChild(this.styles());

    const rater = this.createRater();
    this.#stars = this.createStars();

    this.#stars.forEach(star => rater.appendChild(star));

    this.#resetRating();
    
    shadowDOM.appendChild(rater);
  }

  createRater() {
    const rater = document.createElement('div');
    rater.classList.add('star-rater');
    rater.addEventListener('mouseout', this.#resetRating.bind(this));
    return rater;
  }

  createStars() {
    const createStar = (_, index) => {
      const star = document.createElement('span');
      star.classList.add('star');
      star.setAttribute('data-value', Number(index) + 1);
      star.innerHTML = '&#9733;';

      star.addEventListener('click', this.#setRating.bind(this));
      star.addEventListener('mouseover', this.#setRatingHover.bind(this));
      return star;
    }

    return Array.from({ length: 5 }, createStar);
  }

  #setRating(event) {
    this.setAttribute('data-rating', event.currentTarget.getAttribute('data-value'));
  }

  #resetRating() {
    this.#currentRatingValue = this.getAttribute('data-rating') || 0;
    this.#hightLightRating();
  }

  #setRatingHover(event) {
    this.#currentRatingValue = event.currentRatingValue.getAttribute('data-value');
    this.#hightLightRating();
  }

  #hightLightRating() {
    this.#stars.forEach(star => {
      star.style.color = 
        (this.#currentRatingValue >= star.getAttribute('data-value')) 
        ? 'yellow' 
        : 'gray'; 
    });
  }

  styles() {
    const style = document.createElement('style');
    style.textContent = `
      .star {
        font-size: 4rem;
        color: gray;
        cursor: pointer;
      }
    `;
    return style;
  }
}

customElements.define('star-rater', StarRater);
