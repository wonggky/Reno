import { Quotation, QuotationItem, BenchmarkPrice, ComparisonInsight } from '../types';

export function analyzeQuotations(
  quotations: Quotation[],
  benchmarks: BenchmarkPrice[]
): ComparisonInsight[] {
  const insights: ComparisonInsight[] = [];

  if (quotations.length < 2) return insights;

  // Find missing items across quotations
  const allCategories = new Set<string>();
  quotations.forEach(q => {
    q.items.forEach(item => allCategories.add(item.category));
  });

  quotations.forEach(quotation => {
    const quotationCategories = new Set(quotation.items.map(i => i.category));

    allCategories.forEach(category => {
      if (!quotationCategories.has(category)) {
        insights.push({
          type: 'missing',
          severity: 'high',
          quotationId: quotation.id,
          message: `Missing ${category} items`,
          details: `This quotation doesn't include any ${category.toLowerCase()} renovation work, which other vendors have quoted for.`
        });
      }
    });
  });

  // Compare prices against benchmarks
  quotations.forEach(quotation => {
    quotation.items.forEach(item => {
      const benchmark = benchmarks.find(b =>
        item.description.toLowerCase().includes(b.itemType.toLowerCase().split(' ')[0])
      );

      if (benchmark) {
        const deviation = ((item.unitPrice - benchmark.averagePrice) / benchmark.averagePrice) * 100;

        if (deviation > 20) {
          insights.push({
            type: 'overpriced',
            severity: deviation > 40 ? 'high' : 'medium',
            quotationId: quotation.id,
            itemId: item.id,
            message: `${item.description} is ${deviation.toFixed(0)}% above market average`,
            details: `${quotation.vendorName} is quoting S$${item.unitPrice}/${item.unit} vs market average of S$${benchmark.averagePrice}/${benchmark.unit}`
          });
        } else if (deviation < -20) {
          insights.push({
            type: 'underpriced',
            severity: 'medium',
            quotationId: quotation.id,
            itemId: item.id,
            message: `${item.description} is ${Math.abs(deviation).toFixed(0)}% below market average`,
            details: `This may indicate lower quality materials or potential for hidden costs later.`
          });
        }
      }
    });
  });

  // Compare material specifications
  const itemsByDescription = new Map<string, QuotationItem[]>();
  quotations.forEach(quotation => {
    quotation.items.forEach(item => {
      const key = item.description.toLowerCase().replace(/[^a-z]/g, '');
      if (!itemsByDescription.has(key)) {
        itemsByDescription.set(key, []);
      }
      itemsByDescription.get(key)!.push(item);
    });
  });

  itemsByDescription.forEach((items, description) => {
    if (items.length > 1) {
      const hasMaterialDifference = items.some((item, idx) =>
        items.slice(idx + 1).some(other =>
          item.materialSpec && other.materialSpec &&
          item.materialSpec !== other.materialSpec
        )
      );

      if (hasMaterialDifference) {
        const priceDiff = Math.max(...items.map(i => i.unitPrice)) - Math.min(...items.map(i => i.unitPrice));
        if (priceDiff > 0) {
          insights.push({
            type: 'quality',
            severity: 'medium',
            quotationId: items[0].id,
            message: `Different material specs for ${items[0].description}`,
            details: `Price variance of S$${priceDiff} may reflect material quality differences. Check specifications carefully.`
          });
        }
      }
    }
  });

  return insights;
}

export function calculateSavings(quotations: Quotation[]): {
  maxSavings: number;
  percentageSavings: number;
  cheapestVendor: string;
  mostExpensiveVendor: string;
} {
  if (quotations.length === 0) {
    return { maxSavings: 0, percentageSavings: 0, cheapestVendor: '', mostExpensiveVendor: '' };
  }

  const sorted = [...quotations].sort((a, b) => a.totalAmount - b.totalAmount);
  const cheapest = sorted[0];
  const mostExpensive = sorted[sorted.length - 1];

  return {
    maxSavings: mostExpensive.totalAmount - cheapest.totalAmount,
    percentageSavings: ((mostExpensive.totalAmount - cheapest.totalAmount) / mostExpensive.totalAmount) * 100,
    cheapestVendor: cheapest.vendorName,
    mostExpensiveVendor: mostExpensive.vendorName
  };
}

export function getCategoryTotals(quotation: Quotation): Map<string, number> {
  const totals = new Map<string, number>();

  quotation.items.forEach(item => {
    const current = totals.get(item.category) || 0;
    totals.set(item.category, current + item.total);
  });

  return totals;
}

export function getItemComparison(quotations: Quotation[], itemDescription: string): QuotationItem[] {
  const items: QuotationItem[] = [];

  quotations.forEach(quotation => {
    const item = quotation.items.find(i =>
      i.description.toLowerCase().includes(itemDescription.toLowerCase())
    );
    if (item) {
      items.push(item);
    }
  });

  return items;
}
