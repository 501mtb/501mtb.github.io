// ===============================
// 🌍 TOGGLE MENU
// ===============================
function toggleLangMenu() {
    document.getElementById("langMenu").classList.toggle("show");
}

// ===============================
// 🌍 CLICK OUTSIDE (fermer menu)
// ===============================
document.addEventListener("click", function(e) {
    const menu = document.getElementById("langMenu");
    const globe = document.querySelector(".globe");

    if (!menu.contains(e.target) && !globe.contains(e.target)) {
        menu.classList.remove("show");
    }
});

// ===============================
// 🌍 TRANSLATIONS
// ===============================
const translations = {
    en: {
        hero_slogan: "Ride Beyond Limits",
        slogan: "501 MTB Toamasina",
    nav_1: "Home",
    nav_2: "Events",
    nav_3: "Rides",
    nav_4: "Leaders",
    nav_5: "Riders",
    nav_6: "About",
    nav_7: "Shop",

    bio: "Discover Yourself, Broaden Your Horizon, Explore The World",
    bio2: "We Develop and Promote Mountain Biking; We Stand together to Build Strong-United MTB Community; Throught Events-Trail-Ride and Community Support",
       
        main_title: "Mountain Biking in Toamasina",
        about_title: "About 501MTB",
        about_text: "501MTB is a mountain biking team based in Toamasina, Madagascar. We organize MTB rides, cycling events, and trail adventures for riders of all levels.",
    
        intro_text: "Welcome to the 501 MTB web site",
        title_A: "Next Events",
            title_A1: "Next Ride",
            title_A2: "Special Event",
            title_A3: "Social Ride",
        title_B: "Past Rides",
        title_C: "Leaders",
        title_D: "Riders",
        title_E: "Our Values",
            title_E1: "Discover Yourself",
                texte_E1: "Mountain biking is a personal journey as much as physical challenge. Every climb, every descent, and obstacle reveals something new about who you are. Through Effort,pain, and persistence, rider's learn their limits-and learn how to go beyond them. We believe every ride is an opportunity for self-growth, confidence, and mental strength.",
            title_E2: "Broaden Your Horizon",
                texte_E2: "We encourage riders to go beyond comfort zones physically, mentally and culturally. Mountain biking open doors to new places, new people, and new perspectives. Wether it is discovering new trails in Toamasina or competing with riders from different regions. We believe progress comes from exposure, curiosity, and openness to new experiences.",
            title_E3: "Explore the world",
                texte_E3: "We encourage riders to go beyond comfort zones physically, mentally and culturally. Mountain biking open doors to new places, new people, and new perspectives. Wether it is discovering new trails in Toamasina or competing with riders from different regions. We believe progress comes from exposure, curiosity, and openness to new experiences.",
        footer_title: "MTB Community in Madagascar",
        footer_texte: "Toamasina MTB is one of the leading mountain biking communities in Madagascar, with 56 actives members in 2025, bringing together cyclists and riders to explore new trails and organize events.",
    },

    fr: {
        hero_slogan: "Repousse tes limites",
        slogan: "501 MTB Toamasina",
        nav_1: "Accueil",
        nav_2: "Événements",
        nav_3: "Sorties",
        nav_4: "Leaders",
        nav_5: "Riders",
        nav_6: "À propos",
        nav_7: "Boutique",

    bio: "Se Découvrir, Dépasser Ses Limites, Explorer Le Monde",
    bio2: "Nous développons et promouvons le vélo tout terrain; Ensemble, nous sommes une communauté VTT solidaire qui organise des evenements, randonnées, et soutient la communauté locale. ",
        
        main_title:" Le Vélo Tout terrain à Toamasina, Madagascar",
        about_title: "À propos de 501MTB",
        about_text: "501MTB est une équipe passionné de VTT basée à Toamasina Madagascar. Nous organisons des randonnés VTT, des événements cyclismes et des adventures dans la nature pour les cyclistes de tous niveaux.",

    intro_text: "Bienvenue sur la site web de 501 VTT",
        title_A: "Prochains événements",
            title_A1: "Next ride",
            title_A2: "Événement spécial",
            title_A3: "Activité sociale",
        title_B: "Evenemments passées",
        title_C: "Leaders",
        title_D: "Riders",
        title_E: "Nos valeurs",
            title_E1: "Se découvrir",
                texte_E1:"Le VTT est un voyage personnel autant qu'un défi physique. Chaque montée, chaque descente, et chaque obstacte révèle quelque chose de nouveau en tant que personne. A travers l'effort, la douleur et la persévérance, les cyclistes apprennent leurs limites et éssaient de les dépasser. Nous croyons que chaque randonnés est une opportunité de developpement personnel, de confiance en soi et de force mentale.",
            title_E2: "Dépasser ses limites",
                texte_E2:"Nous encourageons les cyclistes à sortir de leurs zones de confort physiquement , mentalement et culturellement; Le VTT est une passerelle vers de nouveaux horizons, permettant la dcouverte de paysages uniques, la rencotre de personnes aux histoires riches, de differents nouveaux perspectives. Que ce soit explorant les trails cachés de Toamasina ou en competition internationale, nous croyons profondément que le progès nait de l'echange, de la curiosité et la capacité à s'ouvrir à la diversité et expériences",
            title_E3: "Explorer le monde",
                texte_E3:"L'exploration ne se limite à la distance parcourue, c est une état d'esprit: découvrir de nouveau horizons, relever des défis inédits, vivre des moments uniques. Le vélo est plus qu'un simple moyen de transport, il connecte directement à la richesse de la nature, à la diversité des paysags, la sensation de liberté. Dess parcours a Toamasina aux aventures internationles, nous souhaitons éveiller une passions approfonde chez chacun, en leur faisant découvrir le monde et se merveilles à travers le VTT. ",
        footer_title: "Communauté VTT à Madagascar",
        footer_texte: "Toamasina MTB est l'une des plus grands communauté de VTT à Madagascar, avec 56 membres actifs en 2025, réunissant cyclistes et passionnés pour explorer de nouveaux parcours pour de evenement célebrant la richeche naturelle et culturelle de la région.",
    },

    mg: {
        slogan: "501 MTB Toamasina",
    nav_1: "Fandraisana",
    nav_2: "Hetsika",
    nav_3: "Ride",
    nav_4: "Mpitarika",
    nav_5: "Mpitaingina",
    nav_6: "501Mtb",
    nav_7: "Tsena",

    bio: "Fantaro Ny Tanjakao, Mivoara Hatrany, Izahao ny Tontolo Hafa",
    bio2: "Mampivelatra sy mampiroborobo ny biskileta an-tendrombohitra izahay; Miraihina, miray saina, mifanampy ho kilioba Iray tena matanjaka; Amin'ny alalan'ny fikarakarana hetsika mahakasika ny bisikileta,sy fanohanana ny fiarahamonina",
       
        main_title: "MTB Toamasina",
        about_title: "Momba ny 501MTB",
        about_text: "501MTB dia vondrona mpivoy bisikileta an-tendrombohitra miorina ao Toamasina, Madagasikara. Mikarakara fiarahamientana mitondra bisikileta antendrombohitra, hetsika fikarakarana lalana ho an'ny mpivoy rehetra tsy ankanavaka.",

    intro_text: "Tongasoa eto amin'ny tranonkala 501 MTB",
        title_A: "Hetsika ho avy",
            title_A1: "Fivoahana manaraka",
            title_A2: "Hetsika manokana",
            title_A3: "Heritsika socialy",
        title_B: "Fitsangatsanganana taloha",
        title_C: "Mpitarika ny 501MTB",
        title_D: "Mpivoy 501MTB",
        title_E: "Toe-tsaina - Soatoavina - Tanjona",
            title_E1: "Fantaro ny tanjakao",
                texte_E1:"Ny fivoizana bisikileta antendrombohitra dia fiforetena anaty, no ady ara-batana. isaky ny fiakarana sy fidinana ary sakana tsirairay dia ahafantarana ny toe-batana. Amin'ny alalan'ny ezaka, faharetana, sy fiafina no hafantarana ny fetran'ny vatana, ka ianarana ny hiorana izany. Mino izahay fa ny fiaraha-mivoy tsirairay dia hazaon'ny tombotsoa ho an'ny vatana, mampitombo ny fahatokisantena sy tanjaka ara-tsaina",
            title_E2: "Mivoara hatrany",
                texte_E2:"Manasa ny mpitaingina izahay hivoatra hatrany ara-batana, ara-tsaina ary indrindra ara-kolotsaina.Ny fivoizana bisikileta an-tendrombohitra dia varavarana ho an'ny tontolo vaovao, toeran hafa mahatalanjona, ahitan kolotsaina vaovao, fomba fijery hafa miavaka. Na amin ny fikarohana lalana vaovao, na amin ny fandraisana anjara amina fifanina iraisam-pirenena, mino tanteraka izahay fa ny fivoarana dia mipoitra avy amin'ny fifanakalozana, fanetren-tena ary fahaizana misokatra amin ny manodidina.",
            title_E3: "Hitety izao tontolo izao",
                texte_E3:"Ny fivoizana dia tsy voafetra ny halavirana fotsiny fa kolontsaina sy fomba fiainana: fikatsahana ny tsara hatrany, fanatanterahana fanamby vaovao, fianana tantara tsy fahita firy. Ny bisikileta dia tsy fitaovam-pitanterana fotsiny ihany fa fomba iray mampifandray an'ny hakanton'ny natiora, ny hatsaran'ny tontolo voahary, ary hatsapana ny tena fahafahana. Manomboka amin'ny atiala eto Toamasina hatramin'ny fanamby iraisam-pirenena, ny tanjonay dia ny hampifoha ny fitiavan'ny mpivoy ny harena voajanahary sy bisikileta.",
    footer_title: "Fikambanana VTT eto madgasikara",
        footer_texte: "Toamasina 501MTB dia anisan'ny fikambanana bisikileta an-tendrombohitra lehibe indrindra eto Madagasikara, manana mpikambana offisialy 56 ny taona 2025, mampivondrona ny mpivoy sy ny mpankafy hianoka lalana vaovao ary mikarakara hetsika manasongadina ny hakanton4ny natiora sy ny kolontsaina eny antoeran",
    }
};

// ===============================
// 🌍 APPLY LANGUAGE
// ===============================
function setLanguage(lang) {
    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        el.textContent = translations[lang][key];
    });

    // fermer menu après clic
    document.getElementById("langMenu").classList.remove("show");
}

// ===============================
// 🌍 DEFAULT LANGUAGE (EN)
// ===============================
setLanguage("en");
