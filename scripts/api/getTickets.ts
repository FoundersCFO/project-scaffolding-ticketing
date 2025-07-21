Here is an example of how you can create a `getOpenTickets` function in TypeScript. This function uses the Supabase JavaScript client to interact with your Supabase database.

First, you need to install the Supabase JavaScript client. You can do this by running the following command:

```bash
npm install @supabase/supabase-js
```

Then, you can use the following code to create the `getOpenTickets` function:

```typescript
import { createClient, SupabaseClient, PostgrestError } from '@supabase/supabase-js';

let supabase: SupabaseClient;

function initializeSupabase(url: string, key: string) {
  supabase = createClient(url, key);
}

async function getOpenTickets() {
  try {
    let { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('status', 'open')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data;
  } catch (error: any) {
    console.error('Error fetching open tickets:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch open tickets' }),
    };
  }
}
```

In this code:

- The `initializeSupabase` function is used to initialize the Supabase client. You need to call this function before you can use the `getOpenTickets` function.
- The `getOpenTickets` function queries the `tickets` table for rows where `status = 'open'` and orders the results by `created_at` in descending order.
- If there is an error while fetching the data, the function logs the error and returns a response with a status code of 500.

Note: You need to replace `url` and `key` in `initializeSupabase` function with your actual Supabase URL and public anon key.