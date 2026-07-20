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
import femininehygieneImg from "./feminehygiene.png";
import femininebincardImg from "./femininebincard.png";
import hygienebininfoImg from "./hygienebininfo.png";
import incineratorImg from "./incinirator.png";
import incineratorDuctImg from "./inciniratorduct.png";
import sanitaryVendingImg from "./sanitaryvendingcoin.png";
import sanitaryPadsImg from "./sanitarypads.png";
import pvcCurtainImg from "./pvccurtain.png";
import polarPvcImg from "./polarpvc.png";
import pvcRollImg from "./pvcroll.png";
import industrialPvcImg from "./indutrialpvc.png";

export const assets = {
    pedal: [pedalone, pedaltwo, pedalthree],
    perforate: [perforatedone, perforatedtwo, perforatedthree, perforatedfour],
    swing: [swingone, swingtwo, swingthree],
    femininehygiene: [femininehygieneImg],
    femininebincard: [hygienebininfoImg, femininebincardImg],
    incinerator: [incineratorImg, incineratorDuctImg],
    sanitaryvending: [sanitaryVendingImg],
    sanitarypads: [sanitaryPadsImg],
    pvccurtain: [pvcCurtainImg],
    polarpvc: [polarPvcImg],
    pvcroll: [pvcRollImg],
    industrialpvc: [industrialPvcImg],
};

export type AssetName = keyof typeof assets;