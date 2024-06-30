import React, { useState, useEffect, useRef, useContext } from "react";
import QrScanner from "qr-scanner";
// import { ScannerQRContext } from "../../context/scannerqr";
// import { FetchContext } from "../../context/fetch";

function Scanner({ message }) {
//   const { id, setId } = useContext(ScannerQRContext);
//   const { state, setState } = useContext(FetchContext);
  const [qrData, setQrData] = useState("");
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);
  const audioRef = useRef(null);

  const handleScan = (result) => {
    if (result) {
      setQrData(result.data);
      console.log(result.data);
  
      // Retrieve existing data from local storage
      let storedData = JSON.parse(localStorage.getItem("qrData")) || [];
  
      // Append the new result to the existing data
      storedData.push(result.data);
  
      // Save the updated data back to local storage
      localStorage.setItem("qrData", JSON.stringify(storedData));
  
      // Play the audio
      audioRef.current.play();
    }
  };
  

  const startCamera = async () => {
    const video = videoRef.current;
    try {
      qrScannerRef.current = new QrScanner(video, handleScan, {
        highlightScanRegion: true,
        highlightCodeOutline: true,
        inversionMode: "original",
      });
      qrScannerRef.current.start();
    } catch (error) {

      console.error("Error accessing the camera", error);
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    function sendToParent() {
    //   setState(true);
      setTimeout(() => {
        // setId("");
        setQrData("");
        console.log("id set to empty");
      }, 1000);
      setTimeout(() => {
        // setState(false);
        console.log("state set to false");
      }, 5000);
    }
    if (qrData) {
      sendToParent();
    }
  }, [qrData]);

  const refreshCamera = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
    setQrData("");
    startCamera();
  };

  return (
    <div className="my-5 flex flex-col gap-2 items-center">
      {/* <span className={state ? "flex " : "hidden"}>
        {message ? `${message} !!` : "Loading..."}
      </span> */}
      {/* <div className={`${state ? "hidden" : ""}`}> */}
        <div className={`flex flex-col gap-2 items-center`}>
          <h1 className="text-3xl font-bold"> QR Scanner</h1>
          <video ref={videoRef} className={`w-80`}></video>
          <audio ref={audioRef} src="/beep.mp3" className="hidden"></audio>
          {qrData && (
            <p className="text-lg">
              <span className="font-semibold text-xl">Scanned Data:</span>{" "}
              {qrData}
            </p>
          )}
          <button
            onClick={refreshCamera}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Refresh Camera
          </button>
        </div>
      </div>
    // </div>
  );
}

export default Scanner;