const localTimezoneElement = document.getElementById("localTimezone");
const countrySelect = document.getElementById("country");
const timezoneSelect = document.getElementById("timezone");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

localTimezoneElement.textContent =
    "Detected Timezone: " + userTimezone;

const countries = [
    { name: "🇨🇭 Switzerland", offset: 60 },
    { name: "🇩🇰 Denmark", offset: 60 },
    { name: "🇸🇪 Sweden", offset: 60 },
    { name: "🇩🇪 Germany", offset: 60 },
    { name: "🇳🇱 Netherlands", offset: 60 },
    { name: "🇳🇴 Norway", offset: 60 },
    { name: "🇬🇧 United Kingdom", offset: 0 },
    { name: "🇫🇮 Finland", offset: 120 },
    { name: "🇱🇺 Luxembourg", offset: 60 },
    { name: "🇦🇹 Austria", offset: 60 },
    { name: "🇧🇪 Belgium", offset: 60 },
    { name: "🇫🇷 France", offset: 60 },
    { name: "🇮🇪 Ireland", offset: 0 },
    { name: "🇦🇺 Australia", offset: 600 },
    { name: "🇮🇸 Iceland", offset: 0 },
    { name: "🇸🇬 Singapore", offset: 480 },
    { name: "🇯🇵 Japan", offset: 540 },
    { name: "🇺🇸 United States (East Coast)", offset: -300 },
    { name: "🇺🇸 United States (West Coast)", offset: -420 },
    { name: "🇨🇦 Canada (East Coast)", offset: -300 },
    { name: "🇨🇦 Canada (West Coast)", offset: -420 },
    { name: "🇰🇷 South Korea", offset: 540 },
    { name: "🇳🇿 New Zealand", offset: 720 },
    { name: "🇨🇿 Czech Republic", offset: 60 },
    { name: "🇪🇸 Spain", offset: 60 },
    { name: "🇮🇹 Italy", offset: 60 },
    { name: "🇸🇮 Slovenia", offset: 60 }
];

const timezones = [
    { label: "BIT (UTC-12)", offset: -720 },
    { label: "SST (UTC-11)", offset: -660 },
    { label: "HAST (UTC-10)", offset: -600 },
    { label: "MIT (UTC-9:30)", offset: -570 },
    { label: "AKST (UTC-9)", offset: -540 },
    { label: "PST (UTC-8)", offset: -480 },
    { label: "PDT (UTC-7)", offset: -420 },
    { label: "MST (UTC-7)", offset: -420 },
    { label: "MDT (UTC-6)", offset: -360 },
    { label: "CST (UTC-6)", offset: -360 },
    { label: "EST (UTC-5)", offset: -300 },
    { label: "VET (UTC-4:30)", offset: -270 },
    { label: "EDT (UTC-4)", offset: -240 },
    { label: "AST (UTC-4)", offset: -240 },
    { label: "NT (UTC-3:30)", offset: -210 },
    { label: "ART (UTC-3)", offset: -180 },
    { label: "NDT (UTC-2:30)", offset: -150 },
    { label: "UYST (UTC-2)", offset: -120 },
    { label: "CVT (UTC-1)", offset: -60 },
    { label: "UTC / GMT (UTC+0)", offset: 0 },
    { label: "CET (UTC+1)", offset: 60 },
    { label: "BST (UTC+1)", offset: 60 },
    { label: "EET (UTC+2)", offset: 120 },
    { label: "CEST (UTC+2)", offset: 120 },
    { label: "MSK (UTC+3)", offset: 180 },
    { label: "IRST (UTC+3:30)", offset: 210 },
    { label: "GST (UTC+4)", offset: 240 },
    { label: "AFT (UTC+4:30)", offset: 270 },
    { label: "PKT (UTC+5)", offset: 300 },
    { label: "IST (UTC+5:30)", offset: 330 },
    { label: "NPT (UTC+5:45)", offset: 345 },
    { label: "BST Bangladesh (UTC+6)", offset: 360 },
    { label: "MST Myanmar (UTC+6:30)", offset: 390 },
    { label: "THA (UTC+7)", offset: 420 },
    { label: "CST China (UTC+8)", offset: 480 },
    { label: "JST (UTC+9)", offset: 540 },
    { label: "ACST (UTC+9:30)", offset: 570 },
    { label: "AEST (UTC+10)", offset: 600 },
    { label: "LHST (UTC+10:30)", offset: 630 },
    { label: "MAGT (UTC+11)", offset: 660 },
    { label: "FJT (UTC+12)", offset: 720 },
    { label: "CHAST (UTC+12:45)", offset: 765 },
    { label: "PHOT (UTC+13)", offset: 780 },
    { label: "LINT (UTC+14)", offset: 840 }
];

for (let i = 1; i <= 12; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    document.getElementById("hour").appendChild(option);
}

for (let i = 0; i <= 59; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i.toString().padStart(2, "0");
    document.getElementById("minute").appendChild(option);
}

countries.forEach(country => {
    const option = document.createElement("option");
    option.value = country.offset;
    option.textContent = country.name;
    countrySelect.appendChild(option);
});

timezones.forEach(zone => {
    const option = document.createElement("option");
    option.value = zone.offset;
    option.textContent = zone.label;
    timezoneSelect.appendChild(option);
});

convertBtn.addEventListener("click", () => {

    const hour = document.getElementById("hour").value;
    const minute = document.getElementById("minute").value;
    const ampm = document.getElementById("ampm").value;

    let targetOffset = null;
    let targetLabel = "";

    if (countrySelect.value !== "") {
        targetOffset = parseInt(countrySelect.value);
        targetLabel =
            countrySelect.options[countrySelect.selectedIndex].text;
    }
    else if (timezoneSelect.value !== "") {
        targetOffset = parseInt(timezoneSelect.value);
        targetLabel =
            timezoneSelect.options[timezoneSelect.selectedIndex].text;
    }

    if (!hour || !minute || targetOffset === null) {
        result.textContent =
            "Please fill in all the info, dummy";
        return;
    }

    let hour24 = parseInt(hour);

    if (ampm === "PM" && hour24 !== 12) {
        hour24 += 12;
    }

    if (ampm === "AM" && hour24 === 12) {
        hour24 = 0;
    }

    const localOffset = -new Date().getTimezoneOffset();

    const localDate = new Date();

    localDate.setHours(hour24);
    localDate.setMinutes(parseInt(minute));
    localDate.setSeconds(0);

    const difference =
        (targetOffset - localOffset) * 60000;

    const convertedDate =
        new Date(localDate.getTime() + difference);

    let convertedHour = convertedDate.getHours();
    const convertedMinute =
        convertedDate.getMinutes().toString().padStart(2, "0");

    const convertedAMPM =
        convertedHour >= 12 ? "PM" : "AM";

    convertedHour = convertedHour % 12;

    if (convertedHour === 0) {
        convertedHour = 12;
    }

    result.innerHTML = `
        Converted Time:<br>
        ${convertedHour}:${convertedMinute} ${convertedAMPM}<br>
        (${targetLabel})
    `;
});