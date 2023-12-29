export function unixToDate(timestamp: number): Date {
  return new Date(timestamp * 1000);
}