var filter1 = document.getElementById('bright');
var filter2 = document.getElementById('blur');
var filter3 = document.getElementById('cont');
var filter4 = document.getElementById('opac');
var filter5 = document.getElementById('gray');
var filter6 = document.getElementById('satur');

const fileInput=document.querySelector(".file-input"),
ChooseImg=document.querySelector(".choose-img"),
SaveImg=document.querySelector(".save-img"),
previewImg=document.querySelector(".preview img");

function resetFilter() {
    filter1.value = "100";
    filter2.value = "0";
    filter3.value = "100";
    filter4.value = "100";
    filter5.value = "0";
    filter6.value = "100";
    addFilter();
}

const loadImage =() =>{
    resetFilter();
    let file=fileInput.files[0];
    previewImg.src=URL.createObjectURL(file);
    document.querySelector(".properties").classList.remove("disable");
}

let sliders = document.querySelectorAll(".filter input[type='range']");
sliders.forEach(slider => {
    slider.addEventListener("input", addFilter);
});

function addFilter() {
    previewImg.style.filter = `brightness(${filter1.value}%) blur(${filter2.value}px) contrast(${filter3.value}%) 
    opacity(${filter4.value}%) grayscale(${filter5.value}%) saturate(${filter6.value}%)`;
}

const save=()=>{
    const canvas =document.createElement("canvas");     //creating canvas element
    const ctx=canvas.getContext("2d");             //return a drawing context on the canvas 
    canvas.width=previewImg.naturalWidth;          //setting canvas width to actual image width
    canvas.height=previewImg.naturalHeight;        //setting canvas height

    ctx.filter=`brightness(${filter1.value}%) blur(${filter2.value}px) contrast(${filter3.value}%) 
    opacity(${filter4.value}%) grayscale(${filter5.value}%) saturate(${filter6.value}%)`;           //apply user selected filter
    ctx.drawImage(previewImg,0,0,canvas.width,canvas.height);         

    const link=document.createElement("a");      //creating <a> element
    link.download="image.jpg";             //passing <a> tag download value to image.jpg
    link.href=canvas.toDataURL();            //passing <a> tag href value to canvas data url
    link.click();               //image download
}

fileInput.addEventListener("change",loadImage);
SaveImg.addEventListener("click",save);
ChooseImg.addEventListener("click",()=>fileInput.click());