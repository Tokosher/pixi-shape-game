import { ColorMatrix, colours } from '../color-matrix/color-matrix';
import * as PIXI from 'pixi.js';
import { Ease } from 'pixi-ease';
import { Model } from '../model/model';
import { View } from '../view/view';
import { Triangle } from '../visual-shapes-elements/triangle';
import { Rectangle } from '../visual-shapes-elements/rectangle';
import { Pentagon } from '../visual-shapes-elements/pentagon';
import { Hexagon } from '../visual-shapes-elements/hexagon';
import { Circle } from '../visual-shapes-elements/circle';
import { Ellipse } from '../visual-shapes-elements/ellipse';
import { CustomShape } from '../visual-shapes-elements/custom-shape';
import { CalculatingBounds, ShapeTypes } from './controller.model';

const shapesInGame: ShapeTypes[] = ['triangle', 'rect', 'pentagon', 'hexagon', 'circle', 'ellipse', 'customShape'];

const START_POINT_Y = -100;

export class Controller {
    // contains square area values at the same sequence as shapesInGame obj
    private shapesAreas: { [key in ShapeTypes]: number[] } = {
        triangle: [],
        rect: [],
        pentagon: [],
        hexagon: [],
        circle: [],
        ellipse: [],
        customShape: []
    }
    private ease: Ease = new Ease({ease: 'easeInCubic'})
    private readonly model: Model;
    private readonly view: View;
    private time: number = Date.now();
    
    constructor (model, view) {
        this.model = model;
        this.view = view;
    }
    
    createGameArea (): void {
        this.view.app = new PIXI.Application({
            width: this.model.areaWidth,
            height: this.model.areaHeight,
            backgroundColor: ColorMatrix.resolveColor(this.model.bgColor)
        });
        
        const interactiveContainer = new PIXI.Sprite();
        interactiveContainer.width = this.model.areaWidth;
        interactiveContainer.height = this.model.areaHeight;
        interactiveContainer.interactive = true;
        
        // @ts-ignore
        interactiveContainer.on('pointerdown', (e) => {
            this.createRandomShape(e.data.global.x, e.data.global.y);
        })
        
        this.view.addChild(interactiveContainer);
        this.view.appendChildToBody('.gameArea', this.view.app.view)
    }
    
    drawRandomShapes (): void {
        requestAnimationFrame(this.createRandomShapeHandler.bind(this)) // cause request animation frame give callback params
    }
    
    private createRandomShapeHandler () {
        requestAnimationFrame(this.createRandomShapeHandler.bind(this));
        
        if (Date.now() < this.time) return
        this.createRandomShape();
    }
    
    changeColourSameShapes (shape: PIXI.Graphics, type: ShapeTypes): void {
        // get random colour, if we get the same colour, try to get one time more, repeat
        this.model.shapesInGame[type].forEach(shape => {
            let colour: number;
            do {
                colour = this.getRandomColour();
            } while (colour === shape.tint)
            shape.tint = colour;
        })
    }
    
    enableButtons (): void {
        this.view.decrementButtonShapes.addEventListener('pointerdown', () => {
            // change text field
            let currentCount = this.view.getFieldValue('shapesPerSec');
            const newCount = --currentCount;
            if (!currentCount) return;
            this.view.updateTextField('shapesPerSec', newCount.toString());
            
            // change the count of creating shapes
            this.model.timeout = this.model.shapesTimeout / newCount;
        })
        
        this.view.incrementButtonShapes.addEventListener('pointerdown', () => {
            // change text field
            let currentCount = this.view.getFieldValue('shapesPerSec');
            const newCount = ++currentCount;
            if (newCount > this.model.maxShapePerSec) return;
            this.view.updateTextField('shapesPerSec', newCount.toString());
            
            // change the count of creating shapes
            this.model.timeout = this.model.shapesTimeout / newCount;
        })
        
        // enable interactivity of gravity value
        const decrementGravity = document.querySelector('#decrementGravity');
        const incrementGravity = document.querySelector('#incrementGravity');
        
        decrementGravity.addEventListener('pointerdown', () => {
            let currentCount = this.view.getFieldValue('gravity');
            const newCount = --currentCount;
            if (!newCount) return;
            this.view.updateTextField('gravity', newCount.toString());
            
            this.model.animationSpeed *= 1.15;
        });
        
        incrementGravity.addEventListener('pointerdown', () => {
            let currentCount = this.view.getFieldValue('gravity');
            const newCount = ++currentCount;
            if (newCount > this.model.maxGravity) return;
            this.view.updateTextField('gravity', newCount.toString());
            
            this.model.animationSpeed *= 0.85;
        });
        
    }
    
    private addInteractiveEvents (shape, type) {
        shape.interactive = true;
        shape.on('pointerdown', this.onClickShape.bind(this, shape, type))
    }
    
    private onClickShape (shape, type) {
        this.view.removeChild(shape);
        
        // subtract area
        this.subtractShapeSquareArea(shape, type);
        
        // delete from shapes object
        this.model.shapesInGame[type].splice(this.model.shapesInGame[type].indexOf(shape), 1);
        
        // changeColour of all shapes same type
        this.changeColourSameShapes(shape, type);
        
        this.view.updateShapeCounter();
    }
    
    private createRandomShape (
        x: number = this.getRandomAbscissaPosition(),
        y: number = START_POINT_Y): void {
        this.time = Date.now() + this.model.timeout;
        const width: number = this.getRandomWidthBounds();
        const colour: number = this.getRandomColour();
        const radius: number = this.randomizer(this.model.minRadius, this.model.maxRadius);
        const height: number = this.getRandomHeightBounds();
        
        const shapeType = shapesInGame[this.randomizer(0, shapesInGame.length - 1)];
        let shape: PIXI.Graphics;
        
        switch (shapeType) {
            case 'triangle':
                shape = new Triangle({
                    width,
                    colour,
                    x,
                    y
                })
                this.calculateArea(shapeType, {width, height: width}); // right triangle
                break;
            
            case 'rect':
                shape = new Rectangle({
                    width,
                    height,
                    colour,
                    x,
                    y
                })
                this.calculateArea(shapeType, {width, height});
                break;
                
            case 'pentagon':
                shape = new Pentagon({
                    radius,
                    colour,
                    x,
                    y
                })
                this.calculateArea(shapeType, {radius});
                break;
                
            case 'hexagon':
                shape = new Hexagon({
                    radius,
                    colour,
                    x,
                    y
                })
                this.calculateArea(shapeType, {radius});
                break;
            case 'circle':
                shape = new Circle({
                    radius,
                    colour,
                    x,
                    y
                });
                this.calculateArea(shapeType, {radius});
                break;
                
            case 'ellipse':
                const halfWidth = width / 2,
                    halfHeight = height / 2;
                
                shape = new Ellipse({
                    halfWidth,
                    halfHeight,
                    colour,
                    x,
                    y
                })
                this.calculateArea(shapeType, {halfWidth, halfHeight});
                break;
                
            case 'customShape':
                const sides = this.randomizer(7, this.model.maxSides);
                shape = new CustomShape({
                    sides,
                    radius,
                    colour,
                    x,
                    y
                })
                this.calculateArea(shapeType, {radius, sides});
                break;
        }
        
        this.addAnimationFalling(shape, shapeType);
        this.addInteractiveEvents(shape, shapeType);
        this.model.shapesInGame[shapeType].push(shape);
        this.view.addChild(shape);
        this.view.updateShapeCounter();
    }
    
    private addAnimationFalling (shape: PIXI.Graphics, type: ShapeTypes): void {
        this.ease.add(shape, {y: this.model.areaHeight + this.model.maxShapeHeight * 2}, {duration: this.model.animationSpeed})
            .on('complete', () => {
                this.view.removeChild(shape);
                
                // subtract area
                this.subtractShapeSquareArea(shape, type);
                
                // delete from shapes object
                this.model.shapesInGame[type].splice(this.model.shapesInGame[type].indexOf(shape), 1);
                
                this.view.updateShapeCounter();
            });
    }
    
    subtractShapeSquareArea (shape: PIXI.Graphics, type: ShapeTypes): void {
        this.view.updateSquareArea(-this.shapesAreas[type][this.model.shapesInGame[type].indexOf(shape)]);
        this.shapesAreas[type].splice(this.model.shapesInGame[type].indexOf(shape), 1);
    }
    
    private getRandomAbscissaPosition (): number {
        return this.randomizer(0, this.model.areaWidth);
    }
    
    private getRandomWidthBounds (): number {
        return this.randomizer(this.model.minShapeWidth, this.model.maxShapeWidth)
    }
    
    private getRandomHeightBounds (): number {
        return this.randomizer(this.model.minShapeHeight, this.model.maxShapeHeight)
    }
    
    private getRandomColour (): number {
        return ColorMatrix.resolveColor(colours[this.randomizer(0, colours.length - 1)]);
    }
    
    // function which return random number from range, includes "from" and "to" values
    private randomizer (min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    private calculateArea (
        type: ShapeTypes,
        bounds: CalculatingBounds): void {
        const {width, height, radius, halfWidth, halfHeight, sides} = bounds;
        let squareArea: number;
        switch (type) {
            case 'triangle':
                squareArea = Math.floor(0.5 * width * height); // floor cause we cannot display a half of pixel
                break;
            case 'rect':
                squareArea = width * height;
                break;
            case 'pentagon':
                // squareArea = Math.floor(5 * Math.pow(radius, 2) * Math.sqrt((5 + Math.sqrt(5)) / 2))
                squareArea = Math.floor(2.5 * Math.pow(radius, 2) * Math.sin(this.degreesToRadians(72))); // cause we have 5 sides -> 72 * 5 === 360
                break;
            case 'hexagon':
                squareArea = Math.floor(6 * (Math.pow(radius, 2) * Math.sin(this.degreesToRadians(60))) / 2);
                break;
            case 'circle':
                squareArea = Math.floor(Math.PI * Math.pow(radius, 2));
                break;
            case 'ellipse':
                squareArea = Math.floor(Math.PI * halfWidth * halfHeight);
                break;
            case 'customShape':
                squareArea = Math.floor(Math.pow(radius, 2) * sides * Math.tan(this.degreesToRadians(180) / sides));
                break;
        }
        
        this.shapesAreas[type].push(squareArea);
        this.view.updateSquareArea(squareArea);
    }
    
    private degreesToRadians (degrees): number {
        return degrees * (Math.PI / 180);
    }
}