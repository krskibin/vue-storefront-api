import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import { Request } from 'express-serve-static-core';
import config from 'config'
import ProcessorFactory from '../../processor/factory';
import request from 'request';
import jwt from 'jwt-simple';

const _updateQueryStringParameter = (uri: string, key: string, value:string): string => {
  const re = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");
  if (uri.match(re)) {
		if (value) {
			return uri.replace(re, '$1' + key + "=" + value + '$2');
		} else {
			return uri.replace(re, '$1' + '$2');
		}
  } else {
    let hash =  '';
    if( uri.indexOf('#') !== -1 ){
        hash = uri.replace(/.*#/, '#');
        uri = uri.replace(/#.*/, '');
    }
    const separator = uri.indexOf('?') !== -1 ? "&" : "?";
    return uri + separator + key + "=" + value + hash;
  }
}

@Injectable()
export class CatalogService {
  processRequest(req: Request, res: Response, requestBody: any) {
    let groupId: number
    const esConfig = config.get('elasticsearch') as any
    const [_, ...urlSegments] = req.url.split('/');
    console.log(urlSegments)

    let indexName = ''
    let entityType = ''
    if (urlSegments.length < 2)
      throw new Error('No index name given in the URL. Please do use following URL format: <base>/catalog/<index_name>/<entity_type>_search')
    else {
      indexName = urlSegments[1];

      if (urlSegments.length > 2)
        entityType = urlSegments[2]

      if (esConfig.indices.indexOf(indexName) < 0) {
        throw new Error('Invalid / inaccessible index name given in the URL. Please do use following URL format: <base>/api/catalog/<index_name>/_search')
      }

      if (urlSegments[urlSegments.length - 1].indexOf('_search') !== 0) {
        throw new Error('Please do use following URL format: /api/catalog/<index_name>/_search')
      }
    }

    const requestUrl = req.url.replace('/catalog', '')
    // pass the request to elasticsearch
    let url = esConfig.host + ':' + esConfig.port + (req.query.request ? _updateQueryStringParameter(requestUrl, 'request', null) : requestUrl)

    if (!url.startsWith('http')) {
      url = 'http://' + url
    }

    // Check price tiers
    if (config.get('usePriceTiers')) {
      const userToken = (requestBody as any).groupToken

      // Decode token and get group id
      if (userToken && userToken.length > 10) {
        const decodeToken = jwt.decode(userToken, (config as any).authHashSecret ? (config as any).authHashSecret : (config as any).objHashSecret)
        groupId = decodeToken.group_id || groupId
      }

      delete (requestBody as any).groupToken
    }

    let auth = null;

    // Only pass auth if configured
    if (esConfig.user || esConfig.password) {
      auth = {
        user: esConfig.user,
        pass: esConfig.password
      };
    }
    console.log(url)

    request({ // do the elasticsearch request
      uri: url,
      method: req.method,
      body: requestBody,
      json: true,
      auth: auth,
    }, function (_err: Error, _res: Response, _resBody: any) { // TODO: add caching layer to speed up SSR? How to invalidate products (checksum on the response BEFORE processing it)
      if (_resBody && _resBody.hits && _resBody.hits.hits) { // we're signing up all objects returned to the client to be able to validate them when (for example order)

        const factory = new ProcessorFactory(config)
        let resultProcessor = factory.getAdapter(entityType, indexName, req, res)

        if (!resultProcessor)
          resultProcessor = factory.getAdapter('default', indexName, req, res) // get the default processor

        if (entityType === 'product') {
          resultProcessor.process(_resBody.hits.hits, groupId).then((result) => {
            _resBody.hits.hits = result
            res.json(_resBody);
          }).catch((err: Error) => {
            console.error(err)
          })
        } else {
          resultProcessor.process(_resBody.hits.hits).then((result) => {
            _resBody.hits.hits = result
            res.json(_resBody);
          }).catch((err: Error) => {
            console.error(err)
          })
        }

      } else {
        res.json(_resBody);
      }
    });
  }
}
