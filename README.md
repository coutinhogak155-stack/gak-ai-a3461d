# GAK AI — Real AI Chat

This version keeps the GAK AI landing page and adds a working chat interface backed by a Netlify Function.

## Important

Do NOT put your OpenAI API key inside `index.html`, browser JavaScript, GitHub, or any public repository.

The browser calls `/api/chat`. Netlify runs `netlify/functions/chat.mjs`, which reads the secret `OPENAI_API_KEY` and calls the OpenAI Responses API.

## Netlify setup

1. Upload/deploy this project to your GAK AI Netlify site.
2. Open Netlify:
   Project configuration → Environment variables.
3. Add:
   - Key: `OPENAI_API_KEY`
   - Value: your OpenAI API key
   - Scope: Functions (or the default scope that includes Functions)
4. Optional:
   - Key: `OPENAI_MODEL`
   - Value: `gpt-5.6`
5. Redeploy the site after changing environment variables.
6. Open your GAK AI website and go to "Chat with GAK AI".

## GitHub OAuth

GitHub OAuth is not what makes the AI answer messages. The OAuth provider you were configuring in Netlify is for authentication/access. The AI chat needs an OpenAI API key on the server side.

## If the selected model is not available

Change the `OPENAI_MODEL` Netlify environment variable to a model available to your OpenAI API project.

## Local structure

index.html
netlify.toml
netlify/functions/chat.mjs
