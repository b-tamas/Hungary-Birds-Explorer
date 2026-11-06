<script lang="ts">
  import { onDestroy } from 'svelte';
  import { AudioLines, Pause, Play } from '@lucide/svelte';
  import type { Bird } from '../../birds';

  let { bird, compact = false }: { bird: Bird; compact?: boolean } = $props();
  let audio = $state<HTMLAudioElement>();
  let playing = $state(false);
  let error = $state(false);

  async function toggle() {
    if (!audio || !bird.sound || error) return;
    if (playing) {
      audio.pause();
      playing = false;
      return;
    }

    try {
      await audio.play();
      playing = true;
    } catch {
      error = true;
    }
  }

  onDestroy(() => audio?.pause());
</script>

{#if !bird.sound}
  <div class={`flex items-center gap-3 rounded-xl border border-[#deddd1] bg-[#f2f0e7] ${compact ? 'px-3 py-2' : 'p-4'}`} data-testid={`status-audio-unavailable-${bird.id}`}>
    <span class="grid size-9 shrink-0 place-items-center rounded-full bg-[#e3e4da] text-[#768078]"><AudioLines size={16} /></span>
    <div><p class="text-[12px] font-semibold text-[#4a5d54]">Recording unavailable</p>{#if !compact}<p class="mt-0.5 text-[10px] text-[#81877e]">No verified recording is linked for this species yet.</p>{/if}</div>
  </div>
{:else}
  <div class={`flex items-center gap-3 rounded-xl border border-[#d8ddd0] bg-[#edf0e6] ${compact ? 'px-3 py-2' : 'p-4'}`}>
    <audio bind:this={audio} src={bird.sound} preload="none" onended={() => (playing = false)} onerror={() => { playing = false; error = true; }}></audio>
    <button type="button" onclick={toggle} aria-label={playing ? `Pause ${bird.en} recording` : `Play ${bird.en} recording`} data-testid={`button-play-audio-${bird.id}`} class="grid size-9 shrink-0 place-items-center rounded-full bg-[#315b4e] text-white transition-transform hover:scale-105">
      {#if playing}<Pause size={15} fill="currentColor" />{:else}<Play size={15} fill="currentColor" />{/if}
    </button>
    <div class="min-w-0 flex-1">
      <div class="flex items-center gap-2"><p class="text-[12px] font-semibold text-[#40594d]">{error ? 'Recording could not be loaded' : playing ? 'Now playing' : 'Listen to the call'}</p>{#if playing}<div class="audio-wave flex h-3 items-center gap-[2px] text-[#719080]">{#each Array.from({ length: 8 }, (_, index) => index) as index}<span style={`height:${5 + (index % 4) * 2}px`}></span>{/each}</div>{/if}</div>
      <div class="mt-0.5 flex min-w-0 flex-wrap gap-x-2"><a href={bird.soundSource} target="_blank" rel="noreferrer" class="truncate text-[10px] text-[#78847a] underline decoration-[#abb4a6] underline-offset-2 hover:text-[#315b4e]">{bird.soundCredit}</a>{#if bird.soundLicense}<a href={bird.soundLicense} target="_blank" rel="noreferrer" class="text-[10px] text-[#78847a] underline decoration-[#abb4a6] underline-offset-2 hover:text-[#315b4e]">License</a>{/if}</div>
    </div>
  </div>
{/if}
