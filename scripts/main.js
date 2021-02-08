const btnCancel = document.querySelector('.cancel');
const btnTransaction = document.querySelector('.new');
const modal = document.querySelector('.modal-overlay');
const form = document.querySelector('form');

const addTransaction = () => {
	modal.classList.add('active');
}

const cancelTransaction = () => {
	modal.classList.remove('active');
}

const handleSubmit = (e) => {
	e.preventDefault()

	try {
		Form.validateFields()
		const transaction = Form.formatValues()
		Transaction.add(transaction)
		Form.clearFields()
		cancelTransaction()
	} catch (error) {
		console.error(error.message);
	}
}

const getStorage = () => {
	let data = '';
	return data = JSON.parse(localStorage.getItem('dev.finances:transactions')) || [];
}

const setStorage = (transactions) => {
	localStorage.setItem('dev.finances:transactions', JSON.stringify(transactions))
}

const Transaction = {
	all: getStorage(),
	
	add(transaction) {
		Transaction.all.push(transaction);

		App.reload();
	},

	update(index) {
		
	},

	remove(index) {
		Transaction.all.splice(index, 1);

		App.reload();
	},

	incomes() {
		let income = 0;
		Transaction.all.forEach(transaction => {
			if (transaction.amount > 0) {
				income += transaction.amount;
			}
		})
		return income;
	},

	expenses() {
		let expense = 0;
		Transaction.all.forEach(transaction => {
			if (transaction.amount < 0) {
				expense += transaction.amount;
			}
		})
		return expense;
	},

	total() {
		return Transaction.incomes() + Transaction.expenses();
	}
}

const DOM = {
	transactionsContainer: document.querySelector('#data-table tbody'),

	addTransaction(transaction, index) {
		const tr = document.createElement('tr')
		tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
		tr.dataset.index = index;

		DOM.transactionsContainer.appendChild(tr);
	},

	innerHTMLTransaction(transaction, index) {
		const CSSclass = transaction.amount > 0 ? "income" : "expense";

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
	},

	updateBalance() {
		document
			.getElementById('incomeDisplay')
			.innerHTML = Utils.formatCurrency(Transaction.incomes());
		document
			.getElementById('expenseDisplay')
			.innerHTML = Utils.formatCurrency(Transaction.expenses());
		document
			.getElementById('totalDisplay')
			.innerHTML = Utils.formatCurrency(Transaction.total());
	},

	clearTransactions() {
		DOM.transactionsContainer.innerHTML = "";
	}
}

class Utils {
	static formatAmount(value) {
		value = Number(value) * 100

		return Math.round(value);
	}

	static formatCurrency(value) {
		const signal = Number(value) < 0 ? "-" : "";
		
		value = String(value).replace(/\D/g, '');
		
		value = Number(value) / 100;
		
		value = value.toLocaleString('pt-br', {
			currency: 'BRL',
			style: 'currency',
		});
		
		return signal + value;
	}

	static formatDate(date) {
		const splittedDate = date.split("-");
		return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
	}
}

const Form = {
	description: document.querySelector('input#description'),
	amount: document.querySelector('input#amount'),
	date: document.querySelector('input#date'),

	getValues() {
		return {
			description: Form.description.value,
			amount: Form.amount.value,
			date: Form.date.value
		};
	},

	validateFields() {
		const { description, amount, date } = Form.getValues();
		
		if (description.trim() === '') {
			document.querySelector('.handle-error.description').innerHTML = 'Informe a descrição - (Ex. Internet).';
		} else {
			document.querySelector('.handle-error.description').innerHTML = '';
		}

		if (amount.trim() === '') {
			document.querySelector('.handle-error.amount').innerHTML = 'Informe a valor - (Ex. 99.99 ou negativo -99.99). </br>';
		} else {
			document.querySelector('.handle-error.amount').innerHTML = '';
		}

		if (date.trim() === '') {
			document.querySelector('.handle-error.date-form').innerHTML = 'Informe a data - (Ex: 04/01/2020).';
		} else {
			document.querySelector('.handle-error.date-form').innerHTML = '';
		}

		if (description.trim() === '' || amount.trim() === '' || date.trim() === '') {
				throw new Error('Por favor, verifique e preencha todos os campos do formulário !');
		}
	},

	formatValues() {
		let { description, amount, date } = Form.getValues();

		amount = Utils.formatAmount(amount);

		date = Utils.formatDate(date);

		return {
			description,
			amount,
			date
		};
	},

	clearFields() {
		Form.description.value = '';
		Form.amount.value = '';
		Form.date.value = '';
	},
}

const App = {
	init() {
		Transaction.all.forEach(DOM.addTransaction);

		DOM.updateBalance();

		setStorage(Transaction.all);
	},
	reload() {
		DOM.clearTransactions();
		App.init();
	},
}

btnTransaction.addEventListener('click', addTransaction);
btnCancel.addEventListener('click', cancelTransaction);
form.addEventListener('submit', handleSubmit);

App.init();