import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty()
  access_token: string;
}

// export interface TokenDto {
//   access_token: string | undefined;
// }

// export class ForbiddenExceptionDto {
//   statusCode: number;
//   message: string;
//   error: string;
// }

// export class ForbiddenExceptionDto {
//   statusCode: number = 403;
//   message: string = 'Дубликаты запрещены';
//   error: string = 'Forbidden';
// }

// export type ResAuthDto = TokenDto | ForbiddenExceptionDto;

// export class ResAuthDto extends (TokenDto || ForbiddenException) {}
