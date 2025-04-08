import * as Yup from "yup";
import { Gender, WordPattern } from "../../types/types";

const onlyUseEmailFormMsg = "Please fill with email form.";
const requiredMsg = "You need to fill";
const avoideBlankMsg = "You cannot use space in";
const atleast8lettersMsg = "Please fill with at least 8 letters in";
const onlyUseNumberAndAlphabetMsg =
  "Please fill with only number and alphabet in";
const onlyUseAlphabetMsg = "Please fill with only alphabet in";
const onlyUseJapaneseMsg =
  "Please fill with only full-width kanji, katakana or hiragana in";
const onlyUseHiranagaMsg = "Please fill with only full-width hiragana in";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email(onlyUseEmailFormMsg)
    .required(`${requiredMsg} email.`),
  password: Yup.string()
    .matches(/^([^ ]*)$/, `${avoideBlankMsg} password`)
    .min(8, `${atleast8lettersMsg} password`)
    .required(),
});

export const createNewUserSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^([0-9a-zA-Z]*)$/, `${onlyUseNumberAndAlphabetMsg} username.`)
    .min(8, `${atleast8lettersMsg} username`)
    .required(`${requiredMsg} username.`),
  firstName: Yup.string()
    .matches(/^([a-zA-Z]*)$/, `${onlyUseAlphabetMsg} fitst name.`)
    .required(`${requiredMsg} first name.`),
  lastName: Yup.string()
    .matches(/^([a-zA-Z]*)$/, `${onlyUseAlphabetMsg} last name.`)
    .required(`${requiredMsg} last name.`),
  email: Yup.string()
    .email(onlyUseEmailFormMsg)
    .required(`${requiredMsg} email.`),
  gender: Yup.mixed<Gender>()
    .oneOf(Object.values(Gender))
    .required(`${requiredMsg} gender.`),
  birthDate: Yup.date().required(`${requiredMsg} date of birth.`),
  password: Yup.string()
    .matches(/^([^ ]*)$/, `${avoideBlankMsg} password`)
    .min(8, `${atleast8lettersMsg} password`)
    .required(`${requiredMsg} pasword.`),
  confirmationPassword: Yup.string()
    .required(`${requiredMsg} confirmation password.`)
    .oneOf(
      [Yup.ref("password")],
      "Your password does not match with confirmation password."
    ),
});

export const updateUserInfoSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^([0-9a-zA-Z]*)$/, `${onlyUseNumberAndAlphabetMsg} username.`)
    .min(8, `${atleast8lettersMsg} username`)
    .required(`${requiredMsg} username.`),
  firstName: Yup.string()
    .matches(/^([a-zA-Z]*)$/, `${onlyUseAlphabetMsg} fitst name.`)
    .required(`${requiredMsg} first name.`),
  lastName: Yup.string()
    .matches(/^([a-zA-Z]*)$/, `${onlyUseAlphabetMsg} last name.`)
    .required(`${requiredMsg} last name.`),
  email: Yup.string()
    .email(onlyUseEmailFormMsg)
    .required(`${requiredMsg} email.`),
  gender: Yup.mixed<Gender>()
    .oneOf(Object.values(Gender))
    .required(`${requiredMsg} gender.`),
  birthDate: Yup.string().required(`${requiredMsg} date of birth.`),
  introduction: Yup.string(),
});

export const createNewTestQuestionSchema = Yup.object().shape({
  question: Yup.string()
    .matches(
      /^[ぁ-んァ-ヶ一-龠　!"#$%&'()*+-.,\/:;<=>?@[\]^_`{|}~。、？]*$/,
      `${onlyUseJapaneseMsg} question.`
    )
    /*.test("includeAnswerOrNot", "includeAnswer", (value) => {
      return value?.search(Yup.ref("answer")); // answerはidなので断念
    })*/
    .required(`${requiredMsg} question.`),
  meaning: Yup.string()
    .matches(
      /^([a-zA-Z !"#$%&'()*+-.,\/:;<=>?@[\]^_`{|}~]*)$/,
      `${onlyUseAlphabetMsg} meaning.`
    )
    .required(`${requiredMsg} meaning.`),
  answer: Yup.string().required(`${requiredMsg} answer.`),
  lesson: Yup.string().required(`${requiredMsg} lesson.`),
  options: Yup.array()
    .of(Yup.string())
    .min(3, "You have to add 3 options at least.")
    .required(`${requiredMsg} options.`),
});

export const editTestQuestionSchema = Yup.object().shape({
  _id: Yup.string().required(`${requiredMsg} id.`),
  question: Yup.string()
    .matches(
      /^[ぁ-んァ-ヶ一-龠　!"#$%&'()*+-.,\/:;<=>?@[\]^_`{|}~。、？]*$/,
      `${onlyUseJapaneseMsg} question.`
    )
    /*.test("includeAnswerOrNot", "includeAnswer", (value) => {
      return value?.search(Yup.ref("answer")); // answerはidなので断念
    })*/
    .required(`${requiredMsg} question.`),
  meaning: Yup.string()
    .matches(
      /^([a-zA-Z !"#$%&'()*+-.,\/:;<=>?@[\]^_`{|}~]*)$/,
      `${onlyUseAlphabetMsg} meaning.`
    )
    .required(`${requiredMsg} meaning.`),
  answer: Yup.string().required(`${requiredMsg} answer.`),
  lesson: Yup.string().required(`${requiredMsg} lesson.`),
  options: Yup.array()
    .of(Yup.string())
    .min(3, "You have to add 3 options at least.")
    .required(`${requiredMsg} options.`),
});

export const createProposalSchema = Yup.object().shape({
  title: Yup.string().required(`${requiredMsg} title.`),
  detail: Yup.string().required(`${requiredMsg} detail.`),
  target: Yup.string()
    .length(42, "This is not public address.")
    .required(`${requiredMsg} target.`),
  value: Yup.number().min(0, "No minus.").required(`${requiredMsg} value.`),
  calldata: Yup.string().required(`${requiredMsg} calldata.`),
});

// example
/*export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required(`名は${requireMessage}`),
  lastName: Yup.string().required(`姓は${requireMessage}`),
  firstNameKana: Yup.string()
    .matches(/^[ァ-ヶー　]*$/, katakanaFormMessage)
    .required(`メイは${requireMessage}`),
  lastNameKana: Yup.string()
    .matches(/^[ァ-ヶー　]*$/, katakanaFormMessage)
    .required(`セイは${requireMessage}`),
  email: Yup.string()
    .email(emailFormatMessage)
    .required(`メールアドレスは${requireMessage}`),
  password: Yup.string()
    .matches(/^([^ ]*)$/, blankMixedMessage)
    .min(8, minEightTextMessage)
    .required(`パスワードは${requireMessage}`),
  confirmingPassword: Yup.string()
    .required(`パスワード(確認用)は${requireMessage}`)
    .oneOf(
      [Yup.ref("password"), null],
      unMatchPasswordConfirmationMessageOnRegister
    ),
  privateKey: Yup.string()
    .matches(/^([^ ]*)$/, blankMixedMessage)
    .required(`認証コードは${requireMessage}`),
  chapter: Yup.object().required(`チャプターは${requireMessage}`),
});*/
