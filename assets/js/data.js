export const MEDIA_TYPES = ['LP', 'CD', 'Cassette', '7-inch', '12-inch', 'MiniDisc'];
export const CONDITIONS  = ['Mint', 'VG+', 'VG', 'Good', 'Poor'];

export const DEFAULT_CATALOGUE = [
  { id:'1',  title:'Rumours',                         artist:'Fleetwood Mac',    year:1977, label:'Warner Bros.',      mediaType:'LP',       genres:['Rock','Soft Rock'],                    condition:'VG+',  notes:'Original UK pressing.',        tracklist:['Second Hand News','Dreams','Never Going Back Again',"Don't Stop",'Go Your Own Way','The Chain','You Make Loving Fun',"I Don't Want to Know",'Oh Daddy','Gold Dust Woman'] },
  { id:'2',  title:'Kind of Blue',                    artist:'Miles Davis',      year:1959, label:'Columbia',          mediaType:'LP',       genres:['Jazz'],                                condition:'VG',   notes:'Six-eye label, mono pressing.', tracklist:['So What','Freddie Freeloader','Blue in Green','All Blues','Flamenco Sketches'] },
  { id:'3',  title:'OK Computer',                     artist:'Radiohead',        year:1997, label:'Parlophone',        mediaType:'CD',       genres:['Alternative Rock','Art Rock'],         condition:'Mint', notes:'',                              tracklist:['Airbag','Paranoid Android','Subterranean Homesick Alien','Exit Music (For a Film)','Let Down','Karma Police','Fitter Happier','Electioneering','Climbing Up the Walls','No Surprises','Lucky','The Tourist'] },
  { id:'4',  title:'Thriller',                        artist:'Michael Jackson',  year:1982, label:'Epic',              mediaType:'LP',       genres:['Pop','R&B','Funk'],                    condition:'VG',   notes:'',                              tracklist:["Wanna Be Startin' Somethin'",'Baby Be Mine','The Girl Is Mine','Thriller','Beat It','Billie Jean','Human Nature','P.Y.T.','The Lady in My Life'] },
  { id:'5',  title:'Purple Rain',                     artist:'Prince',           year:1984, label:'Warner Bros.',      mediaType:'LP',       genres:['Pop','Funk','Rock'],                   condition:'VG+',  notes:'Original pressing with fold-out poster.', tracklist:["Let's Go Crazy",'Take Me with U','The Beautiful Ones','Computer Blue','Darling Nikki','When Doves Cry','I Would Die 4 U',"Baby I'm a Star",'Purple Rain'] },
  { id:'6',  title:'Blue Lines',                      artist:'Massive Attack',   year:1991, label:'Wild Bunch',        mediaType:'CD',       genres:['Trip-Hop','Electronic'],               condition:'Mint', notes:'',                              tracklist:['Safe from Harm','One Love','Blue Lines','Be Thankful for What You\'ve Got','Five Man Army','Unfinished Sympathy','Daydreaming','Lately','Hymn of the Big Wheel'] },
  { id:'7',  title:'Nevermind',                       artist:'Nirvana',          year:1991, label:'DGC',               mediaType:'CD',       genres:['Grunge','Alternative Rock'],           condition:'VG+',  notes:'',                              tracklist:['Smells Like Teen Spirit','In Bloom','Come as You Are','Breed','Lithium','Polly','Territorial Pissings','Drain You','Lounge Act','Stay Away','On a Plain','Something in the Way'] },
  { id:'8',  title:'Innervisions',                    artist:'Stevie Wonder',    year:1973, label:'Tamla',             mediaType:'LP',       genres:['Soul','R&B','Funk'],                   condition:'VG',   notes:'',                              tracklist:['Too High','Visions','Living for the City','Golden Lady','Higher Ground','Jesus Children of America','All in Love Is Fair',"Don't You Worry 'Bout a Thing","He's Misstra Know-It-All"] },
  { id:'9',  title:'Dummy',                           artist:'Portishead',       year:1994, label:'Go! Discs',         mediaType:'CD',       genres:['Trip-Hop','Electronic'],               condition:'Mint', notes:'',                              tracklist:['Mysterons','Sour Times','Strangers','It Could Be Sweet','Wandering Star',"It's a Fire",'Numb','Roads','Pedestal','Biscuit','Glory Box'] },
  { id:'10', title:'The Dark Side of the Moon',       artist:'Pink Floyd',       year:1973, label:'Harvest',           mediaType:'LP',       genres:['Progressive Rock','Psychedelic Rock'], condition:'VG',   notes:'A-frame inner sleeve, UK original.', tracklist:['Speak to Me','Breathe','On the Run','Time','The Great Gig in the Sky','Money','Us and Them','Any Colour You Like','Brain Damage','Eclipse'] },
  { id:'11', title:"Paul's Boutique",                 artist:'Beastie Boys',     year:1989, label:'Capitol',           mediaType:'Cassette', genres:['Hip-Hop'],                             condition:'VG',   notes:'',                              tracklist:['To All the Girls','Shake Your Rump','Johnny Ryall','Egg Man','High Plains Drifter','The Sounds of Science','3-Minute Rule','Hey Ladies','5-Piece Chicken Dinner','Looking Down the Barrel of a Gun','Car Thief','Shadrach','B-Boy Bouillabaisse'] },
  { id:'12', title:'Doolittle',                       artist:'Pixies',           year:1989, label:'4AD',               mediaType:'Cassette', genres:['Alternative Rock','Indie Rock'],        condition:'VG+',  notes:'',                              tracklist:['Debaser','Tame','Wave of Mutilation','I Bleed','Here Comes Your Man','Dead','Monkey Gone to Heaven','Mr. Grieves','Crackity Jones','La La Love You','No. 13 Baby','There Goes My Gun','Hey','Silver','Gouge Away'] },
  { id:'13', title:'Music Has the Right to Children', artist:'Boards of Canada', year:1998, label:'Warp',              mediaType:'CD',       genres:['Electronic','Ambient'],                condition:'Mint', notes:'',                              tracklist:['Wildlife Analysis','An Eagle in Your Mind','The Color of the Fire','Telephasic Workshop','Sixtyten','Turquoise Hexagon Sun','Kaini Industries','Bocuma','Roygbiv','Rue the Whirl','Aquarius','Olson','Pete Standing Alone','Happy Cycling'] },
  { id:'14', title:'Marquee Moon',                    artist:'Television',       year:1977, label:'Elektra',           mediaType:'LP',       genres:['Post-Punk','Art Rock'],                condition:'VG+',  notes:'',                              tracklist:['See No Evil','Venus','Friction','Marquee Moon','Elevation','Guiding Light','Prove It','Torn Curtain'] },
  { id:'15', title:"What's Going On",                 artist:'Marvin Gaye',      year:1971, label:'Tamla',             mediaType:'LP',       genres:['Soul','R&B'],                          condition:'VG',   notes:'Original Motown pressing.',     tracklist:["What's Going On","What's Happening Brother",'Flyin\' High (In the Friendly Sky)','Save the Children','God Is Love','Mercy Mercy Me','Right On','Wholy Holy','Inner City Blues'] },
  { id:'16', title:'Achtung Baby',                    artist:'U2',               year:1991, label:'Island',            mediaType:'Cassette', genres:['Alternative Rock','Electronic'],        condition:'VG',   notes:'',                              tracklist:['Zoo Station','Even Better Than the Real Thing','One','Until the End of the World',"Who's Gonna Ride Your Wild Horses",'So Cruel','The Fly','Mysterious Ways','Acrobat','Love Is Blindness'] },
  { id:'17', title:'Selected Ambient Works 85-92',    artist:'Aphex Twin',       year:1992, label:'Apollo',            mediaType:'CD',       genres:['Electronic','Ambient','Techno'],        condition:'VG+',  notes:'',                              tracklist:['Xtal','Tha','Pulsewidth','Ageispolis','I','Green Calx','Heliosphan','We Are the Music Makers','Schottkey 7th Path','Ptolemy','Hedphelym','Delphium','Actium'] },
  { id:'18', title:'Enter the Wu-Tang (36 Chambers)', artist:'Wu-Tang Clan',     year:1993, label:'Loud',              mediaType:'Cassette', genres:['Hip-Hop'],                             condition:'VG',   notes:'',                              tracklist:['Bring da Ruckus','Shame on a Nigga','Clan in da Front','Wu-Tang: 7th Chamber','Can It Be All So Simple','Da Mystery of Chessboxin\'','C.R.E.A.M.','Method Man','Protect Ya Neck','Tearz'] },
  { id:'19', title:'Blue',                            artist:'Joni Mitchell',    year:1971, label:'Reprise',           mediaType:'LP',       genres:['Folk','Singer-Songwriter'],            condition:'VG+',  notes:'',                              tracklist:['All I Want','My Old Man','Little Green','Carey','Blue','California','This Flight Tonight','River','A Case of You','The Last Time I Saw Richard'] },
  { id:'20', title:'Screamadelica',                   artist:'Primal Scream',    year:1991, label:'Creation',          mediaType:'12-inch',  genres:['Electronic','Rock','Psychedelic Rock'], condition:'VG+',  notes:'Limited edition double 12-inch.', tracklist:["Movin' on Up",'Slip Inside This House',"Don't Fight It, Feel It",'Higher Than the Sun','Inner Flight','Come Together','Loaded','Damaged',"I'm Comin' Down",'Shine Like Stars'] },
  { id:'21', title:'Blue Monday',                     artist:'New Order',        year:1983, label:'Factory',           mediaType:'12-inch',  genres:['Electronic','Synth-Pop','New Wave'],   condition:'VG',   notes:'Original fac73 die-cut sleeve.', tracklist:['Blue Monday','The Beach'] },
  { id:'22', title:'The Bends',                       artist:'Radiohead',        year:1995, label:'Parlophone',        mediaType:'CD',       genres:['Alternative Rock'],                    condition:'Mint', notes:'',                              tracklist:['Planet Telex','The Bends','High and Dry','Fake Plastic Trees','Bones','(Nice Dream)','Just','My Iron Lung','Bullet Proof... I Wish I Was','Black Star','Sulk','Street Spirit (Fade Out)'] },
  { id:'23', title:'Homework',                        artist:'Daft Punk',        year:1997, label:'Virgin',            mediaType:'CD',       genres:['Electronic','House','Techno'],         condition:'Mint', notes:'',                              tracklist:['Daftendirekt','WDPK 83.7 FM','Revolution 909','Da Funk','Phoenix','Fresh','Around the World',"Rollin' & Scratchin'",'Teachers','High Fidelity','Filter',"Burnin'",'Alive'] },
  { id:'24', title:'Abbey Road',                      artist:'The Beatles',      year:1969, label:'Apple',             mediaType:'LP',       genres:['Rock','Pop'],                          condition:'VG',   notes:'First UK pressing.',            tracklist:['Come Together','Something',"Maxwell's Silver Hammer",'Oh! Darling',"Octopus's Garden",'I Want You (She\'s So Heavy)','Here Comes the Sun','Because','You Never Give Me Your Money','Sun King','Mean Mr. Mustard','Golden Slumbers','Carry That Weight','The End','Her Majesty'] },
  { id:'25', title:'Last Night a DJ Saved My Life',   artist:'Indeep',           year:1982, label:'Sound of New York', mediaType:'7-inch',   genres:['R&B','Disco','Dance'],                 condition:'VG',   notes:'',                              tracklist:['Last Night a DJ Saved My Life','Last Night a DJ Saved My Life (Instrumental)'] },
];

const STORAGE_KEY = 'music-catalogue';
const PIN_KEY     = 'music-catalogue-pin';

export function getCatalogue() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) return JSON.parse(s);
  } catch { /* fall through */ }
  return DEFAULT_CATALOGUE.map(r => ({ ...r }));
}

export function saveCatalogue(catalogue) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(catalogue));
}

export function saveRecord(record) {
  const cat = getCatalogue();
  const i = cat.findIndex(r => r.id === record.id);
  if (i >= 0) cat[i] = record; else cat.push(record);
  saveCatalogue(cat);
  return cat;
}

export function deleteRecord(id) {
  const cat = getCatalogue().filter(r => r.id !== id);
  saveCatalogue(cat);
  return cat;
}

export function resetCatalogue() {
  localStorage.removeItem(STORAGE_KEY);
  return DEFAULT_CATALOGUE.map(r => ({ ...r }));
}

export function getPin()     { return localStorage.getItem(PIN_KEY) || '1234'; }
export function savePin(pin) { localStorage.setItem(PIN_KEY, pin); }

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function generateCoverUrl(artist, title) {
  const str = artist + title;
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(h, 33) ^ str.charCodeAt(i)) >>> 0;
  }
  const hue1 = h % 360;
  const hue2 = (hue1 + 150) % 360;
  const sat  = 45 + ((h >> 10) & 15);
  const l1   = 22 + ((h >> 6)  & 12);
  const l2   = 12 + ((h >> 18) & 10);
  const init = (artist[0] || '?').toUpperCase();
  const a2   = artist.length > 22 ? artist.slice(0, 20) + '\u2026' : artist;
  const t2   = title.length  > 28 ? title.slice(0, 26)  + '\u2026' : title;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
<defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="hsl(${hue1},${sat}%,${l1}%)"/>
<stop offset="100%" stop-color="hsl(${hue2},${sat}%,${l2}%)"/>
</linearGradient></defs>
<rect width="300" height="300" fill="url(#g)"/>
<rect x="16" y="16" width="268" height="268" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
<text x="150" y="148" font-family="system-ui,sans-serif" font-size="90" font-weight="bold" fill="rgba(255,255,255,0.1)" text-anchor="middle" dominant-baseline="middle">${xe(init)}</text>
<text x="150" y="216" font-family="system-ui,sans-serif" font-size="15" font-weight="600" fill="rgba(255,255,255,0.88)" text-anchor="middle">${xe(a2)}</text>
<text x="150" y="239" font-family="system-ui,sans-serif" font-size="12" fill="rgba(255,255,255,0.58)" text-anchor="middle">${xe(t2)}</text>
</svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

function xe(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
