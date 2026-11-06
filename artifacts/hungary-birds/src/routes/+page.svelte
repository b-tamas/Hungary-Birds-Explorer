<script lang="ts">
  import { base } from '$app/paths';
  import { ArrowDown, ArrowRight, AudioLines, Compass, Feather, Headphones, Leaf, MapPin, Sprout, Waves } from '@lucide/svelte';
  import Brand from '../lib/components/Brand.svelte';

  const guideHref = `${base}/field-guide/`;
  const landscapeImage = `${base}/alfold-dawn.jpg`;
  const waveform = Array.from({ length: 36 }, (_, index) => 4 + (Math.sin(index * 2.1) + 1) * 6);
</script>

<svelte:head>
  <title>Birds of Hungary · A field guide for curious days outdoors</title>
  <meta name="description" content="Meet Hungary’s familiar wild birds. Learn their names, find the field marks, and listen for the calls." />
</svelte:head>

<main class="grain min-h-[100dvh] overflow-hidden bg-[#f3f0e6]">
  <header class="relative z-10 mx-auto flex max-w-[1380px] items-center justify-between px-5 py-5 sm:px-10 lg:px-16">
    <Brand />
    <nav class="flex items-center gap-3 sm:gap-8">
      <a href="#field-guide" class="hidden text-sm text-[#63726b] transition-colors hover:text-[#2b4840] sm:block">The guide</a>
      <a href="#about" class="hidden text-sm text-[#63726b] transition-colors hover:text-[#2b4840] sm:block">Our approach</a>
      <a href={guideHref} data-testid="link-join" class="rounded-full bg-[#315b4e] px-4 py-2.5 text-[13px] font-semibold text-[#fbf8ef] transition-colors hover:bg-[#24483d] sm:px-5">Explore birds</a>
    </nav>
  </header>

  <section class="relative mx-auto grid max-w-[1380px] grid-cols-1 items-center gap-7 px-5 pb-16 pt-9 sm:px-10 sm:pb-24 md:grid-cols-[.91fr_1.09fr] md:gap-2 md:pt-12 lg:px-16 lg:pb-28">
    <div class="relative z-[1] max-w-[590px] reveal">
      <p class="mono mb-7 flex items-center gap-2 text-[10px] uppercase tracking-[.2em] text-[#8b6c4e]"><span class="h-px w-8 bg-[#a77754]"></span>A field guide for curious days outdoors</p>
      <h1 class="serif text-[clamp(3.6rem,8vw,7.6rem)] font-medium leading-[.91] tracking-[-.065em] text-[#263e36]">Know the<br />birds around<br /><span class="text-[#a96347]">you.</span></h1>
      <p class="mt-7 max-w-[405px] text-[16px] leading-[1.8] text-[#64716a]">A thoughtful companion to Hungary’s familiar wild birds. Learn their names, find the field marks, and listen for the call you almost know.</p>
      <div class="mt-8 flex flex-wrap items-center gap-4">
        <a href={guideHref} data-testid="link-start-exploring" class="group flex items-center gap-4 rounded-full bg-[#315b4e] py-3 pl-6 pr-3 text-sm font-semibold text-[#f7f4eb] shadow-[0_9px_22px_rgba(47,78,65,.15)] transition-transform hover:-translate-y-0.5">Start exploring <span class="grid size-9 place-items-center rounded-full bg-[#f2f0e5]/15 transition-transform group-hover:translate-x-0.5"><ArrowRight size={17} /></span></a>
        <span class="mono text-[10px] uppercase tracking-[.14em] text-[#788179]">Field notes, made friendly</span>
      </div>
      <div class="mt-12 flex items-center gap-4 border-t border-[#d9d8cc] pt-5">
        <span class="grid size-11 place-items-center rounded-full bg-[#e3e5d8] text-[#42665a]"><Compass size={19} /></span>
        <p class="max-w-[280px] text-[12px] leading-5 text-[#738078]">From city courtyards to reed-fringed lakes, get to know who’s sharing the landscape.</p>
      </div>
    </div>

    <div class="relative min-h-[340px] md:min-h-[555px] reveal-delay">
      <div class="absolute -right-[17%] top-1/2 aspect-square w-[112%] -translate-y-1/2 rounded-full border border-[#c8c9b8]/60"></div>
      <div class="absolute right-[2%] top-[4%] h-[85%] w-[92%] overflow-hidden rounded-[46%_46%_8px_8px] bg-[#b9c7b2] shadow-[0_24px_60px_rgba(59,75,60,.13)]">
        <img src={landscapeImage} alt="Painted dawn over the Great Hungarian Plain, with storks and starlings among the reeds" class="h-full w-full object-cover object-center" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#283c34]/45 via-transparent to-[#f2e7d4]/5"></div>
        <div class="absolute bottom-5 left-5 text-[#fff8e9] sm:bottom-8 sm:left-8"><p class="mono text-[9px] uppercase tracking-[.2em] text-white/75">Landscape 01 · Alföld</p><p class="serif mt-1 text-2xl">Where the sky meets the reeds</p><p class="mt-1 text-[9px] text-white/70">Original field illustration · Birds of Hungary</p></div>
        <div class="absolute right-4 top-6 rounded-full border border-white/50 bg-[#f6f1e3]/75 px-3 py-2 backdrop-blur-sm sm:right-7 sm:top-8"><span class="mono text-[9px] uppercase tracking-[.12em] text-[#38584e]">The Hungarian lowlands</span></div>
      </div>
      <div class="absolute bottom-[2%] left-0 rounded-2xl border border-[#dedbce] bg-[#f8f6ed]/95 p-4 shadow-[0_12px_32px_rgba(53,69,58,.10)] backdrop-blur sm:bottom-[7%] sm:left-[-4%] sm:p-5">
        <div class="flex items-center gap-3"><span class="grid size-10 place-items-center rounded-full bg-[#e9ede1] text-[#43685a]"><AudioLines size={17} /></span><div><span class="mono block text-[8px] uppercase tracking-[.18em] text-[#7d857b]">Listen closer</span><span class="serif mt-1 block text-[17px] text-[#30483f]">A song worth knowing</span></div></div>
        <div class="mt-3 flex h-[19px] items-center gap-[3px] text-[#719080]">{#each waveform as height}<span class="w-[2px] rounded-full bg-current" style={`height:${height}px`}></span>{/each}</div>
      </div>
      <div class="absolute right-0 top-[41%] hidden rounded-xl border border-[#d6d4c7] bg-[#f5f1e5]/90 px-4 py-3 shadow-md sm:block"><span class="mono text-[9px] uppercase tracking-[.16em] text-[#9a6b4c]">Today’s familiar face</span><p class="serif mt-1 text-[18px] text-[#2b4840]">Fehér gólya</p><p class="text-[10px] text-[#778179]">White stork · Ciconia ciconia</p></div>
    </div>
    <a href="#field-guide" class="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[.16em] text-[#79847b] md:flex"><ArrowDown size={13} />Follow the season</a>
  </section>

  <section id="field-guide" class="border-y border-[#deddd1] bg-[#e9e9dd]">
    <div class="mx-auto grid max-w-[1380px] grid-cols-1 gap-10 px-5 py-14 sm:px-10 md:grid-cols-[.7fr_1.3fr] md:items-center md:py-20 lg:px-16">
      <div><p class="mono text-[10px] uppercase tracking-[.2em] text-[#a16b4c]">A little closer, every day</p><h2 class="serif mt-4 max-w-[460px] text-4xl leading-[1.05] tracking-[-.04em] text-[#2b443b] sm:text-5xl">The birds you meet have stories.</h2></div>
      <div class="grid grid-cols-1 gap-7 sm:grid-cols-3 sm:gap-5">
        <article class="border-l border-[#c8cabc] pl-5"><Feather size={17} class="text-[#547466]" /><h3 class="serif mt-4 text-[19px] text-[#30483e]">Know what to notice</h3><p class="mt-2 text-[12px] leading-6 text-[#717b71]">Clear field marks, plain language, and the details that separate one bird from another.</p></article>
        <article class="border-l border-[#c8cabc] pl-5"><Headphones size={17} class="text-[#547466]" /><h3 class="serif mt-4 text-[19px] text-[#30483e]">Hear the difference</h3><p class="mt-2 text-[12px] leading-6 text-[#717b71]">Listen to real recordings where available; every call note tells you when a sound is missing.</p></article>
        <article class="border-l border-[#c8cabc] pl-5"><MapPin size={17} class="text-[#547466]" /><h3 class="serif mt-4 text-[19px] text-[#30483e]">Meet them at home</h3><p class="mt-2 text-[12px] leading-6 text-[#717b71]">Find familiar species across Hungary’s gardens, woods, open fields and wetlands.</p></article>
      </div>
    </div>
  </section>

  <section id="about" class="mx-auto grid max-w-[1380px] grid-cols-1 gap-10 px-5 py-16 sm:px-10 sm:py-24 md:grid-cols-2 md:items-center lg:px-16">
    <div class="relative min-h-[270px] overflow-hidden rounded-[3px] bg-[#d5dacb] p-8 sm:min-h-[350px] sm:p-12"><div class="absolute -right-16 -top-20 size-80 rounded-full border border-[#85988a]/45"></div><div class="absolute -right-5 -top-8 size-56 rounded-full border border-[#85988a]/45"></div><p class="mono relative text-[10px] uppercase tracking-[.2em] text-[#7c694e]">A guide that listens</p><h2 class="serif relative mt-7 max-w-sm text-4xl leading-[1.02] tracking-[-.04em] text-[#2e4c40] sm:text-5xl">Field-ready facts.<br />A human voice.</h2><div class="relative mt-8 flex items-center gap-2 text-[12px] text-[#68766c]"><Sprout size={16} />For first sightings and familiar friends alike</div><div class="absolute -bottom-7 right-6 rotate-[-8deg] text-[120px] leading-none text-[#a96347]/20"><Feather size={110} strokeWidth={0.7} /></div></div>
    <div class="md:pl-9"><span class="mono text-[10px] uppercase tracking-[.2em] text-[#a16b4c]">Made for the moment</span><h2 class="serif mt-4 text-4xl leading-[1.04] tracking-[-.045em] text-[#293f37] sm:text-5xl">That flash of colour.<br />That note in the trees.</h2><p class="mt-6 max-w-[485px] text-[14px] leading-7 text-[#68766e]">You don’t need to know every Latin name to begin. Start with the bird at the feeder, the silhouette above a field, or a song that follows you home. Each entry pairs Hungarian and English names with useful details you can carry outside.</p><a href={guideHref} class="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#315b4e] hover:text-[#a96347]">Open the field guide <ArrowRight size={16} /></a></div>
  </section>

  <section class="bg-[#2b463c] px-5 py-14 text-[#f4f1e6] sm:px-10 sm:py-20"><div class="mx-auto flex max-w-[1380px] flex-col justify-between gap-8 md:flex-row md:items-end lg:px-6"><div><p class="mono text-[10px] uppercase tracking-[.2em] text-[#c9aa82]">Your next walk, with new eyes</p><h2 class="serif mt-3 max-w-2xl text-4xl leading-[1] tracking-[-.04em] sm:text-6xl">A familiar place can<br class="hidden sm:block" /> hold a new discovery.</h2></div><a href={guideHref} data-testid="link-explore-the-guide" class="group flex w-fit items-center gap-5 rounded-full border border-[#bdc9b7]/40 px-5 py-3 text-sm transition-colors hover:bg-white/10">Meet your neighbours <span class="grid size-8 place-items-center rounded-full bg-[#e8b47c] text-[#294438]"><ArrowRight size={16} /></span></a></div></section>
  <footer class="flex flex-col justify-between gap-4 bg-[#253d34] px-5 py-6 text-[#e7e6d9]/65 sm:flex-row sm:px-10 lg:px-[calc((100%-1248px)/2)]"><Brand inverse /><span class="mono self-end text-[9px] uppercase tracking-[.15em] sm:self-center">For the birds around us · Hungary</span></footer>
</main>
