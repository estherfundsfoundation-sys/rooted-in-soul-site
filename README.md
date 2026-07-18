# Rooted In Soul

The official website for Rooted In Soul Hair & Co., an elevated natural-hair experience in Tallahassee, Florida.

## Local setup

```bash
pnpm install
pnpm dev
```

## Connect Square Appointments

1. Copy `.env.example` to `.env.local`.
2. Paste Shawnie's public Square Appointments booking URL after `NEXT_PUBLIC_SQUARE_BOOKING_URL=`.
3. Restart the site. The temporary booking placeholder will automatically become a live booking button.

Never add Square passwords, verification codes, or private account credentials to this project. Only the public customer-facing booking URL belongs in the environment setting.

## Publish

This project is ready for a GitHub repository and Vercel. Vercel should detect the project automatically. Add `NEXT_PUBLIC_SQUARE_BOOKING_URL` under the project's Environment Variables when the Square page is ready.

## Brand assets

The current portrait and illustrated Rooted In Soul mark are in `public/images`. Replace or expand these only with images Shawnie owns or has permission to publish.
