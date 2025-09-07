import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { ExternalLink, Brain } from 'lucide-react';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    await new Promise(resolve => setTimeout(resolve, 2000));
    
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
      setIsModalOpen(true);
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
    <div className="w-full max-w-sm mx-auto">
      <Card className="border shadow-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-lg font-normal text-foreground">
            Job Offer Analysis
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Upload your offer letter for insights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Input 
              type="file" 
              accept=".pdf" 
              onChange={handleFileUpload}
              className="text-center text-sm"
            />
            
            <div className="text-center">
              <span className="text-xs text-muted-foreground">or</span>
            </div>
            
            <Input 
              type="url" 
              placeholder="Paste PDF link" 
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              className="text-center text-sm"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              onClick={handleOpenPDF}
              variant="outline"
              disabled={!pdfFile && !pdfUrl}
              size="sm"
              className="flex-1 text-xs"
            >
              <ExternalLink size={12} />
              Open
            </Button>
            
            <Button 
              onClick={handleAnalyze}
              disabled={!pdfFile && !pdfUrl || isAnalyzing}
              size="sm"
              className="flex-1 text-xs"
            >
              <Brain size={12} />
              {isAnalyzing ? 'Analyzing...' : 'Analyze'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Job Offer Analysis Results</DialogTitle>
            <DialogDescription>
              Detailed breakdown and negotiation strategies for your offer
            </DialogDescription>
          </DialogHeader>
          
          {analysisResult && (
            <div className="grid gap-6 md:grid-cols-2 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Document Summary</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="text-muted-foreground mb-4">{analysisResult.summary}</p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Salary & Benefits Breakdown:</h4>
                    <ul className="space-y-1">
                      {analysisResult.salaryDetails.map((detail, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base text-primary">Negotiation Tips</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="space-y-2">
                    {analysisResult.negotiationTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-xs">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Market Comparison</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="text-muted-foreground text-xs">{analysisResult.marketComparison}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base text-primary">Recommended Counter Offer</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="space-y-1">
                    {analysisResult.recommendedCounterOffer.map((offer, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {offer}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};