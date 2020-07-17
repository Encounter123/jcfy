//格式化时期
export function timestampToTime(getTime) {
  var date = new Date(getTime*1000);
	let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + ' ';
  let H = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() + '';
  let MI = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() + '';
  let S = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() + '';
  return Y + M + D;
}
