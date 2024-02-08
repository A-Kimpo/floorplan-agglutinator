export default {
  canvas: {
    format: 'image/png',
    quality: 0.92,
    crossOrigin: 'anonymous',
    scale: 1,
    width: 0,
    height: 0,
  },
  zoom: {
    startZoom: 1,
    minZoom: 0.5,
    maxZoom: 3,
  },
  imgPosition: {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  floors: {
    gf: {
      layers: [
        {
          name: 'pod',
          src: '../../public/floorplans/unit/GF/0.png',
          opacity: 0.5,
          top: 0,
          left: 0,
          width: 819,
          height: 819,
          zIndex: 0,
        },
        {
          name: 'house',
          src: '../../public/floorplans/unit/GF/1.png',
          opacity: 1,
          top: 0,
          left: 0,
          width: 819,
          height: 819,
          zIndex: 1,
        },
      ],
      groupOpacity: 1,
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    },
    ff: {
      layers: [
        {
          name: 'pod',
          src: '../../public/floorplans/unit/FF/0.png',
          opacity: 0.5,
          top: 0,
          left: 0,
          width: 819,
          height: 819,
          zIndex: 0,
        },
        {
          name: 'house',
          src: '../../public/floorplans/unit/FF/1.png',
          opacity: 1,
          top: 0,
          left: 0,
          width: 819,
          height: 819,
          zIndex: 1,
        },
      ],
      groupOpacity: 1,
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    },
    rf: {
      layers: [
        {
          name: 'pod',
          src: '../../public/floorplans/unit/RF/0.png',
          opacity: 0.5,
          top: 0,
          left: 0,
          width: 819,
          height: 819,
          zIndex: 0,
        },
        {
          name: 'house',
          src: '../../public/floorplans/unit/RF/1.png',
          opacity: 1,
          top: 0,
          left: 0,
          width: 819,
          height: 819,
          zIndex: 1,
        },
      ],
      groupOpacity: 1,
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    },
  },
};
