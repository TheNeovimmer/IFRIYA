/**
 * IFRIYA - Internationalization (i18n) System
 * Supports English (en) and French (fr)
 * 
 * Usage:
 * - switchLanguage() - Toggle between EN and FR
 * - setLanguage('en'|'fr') - Set specific language
 * - i18n.getCurrentLang() - Get current language code
 * - i18n.t('key.path') - Get translation for a key
 */

class I18n {
    constructor() {
        this.currentLang = 'en';
        this.translations = {};
        this.supportedLangs = ['en', 'fr'];
        this.initialized = false;
    }

    async init() {
        if (this.initialized) return;
        
        const savedLang = localStorage.getItem('ifriya_lang') || 'en';
        await this.setLanguage(savedLang);
        this.setupLanguageSwitcher();
        this.initialized = true;
    }

    async loadTranslations(lang) {
        if (this.translations[lang]) {
            return this.translations[lang];
        }
        try {
            const response = await fetch(`assets/i18n/${lang}.json`);
            if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
            this.translations[lang] = await response.json();
            return this.translations[lang];
        } catch (error) {
            console.error(`Failed to load ${lang} translations:`, error);
            return null;
        }
    }

    async setLanguage(lang) {
        if (!this.supportedLangs.includes(lang)) {
            lang = 'en';
        }
        
        const translations = await this.loadTranslations(lang);
        if (translations) {
            this.currentLang = lang;
            localStorage.setItem('ifriya_lang', lang);
            document.documentElement.lang = lang;
            this.translatePage();
            this.updateLanguageButton();
            this.updateMeta();
            this.updateHtmlLang();
        }
    }

    t(key) {
        if (!this.translations[this.currentLang]) {
            return key;
        }
        
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key;
            }
        }
        return value || key;
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation !== key) {
                el.textContent = translation;
            }
        });

        const attrElements = document.querySelectorAll('[data-i18n-attr]');
        attrElements.forEach(el => {
            const attrData = el.getAttribute('data-i18n-attr').split(':');
            const key = attrData[0];
            const attr = attrData[1] || 'textContent';
            const translation = this.t(key);
            if (translation !== key) {
                if (attr === 'textContent') {
                    el.textContent = translation;
                } else {
                    el.setAttribute(attr, translation);
                }
            }
        });

        this.translateDestinations();
        this.translateTours();
        this.translateServices();
        this.translateReviews();
        this.translateTeam();
    }

    translateDestinations() {
        const destinationCards = document.querySelectorAll('.destination-card h3 a');
        if (destinationCards.length === 0) return;
        
        const destinations = this.t('destinations.regions');
        if (typeof destinations === 'object') {
            const regions = Object.values(destinations);
            destinationCards.forEach((card, index) => {
                if (regions[index]) {
                    card.textContent = regions[index];
                }
            });
        }
    }

    translateTours() {
        const tourCards = document.querySelectorAll('.tours-card h3 a');
        if (tourCards.length === 0) return;
        
        const tourNames = this.t('tourNames');
        if (typeof tourNames === 'object') {
            const names = Object.values(tourNames);
            tourCards.forEach((card, index) => {
                const name = names[index % names.length];
                if (name) {
                    card.textContent = name;
                }
            });
        }
    }

    translateServices() {
        const serviceTitles = document.querySelectorAll('.services-card-body h3 a');
        if (serviceTitles.length === 0) return;
        
        const serviceKeys = [
            'services.adventureGuide',
            'services.groupTravel',
            'services.culturalTour',
            'services.securePayment',
            'services.travelInsurance',
            'services.assistance'
        ];
        
        serviceTitles.forEach((title, index) => {
            if (serviceKeys[index]) {
                const translation = this.t(serviceKeys[index]);
                if (translation !== serviceKeys[index]) {
                    title.textContent = translation;
                }
            }
        });
    }

    translateReviews() {
        const reviewElements = document.querySelectorAll('[data-i18n="reviews.count"]');
        reviewElements.forEach(el => {
            const translation = this.t('reviews.count');
            if (translation !== 'reviews.count') {
                el.textContent = translation;
            }
        });
    }

    translateTeam() {
        const teamMembers = document.querySelectorAll('[data-i18n="team.member1"], [data-i18n="team.member2"], [data-i18n="team.member3"]');
        teamMembers.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation !== key) {
                el.textContent = translation;
            }
        });
        
        const teamTitles = document.querySelectorAll('[data-i18n="team.title1"], [data-i18n="team.title2"], [data-i18n="team.title3"]');
        teamTitles.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation !== key) {
                el.textContent = translation;
            }
        });
    }

    updateLanguageButton() {
        const btns = document.querySelectorAll('.lang-switcher');
        btns.forEach(btn => {
            const nextLang = this.currentLang === 'en' ? 'FR' : 'EN';
            btn.textContent = nextLang;
            btn.setAttribute('aria-label', `Switch to ${nextLang === 'FR' ? 'French' : 'English'}`);
        });
    }

    updateMeta() {
        const metaTitle = this.t('meta.siteTitle');
        if (metaTitle && metaTitle !== 'meta.siteTitle') {
            document.title = metaTitle;
        }
    }

    updateHtmlLang() {
        document.documentElement.setAttribute('lang', this.currentLang);
    }

    setupLanguageSwitcher() {
        const switchers = document.querySelectorAll('.lang-switcher');
        switchers.forEach(switcher => {
            switcher.addEventListener('click', (e) => {
                e.preventDefault();
                const newLang = this.currentLang === 'en' ? 'fr' : 'en';
                this.setLanguage(newLang);
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'l' && (e.ctrlKey || e.metaKey) && e.shiftKey) {
                e.preventDefault();
                const newLang = this.currentLang === 'en' ? 'fr' : 'en';
                this.setLanguage(newLang);
            }
        });
    }

    getCurrentLang() {
        return this.currentLang;
    }

    getTranslation(key) {
        return this.t(key);
    }

    formatCurrency(amount) {
        if (this.currentLang === 'fr') {
            return `${amount} DT`;
        }
        return `DT ${amount}`;
    }

    formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(this.currentLang === 'fr' ? 'fr-TN' : 'en-US', options);
    }

    formatNumber(num) {
        return new Intl.NumberFormat(this.currentLang === 'fr' ? 'fr-TN' : 'en-US').format(num);
    }
}

const i18n = new I18n();

document.addEventListener('DOMContentLoaded', () => {
    i18n.init();
});

function switchLanguage() {
    if (typeof i18n !== 'undefined') {
        const newLang = i18n.getCurrentLang() === 'en' ? 'fr' : 'en';
        i18n.setLanguage(newLang);
    }
}

function setLanguage(lang) {
    if (typeof i18n !== 'undefined') {
        i18n.setLanguage(lang);
    }
}

function getCurrentLang() {
    if (typeof i18n !== 'undefined') {
        return i18n.getCurrentLang();
    }
    return 'en';
}