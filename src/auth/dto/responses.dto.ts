import { ApiProperty } from '@nestjs/swagger';
import { EditUserDto, UserDto } from 'user/dto';

export class TokenDto {
  @ApiProperty()
  token: string;
}

export class AuthResponse extends TokenDto {
  @ApiProperty()
  user: EditUserDto;
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
