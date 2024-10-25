export default function isHEX(value: string): boolean {
  return value.match(/^#[0-9A-F]{6}$/i) !== null;
}
