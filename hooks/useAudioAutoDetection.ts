
import { useState, useEffect, useRef } from 'react';
import { identifyAudio } from '../services/geminiService';

export const useAudioAutoDetection = (enabled: boolean, onDetected: (result: { title: string; artist: string }) => void) => {
  const [isListening, setIsListening] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<number | null>(null);

  const getSupportedMimeType = () => {
    const types = ['audio/webm', 'audio/mp4', 'audio/ogg', 'audio/wav'];
    return types.find(type => MediaRecorder.isTypeSupported(type)) || 'audio/webm';
  };

  const captureAndIdentify = async () => {
    if (!enabled) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = getSupportedMimeType();
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: mimeType });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          try {
            const result = await identifyAudio(base64Audio, mimeType);
            if (result && result.title !== 'Unknown' && result.confidence > 0.6) {
              onDetected(result);
            }
          } catch (err) {
            console.error("Auto-detection identification failed", err);
          } finally {
            stream.getTracks().forEach(track => track.stop());
            setIsListening(false);
          }
        };
      };

      mediaRecorder.start();
      setIsListening(true);
      
      // Listen for 5 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
      }, 5000);

    } catch (err) {
      console.error("Auto-detection mic access failed", err);
      setIsListening(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      // Start initial check
      captureAndIdentify();
      // Then repeat every 30 seconds
      intervalRef.current = window.setInterval(captureAndIdentify, 30000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [enabled]);

  return { isListening };
};
