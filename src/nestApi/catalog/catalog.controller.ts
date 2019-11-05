import { Controller, Post, Get, Options, Req, Res } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CatalogService } from './catalog.service';


@ApiUseTags('catalog')
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post('/*')
  processPostRequest(@Req() req: Request, @Res() res: Response) {
    let requestBody = req.body
    this.catalogService.processRequest(req, res, requestBody)
  }

  @Options('/*')
  processOptionRequest(@Req() req: Request, @Res() res: Response) {
    let requestBody = req.body
    this.catalogService.processRequest(req, res, requestBody)
  }

  @Get('/*')
  processGetRequest(@Req() req: Request, @Res() res: Response) {
    let requestBody = {}
    if(req.query.request) {
      requestBody = JSON.parse(decodeURIComponent(req.query.request))
      console.log(requestBody)
    }
    this.catalogService.processRequest(req, res, requestBody)
  }
}