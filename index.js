const bannerSelect = document.querySelector(".banner");

const sofBannerSelect = document.querySelector(".select-banner.sof");
const ksuBannerSelect = document.querySelector(".select-banner.ksu");

let isSof = true;

sofBannerSelect.onclick = () => {
    bannerSelect.style.backgroundImage = "url(./banner1.jpg)";
    isSof = true;
}

ksuBannerSelect.onclick = () => {
    bannerSelect.style.backgroundImage = "url(./banner2.jpg)";
    isSof = false;
}

let wishes = localStorage.getItem("WISHES");
let alega = localStorage.getItem("LEGA");
let aisGarant = localStorage.getItem("GARANT");

if (wishes == null || alega == null || aisGarant == null) {
    localStorage.setItem("WISHES", 500);
    localStorage.setItem("LEGA", 0);
    localStorage.setItem("GARANT", 0);

    wishes = 500;
}
else{
    wishes = Number(wishes);
}

const wish = document.querySelector(".fate-amount");
wish.innerHTML = wishes;

const wish1 = document.querySelector(".wish-1");
const wish10 = document.querySelector(".wish-10");

wish1.onclick = () => {

    if (wishes <= 0) return;
    wishes--;
    localStorage.setItem("WISHES", wishes);

    anim1Wish(aWish());
}

wish10.onclick = () => {
    if (wishes <= 9) return;
    wishes-=10;
    localStorage.setItem("WISHES", wishes);

    let arr = [];
    let isLega = false;

    for (let i = 0; i < 10; i++){
        let isL = aWish()
        arr.push(isL);
        if (isL.isLega) isLega = true;
    }

    anim10Wish(arr, isLega);
}


const show = document.querySelector(".show");
const anim1Wish = ({isLega, isGarant}) => {

    show.classList.remove("not-show");
    show.classList.add("to-show");

    const legaPicture = document.createElement("div");
    legaPicture.className = "lega";

    if (isLega) {
        if (isGarant){
            legaPicture.style.backgroundImage = isSof ? "url(1.jpg)" : "url(2.jpg)";
        }
        else{
            let pic = Math.trunc(Math.random() * 3) + 5;
            legaPicture.style.backgroundImage = `url(${pic}.jpg)`;
        }
    } 
    else {
        legaPicture.style.backgroundImage = isSof ? "url(3.jpg)" : "url(4.jpg)";
    }

    const vLega = document.createElement("video");
    vLega.className = "video";
    vLega.autoplay = true;
    vLega.innerHTML = 
    `
    <source src="${isLega ? "./LEGA.mp4" : "./COM.mp4"}" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
    `;
    vLega.addEventListener("ended", () => {

        const button = document.createElement("button");
        button.className = "skip";
        button.onclick = () => {
            show.classList.add("not-show");
            show.classList.remove("to-show");

            legaPicture.remove();
            button.remove();
        }

        show.appendChild(button);
        show.appendChild(legaPicture);
        vLega.remove();
    });

    show.appendChild(vLega);
}

let count = 0;
const anim10Wish = (arr, isLega) => {

    show.classList.remove("not-show");
    show.classList.add("to-show");

    count = 0;
    pictures = [];
    for (let i = 0; i < arr.length; i++){

        let legaPicture = document.createElement("div");
        legaPicture.className = "lega";
    
        if (arr[i].isLega){
            if (arr[i].isGarant){
                legaPicture.style.backgroundImage = isSof ? "url(1.jpg)" : "url(2.jpg)";
            }
            else{
                let pic = Math.trunc(Math.random() * 3) + 5;
                legaPicture.style.backgroundImage = `url(${pic}.jpg)`;
            }
        }
        else{
            legaPicture.style.backgroundImage = isSof ? "url(3.jpg)" : "url(4.jpg)";
        }
            
        pictures.push(legaPicture);
    }


    const vLega = document.createElement("video");
    vLega.className = "video";
    vLega.autoplay = true;
    vLega.innerHTML = 
    `
    <source src="${isLega ? "./LEGA.mp4" : "./COM.mp4"}" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
    `;
    vLega.addEventListener("ended", () => {

        const button = document.createElement("button");
        button.className = "skip";
        button.onclick = () => {


            pictures[count].remove();
            count++;

            if (count < 10)
            show.appendChild(pictures[count]);
            else{
                button.remove();
                show.classList.add("not-show");
                show.classList.remove("to-show");
            }
        }

        show.appendChild(button);
        show.appendChild(pictures[0]);
        
        vLega.remove();
    });

    show.appendChild(vLega);
}


const aWish = () => {
    let lega = localStorage.getItem("LEGA");
    let garant = localStorage.getItem("GARANT");

    let isLega = false;
    let isGarant = false;

    wish.innerHTML = wishes;
    lega++;

    let chance = Math.random();
    let buff = Number(lega) > 75 ? 15 - (90 - Number(lega)) : 0;

    if (chance < 0.006 + buff * 0.07 + Math.random() * 0.07) {
        isLega = true;
        lega = 0;
        
        if (Number(garant))
        {
            isGarant = true;
            garant = 0;
        }
        else{
            if (Math.random() > 0.5){
                isGarant = true;
            }
            else{
                garant = 1;
            }
        }
    }

    console.log(`TOTAL WISHES (${garant == 1}) :`, lega);
    
    localStorage.setItem("LEGA", lega);
    localStorage.setItem("GARANT", garant);

    return {isLega, isGarant};
}

const addFate = document.querySelector(".add-fate")

addFate.onclick = () => {
    wishes+=50;
    localStorage.setItem("WISHES", wishes);
    wish.innerHTML = wishes;
}