// domain/user/User.ts

import { Firestore } from "firebase/firestore";

export interface CustomerRepository {
  register(uid: string, customer: Customer): Promise<void>;
  getByID(id: string): Promise<Customer>;
}

export class Customer {
  _id: string; // firebaseユーザー認証クレデンシャルのuid
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  fullName?: string;
  gender: string; // Gender として扱えます
  birthDate: Date;
  introduction?: string;

  constructor(
    _id: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    gender: string,
    birthDate: Date,
    fullName?: string,
    introduction?: string
  ) {
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.gender = gender;
    this.birthDate = birthDate;
    // fullName が指定されなければ firstName と lastName を結合
    this.fullName = fullName || `${firstName} ${lastName}`;
    this.introduction = introduction;
  }

  // エンティティとしてのビジネスロジック
  public changeName(firstName: string, lastName: string) {
    // 不変性を保つため、新しいインスタンスを返すパターンなどが考えられます
    // (今回はセキュアに値を保持したいのでメソッドを通してのみ更新可能にする)
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public static toDomainModel(
    _id: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    gender: string,
    birthDate: Date,
    fullName?: string,
    introduction?: string
  ): Customer {
    return new Customer(
      _id,
      firstName,
      lastName,
      username,
      email,
      gender,
      birthDate,
      fullName,
      introduction
    );
  }

  public toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      email: this.email,
      gender: this.gender,
      birthDate: this.birthDate.toISOString(),
      fullName: this.fullName ?? null,
      introduction: this.introduction ?? null,
    };
  }
}
