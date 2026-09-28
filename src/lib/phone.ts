/** 국내 휴대전화. 010·011·016·017·018·019, 10~11자리. */
export const MOBILE_NATIONAL_RE = /^01[016789]\d{7,8}$/;

function toNationalDigits(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (digits.startsWith("82")) return `0${digits.slice(2)}`;
  return digits;
}

/**
 * 화면에는 010-1234-5678 로 받고, 슈파베이스에는 +821012345678 로 보낸다.
 */
export function toE164(input: string): string | null {
  const national = toNationalDigits(input);
  if (!MOBILE_NATIONAL_RE.test(national)) return null;
  return `+82${national.slice(1)}`;
}

export function phoneFormatError(input: string): string | null {
  if (!input.replace(/\D/g, "")) {
    return "휴대전화 번호를 입력해 주세요.";
  }
  if (!MOBILE_NATIONAL_RE.test(toNationalDigits(input))) {
    return "휴대전화 번호 형식이 올바르지 않습니다. 예: 010-1234-5678";
  }
  return null;
}

/** 솔라피는 01012345678 형식을 받는다. */
export function toNational(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("82")) return `0${digits.slice(2)}`;
  if (digits.startsWith("0")) return digits;
  return digits;
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

/** 입력 중 010-1234-5678 형태로 만든다. */
export function formatPhoneMask(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}
