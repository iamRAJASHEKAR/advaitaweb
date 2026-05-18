import pedalone from "./pedalfrst.png";
import pedaltwo from "./pedaltwo.png";
import pedalthree from "./pedalthree.png";
import perforatedone from "./perforatedone.png";
import perforatedtwo from "./perforatedtwo.png";
import perforatedthree from "./perforatedthree.png";
import perforatedfour from "./perforatedfour.png";
import swingone from "./swingone.png";
import swingtwo from "./swingtwo.png";
import swingthree from "./swingthree.png";



export const assets = {
    pedal: [pedalone, pedaltwo, pedalthree],
    perforate: [perforatedone, perforatedtwo, perforatedthree, perforatedfour],
    swing: [swingone, swingtwo, swingthree]
};

export type AssetName = keyof typeof assets;