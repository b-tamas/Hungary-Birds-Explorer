<script lang="ts">
  let { label, value }: { label: string; value: string } = $props();
</script>

<div><p class="mono text-[8px] uppercase tracking-[.15em] text-[#92998e]">{label}</p><p class="mt-1 text-[10px] leading-[1.6] text-[#4c6256]">{value}</p></div>
