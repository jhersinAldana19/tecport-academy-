import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, ChevronRight } from 'lucide-react';
import { Equipment, getTotalDocumentsCount } from '@/data/library';

interface EquipmentCardProps {
  equipment: Equipment;
}

export const EquipmentCard = ({ equipment }: EquipmentCardProps) => {
  const navigate = useNavigate();
  const documentCount = getTotalDocumentsCount(equipment);

  const handleOpenLibrary = () => {
    navigate(`/library/${equipment.id}`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
              {equipment.name}
            </CardTitle>
            <CardDescription className="text-sm">
              {equipment.description}
            </CardDescription>
          </div>
          <div className="ml-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <FileText className="w-3 h-3" />
            {documentCount} {documentCount === 1 ? 'document' : 'documents'}
          </Badge>
          <Badge variant="outline" className="gap-1">
            {equipment.manuals.length} {equipment.manuals.length === 1 ? 'manual' : 'manuals'}
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleOpenLibrary}
          className="w-full gap-2 group-hover:gap-3 transition-all"
        >
          Open library
          <ChevronRight className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
