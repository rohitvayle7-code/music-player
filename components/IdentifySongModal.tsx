
import React, { useState, useEffect, useRef } from 'react';
import { identifyAudio } from '../services/geminiService';

interface IdentifySongModalProps {
  onClose: () => void;
  onResult: (result: { title: string; artist: string }) => void;
}

const IdentifySongModal: React.FC<IdentifySongModalProps> = ({ onClose, onResult }) => {
  const [status, setStatus] = useState<'idle' | 'recording' | 'processing' | 'success' | 'error'>('idle');
  const [timer, setTimer] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    startRecording();
    return () => {
      stopRecording();
      if (timerIntervalRef.current) window.clearInterval(timerIntervalRef.current);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        setStatus('processing');
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          try {
            const result = await identifyAudio(base64Audio, 'audio/webm');
            if (result.title !== 'Unknown') {
              onResult(result);
              setStatus('success');
              setTimeout(onClose, 2000);
            } else {
              setStatus('error');
            }
          } catch (err) {
            console.error(err);
            setStatus('error');
          }
        };
      };

      mediaRecorder.start();
      setStatus('recording');
      setTimer(0);
      timerIntervalRef.current = window.setInterval(() => {
        setTimer(prev => {
          if (prev >= 6) { // Record for 6 seconds
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (err) {
      console.error("Microphone access denied", err);
      setStatus('error');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    if (timerIntervalRef.current) {
      window.clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-background-dark/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-sm aspect-square rounded-[3rem] bg-surface-dark border border-primary/20 flex flex-col items-center justify-center gap-8 shadow-2xl shadow-primary/20 overflow-hidden">
        
        {/* Decorative Background Pulsing Circles */}
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${status === 'recording' ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute w-40 h-40 rounded-full border border-primary/40 animate-ping opacity-20"></div>
          <div className="absolute w-60 h-60 rounded-full border border-primary/40 animate-ping opacity-10" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Status Icon */}
        <div className="relative z-10 size-24 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(236,19,236,0.5)]">
          <span className={`material-symbols-outlined text-white text-5xl ${status === 'recording' ? 'animate-pulse' : ''}`}>
            {status === 'recording' ? 'mic' : status === 'processing' ? 'sync' : status === 'success' ? 'check' : 'error'}
          </span>
        </div>

        <div className="z-10 flex flex-col items-center gap-2 text-center px-6">
          <h3 className="text-xl font-bold text-white tracking-tight">
            {status === 'recording' ? 'Listening...' : status === 'processing' ? 'Identifying Song' : status === 'success' ? 'Identified!' : 'Unknown Song'}
          </h3>
          <p className="text-sm text-text-secondary-dark font-medium h-10">
            {status === 'recording' ? `Hold tight, analyzing ambient sound (${timer}s)` : status === 'processing' ? 'Searching Gemini Knowledge Base...' : status === 'success' ? 'Added to your search' : 'Try again in a quieter spot.'}
          </p>
        </div>

        {/* Waveform Mockup */}
        <div className="z-10 flex items-center gap-1.5 h-8">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className={`w-1 rounded-full bg-primary transition-all duration-300 ${status === 'recording' ? 'animate-bounce' : 'h-1 opacity-20'}`}
              style={{ 
                height: status === 'recording' ? `${Math.random() * 100 + 20}%` : '4px',
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.8s'
              }}
            ></div>
          ))}
        </div>

        <button 
          onClick={onClose}
          className="z-10 mt-4 px-6 py-2 rounded-full bg-white/5 text-xs font-bold uppercase tracking-widest text-white/50 hover:bg-white/10 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default IdentifySongModal;
