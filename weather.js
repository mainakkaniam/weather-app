const key="84715a32d97da81b61e63583133c8cfb";
document.querySelector('input[type="text"]')
.addEventListener( 'keyup', ev=>
{
    const phrase =ev.target.value;
    console.log(phrase);
});