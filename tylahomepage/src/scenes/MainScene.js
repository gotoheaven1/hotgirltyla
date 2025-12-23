import Bubble from '../objects/Bubble.js';
import { SONGS, AWARDS, YOUTUBE_IDS, SOCIAL_LINKS } from '../data/tylaData.js';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
        this.bubbles = null;
    }

    create() {
        // 1. 배경 그라데이션 설정 (깊은 바다 느낌)
        this.createBackground();

        // 2. 배경음악 재생 (PreloadScene에서 로드했다면 주석 해제)
        /*
        if (this.sound.get('bgm')) {
            this.sound.play('bgm', { loop: true, volume: 0.5 });
        }
        */

        // 3. 물방울 그룹 생성
        this.bubbles = this.add.group({
            runChildUpdate: true // 자식의 update() 자동 호출
        });

        // 4. 물방울 생성 타이머 (0.3초마다 생성)
        this.time.addEvent({
            delay: 300,
            callback: this.spawnBubble,
            callbackScope: this,
            loop: true
        });

        // 5. HTML UI 구성 (DOM Element 활용)
        this.createHTMLContent();
    }

    update() {
        // 배경이 살짝 움직이는 효과 등을 넣을 수 있음
    }

    spawnBubble() {
        const bubble = new Bubble(this);
        this.bubbles.add(bubble);
    }

    createBackground() {
        // 캔버스 크기에 맞게 그라데이션 사각형 그리기
        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0x000033, 0x000033, 0x003366, 0x006699, 1);
        graphics.fillRect(0, 0, this.scale.width, this.scale.height);
    }

    createHTMLContent() {
        // 랜덤 추천곡 선택
        const randomSong = SONGS[Phaser.Math.Between(0, SONGS.length - 1)];
        
        // 수상 내역 HTML 생성
        const awardsHtml = AWARDS.map(award => `<div class="award-item">🏆 ${award}</div>`).join('');
        
        // 소셜 링크 HTML 생성
        const linksHtml = SOCIAL_LINKS.map(link => 
            `<a href="${link.url}" target="_blank" class="link-btn">${link.name}</a>`
        ).join('');

        // 유튜브 랜덤 영상 (1개만 노출)
        const randomVideoId = YOUTUBE_IDS[Phaser.Math.Between(0, YOUTUBE_IDS.length - 1)];

        // 전체 HTML 구조 조립
        const htmlContent = `
            <div class="content-box">
                <h2>TYLA</h2>
                
                <h3>Today's Vibe (Random Pick)</h3>
                <p>🎵 <strong>${randomSong.title}</strong> - ${randomSong.album}</p>

                <h3>Featured Video</h3>
                <iframe width="100%" height="200" src="https://www.youtube.com/embed/${randomVideoId}" 
                    title="YouTube video player" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>

                <h3>Awards & History</h3>
                ${awardsHtml}

                <h3>Connect</h3>
                ${linksHtml}
            </div>
        `;

        // Phaser DOM 객체로 추가 (화면 중앙 배치)
        const domElement = this.add.dom(this.scale.width / 2, this.scale.height / 2).createFromHTML(htmlContent);
        
        // 반응형 처리: 화면 크기가 바뀌면 위치 재조정 필요 (간단히 중앙 정렬 유지)
        this.scale.on('resize', (gameSize) => {
            domElement.setPosition(gameSize.width / 2, gameSize.height / 2);
            // 배경도 다시 그림
            this.children.list[0].clear(); // 기존 그래픽 제거
            this.createBackground();
        });
    }
}
