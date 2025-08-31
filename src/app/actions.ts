
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

// Helper to generate a fake SHA-256 hash for demonstration
const generateFakeSha256 = () => {
  const chars = '0123456789ABCDEF';
  let hash = '';
  for (let i = 0; i < 64; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return hash.match(/.{1,2}/g)!.join(':');
};

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
    // We'll pick a random genuine app for comparison.
    const randomGenuineApp: GenuineApp = genuineApps[Math.floor(Math.random() * genuineApps.length)];
    let foundSignature = '';
    let status: 'genuine' | 'fake';
    
    // Simulate a genuine app if filename is 'genuine.apk'
    if (file.name.toLowerCase().includes('genuine')) {
      status = 'genuine';
      foundSignature = randomGenuineApp.signing_sha256;
    } else {
      status = 'fake';
      // Ensure the fake signature is different from the expected one
      do {
        foundSignature = generateFakeSha256();
      } while (foundSignature === randomGenuineApp.signing_sha256);
    }
    // --- End Demo Logic ---

    const aiInput = {
      status,
      expected: randomGenuineApp.signing_sha256,
      found: foundSignature,
    };
    
    const aiResult = await analyzeSignatureMismatch(aiInput);

    return {
      status: status,
      analysis: aiResult.analysis,
      expected: randomGenuineApp.signing_sha256,
      found: foundSignature,
      appName: randomGenuineApp.name,
      message: status === 'genuine' ? `This APK's signature matches the official signature for ${randomGenuineApp.name}.` : `This APK's signature does not match the official signature for ${randomGenuineApp.name}.`
    };

  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'An unexpected error occurred during analysis. Please try again.',
    };
  }
}
