# BuildPilot AI deployment

## Vercel
1. Upload this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Run `db/schema.sql` in the Supabase SQL editor.
5. Insert the first site row described in README.md.
6. Deploy.

The homepage works immediately. Live CRM and dashboard data require the Supabase setup above.
