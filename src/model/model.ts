import * as PIXI from 'pixi.js';
import { Bounds, ShapeTypes } from '../controller/controller.model';

export class Model {
    readonly areaWidth: Bounds['areaWidth'];
    readonly areaHeight: Bounds['areaHeight'];
    readonly minShapeWidth: Bounds['minShapeWidth'];
    readonly minShapeHeight: Bounds['minShapeHeight'];
    readonly maxShapeWidth: Bounds['maxShapeWidth'];
    readonly maxShapeHeight: Bounds['maxShapeHeight'];
    readonly minRadius: Bounds['minRadius'];
    readonly maxRadius: Bounds['maxRadius'];
    readonly maxSides: Bounds['maxSides'];
    readonly maxGravity: Bounds['maxGravity'];
    readonly maxShapePerSec: Bounds['maxShapePerSec'];
    readonly bgColor: Bounds['bgColor'];
    shapesTimeout: number = 1000;
    timeout: number = this.shapesTimeout;
    animationSpeed: number;
    shapesInGame: { [key in ShapeTypes]: PIXI.Graphics[] } = {
        triangle: [],
        rect: [],
        pentagon: [],
        hexagon: [],
        circle: [],
        ellipse: [],
        customShape: []
    }
    
    constructor (bounds: Bounds = {}) {
        const {
            areaWidth,
            areaHeight,
            minShapeWidth,
            minShapeHeight,
            maxShapeWidth,
            maxShapeHeight,
            minRadius,
            maxRadius,
            maxGravity,
            maxShapePerSec,
            animationSpeed,
            bgColor,
        } = bounds;
        
        this.areaWidth = areaWidth || 800;
        this.areaHeight = areaHeight || 600;
        this.minShapeWidth = minShapeWidth || 50;
        this.minShapeHeight = minShapeHeight || 50;
        this.maxShapeWidth = maxShapeWidth || 100;
        this.maxShapeHeight = maxShapeHeight || 100;
        this.minRadius = minRadius || 5;
        this.maxRadius = maxRadius || 20;
        this.maxSides = maxRadius || 10;
        this.maxGravity = maxGravity || 15;
        this.maxShapePerSec = maxShapePerSec || 90;
        this.animationSpeed = animationSpeed || 2500;
        this.bgColor = bgColor || 0xAAAAAA;
    }
}