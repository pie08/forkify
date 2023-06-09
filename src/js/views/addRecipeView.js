import View from './view.js';
import icons from 'url:../../img/icons.svg';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelectorAll('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
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

  /**
   *
   * @param {function} handler Handler function in controller.js
   * @does Gets form data on submission and returns it
   * @returns {object} Returns object containing form data
   */
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);

      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new addRecipeView();
