```typescript
import { SupabaseClient } from '@supabase/supabase-js';

interface LogCodexRunParams {
  ticket_id: string;
  prompt_template: string;
  input_context: string;
  output_code: string;
  status: 'success' | 'error';
  error: string | null;
}

async function logCodexRun(supabase: SupabaseClient, params: LogCodexRunParams): Promise<void> {
  const { ticket_id, prompt_template, input_context, output_code, status, error } = params;

  try {
    const { data, error: insertError } = await supabase
      .from('codex_logs')
      .insert([
        { 
          ticket_id, 
          prompt_template, 
          input_context, 
          output_code, 
          status, 
          error 
        }
      ]);

    if (insertError) {
      console.error('Error inserting codex run log:', insertError);
    }
  } catch (err) {
    console.error('Unexpected error logging codex run:', err);
  }
}
```

This function assumes that you have a `supabase` client available and that it's already initialized. It also assumes that the `codex_logs` table has columns that match the properties of the `LogCodexRunParams` interface. If any of these assumptions are incorrect, you'll need to adjust the function accordingly.