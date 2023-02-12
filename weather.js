keys = '45c121aef188d2d6b2042dce4ce1381a';
async function search()
{
    const phrase=document.querySelector('input[type="text"]').value;
    const response =await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${phrase}&appid=${keys}`);
    const data=await response.json();
    console.log(data);
}
const debouncedSearch= _.debounce(()=>{
    search();
},600);
document.querySelector('input[type="text"]')
.addEventListener( 'keyup', debouncedSearch);
