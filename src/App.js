import './App.css';

import { useState } from 'react';

function App() {
    const [isImageUploaded, setIsImageUploaded] = useState(false)
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const [pixelColor, setPixelColor] = useState([]);

    const handleChange = (event) => {
        var image = document.getElementById('output');
        image.src = URL.createObjectURL(event.target.files[0]);
    }

    const handleImageLoad = () => {
        setIsImageUploaded(true)
        const image = document.getElementById('output');
        setWidth(image.width);
        setHeight(image.height);
    }

    const handleImage = (event) => {
        const image = document.getElementById('output');
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
        var x = 1 + event.clientX - image.offsetLeft
        var y = 1 + event.clientY - image.offsetTop
        const rgba = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
        setPixelColor([rgba[0], rgba[1], rgba[2], rgba[3]])
    }

    return (
        <div className="App">
            <div>
                <b className="pixel-picker">
                    <span>P</span>
                    <span>i</span>
                    <span>x</span>
                    <span>e</span>
                    <span>l</span>
                    <span> </span>
                    <span>P</span>
                    <span>i</span>
                    <span>c</span>
                    <span>k</span>
                    <span>e</span>
                    <span>r</span>
                </b>
                <form className='Form'>
                    <p>Please Select an Image:</p>
                    <input type="file" accept="image/gif, image/jpeg, image/png" id="myFile" onChange={handleChange} />
                </form>
                {isImageUploaded && <p className='Pixel-Color' style={{ backgroundColor: `rgba(${pixelColor[0]}, ${pixelColor[1]}, ${pixelColor[2]}, ${pixelColor[3]})` }}>Color: 
                    <span className='underline-after-hash'>rgba({pixelColor[0]}, {pixelColor[1]}, {pixelColor[2]}, {pixelColor[3]} )</span></p>
                }
                {(width && height) && <p>Original Image Size: {width}px x {height}px</p>}
            </div>
            <img id="output" alt="upload_image" className="Image-Output" onLoad={handleImageLoad} onMouseMove={handleImage} />
        </div>
    );
}

export default App;
