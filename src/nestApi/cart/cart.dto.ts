import { IsNotEmpty } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class UpdateCartQuery {
  @IsNotEmpty()
  @ApiModelProperty()
  readonly cartId: string
  @ApiModelProperty({required: false})
  readonly token?: string 
}

export class CreateCartQuery {
  @ApiModelProperty()
  readonly token?: string
}

export class CouponQuery extends UpdateCartQuery {
  @IsNotEmpty()
  @ApiModelProperty()
  readonly coupon: string
}

export class CartItemBody<I> {
  @ApiModelProperty()
  readonly qty: number
  @ApiModelProperty()
  readonly sku: string
  @ApiModelProperty()
  readonly quoteId: string
  [key: string]: any
}

export class CartBody<I> {
  @ApiModelProperty({required: false})
  readonly cartItem: CartItemBody<I>[]

  @ApiModelProperty({required: false})
  readonly methods?: any
}

export class CartInfoBody {
  @IsNotEmpty()
  @ApiModelProperty()
  address: object
}
