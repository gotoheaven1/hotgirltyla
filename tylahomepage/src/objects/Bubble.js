export default class Bubble extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        // 화면 하단 랜덤 위치 생성
        const x = Phaser.Math.Between(0, scene.scale.width);
        const y = scene.scale.height + 50;
        
        // 'bubble' 텍스처 사용 (PreloadScene에서 로드 필요)
        super(scene, x, y, 'bubble');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // 크기 랜덤 설정
        const scale = Phaser.Math.FloatBetween(0.1, 0.5);
        this.setScale(scale);
        this.setAlpha(0.6); // 반투명

        // 속도 설정 (위로 올라감)
        this.setVelocityY(Phaser.Math.Between(-50, -150));
        this.setVelocityX(Phaser.Math.Between(-20, 20)); // 약간의 좌우 흔들림
    }

    update() {
        // 화면 위로 벗어나면 제거
        if (this.y < -50) {
            this.destroy();
        }
    }
}
