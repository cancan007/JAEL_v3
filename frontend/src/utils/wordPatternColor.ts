import { WordPattern } from "../types/types";

export const wordPatternColor = (pattern: WordPattern | string) => {
  switch (pattern) {
    case WordPattern.Subject:
      return "rgba(255, 45, 209, 0.5)";
    case WordPattern.Object:
      return "rgba(251, 140, 106, 0.5)";
    case WordPattern.Verb:
      return "rgba(34, 255, 69, 0.5)";
    case WordPattern.Adjective:
      return "rgba(33, 215, 255, 0.5)";
    case WordPattern.Conjunction:
      return "rgba(195, 97, 255, 0.5)";
    case WordPattern.Preposition:
      return "rgba(250, 229, 38, 0.5)";
    case WordPattern.Adverb:
      return "rgba(131, 131, 131, 0.5)";
    default:
      return "rgba(251, 140, 106, 0.5)";
  }
};
