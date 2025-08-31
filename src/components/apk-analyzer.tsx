'use client';

import { handleApkAnalysis, type AnalysisState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ScanLine, Upload } from 'lucide-react';
import { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from "react-dom";
import { AnalysisResult } from './analysis-result';

const initialState: AnalysisState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <ScanLine className="mr-2 h-4 w-4" />
          Analyze APK
        </>
      )}
    </Button>
  );
}

export function ApkAnalyzer() {
  const [state, formAction] = useActionState(handleApkAnalysis, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const previousStatus = useRef(state.status);

  useEffect(() => {
    if (state.status === 'error' && state.message) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
    // When a result is returned, scroll to it
    if (state.status && state.status !== previousStatus.current) {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    previousStatus.current = state.status;
  }, [state, toast]);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-6 w-6" />
            APK Signature Verifier
          </CardTitle>
          <CardDescription>
            Upload a .apk file to verify its digital signature against our
            dataset of official apps. For demo purposes, use a file named{' '}
            <strong>genuine.apk</strong> for a genuine result, and any other .apk
            file for a fake result.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="apk">APK File</Label>
              <Input
                id="apk"
                name="apk"
                type="file"
                required
                accept=".apk"
                className="file:font-semibold file:text-primary"
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      <div ref={resultRef} className="scroll-mt-20">
        <AnalysisResult state={state} />
      </div>
    </div>
  );
}
