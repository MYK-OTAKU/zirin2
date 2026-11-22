import { Component, type ErrorInfo, type ReactNode } from 'react';
import { RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Zirin ErrorBoundary:', error, info.componentStack);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.assign('/');
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-dvh flex-col items-center justify-center bg-zirin-ivory px-6 text-center">
          <div className="max-w-md rounded-[var(--radius-card)] border border-zirin-brown/15 bg-zirin-sand/60 p-8">
            <h1 className="text-2xl font-bold text-zirin-brown">
              Une erreur inattendue est survenue
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-zirin-ink-muted">
              Nous n&apos;avons pas pu afficher cette page correctement. Vous pouvez
              revenir à l&apos;accueil pour continuer votre découverte.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-zirin-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zirin-primary-hover"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Retour à l&apos;accueil
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
