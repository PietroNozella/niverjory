export function normalizeAnswer(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

export function isAcceptedAnswer(value: string, acceptedAnswers: string[]) {
  const normalizedValue = normalizeAnswer(value);

  return acceptedAnswers.some(
    (answer) => normalizeAnswer(answer) === normalizedValue,
  );
}
