import { BaseVisualElement } from './base-visual-element';
import { HexagonConfig } from '../models/elements-config/hexagon-config';

export class Hexagon extends BaseVisualElement<HexagonConfig> {
    protected radius: HexagonConfig['radius'];
    
    constructor (bounds: HexagonConfig) {
        super(bounds);
    
        this.radius = bounds.radius;
        this.onPositions();
        this.createHexagonShape();
    }
    
    private createHexagonShape () {
        const pentagonHeight = this.radius * Math.sqrt(3);
        this.drawPolygon([
            -this.radius, 0,
            -this.radius / 2, pentagonHeight / 2,
            this.radius / 2, pentagonHeight / 2,
            this.radius, 0,
            this.radius / 2, -pentagonHeight / 2,
            -this.radius / 2, -pentagonHeight / 2,
        ]);
    }
}