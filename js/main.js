import { PHOTOS_COUNT } from './constants.js';
import { createPhotosStock } from './createPhotoStock.js';
import { photoUploaderInput, openUploader } from './photoUploader.js';
import { renderCards } from './renderPhotos.js';


const pictures = createPhotosStock(PHOTOS_COUNT);
renderCards(pictures);

photoUploaderInput.addEventListener('change', ()=>{
  openUploader();
});

