Here's how you can add a new command `create-epic` with `--title` and `--description` options using Commander.js and Supabase in TypeScript:

```typescript
import { Command } from 'commander';
import { createClient } from '@supabase/supabase-js';

const program = new Command();
const supabaseUrl = 'your-supabase-url';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

program
  .command('create-epic')
  .option('-t, --title <title>', 'Title of the epic')
  .option('-d, --description <description>', 'Description of the epic')
  .action(async (options) => {
    const { title, description } = options;

    try {
      const { data, error } = await supabase
        .from('epics')
        .insert([
          { title, description }
        ]);

      if (error) {
        console.error('Error inserting epic:', error.message);
        return;
      }

      console.log('Epic created with ID:', data[0].id);
    } catch (err) {
      console.error('Unexpected error:', err.message);
    }
  });

program.parse(process.argv);
```

In this script, we define a new command `create-epic` with `--title` and `--description` options. The action for this command is an async function that uses the Supabase client to insert a new row into the `epics` table with the provided title and description.

If the insertion is successful, the ID of the newly created epic is logged to the console. If there's an error during the insertion, the error message is logged to the console.

Please replace `'your-supabase-url'` and `'your-supabase-key'` with your actual Supabase URL and key.