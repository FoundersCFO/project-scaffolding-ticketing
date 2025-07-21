Here is a sample TypeScript code using Commander.js and Supabase:

```typescript
import { Command } from 'commander';
import { createClient } from '@supabase/supabase-js';

const program = new Command();

// Assuming Supabase URL and key are stored in environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

program
  .command('create-epic')
  .option('-t, --title <title>', 'Title of the epic')
  .option('-d, --description <description>', 'Description of the epic')
  .action(async (options) => {
    const { title, description } = options;

    if (!title || !description) {
      console.error('Both title and description are required.');
      process.exit(1);
    }

    try {
      const { data, error } = await supabase
        .from('epics')
        .insert([
          { title, description },
        ]);

      if (error) {
        console.error('Error inserting epic:', error);
        process.exit(1);
      }

      console.log('Epic created with ID:', data[0].id);
    } catch (err) {
      console.error('Unexpected error:', err);
      process.exit(1);
    }
  });

program.parse(process.argv);
```

This script adds a new command `create-epic` with `--title` and `--description` options. When the command is executed, it inserts a new row into the `epics` table in Supabase with the provided title and description. If the insertion is successful, it logs the ID of the created epic. If there is an error, it logs the error and exits the process with a non-zero status code.