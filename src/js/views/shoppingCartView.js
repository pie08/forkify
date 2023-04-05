import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fraction.js';

class shoppingCartView extends View {
  _parentElement = document.querySelector('.cart-list');
  _errorMessage = 'Nothing in your cart yet! Add something to get started ;)';

  _window = document.querySelector('.cart-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--cart');
  _btnClose = document.querySelectorAll('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    console.log(this._parentElement);
  }

  showWindow() {
    this._overlay.classList.remove('hidden');
    this._window.classList.remove('hidden');
  }

  hideWindow() {
    this._overlay.classList.add('hidden');
    this._window.classList.add('hidden');
  }

  // "This" always points to the either function that calls it or the class
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.showWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.forEach(el =>
      el.addEventListener('click', this.hideWindow.bind(this))
    );
    this._overlay.addEventListener('click', this.hideWindow.bind(this));
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(
        ing => `
          <li class="cart-item">
            <div class="cart-data">
              <h4 class="cart-title">${ing.description}</h4>
              <p class="cart-quantity">${
                ing.quantity ? new Fraction(ing.quantity).toFraction(true) : ''
              } ${ing.unit}</p>
            </div>
          </li>
          `
      )
      .join('');
  }
}

export default new shoppingCartView();
