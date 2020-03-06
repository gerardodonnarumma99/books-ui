const BOOKS_API = 'http://127.0.0.1:8000/api/v1'


class Book{
    constructor()
    {
        this.addNewBook=document.getElementById('addNewBook')
        this.title=document.getElementById('bookTitle');
        this.price=document.getElementById('bookPrice');
        this.createBook=document.getElementById('createBook');
        this.bodyTable=document.getElementById('bodyTable');
        this.btnAlert=document.getElementById('btnAlert');
        //Update
        this.updateBook=document.getElementById('updateBook');
        this.idUpdate=document.getElementById('idUpdate');
        this.titleUpdate=document.getElementById('bookTitleUpdate');
        this.priceUpdate=document.getElementById('bookPriceUpdate');

        this.initListeners();

        this.loadBook();
  }

  /**
   * Inizializza gli eventi installando gli ascoltatori
   */
  initListeners () {
    this.submit=this.submit.bind(this);
    this.createBook.addEventListener('click',this.submit);

    this.handleNewBook=this.handleNewBook.bind(this);
    this.addNewBook.addEventListener('click',this.handleNewBook);

    //Delete
    this.deleteBook = this.deleteBook.bind(this);
    $(document).delegate(".deleteBook", "click", this.deleteBook);

    //Update
    this.submitUpdate=this.submitUpdate.bind(this);
    this.updateBook.addEventListener('click',this.submitUpdate);
    this.handleUpdateBook = this.handleUpdateBook.bind(this);
    $(document).delegate(".updateBook", "click", this.handleUpdateBook);
  }

  /**
   * Resetta il form
   */
  resetForm () {
    this.title.value='';
    this.price.value='';
  }

  /**
   * Apre la modale per creare il libro
   * @param {Evento} e
   */
  handleNewBook (e) {
    e.preventDefault();
    this.resetForm();
    $("#bookModal").modal();
  }

  /**
   * Apre la modale per modificare il libro
   * @param {Evento} e
   */
  handleUpdateBook (e) {
    e.preventDefault();
    let idBook=$(e.currentTarget).data("id");
    this.resetForm();
    this.idUpdate.value=idBook;
    $("#bookModalUpdate").modal();
  }

  submit(e)
  {
    this.form=document.getElementById('formCreate');
    if(!this.form.checkValidity())
    {
      alert("Input dei form non validi!");
      this.resetForm();
      return;
    }

    //Richiesta post
    axios.post(BOOKS_API+'/books', {
      title: this.title.value,
      price: parseFloat(this.price.value)
    })
    .then(function (result) {
      if(result.status===200)
      {
        this.loadBook();
        $("#bookModal").modal('hide');
      }
      console.log(response);
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
  }

  submitUpdate(evt)
  {
    this.form=document.getElementById('formUpdate');
    if(!this.form.checkValidity())
    {
      alert("Input dei form non validi!");
      this.resetForm();
      return;
    }

    //Richiesta put
    axios.put(BOOKS_API+'/books/'+this.idUpdate.value, {
      title: this.titleUpdate.value,
      price: parseFloat(this.priceUpdate.value)
    })
    .then(function (result) {
      if(result.status===204)
      {
        this.loadBook();
        $("#bookModalUpdate").modal('hide');
      }
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })

  }

  loadBook() {
    axios.get(`${BOOKS_API}/books`)
      .then(result => {
        const books = result.data;

        console.log(result.data);

        var bookList='';
        for (const book of books) {
          bookList+="<tr><td><a href='#' class='btn btn-danger btn-sm deleteBook' id='deleteBook' data-id="+book.id+">Elimina</a></td><td><a href='#' class='btn btn-danger btn-sm updateBook' id='updateBook' data-id="+book.id+">Modifica</a></td><td>"+book.title+"</td><td>"+new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(book.price)+"</td></tr>";
        }
        this.bodyTable.innerHTML=bookList;
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteBook(evt)
  {
    console.log(this);
    let idBook=$(evt.currentTarget).data("id");
    let btnConfirm=confirm("Sei sicuro di voler eliminare il libro?");
    if(btnConfirm==true)
    {
      //Elimino il libro
      axios.delete(`${BOOKS_API}/books/${idBook}`)
      .then(result => {
        this.alertSuccess("Libro eliminato!");
        this.loadBook();
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  /**
   * 
   * @param {Messaggio da far comparire nell'alert} msg
   */
  alertSuccess(msg)
  {
    this.btnAlert.innerHTML=msg;
    this.btnAlert.style.display="block";
    window.setTimeout(function(){btnAlert.style.display="none";},3000);
  }

}

export default new Book()