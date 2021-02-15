class Dom {
  constructor() {
    this.transactionsContainer = document.querySelector('#data-table tbody');

   }

  addTransaction(transaction, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = Dom.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index;

    this.transactionsContainer.appendChild(tr);
  }

  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? 'income' : 'expense';
    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td class="btn-icon">
        <div>
          <span>
            <img class="btn-update" onclick="Transaction.update(${index})" src="./assets/edit.svg" alt="Editar transação">
          </span>
          <span>
            <img class="btn-remover" onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
          </span>
        </div>
      </td>
    `;
    return html;
  }

  updateBalance() {
    document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes());
    document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses());
    document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total());
  }

  clearTransactions(){
    this.transactionsContainer.innerHTML = '';
  }
}  
