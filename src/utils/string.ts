export function shortenAddress(addr: string) {
  return addr.slice(0, 6) + "..." + addr.slice(addr.length - 4, addr.length);
}

export function shortenText(txt: string, length: number) {
  if (txt.length <= length + 3) {
    return txt;
  }
  return txt.slice(0, length) + "...";
}

export function concat(txt1: string, txt2: string): string {
  return txt1 + txt2;
}
