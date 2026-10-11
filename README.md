# mypal-inc-admin

MyPal Inc website, built with React and Vite.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the **project root** (next to `package.json`, not in `src/`) from the example, then fill in `VITE_API_KEY`:

   ```bash
   cp .env.example .env
   ```

   | Variable | Description |
   | --- | --- |
   | `VITE_API_BASE_URL` | MyPal API base URL, including `/v1` (e.g. `https://staging-api.mypal-inc.com/v1`) |
   | `VITE_API_KEY` | App API key sent as the `X-API-Key` header. Ask the team for the value. |

3. Start the dev server:

   ```bash
   npm run dev
   ```

Vite reads `.env` only when the dev server starts, so restart it after changing these values.

### Troubleshooting

If requests go to `http://localhost:5173/undefined/...` and return 404, or the page shows `Cannot read properties of undefined (reading 'replace')`, Vite isn't loading your `.env`. Check that the file is in the project root, then restart `npm run dev`.
