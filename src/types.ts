import { ApiProperty } from '@nestjs/swagger';

export enum ProjectStatus {
  IN_PROGRESS = 'К рассмотрению',
  APPROVED = 'Согласовано',
  NOT_APPROVED = 'Отклонено',
  // ARCHIVED = 'В архиве',
  // FREEZED = 'Заморожено',
  DRAFT = 'Черновик',
}

// export enum DocumentStatus {
//   // IN_WAIT = 'В ожидании',
//   IN_PROGRESS = 'К рассмотрению',
//   APPROVED = 'Согласовано',
//   NOT_APPROVED = 'Отклонено',
//   // ARCHIVED = 'В архиве',
//   // CLOSED = 'Завершено',
// }

export const Enums = {
  ProjectStatus,
  // DocumentStatus,
};

export class UserPopulate {
  @ApiProperty({ type: 'string', description: 'mongo ObjectId' })
  _id: string;

  @ApiProperty({ type: 'string' })
  firstName: string;

  @ApiProperty({ type: 'string' })
  lastName: string;
}
