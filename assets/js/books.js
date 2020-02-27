class Book{
    constructor()
    {
        this.title=document.getElementById('titleBook');
        this.price=document.getElementById('priceBook');
        this.reset=document.getElementById('resetBook');

        this.initListeners();
  }

  initListeners () {
    this.reset.addEventListener('click',this.resetForm);
  }

  resetForm=() => {
    this.title.value = '';
    this.price.value = '';
  }

}

export default new Book()