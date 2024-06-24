import crypto from "crypto";
export function randomStringAsBase64Url(size: number = 10) {
  return crypto.randomBytes(size).toString("base64url");
}
