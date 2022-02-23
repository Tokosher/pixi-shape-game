import './style.css';
import { Model } from './model/model';
import { Controller } from './controller/controller';
import { View } from './view/view';

const main = () => {
        const model = new Model({
            minShapeWidth: 90,
            minShapeHeight: 90,
            maxShapeWidth: 130,
            maxShapeHeight: 130,
            minRadius: 55,
            maxRadius: 70,
        });
        const view = new View();
        const controller = new Controller(model, view);
        
        controller.createGameArea();
        controller.drawRandomShapes();
        controller.enableButtons();
}

window.onload = main;