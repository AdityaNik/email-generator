This is a Nextjs + langchain application which generates a email for you based on the purpose and some key points you mention.

## Important Mentions
I have used both the LLM's. Change the api route as per user need in the implementation.

for GEMINI use route (default)
```
api/generate-email-gemini
```
for OPENAI use route
```
api/generate-email-openai
```

## Setup API key's
create a .env.local file in root folder
```
touch .env.local
```
and override it with
```
OPENAI_API_KEY = ''
GOOGLE_API_KEY = ''
```


## Getting Started

Clone the project:
```
git clone https://github.com/AdityaNik/email-generator.git
```
move inside the project:
```
cd email-generator
```
install dependancies:
```
npm install
```

run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
