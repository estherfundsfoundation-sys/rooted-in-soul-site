# Rooted In Soul

The official website for Rooted In Soul Hair & Co., an elevated natural-hair experience in Tallahassee, Florida.

## Local setup

```bash
pnpm install
pnpm dev
```

## Stylist Studio

The private `/studio` dashboard lets Shawnie manage the website from her phone:

- upload client photos that automatically populate the public lookbook;
- add, edit, or remove services and pricing;
- publish booking rules and announcements; and
- connect or replace her public Square Appointments URL.

To activate the studio on Vercel:

1. Connect a Vercel Blob store to this project. Vercel adds `BLOB_READ_WRITE_TOKEN` automatically.
2. Add a private `GALLERY_ADMIN_PASSWORD` environment variable in Vercel.
3. Redeploy, then visit `/studio` and sign in with that password.

For local development, copy `.env.example` to `.env.local` and add the same values.

Never add Square passwords, verification codes, or private account credentials to this project. Only the public customer-facing booking URL belongs in the environment setting.

## Publish

This project is connected to GitHub and Vercel. Keep credentials in Vercel environment variables, never in GitHub.

## Brand assets

The current portrait and illustrated Rooted In Soul mark are in `public/images`. Replace or expand these only with images Shawnie owns or has permission to publish.
