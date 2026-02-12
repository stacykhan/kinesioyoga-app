# KinesioYoga Monorepo

Production-ready starter monorepo for a yoga mobile app (Expo) and web admin panel (Next.js) backed by Supabase and RevenueCat.

## Stack
- Monorepo: pnpm workspaces
- Mobile: Expo + TypeScript + expo-router + TanStack Query
- Admin: Next.js 14 App Router + TypeScript + Tailwind
- Backend: Supabase (Auth, Postgres, RLS)
- Paywall: RevenueCat (`react-native-purchases`)
- Validation: zod

## Repository layout
- `apps/mobile`: iOS/Android app
- `apps/admin`: web admin panel
- `supabase/schema.sql`: DB schema + RLS + triggers
- `supabase/seed.sql`: sample content seed

## 1) Install
```bash
pnpm install
```

## 2) Supabase setup
1. Create a Supabase project.
2. Open SQL Editor and run `supabase/schema.sql`.
3. Run `supabase/seed.sql`.
4. Create an admin user in Auth, then set role manually:
```sql
update public.profiles set role = 'admin' where id = '<admin-user-uuid>';
```

## 3) Configure env
Copy root env:
```bash
cp .env.example .env
```
Set:
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `EXPO_PUBLIC_REVENUECAT_IOS_API_KEY`
- `EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY`

## 4) Run mobile
```bash
pnpm --filter mobile start
```

## 5) Run admin
```bash
pnpm --filter admin dev
```

## 6) RevenueCat setup
1. Create app in RevenueCat for iOS + Android.
2. Create entitlement with identifier: `premium`.
3. Create offering with identifier: `default` and attach packages/products.
4. Put platform API keys into env vars.

## Notes
- Premium gating checks `is_premium` + RevenueCat entitlement `premium`.
- Anonymous users can only fetch free lessons due to RLS policy.
- Save/Favorite + Done actions require authentication.
- Lesson/category/program localized content comes from JSON translations fields in DB (`en`, `ru`, `it`).
