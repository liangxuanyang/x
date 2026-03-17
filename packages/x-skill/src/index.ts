export interface XSkillContext {
  input: string;
}

export interface XSkill {
  id: string;
  description?: string;
  run: (context: XSkillContext) => string | Promise<string>;
}

export function defineXSkill(skill: XSkill) {
  return skill;
}
