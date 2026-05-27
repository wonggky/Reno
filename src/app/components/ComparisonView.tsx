import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Collapse, IconButton, Paper } from '@mui/material';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Quotation, QuotationItem } from '../types';
import { benchmarkPrices } from '../data/mockData';

interface ComparisonViewProps {
  quotations: Quotation[];
}

export default function ComparisonView({ quotations }: ComparisonViewProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  if (quotations.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <AlertCircle size={48} strokeWidth={1.5} style={{ color: '#999', marginBottom: 16 }} />
        <Typography variant="h6" color="text.secondary">
          Upload at least one quotation to start comparing
        </Typography>
      </Box>
    );
  }

  const toggleExpand = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  // Group items by category
  const allCategories = Array.from(new Set(quotations.flatMap(q => q.items.map(i => i.category))));

  const getPriceStatus = (item: QuotationItem): 'low' | 'normal' | 'high' => {
    const benchmark = benchmarkPrices.find(b =>
      item.description.toLowerCase().includes(b.itemType.toLowerCase().split(' ')[0])
    );

    if (!benchmark) return 'normal';

    const deviation = ((item.unitPrice - benchmark.averagePrice) / benchmark.averagePrice) * 100;
    if (deviation > 15) return 'high';
    if (deviation < -15) return 'low';
    return 'normal';
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Side-by-Side Comparison
      </Typography>

      {allCategories.map(category => {
        const categoryItems = quotations.map(q => ({
          quotation: q,
          items: q.items.filter(i => i.category === category)
        })).filter(x => x.items.length > 0);

        if (categoryItems.length === 0) return null;

        return (
          <Card key={category} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                {category}
              </Typography>

              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                      <TableCell sx={{ fontWeight: 600, width: '30%' }}>Item</TableCell>
                      {quotations.map(q => (
                        <TableCell key={q.id} sx={{ fontWeight: 600 }}>
                          {q.vendorName}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Get unique item descriptions */}
                    {Array.from(new Set(categoryItems.flatMap(ci => ci.items.map(i => i.description)))).map(description => {
                      const itemsAcrossQuotes = quotations.map(q =>
                        q.items.find(i => i.description === description && i.category === category)
                      );

                      const prices = itemsAcrossQuotes.filter(i => i).map(i => i!.total);
                      const minPrice = Math.min(...prices);
                      const maxPrice = Math.max(...prices);

                      return (
                        <TableRow key={description} hover>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {description}
                            </Typography>
                          </TableCell>
                          {quotations.map(q => {
                            const item = q.items.find(i => i.description === description && i.category === category);

                            if (!item) {
                              return (
                                <TableCell key={q.id}>
                                  <Chip
                                    label="Not included"
                                    size="small"
                                    color="error"
                                    variant="outlined"
                                  />
                                </TableCell>
                              );
                            }

                            const isLowest = item.total === minPrice && minPrice !== maxPrice;
                            const isHighest = item.total === maxPrice && minPrice !== maxPrice;
                            const priceStatus = getPriceStatus(item);

                            return (
                              <TableCell key={q.id}>
                                <Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        fontWeight: isLowest ? 600 : 400,
                                        color: isLowest ? 'success.main' : isHighest ? 'error.main' : 'inherit'
                                      }}
                                    >
                                      S${item.total.toLocaleString()}
                                    </Typography>
                                    {isLowest && <CheckCircle size={16} color="#2e7d32" />}
                                    {priceStatus === 'high' && (
                                      <Chip label="Above market" size="small" color="warning" sx={{ fontSize: 10, height: 18 }} />
                                    )}
                                    {priceStatus === 'low' && (
                                      <Chip label="Below market" size="small" color="info" sx={{ fontSize: 10, height: 18 }} />
                                    )}
                                  </Box>
                                  <Typography variant="caption" color="text.secondary">
                                    {item.quantity} {item.unit} × S${item.unitPrice}
                                  </Typography>

                                  {item.breakdown && (
                                    <>
                                      <IconButton
                                        size="small"
                                        onClick={() => toggleExpand(item.id)}
                                        sx={{ ml: -0.5, mt: 0.5 }}
                                      >
                                        {expandedItems.has(item.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                      </IconButton>
                                      <Collapse in={expandedItems.has(item.id)}>
                                        <Box sx={{ mt: 1, pl: 1, borderLeft: '2px solid #e0e0e0' }}>
                                          <Typography variant="caption" display="block">
                                            Material: S${item.breakdown.material.toLocaleString()}
                                          </Typography>
                                          <Typography variant="caption" display="block">
                                            Labor: S${item.breakdown.labor.toLocaleString()}
                                          </Typography>
                                          {item.materialSpec && (
                                            <Typography variant="caption" display="block" sx={{ mt: 0.5, fontStyle: 'italic' }}>
                                              {item.materialSpec}
                                            </Typography>
                                          )}
                                        </Box>
                                      </Collapse>
                                    </>
                                  )}
                                </Box>
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}

                    {/* Category Total */}
                    <TableRow sx={{ bgcolor: '#fafafa' }}>
                      <TableCell sx={{ fontWeight: 600 }}>
                        {category} Subtotal
                      </TableCell>
                      {quotations.map(q => {
                        const total = q.items
                          .filter(i => i.category === category)
                          .reduce((sum, i) => sum + i.total, 0);
                        return (
                          <TableCell key={q.id}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              S${total.toLocaleString()}
                            </Typography>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        );
      })}

      {/* Grand Total */}
      <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Total Cost
            </Typography>
            <Box sx={{ display: 'flex', gap: 4 }}>
              {quotations.map(q => (
                <Box key={q.id} sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" display="block" sx={{ opacity: 0.9 }}>
                    {q.vendorName}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    S${q.totalAmount.toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
