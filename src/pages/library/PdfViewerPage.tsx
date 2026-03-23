import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon } from 'lucide-react';
import { getEquipmentById, getManualById } from '@/data/library';
import Header from '@/components/Header';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';

export const PdfViewerPage = () => {
  const { equipmentId, manualId, documentId } = useParams<{ 
    equipmentId: string; 
    manualId: string;
    documentId: string;
  }>();
  const navigate = useNavigate();
  
  const zoomPluginInstance = zoomPlugin();
  const { ZoomIn, ZoomOut, CurrentScale } = zoomPluginInstance;
  
  const equipment = equipmentId ? getEquipmentById(equipmentId) : undefined;
  const manual = equipmentId && manualId ? getManualById(equipmentId, manualId) : undefined;
  
  // Find the document across all sections
  const document = manual?.sections
    .flatMap(section => section.documents)
    .find(doc => doc.id === documentId);

  if (!equipment || !manual || !document) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Document not found</h2>
            <p className="text-muted-foreground mb-4">
              The requested document could not be found.
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

  const handleDownload = () => {
    const link = window.document.createElement('a');
    link.href = document.path;
    link.download = document.fileName;
    link.click();
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      
      {/* Toolbar */}
      <div className="bg-card border-b">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/library/${equipmentId}/${manualId}`)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="border-l pl-4">
                <h3 className="font-semibold text-sm">{document.title}</h3>
                <p className="text-xs text-muted-foreground">{document.fileName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Zoom Controls */}
              <div className="flex items-center gap-2 border rounded-lg px-2 py-1 bg-background">
                <ZoomOut>
                  {(props) => (
                    <button
                      onClick={props.onClick}
                      className="h-7 w-7 flex items-center justify-center hover:bg-accent rounded transition-colors"
                      title="Zoom out"
                    >
                      <ZoomOutIcon className="w-4 h-4" />
                    </button>
                  )}
                </ZoomOut>
                
                <div className="text-sm min-w-[60px] text-center font-medium">
                  <CurrentScale>
                    {(props) => <>{`${Math.round(props.scale * 100)}%`}</>}
                  </CurrentScale>
                </div>
                
                <ZoomIn>
                  {(props) => (
                    <button
                      onClick={props.onClick}
                      className="h-7 w-7 flex items-center justify-center hover:bg-accent rounded transition-colors"
                      title="Zoom in"
                    >
                      <ZoomInIcon className="w-4 h-4" />
                    </button>
                  )}
                </ZoomIn>
              </div>
              
              <Button
                variant="default"
                size="sm"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-hidden bg-gray-50">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <div className="h-full">
            <Viewer 
              fileUrl={document.path}
              plugins={[zoomPluginInstance]}
              defaultScale={1.0}
            />
          </div>
        </Worker>
      </div>
    </div>
  );
};
