// ─── CONFIG ───────────────────────────────────────────────
const GROQ_API_URL = '/api/analyse';
const MODEL = 'llama-3.3-70b-versatile';

// ─── API KEY ──────────────────────────────────────────────
function getApiKey() {
  return true;
}

function checkApiKey() {
  return true;
}

function saveApiKey() {
  return true;
}

// ─── TABS ─────────────────────────────────────────────────
function showTab(name) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  event.target.classList.add('active');
}

// ─── PLAYER DATA ──────────────────────────────────────────
const PLAYERS = [
  ["Jordan Dawson","Adelaide Crows","Midfielder",23.4],["Rory Laird","Adelaide Crows","Defender",24.1],["Josh Worrell","Adelaide Crows","Defender",21.0],["Jake Soligo","Adelaide Crows","Midfielder",20.9],["Izak Rankine","Adelaide Crows","Forward",20.6],["James Peatling","Adelaide Crows","Midfielder",18.7],["Wayne Milera","Adelaide Crows","Defender",17.8],["Ben Keays","Adelaide Crows","Midfielder",16.8],["Alex Neal-Bullen","Adelaide Crows","Midfielder",16.3],["Taylor Walker","Adelaide Crows","Forward",12.2],["Riley Thilthorpe","Adelaide Crows","Forward",13.7],["Darcy Fogarty","Adelaide Crows","Forward",11.2],["Isaac Cumming","Adelaide Crows","Defender",14.6],["Sam Berry","Adelaide Crows","Midfielder",14.7],["Mitch Hinge","Adelaide Crows","Defender",15.6],["Daniel Curtin","Adelaide Crows","Midfielder",13.4],["Max Michalanney","Adelaide Crows","Defender",13.3],["Reilly O'Brien","Adelaide Crows","Ruck",12.0],["Finnbar Maley","Adelaide Crows","Forward",8.0,1],["Josh Rachele","Adelaide Crows","Forward",14.0],["Luke Pedlar","Adelaide Crows","Forward",15.0],["Jordon Butts","Adelaide Crows","Defender",12.0],["Mark Keane","Adelaide Crows","Defender",13.0],["Lachlan Sholl","Adelaide Crows","Winger",18.0],["Chayce Jones","Adelaide Crows","Winger",16.0],["Ned McHenry","Adelaide Crows","Forward",10.0],["Lachlan McAndrew","Adelaide Crows","Ruck",14.0],["Nick Murray","Adelaide Crows","Defender",12.0],["Callum Ah Chee","Adelaide Crows","Winger",15.0],
  ["Will Ashcroft","Brisbane Lions","Midfielder",27.2],["Hugh McCluggage","Brisbane Lions","Midfielder",27.1],["Dayne Zorko","Brisbane Lions","Defender",26.3],["Josh Dunkley","Brisbane Lions","Midfielder",24.6],["Lachie Neale","Brisbane Lions","Midfielder",26.8],["Jaspa Fletcher","Brisbane Lions","Defender",21.3],["Darcy Wilmot","Brisbane Lions","Defender",20.3],["Zac Bailey","Brisbane Lions","Forward",20.0],["Levi Ashcroft","Brisbane Lions","Midfielder",19.2],["Jarrod Berry","Brisbane Lions","Midfielder",19.9],["Cam Rayner","Brisbane Lions","Forward",15.6],["Harris Andrews","Brisbane Lions","Defender",14.2],["Charlie Cameron","Brisbane Lions","Forward",9.6],["Eric Hipwood","Brisbane Lions","Forward",10.5],["Logan Morris","Brisbane Lions","Forward",9.4],["Ryan Lester","Brisbane Lions","Defender",12.8],["Noah Answerth","Brisbane Lions","Defender",13.3],["Kai Lohmann","Brisbane Lions","Forward",10.2],["Oscar Allen","Brisbane Lions","Forward",13.0,1],["Sam Draper","Brisbane Lions","Ruck",11.0,1],["Darcy Gardiner","Brisbane Lions","Defender",13.0],["Darcy Fort","Brisbane Lions","Ruck",12.0],["Keidean Coleman","Brisbane Lions","Defender",19.0],["Jack Payne","Brisbane Lions","Defender",12.0],["Ty Gallop","Brisbane Lions","Forward",9.0],["Bruce Reville","Brisbane Lions","Forward",12.0],["Lincoln McCarthy","Brisbane Lions","Forward",11.0],
  ["Patrick Cripps","Carlton","Midfielder",24.2],["Sam Walsh","Carlton","Midfielder",22.0],["George Hewett","Carlton","Midfielder",28.1],["Adam Cerra","Carlton","Midfielder",24.6],["Oliver Hollands","Carlton","Midfielder",19.1],["Lachie Fogarty","Carlton","Winger",15.0],["Jacob Weitering","Carlton","Defender",14.0],["Nic Newman","Carlton","Defender",16.0],["Zac Williams","Carlton","Defender",16.0],["Marc Pittonet","Carlton","Ruck",12.0],["Jack Martin","Carlton","Forward",15.0],["Lachie Young","Carlton","Defender",14.0],["Paddy Dow","Carlton","Midfielder",14.0],["Ben Ainsworth","Carlton","Forward",14.0,1],["Will Hayward","Carlton","Forward",16.0,1],["Oliver Florent","Carlton","Midfielder",15.0,1],["Liam Reidy","Carlton","Ruck",12.0,1],["Campbell Chesser","Carlton","Midfielder",14.0,1],["Harry McKay","Carlton","Forward",11.0],["Adam Saad","Carlton","Defender",22.0],["Lewis Young","Carlton","Defender",13.0],["Jagga Smith","Carlton","Midfielder",18.0],["Elijah Hollands","Carlton","Forward",14.0],["Nick Haynes","Carlton","Defender",16.0],["Blake Acres","Carlton","Winger",24.0],["Lachie Cowan","Carlton","Defender",16.0],
  ["Nick Daicos","Collingwood","Midfielder",30.0],["Josh Daicos","Collingwood","Winger",26.8],["Scott Pendlebury","Collingwood","Midfielder",22.1],["Steele Sidebottom","Collingwood","Midfielder",21.2],["Jack Crisp","Collingwood","Midfielder",20.0],["Ned Long","Collingwood","Midfielder",17.8],["Darcy Cameron","Collingwood","Ruck",17.6],["Jordan De Goey","Collingwood","Forward",18.0],["Jamie Elliott","Collingwood","Forward",12.0],["Beau McCreery","Collingwood","Forward",13.0],["Isaac Quaynor","Collingwood","Defender",15.0],["Bobby Hill","Collingwood","Forward",14.0],["Lachie Sullivan","Collingwood","Forward",13.0],["Jack Buller","Collingwood","Forward",16.0,1],["Darcy Moore","Collingwood","Defender",16.0],["Brayden Maynard","Collingwood","Defender",18.0],["Dan Houston","Collingwood","Defender",24.0],["Jeremy Howe","Collingwood","Defender",14.0],["Billy Frampton","Collingwood","Defender",11.0],["Harry Perryman","Collingwood","Midfielder",20.0],["Pat Lipinski","Collingwood","Midfielder",18.0],["Dan McStay","Collingwood","Forward",11.0],["Tim Membrey","Collingwood","Forward",11.0],["Lachie Schultz","Collingwood","Forward",13.0],
  ["Zach Merrett","Essendon","Midfielder",27.8],["Andrew McGrath","Essendon","Midfielder",22.7],["Archie Roberts","Essendon","Defender",24.5],["Mason Redman","Essendon","Defender",22.9],["Sam Durham","Essendon","Midfielder",21.9],["Darcy Parish","Essendon","Midfielder",20.0],["Kyle Langford","Essendon","Forward",13.0],["Peter Wright","Essendon","Forward",10.0],["Ben McKay","Essendon","Defender",14.0],["Nik Cox","Essendon","Forward",12.0],["Jordan Ridley","Essendon","Defender",16.0],["Nick Hind","Essendon","Winger",15.0],["Xavier Duursma","Essendon","Midfielder",14.0],["Matt Guelfi","Essendon","Forward",12.0],["Brayden Fiorini","Essendon","Midfielder",18.0,1],["Jade Gresham","Essendon","Forward",16.0],["Zach Reid","Essendon","Defender",12.0],["Zak Johnson","Essendon","Defender",16.0],["Jaxon Prior","Essendon","Defender",14.0],["Jye Caldwell","Essendon","Midfielder",20.0],["Jacob Farrow","Essendon","Midfielder",18.0],["Archie Perkins","Essendon","Midfielder",16.0],["Nate Caddy","Essendon","Forward",11.0],["Isaac Kako","Essendon","Forward",14.0],
  ["Caleb Serong","Fremantle","Midfielder",27.4],["Andrew Brayshaw","Fremantle","Midfielder",27.0],["Jordan Clark","Fremantle","Defender",24.1],["Luke Ryan","Fremantle","Defender",20.8],["Hayden Young","Fremantle","Defender",19.0],["Sean Darcy","Fremantle","Ruck",14.0],["Josh Treacy","Fremantle","Forward",12.0],["Jye Amiss","Fremantle","Forward",13.0],["Nathan O'Driscoll","Fremantle","Midfielder",16.0],["Brennan Cox","Fremantle","Forward",11.0],["Heath Chapman","Fremantle","Defender",15.0],["Jaeger O'Meara","Fremantle","Midfielder",17.0],["Judd McVee","Fremantle","Defender",16.0,1],["Mason Cox","Fremantle","Ruck",8.0,1],["Shai Bolton","Fremantle","Forward",18.0],["Alex Pearce","Fremantle","Defender",14.0],["Karl Worner","Fremantle","Defender",13.0],["Luke Jackson","Fremantle","Ruck",14.0],["Neil Erasmus","Fremantle","Midfielder",18.0],["Corey Wagner","Fremantle","Midfielder",18.0],["Murphy Reid","Fremantle","Midfielder",17.0],["Matt Johnson","Fremantle","Midfielder",18.0],["Sam Switkowski","Fremantle","Forward",12.0],["Pat Voss","Fremantle","Forward",9.0],["Michael Frederick","Fremantle","Forward",13.0],
  ["Bailey Smith","Geelong Cats","Midfielder",31.3],["Max Holmes","Geelong Cats","Winger",26.9],["Gryan Miers","Geelong Cats","Winger",22.3],["Tom Atkins","Geelong Cats","Midfielder",19.7],["Zach Guthrie","Geelong Cats","Defender",17.5],["Oliver Dempsey","Geelong Cats","Forward",17.0],["Patrick Dangerfield","Geelong Cats","Midfielder",20.0],["Jeremy Cameron","Geelong Cats","Forward",14.0],["Mark Blicavs","Geelong Cats","Ruck",14.0],["Tanner Bruhn","Geelong Cats","Midfielder",16.0],["Sam De Koning","Geelong Cats","Defender",13.0],["Jack Henry","Geelong Cats","Defender",14.0],["Tyson Stengle","Geelong Cats","Forward",14.0],["Brad Close","Geelong Cats","Forward",13.0],["James Worpel","Geelong Cats","Midfielder",17.0,1],["Tom Stewart","Geelong Cats","Defender",26.0],["Connor O'Sullivan","Geelong Cats","Defender",12.0],["Lawson Humphries","Geelong Cats","Defender",14.0],["Mark O'Connor","Geelong Cats","Defender",14.0],["Oisin Mullin","Geelong Cats","Defender",16.0],["Rhys Stanley","Geelong Cats","Ruck",10.0],["Shaun Mannagh","Geelong Cats","Forward",16.0],["Shannon Neale","Geelong Cats","Forward",10.0],
  ["Noah Anderson","Gold Coast Suns","Midfielder",30.1],["Matt Rowell","Gold Coast Suns","Midfielder",26.3],["John Noble","Gold Coast Suns","Defender",25.3],["Touk Miller","Gold Coast Suns","Midfielder",24.7],["Joel Jeffrey","Gold Coast Suns","Defender",18.8],["Ben King","Gold Coast Suns","Forward",13.0],["Wil Powell","Gold Coast Suns","Defender",15.0],["Bodhi Uwland","Gold Coast Suns","Midfielder",14.0],["Jed Walter","Gold Coast Suns","Forward",13.0],["Jack Lukosius","Gold Coast Suns","Forward",16.0],["Christian Petracca","Gold Coast Suns","Midfielder",25.5,1],["Jamarra Ugle-Hagan","Gold Coast Suns","Forward",12.0,1],["Sam Collins","Gold Coast Suns","Defender",12.0],["Daniel Rioli","Gold Coast Suns","Defender",20.0],["Mac Andrew","Gold Coast Suns","Defender",14.0],["Jarrod Witts","Gold Coast Suns","Ruck",14.0],["Lachie Weller","Gold Coast Suns","Winger",22.0],["Ethan Read","Gold Coast Suns","Ruck",12.0],["Sam Clohesy","Gold Coast Suns","Midfielder",22.0],["Alex Davies","Gold Coast Suns","Midfielder",16.0],["Bailey Humphrey","Gold Coast Suns","Forward",16.0],["Ben Long","Gold Coast Suns","Forward",11.0],["Leo Lombard","Gold Coast Suns","Forward",11.0],["Jy Farrar","Gold Coast Suns","Forward",11.0],
  ["Tom Green","GWS Giants","Midfielder",29.7],["Lachie Whitfield","GWS Giants","Defender",28.7],["Lachie Ash","GWS Giants","Defender",27.9],["Finn Callaghan","GWS Giants","Midfielder",28.4],["Harry Himmelberg","GWS Giants","Defender",18.5],["Connor Idun","GWS Giants","Defender",18.2],["Toby Greene","GWS Giants","Forward",17.0],["Stephen Coniglio","GWS Giants","Midfielder",18.0],["Josh Kelly","GWS Giants","Midfielder",20.0],["Jesse Hogan","GWS Giants","Forward",12.0],["Tom Hutchesson","GWS Giants","Forward",11.0],["Aaron Cadman","GWS Giants","Forward",10.0],["Brent Daniels","GWS Giants","Forward",14.0],["Sam Taylor","GWS Giants","Defender",14.0],["Clayton Oliver","GWS Giants","Midfielder",25.5,1],["Jack Buckley","GWS Giants","Defender",12.0],["Joe Fonti","GWS Giants","Defender",13.0],["Jayden Laverde","GWS Giants","Defender",14.0],["Kieren Briggs","GWS Giants","Ruck",14.0],["Ryan Angwin","GWS Giants","Midfielder",20.0],["Xavier O'Halloran","GWS Giants","Midfielder",18.0],["Harry Rowston","GWS Giants","Midfielder",16.0],["Harvey Thomas","GWS Giants","Winger",16.0],["Jake Stringer","GWS Giants","Forward",14.0],["Callum Brown","GWS Giants","Forward",13.0],["Jake Riccardi","GWS Giants","Forward",11.0],
  ["Jai Newcombe","Hawthorn","Midfielder",22.9],["Karl Amon","Hawthorn","Winger",24.0],["James Sicily","Hawthorn","Defender",19.5],["Josh Ward","Hawthorn","Midfielder",20.6],["Dylan Moore","Hawthorn","Forward",19.4],["Massimo D'Ambrosio","Hawthorn","Defender",18.2],["Josh Battle","Hawthorn","Defender",18.5],["Jack Ginnivan","Hawthorn","Forward",18.6],["Jarman Impey","Hawthorn","Winger",19.3],["Will Day","Hawthorn","Midfielder",18.0],["Mitch Lewis","Hawthorn","Forward",13.0],["Connor MacDonald","Hawthorn","Forward",14.0],["Jack Scrimshaw","Hawthorn","Defender",15.0],["Denver Grainger-Barras","Hawthorn","Defender",14.0],["Flynn Perez","Hawthorn","Midfielder",12.0,1],["Tom Barrass","Hawthorn","Defender",16.0],["Blake Hardwick","Hawthorn","Defender",18.0],["Lloyd Meek","Hawthorn","Ruck",16.0],["Josh Weddle","Hawthorn","Winger",18.0],["Harry Morrison","Hawthorn","Winger",16.0],["Conor Nash","Hawthorn","Midfielder",16.0],["Finn Maginness","Hawthorn","Midfielder",16.0],["Nick Watson","Hawthorn","Forward",14.0],["Mabior Chol","Hawthorn","Forward",11.0],["Jack Gunston","Hawthorn","Forward",12.0],["Sam Butler","Hawthorn","Forward",13.0],["Calsher Dear","Hawthorn","Forward",9.0],
  ["Max Gawn","Melbourne","Ruck",20.7],["Christian Salem","Melbourne","Defender",22.9],["Jake Bowey","Melbourne","Defender",22.6],["Trent Rivers","Melbourne","Defender",21.3],["Ed Langdon","Melbourne","Winger",19.0],["Jack Viney","Melbourne","Midfielder",18.0],["Kysaiah Pickett","Melbourne","Forward",14.0],["Bayley Fritsch","Melbourne","Forward",14.0],["Tom McDonald","Melbourne","Forward",12.0],["Koltyn Tholstrup","Melbourne","Forward",12.0],["Lachie Hunter","Melbourne","Midfielder",16.0],["Brody Mihocek","Melbourne","Forward",13.0,1],["Changkuoth Jiath","Melbourne","Defender",15.0,1],["Jack Steele","Melbourne","Midfielder",20.9,1],["Max Heath","Melbourne","Midfielder",14.0,1],["Jake Lever","Melbourne","Defender",18.0],["Harry Petty","Melbourne","Defender",13.0],["Blake Howes","Melbourne","Defender",16.0],["Daniel Turner","Melbourne","Defender",12.0],["Caleb Windsor","Melbourne","Midfielder",18.0],["Harvey Langford","Melbourne","Midfielder",18.0],["Tom Sparrow","Melbourne","Midfielder",16.0],["Xavier Lindsay","Melbourne","Midfielder",16.0],["Harry Sharp","Melbourne","Winger",16.0],["Jacob van Rooyen","Melbourne","Forward",11.0],["Kade Chandler","Melbourne","Forward",13.0],
  ["Harry Sheezel","North Melbourne","Defender",29.3],["Luke Davies-Uniacke","North Melbourne","Midfielder",24.7],["Caleb Daniel","North Melbourne","Defender",25.6],["Tom Powell","North Melbourne","Midfielder",23.0],["Colby McKercher","North Melbourne","Midfielder",23.1],["Jy Simpkin","North Melbourne","Midfielder",22.1],["Luke Parker","North Melbourne","Midfielder",23.3],["Nick Larkey","North Melbourne","Forward",14.0],["Zac Fisher","North Melbourne","Winger",16.0],["Hugh Greenwood","North Melbourne","Midfielder",15.0],["Tristan Xerri","North Melbourne","Ruck",12.0],["Tom Goldhagen","North Melbourne","Forward",11.0],["Charlie Spargo","North Melbourne","Forward",12.0,1],["Luke McDonald","North Melbourne","Defender",18.0],["Griffin Logue","North Melbourne","Defender",14.0],["Charlie Comben","North Melbourne","Defender",12.0],["Toby Pink","North Melbourne","Defender",12.0],["Finn O'Sullivan","North Melbourne","Midfielder",18.0],["Dylan Stephens","North Melbourne","Midfielder",18.0],["Jack Darling","North Melbourne","Forward",11.0],["Zane Duursma","North Melbourne","Forward",13.0],["Paul Curtis","North Melbourne","Forward",14.0],["Cam Zurhaar","North Melbourne","Forward",13.0],["Lachy Dovaston","North Melbourne","Forward",10.0],
  ["Connor Rozee","Port Adelaide","Midfielder",27.4],["Zak Butters","Port Adelaide","Midfielder",27.9],["Ollie Wines","Port Adelaide","Midfielder",25.4],["Jason Horne-Francis","Port Adelaide","Midfielder",22.0],["Willem Drew","Port Adelaide","Midfielder",18.0],["Todd Marshall","Port Adelaide","Defender",13.0],["Trent McKenzie","Port Adelaide","Defender",17.0],["Darcy Byrne-Jones","Port Adelaide","Defender",16.0],["Mitch Georgiades","Port Adelaide","Forward",12.0],["Lachie Jones","Port Adelaide","Defender",14.0],["Miles Bergman","Port Adelaide","Defender",15.0],["Will Brodie","Port Adelaide","Midfielder",18.0,1],["Corey Durdin","Port Adelaide","Forward",13.0,1],["Jacob Wehr","Port Adelaide","Defender",12.0,1],["Aliir Aliir","Port Adelaide","Defender",16.0],["Kane Farrell","Port Adelaide","Defender",18.0],["Esava Ratugolea","Port Adelaide","Defender",12.0],["Harrison Ramm","Port Adelaide","Defender",12.0],["Jase Burgoyne","Port Adelaide","Defender",18.0],["Dante Visentini","Port Adelaide","Ruck",12.0],["Logan Evans","Port Adelaide","Midfielder",14.0],["Jackson Mead","Port Adelaide","Midfielder",14.0],["Ewan Mackinlay","Port Adelaide","Winger",16.0],["Joe Richards","Port Adelaide","Forward",13.0],["Ollie Lord","Port Adelaide","Forward",10.0],["Joe Berry","Port Adelaide","Forward",10.0],
  ["Jacob Hopper","Richmond","Midfielder",26.4],["Tim Taranto","Richmond","Midfielder",25.6],["Sam Banks","Richmond","Defender",20.2],["Jack Ross","Richmond","Midfielder",19.1],["Noah Balta","Richmond","Defender",16.0],["Tom Lynch","Richmond","Forward",12.0],["Nick Vlastuin","Richmond","Defender",15.0],["Hugo Ralphsmith","Richmond","Forward",13.0],["Rhyan Mansell","Richmond","Forward",12.0],["Liam Shacklock","Richmond","Midfielder",14.0],["Patrick Retschko","Richmond","Midfielder",14.0,1],["Jayden Short","Richmond","Defender",24.0],["Nathan Broad","Richmond","Defender",14.0],["Josh Gibcus","Richmond","Defender",12.0],["Ben Miller","Richmond","Defender",11.0],["Campbell Gray","Richmond","Defender",13.0],["Toby Nankervis","Richmond","Ruck",14.0],["Sam Lalor","Richmond","Midfielder",18.0],["Kane McAuliffe","Richmond","Midfielder",18.0],["Tyler Sonsie","Richmond","Midfielder",16.0],["Jonty Faull","Richmond","Forward",9.0],["Harry Armstrong","Richmond","Forward",11.0],["Seth Campbell","Richmond","Forward",11.0],["Maurice Rioli jnr","Richmond","Forward",12.0],
  ["Nasiah Wanganeen-Milera","St Kilda","Defender",29.9],["Jack Sinclair","St Kilda","Defender",26.9],["Jack Macrae","St Kilda","Midfielder",24.6],["Marcus Windhager","St Kilda","Midfielder",22.1],["Callum Wilkie","St Kilda","Defender",18.7],["Brad Hill","St Kilda","Winger",19.6],["Max King","St Kilda","Forward",13.0],["Rowan Marshall","St Kilda","Ruck",14.0],["Hunter Clark","St Kilda","Midfielder",17.0],["Ryan Byrnes","St Kilda","Forward",14.0],["Mitch Owens","St Kilda","Midfielder",16.0],["Sam Flanders","St Kilda","Midfielder",18.7,1],["Tom De Koning","St Kilda","Ruck",13.0,1],["Jack Silvagni","St Kilda","Forward",14.0,1],["Liam Ryan","St Kilda","Forward",14.0,1],["Alix Tauru","St Kilda","Defender",14.0],["Liam Stocker","St Kilda","Defender",14.0],["Mattaes Phillipou","St Kilda","Midfielder",16.0],["Darcy Wilson","St Kilda","Midfielder",16.0],["Mason Wood","St Kilda","Winger",16.0],["Jack Higgins","St Kilda","Forward",14.0],["Anthony Caminiti","St Kilda","Forward",11.0],["Cooper Sharman","St Kilda","Forward",11.0],
  ["Isaac Heeney","Sydney Swans","Midfielder",23.6],["Chad Warner","Sydney Swans","Midfielder",22.2],["Nick Blakey","Sydney Swans","Defender",21.4],["Errol Gulden","Sydney Swans","Midfielder",20.0],["James Rowbottom","Sydney Swans","Midfielder",18.0],["Callum Mills","Sydney Swans","Defender",23.8],["Tom Papley","Sydney Swans","Forward",14.0],["Joel Amartey","Sydney Swans","Forward",11.0],["Harry Cunningham","Sydney Swans","Winger",15.0],["Brodie Grundy","Sydney Swans","Ruck",14.0],["Taylor Adams","Sydney Swans","Midfielder",16.0],["Justin McInerney","Sydney Swans","Midfielder",15.0],["Lewis Melican","Sydney Swans","Defender",14.0],["Angus Sheldrick","Sydney Swans","Midfielder",13.0],["Tom McCartin","Sydney Swans","Defender",14.0],["Charlie Curnow","Sydney Swans","Forward",16.0,1],["Malcolm Rosas Jr","Sydney Swans","Forward",12.0,1],["James Jordon","Sydney Swans","Midfielder",16.0],["Jai Serong","Sydney Swans","Defender",13.0,1],["Dane Rampe","Sydney Swans","Defender",16.0],["Jake Lloyd","Sydney Swans","Defender",24.0],["Sam Wicks","Sydney Swans","Defender",13.0],["Riley Bice","Sydney Swans","Defender",12.0],["Matt Roberts","Sydney Swans","Midfielder",18.0],["Logan McDonald","Sydney Swans","Forward",11.0],
  ["Harley Reid","West Coast Eagles","Midfielder",22.0],["Liam Baker","West Coast Eagles","Midfielder",22.1],["Ryan Maric","West Coast Eagles","Defender",20.9],["Elliot Yeo","West Coast Eagles","Midfielder",17.0],["Jamaine Jones","West Coast Eagles","Forward",13.0],["Reuben Ginbey","West Coast Eagles","Defender",16.0],["Rhett Bazzo","West Coast Eagles","Defender",14.0],["Brandon Starcevich","West Coast Eagles","Defender",10.0,1],["Tylar Young","West Coast Eagles","Forward",10.0,1],["Tim Kelly","West Coast Eagles","Midfielder",23.0],["Liam Duggan","West Coast Eagles","Defender",18.0],["Brady Hough","West Coast Eagles","Defender",18.0],["Harry Edwards","West Coast Eagles","Defender",11.0],["Josh Lindsay","West Coast Eagles","Defender",13.0],["Matt Flynn","West Coast Eagles","Ruck",14.0],["Willem Duursma","West Coast Eagles","Midfielder",16.0],["Elijah Hewett","West Coast Eagles","Midfielder",18.0],["Jack Graham","West Coast Eagles","Midfielder",16.0],["Tom McCarthy","West Coast Eagles","Midfielder",14.0],["Hamish Davis","West Coast Eagles","Winger",16.0],["Jake Waterman","West Coast Eagles","Forward",12.0],["Jamie Cripps","West Coast Eagles","Forward",12.0],["Jobe Shanahan","West Coast Eagles","Forward",11.0],
  ["Marcus Bontempelli","Western Bulldogs","Midfielder",27.1],["Bailey Dale","Western Bulldogs","Defender",27.0],["Tom Liberatore","Western Bulldogs","Midfielder",26.5],["Ed Richards","Western Bulldogs","Midfielder",25.8],["Bailey Williams","Western Bulldogs","Defender",19.7],["Joel Freijah","Western Bulldogs","Forward",19.0],["Adam Treloar","Western Bulldogs","Midfielder",20.0],["Tim English","Western Bulldogs","Ruck",15.0],["Cody Weightman","Western Bulldogs","Forward",13.0],["Ryan Gardner","Western Bulldogs","Defender",14.0],["Laitham Vandermeer","Western Bulldogs","Forward",13.0],["Connor Budarick","Western Bulldogs","Midfielder",12.0,1],["Matthew Kennedy","Western Bulldogs","Midfielder",18.0],["Sam Darcy","Western Bulldogs","Forward",12.0],["Aaron Naughton","Western Bulldogs","Forward",13.0],["Rory Lobb","Western Bulldogs","Defender",14.0],["James O'Donnell","Western Bulldogs","Defender",12.0],["Lachie Bramble","Western Bulldogs","Defender",12.0],["Oskar Baker","Western Bulldogs","Midfielder",16.0],["Ryley Sanders","Western Bulldogs","Midfielder",18.0],["Rhylee West","Western Bulldogs","Forward",14.0],["Arthur Jones","Western Bulldogs","Forward",10.0],["Buku Khamis","Western Bulldogs","Defender",12.0],["Jordan Croft","Western Bulldogs","Forward",10.0],
];

// ─── RECENT FORM DATA ─────────────────────────────────────
// Format: "Player Name": { last5: [g1,g2,g3,g4,g5], vs: { "Opponent Team": [g1..g5] } }
// last5 = disposals from the 5 most recent games (most recent LAST).
// vs    = disposals in the last 5 games against that specific opponent.
// These MUST be real numbers from a stats source (AFL Tables / FootyWire) — never guessed.
// Add a player by copying the line below. The single entry here is DEMO data to show the box.
const RECENT_FORM = {
  "Marcus Bontempelli": { sample: true, last5: [33, 19, 28, 31, 26], vs: { "Adelaide Crows": [30, 25, 22, 34, 27] } }
};

function dispAvg(a){ return a && a.length ? (a.reduce((x,y)=>x+y,0)/a.length).toFixed(1) : '–'; }

// ─── IMAGE HANDLING ───────────────────────────────────────
let currentImageBase64 = null;

function handleImage(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    currentImageBase64 = e.target.result.split(',')[1];
    document.getElementById('preview-img').src = e.target.result;
    document.getElementById('preview-area').style.display = 'block';
    document.getElementById('uploadArea').style.display = 'none';
  };
  reader.readAsDataURL(file);
}

// ─── GROQ API CALL ────────────────────────────────────────
async function callGroq(messages) {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: messages })
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
  const text = data.choices[0].message.content;
  const clean = text.replace(/```json|```/g, '').trim();
  const jsonMatch = clean.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No valid JSON found in response');
  return jsonMatch[0];
}

// ─── BET SLIP ANALYSIS ────────────────────────────────────
async function analyseBetSlip() {
  if (!currentImageBase64) return;

  const btn = document.getElementById('analyse-btn-text');
  const resultArea = document.getElementById('result-area');

  btn.textContent = '⏳ Analysing...';
  document.querySelector('#tab-analyse .btn-analyse').disabled = true;

  resultArea.innerHTML = `
    <div class="result-card loading">
      <span class="loading-spinner">🏉</span>
      <div class="loading-text">Analysing your bet slip...</div>
      <div class="loading-step" id="loading-step">🔍 Reading slip details...</div>
    </div>`;

  const steps = [
    '🏥 Checking injuries & team selection...',
    '📊 Researching recent form...',
    '🔒 Checking tagging history & risks...',
    '🔄 Analysing role changes...',
    '⚔️ Building matchup breakdown...',
    '🏟️ Factoring in venue & conditions...',
    '🎯 Calculating confidence ratings...'
  ];

  let stepIdx = 0;
  const stepInterval = setInterval(() => {
    const el = document.getElementById('loading-step');
    if (el && stepIdx < steps.length) {
      el.textContent = steps[stepIdx];
      stepIdx++;
    }
  }, 2000);

  try {
    const prompt = `You are FootyEdge, an expert AFL betting analyst for the 2026 season.

STRICT RULES — follow exactly:
- Analyse every player and bet clearly visible on the slip image first.
- You MAY also mention OTHER players from EITHER club in the matchup — the slip player's own team AND the opponent — when they affect a slip player (e.g. an opponent's tagger, a teammate freed up by that tag, a weak defensive matchup the player can exploit, a ruck/role change).
- ONLY use real players currently on that club's 2026 list. NEVER invent players or use anyone retired, delisted, or traded away. If unsure a player is currently at that club in 2026, do not mention them.
- If you cannot clearly read a name on the slip, use only what you can read — do NOT replace it with a well-known player.
- Only name a tagger if certain; if unsure set "tagging_risk":"LOW" and "tagger":"None identified". Never invent a tagger or made-up stats.
- Put extra-player context in "reasoning" (if it's about that specific leg) or "key_insight" (if it's a broader angle) — never as fake slip legs.

For EACH leg give a confidence 1-10, value (VALUE/FAIR/POOR), tagging risk (HIGH/MEDIUM/LOW, tagger named only if certain), key risks, verdict (BACK IT/LEAN OVER/LEAN UNDER/AVOID), and 2-3 sentences of reasoning. Then give overall multi rating, singles vs multi recommendation, weakest leg and key insight.

Respond in this exact JSON format with no markdown and no extra text outside the JSON:
{"game":"Team A v Team B","date":"date string","odds":"2.15","legs":[{"player":"Player Name","bet":"20+ Disposals","confidence":8,"value":"VALUE","tagging_risk":"LOW","tagger":"None identified","verdict":"BACK IT","verdict_type":"back","reasoning":"Specific reasoning here","key_risk":"Main risk factor"}],"overall_rating":7,"recommendation":"Play as multi","weakest_leg":"Player name reason","key_insight":"Overall tactical insight"}`;

    const text = await callGroq([
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${currentImageBase64}` } }
        ]
      }
    ]);

    clearInterval(stepInterval);
    const parsed = JSON.parse(text);
    renderBetResult(parsed);

  } catch (err) {
    clearInterval(stepInterval);
    resultArea.innerHTML = `<div class="result-card"><p class="muted">❌ Error: ${err.message}</p><p class="muted" style="margin-top:8px">Please try again.</p></div>`;
  }

  btn.textContent = '🔍 Analyse Slip';
  document.querySelector('#tab-analyse .btn-analyse').disabled = false;
}

function renderBetResult(data) {
  const resultArea = document.getElementById('result-area');
  let html = '';

  const ratingColor = data.overall_rating >= 7 ? '#00e676' : data.overall_rating >= 5 ? '#ffab00' : '#ff5252';
  html += `
    <div class="overall-card">
      <div class="overall-title">🏉 ${data.game}</div>
      <div class="result-detail" style="margin-bottom:8px">${data.date} · Odds: ${data.odds}</div>
      <div class="overall-rating" style="color:${ratingColor}">${data.overall_rating}<span style="font-size:20px;color:#4a5568">/10</span></div>
      <div class="overall-sub">Overall Multi Rating</div>
      <div class="result-text"><strong>📋 Recommendation:</strong> ${data.recommendation}</div>
      <div class="result-text"><strong>⚠️ Weakest Leg:</strong> ${data.weakest_leg}</div>
      <div class="result-text"><strong>💡 Key Insight:</strong> ${data.key_insight}</div>
    </div>`;

  data.legs.forEach(leg => {
    const verdictClass = leg.verdict_type === 'back' ? 'verdict-back' : leg.verdict_type === 'avoid' ? 'verdict-avoid' : 'verdict-lean';
    const confColor = leg.confidence >= 7 ? '#00e676' : leg.confidence >= 5 ? '#ffab00' : '#ff5252';
    const tagColor = leg.tagging_risk === 'HIGH' ? '#ff5252' : leg.tagging_risk === 'MEDIUM' ? '#ffab00' : '#00e676';

    html += `
      <div class="result-card">
        <div class="result-header">
          <div>
            <div class="result-player">${leg.player}</div>
            <div class="result-detail">${leg.bet}</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:22px;font-weight:800;color:${confColor}">${leg.confidence}<span style="font-size:13px;color:#4a5568">/10</span></div>
            <div style="font-size:11px;color:#4a5568">confidence</div>
          </div>
        </div>
        <div class="info-row">
          <span class="info-pill">📊 ${leg.value}</span>
          <span class="info-pill" style="color:${tagColor}">🔒 Tag Risk: ${leg.tagging_risk}</span>
          ${leg.tagger && leg.tagger !== 'None identified' ? `<span class="info-pill">👤 ${leg.tagger}</span>` : ''}
        </div>
        <div class="verdict-badge ${verdictClass}">${leg.verdict}</div>
        <div class="result-text">${leg.reasoning}</div>
        <hr class="divider">
        <div class="result-text"><strong>⚠️ Key Risk:</strong> ${leg.key_risk}</div>
      </div>`;
  });

  resultArea.innerHTML = html;
}

// ─── DISPOSAL ANALYSIS ────────────────────────────────────
let selectedPlayers = [];

function filterPlayers() {
  const search = document.getElementById('player-search').value.toLowerCase().trim();
  const sugg = document.getElementById('sugg-box');
  if (!search) { sugg.className = 'sugg-box'; return; }
  const matches = PLAYERS.filter(p => p[0].toLowerCase().includes(search) && !selectedPlayers.find(s => s[0] === p[0])).slice(0, 6);
  if (!matches.length) { sugg.className = 'sugg-box'; return; }
  sugg.innerHTML = '';
  matches.forEach(p => {
    const d = document.createElement('div');
    d.className = 'sugg-item';
    d.innerHTML = p[0] + (p[4] ? ' ★' : '') + '<span>' + p[1] + ' · ' + p[2] + '</span>';
    d.addEventListener('click', () => {
      addPlayer(p);
      document.getElementById('player-search').value = '';
      sugg.className = 'sugg-box';
    });
    sugg.appendChild(d);
  });
  sugg.className = 'sugg-box on';
}

function addPlayer(p) {
  if (selectedPlayers.length >= 8) { alert('Max 8 players.'); return; }
  if (selectedPlayers.find(s => s[0] === p[0])) return;
  selectedPlayers.push(p);
  renderChips();
}

function removePlayer(i) {
  selectedPlayers.splice(i, 1);
  renderChips();
}

function renderChips() {
  const wrap = document.getElementById('chips-wrap');
  document.getElementById('sel-count').textContent = '(' + selectedPlayers.length + '/8)';
  wrap.innerHTML = '';
  renderForm();
  if (!selectedPlayers.length) { wrap.innerHTML = '<span class="muted">No players selected</span>'; return; }
  selectedPlayers.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'chip';
    div.textContent = p[0] + (p[4] ? ' ★' : '');
    const btn = document.createElement('button');
    btn.textContent = '×';
    btn.addEventListener('click', () => removePlayer(i));
    div.appendChild(btn);
    wrap.appendChild(div);
  });
}

const formCache = {}; // player name -> 'loading' | null | [{opp, di}]

function computeForm(games, opp) {
  const last5 = games.slice(-5).map(g => g.di);
  const vs = opp ? games.filter(g => g.opp === opp).slice(-5).map(g => g.di) : null;
  return { last5, vs };
}

function fetchForm(name, team) {
  if (name in formCache) return;   // already fetched or in-flight
  if (RECENT_FORM[name]) return;   // manual override present
  formCache[name] = 'loading';
  fetch(`/api/stats?player=${encodeURIComponent(name)}&team=${encodeURIComponent(team)}`)
    .then(r => r.json())
    .then(d => { formCache[name] = (d && Array.isArray(d.games) && d.games.length) ? d.games : null; })
    .catch(() => { formCache[name] = null; })
    .finally(() => renderForm());
}

function renderForm() {
  const host = document.getElementById('disposal-result');
  if (!host || !host.parentNode) return;
  let box = document.getElementById('form-box');
  if (!box) { box = document.createElement('div'); box.id = 'form-box'; host.parentNode.insertBefore(box, host); }
  if (!selectedPlayers.length) { box.innerHTML = ''; return; }
  const opp = (document.getElementById('opp-select') || {}).value || '';
  const muted = (t) => `<span style="color:#4a5568">${t}</span>`;
  let html = '';
  selectedPlayers.forEach(p => {
    const name = p[0], team = p[1];
    let last5Arr = null, vsArr = null, sample = false, loading = false;

    if (RECENT_FORM[name]) {                       // 1) manual override wins
      const f = RECENT_FORM[name];
      last5Arr = f.last5 || null;
      vsArr = (f.vs && opp) ? (f.vs[opp] || null) : null;
      sample = !!f.sample;
    } else if (Array.isArray(formCache[name])) {   // 2) scraped data cached
      const c = computeForm(formCache[name], opp);
      last5Arr = c.last5; vsArr = c.vs;
    } else if (formCache[name] === 'loading') {    // 3) request in-flight
      loading = true;
    } else if (formCache[name] === null) {         // 4) tried, no data
      // show "no data yet"
    } else {                                       // 5) not requested yet
      fetchForm(name, team); loading = true;
    }

    const last5 = loading ? muted('loading…')
                : (last5Arr && last5Arr.length ? `${last5Arr.join(', ')} ${muted('(avg ' + dispAvg(last5Arr) + ')')}` : muted('no data yet'));
    const vsLine = !opp ? muted('select an opponent')
                 : loading ? muted('loading…')
                 : (vsArr && vsArr.length ? `${vsArr.join(', ')} ${muted('(avg ' + dispAvg(vsArr) + ')')}` : muted('no data yet'));

    html += `<div class="result-card" style="padding:10px 14px">
      <div class="result-player">${name}${sample ? ' <span style="font-size:10px;color:#ffab00">(demo data – replace)</span>' : ''}</div>
      <div class="result-text" style="font-size:13px">📊 Last 5: ${last5}</div>
      <div class="result-text" style="font-size:13px">⚔️ Last 5 v ${opp || '—'}: ${vsLine}</div>
    </div>`;
  });
  box.innerHTML = html;
}

async function analyseDisposals() {
  const opp = document.getElementById('opp-select').value;
  if (!opp) { alert('Please select an opposition team.'); return; }
  if (!selectedPlayers.length) { alert('Please select at least one player.'); return; }

  const resultDiv = document.getElementById('disposal-result');
  resultDiv.innerHTML = `<div class="result-card loading"><span class="loading-spinner">🏉</span><div class="loading-text">Analysing matchups...</div></div>`;

  const playerList = selectedPlayers.map(p => `${p[0]} (${p[1]}, ${p[2]}, avg ${p[3]}${p[4] ? ', new to club 2026' : ''})`).join(', ');

  const prompt = `You are FootyEdge, expert AFL analyst 2026. Analyse disposal potential for these players against ${opp}. Consider tagging risk, defensive weaknesses, recent form and role for each player.

Players: ${playerList}

Respond in this exact JSON format with no markdown and no extra text outside the JSON:
{"opposition_weakness":"2 sentence summary","players":[{"name":"exact name","rating":"High|Medium|Low","expected":"28-32","tagging_risk":"LOW|MEDIUM|HIGH","reason":"2 specific sentences"}],"key_insight":"tactical insight"}`;

  try {
    const text = await callGroq([{ role: 'user', content: prompt }]);
    const parsed = JSON.parse(text);

    let html = `<div class="result-card"><div class="result-player" style="color:#00e676;margin-bottom:8px">vs ${opp}</div><div class="result-text">${parsed.opposition_weakness}</div></div>`;

    parsed.players.forEach(p => {
      const orig = selectedPlayers.find(s => s[0] === p.name);
      const rClass = p.rating === 'High' ? 'rating-high' : p.rating === 'Medium' ? 'rating-medium' : 'rating-low';
      const tagColor = p.tagging_risk === 'HIGH' ? '#ff5252' : p.tagging_risk === 'MEDIUM' ? '#ffab00' : '#00e676';
      html += `<div class="result-card">
        <div class="result-header">
          <div><div class="result-player">${p.name}</div><div class="result-detail">${orig ? orig[1] + ' · ' + orig[2] + ' · avg ' + orig[3] : ''}</div></div>
          <span class="rating-badge ${rClass}">${p.rating}</span>
        </div>
        <div class="info-row">
          <span class="info-pill">📊 ${p.expected} disposals</span>
          <span class="info-pill" style="color:${tagColor}">🔒 Tag: ${p.tagging_risk}</span>
        </div>
        <div class="result-text">${p.reason}</div>
      </div>`;
    });

    html += `<div class="result-card"><div class="result-text"><strong>💡 Key Insight:</strong> ${parsed.key_insight}</div></div>`;
    resultDiv.innerHTML = html;

  } catch (err) {
    resultDiv.innerHTML = `<div class="result-card"><p class="muted">❌ Error: ${err.message}</p></div>`;
  }
}

// ─── BEST 22 ──────────────────────────────────────────────
let b22Players = {};
let activeB22Slot = null;

const B22_SLOTS = [
  {id:'d1',pos:'DEF'},{id:'d2',pos:'DEF'},{id:'d3',pos:'DEF'},
  {id:'d4',pos:'DEF'},{id:'d5',pos:'DEF'},{id:'d6',pos:'DEF'},
  {id:'m1',pos:'MID'},{id:'m2',pos:'MID'},{id:'m3',pos:'MID'},
  {id:'m4',pos:'MID'},{id:'m5',pos:'MID'},{id:'m6',pos:'MID'},
  {id:'m7',pos:'MID'},{id:'m8',pos:'MID'},
  {id:'r1',pos:'RUC'},
  {id:'f1',pos:'FWD'},{id:'f2',pos:'FWD'},{id:'f3',pos:'FWD'},
  {id:'f4',pos:'FWD'},{id:'f5',pos:'FWD'},{id:'f6',pos:'FWD'},
  {id:'em',pos:'EMG'},
];

function initB22() {
  const grids = {DEF:'def-slots',MID:'mid-slots',RUC:'ruc-slots',FWD:'fwd-slots',EMG:'fwd-slots'};
  B22_SLOTS.forEach(s => {
    const grid = document.getElementById(grids[s.pos]);
    if (!grid) return;
    const div = document.createElement('div');
    div.className = 'pos-slot';
    div.id = 'b22-' + s.id;
    div.textContent = '+';
    div.title = 'Add player';
    div.addEventListener('click', () => {
      activeB22Slot = s.id;
      document.getElementById('b22-search').focus();
      document.getElementById('b22-search').scrollIntoView({behavior:'smooth'});
    });
    grid.appendChild(div);
  });
}

function filterB22() {
  const v = document.getElementById('b22-search').value.toLowerCase().trim();
  const sugg = document.getElementById('b22-sugg');
  if (!v) { sugg.className = 'sugg-box'; return; }
  const used = Object.values(b22Players).map(p => p[0]);
  const matches = PLAYERS.filter(p => p[0].toLowerCase().includes(v) && !used.includes(p[0])).slice(0, 6);
  if (!matches.length) { sugg.className = 'sugg-box'; return; }
  sugg.innerHTML = '';
  matches.forEach(p => {
    const d = document.createElement('div');
    d.className = 'sugg-item';
    d.innerHTML = p[0] + (p[4] ? ' ★' : '') + '<span>' + p[1] + ' · ' + p[2] + '</span>';
    d.addEventListener('click', () => {
      if (activeB22Slot) {
        b22Players[activeB22Slot] = p;
        const slot = document.getElementById('b22-' + activeB22Slot);
        if (slot) {
          slot.textContent = p[0].split(' ').pop();
          slot.className = 'pos-slot filled';
          slot.title = p[0];
        }
        activeB22Slot = null;
      }
      document.getElementById('b22-search').value = '';
      sugg.className = 'sugg-box';
    });
    sugg.appendChild(d);
  });
  sugg.className = 'sugg-box on';
}

async function analyseB22() {
  const myTeam = document.getElementById('my-team').value;
  const opp = document.getElementById('opp-team').value;
  if (!myTeam || !opp) { alert('Please select both teams.'); return; }
  const filled = Object.values(b22Players);
  if (filled.length < 6) { alert('Please add at least 6 players.'); return; }

  const resultDiv = document.getElementById('b22-result');
  resultDiv.innerHTML = `<div class="result-card loading"><span class="loading-spinner">🏉</span><div class="loading-text">Analysing your Best 22...</div></div>`;

  const byPos = {DEF:[],MID:[],RUC:[],FWD:[],EMG:[]};
  B22_SLOTS.forEach(s => { if (b22Players[s.id]) byPos[s.pos].push(b22Players[s.id][0] + ' (avg ' + b22Players[s.id][3] + ')'); });

  const prompt = `You are FootyEdge, expert AFL analyst 2026. Analyse this ${myTeam} Best 22 against ${opp}.

Defenders: ${byPos.DEF.join(', ')||'none'}
Midfielders: ${byPos.MID.join(', ')||'none'}
Ruck: ${byPos.RUC.join(', ')||'none'}
Forwards: ${byPos.FWD.join(', ')||'none'}
Emergency: ${byPos.EMG.join(', ')||'none'}

Respond in this exact JSON format with no markdown and no extra text outside the JSON:
{"overall_rating":7,"best_matchups":["player reason","player reason"],"watch_out":["player reason"],"underperformers":["player reason"],"key_insights":["insight 1","insight 2","insight 3"],"recommendation":"overall tactical recommendation"}`;

  try {
    const text = await callGroq([{ role: 'user', content: prompt }]);
    const parsed = JSON.parse(text);

    const rColor = parsed.overall_rating >= 7 ? '#00e676' : parsed.overall_rating >= 5 ? '#ffab00' : '#ff5252';
    let html = `<div class="overall-card">
      <div class="overall-title">🏆 ${myTeam} vs ${opp}</div>
      <div class="overall-rating" style="color:${rColor}">${parsed.overall_rating}<span style="font-size:20px;color:#4a5568">/10</span></div>
      <div class="overall-sub">Team Matchup Rating</div>
      <div class="result-text">${parsed.recommendation}</div>
    </div>
    <div class="result-card">
      <div class="result-player" style="color:#00e676;margin-bottom:8px">✅ Best Matchups</div>
      ${parsed.best_matchups.map(m=>`<div class="result-text">• ${m}</div>`).join('')}
      <hr class="divider">
      <div class="result-player" style="color:#ffab00;margin-bottom:8px">👀 Watch Out For</div>
      ${parsed.watch_out.map(m=>`<div class="result-text">• ${m}</div>`).join('')}
      <hr class="divider">
      <div class="result-player" style="color:#ff5252;margin-bottom:8px">⚠️ May Underperform</div>
      ${parsed.underperformers.map(m=>`<div class="result-text">• ${m}</div>`).join('')}
    </div>
    <div class="result-card">
      <div class="result-player" style="margin-bottom:8px">💡 Key Insights</div>
      ${parsed.key_insights.map((i,idx)=>`<div class="result-text">${idx+1}. ${i}</div>`).join('')}
    </div>`;

    resultDiv.innerHTML = html;
  } catch (err) {
    resultDiv.innerHTML = `<div class="result-card"><p class="muted">❌ Error: ${err.message}</p></div>`;
  }
}

// ─── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initB22();
  const oppSel = document.getElementById('opp-select');
  if (oppSel) oppSel.addEventListener('change', renderForm);
});
