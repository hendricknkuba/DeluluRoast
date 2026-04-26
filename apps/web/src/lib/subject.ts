const MAX_SUBJECT_LENGTH = 80;

export function sanitizeSubjectInput(value: string) {
  const withoutControlChars = Array.from(value, (character) => {
    const code = character.charCodeAt(0);

    return (code <= 31 || code === 127) ? " " : character;
  }).join("");
  const collapsedWhitespace = withoutControlChars.replace(/\s+/g, " ");
  return collapsedWhitespace.slice(0, MAX_SUBJECT_LENGTH);
}

export function normalizeSubjectForSubmit(value: string) {
  return sanitizeSubjectInput(value).trim();
}

export function getSubjectLength(value: string) {
  return sanitizeSubjectInput(value).length;
}

export { MAX_SUBJECT_LENGTH };
