import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import AccidentCard from '../components/AccidentCard';
import { getAccidents } from '../api/accident.api';
import { AlertCircle, RefreshCw } from 'lucide-react';

const Dashboard = () => {
    const [accidents, setAccidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getAccidents();
            setAccidents(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch accident data. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-text flex items-center gap-2">
                        <AlertCircle className="text-danger" />
                        Accident Feed
                    </h2>
                    <button
                        onClick={fetchData}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm transition-colors text-text"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>

                {error && (
                    <div className="bg-red-900/20 border border-red-500/50 text-red-200 p-4 rounded mb-6 text-center">
                        {error}
                    </div>
                )}

                {loading && accidents.length === 0 ? (
                    <div className="text-center py-20 text-muted">
                        Loading real-time data...
                    </div>
                ) : accidents.length === 0 ? (
                    <div className="text-center py-20 text-muted border-2 border-dashed border-slate-700 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">No Accidents Detected</h3>
                        <p>System is monitoring active camera feeds.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {accidents.map(accident => (
                            <AccidentCard key={accident.id} accident={accident} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
