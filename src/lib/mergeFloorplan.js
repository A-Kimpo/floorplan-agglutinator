const loadLayer = (layer, options) => new Promise((resolve, reject) => {
  const img = new Image();
  img.crossOrigin = options?.canvas?.crossOrigin;
  img.src = layer.src;

  img.onerror = () => reject(new Error('Image loading error'));
  img.onload = () => resolve({ ...layer, img });
});

const fillCanvas = (canvas, ctx, floor, layers, options) => {
  const firstImage = layers[0]?.img;
  const allLayers = options?.floors?.[floor];

  canvas.width = firstImage?.width * 0.2;
  canvas.height = firstImage?.height * 0.2;

  layers.sort((layer1, layer2) => layer1.zIndex - layer2.zIndex);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  layers.forEach((layer) => {
    if ((!allLayers?.groupOpacity && allLayers?.groupOpacity !== 0)
            || options?.floors?.gf?.groupOpacity === 1) {
      ctx.globalAlpha = layer.opacity || layer.opacity === 0 ? layer.opacity : 1;
    } else {
      ctx.globalAlpha = allLayers?.groupOpacity ?? 1;
    }

    const groupPos = options?.floors?.gf?.left && options?.floors?.gf?.top
      ? options?.floors?.gf
      : null;

    ctx.drawImage(
      layer.img,
      groupPos?.left || layer?.left || 0,
      groupPos?.top || layer?.top || 0,
      canvas.width,
      canvas.height,
    );
  });

  return canvas.toDataURL(options.format, options.quality);
};

export default (canvas, floor, options) => new Promise((resolve) => {
  const { layers } = options.floors[floor];

  const promiseLayers = layers
    .map((layer) => loadLayer(layer, options));

  const ctx = canvas.getContext('2d');

  resolve(
    Promise.all(promiseLayers)
      .then((loadedLayers) => fillCanvas(canvas, ctx, floor, loadedLayers, options)),
  );
});
