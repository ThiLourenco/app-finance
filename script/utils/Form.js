class Form {
  constructor() {
    this.description = document.querySelector('input#description');
    this.amount = document.querySelector('input#amount');
    this.date = document.querySelector('input#date');

  }

  getValues() {
    return {
      description: this.description.value,
      amount: this.amount.value,
      date: this.date.value
    };
  }

  validateFields() {
    const { description, amount, date } = this.getValues();

    if (description.trim() === '') {
      document.querySelector('.handle-error.description').innerHTML = 'Informe a descrição - (Ex. Internet).';
    } else {
      document.querySelector('.handle-error.description').innerHTML = '';
    }

    if (amount.trim() === '') {
      document.querySelector('.handle-error.amount').innerHTML = 'Informe o valor - (Ex. 99.99 ou negativo -99.99). </br>';
    } else {
      document.querySelector('.handle-error.amount').innerHTML = '';
    }

    if (date.trim() === '') {
      document.querySelector('.handle-error.date-form').innerHTML = 'Informe a data - (Ex. 04/01/2021).';
    } else {
      document.querySelector('.handle-error.date-form').innerHTML = '';
    }

    if (description.trim() === '' || amount.trim() === '' || date.trim() === '') {
      throw new Error('Verifique e preencha todos os campos do formulário !');
    }
  }

  formatValues() {
    let { description, amount, date } = this.getValues();
    
    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date
    }
  }

  clearFields() {
    let { description, amount, date } = this.getValues();
    description.value = '';
    amount.value = '';
    date.value = '';
  }
}
