const getImage = (layer, options) => new Promise((resolve, reject) => {
  const img = new Image();
  img.crossOrigin = options.crossOrigin;
  img.src = layer.src;

  img.onerror = () => reject(new Error('Image loading error'));
  img.onload = () => resolve({ ...layer, img });
});

const fillCanvas = (canvas, ctx, images, options) => {
  const firstImage = images[0]?.img;

  canvas.width = options?.canvas?.width || firstImage?.width;
  canvas.height = options?.canvas?.height || firstImage?.height;

  images.forEach((image) => {
    ctx.globalAlpha = image.opacity ? image.opacity : options?.floors?.gf?.groupOpacity ?? 1;
    ctx.drawImage(image.img, image.left || 0, image.top || 0);
  });

  return canvas.toDataURL(options.format, options.quality);
};

export default (canvas, floor, options) => new Promise((resolve) => {
  if (!floor) floor = 'gf';

  const { layers } = options.floors[floor];

  const images = layers
    .map((layer) => getImage(layer, options));

  const ctx = canvas.getContext('2d');

  resolve(
    Promise.all(images)
      .then((images) => fillCanvas(canvas, ctx, images, options)),
  );
});
