export interface CountryDialCode {
    name: string;
    code: string;
    flag: string;
    iso: string;
}

export const COUNTRY_DIAL_CODES: CountryDialCode[] = [
    // Top Priority & Most Common
    { name: 'United States', code: '+1', flag: '🇺🇸', iso: 'US' },
    { name: 'Nigeria', code: '+234', flag: '🇳🇬', iso: 'NG' },
    { name: 'United Kingdom', code: '+44', flag: '🇬🇧', iso: 'GB' },
    { name: 'Canada', code: '+1', flag: '🇨🇦', iso: 'CA' },
    { name: 'Australia', code: '+61', flag: '🇦🇺', iso: 'AU' },
    { name: 'South Africa', code: '+27', flag: '🇿🇦', iso: 'ZA' },
    { name: 'Ghana', code: '+233', flag: '🇬🇭', iso: 'GH' },
    { name: 'Kenya', code: '+254', flag: '🇰🇪', iso: 'KE' },
    { name: 'India', code: '+91', flag: '🇮🇳', iso: 'IN' },
    { name: 'Germany', code: '+49', flag: '🇩🇪', iso: 'DE' },
    { name: 'France', code: '+33', flag: '🇫🇷', iso: 'FR' },
    { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪', iso: 'AE' },
    { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦', iso: 'SA' },
    { name: 'Philippines', code: '+63', flag: '🇵🇭', iso: 'PH' },
    { name: 'Brazil', code: '+55', flag: '🇧🇷', iso: 'BR' },
    { name: 'Mexico', code: '+52', flag: '🇲🇽', iso: 'MX' },
    { name: 'Spain', code: '+34', flag: '🇪🇸', iso: 'ES' },
    { name: 'Italy', code: '+39', flag: '🇮🇹', iso: 'IT' },
    { name: 'Netherlands', code: '+31', flag: '🇳🇱', iso: 'NL' },
    { name: 'Switzerland', code: '+41', flag: '🇨🇭', iso: 'CH' },
    { name: 'Ireland', code: '+353', flag: '🇮🇪', iso: 'IE' },
    { name: 'China', code: '+86', flag: '🇨🇳', iso: 'CN' },
    { name: 'Japan', code: '+81', flag: '🇯🇵', iso: 'JP' },
    { name: 'Singapore', code: '+65', flag: '🇸🇬', iso: 'SG' },
    { name: 'Malaysia', code: '+60', flag: '🇲🇾', iso: 'MY' },
    { name: 'Indonesia', code: '+62', flag: '🇮🇩', iso: 'ID' },
    { name: 'Thailand', code: '+66', flag: '🇹🇭', iso: 'TH' },
    { name: 'Sweden', code: '+46', flag: '🇸🇪', iso: 'SE' },
    { name: 'Norway', code: '+47', flag: '🇳🇴', iso: 'NO' },
    { name: 'Denmark', code: '+45', flag: '🇩🇰', iso: 'DK' },
    { name: 'Poland', code: '+48', flag: '🇵🇱', iso: 'PL' },
    { name: 'Portugal', code: '+351', flag: '🇵🇹', iso: 'PT' },
    { name: 'Belgium', code: '+32', flag: '🇧🇪', iso: 'BE' },
    { name: 'Austria', code: '+43', flag: '🇦🇹', iso: 'AT' },
    { name: 'Turkey', code: '+90', flag: '🇹🇷', iso: 'TR' },
    { name: 'Egypt', code: '+20', flag: '🇪🇬', iso: 'EG' },
    { name: 'Cameroon', code: '+237', flag: '🇨🇲', iso: 'CM' },
    { name: 'Ivory Coast', code: '+225', flag: '🇨🇮', iso: 'CI' },
    { name: 'Uganda', code: '+256', flag: '🇺🇬', iso: 'UG' },
    { name: 'Tanzania', code: '+255', flag: '🇹🇿', iso: 'TZ' },
    { name: 'Rwanda', code: '+250', flag: '🇷🇼', iso: 'RW' },
    { name: 'Jamaica', code: '+1876', flag: '🇯🇲', iso: 'JM' },
    { name: 'Trinidad & Tobago', code: '+1868', flag: '🇹🇹', iso: 'TT' },
    { name: 'Pakistan', code: '+92', flag: '🇵🇰', iso: 'PK' },
    { name: 'Bangladesh', code: '+880', flag: '🇧🇩', iso: 'BD' },
    { name: 'New Zealand', code: '+64', flag: '🇳🇿', iso: 'NZ' },
    { name: 'Qatar', code: '+974', flag: '🇶🇦', iso: 'QA' },
    { name: 'Kuwait', code: '+965', flag: '🇰🇼', iso: 'KW' },
    { name: 'Colombia', code: '+57', flag: '🇨🇴', iso: 'CO' },
    { name: 'Argentina', code: '+54', flag: '🇦🇷', iso: 'AR' },
    { name: 'Chile', code: '+56', flag: '🇨🇱', iso: 'CL' },
    { name: 'Peru', code: '+51', flag: '🇵🇪', iso: 'PE' }
];

/**
 * Splits an existing stored phone string into [countryCode, localNumber]
 */
export function parseStoredPhone(phoneStr?: string): { countryCode: string; iso: string; localNumber: string } {
    if (!phoneStr || !phoneStr.trim()) {
        return { countryCode: '+1', iso: 'US', localNumber: '' };
    }
    const clean = phoneStr.trim().replace(/[\s\-\(\)]/g, '');
    const sorted = [...COUNTRY_DIAL_CODES].sort((a, b) => b.code.length - a.code.length);
    for (const c of sorted) {
        if (clean.startsWith(c.code)) {
            return { countryCode: c.code, iso: c.iso, localNumber: clean.slice(c.code.length) };
        }
    }
    if (clean.startsWith('+')) {
        return { countryCode: '+1', iso: 'US', localNumber: clean.slice(1) };
    }
    return { countryCode: '+1', iso: 'US', localNumber: clean };
}

/**
 * Combines selected country dial code and local number into standardized E.164 string
 */
export function formatFullPhone(countryCode: string, localNumber: string): string {
    const cleanLocal = localNumber.trim().replace(/[\s\-\(\)]/g, '').replace(/^0+/, '');
    const cleanCode = countryCode.trim().startsWith('+') ? countryCode.trim() : `+${countryCode.trim()}`;
    return `${cleanCode}${cleanLocal}`;
}
