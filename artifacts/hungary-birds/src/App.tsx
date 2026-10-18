import { type ReactNode, useEffect, useRef, useState } from 'react';
import { ClerkProvider, Show, SignIn, SignUp, useClerk, useUser } from '@clerk/react';
import { publishableKeyFromHost } from '@clerk/react/internal';
import { shadcn } from '@clerk/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDown, ArrowRight, AudioLines, Bird as BirdIcon, Check, ChevronDown, Compass, Feather, Headphones, Leaf, MapPin, Menu, Pause, Play, Search, Signpost, Sprout, Waves, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import NotFound from '@/pages/not-found';
import { birds, categories, type Bird } from './birds';
import { Route, Switch, useLocation, Router as WouterRouter, Redirect, Link } from 'wouter';

const queryClient = new QueryClient();
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const clerkPubKey = publishableKeyFromHost(window.location.hostname, import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
function stripBase(path: string) {
  return basePath && path.startsWith(basePath) ? path.slice(basePath.length) || '/' : path;
}
if (!clerkPubKey) throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY in .env file');

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: 'clerk',
  options: {
    logoPlacement: 'inside' as const,
    logoLinkUrl: basePath || '/',
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: '#315b4e',
    colorForeground: '#293a35',
    colorMutedForeground: '#69766f',
    colorDanger: '#b4493e',
    colorBackground: '#f8f6ef',
    colorInput: '#fffdf8',
    colorInputForeground: '#293a35',
    colorNeutral: '#d9d8cc',
    fontFamily: 'DM Sans, sans-serif',
    borderRadius: '14px',
  },
  elements: {
    rootBox: 'w-full flex justify-center',
    cardBox: 'bg-[#f8f6ef] rounded-[22px] w-[440px] max-w-full overflow-hidden border border-[#deddd1]',
    card: '!shadow-none !border-0 !bg-transparent !rounded-none',
    footer: '!shadow-none !border-0 !bg-transparent !rounded-none',
    headerTitle: 'text-[#293a35] font-semibold tracking-tight',
    headerSubtitle: 'text-[#69766f]',
    socialButtonsBlockButtonText: 'text-[#293a35] font-medium',
    formFieldLabel: 'text-[#42564e] font-medium',
    footerActionLink: 'text-[#315b4e] font-semibold',
    footerActionText: 'text-[#69766f]',
    dividerText: 'text-[#69766f]',
    identityPreviewEditButton: 'text-[#315b4e]',
    formFieldSuccessText: 'text-[#315b4e]',
    alertText: 'text-[#8e4338]',
    logoBox: 'rounded-full',
    logoImage: 'object-contain',
    socialButtonsBlockButton: 'border border-[#d9d8cc] bg-[#fffdf8] hover:bg-[#f1efe6]',
    formButtonPrimary: 'bg-[#315b4e] hover:bg-[#24483d] text-[#fbf8ef] shadow-none',
    formFieldInput: 'border-[#d9d8cc] bg-[#fffdf8] text-[#293a35]',
    footerAction: 'border-0',
    dividerLine: 'bg-[#e4e0d5]',
    alert: 'bg-[#f8e9e4] border-[#e9c5bc]',
    otpCodeFieldInput: 'border-[#d9d8cc] bg-[#fffdf8]',
    formFieldRow: 'gap-1.5',
    main: 'gap-5',
  },
};

function Brand({ inverse = false }: { inverse?: boolean }) {
  return <Link href="/" data-testid="link-home-logo" className={`inline-flex items-center gap-3 ${inverse ? 'text-[#f6f2e7]' : 'text-[#2b4840]'}`}>
    <span className="grid size-10 place-items-center rounded-full border border-current/25"><BirdIcon size={20} strokeWidth={1.6} /></span>
    <span className="leading-none"><span className="serif block text-[19px] font-semibold tracking-[-.035em]">Birds of Hungary</span><span className="mono mt-1 block text-[8px] uppercase tracking-[.19em] opacity-65">Field guide · Magyarország</span></span>
  </Link>;
}

function Home() {
  const [, setLocation] = useLocation();
  return <main className="grain min-h-[100dvh] overflow-hidden bg-[#f3f0e6]">
    <header className="relative z-10 mx-auto flex max-w-[1380px] items-center justify-between px-5 py-5 sm:px-10 lg:px-16">
      <Brand />
      <nav className="flex items-center gap-3 sm:gap-8">
        <a href="#field-guide" className="hidden text-sm text-[#63726b] transition-colors hover:text-[#2b4840] sm:block">The guide</a>
        <a href="#about" className="hidden text-sm text-[#63726b] transition-colors hover:text-[#2b4840] sm:block">Our approach</a>
        <Link href="/sign-in" data-testid="link-sign-in" className="rounded-full border border-[#cad0c2] px-4 py-2.5 text-[13px] font-semibold text-[#2d5146] transition-colors hover:bg-[#e9e9dd]">Sign in</Link>
        <Link href="/sign-up" data-testid="link-join" className="rounded-full bg-[#315b4e] px-4 py-2.5 text-[13px] font-semibold text-[#fbf8ef] transition-colors hover:bg-[#24483d] sm:px-5">Join the guide</Link>
      </nav>
    </header>
    <section className="relative mx-auto grid max-w-[1380px] grid-cols-1 items-center gap-7 px-5 pb-16 pt-9 sm:px-10 sm:pb-24 md:grid-cols-[.91fr_1.09fr] md:gap-2 md:pt-12 lg:px-16 lg:pb-28">
      <div className="relative z-[1] max-w-[590px] reveal">
        <p className="mono mb-7 flex items-center gap-2 text-[10px] uppercase tracking-[.2em] text-[#8b6c4e]"><span className="h-px w-8 bg-[#a77754]" /> A field guide for curious days outdoors</p>
        <h1 className="serif text-[clamp(3.6rem,8vw,7.6rem)] font-medium leading-[.91] tracking-[-.065em] text-[#263e36]">Know the<br />birds around<br /><span className="text-[#a96347]">you.</span></h1>
        <p className="mt-7 max-w-[405px] text-[16px] leading-[1.8] text-[#64716a]">A thoughtful companion to Hungary’s familiar wild birds. Learn their names, find the field marks, and listen for the call you almost know.</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/sign-up" data-testid="link-start-exploring" className="group flex items-center gap-4 rounded-full bg-[#315b4e] py-3 pl-6 pr-3 text-sm font-semibold text-[#f7f4eb] shadow-[0_9px_22px_rgba(47,78,65,.15)] transition-transform hover:-translate-y-0.5">Start exploring <span className="grid size-9 place-items-center rounded-full bg-[#f2f0e5]/15 transition-transform group-hover:translate-x-0.5"><ArrowRight size={17} /></span></Link>
          <span className="mono text-[10px] uppercase tracking-[.14em] text-[#788179]">Field notes, made friendly</span>
        </div>
        <div className="mt-12 flex items-center gap-4 border-t border-[#d9d8cc] pt-5">
          <span className="grid size-11 place-items-center rounded-full bg-[#e3e5d8] text-[#42665a]"><Compass size={19} /></span>
          <p className="max-w-[280px] text-[12px] leading-5 text-[#738078]">From city courtyards to reed-fringed lakes, get to know who’s sharing the landscape.</p>
        </div>
      </div>
      <div className="relative min-h-[340px] md:min-h-[555px] reveal-delay">
        <div className="absolute -right-[17%] top-1/2 aspect-square w-[112%] -translate-y-1/2 rounded-full border border-[#c8c9b8]/60" />
        <div className="absolute right-[2%] top-[4%] h-[85%] w-[92%] overflow-hidden rounded-[46%_46%_8px_8px] bg-[#b9c7b2] shadow-[0_24px_60px_rgba(59,75,60,.13)]">
          <img src={`${basePath}/alfold-dawn.jpg`} alt="Painted dawn over the Great Hungarian Plain, with storks and starlings among the reeds" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#283c34]/45 via-transparent to-[#f2e7d4]/5" />
          <div className="absolute bottom-5 left-5 text-[#fff8e9] sm:bottom-8 sm:left-8">
            <p className="mono text-[9px] uppercase tracking-[.2em] text-white/75">Landscape 01 · Alföld</p>
            <p className="serif mt-1 text-2xl">Where the sky meets the reeds</p>
            <p className="mt-1 text-[9px] text-white/70">Original field illustration · Birds of Hungary</p>
          </div>
          <div className="absolute right-4 top-6 rounded-full border border-white/50 bg-[#f6f1e3]/75 px-3 py-2 backdrop-blur-sm sm:right-7 sm:top-8"><span className="mono text-[9px] uppercase tracking-[.12em] text-[#38584e]">The Hungarian lowlands</span></div>
        </div>
        <div className="absolute bottom-[2%] left-0 rounded-2xl border border-[#dedbce] bg-[#f8f6ed]/95 p-4 shadow-[0_12px_32px_rgba(53,69,58,.10)] backdrop-blur sm:bottom-[7%] sm:left-[-4%] sm:p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-[#e9ede1] text-[#43685a]"><AudioLines size={17} /></span>
            <div><span className="mono block text-[8px] uppercase tracking-[.18em] text-[#7d857b]">Listen closer</span><span className="serif mt-1 block text-[17px] text-[#30483f]">A song worth knowing</span></div>
          </div>
          <div className="mt-3 flex h-[19px] items-center gap-[3px] text-[#719080]">{Array.from({ length: 36 }, (_, i) => <span key={i} className="w-[2px] rounded-full bg-current" style={{ height: `${4 + (Math.sin(i * 2.1) + 1) * 6}px` }} />)}</div>
        </div>
        <div className="absolute right-0 top-[41%] hidden rounded-xl border border-[#d6d4c7] bg-[#f5f1e5]/90 px-4 py-3 shadow-md sm:block">
          <span className="mono text-[9px] uppercase tracking-[.16em] text-[#9a6b4c]">Today’s familiar face</span>
          <p className="serif mt-1 text-[18px] text-[#2b4840]">Fehér gólya</p>
          <p className="text-[10px] text-[#778179]">White stork · Ciconia ciconia</p>
        </div>
      </div>
      <a href="#field-guide" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[.16em] text-[#79847b] md:flex"><ArrowDown size={13} /> Follow the season</a>
    </section>

    <section id="field-guide" className="border-y border-[#deddd1] bg-[#e9e9dd]">
      <div className="mx-auto grid max-w-[1380px] grid-cols-1 gap-10 px-5 py-14 sm:px-10 md:grid-cols-[.7fr_1.3fr] md:items-center md:py-20 lg:px-16">
        <div><p className="mono text-[10px] uppercase tracking-[.2em] text-[#a16b4c]">A little closer, every day</p><h2 className="serif mt-4 max-w-[460px] text-4xl leading-[1.05] tracking-[-.04em] text-[#2b443b] sm:text-5xl">The birds you meet have stories.</h2></div>
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-3 sm:gap-5">
          {[{ icon: Feather, title: 'Know what to notice', body: 'Clear field marks, plain language, and the details that separate one bird from another.' }, { icon: Headphones, title: 'Hear the difference', body: 'Listen to real recordings where available; every call note tells you when a sound is missing.' }, { icon: MapPin, title: 'Meet them at home', body: 'Find familiar species across Hungary’s gardens, woods, open fields and wetlands.' }].map((item) => <article key={item.title} className="border-l border-[#c8cabc] pl-5"><item.icon size={17} className="text-[#547466]" /><h3 className="serif mt-4 text-[19px] text-[#30483e]">{item.title}</h3><p className="mt-2 text-[12px] leading-6 text-[#717b71]">{item.body}</p></article>)}
        </div>
      </div>
    </section>

    <section id="about" className="mx-auto grid max-w-[1380px] grid-cols-1 gap-10 px-5 py-16 sm:px-10 sm:py-24 md:grid-cols-2 md:items-center lg:px-16">
      <div className="relative min-h-[270px] overflow-hidden rounded-[3px] bg-[#d5dacb] p-8 sm:min-h-[350px] sm:p-12">
        <div className="absolute -right-16 -top-20 size-80 rounded-full border border-[#85988a]/45" /><div className="absolute -right-5 -top-8 size-56 rounded-full border border-[#85988a]/45" />
        <p className="mono relative text-[10px] uppercase tracking-[.2em] text-[#7c694e]">A guide that listens</p>
        <h2 className="serif relative mt-7 max-w-sm text-4xl leading-[1.02] tracking-[-.04em] text-[#2e4c40] sm:text-5xl">Field-ready facts.<br />A human voice.</h2>
        <div className="relative mt-8 flex items-center gap-2 text-[12px] text-[#68766c]"><Sprout size={16} /> For first sightings and familiar friends alike</div>
        <div className="absolute -bottom-7 right-6 rotate-[-8deg] text-[120px] leading-none text-[#a96347]/20"><Feather size={110} strokeWidth={.7} /></div>
      </div>
      <div className="md:pl-9"><span className="mono text-[10px] uppercase tracking-[.2em] text-[#a16b4c]">Made for the moment</span><h2 className="serif mt-4 text-4xl leading-[1.04] tracking-[-.045em] text-[#293f37] sm:text-5xl">That flash of colour.<br />That note in the trees.</h2><p className="mt-6 max-w-[485px] text-[14px] leading-7 text-[#68766e]">You don’t need to know every Latin name to begin. Start with the bird at the feeder, the silhouette above a field, or a song that follows you home. Each entry pairs Hungarian and English names with useful details you can carry outside.</p><Link href="/sign-up" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#315b4e] hover:text-[#a96347]">Open the field guide <ArrowRight size={16} /></Link></div>
    </section>
    <section className="bg-[#2b463c] px-5 py-14 text-[#f4f1e6] sm:px-10 sm:py-20">
      <div className="mx-auto flex max-w-[1380px] flex-col justify-between gap-8 md:flex-row md:items-end lg:px-6">
        <div><p className="mono text-[10px] uppercase tracking-[.2em] text-[#c9aa82]">Your next walk, with new eyes</p><h2 className="serif mt-3 max-w-2xl text-4xl leading-[1] tracking-[-.04em] sm:text-6xl">A familiar place can<br className="hidden sm:block" /> hold a new discovery.</h2></div>
        <Link href="/sign-up" data-testid="link-explore-the-guide" className="group flex w-fit items-center gap-5 rounded-full border border-[#bdc9b7]/40 px-5 py-3 text-sm transition-colors hover:bg-white/10">Meet your neighbours <span className="grid size-8 place-items-center rounded-full bg-[#e8b47c] text-[#294438]"><ArrowRight size={16} /></span></Link>
      </div>
    </section>
    <footer className="flex flex-col justify-between gap-4 bg-[#253d34] px-5 py-6 text-[#e7e6d9]/65 sm:flex-row sm:px-10 lg:px-[calc((100%-1248px)/2)]"><Brand inverse /><span className="mono self-end text-[9px] uppercase tracking-[.15em] sm:self-center">For the birds around us · Hungary</span></footer>
  </main>;
}

function AuthPage({ signUp = false }: { signUp?: boolean }) {
  return <main className="grain flex min-h-[100dvh] flex-col bg-[#e8e8dc]">
    <div className="flex items-center justify-between px-5 py-5 sm:px-10"><Brand /><Link href="/" className="text-[12px] text-[#68756d] hover:text-[#315b4e]">Back to the field guide</Link></div>
    <div className="mx-auto grid w-full max-w-[1160px] flex-1 grid-cols-1 items-center gap-8 px-4 pb-10 sm:px-8 md:grid-cols-[.85fr_1.15fr] md:gap-10">
      <div className="hidden px-5 md:block"><span className="mono text-[10px] uppercase tracking-[.2em] text-[#a16b4c]">A field companion</span><h1 className="serif mt-5 text-5xl leading-[1.02] tracking-[-.05em] text-[#2d483e]">Come closer<br />to the wild.</h1><p className="mt-5 max-w-sm text-[14px] leading-7 text-[#69776e]">A growing guide to the birds that make Hungary home. Start with a name; leave knowing a little more.</p><div className="mt-9 flex items-center gap-3 border-t border-[#d5d6c9] pt-5 text-[11px] text-[#7b8379]"><Waves size={15} className="text-[#557768]" /> Real calls, careful details, the names we share</div></div>
      <div className="flex flex-col items-center gap-5">
        <p className="mono text-[9px] uppercase tracking-[.2em] text-[#8a7460] md:hidden">Your field guide begins here</p>
        {signUp ? <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} /> : <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} />}
        <p className="max-w-sm text-center text-[10px] leading-5 text-[#7f877d]">Continue with email or a provider available in your account settings.</p>
      </div>
    </div>
  </main>;
}

function SoundControl({ bird, compact = false }: { bird: Bird; compact?: boolean }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const audio = ref.current;
    if (!audio) return;
    const ended = () => setPlaying(false);
    const failed = () => { setPlaying(false); setError(true); };
    audio.addEventListener('ended', ended);
    audio.addEventListener('error', failed);
    return () => { audio.removeEventListener('ended', ended); audio.removeEventListener('error', failed); };
  }, [bird.id]);
  const toggle = async () => {
    const audio = ref.current;
    if (!audio || !bird.sound || error) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else {
      try { await audio.play(); setPlaying(true); }
      catch { setError(true); }
    }
  };
  if (!bird.sound) return <div className={`flex items-center gap-3 rounded-xl border border-[#deddd1] bg-[#f2f0e7] ${compact ? 'px-3 py-2' : 'p-4'}`} data-testid={`status-audio-unavailable-${bird.id}`}>
    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e3e4da] text-[#768078]"><AudioLines size={16} /></span>
    <div><p className="text-[12px] font-semibold text-[#4a5d54]">Recording unavailable</p>{!compact && <p className="mt-0.5 text-[10px] text-[#81877e]">No verified recording is linked for this species yet.</p>}</div>
  </div>;
  return <div className={`flex items-center gap-3 rounded-xl border border-[#d8ddd0] bg-[#edf0e6] ${compact ? 'px-3 py-2' : 'p-4'}`}>
    <audio ref={ref} src={bird.sound} preload="none" />
    <button type="button" onClick={toggle} aria-label={playing ? `Pause ${bird.en} recording` : `Play ${bird.en} recording`} data-testid={`button-play-audio-${bird.id}`} className="grid size-9 shrink-0 place-items-center rounded-full bg-[#315b4e] text-white transition-transform hover:scale-105">{playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}</button>
    <div className="min-w-0 flex-1"><div className="flex items-center gap-2"><p className="text-[12px] font-semibold text-[#40594d]">{error ? 'Recording could not be loaded' : playing ? 'Now playing' : 'Listen to the call'}</p>{playing && <div className="audio-wave flex h-3 items-center gap-[2px] text-[#719080]">{Array.from({ length: 8 }, (_, index) => <span key={index} style={{ height: `${5 + index % 4 * 2}px` }} />)}</div>}</div><div className="mt-0.5 flex min-w-0 flex-wrap gap-x-2"><a href={bird.soundSource} target="_blank" rel="noreferrer" className="truncate text-[10px] text-[#78847a] underline decoration-[#abb4a6] underline-offset-2 hover:text-[#315b4e]">{bird.soundCredit}</a>{bird.soundLicense && <a href={bird.soundLicense} target="_blank" rel="noreferrer" className="text-[10px] text-[#78847a] underline decoration-[#abb4a6] underline-offset-2 hover:text-[#315b4e]">License</a>}</div></div>
  </div>;
}

function BirdArtwork({ bird, large = false }: { bird: Bird; large?: boolean }) {
  return <div aria-hidden="true" className={`bird-mark relative isolate overflow-hidden ${large ? 'h-[220px] sm:h-[275px]' : 'h-[145px]'}`}>
    <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-[#425f51]/25 to-transparent" />
    <span className="absolute left-[12%] top-[18%] h-12 w-12 rounded-full bg-[#f0d5a4]/60 blur-[1px]" />
    <span className="absolute right-[12%] top-[16%] text-[8px] uppercase tracking-[.16em] text-[#f8f1df]/80">{bird.category.split(' ')[0]} · HUNGARY</span>
    <span className="absolute bottom-[8%] left-[12%] h-[1px] w-[75%] bg-[#425d50]/75" />
  </div>;
}

function Portal() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All birds');
  const [selected, setSelected] = useState(birds[0]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const results = birds.filter((bird) => {
    const search = `${bird.en} ${bird.hu} ${bird.latin} ${bird.habitat}`.toLowerCase();
    return (filter === 'All birds' || bird.category === filter) && search.includes(query.trim().toLowerCase());
  });
  const activeBird = results.find((bird) => bird.id === selected.id) ?? results[0] ?? selected;
  const menu = <div className="flex flex-col gap-1.5">
    <p className="mono mb-2 px-3 text-[9px] uppercase tracking-[.18em] text-[#8f988e]">Explore by place</p>
    {categories.map((category, index) => {
      const Icon = index === 0 ? Compass : index === 1 ? Sprout : index === 2 ? Waves : index === 3 ? Leaf : Signpost;
      return <button key={category} type="button" onClick={() => { setFilter(category); setMobileMenu(false); }} data-testid={`button-filter-${index}`} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] transition-colors ${filter === category ? 'bg-[#e7e9de] font-semibold text-[#315b4e]' : 'text-[#67766d] hover:bg-[#f0f0e7]'}`}><Icon size={15} />{category}<span className="mono ml-auto text-[9px] opacity-55">{category === 'All birds' ? birds.length : birds.filter((bird) => bird.category === category).length}</span></button>;
    })}
  </div>;
  return <main className="grain min-h-[100dvh] bg-[#f3f1e8]">
    <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-[#dcddd1] bg-[#f6f4ec]/95 px-4 backdrop-blur-md sm:px-7">
      <div className="flex items-center gap-3"><button type="button" aria-label="Open filters" onClick={() => setMobileMenu(!mobileMenu)} className="grid size-9 place-items-center rounded-lg text-[#526b5d] hover:bg-[#e8e9de] md:hidden">{mobileMenu ? <X size={18} /> : <Menu size={18} />}</button><Brand /></div>
      <div className="flex items-center gap-3"><span className="hidden text-[11px] text-[#78847c] sm:block">{user?.firstName ? `Welcome, ${user.firstName}` : 'Your bird field guide'}</span><button type="button" onClick={() => signOut({ redirectUrl: basePath || '/' })} data-testid="button-sign-out" className="rounded-full border border-[#d6d9cd] px-3.5 py-2 text-[11px] font-semibold text-[#4e6559] hover:bg-[#eaebe1]">Sign out</button></div>
    </header>
    {mobileMenu && <div className="fixed inset-x-0 top-[68px] z-20 border-b border-[#d8d9ce] bg-[#f6f4ec] p-5 shadow-lg md:hidden">{menu}</div>}
    <div className="mx-auto grid max-w-[1440px] grid-cols-1 md:grid-cols-[210px_minmax(0,1fr)] lg:grid-cols-[228px_minmax(0,1fr)]">
      <aside className="sticky top-[68px] hidden h-[calc(100dvh-68px)] flex-col border-r border-[#dedfd3] px-4 py-8 md:flex lg:px-6">{menu}<div className="mt-auto rounded-xl bg-[#e9e9de] p-4"><p className="mono text-[9px] uppercase tracking-[.16em] text-[#9a6d4c]">Out there</p><p className="serif mt-2 text-lg leading-tight text-[#365248]">A good walk starts with looking up.</p><p className="mt-2 text-[10px] leading-5 text-[#7b857b]">Keep a little space between you and the birds. Watching quietly is the best way to learn.</p></div></aside>
      <div className="min-w-0 px-4 pb-12 pt-7 sm:px-7 sm:pt-9 lg:px-10">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mono text-[9px] uppercase tracking-[.21em] text-[#a16b4c]">Your field guide · Hungary</p><h1 className="serif mt-2 text-[40px] leading-none tracking-[-.05em] text-[#2b443b] sm:text-[48px]">Birds around us<span className="text-[#ad7352]">.</span></h1><p className="mt-3 text-[12px] text-[#758077]">A field companion for the familiar and the newly noticed.</p></div><div className="mono flex items-center gap-2 text-[10px] uppercase tracking-[.12em] text-[#77837b]"><span className="size-1.5 rounded-full bg-[#a4734e]" /> {results.length} species in view</div></div>
        <div className="mt-7 flex flex-col gap-3 border-y border-[#dcded1] py-4 sm:flex-row sm:items-center">
          <label className="relative block flex-1"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#809084]" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, place or Latin…" data-testid="input-search-birds" className="h-11 w-full rounded-lg border border-[#d9dbcf] bg-[#fbfaf4] pl-10 pr-4 text-[12px] text-[#334b40] outline-none transition-colors placeholder:text-[#98a097] focus:border-[#739080] focus:ring-2 focus:ring-[#789381]/15" /></label>
          <div className="relative sm:w-[210px]"><label htmlFor="habitat-filter" className="sr-only">Filter birds by habitat</label><select id="habitat-filter" value={filter} onChange={(event) => setFilter(event.target.value)} data-testid="select-habitat-filter" className="h-11 w-full appearance-none rounded-lg border border-[#d9dbcf] bg-[#fbfaf4] px-4 pr-10 text-[12px] text-[#53695c] outline-none focus:border-[#739080]">{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#77857a]" /></div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-7 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,.8fr)]">
          <section aria-label="Bird species" className="min-w-0">
            {results.length === 0 ? <div className="flex min-h-[310px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#cfd3c6] bg-[#f7f5ed] px-6 text-center" data-testid="empty-bird-results"><span className="grid size-12 place-items-center rounded-full bg-[#e8ebdf] text-[#587565]"><Search size={19} /></span><h2 className="serif mt-4 text-2xl text-[#354c41]">No birds found</h2><p className="mt-2 text-[12px] text-[#79847b]">Try another name or choose a different habitat.</p><button type="button" onClick={() => { setQuery(''); setFilter('All birds'); }} className="mt-5 rounded-full border border-[#cbd2c5] px-4 py-2 text-[11px] font-semibold text-[#456354] hover:bg-[#e8ebdf]">Clear search</button></div> :
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3">
                {results.map((bird, index) => <button type="button" key={bird.id} onClick={() => setSelected(bird)} data-testid={`card-bird-${bird.id}`} className={`bird-card group overflow-hidden rounded-xl border text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_9px_20px_rgba(40,64,52,.08)] ${activeBird.id === bird.id ? 'border-[#799487] ring-1 ring-[#799487]/30' : 'border-[#dedfd4] bg-[#fbfaf4]'}`}>
                  <BirdArtwork bird={bird} />
                  <div className="p-4"><div className="flex items-start justify-between gap-2"><div><span className="mono text-[8px] uppercase tracking-[.16em] text-[#a06b4c]">{bird.category}</span><h2 className="serif mt-1 text-[20px] leading-tight text-[#30483e]">{bird.hu}</h2><p className="mt-0.5 text-[11px] text-[#718077]">{bird.en}</p></div><span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full border border-[#e0e2d8] text-[#728176] transition-colors group-hover:border-[#b1c2b5] group-hover:text-[#315b4e]"><ArrowRight size={13} /></span></div><div className="mt-4 flex items-center justify-between gap-2 border-t border-[#e6e5da] pt-3"><span className="truncate text-[10px] italic text-[#879087]">{bird.latin}</span><span className="mono shrink-0 text-[8px] text-[#8a9288]">NO. {String(index + 1).padStart(2, '0')}</span></div></div>
                </button>)}
              </div>}
          </section>
          {results.length > 0 && <aside className="min-w-0" aria-label="Selected bird details">
            <article key={activeBird.id} className="overflow-hidden rounded-2xl border border-[#d9dbcf] bg-[#fbfaf4] shadow-[0_8px_28px_rgba(44,59,48,.045)] reveal">
              <div className="relative"><BirdArtwork bird={activeBird} large /><div className="absolute bottom-4 left-5 text-[#fff8ea]"><span className="mono text-[9px] uppercase tracking-[.16em] text-white/75">Field note</span><p className="serif mt-0.5 text-2xl">{activeBird.hu}</p></div><button onClick={() => setSelected(results[(results.findIndex((b) => b.id === activeBird.id) + 1) % results.length])} aria-label="Next bird" data-testid="button-next-bird" className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/45 bg-[#f8f5eb]/75 text-[#365447] backdrop-blur hover:bg-white"><ArrowRight size={15} /></button></div>
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="serif text-[28px] leading-tight tracking-[-.03em] text-[#2d473d]">{activeBird.en}</h2><p className="mt-1 text-[12px] italic text-[#758178]">{activeBird.latin}</p></div><span className="rounded-full bg-[#e9eee4] px-3 py-1.5 text-[9px] font-semibold text-[#536e5d]">{activeBird.status}</span></div>
                <p className="mt-4 border-l-2 border-[#c28c68] pl-3 text-[12px] leading-[1.8] text-[#596a60]">{activeBird.traits}</p>
                <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-y border-[#e5e4d9] py-4">
                  <Fact label="Habitat" value={activeBird.habitat} />
                  <Fact label="Diet" value={activeBird.diet} />
                  <Fact label="Body length" value={activeBird.size} />
                  <Fact label="Wingspan" value={activeBird.wingspan} />
                  <Fact label="Migration" value={activeBird.migration} />
                  <Fact label="Conservation" value={activeBird.status} />
                </div>
                <div className="mt-4"><span className="mono text-[8px] uppercase tracking-[.17em] text-[#9a6c4b]">A sound to remember</span><p className="mb-3 mt-1.5 text-[11px] leading-5 text-[#69776d]">{activeBird.call}</p><SoundControl bird={activeBird} /></div>
                <div className="mt-4 flex items-start gap-2 text-[9px] leading-4 text-[#91968b]"><Check size={12} className="mt-0.5 shrink-0 text-[#718676]" /><span>Species notes are compiled from established natural-history references. Recording and photo credits are shown with their media.</span></div>
              </div>
            </article>
          </aside>}
        </div>
        <footer className="mt-11 flex flex-col justify-between gap-3 border-t border-[#dcded1] pt-4 text-[9px] text-[#848d82] sm:flex-row"><span>For quiet looking and good questions.</span><span className="mono uppercase tracking-[.14em]">Birds of Hungary · Field guide</span></footer>
      </div>
    </div>
  </main>;
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div><p className="mono text-[8px] uppercase tracking-[.15em] text-[#92998e]">{label}</p><p className="mt-1 text-[10px] leading-[1.6] text-[#4c6256]">{value}</p></div>;
}

function HomeRedirect() {
  return <><Show when="signed-in"><Redirect to="/user-portal" /></Show><Show when="signed-out"><Home /></Show></>;
}
function UserPortalRoute() {
  return <><Show when="signed-in"><Portal /></Show><Show when="signed-out"><Redirect to="/" /></Show></>;
}
function Router() {
  return <Switch>
    <Route path="/" component={HomeRedirect} />
    <Route path="/user-portal" component={UserPortalRoute} />
    <Route path="/sign-in/*?" component={() => <AuthPage />} />
    <Route path="/sign-up/*?" component={() => <AuthPage signUp />} />
    <Route component={NotFound} />
  </Switch>;
}
function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}
function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();
  return <ClerkProvider publishableKey={clerkPubKey} proxyUrl={clerkProxyUrl} appearance={clerkAppearance} signInUrl={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} localization={{ signIn: { start: { title: 'Welcome back', subtitle: 'Pick up where your birdwatching left off.' } }, signUp: { start: { title: 'Start your field guide', subtitle: 'A curious eye is all you need.' } } }} routerPush={(to) => setLocation(stripBase(to))} routerReplace={(to) => setLocation(stripBase(to), { replace: true })}>
    <QueryClientProvider client={queryClient}>
      <RoutedErrorBoundary>
        <Router />
      </RoutedErrorBoundary>
    </QueryClientProvider>
  </ClerkProvider>;
}
function App() {
  return <WouterRouter base={basePath}><ClerkProviderWithRoutes /></WouterRouter>;
}
export default App;
