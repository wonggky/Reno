import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Box, Tabs, Tab, AppBar, Toolbar, Typography, Badge } from '@mui/material';
import { Home, FileText, TrendingUp, Lightbulb, BookOpen } from 'lucide-react';
import { Quotation } from './types';
import { mockQuotations } from './data/mockData';
import LandingPage from './components/LandingPage';
import UploadSection from './components/UploadSection';
import ComparisonView from './components/ComparisonView';
import InsightsPanel from './components/InsightsPanel';
import BenchmarkView from './components/BenchmarkView';
import RenovationAppendix from './components/RenovationAppendix';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
});

export default function App() {
  const [quotations, setQuotations] = useState<Quotation[]>(mockQuotations);
  const [activeTab, setActiveTab] = useState(0);
  const [showLanding, setShowLanding] = useState(true);

  const handleRemoveQuotation = (id: string) => {
    setQuotations(quotations.filter(q => q.id !== id));
  };

  const handleGetStarted = () => {
    setShowLanding(false);
    setActiveTab(1); // Go to Upload tab
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
        <AppBar position="static" elevation={1}>
          <Toolbar>
            <Box
              onClick={() => { setShowLanding(true); setActiveTab(0); }}
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              <Home size={24} style={{ marginRight: 12 }} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                RenovationCompare SG
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Smart Quotation Analysis for Singapore Homeowners
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          {showLanding ? (
            <LandingPage onGetStarted={handleGetStarted} />
          ) : (
            <>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
                  <Tab
                    icon={<Home size={20} />}
                    label="Home"
                    iconPosition="start"
                    sx={{ textTransform: 'none', minHeight: 64 }}
                    onClick={() => setShowLanding(true)}
                  />
                  <Tab
                    icon={<FileText size={20} />}
                    label="Upload"
                    iconPosition="start"
                    sx={{ textTransform: 'none', minHeight: 64 }}
                  />
                  <Tab
                    icon={<TrendingUp size={20} />}
                    label={
                      <Badge badgeContent={quotations.length} color="primary">
                        Compare
                      </Badge>
                    }
                    iconPosition="start"
                    sx={{ textTransform: 'none', minHeight: 64 }}
                  />
                  <Tab
                    icon={<Lightbulb size={20} />}
                    label="Insights"
                    iconPosition="start"
                    sx={{ textTransform: 'none', minHeight: 64 }}
                  />
                  <Tab
                    icon={<TrendingUp size={20} />}
                    label="Benchmarks"
                    iconPosition="start"
                    sx={{ textTransform: 'none', minHeight: 64 }}
                  />
                  <Tab
                    icon={<BookOpen size={20} />}
                    label="Dictionary"
                    iconPosition="start"
                    sx={{ textTransform: 'none', minHeight: 64 }}
                  />
                </Tabs>
              </Box>

              {activeTab === 0 && (
                <LandingPage onGetStarted={handleGetStarted} />
              )}

              {activeTab === 1 && (
                <UploadSection
                  quotations={quotations}
                  onRemove={handleRemoveQuotation}
                />
              )}

              {activeTab === 2 && (
                <ComparisonView quotations={quotations} />
              )}

              {activeTab === 3 && (
                <InsightsPanel quotations={quotations} />
              )}

              {activeTab === 4 && (
                <BenchmarkView quotations={quotations} />
              )}

              {activeTab === 5 && (
                <RenovationAppendix />
              )}
            </>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
