import { PDFAnalyzer } from '@/components/PDFAnalyzer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl text-primary-foreground">🌱</span>
        </div>
        <h1 className="text-3xl font-normal text-foreground mb-4">
          Salary Negotiation Hub
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto text-lg">
          Upload your job offer and get expert negotiation strategies
        </p>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-24">
        <div className="max-w-md mx-auto">
          <PDFAnalyzer />
        </div>
      </section>
    </div>
  );
};

export default Index;