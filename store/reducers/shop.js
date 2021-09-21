import { Product } from '../../model/product';
import * as c from '../constants';

const initialState = {
    products: {
        '1': new Product('1', 'Usb disk: 8MB', 10, '8 Giga memory', 
        'https://konimboimages.s3.amazonaws.com/system/photos/6549714/large/0146861ae2d1ee2d84131134e2cfedc0.jpg'),
        '2': new Product('2', 'Apple mouse', 50, 'Apple mouse 2 Wireless Bluetooth', 
        'https://www.ivory.co.il/files/catalog/org/1596627868i68TI.jpg'),
        '3': new Product('3', 'USB-c adapter', 20, 'USB adapter to RJ-45, USB-a, display port', 
        'https://www.ivory.co.il/files/catalog/org/1557993816b16Mf.jpg'),
        '4': new Product('4', 'Video camera', 30, 'WYZE Cam v3 with Color Night Vision, Wired 1080p HD Indoor/Outdoor Video Camera, 2-Way Audio, Works with Alexa, Google Assistant, and IFTTT', 
        'https://m.media-amazon.com/images/I/61DJRLNgyWL._AC_SL1500_.jpg'),
        '5': new Product('5', 'IPhone glass screen protector', 11.3, 'Ailun Glass Screen Protector Compatible for iPhone 11/iPhone XR, 6.1 Inch 3 Pack Tempered Glass', 
        'https://m.media-amazon.com/images/I/81MZ5D1wHpL._AC_SL1500_.jpg'),
        '6': new Product('6', 'AAA battaries', 17.97, 'Energizer AAA Batteries (48 Count), Triple A Max Alkaline Battery', 
        'https://m.media-amazon.com/images/I/81USLHbjxCL._AC_SL1200_.jpg'),
        '7': new Product('7', 'HP Ink cartridge', 29.89, 'Original HP 67 Black/Tri-color Ink Cartridges (2-pack) | Works with HP DeskJet 1255, 2700, 4100 Series, HP ENVY 6000, 6400 Series | Eligible for Instant Ink | 3YP29AN', 
        'https://m.media-amazon.com/images/I/711q4kUzDiS._AC_SL1500_.jpg'),
        '8': new Product('8', 'HP Ink cartridge', 29.89, 'Original HP 67 Black/Tri-color Ink Cartridges (2-pack) | Works with HP DeskJet 1255, 2700, 4100 Series, HP ENVY 6000, 6400 Series | Eligible for Instant Ink | 3YP29AN', 
        'https://m.media-amazon.com/images/I/711q4kUzDiS._AC_SL1500_.jpg'),
        '9': new Product('9', 'Samsung Galaxy Buds', 111.99, 'Samsung Galaxy Buds Plus, True Wireless Earbuds (Wireless Charging Case Included), Black – US Version', 
        'https://m.media-amazon.com/images/I/614bL2rQtcL._AC_SL1468_.jpg'),
        '10': new Product('10', 'LED Monitor', 147.00, 'Sceptre 20" 1600x900 75Hz Ultra Thin LED Monitor 2x HDMI VGA Built-in Speakers, Machine Black Wide Viewing Angle 170° (Horizontal) / 160° (Vertical)', 
        'https://m.media-amazon.com/images/I/61JceXBE1xS._AC_SL1283_.jpg'),
    }
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        
        default:
            return state;
    }
}

export default reducer;
