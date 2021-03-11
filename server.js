import express from 'express';
import React from 'react';
import { renderToNodeStream, renderToString } from 'react-dom/server';
import MyApp from './pages/_app';
import AppContext from './config/context';

const app = express();
app.use('/static', express.static('build'));

app.use('/', async (req, res) => {
  res.write(
    `<!DOCTYPE html><html><head><meta charset="utf-8"/></head><body><div id="app">`
  );

  const contextValue = { restaurantData: {} };

  renderToString(
    <Context.Provider value={contextValue}>
      <App />
    </Context.Provider>
  );

  await Promise.all(contextValue.restaurantData);
  delete contextValue.restaurantData;

  res.write(
    `<script>window.initialData = ${JSON.stringify(contextValue)};</script>`
  );

  const htmlStream = renderToNodeStream(
    <Context.Provider value={contextValue}>
      <App />
    </Context.Provider>
  );

  htmlStream.pipe(res, { end: false });
  htmlStream.on('end', () => {
    res.write(`</div></body><script src="/static/Client.js"></script></html>`);
    res.end();
  });
});

app.listen(3000, '0.0.0.0', () => {
  console.log(`${new Date()} Server listening on port 3000`);
});
