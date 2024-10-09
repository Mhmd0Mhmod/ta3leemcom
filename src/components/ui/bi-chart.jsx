import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { TrendingUp } from 'lucide-react';

export const description = 'A pie chart with a legend';

const chartConfig = {
  answers: {
    label: 'answers',
  },
  correct: {
    label: 'صحيح',
    color: 'hsl(var(--chart-1))',
  },
  incorrect: {
    label: 'خطأ',
    color: 'hsl(var(--chart-2))',
  },
};

export function Bichart({ chartData }) {
  return (
    <Card className="flex h-full flex-col border-none">
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground">
          <PieChart
            margin={{
              top: 40,
            }}
          >
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="answers" label nameKey="q_type" />
            <ChartLegend content={<ChartLegendContent nameKey="q_type" />} className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
