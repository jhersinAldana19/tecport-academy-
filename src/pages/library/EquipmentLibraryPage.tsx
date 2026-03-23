import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import { getEquipmentById } from '@/data/library';
import Header from '@/components/Header';

export const EquipmentLibraryPage = () => {
  const { equipmentId } = useParams<{ equipmentId: string }>();
  const navigate = useNavigate();
  
  const equipment = equipmentId ? getEquipmentById(equipmentId) : undefined;

  if (!equipment) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Equipment not found</h2>
            <p className="text-muted-foreground mb-4">
              The requested equipment could not be found.
            </p>
            <Button onClick={() => navigate('/library')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Library
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleOpenManual = (manualId: string) => {
    navigate(`/library/${equipmentId}/${manualId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Content Header */}
      <div className="bg-primary text-primary-foreground py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/library')}
            className="mb-4 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Library
          </Button>
          <h1 className="text-4xl font-bold mb-2">{equipment.name}</h1>
          <p className="text-lg opacity-90">Documentation</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {equipment.manuals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.manuals.map((manual) => {
              const totalDocuments = manual.sections.reduce(
                (total, section) => total + section.documents.length,
                0
              );

              return (
                <Card key={manual.id} className="hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                          {manual.title}
                        </CardTitle>
                        <CardDescription>{manual.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline">
                        {manual.sections.length} {manual.sections.length === 1 ? 'section' : 'sections'}
                      </Badge>
                      <Badge variant="outline">
                        {totalDocuments} {totalDocuments === 1 ? 'document' : 'documents'}
                      </Badge>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button
                      onClick={() => handleOpenManual(manual.id)}
                      className="w-full gap-2 group-hover:gap-3 transition-all"
                    >
                      Open manual
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No manuals available for this equipment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
