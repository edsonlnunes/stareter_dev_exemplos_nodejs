import crypto from "crypto";

export class Growdever {
  private _uid: string;

  get uid(): string {
    return this._uid;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  private _age: number;

  get age(): number {
    return this._age;
  }

  private _skills: string[];

  get skills(): string[] {
    return [...this._skills];
  }

  static growdevers: Growdever[] = [];

  constructor(name: string, age: number, skills?: string[]) {
    this._uid = crypto.randomUUID();
    this._name = name;
    this._age = age;
    this._skills = skills ?? [];
  }

  addSkills(skills: string[]) {
    if (!skills || skills.length === 0) {
      throw new Error("Não é possível adicionar uma lista vazia em skills");
    }

    this._skills.push(...skills);
  }

  removeSkill(skill: string) {
    if (!skill) throw new Error("Skill inválida");

    const indexSkill = this._skills.findIndex((s) => s === skill);

    if (indexSkill < 0) return;

    this._skills.splice(indexSkill, 1);
  }

  updateInformation(name: string, age: number) {
    if (!name) throw new Error("Nome inválido");
    if (!age || age <= 0) throw new Error("Idade inválida");

    this._name = name;
    this._age = age;
  }
}
