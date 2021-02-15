class TransactionController {
  constructor() {
    this.modal = document.querySelector('.modal-overlay');
    this.formEl = document.querySelector('#form');

    this.transaction = new Transaction();
    this.dom = new Dom();
    this.form = new Form();

    this.addTransaction();
    this.cancelTransaction();
    this.handleSubmit();
  }

  init() {
    this.transaction.getTransactionStorage.forEach(this.dom.addTransaction);
    this.dom.updateBalance();

    this.setStorage(this.transaction.getTransactionStorage());
  }

  // adicionar transação
  addTransaction() {
    document.querySelector('.new').addEventListener('click', e => {
      this.modal.classList.add('active');
    });
    
  }

  // cancelar transação
  cancelTransaction() {
    document.querySelector('.cancel').addEventListener('click', e => {
      this.modal.classList.remove('active');
    });
  }

  // manipular evento de envio do formulário
  handleSubmit() {
    this.formEl.addEventListener('submit', e => {

      e.preventDefault();

      try {
        this.form.validateFields();
        const transaction = this.form.formatValues();
        this.transaction.add(transaction);
        this.form.clearFields();
        this.cancelTransaction();
      } catch(error) {
        console.error(error.message);
      }
    })
  }

  // Recarregar 
  reload() {
    this.dom.clearTransactions();
    App.init();
  }
}
