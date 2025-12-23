import PreloadScene from './scenes/PreloadScene.js';
import MainScene from './scenes/MainScene.js';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    backgroundColor: '#0a192f', // 깊은 바다색
    dom: {
        createContainer: true // HTML 엘리먼트 사용 허용
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: -20 }, // 물속이라 중력이 반대(부력)처럼 작용
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [PreloadScene, MainScene]
};

export default config;
