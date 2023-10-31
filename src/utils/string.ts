export function shortenAddress(addr: string) {
  return addr.slice(6, addr.length - 4);
}

export function shortenText(txt: string, length: number) {
  if (txt.length <= length + 3) {
    return txt;
  }
  return txt.slice(0, length) + "...";
}