import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { DocumentSection } from '@/data/library';
import { PdfItem } from './PdfItem';
import { Badge } from '@/components/ui/badge';

interface DocumentAccordionProps {
  sections: DocumentSection[];
}

export const DocumentAccordion = ({ sections }: DocumentAccordionProps) => {
  return (
    <Accordion type="multiple" className="w-full space-y-2">
      {sections.map((section) => (
        <AccordionItem
          key={section.id}
          value={section.id}
          className="border rounded-lg px-4 bg-card"
        >
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex items-center gap-3">
              <span className="text-base font-semibold">{section.title}</span>
              <Badge variant="secondary" className="ml-2">
                {section.documents.length} {section.documents.length === 1 ? 'document' : 'documents'}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-1">
              {section.documents.map((document) => (
                <PdfItem key={document.id} document={document} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
