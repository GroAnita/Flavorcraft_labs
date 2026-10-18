# Flavorcraft_labs

A recipe discovery web app built with Next.js and the Noroff API - Team Alpha's three-week agency project.

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/GroAnita/Flavorcraft_labs.git
```

2. Navigate to the project directory:

```bash
cd Flavorcraft_labs
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

5. See the project:

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment variables

Reading recipes is public, but creating, editing and deleting recipes and posting
comments require a Noroff API key.

### Get an API key

1. Register at `POST https://v2.api.noroff.dev/auth/register` (use your @stud.noroff.no email).
2. Log in with `POST /auth/login` and copy the `accessToken`.
3. Call `POST /auth/create-api-key` with the header `Authorization: Bearer <accessToken>`.
4. Copy the `key` from the response.

See https://docs.noroff.dev/docs/v2/auth/api-key

### Set up locally

1. Copy the example file:
   cp .env.example .env.local
2. Paste your key into `API_KEY` in `.env.local`.
3. Restart the dev server (`npm run dev`).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
