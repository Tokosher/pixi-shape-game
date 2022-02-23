import { BaseVisualElement } from './base-visual-element';
import { PentagonConfig } from '../models/elements-config/pentagon-config';

export class Pentagon extends BaseVisualElement<PentagonConfig> {
    protected radius: PentagonConfig['radius'];
    
    constructor (bounds: PentagonConfig) {
        super(bounds);
        
        this.radius = bounds.radius;
        this.createPentagonShape();
    }
    
    private createPentagonShape () {
        const step = (Math.PI * 2) / 5;
        let n, dx, dy;
    
        this.moveTo(
            this.positionX + (Math.cos(0) * this.radius),
            this.positionY - (Math.sin(0) * this.radius)
        )
    
        for (n = 1; n <= 5; ++n) {
            dx = this.positionX + Math.cos(step * n) * this.radius;
            dy = this.positionY - Math.sin(step * n) * this.radius;
            this.lineTo(dx, dy);
        }
    }
}
