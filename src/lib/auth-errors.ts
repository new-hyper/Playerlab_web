type AuthLikeError = {
  message?: string;
  code?: string;
} | null;

export function authErrorMessage(error: AuthLikeError): string {
  if (!error) return "알 수 없는 오류가 발생했습니다.";
  const code = (error.code ?? "").toLowerCase();
  const message = (error.message ?? "").toLowerCase();

  if (
    code.includes("user_already") ||
    message.includes("already registered") ||
    message.includes("already been registered")
  ) {
    return "이미 사용 중인 아이디입니다. 로그인해 주세요.";
  }
  if (
    code.includes("invalid_credentials") ||
    message.includes("invalid login") ||
    message.includes("invalid_credentials")
  ) {
    return "아이디 또는 비밀번호가 올바르지 않습니다.";
  }
  if (code.includes("otp_expired") || message.includes("expired")) {
    return "인증번호가 만료되었습니다. 다시 받아 주세요.";
  }
  if (
    code.includes("otp") ||
    message.includes("token") ||
    message.includes("invalid") && message.includes("otp")
  ) {
    return "인증번호가 올바르지 않습니다.";
  }
  if (message.includes("rate") || code.includes("over_")) {
    return "요청이 너무 잦습니다. 잠시 후 다시 시도해 주세요.";
  }
  if (
    message.includes("confirmation otp") ||
    message.includes("twilio") ||
    message.includes("sms provider")
  ) {
    return "문자 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.";
  }
  if (
    code.includes("email_address_invalid") ||
    (message.includes("email address") && message.includes("is invalid"))
  ) {
    return "가입 확인 메일을 보낼 수 없습니다. 슈파베이스 Authentication → Providers → Email 에서 Confirm email 을 끈 뒤 다시 가입해 주세요.";
  }
  if (message.includes("phone") && message.includes("invalid")) {
    return "전화번호 형식이 올바르지 않습니다.";
  }
  if (message.includes("password") && message.includes("6")) {
    return "비밀번호는 6자 이상이어야 합니다.";
  }

  return error.message || "처리하지 못했습니다. 잠시 후 다시 시도해 주세요.";
}
