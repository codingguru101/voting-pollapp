const form = document.getElementById('vote-form');


//Form Submit Event
form.addEventListener('submit', e=>{
    
    const choice = document.querySelector('input[name=os]:checked').value;
    const data = {os: choice};

    fetch('http://localhost:3000/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': "application/json"
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

e.preventDefault();

});

fetch('http://localhost3000/poll').then(res => res.json())
.then(data =>{console.log(data);
});

let dataPoints = [
    { label : 'Windows', y: 0 },
    { label : 'MacOS', y: 0 },
    { label : 'Linux', y: 0 },
{ label : 'Other', y: 0 },

];

const chartContainer = document.querySelector('#chartContainer');

if(chartContainer){
const chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    theme: 'theme1',
    title: {
        text: 'OS Results'
    },
    data:[
        {
            type: 'column',
            dataPoints: dataPoints
        }
    ]
});
chart.render();
 // Enable pusher logging - don't include this in production
 Pusher.logToConsole = true;

 var pusher = new Pusher('7a497c80458d1e0d6ecd', {
   cluster: 'us2',
   forceTLS: true
 });

 var channel = pusher.subscribe('os-poll');
 channel.bind('os-vote', function(data) {
     dataPoints = dataPoints.map(x => {
         if(x.label == data.os) {
             x.y += data.points; 
             return x;
         } else {
             return x;
         }
     });
     chart.render();

 });

}