<script lang="ts">
  import { base } from '$app/paths';
  import { ArrowRight, Check, ChevronDown, Compass, Leaf, Menu, Search, Signpost, Sprout, Waves, X } from '@lucide/svelte';
  import { birds, categories, type Bird } from '../../birds';
  import BirdArtwork from '../../lib/components/BirdArtwork.svelte';
  import BirdFact from '../../lib/components/BirdFact.svelte';
  import Brand from '../../lib/components/Brand.svelte';
  import SoundControl from '../../lib/components/SoundControl.svelte';

  const iconComponents = [Compass, Sprout, Waves, Leaf, Signpost];
  const categoryCounts = new Map(categories.map((category) => [category, category === 'All birds' ? birds.length : birds.filter((bird) => bird.category === category).length]));
  let query = $state('');
  let filter = $state('All birds');
  let selectedBirdId = $state(birds[0].id);
  let mobileMenu = $state(false);

  const results = $derived(birds.filter((bird) => {
    const search = `${bird.en} ${bird.hu} ${bird.latin} ${bird.habitat}`.toLowerCase();
    return (filter === 'All birds' || bird.category === filter) && search.includes(query.trim().toLowerCase());
  }));
  const activeBird = $derived(results.find((bird) => bird.id === selectedBirdId) ?? results[0] ?? birds[0]);

  function chooseFilter(category: string) {
    filter = category;
    mobileMenu = false;
  }

  function selectNextBird() {
    const activeIndex = results.findIndex((bird) => bird.id === activeBird.id);
    selectedBirdId = results[(activeIndex + 1) % results.length].id;
  }
</script>

<svelte:head>
  <title>Birds around us · Birds of Hungary field guide</title>
  <meta name="description" content="Search and explore familiar birds of Hungary by name, habitat, field marks, and call." />
</svelte:head>

{#snippet filterMenu()}
  <div class="flex flex-col gap-1.5">
    <p class="mono mb-2 px-3 text-[9px] uppercase tracking-[.18em] text-[#8f988e]">Explore by place</p>
    {#each categories as category, index}
      {@const CategoryIcon = iconComponents[index]}
      <button type="button" onclick={() => chooseFilter(category)} data-testid={`button-filter-${index}`} class={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] transition-colors ${filter === category ? 'bg-[#e7e9de] font-semibold text-[#315b4e]' : 'text-[#67766d] hover:bg-[#f0f0e7]'}`}>
        <CategoryIcon size={15} />{category}<span class="mono ml-auto text-[9px] opacity-55">{categoryCounts.get(category)}</span>
      </button>
    {/each}
  </div>
{/snippet}

<main class="grain min-h-[100dvh] bg-[#f3f1e8]">
  <header class="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-[#dcddd1] bg-[#f6f4ec]/95 px-4 backdrop-blur-md sm:px-7">
    <div class="flex items-center gap-3">
      <button type="button" aria-label={mobileMenu ? 'Close filters' : 'Open filters'} onclick={() => (mobileMenu = !mobileMenu)} class="grid size-9 place-items-center rounded-lg text-[#526b5d] hover:bg-[#e8e9de] md:hidden">{#if mobileMenu}<X size={18} />{:else}<Menu size={18} />{/if}</button>
      <Brand />
    </div>
    <span class="hidden text-[11px] text-[#78847c] sm:block">Your bird field guide</span>
  </header>

  {#if mobileMenu}<div class="fixed inset-x-0 top-[68px] z-20 border-b border-[#d8d9ce] bg-[#f6f4ec] p-5 shadow-lg md:hidden">{@render filterMenu()}</div>{/if}

  <div class="mx-auto grid max-w-[1440px] grid-cols-1 md:grid-cols-[210px_minmax(0,1fr)] lg:grid-cols-[228px_minmax(0,1fr)]">
    <aside class="sticky top-[68px] hidden h-[calc(100dvh-68px)] flex-col border-r border-[#dedfd3] px-4 py-8 md:flex lg:px-6">
      {@render filterMenu()}
      <div class="mt-auto rounded-xl bg-[#e9e9de] p-4"><p class="mono text-[9px] uppercase tracking-[.16em] text-[#9a6d4c]">Out there</p><p class="serif mt-2 text-lg leading-tight text-[#365248]">A good walk starts with looking up.</p><p class="mt-2 text-[10px] leading-5 text-[#7b857b]">Keep a little space between you and the birds. Watching quietly is the best way to learn.</p></div>
    </aside>

    <div class="min-w-0 px-4 pb-12 pt-7 sm:px-7 sm:pt-9 lg:px-10">
      <div class="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><p class="mono text-[9px] uppercase tracking-[.21em] text-[#a16b4c]">Your field guide · Hungary</p><h1 class="serif mt-2 text-[40px] leading-none tracking-[-.05em] text-[#2b443b] sm:text-[48px]">Birds around us<span class="text-[#ad7352]">.</span></h1><p class="mt-3 text-[12px] text-[#758077]">A field companion for the familiar and the newly noticed.</p></div>
        <div class="mono flex items-center gap-2 text-[10px] uppercase tracking-[.12em] text-[#77837b]"><span class="size-1.5 rounded-full bg-[#a4734e]"></span>{results.length} species in view</div>
      </div>

      <div class="mt-7 flex flex-col gap-3 border-y border-[#dcded1] py-4 sm:flex-row sm:items-center">
        <label class="relative block flex-1"><Search size={16} class="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#809084]" /><input type="search" bind:value={query} placeholder="Search by name, place or Latin…" data-testid="input-search-birds" class="h-11 w-full rounded-lg border border-[#d9dbcf] bg-[#fbfaf4] pl-10 pr-4 text-[12px] text-[#334b40] outline-none transition-colors placeholder:text-[#98a097] focus:border-[#739080] focus:ring-2 focus:ring-[#789381]/15" /></label>
        <div class="relative sm:w-[210px]"><label for="habitat-filter" class="sr-only">Filter birds by habitat</label><select id="habitat-filter" bind:value={filter} data-testid="select-habitat-filter" class="h-11 w-full appearance-none rounded-lg border border-[#d9dbcf] bg-[#fbfaf4] px-4 pr-10 text-[12px] text-[#53695c] outline-none focus:border-[#739080]">{#each categories as category}<option value={category}>{category}</option>{/each}</select><ChevronDown size={15} class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#77857a]" /></div>
      </div>

      <div class="mt-6 grid grid-cols-1 gap-7 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,.8fr)]">
        <section aria-label="Bird species" class="min-w-0">
          {#if results.length === 0}
            <div class="flex min-h-[310px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#cfd3c6] bg-[#f7f5ed] px-6 text-center" data-testid="empty-bird-results"><span class="grid size-12 place-items-center rounded-full bg-[#e8ebdf] text-[#587565]"><Search size={19} /></span><h2 class="serif mt-4 text-2xl text-[#354c41]">No birds found</h2><p class="mt-2 text-[12px] text-[#79847b]">Try another name or choose a different habitat.</p><button type="button" onclick={() => { query = ''; filter = 'All birds'; }} class="mt-5 rounded-full border border-[#cbd2c5] px-4 py-2 text-[11px] font-semibold text-[#456354] hover:bg-[#e8ebdf]">Clear search</button></div>
          {:else}
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3">
              {#each results as bird, index (bird.id)}
                <button type="button" onclick={() => (selectedBirdId = bird.id)} data-testid={`card-bird-${bird.id}`} class={`bird-card group overflow-hidden rounded-xl border text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_9px_20px_rgba(40,64,52,.08)] ${activeBird.id === bird.id ? 'border-[#799487] ring-1 ring-[#799487]/30' : 'border-[#dedfd4] bg-[#fbfaf4]'}`}>
                  <BirdArtwork {bird} />
                  <div class="p-4"><div class="flex items-start justify-between gap-2"><div><span class="mono text-[8px] uppercase tracking-[.16em] text-[#a06b4c]">{bird.category}</span><h2 class="serif mt-1 text-[20px] leading-tight text-[#30483e]">{bird.hu}</h2><p class="mt-0.5 text-[11px] text-[#718077]">{bird.en}</p></div><span class="mt-1 grid size-7 shrink-0 place-items-center rounded-full border border-[#e0e2d8] text-[#728176] transition-colors group-hover:border-[#b1c2b5] group-hover:text-[#315b4e]"><ArrowRight size={13} /></span></div><div class="mt-4 flex items-center justify-between gap-2 border-t border-[#e6e5da] pt-3"><span class="truncate text-[10px] italic text-[#879087]">{bird.latin}</span><span class="mono shrink-0 text-[8px] text-[#8a9288]">NO. {String(index + 1).padStart(2, '0')}</span></div></div>
                </button>
              {/each}
            </div>
          {/if}
        </section>

        {#if results.length > 0}
          <aside class="min-w-0" aria-label="Selected bird details">
            <article class="overflow-hidden rounded-2xl border border-[#d9dbcf] bg-[#fbfaf4] shadow-[0_8px_28px_rgba(44,59,48,.045)] reveal">
              <div class="relative"><BirdArtwork bird={activeBird} large /><div class="absolute bottom-4 left-5 text-[#fff8ea]"><span class="mono text-[9px] uppercase tracking-[.16em] text-white/75">Field note</span><p class="serif mt-0.5 text-2xl">{activeBird.hu}</p></div><button type="button" onclick={selectNextBird} aria-label="Next bird" data-testid="button-next-bird" class="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/45 bg-[#f8f5eb]/75 text-[#365447] backdrop-blur hover:bg-white"><ArrowRight size={15} /></button></div>
              <div class="p-5 sm:p-6">
                {#if activeBird.imageSource && activeBird.imageCredit}<p class="mb-4 flex flex-wrap gap-x-1 text-[9px] leading-4 text-[#879087]"><span>Photo:</span><a href={activeBird.imageSource} target="_blank" rel="noreferrer" class="underline decoration-[#abb4a6] underline-offset-2 hover:text-[#315b4e]">{activeBird.imageCredit} · Wikimedia Commons</a>{#if activeBird.imageLicense && activeBird.imageLicenseUrl}<span>·</span><a href={activeBird.imageLicenseUrl} target="_blank" rel="noreferrer" class="underline decoration-[#abb4a6] underline-offset-2 hover:text-[#315b4e]">{activeBird.imageLicense}</a>{/if}</p>{/if}
                <div class="flex flex-wrap items-start justify-between gap-3"><div><h2 class="serif text-[28px] leading-tight tracking-[-.03em] text-[#2d473d]">{activeBird.en}</h2><p class="mt-1 text-[12px] italic text-[#758178]">{activeBird.latin}</p></div><span class="rounded-full bg-[#e9eee4] px-3 py-1.5 text-[9px] font-semibold text-[#536e5d]">{activeBird.status}</span></div>
                <p class="mt-4 border-l-2 border-[#c28c68] pl-3 text-[12px] leading-[1.8] text-[#596a60]">{activeBird.traits}</p>
                <div class="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-y border-[#e5e4d9] py-4"><BirdFact label="Habitat" value={activeBird.habitat} /><BirdFact label="Diet" value={activeBird.diet} /><BirdFact label="Body length" value={activeBird.size} /><BirdFact label="Wingspan" value={activeBird.wingspan} /><BirdFact label="Migration" value={activeBird.migration} /><BirdFact label="Conservation" value={activeBird.status} /></div>
                <div class="mt-4"><span class="mono text-[8px] uppercase tracking-[.17em] text-[#9a6c4b]">A sound to remember</span><p class="mb-3 mt-1.5 text-[11px] leading-5 text-[#69776d]">{activeBird.call}</p><SoundControl bird={activeBird} /></div>
                <div class="mt-4 flex items-start gap-2 text-[9px] leading-4 text-[#91968b]"><Check size={12} class="mt-0.5 shrink-0 text-[#718676]" /><span>Species notes are compiled from established natural-history references. Recording and photo credits are shown with their media.</span></div>
              </div>
            </article>
          </aside>
        {/if}
      </div>
      <footer class="mt-11 flex flex-col justify-between gap-3 border-t border-[#dcded1] pt-4 text-[9px] text-[#848d82] sm:flex-row"><span>For quiet looking and good questions.</span><span class="mono uppercase tracking-[.14em]">Birds of Hungary · Field guide</span></footer>
    </div>
  </div>
</main>
