export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        // 로딩 텍스트
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.add.text(width / 2, height / 2, 'Loading Tyla World...', {
            font: '20px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // 1. 배경음악 (실제 파일 경로로 변경 필요. 여기선 예시 URL 사용)
        // 저작권 문제로 무료 오디오 샘플을 사용하거나 로컬 파일을 연결하세요.
        // this.load.audio('bgm', 'assets/audio/water_bgm.mp3'); 

        // 2. 이미지 자산
        // 'water' 컨셉의 물방울 이미지를 프로그래매틱하게 생성 (이미지 파일이 없을 경우를 대비)
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xffffff);
        graphics.fillCircle(16, 16, 16); // 32x32 원
        graphics.generateTexture('bubble', 32, 32);
    }

    create() {
        this.scene.start('MainScene');
    }
}
