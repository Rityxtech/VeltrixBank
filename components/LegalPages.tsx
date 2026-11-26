import React from 'react';
import { ArrowLeft, Shield, FileText, Lock, MessageSquare } from 'lucide-react';
import { APP_CONFIG } from '../config';

interface LegalPageProps {
    siteName?: string;
    logoUrl?: string;
    onBack: () => void;
    onNavigate?: (hash: string) => void;
}

const LegalShell: React.FC<LegalPageProps & { title: string; subtitle: string; icon: React.ReactNode; lastUpdated: string; children: React.ReactNode }> = ({
    siteName,
    onBack,
    onNavigate,
    title,
    subtitle,
    icon,
    lastUpdated,
    children
}) => {
    const brand = siteName || APP_CONFIG.BANK_NAME || 'Veltrix Bank';
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
            <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        <span>Back to {brand}</span>
                    </button>
                    <div className="flex items-center gap-4 text-xs font-semibold">
                        <a
                            href="#terms"
                            onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate('terms'); } }}
                            className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                        >
                            Terms &amp; Conditions
                        </a>
                        <a
                            href="#privacy"
                            onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate('privacy'); } }}
                            className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                        >
                            Privacy Policy
                        </a>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            {icon}
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">{brand} Legal &amp; Compliance</p>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{title}</h1>
                        </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{subtitle}</p>
                    <p className="text-xs font-medium text-slate-400 dark:text-slate-500 pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
                        Effective Date: {lastUpdated} &bull; Last Updated: {lastUpdated}
                    </p>

                    <div className="space-y-8 text-sm leading-7 text-slate-700 dark:text-slate-300">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export const PrivacyPolicyPage: React.FC<LegalPageProps> = (props) => {
    const brand = props.siteName || APP_CONFIG.BANK_NAME || 'Veltrix Bank';
    const supportEmail = APP_CONFIG.SUPPORT_EMAIL || 'support@katrexapp.com';

    return (
        <LegalShell
            {...props}
            title="Privacy Policy"
            subtitle={`How ${brand} collects, uses, protects, and manages your personal, financial, and mobile communications information.`}
            icon={<Shield size={22} />}
            lastUpdated="November 26, 2026"
        >
            <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Introduction and Scope</h2>
                <p>
                    {brand} ("we," "us," or "our") is committed to protecting the privacy, confidentiality, and security of the personal and financial information entrusted to us by our customers, account holders, and visitors ("you" or "your"). This Privacy Policy explains how we collect, use, disclose, store, and safeguard your information when you access our website, digital banking portal, mobile interfaces, APIs, and related services (collectively, the "Services").
                </p>
                <p>
                    By creating an account, submitting your contact details, or using any part of the Services, you acknowledge that you have read, understood, and agreed to the practices described in this Privacy Policy. If you do not agree with any provision of this Privacy Policy, you must discontinue use of the Services immediately.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Information We Collect</h2>
                <p>We collect information that you provide directly to us, information generated automatically when you use our Services, and information obtained from identity verification and compliance partners:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Personal Identification Information:</strong> Full legal name, username, date of birth, gender, residential address, city, postal code, country of residence, email address, and mobile phone number.</li>
                    <li><strong>Account &amp; Security Credentials:</strong> Encrypted passwords, personal identification numbers (PINs), one-time passcodes (OTPs), and security verification logs.</li>
                    <li><strong>Financial &amp; Transaction Data:</strong> Account balances, account numbers, transfer recipient details, payment amounts, currency selections, transaction timestamps, reference IDs, scheduled payment instructions, and statement records.</li>
                    <li><strong>Identity Verification (KYC) Records:</strong> Government-issued identification details, verification tier status, and compliance audit records where required by applicable anti-money laundering (AML) and Know Your Customer (KYC) regulations.</li>
                    <li><strong>Technical &amp; Usage Information:</strong> IP address, browser type and version, operating system, device identifiers, session timestamps, referring URLs, and diagnostic error logs used to maintain platform stability and prevent unauthorized access.</li>
                </ul>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. How We Use Your Information</h2>
                <p>We process your personal information strictly for legitimate business, operational, security, and legal purposes, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Establishing, maintaining, and administering your digital banking accounts and profile.</li>
                    <li>Executing, clearing, and recording domestic and international transfers, deposits, and payment requests.</li>
                    <li>Sending real-time transactional notifications, deposit confirmations, security alerts, and verification codes via email and SMS.</li>
                    <li>Authenticating your identity, enforcing account limits, and detecting or preventing fraud, unauthorized transactions, and cyber threats.</li>
                    <li>Providing customer support, resolving disputes, and responding to inquiries submitted through our support channels.</li>
                    <li>Complying with applicable laws, regulatory obligations, subpoenas, and financial reporting requirements.</li>
                </ul>
            </section>

            <section className="space-y-3 p-5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <MessageSquare size={18} className="text-blue-600 dark:text-blue-400" />
                    4. SMS / Mobile Messaging Privacy &amp; Non-Sharing Commitment
                </h2>
                <p>
                    When you provide your mobile phone number and opt in to receive SMS notifications during registration or account verification, {brand} uses your phone number solely to deliver transactional account alerts, transfer notifications, deposit status updates, and security/authentication messages.
                </p>
                <p className="font-semibold text-slate-900 dark:text-white">
                    No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties, except with our telecommunications and SMS delivery service providers strictly as necessary to transmit your requested notifications.
                </p>
                <ul className="list-disc pl-6 space-y-1.5">
                    <li><strong>Message Frequency:</strong> Message frequency varies based on your account activity and initiated transactions.</li>
                    <li><strong>Rates &amp; Charges:</strong> Standard message and data rates may apply according to your mobile carrier plan.</li>
                    <li><strong>Opt-Out &amp; Help:</strong> You may opt out of SMS alerts at any time by replying <strong>STOP</strong> to any message you receive from us, or reply <strong>HELP</strong> for assistance.</li>
                </ul>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">5. Information Sharing and Disclosure</h2>
                <p>We do not sell, rent, or trade your personal information to third parties. We may share information only in the following strictly controlled circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Service Providers:</strong> Trusted infrastructure, cloud database, email delivery, and telecommunications providers bound by strict confidentiality and data-processing agreements, solely to perform services on our behalf.</li>
                    <li><strong>Legal Compliance &amp; Protection:</strong> When required by law, court order, regulatory authority, or when necessary to protect the rights, property, and safety of {brand}, our users, or the public.</li>
                    <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or asset transfer, subject to equivalent privacy safeguards.</li>
                </ul>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">6. Data Security, Encryption, and Retention</h2>
                <p>
                    We implement industry-standard administrative, technical, and physical safeguards designed to protect your information against unauthorized access, alteration, disclosure, or destruction. All communications between your browser and our servers are encrypted using Transport Layer Security (TLS/HTTPS), and sensitive authentication credentials are protected using cryptographic hashing and access controls.
                </p>
                <p>
                    We retain your personal and transaction records for as long as your account remains active and for any additional period required to comply with legal, regulatory, tax, accounting, and fraud-prevention obligations.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">7. Your Privacy Rights and Choices</h2>
                <p>Depending on your jurisdiction, you may have the right to:</p>
                <ul className="list-disc pl-6 space-y-1.5">
                    <li>Access and review the personal information we hold about your account.</li>
                    <li>Request correction of inaccurate or incomplete profile details.</li>
                    <li>Request deletion of your personal data, subject to mandatory financial record-keeping requirements.</li>
                    <li>Withdraw consent for optional communications, or reply <strong>STOP</strong> to opt out of SMS messages.</li>
                </ul>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">8. Cookies and Session Technologies</h2>
                <p>
                    We use essential cookies and browser storage mechanisms (such as `localStorage` and `sessionStorage`) to maintain authenticated sessions, remember theme and language preferences, verify security PIN states, and ensure reliable platform performance. You can configure your browser to manage cookies, though disabling essential storage may affect your ability to sign in or use the Services.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">9. International Data Transfers &amp; Children's Privacy</h2>
                <p>
                    Your information may be processed and stored on secure servers located outside your country of residence. Where cross-border transfers occur, we apply appropriate safeguards to protect your data in accordance with this Privacy Policy. Our Services are not directed to individuals under the age of 18, and we do not knowingly collect personal information from minors.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">10. Changes and Contact Information</h2>
                <p>
                    We may update this Privacy Policy periodically to reflect operational, legal, or regulatory changes. Updates will be posted on this page with a revised effective date. If you have any questions or privacy requests, please contact our Privacy &amp; Compliance team at <strong>{supportEmail}</strong>.
                </p>
            </section>
        </LegalShell>
    );
};

export const TermsOfServicePage: React.FC<LegalPageProps> = (props) => {
    const brand = props.siteName || APP_CONFIG.BANK_NAME || 'Veltrix Bank';
    const supportEmail = APP_CONFIG.SUPPORT_EMAIL || 'support@katrexapp.com';

    return (
        <LegalShell
            {...props}
            title="Terms & Conditions"
            subtitle={`Governing rules, account obligations, electronic communications, and SMS alert terms for ${brand}.`}
            icon={<FileText size={22} />}
            lastUpdated="November 26, 2026"
        >
            <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Acceptance of Terms and Eligibility</h2>
                <p>
                    These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and {brand} ("we," "us," or "our") governing your access to and use of our website, digital banking portal, transaction services, and communications. By registering an account, checking the acceptance or SMS opt-in box, or accessing the Services, you agree to be bound by these Terms and our Privacy Policy.
                </p>
                <p>
                    You represent and warrant that you are at least 18 years of age (or the age of legal majority in your jurisdiction), possess the legal capacity to enter into a binding agreement, and are not prohibited from using financial or digital services under applicable law.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Account Registration, Accuracy, and Security</h2>
                <p>
                    To access the Services, you must complete registration by providing accurate, current, and complete information, including your legal name, email address, and a valid mobile phone number. You agree to keep your contact details updated at all times.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Credential Confidentiality:</strong> You are solely responsible for safeguarding your password, 4-digit security PIN, and any one-time verification codes. You must never share your credentials with any third party.</li>
                    <li><strong>Unauthorized Access:</strong> You agree to notify us immediately at <strong>{supportEmail}</strong> if you suspect any unauthorized access to or use of your account.</li>
                    <li><strong>Identity Verification:</strong> We reserve the right to require additional identity verification (KYC) or contact confirmation before permitting access to certain features or transaction tiers.</li>
                </ul>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Digital Transfers, Processing Statuses, and Limits</h2>
                <p>
                    {brand} enables you to initiate transfers, monitor balances, and manage payment instructions subject to daily, weekly, and monthly limits associated with your account verification tier.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Transaction Review &amp; Holds:</strong> Transactions may be placed in a "Pending," "Processing," or "On Hold" status for compliance screening, recipient confirmation, or security review. We are not liable for delays resulting from verification checks or third-party processing windows.</li>
                    <li><strong>Fees &amp; Exchange Rates:</strong> Applicable transfer fees and currency conversions are calculated and disclosed prior to transaction confirmation.</li>
                    <li><strong>Accuracy of Instructions:</strong> You are responsible for verifying all recipient names, account identifiers, and amounts before submitting a transfer.</li>
                </ul>
            </section>

            <section className="space-y-3 p-5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Lock size={18} className="text-blue-600 dark:text-blue-400" />
                    4. SMS Alerts &amp; Electronic Communications Terms (TCPA / E-SIGN)
                </h2>
                <p>
                    By providing your mobile phone number and opting in during account registration or verification, you expressly consent to receive automated transactional SMS text messages from {brand} regarding your account activity, including transfer notifications, deposit alerts, status changes, and security verification notices.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Program Description:</strong> Messages are strictly transactional and informational, triggered by account events or transfers you initiate or receive.</li>
                    <li><strong>Message Frequency:</strong> Message frequency varies depending on your account usage and transaction volume.</li>
                    <li><strong>Cost:</strong> {brand} does not charge a separate fee for SMS alerts, however, standard message and data rates from your mobile carrier may apply.</li>
                    <li><strong>Opt-Out Instructions:</strong> You can cancel SMS alerts at any time by replying <strong>STOP</strong> to any message from us. After sending <strong>STOP</strong>, you will receive a confirmation message and no further SMS messages will be sent unless you re-enroll.</li>
                    <li><strong>Support Instructions:</strong> For help with SMS alerts, reply <strong>HELP</strong> to any message or contact us at <strong>{supportEmail}</strong>.</li>
                    <li><strong>Carrier Disclaimer:</strong> Mobile carriers are not liable for delayed or undelivered messages.</li>
                </ul>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">5. Prohibited Activities</h2>
                <p>You agree not to use the Services for any unlawful, fraudulent, or unauthorized purpose, including but not limited to:</p>
                <ul className="list-disc pl-6 space-y-1.5">
                    <li>Money laundering, terrorist financing, fraud, or evasion of financial sanctions.</li>
                    <li>Providing false, misleading, or stolen identity or contact information.</li>
                    <li>Attempting to bypass security controls, rate limits, authentication checks, or system integrity measures.</li>
                    <li>Using automated bots, scrapers, or unauthorized scripts to access the platform.</li>
                </ul>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">6. Intellectual Property Rights</h2>
                <p>
                    All software, user interfaces, trademarks, logos, text, graphics, and source code comprising the Services are the exclusive property of {brand} or its licensors and are protected by applicable intellectual property laws. You are granted a limited, non-exclusive, non-transferable, revocable license to use the Services solely for your personal or authorized business banking activities.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">7. Disclaimers and Limitation of Liability</h2>
                <p>
                    THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.
                </p>
                <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, {brand.toUpperCase()} AND ITS AFFILIATES, OFFICERS, AND SERVICE PROVIDERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR FUNDS ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">8. Indemnification, Suspension, and Termination</h2>
                <p>
                    You agree to indemnify and hold harmless {brand} from any claims, damages, liabilities, and expenses arising out of your violation of these Terms or misuse of the Services. We reserve the right to suspend, restrict, or terminate your account at our sole discretion if we detect suspicious activity, policy violations, or legal compliance risks.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">9. Governing Law, Amendments, and Contact</h2>
                <p>
                    These Terms shall be governed by and construed in accordance with applicable laws without regard to conflict-of-law principles. We may revise these Terms from time to time, and continued use of the Services constitutes acceptance of the updated Terms. For legal notices or questions, contact <strong>{supportEmail}</strong>.
                </p>
            </section>
        </LegalShell>
    );
};
