import * as images from '../images/cars';

export function getRandomCarImage() {
  const imageArray = Object.values(images);
  const randomIndex = Math.floor(Math.random() * imageArray.length);
  return imageArray[randomIndex];
}
