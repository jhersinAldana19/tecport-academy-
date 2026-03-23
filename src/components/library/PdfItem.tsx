import { FileText, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Document } from '@/data/library';
import { useParams, useNavigate } from 'react-router-dom';

interface PdfItemProps {
  document: Document;
}

export const PdfItem = ({ document }: PdfItemProps) => {
  const { equipmentId, manualId } = useParams<{ equipmentId: string; manualId: string }>();
  const navigate = useNavigate();
  
  const handleView = () => {
    // Navigate to integrated PDF viewer
    navigate(`/library/${equipmentId}/${manualId}/view/${document.id}`);
  };

  const handleDownload = () => {
    // Create download link
    const link = window.document.createElement('a');
    link.href = document.path;
    link.download = document.fileName;
    link.click();
  };

  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-muted/50 rounded-lg transition-colors">
      <div className="flex items-center gap-3 flex-1">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-foreground">{document.title}</h4>
          <p className="text-xs text-muted-foreground">{document.fileName}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleView}
          className="gap-2"
        >
          <Eye className="w-4 h-4" />
          View
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
      </div>
    </div>
  );
};
