import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { Upload, Delete, FileText, ChevronDown } from 'lucide-react';
import { Quotation } from '../types';

interface UploadSectionProps {
  quotations: Quotation[];
  onRemove: (id: string) => void;
}

export default function UploadSection({ quotations, onRemove }: UploadSectionProps) {
  const [expandedQuotationId, setExpandedQuotationId] = useState<string | false>(false);

  const handleFileSelect = () => {
    alert('File upload simulation - In production, this would parse PDF/Excel quotations and extract line items using OCR/parsing libraries');
  };

  const handleToggleQuotation = (id: string) => {
    setExpandedQuotationId(prev => (prev === id ? false : id));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Upload Quotations
        </Typography>
        <Button
          variant="contained"
          startIcon={<Upload size={20} />}
          onClick={handleFileSelect}
          sx={{ textTransform: 'none' }}
        >
          Upload Quotation
        </Button>
      </Box>

      <Card sx={{ mb: 3, border: '2px dashed #e0e0e0', bgcolor: '#fafafa' }}>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <FileText size={48} strokeWidth={1.5} style={{ color: '#999', marginBottom: 16 }} />
          <Typography variant="h6" gutterBottom>
            Upload Your Renovation Quotations
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Drag and drop PDF or Excel files, or click to browse
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Supported formats: PDF, XLSX, CSV
          </Typography>
        </CardContent>
      </Card>

      {quotations.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Uploaded Quotations ({quotations.length})
            </Typography>
            <List>
              {quotations.map((quotation) => (
                <Accordion
                  key={quotation.id}
                  expanded={expandedQuotationId === quotation.id}
                  onChange={() => handleToggleQuotation(quotation.id)}
                  disableGutters
                  elevation={0}
                  sx={{
                    borderBottom: '1px solid #f0f0f0',
                    '&:last-child': { borderBottom: 'none' },
                    '& .MuiAccordionSummary-root': { px: 0 }
                  }}
                >
                  <AccordionSummary sx={{ px: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 2 }}>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {quotation.vendorName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {quotation.items.length} items • Uploaded {quotation.uploadDate.toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          aria-hidden
                          sx={{ transform: expandedQuotationId === quotation.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 150ms' }}
                        >
                          <ChevronDown size={18} />
                        </IconButton>
                        <Chip
                          label={`S$${quotation.totalAmount.toLocaleString()}`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <IconButton
                          edge="end"
                          onClick={(event) => {
                            event.stopPropagation();
                            onRemove(quotation.id);
                          }}
                          aria-label={`Remove ${quotation.vendorName}`}
                        >
                          <Delete size={20} />
                        </IconButton>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 0, pt: 0 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                      Quotation Items
                    </Typography>
                    <List disablePadding>
                      {quotation.items.map((item) => (
                        <ListItem
                          key={item.id}
                          disableGutters
                          sx={{
                            py: 1,
                            pl: 0,
                            borderBottom: '1px solid #f4f4f4',
                            '&:last-child': { borderBottom: 'none' }
                          }}
                        >
                          <ListItemText
                            primary={item.description}
                            secondary={
                              <>
                                <Typography component="span" variant="body2" color="text.secondary">
                                  {item.category} • {item.quantity} {item.unit} × S${item.unitPrice.toLocaleString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Total: S${item.total.toLocaleString()}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
