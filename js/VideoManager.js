export default class VideoManager {
    constructor() {
        this.videos = [
            'mGyN2NMuS4A',
            'xiZUf98A1Ts',
            'uLK2r3sG4lE',
            'n3s6lDf8Nq0',
            'XoiOOiuH8iI'
        ];
        
        this.player = null;
        this.currentVideoIndex = -1;
        this.isAPIReady = false;
        
        this.init();
    }

    init() {
        if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
            window.onYouTubeIframeAPIReady = () => {
                this.isAPIReady = true;
                this.loadRandomVideo();
            };
        } else {
            this.isAPIReady = true;
            this.loadRandomVideo();
        }

        const changeVideoBtn = document.getElementById('changeVideoBtn');
        if (changeVideoBtn) {
            changeVideoBtn.addEventListener('click', () => {
                this.loadRandomVideo();
                this.animateButton(changeVideoBtn);
            });
        }
    }

    getRandomVideoId() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.videos.length);
        } while (newIndex === this.currentVideoIndex && this.videos.length > 1);
        
        this.currentVideoIndex = newIndex;
        return this.videos[newIndex];
    }

    loadRandomVideo() {
        if (!this.isAPIReady) {
            console.log('YouTube API is not ready yet');
            return;
        }

        const videoId = this.getRandomVideoId();

        if (this.player && typeof this.player.loadVideoById === 'function') {
            this.player.loadVideoById(videoId);
        } else {
            this.player = new YT.Player('videoPlayer', {
                height: '100%',
                width: '100%',
                videoId: videoId,
                playerVars: {
                    autoplay: 0,
                    controls: 1,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0
                },
                events: {
                    onReady: (event) => this.onPlayerReady(event),
                    onError: (event) => this.onPlayerError(event)
                }
            });
        }
    }

    onPlayerReady(event) {
        console.log('YouTube player is ready');
    }

    onPlayerError(event) {
        console.error('YouTube player error:', event.data);
    }

    animateButton(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
}
