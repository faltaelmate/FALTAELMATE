const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MercadoPagoConfig, Preference } = require('mercadopago');

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const publicStoreUrl = process.env.PUBLIC_STORE_URL || 'https://faltaelmate.github.io/FALTAELMATE';

const corsOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (corsOrigins.length === 0 || corsOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Origen no permitido por CORS'));
  }
}));
app.use(express.json());

if (!process.env.MP_ACCESS_TOKEN) {
  console.error('Falta la variable MP_ACCESS_TOKEN en el entorno.');
  process.exit(1);
}

const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});
const preferenceClient = new Preference(mpClient);

app.get('/api/health', (_, res) => {
  res.json({ ok: true });
});

app.post('/api/create-preference', async (req, res) => {
  try {
    const { items, payer, shipping } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No hay productos para cobrar.' });
    }

    const normalizedItems = items.map((item, index) => {
      const title = String(item.title || '').trim();
      const quantity = Number(item.quantity);
      const unitPrice = Number(item.unit_price);

      if (!title || !Number.isFinite(quantity) || quantity <= 0 || !Number.isFinite(unitPrice) || unitPrice <= 0) {
        throw new Error('Producto inválido en posición ' + (index + 1));
      }

      return {
        title,
        quantity,
        unit_price: unitPrice,
        currency_id: 'ARS'
      };
    });

    const preferenceResponse = await preferenceClient.create({
      body: {
        items: normalizedItems,
        payer: {
          first_name: payer?.first_name || '',
          last_name: payer?.last_name || '',
          email: payer?.email || '',
          phone: {
            number: payer?.phone?.number || ''
          }
        },
        metadata: {
          shipping: shipping || {}
        },
        back_urls: {
          success: publicStoreUrl + '/checkout.html?status=success',
          failure: publicStoreUrl + '/checkout.html?status=failure',
          pending: publicStoreUrl + '/checkout.html?status=pending'
        },
        auto_return: 'approved'
      }
    });

    return res.json({
      id: preferenceResponse.id,
      init_point: preferenceResponse.init_point,
      sandbox_init_point: preferenceResponse.sandbox_init_point
    });
  } catch (error) {
    const message = error?.message || 'No se pudo crear la preferencia de pago.';
    console.error('Error al crear preferencia:', message);
    return res.status(500).json({ error: message });
  }
});

app.listen(port, () => {
  console.log('Servidor de pagos escuchando en http://localhost:' + port);
});
