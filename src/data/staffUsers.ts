/**
 * Temporary hardcoded staff directory (no backend yet).
 * Replace with real auth when the full Academy ships.
 */
export interface StaffUser {
  id: string;
  username: string;
  password: string;
  fullName: string;
  site: string;
  phone: string;
  specialty: string;
  position: string;
}

export const staffUsers: readonly StaffUser[] = [
  {
    id: '1',
    username: 'jimmy.montes',
    password: 'Jimmy2026!',
    fullName: 'Jimmy Javier Montes Llalle',
    site: 'Tecport Perú',
    phone: '511 94152386',
    specialty: 'Hidráulico',
    position: 'Supervisor',
  },
  {
    id: '2',
    username: 'ruben.rodriguez',
    password: 'Ruben2026!',
    fullName: 'Ruben Jose Rodriguez Fernandez',
    site: 'Tecport Perú',
    phone: '511 931323654',
    specialty: 'Hidráulico',
    position: 'Técnico',
  },
  {
    id: '3',
    username: 'robinson.pacherrez',
    password: 'Robinson2026!',
    fullName: 'Robinson Pacherrez Guevara',
    site: 'Tecport Perú',
    phone: '511 943465884',
    specialty: 'Electricista/Electrónico',
    position: 'Técnico',
  },
  {
    id: '4',
    username: 'luis.gutierrez',
    password: 'Luis2026!',
    fullName: 'Luis Gutiérrez Cano',
    site: 'Tecport Perú',
    phone: '511 976332815',
    specialty: 'Mecánico',
    position: 'Técnico',
  },
  {
    id: '5',
    username: 'jons.machaca',
    password: 'Jons2026!',
    fullName: 'Jons Esau Machaca Lermo',
    site: 'Tecport Perú',
    phone: '511 930453282',
    specialty: 'Mecánico',
    position: 'Técnico',
  },
  {
    id: '6',
    username: 'cristian.valdez',
    password: 'Cristian2026!',
    fullName: 'Cristian Valdez',
    site: 'Tecport Chile',
    phone: '56 9 6683 4759',
    specialty: 'Mecánico',
    position: 'Técnico',
  },
  {
    id: '7',
    username: 'franco.cortez',
    password: 'Franco2026!',
    fullName: 'Franco Cortez',
    site: 'Tecport Chile',
    phone: '56 9 3132 9622',
    specialty: 'Mecánico',
    position: 'Técnico',
  },
  {
    id: '8',
    username: 'braulio.jimenez',
    password: 'Braulio2026!',
    fullName: 'Braulio Jimenez',
    site: 'Tecport Chile',
    phone: '56 9 9096 8071',
    specialty: 'Mecánico',
    position: 'Técnico',
  },
  {
    id: '9',
    username: 'joseph.avalos',
    password: 'Joseph2026!',
    fullName: 'Joseph Avalos',
    site: 'Tecport Latam',
    phone: '51922874164',
    specialty: 'Mecánico',
    position: 'Técnico',
  },
  {
    id: '10',
    username: 'geraldo.rengifo',
    password: 'Geraldo2026!',
    fullName: 'Geraldo Rengifo',
    site: 'Tecport Latam',
    phone: '51962200466',
    specialty: 'Mecánico',
    position: 'Técnico',
  },
  {
    id: '11',
    username: 'antonio.casas',
    password: 'Antonio2026!',
    fullName: 'Antonio Casas',
    site: 'Invitado',
    phone: '5212292228316',
    specialty: 'Mecánico',
    position: 'Técnico',
  },
  {
    id: '12',
    username: 'nunes.soalheiro',
    password: 'Nunes2026!',
    fullName: 'Nunes Soalheiro',
    site: 'Tecport Brasil',
    phone: '5511995384630',
    specialty: 'Mecánico',
    position: 'Técnico',
  },
  {
    id: '13',
    username: 'tiago.maeda',
    password: 'Tiago2026!',
    fullName: 'Tiago Maeda',
    site: 'Tecport Brasil',
    phone: '5511964755231',
    specialty: 'Mecánico',
    position: 'Técnico',
  },
];

export function findStaffUserByCredentials(
  username: string,
  password: string,
): StaffUser | undefined {
  const normalized = username.trim().toLowerCase();
  return staffUsers.find(
    user => user.username === normalized && user.password === password,
  );
}

export function getStaffUserInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}
