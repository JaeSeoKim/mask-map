import { useEffect } from 'react';

const InfinityScroll = (callBack) => {


  const handleScroll = () => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    if (scrollTop + clientHeight >= scrollHeight - 2) {
      if (typeof callBack === "function") {
        callBack();
      }
    }
  } 

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

};

export default InfinityScroll;