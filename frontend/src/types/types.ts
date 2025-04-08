export enum WordPattern {
  Subject = "subject", // 主語
  Verb = "verb", // 動詞
  Object = "object", //目的語
  Adjective = "adjective", //形容詞 ex(fine, good, bad)
  Conjunction = "conjunction", //接続詞 ex(but, and, otherwise)
  Preposition = "preposition", //前置詞 ex(from, as, to)
  Adverb = "adverb", //副詞 ex(usually, always)
}

export enum UserRole {
  Author = "author",
  Visitor = "visitor",
}

export enum Gender {
  Male = "male",
  Female = "female",
  Transgender = "transgender",
}

export enum LessonSection {
  verbConjugation = "verb-conjugation",
  adjective = "adjective",
}

export enum LessonSectionTitle {
  verbConjugation = "Verb Conjugation",
  adjective = "Adjective",
}

export const convertSectionToTitle = (section: LessonSection) => {
  switch (section) {
    case LessonSection.verbConjugation:
      return LessonSectionTitle.verbConjugation as string;
    case LessonSection.adjective:
      return LessonSectionTitle.adjective as string;
    default:
      return "";
  }
};

export enum ProposalState {
  Pending = 0,
  Active = 1,
  Canceled = 2,
  Defeated = 3,
  Succeeded = 4,
  Queued = 5,
  Expired = 6,
  Executed = 7,
}

export enum CastSupport {
  Against = 0,
  For = 1,
  Abstain = 2,
}
