'use server';
/**
 * @fileOverview Analyzes signature mismatches to detect fake APKs.
 *
 * - analyzeSignatureMismatch - A function that analyzes the signature mismatch and provides an explanation.
 * - AnalyzeSignatureMismatchInput - The input type for the analyzeSignatureMismatch function.
 * - AnalyzeSignatureMismatchOutput - The return type for the analyzeSignatureMismatch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSignatureMismatchInputSchema = z.object({
  status: z.string().describe('The status of the APK, either \'fake\' or \'genuine\'.'),
  expected: z.string().describe('The expected SHA-256 signature of the genuine APK.'),
  found: z.string().describe('The SHA-256 signature found in the uploaded APK.'),
});
export type AnalyzeSignatureMismatchInput = z.infer<typeof AnalyzeSignatureMismatchInputSchema>;

const AnalyzeSignatureMismatchOutputSchema = z.object({
  analysis: z.string().describe('A human-readable explanation of why the signature mismatch indicates a fake APK.'),
});
export type AnalyzeSignatureMismatchOutput = z.infer<typeof AnalyzeSignatureMismatchOutputSchema>;

export async function analyzeSignatureMismatch(input: AnalyzeSignatureMismatchInput): Promise<AnalyzeSignatureMismatchOutput> {
  return analyzeSignatureMismatchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSignatureMismatchPrompt',
  input: {schema: AnalyzeSignatureMismatchInputSchema},
  output: {schema: AnalyzeSignatureMismatchOutputSchema},
  prompt: `You are a security expert analyzing APK signatures to detect fake applications.\n\n  You are given the status of an APK, the expected signature, and the found signature. Your task is to provide a brief, human-readable explanation of why a signature mismatch indicates a fake APK. Focus on the security implications.\n\n  Status: {{{status}}}\n  Expected Signature: {{{expected}}}\n  Found Signature: {{{found}}}\n\n  Provide a concise explanation:\n  `,
});

const analyzeSignatureMismatchFlow = ai.defineFlow(
  {
    name: 'analyzeSignatureMismatchFlow',
    inputSchema: AnalyzeSignatureMismatchInputSchema,
    outputSchema: AnalyzeSignatureMismatchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
