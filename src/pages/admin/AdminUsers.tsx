import { useLanguage } from '@/contexts/LanguageContext';

const mockUsers = [
  { id: '1', name: 'Carlos Méndez', email: 'carlos@tecport.com', role: 'Student', courses: 3, completion: '67%' },
  { id: '2', name: 'Ana Rodríguez', email: 'ana@tecport.com', role: 'Student', courses: 5, completion: '89%' },
  { id: '3', name: 'Pedro Silva', email: 'pedro@tecport.com', role: 'Student', courses: 2, completion: '45%' },
  { id: '4', name: 'María Torres', email: 'maria@tecport.com', role: 'Admin', courses: 0, completion: '—' },
  { id: '5', name: 'Roberto Hernández', email: 'roberto@tecport.com', role: 'Admin', courses: 0, completion: '—' },
  { id: '6', name: 'Luisa Fernández', email: 'luisa@tecport.com', role: 'Student', courses: 4, completion: '92%' },
  { id: '7', name: 'Diego Morales', email: 'diego@tecport.com', role: 'Student', courses: 1, completion: '20%' },
];

export default function AdminUsers() {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-foreground">{t('admin.users')}</h1>

      <div className="rounded border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-2 font-medium">Name</th>
              <th className="px-4 py-2 font-medium">Email</th>
              <th className="px-4 py-2 font-medium">Role</th>
              <th className="px-4 py-2 font-medium">Courses</th>
              <th className="px-4 py-2 font-medium">Completion</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map(user => (
              <tr key={user.id} className="border-b border-border last:border-0">
                <td className="px-4 py-2.5 font-medium text-foreground">{user.name}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{user.email}</td>
                <td className="px-4 py-2.5">
                  <span className={`rounded px-2 py-0.5 text-xs font-medium ${user.role === 'Admin' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-foreground">{user.courses}</td>
                <td className="px-4 py-2.5 text-foreground">{user.completion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
