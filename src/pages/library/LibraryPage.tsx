import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { EquipmentCard } from '@/components/library/EquipmentCard';
import { libraryData } from '@/data/library';
import Header from '@/components/Header';

export const LibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEquipment = libraryData.filter((equipment) =>
    equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    equipment.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <div className="bg-primary text-primary-foreground py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Library</h1>
          <p className="text-lg opacity-90">
            Access technical documentation for industrial equipment
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Equipment Grid */}
        {filteredEquipment.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.map((equipment) => (
              <EquipmentCard key={equipment.id} equipment={equipment} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No equipment found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
