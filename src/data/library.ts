// Types for library data structure
export interface Document {
  id: string;
  title: string;
  fileName: string;
  path: string;
}

export interface DocumentSection {
  id: string;
  title: string;
  documents: Document[];
}

export interface Manual {
  id: string;
  title: string;
  description: string;
  sections: DocumentSection[];
}

export interface Equipment {
  id: string;
  name: string;
  description: string;
  image?: string;
  manuals: Manual[];
}

// Library data
export const libraryData: Equipment[] = [
  {
    id: 'trs4531',
    name: 'TRS4531 Reach Stacker',
    description: 'Technical documentation for industrial reach stacker',
    image: '/assets/library/TRS4531/preview.jpg', // Optional preview image
    manuals: [
      {
        id: 'manual-operacion-trs4531',
        title: 'Manual de Operación TRS4531',
        description: 'Complete operation manual for TRS4531 Reach Stacker',
        sections: [
          {
            id: 'introduction',
            title: 'Introduction',
            documents: [
              {
                id: 'caratula',
                title: 'Carátula',
                fileName: 'caratula-man-op-trs4531.pdf',
                path: '/assets/library/TRS4531/caratula/caratula-man-op-trs4531.pdf',
              },
              {
                id: 'indice',
                title: 'Índice',
                fileName: 'indice-man-op-trs4531.pdf',
                path: '/assets/library/TRS4531/indice/indice-man-op-trs4531.pdf',
              },
            ],
          },
          {
            id: 'operation',
            title: 'Operation',
            documents: [
              {
                id: 'cap1',
                title: 'Capítulo 1 – Introducción',
                fileName: 'cap1-introduccion-trs4531-v1.pdf',
                path: '/assets/library/TRS4531/capitulos/cap1-introduccion-trs4531-v1.pdf',
              },
              {
                id: 'cap2',
                title: 'Capítulo 2 – Seguridad',
                fileName: 'cap2-seguridad-trs4531-v1.pdf',
                path: '/assets/library/TRS4531/capitulos/cap2-seguridad-trs4531-v1.pdf',
              },
              {
                id: 'cap3',
                title: 'Capítulo 3 – Cabina',
                fileName: 'cap3-cabina-trs4531-v1.pdf',
                path: '/assets/library/TRS4531/capitulos/cap3-cabina-trs4531-v1.pdf',
              },
            ],
          },
          {
            id: 'usage',
            title: 'Usage',
            documents: [
              {
                id: 'cap4',
                title: 'Capítulo 4 – Utilización',
                fileName: 'cap4-utilizacionmandos-trs4531-v1.pdf',
                path: '/assets/library/TRS4531/capitulos/cap4-utilizacionmandos-trs4531-v1.pdf',
              },
              {
                id: 'cap5',
                title: 'Capítulo 5 – Uso del equipo',
                fileName: 'cap5-usodelequipo-trs4531-v1.pdf',
                path: '/assets/library/TRS4531/capitulos/cap5-usodelequipo-trs4531-v1.pdf',
              },
            ],
          },
          {
            id: 'maintenance',
            title: 'Maintenance',
            documents: [
              {
                id: 'cap7',
                title: 'Capítulo 7 – Lubricación',
                fileName: 'cap7-lubricacion-trs4531-v1.pdf',
                path: '/assets/library/TRS4531/capitulos/cap7-lubricacion-trs4531-v1.pdf',
              },
            ],
          },
          {
            id: 'specifications',
            title: 'Specifications',
            documents: [
              {
                id: 'cap9',
                title: 'Capítulo 9 – Especificaciones',
                fileName: 'cap9-especificaciones-trs4531.pdf',
                path: '/assets/library/TRS4531/capitulos/cap9-especificaciones-trs4531.pdf',
              },
            ],
          },
        ],
      },
    ],
  },
];

// Helper functions
export const getEquipmentById = (id: string): Equipment | undefined => {
  return libraryData.find((equipment) => equipment.id === id);
};

export const getManualById = (equipmentId: string, manualId: string): Manual | undefined => {
  const equipment = getEquipmentById(equipmentId);
  return equipment?.manuals.find((manual) => manual.id === manualId);
};

export const getTotalDocumentsCount = (equipment: Equipment): number => {
  return equipment.manuals.reduce((total, manual) => {
    return total + manual.sections.reduce((sectionTotal, section) => {
      return sectionTotal + section.documents.length;
    }, 0);
  }, 0);
};
