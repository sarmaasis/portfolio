import type { APIGatewayProxyHandler } from 'aws-lambda';
import { render } from '../dist/server.js';

export const handler: APIGatewayProxyHandler = async () => {
  const html = render();
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: html
  };
};
