const escapeRegex = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const diacriticInsensitiveRegex = (value) => new RegExp(escapeRegex(value), "i");

module.exports = { diacriticInsensitiveRegex };
