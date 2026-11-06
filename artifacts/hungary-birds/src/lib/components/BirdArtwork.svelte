<script lang="ts">
  import type { Bird } from '../../birds';

  let { bird, large = false }: { bird: Bird; large?: boolean } = $props();
  let imageFailed = $state(false);
</script>

<div class={`bird-mark relative isolate overflow-hidden ${large ? 'h-[220px] sm:h-[275px]' : 'h-[145px]'}`} class:has-photo={bird.image && !imageFailed}>
  {#if bird.image && !imageFailed}
    <img src={bird.image} alt={`${bird.en} (${bird.latin})`} loading="lazy" onerror={() => (imageFailed = true)} class="absolute inset-0 size-full object-cover object-center" />
  {/if}
  <div class="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#253d34]/75 to-transparent"></div>
  <span class="absolute left-[12%] top-[18%] h-12 w-12 rounded-full bg-[#f0d5a4]/60 blur-[1px]"></span>
  <span class="absolute right-[12%] top-[16%] text-[8px] uppercase tracking-[.16em] text-white/85 drop-shadow">{bird.category.split(' ')[0]} · HUNGARY</span>
  <span class="absolute bottom-[8%] left-[12%] h-[1px] w-[75%] bg-[#425d50]/75"></span>
</div>
