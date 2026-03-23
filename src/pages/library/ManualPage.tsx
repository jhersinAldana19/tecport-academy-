import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { getEquipmentById, getManualById } from '@/data/library';
import { DocumentAccordion } from '@/components/library/DocumentAccordion';
import Header from '@/components/Header';

export const ManualPage = () => {
  const { equipmentId, manualId } = useParams<{ equipmentId: string; manualId: string }>();
  const navigate = useNavigate();
  
  const equipment = equipmentId ? getEquipmentById(equipmentId) : undefined;
  const manual = equipmentId && manualId ? getManualById(equipmentId, manualId) : undefined;

  if (!equipment || !manual) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Manual not found</h2>
            <p className="text-muted-foreground mb-4">
              The requested manual could not be found.
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

  const totalDocuments = manual.sections.reduce(
    (total, section) => total + section.documents.length,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Content Header */}
      <div className="bg-primary text-primary-foreground py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate(`/library/${equipmentId}`)}
            className="mb-4 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {equipment.name}
          </Button>
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{manual.title}</h1>
              <p className="text-lg opacity-90 mb-3">{manual.description}</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30">
                  {manual.sections.length} {manual.sections.length === 1 ? 'section' : 'sections'}
                </Badge>
                <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30">
                  {totalDocuments} {totalDocuments === 1 ? 'document' : 'documents'}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {manual.sections.length > 0 ? (
          <DocumentAccordion sections={manual.sections} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No documents available in this manual.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
