export type NavDestinationId = 'home' | 'riddles' | 'tales' | 'contact';

export type CharacterScene = 'seated' | 'archer' | 'reader' | 'writer';

export interface NavDestination {
  readonly id: NavDestinationId;
  readonly label: string;
  readonly path: string;
  readonly scene: CharacterScene;
  readonly sceneDescription: string;
}

export const NAV_DESTINATIONS: readonly NavDestination[] = [
  {
    id: 'home',
    label: 'Accueil',
    path: '/',
    scene: 'seated',
    sceneDescription: 'Personnage assis à une table',
  },
  {
    id: 'riddles',
    label: 'Devinettes',
    path: '/devinettes',
    scene: 'archer',
    sceneDescription: 'Personnage visant une cible',
  },
  {
    id: 'tales',
    label: 'Contes',
    path: '/contes',
    scene: 'reader',
    sceneDescription: 'Personnage ouvrant un livre',
  },
  {
    id: 'contact',
    label: 'Contact',
    path: '/contact',
    scene: 'writer',
    sceneDescription: 'Personnage tendant un stylo',
  },
] as const;

export function getActiveDestination(pathname: string): NavDestination {
  if (pathname.startsWith('/devinettes')) {
    return NAV_DESTINATIONS[1]!;
  }
  if (pathname.startsWith('/contes')) {
    return NAV_DESTINATIONS[2]!;
  }
  if (pathname.startsWith('/contact')) {
    return NAV_DESTINATIONS[3]!;
  }
  return NAV_DESTINATIONS[0]!;
}
