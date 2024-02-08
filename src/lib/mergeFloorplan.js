const loadLayer = (layer, options) => new Promise((resolve, reject) => {
  const img = new Image();
  img.crossOrigin = options?.canvas?.crossOrigin;
  img.src = layer.src;

  img.onerror = () => reject(new Error('Image loading error'));
  img.onload = () => resolve({ ...layer, img });
});

const fillCanvas = (canvas, ctx, floor, layers, options) => {
  const firstImage = layers[0]?.img;
  const currentFloor = options?.floors?.[floor];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.width = options?.canvas?.width || firstImage?.width * 0.2;
  canvas.height = options?.canvas?.height || firstImage?.height * 0.2;

  // Сортируем слои в зависимости от их z-index
  layers.sort((layer1, layer2) => layer1.zIndex - layer2.zIndex);

  // Очищаем контекст
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (options?.canvas?.scale) {
    ctx.scale(options.canvas.scale, options.canvas.scale);
  }

  // Рисуем слои в соответствии с опциями из конфига
  layers.forEach((layer) => {
    if (
      (!currentFloor?.groupOpacity && currentFloor?.groupOpacity !== 0)
            || currentFloor?.groupOpacity === 1
    ) {
      ctx.globalAlpha = layer.opacity || layer.opacity === 0 ? layer.opacity : 1;
    } else {
      ctx.globalAlpha = currentFloor?.groupOpacity ?? 1;
    }

    const floorPosition = currentFloor?.left && currentFloor?.top
      ? currentFloor
      : null;

    ctx.drawImage(
      layer.img,
      floorPosition?.left ? layer?.left + floorPosition?.left : layer?.left || 0,
      floorPosition?.top ? layer?.top + floorPosition?.top : layer?.top || 0,
      (layer.img?.width || 0) * 0.2 || canvas.width,
      (layer.img?.height || 0) * 0.2 || canvas.height,
    );
  });

  return canvas.toDataURL(options.format, options.quality);
};

export default (canvas, floor, options) => new Promise((resolve) => {
  if (!floor) floor = 'gf';

  // Достаем слои из конфига
  const { layers } = options.floors[floor];

  // Загружаем все слои
  const promiseLayers = layers
    .map((layer) => loadLayer(layer, options));

  // Создаем 2d контекст
  const ctx = canvas.getContext('2d');

  resolve(
    // Ждем fulfilled всех промисов и заполняем canvas слоями
    Promise.all(promiseLayers)
      .then((loadedLayers) => fillCanvas(canvas, ctx, floor, loadedLayers, options)),
  );
});
