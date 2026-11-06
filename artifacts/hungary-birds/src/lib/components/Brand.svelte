<script lang="ts">
  import { base } from '$app/paths';
  import { Bird } from '@lucide/svelte';

  let { inverse = false }: { inverse?: boolean } = $props();
</script>

<a href={`${base}/`} data-testid="link-home-logo" class={`inline-flex items-center gap-3 ${inverse ? 'text-[#f6f2e7]' : 'text-[#2b4840]'}`}>
  <span class="grid size-10 place-items-center rounded-full border border-current/25"><Bird size={20} strokeWidth={1.6} /></span>
  <span class="leading-none"><span class="serif block text-[19px] font-semibold tracking-[-.035em]">Birds of Hungary</span><span class="mono mt-1 block text-[8px] uppercase tracking-[.19em] opacity-65">Field guide · Magyarország</span></span>
</a>
