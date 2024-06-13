class PredictiveSearch extends HTMLElement {
  constructor() {
    super();

    this.input = this.querySelector('input[type="search"]');
    this.predictiveSearchResults = this.querySelector('#predictive-search');

    this.input.addEventListener('input', this.debounce((event) => {
      this.onChange(event);
    }, 300).bind(this));
  }

  onChange() {
    const searchTerm = this.input.value.trim();

    if (!searchTerm.length) {
      this.close();
      return;
    }

    this.getSearchResults(searchTerm);
  }

  getSearchResults(searchTerm) {
    fetch(window.location.protocol + '//' + window.location.host + `/search?q=${searchTerm}`)
      .then((response) => {
        return response.text();
      })
      .then( text => {
        const product = $($.parseHTML(text));

        const title = product.filter('title').text().trim();

        // Extract the number using a regular expression
        const extractedNumber = title.match(/\d+/);

        // Convert the extracted number to an integer
        const result = extractedNumber ? parseInt(extractedNumber[0]) : null;

        document.querySelector('.show-key > span').innerHTML = `se alla produketer... ( ${result} )`;

      });


    fetch(`/search/suggest?q=${searchTerm}&section_id=predictive-search`)
      .then((response) => {
        if (!response.ok) {
          var error = new Error(response.status);
          this.close();
          throw error;
        }
        return response.text();
      })
      .then((text) => {
        const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelector('#shopify-section-predictive-search').innerHTML;
        this.predictiveSearchResults.innerHTML = resultsMarkup;
        if(this.predictiveSearchResults.querySelector('.product')) this.predictiveSearchResults.querySelectorAll('.product a').forEach(link => {
          let url = link.getAttribute('href');
          link.setAttribute('href', url.split('?')[0]);
        });
        this.open();
        this.querySelectorAll('.predictive-collection').forEach(element => {
          if (element.dataset.handle.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1) {
            element.classList.remove('hidden')
          } else {
            element.classList.add('hidden')
          }
        });
      })
      .catch((error) => {
        this.close();
        throw error;
      });

  }

  open() {
    this.predictiveSearchResults.style.display = 'block';
  }

  close() {
    this.predictiveSearchResults.style.display = 'none';
  }

  debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }
}

customElements.define('predictive-search', PredictiveSearch);
