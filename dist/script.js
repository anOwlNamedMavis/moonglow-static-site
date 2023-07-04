var canvas = document.getElementById("stars");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

window.addEventListener('resize',function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    makingStar();
});
function rand(a,b) {
    return Math.random()*(b-a+1)+a;
}
var stars = [];

Stars = function(x, y, radius, speed){
    this.x = x;
    this.y = y;
    this.speed = (speed/25);
    this.radius = radius;
    this.saturation = (95+(this.radius)*5);
    this.lightness = (20+this.radius*4);
};

Stars.prototype = {
    update: function(){
        this.x += this.speed;
        if(this.x - this.radius >= window.innerWidth){
            this.x = 0;
        }
    },
    render: function(){
        c.beginPath();
        c.arc(this.x, this.y, (this.radius < 0) ? 0 : this.radius, 0, Math.PI *2, false);
        var flickerAdd = (rand(0, 140) !== 0) ? rand(5, 20) : 0;
        c.fillStyle = 'hsl('+Math.floor(rand(195,200))+', '+this.saturation+'%, '+(this.lightness+flickerAdd)+'%)';
        c.fill();
    }
};

updateStars = function(a){
    var i = a.length;
    while(i--){
        a[i].update();
    }
};
renderStars = function(a){
    var i = a.length;
    while(i--){
        a[i].render(i);
    }
};

makingStar = function(){
    stars = [];
    var base = .75;
    var inc = .2;
    var count = 40;
    var per = 6;
    while(count--){
        var radius = base + inc;
        var perTime = per;
        while(perTime--){
            radius += inc;
            stars.push(new Stars(rand(0, window.innerWidth-radius), rand(0, window.innerHeight-radius), radius, radius*3));
        }
    }
};

function update() {
    window.requestAnimationFrame(update);
    updateStars(stars);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    renderStars(stars);
}

makingStar();
update();