'use client';

import { useState, useEffect } from 'react';
import { Lock, AlertTriangle, ShieldAlert, Skull } from 'lucide-react';

export default function RansomwarePhishing({ formData, handleChange, handleSubmit, loading }) {
    const [timeLeft, setTimeLeft] = useState(48 * 60 * 60); // 48 hours

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-[#8B0000] text-white font-mono flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #8B0000 25%, #8B0000 75%, #000 75%, #000)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}>
            </div>

            <div className="max-w-5xl w-full bg-[#2a0000] border-8 border-red-600 shadow-[0_0_100px_rgba(255,0,0,0.5)] z-10 flex flex-col md:flex-row">

                {/* Left Panel - The Threat */}
                <div className="md:w-1/3 bg-red-900/20 border-r-4 border-red-600 p-6 flex flex-col items-center text-center relative">
                    <div className="animate-pulse mb-6">
                        <Lock className="h-32 w-32 text-red-500" />
                    </div>

                    <h1 className="text-4xl font-black text-red-500 mb-2 tracking-tighter">YOUR FILES ARE ENCRYPTED</h1>
                    <p className="text-red-300 text-sm font-bold mb-8">MILITARY GRADE ENCRYPTION APPLIED</p>

                    <div className="w-full bg-black/50 border-2 border-red-500 p-4 rounded-lg mb-6">
                        <p className="text-red-500 text-xs font-bold mb-1">TIME REMAINING TO PAY</p>
                        <div className="text-4xl font-black text-white tracking-widest font-digital">
                            {formatTime(timeLeft)}
                        </div>
                    </div>

                    <div className="mt-auto">
                        <div className="flex items-center justify-center gap-2 text-red-400 text-xs font-bold">
                            <Skull className="h-4 w-4" />
                            <span>NO DECRYPTION WITHOUT PAYMENT</span>
                            <Skull className="h-4 w-4" />
                        </div>
                    </div>
                </div>

                {/* Right Panel - The Demand */}
                <div className="md:w-2/3 p-8 bg-white text-black">
                    <div className="border-b-2 border-red-600 pb-4 mb-6 flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-red-700 flex items-center gap-2">
                            <ShieldAlert className="h-8 w-8" />
                            SYSTEM LOCKED
                        </h2>
                        <span className="bg-red-600 text-white px-3 py-1 text-sm font-bold rounded">ID: 8842-9910-4421</span>
                    </div>

                    <div className="space-y-4 mb-8 text-sm font-medium">
                        <p>
                            <strong className="text-red-700">What happened?</strong><br />
                            All your files (documents, photos, databases) have been encrypted with a unique key generated for this computer.
                        </p>
                        <p>
                            <strong className="text-red-700">How do I get my files back?</strong><br />
                            The only way to decrypt your files is to purchase the private key and decryption program.
                        </p>
                    </div>

                    <div className="bg-gray-100 p-6 border-2 border-gray-300 rounded-lg mb-8">
                        <div className="flex justify-between items-end mb-4">
                            <span className="font-bold text-gray-600">Payment Required:</span>
                            <div className="text-right">
                                <span className="text-3xl font-black text-red-600 block">K27,500 ZMW</span>
                                <span className="text-sm text-gray-500 font-medium">($1,000 USD)</span>
                            </div>
                        </div>
                        <div className="bg-white border border-gray-300 p-3 rounded flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-500">BTC:</span>
                            <code className="text-sm flex-1 overflow-hidden text-ellipsis">1M8s2S54m78...</code>
                            <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">COPY</button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Enter Transaction ID to Decrypt:
                            </label>
                            <div className="flex gap-2">
                                <input
                                    name="paymentId"
                                    type="text"
                                    required
                                    value={formData.paymentId || ''}
                                    onChange={handleChange}
                                    placeholder="Paste transaction ID here..."
                                    className="flex-1 border-2 border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded shadow-lg transition-transform active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? 'CHECKING...' : 'DECRYPT'}
                                </button>
                            </div>
                        </div>
                    </form>

                    <p className="mt-6 text-xs text-center text-gray-500">
                        Attempts to remove this software will result in permanent data loss.
                    </p>
                </div>
            </div>
        </div>
    );
}
