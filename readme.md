# Setup instructions:

- npm install
- add src/.env with variables {VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY}
- npm run dev

# Vercel Deployment URL:

<a href="https://note-manager-zeta.vercel.app/" target="_blank">https://note-manager-zeta.vercel.app/</a>

# Assumptions Made:

No assumptions made

# Technical decisions explained:

- Created src/api directory to handle interacting with supabase APIs with the help of src/services to act like an upper level of interactions with database instead of interacting with it directly using APIs,
- Added model or type for the data comes from supabase APIs and provided utils functions to cast it to models created in frontend
- Added models for the response type from supabase API (type for each response)
- New store to handle Auth management with the help of src/services
- Removed UI based logic from store

# Questions asked during implementation and their answers:

1.

- Question : Does supabase handles functionality of groups and permissions
- Answer : Yes it does.

# Known Limitations:

- Registration from supabase doesn't return status when email is duplicated, it's considered as a new signUp

# Done Parts:

- Integrated with supabase
- Added nodes model to store tree nodes
- Added foreign key owner_id refers to auth.users model
- Created src/api folder to manage api calls from supabase
- Created src/services to act like middleware between api calls and usage of it
- Created utils/treeUtils to manage tree utils like converting from type to another or flatten the nodes and so on
- Created useAuthStore to manage the auth operations with the help of src/services
- Implemented Login, Logout pages and actions
- Updated useTreeStore to adapt with user
- Added useAuthContext to manage auth status

# Future Improvements:

- Improve authentication
- Improve Loading indicators timing upon status changes
- Fix registration problem which is mentioned above
