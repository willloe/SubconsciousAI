# SWOT Prompt Explorer

SWOT Prompt Explorer is a small strategy exploration app built as a take-home assignment. It lets a user select a product, business objective, and market segment, then generate one full insight pack across nine planning categories. The UI is designed as a lightweight internal decision-support workspace, while generation happens server-side through the OpenAI API so secrets remain on the server and are never exposed to the client.

## Features

- Select a `product`, `business objective`, and `market segment`
- Generate one full insight pack in a single server request
- Browse the returned categories through tabs without triggering additional API calls
- Preserve previous results while refreshing a new insight pack
- Handle loading, stale-state, and API error states inline in the workspace

## How It Works

1. The user selects a product, objective, and market segment.
2. Clicking `Generate insights` sends one request to the server with those three inputs.
3. The server builds a structured prompt, calls the OpenAI API, and requests one JSON response containing all nine categories.
4. The client stores that full result set locally and uses the category tabs only to switch between already-generated sections.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React
- Vercel for deployment
- OpenAI Responses API via server-side fetch

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a local env file:

```bash
# .env.local
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4.1-mini
```

3. Start the development server:

```bash
npm run dev
```

4. Open `http://localhost:3000`

## Required Environment Variables

- `OPENAI_API_KEY`
  Required. Used only on the server to call OpenAI.
- `OPENAI_MODEL`
  Optional. Defaults to `gpt-4.1-mini` in the current implementation.

## Deployment Notes for Vercel

- Set `OPENAI_API_KEY` in the Vercel project environment variables.
- Optionally set `OPENAI_MODEL` if you want to override the default model.
- No database, auth, or persistence setup is required for deployment.
- The app is structured to work as a standard Next.js deployment on Vercel.

## Design Decisions and Tradeoffs

- One generate action returns the full insight pack so the user gets a coherent result set and the client avoids multiple browser requests.
- Tabs are used only for browsing results, not for generation, to keep the interaction model simple.
- API calls are server-side only so secrets never enter client code.
- Structured JSON output was chosen to keep the rendering predictable and easy to explain in an interview.
- The UI prioritizes desktop polish and reviewer readability over broad feature scope.

## Known Limitations / Future Improvements

- There is no persistence or history of previous generations.
- Output quality depends on the selected model and prompt behavior.
- The app currently supports a fixed set of products, objectives, segments, and categories.
- There is no streaming response or partial rendering during long generations.
- Future improvements could include prompt iteration tools, richer export/share flows, and stronger runtime validation of model responses.

## Submission Links

- Deployed app: `https://subconscious-ai-one.vercel.app/`
- GitHub repo: `https://github.com/willloe/SubconsciousAI`
