function ibg(){
		let ibg=document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if(ibg[i].querySelector('img')){
			ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
		}
	}
}
ibg();

//=========================================================================================================================================================




// global variable
let scene;
let camera;
let renderer;
let circle;

// основная функция
function init(){
    // создать сцену
    scene = new THREE.Scene();

    // настройка камеры
    const fov = 65;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 100;
	camera.position.y = 7;
	camera.position.x = 0;
    scene.add(camera);


    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true });
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    renderer.setClearColor(0x1C1C1C, 0.0);
    document.getElementById('canvas').appendChild(renderer.domElement);


    //Инициализация планеты =================================================
    let geometrySize = 58;//68
    let geometryOptimization = 25;//50
    const mediaQuery = window.matchMedia('(min-width: 768px)')
	if (mediaQuery.matches) {
		geometrySize = 68;//58
    	geometryOptimization = 50;//25
	}
    let geometry = new THREE.IcosahedronGeometry(geometrySize, geometryOptimization);
    var color = new THREE.Color("rgba(60, 60, 60, 1)");

    let material = new THREE.MeshPhongMaterial({
	    color: color,
	    shading: THREE.FlatShading
	});

	circle = new THREE.Mesh( geometry, material );
	scene.add( circle );
	//=======================================================================

	var light = new THREE.DirectionalLight(0xe4e4dc, 1.5);
	light.position.set(0, 1, 0.3);
	scene.add( light );

	var light2 = new THREE.DirectionalLight(0xffffff, 0.5);
	light2.position.set(75, -1, 0);
	scene.add( light2 );

	var light3 = new THREE.DirectionalLight(0xffffff, 0.5);
	light3.position.set(-75, -1, 0);
	scene.add( light3 );


    // 3d object
    //circle = new THREE.Object3D();

    //scene.add(circle);
    /*function animate() {
	    requestAnimationFrame(animate);

	    circle.rotation.x = 20.1009;
	    circle.rotation.y = 0.1009;
	    camera.updateProjectionMatrix();

	    renderer.render(scene, camera);
	}
    animate();*/
    var render = function () {
	  requestAnimationFrame( render );

	  circle.rotation.x -= 0.0003;
	  circle.rotation.y -= 0.0005;
	  camera.updateProjectionMatrix();

	  renderer.render(scene, camera);
	};

	render();

    window.addEventListener('resize', onWindowResize, false);
    
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;

//=========================================================================================================================================


const FooterSwitch = document.querySelector('._footer-switch-click');
let x = 1;
FooterSwitch.addEventListener("click", function (e) {
	document.body.classList.toggle('_while');
	FooterSwitch.classList.toggle('_active');

	/*material = new THREE.MeshLambertMaterial( { color: 0x333333 } );*/
	//material = new THREE.MeshLambertMaterial( { color2 } );
	//renderer.render(scene, camera);

	//cube
	if (x > 0) {
		circle.material.color.b = 0.8313725490196079;
		circle.material.color.g = 0.9686274509803922;
		circle.material.color.r = 0.984313725490196;
		//alert(x);
		x = x - 1;
	} else {
		circle.material.color.b = 0.23529411764705882;
		circle.material.color.g = 0.23529411764705882;
		circle.material.color.r = 0.23529411764705882;
		//alert(x);
		x = x + 1;
	}
	//x = x + 1;
});
//console.log(cube.material.color);


/* Чорный
b
: 
0.23529411764705882
g
: 
0.23529411764705882
r
: 
0.23529411764705882*/

/*Белый
b
: 
0.8313725490196079
g
: 
0.9686274509803922
r
: 
0.984313725490196
*/
//=====================================================================================================================================================