"use client"
import React from 'react';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50">
      <div className="loader"></div>
      <style jsx>{`
      .loader,
      .loader:before,
      .loader:after {
        background: #B3D0CF;
        -webkit-animation: load1 1s infinite ease-in-out;
        animation: load1 1s infinite ease-in-out;
        width: 1em;
        height: 4em;
      }
      .loader {
        color: #B3D0CF;
        text-indent: -9999em;
        margin: 88px auto;
        position: relative;
        font-size: 11px;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
      }
      .loader:before,
      .loader:after {
        position: absolute;
        top: 0;
        content: '';
      }
      .loader:before {
        left: -1.5em;
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
      }
      .loader:after {
        left: 1.5em;
      }
      @-webkit-keyframes load1 {
        0%,
        80%,
        100% {
          box-shadow: 0 0;
          height: 4em;
        }
        40% {
          box-shadow: 0 -2em;
          height: 5em;
        }
      }
      @keyframes load1 {
        0%,
        80%,
        100% {
          box-shadow: 0 0;
          height: 4em;
        }
        40% {
          box-shadow: 0 -2em;
          height: 5em;
        }
      }
      
    `}</style>
    </div>
  );
};

export default Loader;
