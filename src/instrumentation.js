// instrumentation.js
export async function register() {
  if (process.env.NODE_ENV === 'development') {
    const { server } = require('../mocks/server');
    server.listen();
  }
}
