const createElementDiv = document.getElementById('createElement') as HTMLDivElement;
const gridBox = document.getElementById('gridBox') as HTMLDivElement;
const freeBox = document.getElementById('freeBox') as HTMLDivElement;

const getRandomRGBColor = () => {
    return `rgb(
        ${Math.round(Math.random() * 255)}, 
        ${Math.round(Math.random() * 255)}, 
        ${Math.round(Math.random() * 255)}
    )`;
};

const setPositionToElement = (element: HTMLDivElement, x: Number, y: Number): void => {
    element.style.top = `${y}px`;
    element.style.left = `${x}px`;
};

const setPositionToCenterElement = (element: HTMLDivElement, event: PointerEvent): void => {
    const x = event.pageX - element.offsetWidth / 2;
    const y = event.pageY - element.offsetHeight / 2;

    setPositionToElement(element, x, y);
};

const elementInBox = (box: HTMLDivElement, event: PointerEvent): boolean => {
    const { top, bottom, left, right } = box.getBoundingClientRect();
    const { clientX, clientY } = event;

    return clientX > left && clientX < right && clientY > top && clientY < bottom;
};

const onPointerUpHandler = (event: PointerEvent, newElement: HTMLDivElement) => {
    const elementWidth = newElement.offsetWidth;
    const elementHeight = newElement.offsetHeight;
    newElement.remove();

    if (elementInBox(gridBox, event)) {
        newElement.style.position = 'static';
        gridBox.append(newElement);
    } else if (elementInBox(freeBox, event)) {
        console.log(newElement.offsetWidth);
        setPositionToElement(
            newElement,
            event.pageX - freeBox.offsetLeft - elementWidth / 2,
            event.pageY - freeBox.offsetTop - elementHeight / 2
        );
        freeBox.append(newElement);
    }

    document.onpointermove = null;
    document.onpointerup = null;
};

const onPointerDownHandler = (event: PointerEvent) => {
    const newElement = document.createElement('div');
    newElement.classList.add('box-element');
    newElement.style.backgroundColor = getRandomRGBColor();
    document.body.append(newElement);
    setPositionToCenterElement(newElement, event);

    document.onpointermove = (event) => setPositionToCenterElement(newElement, event);

    document.onpointerup = (event) => onPointerUpHandler(event, newElement);
};

createElementDiv.onpointerdown = (event) => onPointerDownHandler(event);
