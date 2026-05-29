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

/** Group names into rows of N (e.g. 2 names per line). */
export function pairNamesIntoRows(names, perRow = 2) {
  const rows = [];
  for (let i = 0; i < names.length; i += perRow) {
    rows.push(names.slice(i, i + perRow));
  }
  return rows;
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
