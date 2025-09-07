import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ExternalLink, Brain } from 'lucide-react';

interface AnalysisResult {
  summary: string;
  negotiationTips: string[];
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
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      summary: "Software engineer position with $95,000 base salary, equity options, and standard benefits. Market analysis suggests room for negotiation.",
      negotiationTips: [
        "Counter with $105,000-110,000 base - market rate is 10-15% higher",
        "Request $8,000 signing bonus to cover opportunity cost", 
        "Negotiate for additional week of vacation time"
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

      {/* Analysis Results - Simplified */}
      {analysisResult && (
        <div className="mt-8 space-y-4 max-w-lg mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-normal">Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="space-y-3">
                <div>
                  <p className="font-medium mb-1">Key Insights:</p>
                  <p className="text-muted-foreground text-xs">{analysisResult.summary}</p>
                </div>
                
                <div>
                  <p className="font-medium mb-2">Top Negotiation Tips:</p>
                  <ul className="space-y-1">
                    {analysisResult.negotiationTips.map((tip, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex gap-2">
                        <span className="text-primary">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};