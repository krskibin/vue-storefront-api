import { IsNotEmpty, IsEmail, Length } from 'class-validator'

class Customer {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string  

  @IsNotEmpty()
  readonly firstname: string

  @IsNotEmpty()
  readonly lastname: string
  groupToken?: string
}

export class UserBody {
  @IsNotEmpty()
  readonly customer: Customer

  @Length(8, 30)
  @IsNotEmpty()
  readonly password: string
}

export class RefreshTokenUserBody {
  @IsNotEmpty()
  refreshToken: string
}

export class LoginUserBody {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string

  token?: string
}

export class UpdateUserBody {
  customer: any
}

export class LoginUserQuery {
  @IsNotEmpty()
  readonly token: string
}