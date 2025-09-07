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
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-md mx-auto">
          <PDFAnalyzer />
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-normal mb-4">Negotiation Resources</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Learn from experts with curated guides and strategies
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* YouTube Videos */}
            <div className="bg-card rounded-lg p-6 hover:shadow-sm transition-shadow">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-foreground text-sm">📺</span>
              </div>
              <h3 className="font-medium mb-2 text-sm">Complete Salary Negotiation Guide</h3>
              <p className="text-muted-foreground text-xs mb-3">
                Everything you need to know about salary negotiation from Indeed
              </p>
              <a 
                href="https://www.youtube.com/watch?v=JdsB9QQLeVA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-xs"
              >
                Watch on YouTube →
              </a>
            </div>

            <div className="bg-card rounded-lg p-6 hover:shadow-sm transition-shadow">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-foreground text-sm">📺</span>
              </div>
              <h3 className="font-medium mb-2 text-sm">How to Get a Raise at Work</h3>
              <p className="text-muted-foreground text-xs mb-3">
                Salary negotiation tips for every stage of your career
              </p>
              <a 
                href="https://www.youtube.com/watch?v=AkS7ywlA9zc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-xs"
              >
                Watch on YouTube →
              </a>
            </div>

            <div className="bg-card rounded-lg p-6 hover:shadow-sm transition-shadow">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-foreground text-sm">📺</span>
              </div>
              <h3 className="font-medium mb-2 text-sm">3 Evidence-Based Negotiation Tips</h3>
              <p className="text-muted-foreground text-xs mb-3">
                Scientific strategies backed by 93,000+ data points
              </p>
              <a 
                href="https://www.youtube.com/watch?v=e2_HXKNIzaM" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-xs"
              >
                Watch on YouTube →
              </a>
            </div>

            {/* Articles */}
            <div className="bg-card rounded-lg p-6 hover:shadow-sm transition-shadow">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-foreground text-sm">📄</span>
              </div>
              <h3 className="font-medium mb-2 text-sm">Harvard Business Review Guide</h3>
              <p className="text-muted-foreground text-xs mb-3">
                15 Rules for Negotiating a Job Offer - comprehensive strategy
              </p>
              <a 
                href="https://hbr.org/2014/04/15-rules-for-negotiating-a-job-offer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-xs"
              >
                Read Article →
              </a>
            </div>

            <div className="bg-card rounded-lg p-6 hover:shadow-sm transition-shadow">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-foreground text-sm">📄</span>
              </div>
              <h3 className="font-medium mb-2 text-sm">Glassdoor Negotiation Tips</h3>
              <p className="text-muted-foreground text-xs mb-3">
                Research-backed strategies for negotiating salary effectively
              </p>
              <a 
                href="https://www.glassdoor.com/blog/guide-salary-negotiations/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-xs"
              >
                Read Article →
              </a>
            </div>

            <div className="bg-card rounded-lg p-6 hover:shadow-sm transition-shadow">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-foreground text-sm">💰</span>
              </div>
              <h3 className="font-medium mb-2 text-sm">Salary Research Tools</h3>
              <p className="text-muted-foreground text-xs mb-3">
                Use these tools to research market rates and benchmark offers
              </p>
              <div className="space-y-1">
                <a 
                  href="https://www.glassdoor.com/Salaries/index.htm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-primary hover:underline text-xs"
                >
                  Glassdoor Salaries
                </a>
                <a 
                  href="https://www.payscale.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-primary hover:underline text-xs"
                >
                  PayScale
                </a>
                <a 
                  href="https://www.levels.fyi/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-primary hover:underline text-xs"
                >
                  Levels.fyi (Tech)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;