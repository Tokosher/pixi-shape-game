import { CustomShapeConfig } from '../models/elements-config/custom-shape-config';
import { BaseVisualElement } from './base-visual-element';

export class CustomShape extends BaseVisualElement<CustomShapeConfig> {
    protected radius: CustomShapeConfig['radius'];
    protected sides: CustomShapeConfig['sides'];
    
    constructor (bounds: CustomShapeConfig) {
        super(bounds);
    
        this.radius = bounds.radius;
        this.sides = bounds.sides;
        this.createCustomShape();
    }
    
    private createCustomShape () {
        const step = (Math.PI * 2) / this.sides;
        let n, dx, dy;
        this.moveTo(
            this.positionX + (Math.cos(0) * this.radius),
            this.positionY - (Math.sin(0) * this.radius)
        );
        for (n = 1; n <= this.sides; ++n) {
            dx = this.positionX + Math.cos(step * n) * this.radius;
            dy = this.positionY - Math.sin(step * n) * this.radius;
            this.lineTo(dx, dy);
        }
    }
}