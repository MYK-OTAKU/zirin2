import { BookOpen, Home, MessageSquarePlus, Target, type LucideIcon } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  getActiveDestination,
  NAV_DESTINATIONS,
  type NavDestinationId,
} from '../../domain/navigation';
import { DockCharacter } from './DockCharacter';

const DESTINATION_ICONS: Record<NavDestinationId, LucideIcon> = {
  home: Home,
  riddles: Target,
  tales: BookOpen,
  contact: MessageSquarePlus,
};

export function AppDock() {
  const { pathname } = useLocation();
  const activeDestination = getActiveDestination(pathname);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 sm:bottom-6">
      <nav
        aria-label="Navigation principale"
        className="pointer-events-auto flex max-w-full items-center gap-1.5 rounded-[var(--radius-dock)] border border-zirin-brown/15 bg-zirin-ivory/95 p-1.5 shadow-[var(--shadow-dock)] backdrop-blur-md sm:gap-2 sm:p-2"
      >
        <div className="hidden sm:block">
          <DockCharacter
            scene={activeDestination.scene}
            label={activeDestination.sceneDescription}
          />
        </div>

        <ul className="flex items-center gap-1 sm:gap-1.5" role="list">
          {NAV_DESTINATIONS.map((item) => {
            const Icon = DESTINATION_ICONS[item.id];
            const isActive = activeDestination.id === item.id;

            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group flex min-h-11 items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zirin-primary sm:px-4 ${
                    isActive
                      ? 'bg-zirin-primary text-white shadow-sm'
                      : 'text-zirin-ink hover:bg-zirin-sand hover:text-zirin-brown'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                      isActive ? 'scale-105' : 'group-hover:scale-105'
                    }`}
                    aria-hidden="true"
                  />
                  <span className={isActive ? 'inline' : 'hidden xs:inline sm:inline'}>
                    {item.label}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
