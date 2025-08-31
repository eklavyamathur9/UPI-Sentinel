import type { AnalysisState } from '@/app/actions';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { AlertTriangle, Bot, ShieldAlert, ShieldCheck } from 'lucide-react';

function ResultRow({
  label,
  value,
  isMono = true,
  breakAll = false,
}: {
  label: string;
  value: string;
  isMono?: boolean;
  breakAll?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
      <p className="shrink-0 text-sm font-medium text-muted-foreground sm:w-1/3">
        {label}
      </p>
      <p
        className={cn(
          'text-sm sm:w-2/3 sm:text-right',
          isMono && 'font-mono text-xs',
          breakAll && 'break-all'
        )}
      >
        {value}
      </p>
    </div>
  );
}

export function AnalysisResult({ state }: { state: AnalysisState }) {
  const isGenuine = state.status === 'genuine';
  const isFake = state.status === 'fake';
  const isError = state.status === 'error';

  if (!state.status) return null;

  if (isError) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle />
            Analysis Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{state.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(isGenuine && 'border-success', isFake && 'border-destructive')}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isGenuine && <ShieldCheck className="h-8 w-8 text-success" />}
            {isFake && <ShieldAlert className="h-8 w-8 text-destructive" />}
            <span
              className={cn(
                isGenuine && 'text-success',
                isFake && 'text-destructive'
              )}
            >
              Analysis Result
            </span>
          </div>
          <Badge variant={isGenuine ? 'success' : 'destructive'}>
            {isGenuine ? 'Genuine' : 'Fake'}
          </Badge>
        </CardTitle>
        <CardDescription>{state.message}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />
        <div className="space-y-4 pt-4">
          <ResultRow
            label="Detected App"
            value={state.appName!}
            isMono={false}
          />
          <ResultRow label="Found Signature" value={state.found!} breakAll />
          <ResultRow
            label="Expected Signature"
            value={state.expected!}
            breakAll
          />
        </div>
        <Card className="bg-muted/50 dark:bg-muted/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="h-5 w-5" />
              AI-Powered Explanation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/80">{state.analysis}</p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
