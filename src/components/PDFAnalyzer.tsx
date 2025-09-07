import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { FileText, ExternalLink, Brain, Upload, Loader2 } from 'lucide-react';

interface AnalysisResult {
  summary: string;
  salaryDetails: string[];
  negotiationTips: string[];
  marketComparison: string;
  recommendedCounterOffer: string[];
}

export const PDFAnalyzer = () => {
  const { toast } = useToast();
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setPdfUrl('');
      toast({
        title: "PDF uploaded",
        description: "Ready to analyze your document",
      });
    } else {
      toast({
        title: "Invalid file",
        description: "Please select a PDF file",
        variant: "destructive",
      });
    }
  };

  const handleOpenPDF = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else if (pdfFile) {
      const fileUrl = URL.createObjectURL(pdfFile);
      window.open(fileUrl, '_blank');
    } else {
      toast({
        title: "No PDF selected",
        description: "Please upload a PDF or provide a URL first",
        variant: "destructive",
      });
    }
  };

  const mockAnalyze = async (): Promise<AnalysisResult> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    return {
      summary: "This is a full-time software engineer position offer with competitive base salary and standard benefits package. The role includes equity compensation and performance bonuses.",
      salaryDetails: [
        "Base salary: $95,000 annually",
        "Signing bonus: $5,000",
        "Stock options: 0.25% equity vesting over 4 years",
        "Annual bonus: Up to 15% of base salary",
        "Health insurance: 100% premium covered",
        "401k match: 4% company match",
        "Vacation: 3 weeks PTO + holidays"
      ],
      negotiationTips: [
        "Counter with $105,000-110,000 base - market rate for this role is 10-15% higher",
        "Request $8,000-10,000 signing bonus to cover relocation or opportunity cost",
        "Negotiate for 0.35% equity - initial equity grants are often negotiable",
        "Ask for performance bonus guarantee of 10% minimum in first year",
        "Request 4 weeks vacation - standard for senior positions",
        "Negotiate remote work flexibility (2-3 days from home per week)"
      ],
      marketComparison: "Based on current market data, this offer is 8-12% below market rate for similar positions. The equity component is reasonable but could be improved. Benefits package is competitive.",
      recommendedCounterOffer: [
        "Base salary: $107,500 (12% increase)",
        "Signing bonus: $8,500",
        "Request equity increase to 0.30%",
        "Negotiate for minimum 10% annual bonus guarantee",
        "Ask for additional week of vacation",
        "Request professional development budget ($2,500/year)"
      ]
    };
  };

  const handleAnalyze = async () => {
    if (!pdfUrl && !pdfFile) {
      toast({
        title: "No PDF selected",
        description: "Please upload a PDF or provide a URL first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await mockAnalyze();
      setAnalysisResult(result);
      toast({
        title: "Analysis complete",
        description: "Your PDF has been analyzed successfully",
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Unable to analyze the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="border-2 border-dashed border-border hover:border-accent transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload or Link PDF
          </CardTitle>
          <CardDescription>
            Upload your job offer letter or salary proposal PDF to get detailed negotiation analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pdf-url">PDF URL</Label>
            <Input
              id="pdf-url"
              type="url"
              placeholder="https://example.com/document.pdf"
              value={pdfUrl}
              onChange={(e) => {
                setPdfUrl(e.target.value);
                setPdfFile(null);
              }}
            />
          </div>
          
          <div className="text-center text-muted-foreground">or</div>
          
          <div className="space-y-2">
            <Label htmlFor="pdf-file">Upload PDF File</Label>
            <Input
              id="pdf-file"
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="cursor-pointer"
            />
          </div>
          
          {(pdfUrl || pdfFile) && (
            <div className="flex gap-2 pt-4">
              <Button onClick={handleOpenPDF} variant="outline" className="flex-1">
                <ExternalLink className="h-4 w-4" />
                Open PDF
              </Button>
              <Button 
                onClick={handleAnalyze} 
                variant="professional" 
                className="flex-1"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4" />
                    Analyze & Get Tips
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{analysisResult.summary}</p>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Salary & Benefits Breakdown:</h4>
                <ul className="space-y-1">
                  {analysisResult.salaryDetails.map((detail, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <Brain className="h-5 w-5" />
                Negotiation Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {analysisResult.negotiationTips.map((tip, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="w-6 h-6 bg-success text-success-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Market Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{analysisResult.marketComparison}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-accent">Recommended Counter Offer</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysisResult.recommendedCounterOffer.map((offer, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    {offer}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};