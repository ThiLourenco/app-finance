const btnCancel = document.querySelector('.cancel');
const btnTransaction = document.querySelector('.new');
const modal = document.querySelector('.modal-overlay');

function addTransaction (){
  modal.classList.add('active')
}

function cancelTransaction () {
  modal.classList.remove('active')
}

btnTransaction.addEventListener('click', addTransaction);
btnCancel.addEventListener('click', cancelTransaction);
