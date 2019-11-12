import { IsNotEmpty, IsEmail, Length } from 'class-validator'

class Customer {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string  

  @IsNotEmpty()
  readonly firstname: string

  @IsNotEmpty()
  readonly lastname: string
}

export class UserBody {
  @IsNotEmpty()
  readonly customer: Customer

  @Length(8, 30)
  @IsNotEmpty()
  readonly password: string
}

export class LoginUserBody {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string
}