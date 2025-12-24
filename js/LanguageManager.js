export default class LanguageManager {
    constructor() {
        this.currentLanguage = 'ko';
        this.translations = {
            ko: {
                nav_home: 'Home',
                nav_awards: 'Awards',
                nav_videos: 'Videos',
                nav_connect: 'Connect',
                hero_label: 'South African Sensation',
                hero_title_1: 'Welcome to the',
                hero_description: 'Experience the journey of a global superstar breaking barriers and setting new standards in music',
                stat_awards: 'Major Awards',
                stat_streams: 'Streams',
                stat_impact: 'Impact',
                awards_title: 'Awards & Achievements',
                awards_subtitle: 'Recognition of excellence and talent',
                videos_title: 'Featured Videos',
                videos_subtitle: 'Watch memorable performances and music videos',
                video_shuffle: 'Load Random Video',
                video_info_title: 'About This Video',
                video_info_text: 'Each visit presents a randomly selected video from Tyla\'s incredible collection of performances and music videos. Click the shuffle button to discover more amazing content.',
                video_stat_collection: 'Videos in Collection',
                connect_title: 'Connect with Tyla',
                connect_subtitle: 'Follow the journey across platforms',
                footer_tagline: 'Water Era',
                footer_disclaimer: 'This is an unofficial fan page created to celebrate Tyla\'s achievements.'
            },
            en: {
                nav_home: 'Home',
                nav_awards: 'Awards',
                nav_videos: 'Videos',
                nav_connect: 'Connect',
                hero_label: 'South African Sensation',
                hero_title_1: 'Welcome to the',
                hero_description: 'Experience the journey of a global superstar breaking barriers and setting new standards in music',
                stat_awards: 'Major Awards',
                stat_streams: 'Streams',
                stat_impact: 'Impact',
                awards_title: 'Awards & Achievements',
                awards_subtitle: 'Recognition of excellence and talent',
                videos_title: 'Featured Videos',
                videos_subtitle: 'Watch memorable performances and music videos',
                video_shuffle: 'Load Random Video',
                video_info_title: 'About This Video',
                video_info_text: 'Each visit presents a randomly selected video from Tyla\'s incredible collection of performances and music videos. Click the shuffle button to discover more amazing content.',
                video_stat_collection: 'Videos in Collection',
                connect_title: 'Connect with Tyla',
                connect_subtitle: 'Follow the journey across platforms',
                footer_tagline: 'Water Era',
                footer_disclaimer: 'This is an unofficial fan page created to celebrate Tyla\'s achievements.'
            }
        };
        
        this.init();
    }

    init() {
        const savedLanguage = localStorage.getItem('preferredLanguage');
        if (savedLanguage && this.translations[savedLanguage]) {
            this.currentLanguage = savedLanguage;
        }

        this.bindLanguageButtons();
        this.updateLanguage(this.currentLanguage);
    }

    bindLanguageButtons() {
        const languageButtons = document.querySelectorAll('.lang-btn');
        languageButtons.forEach(button => {
            button.addEventListener('click', () => {
                const lang = button.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
    }

    switchLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('preferredLanguage', lang);
            this.updateLanguage(lang);
            this.updateActiveButton(lang);
        }
    }

    updateLanguage(lang) {
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(element => {
            const key = element.getAttribute('data-key');
            if (this.translations[lang] && this.translations[lang][key]) {
                element.textContent = this.translations[lang][key];
            }
        });
    }

    updateActiveButton(lang) {
        const buttons = document.querySelectorAll('.lang-btn');
        buttons.forEach(button => {
            if (button.getAttribute('data-lang') === lang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
}
