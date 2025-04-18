import { LessonSection } from "../../../types/types";

export const tests1: LessonTest = {
  section: LessonSection.verbConjugation,
  unit: 1,
  questions: [
    {
      id: 0,
      question: "I write this with the blue pen",
      answer: "私はこれを青いペンで書く",
      datas: [
        { data: { word: "私は" } },
        { data: { word: "これを" } },
        { data: { word: "青い" } },
        { data: { word: "ペン" } },
        { data: { word: "で" } },
        { data: { word: "書く" } },
        { data: { word: "赤い", dummy: true } },
        { data: { word: "鉛筆", dummy: true } },
        { data: { word: "が" } },
      ],
    },
    {
      id: 1,
      question: "I wake up at 6 o'clock",
      answer: "六時に起きる",
      datas: [
        { data: { word: "六時" } },
        { data: { word: "に" } },
        { data: { word: "起きる" } },
        { data: { word: "七時", dummy: true } },
        { data: { word: "眠る", dummy: true } },
        { data: { word: "は", dummy: true } },
      ],
    },
    {
      id: 2,
      question: "I talk with a friend",
      answer: "友達と話す",
      datas: [
        { data: { word: "友達" } },
        { data: { word: "と" } },
        { data: { word: "話す" } },
        { data: { word: "家族", dummy: true } },
        { data: { word: "は", dummy: true } },
        { data: { word: "黙る", dummy: true } },
      ],
    },
    {
      id: 3,
      question: "I don't swim in the sea",
      answer: "海で泳がない",
      datas: [
        { data: { word: "海" } },
        { data: { word: "で" } },
        { data: { word: "泳がない" } },
        { data: { word: "山", dummy: true } },
        { data: { word: "が", dummy: true } },
        { data: { word: "登らない", dummy: true } },
      ],
    },
    {
      id: 4,
      question: "I don't buy watches",
      answer: "私は時計を買わない",
      datas: [
        { data: { word: "私は" } },
        { data: { word: "時計" } },
        { data: { word: "を" } },
        { data: { word: "買わない" } },
        { data: { word: "売らない", dummy: true } },
        { data: { word: "に", dummy: true } },
      ],
    },
    {
      id: 5,
      question: "I don't think that thing",
      answer: "あのことを考えない",
      datas: [
        { data: { word: "あのこと" } },
        { data: { word: "を" } },
        { data: { word: "考えない" } },
        { data: { word: "あのもの", dummy: true } },
        { data: { word: "が", dummy: true } },
        { data: { word: "教えない", dummy: true } },
      ],
    },
    {
      id: 6,
      question: "I don't eat fish",
      answer: "あのことを考えない",
      datas: [
        { data: { word: "魚" } },
        { data: { word: "を" } },
        { data: { word: "食べない" } },
        { data: { word: "肉", dummy: true } },
        { data: { word: "が", dummy: true } },
        { data: { word: "作らない", dummy: true } },
      ],
    },
    {
      id: 7,
      question: "I don't make spice",
      answer: "スパイスを作らない",
      datas: [
        { data: { word: "スパイス" } },
        { data: { word: "を" } },
        { data: { word: "作らない" } },
        { data: { word: "カラシ", dummy: true } },
        { data: { word: "に", dummy: true } },
        { data: { word: "売らない", dummy: true } },
      ],
    },
  ],
};

export const tests2: LessonTest = {
  section: LessonSection.verbConjugation,
  unit: 2,
  questions: [
    {
      id: 0,
      question: "I ate ramen",
      answer: "ラーメンを食べた",
      datas: [
        { data: { word: "ラーメン" } },
        { data: { word: "を" } },
        { data: { word: "食べた" } },
        { data: { word: "つけ麺", dummy: true } },
        { data: { word: "で", dummy: true } },
        { data: { word: "作った", dummy: true } },
      ],
    },
    {
      id: 1,
      question: "I lent a book",
      answer: "本を貸した",
      datas: [
        { data: { word: "本" } },
        { data: { word: "を" } },
        { data: { word: "貸した" } },
        { data: { word: "絵", dummy: true } },
        { data: { word: "に", dummy: true } },
        { data: { word: "借りた", dummy: true } },
      ],
    },
    {
      id: 2,
      question: "I drunk water",
      answer: "水を飲んだ",
      datas: [
        { data: { word: "水" } },
        { data: { word: "を" } },
        { data: { word: "飲んだ" } },
        { data: { word: "酒", dummy: true } },
        { data: { word: "は", dummy: true } },
        { data: { word: "食べた", dummy: true } },
      ],
    },
    {
      id: 3,
      question: "I swam in the pool",
      answer: "プールで泳いだ",
      datas: [
        { data: { word: "プール" } },
        { data: { word: "で" } },
        { data: { word: "泳いだ" } },
        { data: { word: "海", dummy: true } },
        { data: { word: "が", dummy: true } },
        { data: { word: "遊んだ", dummy: true } },
      ],
    },
    {
      id: 4,
      question: "I didn't talk with the person",
      answer: "その人と話さなかった",
      datas: [
        { data: { word: "その人" } },
        { data: { word: "と" } },
        { data: { word: "話さなかった" } },
        { data: { word: "は", dummy: true } },
        { data: { word: "黙らなかった", dummy: true } },
      ],
    },
    {
      id: 5,
      question: "I didn't wake up at 8 o'clock",
      answer: "八時に起きなかった",
      datas: [
        { data: { word: "八時" } },
        { data: { word: "に" } },
        { data: { word: "起きなかった" } },
        { data: { word: "九時", dummy: true } },
        { data: { word: "が", dummy: true } },
        { data: { word: "寝なかった", dummy: true } },
      ],
    },
    {
      id: 6,
      question: "I didn't wear the cloth",
      answer: "その服を着なかった",
      datas: [
        { data: { word: "その服" } },
        { data: { word: "を" } },
        { data: { word: "着なかった" } },
        { data: { word: "その帽子", dummy: true } },
        { data: { word: "が", dummy: true } },
        { data: { word: "脱がなかった", dummy: true } },
      ],
    },
    {
      id: 7,
      question: "He didn't come to the station",
      answer: "彼は駅に来なかった",
      datas: [
        { data: { word: "彼" } },
        { data: { word: "は" } },
        { data: { word: "駅" } },
        { data: { word: "に" } },
        { data: { word: "来なかった" } },
        { data: { word: "彼女", dummy: true } },
        { data: { word: "で", dummy: true } },
        { data: { word: "行かなかった", dummy: true } },
      ],
    },
    {
      id: 8,
      question: "Dinner was not there",
      answer: "夕食がなかった",
      datas: [
        { data: { word: "夕食" } },
        { data: { word: "が" } },
        { data: { word: "なかった" } },
        { data: { word: "昼食", dummy: true } },
        { data: { word: "で", dummy: true } },
        { data: { word: "あった", dummy: true } },
      ],
    },
    {
      id: 9,
      question: "I didn't teach the place",
      answer: "その場所を教えなかった",
      datas: [
        { data: { word: "その場所" } },
        { data: { word: "を" } },
        { data: { word: "教えなかった" } },
        { data: { word: "その事", dummy: true } },
        { data: { word: "に", dummy: true } },
        { data: { word: "学ばなかった", dummy: true } },
      ],
    },
  ],
};

const tests = [tests1, tests2];

export default tests;
