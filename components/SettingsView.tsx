
import React from 'react';

const SettingsView: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-full pb-40">
      <header className="sticky top-0 z-50 flex items-center justify-between bg-background-dark/80 px-6 py-6 backdrop-blur-md border-b border-white/5">
        <h2 className="text-3xl font-bold leading-tight tracking-tight">Settings</h2>
      </header>

      <main className="flex flex-col gap-6 p-6">
        {/* Equalizer Card */}
        <div className="relative overflow-hidden rounded-3xl bg-surface-dark shadow-sm dark:shadow-[0_0_15px_rgba(236,19,236,0.15)] ring-1 ring-white/10 group cursor-pointer transition-transform active:scale-[0.98]">
          <div className="flex items-stretch justify-between p-6">
            <div className="flex flex-col justify-center gap-2 flex-[2_2_0px] z-10">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-primary text-[28px]">graphic_eq</span>
                <p className="text-xl font-bold leading-tight">Equalizer</p>
              </div>
              <p className="text-[#c992c9] text-sm font-medium">Custom (Manual)</p>
              <div className="mt-2 inline-flex items-center text-xs font-bold tracking-wider uppercase text-primary">
                Tap to edit <span className="material-symbols-outlined text-[16px] ml-1">chevron_right</span>
              </div>
            </div>
            <div 
              className="w-24 h-24 rounded-2xl bg-cover bg-center relative opacity-80 group-hover:opacity-100 transition-opacity" 
              style={{ backgroundImage: 'url(https://picsum.photos/seed/eq/200/200)' }}
            >
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 blur-[50px] rounded-full pointer-events-none"></div>
        </div>

        {/* AI Features */}
        <section>
          <h3 className="text-slate-500 text-xs font-bold tracking-widest px-2 pb-3 uppercase">AI Intelligence</h3>
          <div className="rounded-3xl bg-surface-dark overflow-hidden ring-1 ring-white/5">
            <ToggleItem 
              title="Continuous Audio Recognition" 
              subtitle="Automatically identify ambient music while app is open" 
              icon="sensors" 
            />
            <ToggleItem 
              title="Smart Insights" 
              subtitle="Show fun facts about music while searching" 
              icon="rocket_launch" 
              defaultChecked 
            />
          </div>
        </section>

        {/* Audio Config */}
        <section>
          <h3 className="text-slate-500 text-xs font-bold tracking-widest px-2 pb-3 uppercase">Audio Configuration</h3>
          <div className="rounded-3xl bg-surface-dark overflow-hidden ring-1 ring-white/5">
            <div className="p-4 border-b border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary">
                    <span className="material-symbols-outlined text-[20px]">tune</span>
                  </div>
                  <p className="text-base font-medium">Crossfade</p>
                </div>
                <p className="text-primary font-bold text-sm">3s</p>
              </div>
              <div className="relative h-1.5 w-full bg-[#482348] rounded-full">
                <div className="absolute top-0 left-0 h-full w-1/4 bg-primary rounded-full"></div>
                <div className="absolute left-1/4 top-1/2 -translate-y-1/2 -ml-2 size-5 rounded-full bg-white shadow-md ring-2 ring-primary"></div>
              </div>
            </div>
            <ToggleItem title="ReplayGain" subtitle="Normalize volume levels" icon="volume_up" defaultChecked />
            <ToggleItem title="Mono Audio" icon="hearing" />
          </div>
        </section>

        {/* Library */}
        <section>
          <h3 className="text-slate-500 text-xs font-bold tracking-widest px-2 pb-3 uppercase">Library Management</h3>
          <div className="rounded-3xl bg-surface-dark overflow-hidden ring-1 ring-white/5">
            <button className="w-full flex items-center gap-4 p-4 justify-between border-b border-white/5 active:bg-primary/10 transition-colors text-left group">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-full bg-white/5 text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">folder_open</span>
                </div>
                <p className="text-base font-medium text-primary">Scan Folders Now</p>
              </div>
              <span className="material-symbols-outlined text-primary text-[20px]">refresh</span>
            </button>
            <ToggleItem title="Show Hidden Tracks" icon="visibility_off" defaultChecked />
            <NavItem title="Artwork Download" value="Manual Only" icon="image" />
          </div>
        </section>

        {/* System */}
        <section>
          <h3 className="text-slate-500 text-xs font-bold tracking-widest px-2 pb-3 uppercase">System</h3>
          <div className="rounded-3xl bg-surface-dark overflow-hidden ring-1 ring-white/5">
            <NavItem title="Theme" value="Dark (Neon)" icon="palette" locked />
            <div className="flex items-center gap-4 p-4 justify-between hover:bg-white/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-full bg-white/5 text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">cleaning_services</span>
                </div>
                <p className="text-base font-medium">Clear Cache</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-slate-300">128 MB</div>
            </div>
          </div>
        </section>

        <div className="flex flex-col items-center justify-center py-6 gap-1 opacity-50">
          <span className="material-symbols-outlined text-[32px] text-primary mb-2">rocket_launch</span>
          <p className="text-xs font-medium">NeonFlow Music v2.5.0</p>
          <p className="text-[10px] uppercase tracking-widest">Powered by Gemini AI</p>
        </div>
      </main>
    </div>
  );
};

const ToggleItem = ({ title, subtitle, icon, defaultChecked = false }: { title: string; subtitle?: string; icon: string; defaultChecked?: boolean }) => (
  <div className="flex items-center gap-4 p-4 justify-between border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
    <div className="flex items-center gap-3 overflow-hidden">
      <div className="flex items-center justify-center size-8 rounded-full bg-white/5 text-slate-400">
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      </div>
      <div className="flex flex-col">
        <p className="text-base font-medium truncate">{title}</p>
        {subtitle && <p className="text-xs text-slate-500 truncate">{subtitle}</p>}
      </div>
    </div>
    <div className="shrink-0">
      <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-[#482348] p-0.5 has-[:checked]:bg-primary transition-colors">
        <input className="peer sr-only" type="checkbox" defaultChecked={defaultChecked} />
        <div className="h-full w-[27px] rounded-full bg-white shadow-sm transition-all peer-checked:translate-x-[20px]"></div>
      </label>
    </div>
  </div>
);

const NavItem = ({ title, value, icon, locked = false }: { title: string; value: string; icon: string; locked?: boolean }) => (
  <div className={`flex items-center gap-4 p-4 justify-between border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer ${locked ? 'opacity-70' : ''}`}>
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center size-8 rounded-full bg-white/5 text-slate-400">
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      </div>
      <p className="text-base font-medium">{title}</p>
    </div>
    <div className="flex items-center gap-2 text-slate-400">
      <span className="text-sm">{value}</span>
      <span className="material-symbols-outlined text-[18px]">{locked ? 'lock' : 'chevron_right'}</span>
    </div>
  </div>
);

export default SettingsView;
