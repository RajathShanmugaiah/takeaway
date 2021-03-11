import React, { useEffect, useState } from 'react';

const useWindowWidth = () => {
  if (typeof window === 'undefined') {
    global.window = {};
  }
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return windowWidth;
};

const UseOptimizedImage = image => {
  const windowWidth = useWindowWidth();
  return (
    <div className='toast toast-primary'>
      Current window width: {windowWidth}
    </div>
  );
};

// export default (url) => {
//     const [size, setSize] = useState([0, 0]);

//     useEffect(() => {
//       if (!url) return;
//       const img = document.createElement('img');
//       img.addEventListener('load', (e) => {
//         const { naturalHeight, naturalWidth } = e.target;
//         setSize([naturalWidth, naturalHeight]);
//       });
//       img.src = url;
//     }, [url]);

//     return size;
// }

export default UseOptimizedImage;
