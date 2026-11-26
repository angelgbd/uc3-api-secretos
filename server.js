require('dotenv').config();
const express = require('express');
const _ = require('lodash');
const app = express();

async function cargarApiKey() {
  if (process.env.SECRET_SOURCE === 'vault') {
    if (!process.env.VAULT_ADDR || !process.env.VAULT_TOKEN)
      throw new Error('Falta VAULT_ADDR o VAULT_TOKEN');
    const res = await fetch(
      `${process.env.VAULT_ADDR}/v1/secret/data/api-segura`,
      { headers: { 'X-Vault-Token': process.env.VAULT_TOKEN } }
    );
    if (!res.ok) throw new Error('Bóveda no disponible');
    const body = await res.json();
    const apiKey = body?.data?.data?.API_KEY;
    if (!apiKey) throw new Error('La bóveda no contiene API_KEY');
    return apiKey;
  }
  if (!process.env.API_KEY)
    throw new Error('Falta API_KEY (entorno o Codespaces secret)');
  return process.env.API_KEY;
}

cargarApiKey().then((apiKey) => {
  app.get('/api/datos', (req, res) => {
    if (req.headers['x-api-key'] !== apiKey)
      return res.status(401).json({ error: 'no autorizado' });
    res.json({ ok: true, lodash: _.VERSION });
  });
  app.listen(3000, () => console.log('API lista en puerto 3000'));
}).catch((error) => {
  console.error(error.message);
  process.exit(1);
});
