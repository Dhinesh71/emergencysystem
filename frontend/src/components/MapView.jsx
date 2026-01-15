import React from 'react';
import { MapPin } from 'lucide-react';

// Mock map component since we don't have a real map provider key
const MapView = ({ location }) => {
    return (
        <div className="w-full h-full bg-slate-800 relative overflow-hidden rounded-lg group">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            ></div>

            {/* Mock Map UI Elements */}
            <div className="absolute top-4 right-4 bg-slate-900/80 px-3 py-1 rounded text-xs text-primary font-mono border border-primary/30">
                LIVE FEED
            </div>

            {/* Central Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
                <MapPin className="w-8 h-8 text-danger fill-danger/20" />
                <div className="w-16 h-16 bg-danger/20 rounded-full blur-xl -mt-4 animate-pulse"></div>
            </div>

            <div className="absolute bottom-4 left-4 bg-slate-900/90 p-2 rounded border border-gray-700">
                <p className="text-xs text-muted mb-1">LOCATION COORDS</p>
                <p className="font-mono text-sm text-text">{location || "Lat: 12.9716, Long: 77.5946"}</p>
            </div>
        </div>
    );
};

export default MapView;
