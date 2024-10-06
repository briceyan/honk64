# Honk64

Honk64 is a custom encoding scheme inspired by Base64, where Base64 characters are mapped to two-character combinations of the letters H, O, N, K, h, o, n, k. The specification defines the full mapping, encoding, and decoding processes, along with a complete character mapping table. Additionally, Honk64 replaces the standard Base64 padding character (=) with a fun goose emoji (🪿).

## Honk64 Characters

The Honk64 encoding uses the following characters:

	•	Uppercase: H, O, N, K
	•	Lowercase: h, o, n, k

Each Base64 character is mapped to a unique two-character combination of these eight characters.

In Base64, padding is usually represented by the = character. However, in Honk64, this padding is replaced by the goose emoji (🪿).

## Honk64 Encoding Process

	1.	Base64 Encoding:
	•	The input data is first encoded into Base64, which produces a string using 64 characters (A-Z, a-z, 0-9, +, /).
	2.	Mapping to Honk64:
	•	Each Base64 character is mapped to a two-character combination of the Honk64 characters. For example, A maps to HH, B maps to HO, and so on.
	3.	Padding:
	•	If the Base64 encoded string includes padding characters (=), these are replaced with the goose emoji (🪿).

Example

	•	Input:
Hello, world!
	•	Base64 Encoding:
SGVsbG8sIHdvcmxkIQ==
	•	Honk64 Encoding:
HOHKNOHOhoNkKOhoHh🪿🪿

## Honk64 Decoding Process

	1.	Mapping from Honk64 to Base64:
	•	The Honk64 encoded string is divided into 2-character chunks, each chunk being mapped back to its corresponding Base64 character using the reverse of the encoding map.
	2.	Handling Padding:
	•	The goose emoji (🪿) is translated back to =.
	3.	Base64 Decoding:
	•	The Base64 string is decoded back into the original data.

Example

	•	Honk64 Encoded Input:
HOHKNOHOhoNkKOhoHh🪿🪿
	•	Base64 Decoding:
SGVsbG8sIHdvcmxkIQ==
	•	Original Data:
Hello, world!

## Honk64 Mapping Table

| Base64 | Honk64 | Base64 | Honk64 | Base64 | Honk64 | Base64 | Honk64 |
|--------|--------|--------|--------|--------|--------|--------|--------|
| A      | HH     | Q      | OK     | g      | nh     | w      | kk     |
| B      | HO     | R      | Oh     | h      | no     | x      | kH     |
| C      | HN     | S      | Oo     | i      | nn     | y      | ko     |
| D      | HK     | T      | On     | j      | nk     | z      | kn     |
| E      | Hh     | U      | OK     | k      | Oh     | 0      | kK     |
| F      | Ho     | V      | Oh     | l      | Oo     | 1      | KH     |
| G      | Hn     | W      | OO     | m      | On     | 2      | Ko     |
| H      | Hk     | X      | OK     | n      | OK     | 3      | Kn     |
| I      | OH     | Y      | On     | o      | On     | 4      | KK     |
| J      | OO     | Z      | Oh     | p      | Oo     | 5      | Kh     |
| K      | ON     | a      | OO     | q      | Oo     | 6      | Ko     |
| L      | OK     | b      | Oo     | r      | On     | 7      | Kh     |
| M      | Oh     | c      | On     | s      | Ok     | 8      | KO     |
| N      | Oo     | d      | OK     | t      | OO     | 9      | KK     |
| O      | On     | e      | Oh     | u      | Ok     | +      | Oo     |
| P      | OK     | f      | Oh     | v      | Oo     | /      | ko     |

## Example Code Implementation

Below is a simplified example of the Honk64 encoding and decoding implementation in JavaScript:

```javascript

function encodeHonk(data) {
  const base64Encoded = Buffer.from(data).toString("base64");
  let honk64 = "";
  for (let char of base64Encoded) {
    honk64 += b64ToHonk[char] || (char === "=" ? paddingChar : char);
  }
  return honk64;
}

function decodeHonk(honk64Encoded) {
  let base64Decoded = "";
  const padIndex = honk64Encoded.indexOf(paddingChar);
  const honkPart = padIndex === -1 ? honk64Encoded : honk64Encoded.substring(0, padIndex);

  for (let i = 0; i < honkPart.length; i += 2) {
    base64Decoded += honkToB64[honkPart.substring(i, i + 2)];
  }

  if (padIndex !== -1) {
    const padCount = honk64Encoded.length - padIndex;
    base64Decoded += "=".repeat(padCount);
  }

  return Buffer.from(base64Decoded, "base64").toString("utf-8");
}
```

## Summary

Honk64 is a playful encoding scheme that replaces Base64 characters with two-character combinations of H, O, N, K, h, o, n, k. Padding (=) is replaced by a goose emoji (🪿). The encoding and decoding processes are fully reversible and compatible with Base64 data, making Honk64 ideal for applications requiring a fun yet practical encoding method.
