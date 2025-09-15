import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { AuthForm } from './components/AuthForm';
import { UserSetup } from './components/UserSetup';
import { Dashboard } from './components/Dashboard';

/**
 * Main application component that manages authentication flow and navigation
 * Handles login/register states, user setup, and main dashboard rendering
 * 
 * @returns {JSX.Element} The rendered application
 */
export default function App() {
  // Authentication hook providing user state and auth methods
  const { user, isLoading, login, register, logout, updateUser } = useAuth();
  
  // Local state management
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [currentView, setCurrentView] = useState('home');
  const [showSetup, setShowSetup] = useState(false);

  // Check if user needs to complete profile setup
  const needsSetup = user && (!user.workExperience || !user.targetSector);

  // Loading state while checking authentication
  if (isLoading) {
    return (
      <div className="size-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  // Show authentication form if no user is logged in
  if (!user) {
    return (
      <AuthForm
        mode={authMode}
        onSubmit={async (data) => {
          if (authMode === 'login') {
            await login(data.email, data.password);
          } else {
            await register(data.fullName, data.email, data.password);
            setShowSetup(true);
          }
        }}
        onToggleMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
      />
    );
  }

  // Show user setup if profile is incomplete
  if (needsSetup || showSetup) {
    return (
      <UserSetup
        user={user}
        onComplete={(userData) => {
          updateUser(userData);
          setShowSetup(false);
        }}
      />
    );
  }

  // Show main dashboard for authenticated users with complete profiles
  return (
    <Dashboard
      user={user}
      currentView={currentView}
      onViewChange={setCurrentView}
      onLogout={logout}
      onUpdateUser={updateUser}
    />
  );
}