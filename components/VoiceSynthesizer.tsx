"use client";

import { ChangeEvent, useEffect, useState } from "react";

type State = {
  sender: string;
  response: string | null | undefined;
};
const VoiceSynthesizer = ({
  state,
  displaySettings,
} : {
  state: State;
  displaySettings: boolean;
}) => {
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    setSynth(window.speechSynthesis);
  }, []);
  useEffect(() => {
    if (!state.response || !synth) return;

    const wordToSay = new SpeechSynthesisUtterance(state.response);
    wordToSay.voice = voice;
    wordToSay.pitch = pitch;
    wordToSay.rate = rate;
    wordToSay.volume = volume;

    synth.speak(wordToSay);

    return () => {
      synth.cancel();
    };
  }, [state,voice,pitch,rate,volume]);
  const handleVoiceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) => v.name === e.target.value);
    if (!voice) return;
    setVoice(voice);
  };

  const handlePitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPitch(parseFloat(e.target.value));
  };

  const handleRateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRate(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center text-white">
      {displaySettings && (
        <>
          <div className="w-fit">
            <p className="text-x5 text-gray-500 p-2">Voice:</p>
            <select
              onChange={handleVoiceChange}
              className="bg-purple-500 text-white border border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-purple-500 dark:focus:border-purple-500"
              value={voice?.name}
            >
              {window.speechSynthesis.getVoices().map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex pb-5">
            <div className="p-2">
              <p className="text-xs text-gray-500">Pitch:</p>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={pitch}
                onChange={handlePitchChange}
                className="accent-purple-500"
              />
            </div>

            <div className="p-2">
              <p className="text-xs text-gray-500">Speed::</p>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={handleRateChange}
                className="accent-purple-500"
              />
            </div>

            <div className="p-2">
              <p className="text-xs text-gray-500">Volume:</p>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="accent-purple-500"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VoiceSynthesizer;
