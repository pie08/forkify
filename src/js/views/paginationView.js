import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const totalPages = this._data.totalPages;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const buttonMarkupPrev = `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;

    const buttonMarkupNext = `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;

    const textNumPages = `<p class="text--page-num">Page ${curPage} of ${totalPages}</p>`;

    // Page 1, there are other pages
    if (curPage === 1 && numPages > 1) {
      return buttonMarkupNext + textNumPages;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return buttonMarkupPrev + textNumPages;
    }

    // Other page
    if (curPage < numPages) {
      return buttonMarkupPrev + buttonMarkupNext + textNumPages;
    }

    // Page 1, there are no other pages
    return '';
  }
}

export default new PaginationView();
