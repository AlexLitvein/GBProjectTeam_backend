export enum ProjectState {
  DRAFT = 'Черновик',
  IN_PROGRESS = 'К рассмотрению',
  FREEZED = 'Заморожено',
  ARCHIVED = 'В архиве',
  DELETED = 'Удалено',
}

export enum ProjectStatus {
  UNDEFINED = 'Не определено',
  ACCEPTED = 'Согласовано',
  REJECTED = 'Отклонено',
}

export enum DocumentStatus {
  UNDEFINED = 'Не определено',
  ACCEPTED = 'Согласовано',
  REJECTED = 'Отклонено',
}

export const Enums = {
  ProjectState,
  ProjectStatus,
  DocumentStatus,
};
