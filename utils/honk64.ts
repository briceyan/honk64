const b64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const honkChars = ["H", "O", "N", "K", "h", "o", "n", "k"];
const honkPadding = "🪿";

// Generate 2-character combinations of honkChars
function genHonkCombos(): string[] {
  const combos: string[] = [];
  for (let i = 0; i < honkChars.length; i++) {
    for (let j = 0; j < honkChars.length; j++) {
      combos.push(honkChars[i] + honkChars[j]);
    }
  }
  return combos;
}

// Create the HONK64 maps
const b64ToHonk: Record<string, string> = {};
const honkToB64: Record<string, string> = {};
const honkCombos = genHonkCombos();

// Map Base64 chars to HONK combinations
b64Chars.split("").forEach(function (char, index) {
  const combo = honkCombos[index];
  b64ToHonk[char] = combo;
  honkToB64[combo] = char;
});

/**
 * Encode input data to HONK64 with goose padding.
 * @param data The input string to encode.
 * @returns HONK64-encoded string.
 */
function encode(data: string): string {
  const b64Encoded = Buffer.from(data).toString("base64");
  let honk64 = "";
  for (let i = 0; i < b64Encoded.length; i++) {
    const char = b64Encoded[i];
    honk64 += b64ToHonk[char] || (char === "=" ? honkPadding : char);
  }
  return honk64;
}

/**
 * Decode HONK64-encoded string (with goose padding) back to original data.
 * @param honk64Encoded HONK64-encoded string.
 * @returns Decoded original string.
 */
function decode(honk64Encoded: string): string {
  const padIndex = honk64Encoded.indexOf(honkPadding);
  // Decode only the non-padding part
  const honkPart = padIndex === -1 ? honk64Encoded : honk64Encoded.substring(0, padIndex);
  let b64Decoded = "";
  for (let i = 0; i < honkPart.length; i += 2) {
    const combo = honkPart.substring(i, i + 2);
    b64Decoded += honkToB64[combo] || combo;
  }

  // Add padding if exists
  if (padIndex !== -1) {
    const padCount = honk64Encoded.length - padIndex;
    b64Decoded += "=".repeat(padCount);
  }

  const data = Buffer.from(b64Decoded, "base64").toString("utf-8");
  return data;
}

export { encode, decode };
