import React, { useState } from 'react';
import { User, Phone, ShieldCheck, Lock, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../../services/supabase';

interface CompleteProfileModalProps {
    isOpen: boolean;
    user: {
        id: string;
        name?: string;
        email?: string;
        phone?: string;
    };
    onSuccess: (updated: { name: string; phone: string }) => void;
}

export const CompleteProfileModal: React.FC<CompleteProfileModalProps> = ({
    isOpen,
    user,
    onSuccess
}) => {
    const [fullName, setFullName] = useState(user.name || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    React.useEffect(() => {
        if (user.name && !fullName) setFullName(user.name);
        if (user.phone && !phone) setPhone(user.phone);
    }, [user.name, user.phone]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const trimmedName = fullName.trim();
        const cleanPhone = phone.trim().replace(/[\s\-\(\)]/g, '');

        if (!trimmedName || trimmedName.length < 2) {
            setError('Please enter your legal full name.');
            return;
        }

        if (!cleanPhone || cleanPhone.length < 8) {
            setError('Please enter a valid mobile phone number including your country code (e.g. +1, +44, +234).');
            return;
        }

        // Format phone to ensure leading '+'
        let formattedPhone = cleanPhone;
        if (!formattedPhone.startsWith('+')) {
            formattedPhone = '+' + formattedPhone;
        }

        setIsLoading(true);

        try {
            // 1. Update mvp_profiles table in Supabase
            const { error: profileError } = await supabase
                .from('mvp_profiles')
                .update({
                    full_name: trimmedName,
                    phone: formattedPhone
                })
                .eq('user_id', user.id);

            if (profileError && user.email) {
                console.warn('[CompleteProfileModal] user_id update failed, trying email fallback...', profileError.message);
                await supabase
                    .from('mvp_profiles')
                    .update({
                        full_name: trimmedName,
                        phone: formattedPhone
                    })
                    .eq('email', user.email);
            }

            // 2. Update Supabase Auth user metadata
            try {
                await supabase.auth.updateUser({
                    data: {
                        full_name: trimmedName,
                        phone: formattedPhone
                    }
                });
            } catch (authErr) {
                console.warn('[CompleteProfileModal] Auth metadata update error:', authErr);
            }

            // 3. Trigger callback so parent state updates and modal closes
            onSuccess({
                name: trimmedName,
                phone: formattedPhone
            });
        } catch (err: any) {
            console.error('[CompleteProfileModal] Failed to save profile:', err);
            setError(err.message || 'Failed to update profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Dark Blur Backdrop (persistent - cannot click outside to dismiss) */}
            <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity" />

            {/* Modal Container: Bottom sheet on mobile, centered card on desktop */}
            <div 
                className="relative w-full sm:max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl shadow-2xl border-t sm:border border-slate-200 dark:border-slate-800 p-6 sm:p-7 z-10 animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300 max-h-[92vh] overflow-y-auto"
            >
                {/* Mobile drag handle indicator */}
                <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-4 sm:hidden" />

                {/* Header Badge */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-blue-200/50 dark:border-blue-800/50">
                        <ShieldCheck size={13} className="text-blue-500" />
                        Account Verification Required
                    </span>
                </div>

                {/* Title & Subtitle */}
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Confirm Contact Details
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 mb-5 leading-relaxed">
                    In compliance with updated digital banking security standards, please confirm your primary contact details below to continue accessing your account.
                </p>

                {/* Error Banner */}
                {error && (
                    <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 flex items-start gap-2 text-xs text-red-600 dark:text-red-400">
                        <AlertCircle size={15} className="shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
                            Legal Full Name
                        </label>
                        <div className="relative">
                            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="e.g. Dylan Harrison"
                                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Mobile Phone */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1 flex items-center justify-between">
                            <span>Mobile Phone Number</span>
                            <span className="text-red-500 font-semibold text-[10px]">Required</span>
                        </label>
                        <div className="relative">
                            <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+1 (555) 000-0000"
                                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-1">
                            Include your country code (e.g. <span className="font-semibold text-slate-700 dark:text-slate-300">+1</span> for US, <span className="font-semibold text-slate-700 dark:text-slate-300">+44</span> for UK, <span className="font-semibold text-slate-700 dark:text-slate-300">+234</span> for Nigeria).
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-2 py-3 sm:py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                <span>Verifying & Saving...</span>
                            </>
                        ) : (
                            <>
                                <Lock size={15} />
                                <span>Confirm & Continue</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Footer security note */}
                <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-4 flex items-center justify-center gap-1">
                    <Lock size={11} /> 256-Bit Encrypted & Compliant
                </p>
            </div>
        </div>
    );
};
