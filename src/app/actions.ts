
'use server';

import { analyzeSignatureMismatch } from '@/ai/flows/analyze-signature-mismatch';
import { genuineApps, type GenuineApp } from '@/lib/dataset';
import { z } from 'zod';

const formSchema = z.object({
  apk: z
    .any()
    .refine((file) => file?.size > 0, 'APK file is required.')
    .refine(
      (file) => file?.name?.endsWith('.apk'),
      'Invalid file type. Please upload a .apk file.'
    ),
});

export interface AnalysisState {
  status?: 'genuine' | 'fake' | 'error' | 'idle';
  message?: string;
  analysis?: string;
  expected?: string;
  found?: string;
  appName?: string;
}

export async function handleApkAnalysis(
  prevState: AnalysisState,
  formData: FormData
): Promise<AnalysisState> {
  try {
    const validatedFields = formSchema.safeParse({
      apk: formData.get('apk'),
    });

    if (!validatedFields.success) {
      return {
        status: 'error',
        message: validatedFields.error.flatten().fieldErrors.apk?.[0],
      };
    }
    
    const file = validatedFields.data.apk as File;

    // --- Demo Logic ---
    // In a real app, this is where you'd extract the signature from the APK file.
    // For this demo, we'll simulate the process based on the filename.
    const appIndex = file.name.length % genuineApps.length;
    const genuineApp: GenuineApp = genuineApps[appIndex];
    let foundSignature = '';
    let status: 'genuine' | 'fake';
    
    // Simulate a genuine app if filename contains 'genuine'
    if (file.name.toLowerCase().includes('genuine')) {
      status = 'genuine';
      foundSignature = genuineApp.signing_sha256;
    } else {
      status = 'fake';
      // For the "fake" demo, we'll use a different genuine signature to create a mismatch.
      // This avoids generating an artificial "fake" hash.
      const fakeSignatureIndex = (appIndex + 1) % genuineApps.length;
      foundSignature = genuineApps[fakeSignatureIndex].signing_sha256;
    }
    // --- End Demo Logic ---

    const aiInput = {
      status,
      expected: genuineApp.signing_sha256,
      found: foundSignature,
    };
    
    // Don't call the AI if the signature is genuine
    const aiResult = status === 'fake' ? await analyzeSignatureMismatch(aiInput) : { analysis: 'The signature matches the official record. No further analysis needed.'};

    return {
      status: status,
      analysis: aiResult.analysis,
      expected: genuineApp.signing_sha256,
      found: foundSignature,
      appName: genuineApp.name,
      message: status === 'genuine' ? `This APK's signature matches the official signature for ${genuineApp.name}.` : `This APK's signature does not match the official signature for ${genuineApp.name}.`
    };

  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'An unexpected error occurred during analysis. Please try again.',
    };
  }
}
