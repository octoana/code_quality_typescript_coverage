# TypeScript Code Quality Fixture

This small application is intentionally imperfect. It provides stable findings for testing code-quality analysis and code-coverage ingestion without containing real credentials or unsafe dependencies.

## Run it

```bash
npm install
npm test
npm run test:coverage
npm run build
npm start
```

Coverage reports are written to `coverage/`, including `coverage/lcov.info` for upload to CI or quality tools.

## Intentional findings

- High cognitive complexity in `calculateOrderTotal`
- Duplicated pricing logic in `calculateLegacyTotal`
- Explicit `any` usage
- Magic numbers and hard-coded coupon codes
- String concatenation that could use clearer formatting
- Console logging inside business logic
- Incomplete test coverage for coupon, shipping, oversized-item, and legacy paths

These issues are deliberate. Do not use this project as a production implementation example.