const dateFormatter = new Intl.DateTimeFormat(navigator.language);
export const displayDate = dateStr =>
{
	const date = new Date(dateStr);
	return dateFormatter.format(date); // todo
};