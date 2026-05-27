import { Box, Card, CardContent, Typography, Alert, AlertTitle, Chip, Grid } from '@mui/material';
import { TrendingUp, TrendingDown, AlertTriangle, Info } from 'lucide-react';
import { Quotation } from '../types';
import { analyzeQuotations, calculateSavings } from '../utils/analysis';
import { benchmarkPrices } from '../data/mockData';

interface InsightsPanelProps {
  quotations: Quotation[];
}

export default function InsightsPanel({ quotations }: InsightsPanelProps) {
  if (quotations.length === 0) {
    return null;
  }

  const insights = analyzeQuotations(quotations, benchmarkPrices);
  const savings = calculateSavings(quotations);

  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'overpriced': return <TrendingUp size={20} />;
      case 'underpriced': return <TrendingDown size={20} />;
      case 'missing': return <AlertTriangle size={20} />;
      default: return <Info size={20} />;
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Analysis & Insights
      </Typography>

      {/* Savings Summary */}
      {quotations.length > 1 && (
        <Card sx={{ mb: 3, bgcolor: 'success.light', color: 'success.contrastText' }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Potential Savings
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  S${savings.maxSavings.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  ({savings.percentageSavings.toFixed(1)}% savings)
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" gutterBottom>
                  Lowest Quote
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {savings.cheapestVendor}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                  vs {savings.mostExpensiveVendor}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Insights */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Key Findings ({insights.length})
          </Typography>

          {insights.length === 0 ? (
            <Alert severity="success">
              <AlertTitle>No Issues Found</AlertTitle>
              All quotations appear reasonable and well-matched.
            </Alert>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {insights.map((insight, idx) => {
                const vendor = quotations.find(q => q.id === insight.quotationId);
                return (
                  <Alert
                    key={idx}
                    severity={getSeverityColor(insight.severity)}
                    icon={getInsightIcon(insight.type)}
                  >
                    <AlertTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {insight.message}
                      <Chip
                        label={vendor?.vendorName}
                        size="small"
                        variant="outlined"
                      />
                    </AlertTitle>
                    {insight.details}
                  </Alert>
                );
              })}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Recommendations
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Alert severity="info" icon={<Info size={20} />}>
              <AlertTitle>Material Quality Check</AlertTitle>
              Pay close attention to material specifications. Higher prices may be justified by premium brands
              like Caesarstone, Grohe, or Karndean which offer better durability and warranty.
            </Alert>

            <Alert severity="warning" icon={<AlertTriangle size={20} />}>
              <AlertTitle>Verify Scope</AlertTitle>
              Ensure all quotations include the same scope of work. Some vendors may exclude electrical work,
              demolition, or cleaning which can add 10-20% to the final cost.
            </Alert>

            <Alert severity="success">
              <AlertTitle>Best Value Assessment</AlertTitle>
              Consider the warranty period and post-renovation service. A slightly higher quote with 2-year
              warranty may offer better value than the cheapest option with only 1-year coverage.
            </Alert>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
