export function dribbbleImage(url: string, width: number) {
  const base = url.split("?")[0];
  return `${base}?resize=${width}x0`;
}
