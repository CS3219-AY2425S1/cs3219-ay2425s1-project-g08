function getTimezoneOffset(time: Date): string {
  const offset = time.getTimezoneOffset();
  const absOffset = Math.abs(offset);
  const hours = String(Math.floor(absOffset / 60)).padStart(2, '0'); // Get hours
  const minutes = String(absOffset % 60).padStart(2, '0');
  const sign = offset > 0 ? '-' : '+';

  return `${sign}${hours}:${minutes}`;
}


function formatLocalDateTime(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

function formatISOstringFormat(date: Date): string {
  return formatLocalDateTime(date) + getTimezoneOffset(date);
}

export { formatISOstringFormat };