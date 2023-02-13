keys1 = '0c4d22a8ee16c1989a17fdf45452ddc9';
keys='45c121aef188d2d6b2042dce4ce1381a';
async function search()
{
    const phrase=document.querySelector('input[type="text"]').value;
    const response =await fetch( `http://api.openweathermap.org/geo/1.0/direct?q=${phrase}&limit=5&appid=${keys}`);
    const data=await response.json();
    const ul=document.querySelector('form ul');
    console.log(data);
    ul.innerHTML='';
    for(let i=0;i<data.length;i++)
    {
        const {name,lat,lon,country}=data[i];
        ul.innerHTML+=`<li 
         data-lat="${lat}"
         data-lon="${lon}" 
         data-name="${name}">
         ${name} <span>${country}</span></li>`;
    }
}
const debouncedSearch= _.debounce(()=>{
    search();
},600);
async function showWeather(lat,lon,name)
{
    const response=await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keys1}`);
    const data=await response.json();
    console.log(data);
    const temp=data.main.temp;
    const feelslike=data.main.feels_like;
    const humidity=data.main.humidity;
    const wind=data.wind.speed;
    const icon=data.weather[0].icon;
    document.getElementById('city').innerHTML=name;
    document.getElementById('degrees').innerHTML=(temp - 273.15).toFixed(1)+'&#8451';
    document.getElementById('feelsLikeValue').innerHTML=(temp - 273.15).toFixed(1)+'&#8451';
    document.getElementById('windValue').innerHTML=wind+'<span>km/h</span>';
    document.getElementById('humidityValue').innerHTML=humidity+'<span>%</span>';
    document.getElementById('icon').src=`http://openweathermap.org/img/wn/${icon}@4x.png`;
    document.querySelector('form').style.display='none';
    document.getElementById('weather').style.display='block';

}
document.querySelector('input[type="text"]')
.addEventListener( 'keyup', debouncedSearch);
document.body.addEventListener('click',ev=>
{
    const li=ev.target;
    const {lat,lon,name}=li.dataset;
    if(!lat)
    {
        return;
    }
    showWeather(lat,lon,name);
});

document.getElementById('change').addEventListener('click',()=>
{
    document.getElementById('weather').style.display='none';
    document.querySelector('form').style.display='block';
}) 