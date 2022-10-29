export enum ProjectStatus {
  IN_PROGRESS = 'К рассмотрению',
  APPROVED = 'Согласовано',
  NOT_APPROVED = 'Отклонено',
  ARCHIVED = 'В архиве',
  CLOSED = 'Завершено',
  DRAFT = 'Черновик',
}

export enum DocumentStatus {
  IN_PROGRESS = 'К рассмотрению',
  APPROVED = 'Согласовано',
  NOT_APPROVED = 'Отклонено',
  ARCHIVED = 'В архиве',
  CLOSED = 'Завершено',
}

export const Enums = {
  ProjectStatus,
  DocumentStatus,
};
