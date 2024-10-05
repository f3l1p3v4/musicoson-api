import { z } from 'zod'

export function formatZodErrors(errors: z.ZodIssue[]): string[] {
  return errors.map((error) => {
    const path = error.path.join('.')
    return `${path}: ${error.message}`
  })
}
