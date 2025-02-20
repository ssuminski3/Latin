"use server";

// Import crypto-browserify for browser compatibility
import crypto from "crypto-browserify";

const SECRET_KEY = process.env.SECRET_KEY || "my-secret-key"; //shouldn't be on public repository 
const TOKEN_VALIDITY = 5 * 60; // Token valid for 5 minutes

export async function validateToken(token) {
  if (!token) return false;

  const parts = token.split("-");
  if (parts.length !== 2) return false;

  const [timestampStr, providedHash] = parts;
  const timestamp = parseInt(timestampStr, 10);
  const now = Math.floor(Date.now() / 1000);

  // Check if token is expired
  if (now - timestamp > TOKEN_VALIDITY) return false;

  // Recreate the hash using the timestamp and secret key
  const hmac = crypto.createHmac("sha256", SECRET_KEY);
  hmac.update(String(timestamp));
  const expectedHash = hmac.digest("hex");

  return providedHash === expectedHash;
}

export async function generateToken() {
  const timestamp = Math.floor(Date.now() / 1000);
  const hmac = crypto.createHmac("sha256", SECRET_KEY);
  hmac.update(String(timestamp));
  const hash = hmac.digest("hex");
  return `${timestamp}-${hash}`;
}
