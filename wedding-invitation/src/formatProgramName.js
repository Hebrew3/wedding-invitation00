/** Program card style: Mr./Mrs./Ms. + UPPERCASE name (matches invitation layout). */
export function formatProgramName(name) {
  const trimmed = String(name).trim();
  const match = trimmed.match(/^(Mr\.|Mrs\.|Ms\.)\s+(.+)$/i);
  if (!match) return trimmed.toUpperCase();

  const prefix =
    match[1].toLowerCase() === "mr."
      ? "Mr."
      : match[1].toLowerCase() === "mrs."
        ? "Mrs."
        : "Ms.";

  return `${prefix} ${match[2].toUpperCase()}`;
}

export function partitionPrincipalSponsors(names) {
  const men = [];
  const women = [];
  for (const name of names) {
    if (/^Mr\./i.test(name)) men.push(name);
    else women.push(name);
  }
  return { men, women };
}
