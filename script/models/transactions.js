class Transaction {
  constructor() {
  }

  get id() {
    return this._id;
  }

  get description() {
    return this._description;
  }

  get amount() {
    return this._amount;
  }

  get date() {
    return this._date;
  }

  getTransactionStorage() {
    let data = [];
    return data = JSON.parse(localStorage.getItem('dev.finances:transactions')) || [];
  }

  setStorage(transactions) {
    localStorage.setItem('dev.finances:transactions', JSON.stringify(transactions));
  }

  add(transaction) {
  }

  getNewId() {

    let transactionID = parseInt(localStorage.getItem('transactionID'));

    if (!transactionID > 0) transactionID = 0;

    transactionID++;

    localStorage.setItem('transactionID', transactionID);

    return transactionID;
  }

  update() {
    this.addTransaction();
		
		let data = [];
		if (localStorage.getItem('dev.finances:transactions') && []) {
			data = JSON.parse(localStorage.getItem('dev.finances:transactions'));
		}
		console.log(data);
		return data
  }

  remove(index) {
    if(confirm('Deseja realmente excluir?')) {
      this.getTransactionStorage.splice(index, 1);
      // let transaction = Transaction.getTransactionStorage();
      // transaction.forEach((transactionData, index) => {
      //   if (this._id === transactionData._id) {
      //     transaction.splice(index, 1);
      //   }
      // });

      // localStorage.setItem('dev.finances:transactions', JSON.stringify(transaction));

      App.reload();
    }
  }

  // manipulação de transações
  incomes() {

  }

  expenses() {
  
  }

  total() {
    return this.incomes() + this.expenses();
  }
}