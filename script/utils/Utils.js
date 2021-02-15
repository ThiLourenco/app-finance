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
