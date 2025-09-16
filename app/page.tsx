import { Dashboard } from '../components/Dashboard';
import { Header } from '../components/Header';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Dashboard />
    </main>
  );
}
