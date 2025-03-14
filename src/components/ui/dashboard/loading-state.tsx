
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const StatCardSkeleton = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-4 rounded-full" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-8 w-20 mb-1" />
      <Skeleton className="h-3 w-28" />
    </CardContent>
  </Card>
);

export const TableSkeleton = ({ rowCount = 4, columnCount = 5 }: { rowCount?: number; columnCount?: number }) => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-40" />
    </CardHeader>
    <CardContent className="p-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {Array(columnCount).fill(0).map((_, i) => (
                <th key={i} className="text-left p-4">
                  <Skeleton className="h-4 w-full max-w-[100px]" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(rowCount).fill(0).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b">
                {Array(columnCount).fill(0).map((_, colIndex) => (
                  <td key={colIndex} className="p-4">
                    <Skeleton className={`h-4 w-${colIndex === columnCount - 1 ? '20' : 'full'} max-w-[120px]`} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

export const ChartSkeleton = ({ height = "h-[300px]" }: { height?: string }) => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-40" />
    </CardHeader>
    <CardContent>
      <div className={`${height} flex items-center justify-center bg-muted/50 rounded-md`}>
        <Skeleton className="h-4/5 w-4/5" />
      </div>
    </CardContent>
  </Card>
);

export const DashboardSkeleton = () => (
  <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
    </div>
    
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <div className="col-span-4">
        <ChartSkeleton />
      </div>
      <div className="col-span-3">
        <ChartSkeleton />
      </div>
    </div>
    
    <TableSkeleton />
  </div>
);
