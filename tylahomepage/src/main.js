import config from './config.js';

// 게임 인스턴스 생성
const game = new Phaser.Game(config);

// 윈도우 전역 객체에 할당 (디버깅 용도)
window.game = game;
