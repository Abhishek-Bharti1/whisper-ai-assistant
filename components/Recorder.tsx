"use client";
import Image from "next/image";
import activeSiri from "@/img/active.gif";
import notactiveSiri from "@/img/siriiii.png";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
export const mimeType = "audio/webm";
const Recorder = ({ upoloadAudio }: { upoloadAudio: (blob: Blob) => void }) => {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const { pending } = useFormStatus();
  useEffect(() => {
    getMicrophonePermission();
  }, []);
  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (error: any) {
        alert(error.message);
      }
    } else {
      alert("Media Recorder API is not supported in your browser");
    }
  };

  const startRecording = async () => {
    if (stream === null || pending) return;
    setRecordingStatus("recording");
    //create a new media recorder instance using the stream
    const media = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localAudioChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };
  const stopRecording = async () => {
    if (mediaRecorder.current === null || pending) return;
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });

      upoloadAudio(audioBlob);
      setAudioChunks([]);
    };
  };
  return (
    <div className="flex items-center justify-center text-white">
      {!permission && (
        <button onClick={getMicrophonePermission}>Get Microphone</button>
      )}
      {pending && (
        <Image
          src={activeSiri}
          width={350}
          height={350}
          priority
          alt="Recorder"
          className="grayscale"
        />
      )}
      {permission && recordingStatus === "inactive" && !pending && (
        <Image
          src={notactiveSiri}
          width={350}
          height={350}
          priority={true}
          alt="not Recorder"
          onClick={startRecording}
          className="assistant cursor-pointer hover:scale-110 duration-150 transition-all ease-in-out"
        />
      )}
      {recordingStatus === "recording" && (
        <Image
          src={activeSiri}
          width={350}
          height={350}
          priority={true}
          alt="Recorder"
          onClick={stopRecording}
          className="cursor-pointer hover:scale-110 duration-150 transition-all ease-in-out"
        />
      )}
    </div>
  );
};

export default Recorder;
