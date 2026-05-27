import { Box, Button, Card, CardContent, Typography, List, ListItem, ListItemText, IconButton, Chip } from '@mui/material';
import { Upload, Delete, FileText } from 'lucide-react';
import { Quotation } from '../types';

interface UploadSectionProps {
  quotations: Quotation[];
  onRemove: (id: string) => void;
}

export default function UploadSection({ quotations, onRemove }: UploadSectionProps) {
  const handleFileSelect = () => {
    alert('File upload simulation - In production, this would parse PDF/Excel quotations and extract line items using OCR/parsing libraries');
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
                <ListItem
                  key={quotation.id}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => onRemove(quotation.id)}>
                      <Delete size={20} />
                    </IconButton>
                  }
                  sx={{
                    borderBottom: '1px solid #f0f0f0',
                    '&:last-child': { borderBottom: 'none' }
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {quotation.vendorName}
                        </Typography>
                        <Chip
                          label={`S$${quotation.totalAmount.toLocaleString()}`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.secondary">
                          {quotation.items.length} items • Uploaded {quotation.uploadDate.toLocaleDateString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
