import { IsNotEmpty } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class ProductQuery {
  @IsNotEmpty()
  @ApiModelProperty()
  readonly skus: string

  @ApiModelProperty()
  readonly storeId: string
}
