import { useState } from 'react';
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import Child from "./../Child/Child";
import { data } from "./Data";
import './Bubble.css';

const Bubble = () => {
    const [bubble, setBubble] = useState("");
    const options = {
        size: 80,
        minSize: 20,
        gutter: 18,
        provideProps: true,
        numCols: 5,
        fringeWidth: 45,
        yRadius: 100,
        xRadius: 100,
        cornerRadius: 50,
        showGuides: false,
        compact: true,
        gravitation: 5
    };

    const handleClick = (bub) => {
        setBubble(bub);
    };

    const children = data?.map((data, i) => {
        return (
            <Child data={data} className="child" key={i} setClick={handleClick} />
        );
    });

    return (
        <>
            <BubbleUI options={options} className="myBubbleUI">
                {children}
            </BubbleUI>
            <div>Clicked bubble: {bubble}</div>
        </>
    );
}


export default Bubble