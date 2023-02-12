keys = '45c121aef188d2d6b2042dce4ce1381a';
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
document.querySelector('input[type="text"]')
.addEventListener( 'keyup', debouncedSearch);
