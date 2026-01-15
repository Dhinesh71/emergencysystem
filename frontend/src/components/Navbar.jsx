import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-surface border-b border-gray-700 py-4 px-6 flex items-center justify-between sticky top-0 z-50 shadow-lg">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="bg-danger/20 p-2 rounded-full">
                    <ShieldAlert className="w-8 h-8 text-danger" />
                </div>
                <div>
                    <h1 className="text-xl font-bold tracking-wider text-text uppercase">
                        Emergency Response
                    </h1>
                    <p className="text-xs text-muted font-mono tracking-widest">
                        AI ACCIDENT DETECTION SYSTEM
                    </p>
                </div>
            </Link>
            <div className="flex items-center gap-4">
                <div className="px-3 py-1 bg-green-900/30 border border-green-500/30 rounded text-green-400 text-xs font-mono animate-pulse">
                    SYSTEM ACTIVE
                </div>
                <div className="text-sm text-muted font-mono">
                    {new Date().toLocaleTimeString()}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
