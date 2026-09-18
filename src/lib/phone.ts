/**
 * 화면에는 010-1234-5678 로 받고, 슈파베이스에는 +821012345678 로 보낸다.
 */
export function toE164(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (!digits) return null;

  let national = digits;
  if (digits.startsWith("82")) {
    national = "0" + digits.slice(2);
  }

  if (!/^01[016789]\d{7,8}$/.test(national)) return null;
  return `+82${national.slice(1)}`;
}

export function formatNational(e164: string): string {
  const digits = e164.replace(/\D/g, "");
  if (!digits.startsWith("82")) return e164;
  const national = `0${digits.slice(2)}`;
  if (national.length === 11) {
    return `${national.slice(0, 3)}-${national.slice(3, 7)}-${national.slice(7)}`;
  }
  if (national.length === 10) {
    return `${national.slice(0, 3)}-${national.slice(3, 6)}-${national.slice(6)}`;
  }
  return national;
}
