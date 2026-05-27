import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { Quotation } from '../types';
import { benchmarkPrices } from '../data/mockData';

interface BenchmarkViewProps {
  quotations: Quotation[];
}

export default function BenchmarkView({ quotations }: BenchmarkViewProps) {
  if (quotations.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Upload quotations to see benchmark comparisons
        </Typography>
      </Box>
    );
  }

  // Prepare chart data
  const chartData = benchmarkPrices.map(benchmark => {
    const dataPoint: any = {
      name: benchmark.itemType,
      min: benchmark.minPrice,
      avg: benchmark.averagePrice,
      max: benchmark.maxPrice
    };

    quotations.forEach((q, idx) => {
      const item = q.items.find(i =>
        i.description.toLowerCase().includes(benchmark.itemType.toLowerCase().split(' ')[0])
      );
      if (item) {
        dataPoint[`vendor${idx + 1}`] = item.unitPrice;
      }
    });

    return dataPoint;
  });

  const getStatusColor = (price: number, benchmark: typeof benchmarkPrices[0]): string => {
    if (price > benchmark.maxPrice) return '#d32f2f';
    if (price < benchmark.minPrice) return '#ed6c02';
    return '#2e7d32';
  };

  const getStatusLabel = (price: number, benchmark: typeof benchmarkPrices[0]): string => {
    if (price > benchmark.maxPrice) return 'Above range';
    if (price < benchmark.minPrice) return 'Below range';
    return 'Within range';
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Market Benchmark Comparison
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Price Range Overview
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Compare your quotations against typical Singapore market prices
          </Typography>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis label={{ value: 'Price (S$)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="min" fill="#90caf9" name="Market Min" />
              <Bar dataKey="avg" fill="#42a5f5" name="Market Avg" />
              <Bar dataKey="max" fill="#1976d2" name="Market Max" />
              {quotations.map((q, idx) => (
                <Bar
                  key={q.id}
                  dataKey={`vendor${idx + 1}`}
                  fill={['#ff6b6b', '#4ecdc4', '#45b7d1'][idx]}
                  name={q.vendorName}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Detailed Benchmark Table
          </Typography>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Item Type</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Market Range</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Average</TableCell>
                  {quotations.map(q => (
                    <TableCell key={q.id} sx={{ fontWeight: 600 }}>
                      {q.vendorName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {benchmarkPrices.map((benchmark) => (
                  <TableRow key={benchmark.itemType} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {benchmark.itemType}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        per {benchmark.unit}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        S${benchmark.minPrice} - S${benchmark.maxPrice}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        S${benchmark.averagePrice}
                      </Typography>
                    </TableCell>
                    {quotations.map(q => {
                      const item = q.items.find(i =>
                        i.description.toLowerCase().includes(benchmark.itemType.toLowerCase().split(' ')[0])
                      );

                      if (!item) {
                        return (
                          <TableCell key={q.id}>
                            <Chip label="N/A" size="small" variant="outlined" />
                          </TableCell>
                        );
                      }

                      const statusColor = getStatusColor(item.unitPrice, benchmark);
                      const statusLabel = getStatusLabel(item.unitPrice, benchmark);

                      return (
                        <TableCell key={q.id}>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 500, color: statusColor }}
                          >
                            S${item.unitPrice}
                          </Typography>
                          <Chip
                            label={statusLabel}
                            size="small"
                            sx={{
                              mt: 0.5,
                              bgcolor: statusColor,
                              color: 'white',
                              fontSize: 10,
                              height: 18
                            }}
                          />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3, bgcolor: '#f5f5f5' }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <strong>Note:</strong> Benchmark prices are based on typical Singapore renovation costs as of {new Date().getFullYear()}.
            Actual prices may vary based on material quality, project complexity, and vendor expertise.
            Use these as reference points for negotiation and value assessment.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
