import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { genuineApps } from '@/lib/dataset';
import { Fingerprint } from 'lucide-react';

export function DatasetTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Fingerprint className="h-6 w-6" />
          Official App Signatures
        </CardTitle>
        <CardDescription>
          This is the reference dataset of official SHA-256 signatures for
          popular Indian UPI apps.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>App Name</TableHead>
              <TableHead>Package Name</TableHead>
              <TableHead>Official SHA-256 Signature</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {genuineApps.map((app) => (
              <TableRow key={app.package_name}>
                <TableCell className="font-medium">{app.name}</TableCell>
                <TableCell className="font-mono text-xs">
                  {app.package_name}
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {app.signing_sha256}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
