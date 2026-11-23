import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { ErrorBoundary } from '../components/layout/ErrorBoundary';
import { ComingSoonPage } from '../pages/ComingSoonPage';
import { HomePage } from '../pages/HomePage';
import { TaleDetailPage } from '../pages/TaleDetailPage';
import { TalesPage } from '../pages/TalesPage';
import { RiddlesPage } from '../pages/RiddlesPage';

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/devinettes" element={<RiddlesPage />} />
            <Route path="/contes" element={<TalesPage />} />
            <Route path="/contes/:slug" element={<TaleDetailPage />} />
            <Route
              path="/contact"
              element={
                <ComingSoonPage
                  title="Contact et suggestions"
                  description="L'écran de démonstration pour proposer un conte ou une devinette sera développé dans la prochaine étape."
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
