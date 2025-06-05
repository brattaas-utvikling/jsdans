import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    
    const { login, register, logout, user, loading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(email, password, name);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || 'En feil oppstod');
            } else {
                setError('En feil oppstod');
            }
        }
    };

    if (loading) {
        return <div>Laster...</div>;
    }

    if (user) {
        return (
            <div>
                <h2>Velkommen, {user.name}!</h2>
                <p>Email: {user.email}</p>
                <p>Project ID: {import.meta.env.VITE_APPWRITE_PROJECT_ID}</p>
                <button onClick={logout}>Logg ut</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isLogin ? 'Logg inn' : 'Registrer deg'}</h2>
            
            {!isLogin && (
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Navn"
                    required
                />
            )}
            
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passord"
                required
            />
            
            <button type="submit">
                {isLogin ? 'Logg inn' : 'Registrer'}
            </button>
            
            <button type="button" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Trenger konto? Registrer deg' : 'Har konto? Logg inn'}
            </button>
            
            {error && <p style={{color: 'red'}}>{error}</p>}
        </form>
    );
};

export default LoginForm;