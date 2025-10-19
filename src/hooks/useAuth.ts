// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../app/config/config-firebase'; // Assumindo que 'auth' está exportado aqui

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

const useAuth = (): AuthState => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Este listener é o método padrão do Firebase para saber quem está logado
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    // Limpa o listener quando o componente for desmontado
    return () => unsubscribe();
  }, []);

  return { user, isLoading };
};

export default useAuth;