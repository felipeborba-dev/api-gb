export function Ipv4Parser(value: string): string {
  try {
    const ip = value
      ?.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?:\/\d{2})?/)
      ?.shift();
    return ip ? ip : '0.0.0.0';
  } catch (error) {
    return null;
  }
}
