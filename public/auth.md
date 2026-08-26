---
title: Sarmaasis discovery API authentication
description: Authentication and access guidance for Sarmaasis public discovery resources.
canonical: https://sarmaasis.com/auth
---

# Sarmaasis discovery API authentication

The Sarmaasis Discovery API is intentionally public and read-only. It exposes professional profile, service, and availability information so a developer or agent can evaluate fit without creating an account, supplying an API key, or completing a sales form. There are no mutation endpoints, customer data endpoints, or protected resources in this API.

## How to access the API

Call any documented `GET` endpoint directly over HTTPS. Start with the OpenAPI contract at [openapi.json](https://sarmaasis.com/openapi.json), then use `/api/v1/profile`, `/api/v1/services`, or `/api/v1/availability`. The service catalogue accepts optional `limit` (1–100) and `cursor` query parameters and returns `pagination.nextCursor` when another page is available. Do not send credentials, cookies, or personal information: none are needed for these public resources.

## Limits and errors

Every response includes RFC RateLimit headers. If a future endpoint returns `429 Too Many Requests`, respect its `Retry-After` header before retrying. Errors are JSON objects with a stable code, a message, and a resolution hint. For an engagement that requires private project details, contact Ashish Sharma by [email](mailto:sarmaasis@gmail.com) or [book a call](https://cal.com/sarmaasis).
