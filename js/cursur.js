const $bigBall = document.querySelector('.cursor__ball--big');
const $smallBall = document.querySelector('.cursor__ball--small');
const $hoverables = document.querySelectorAll('.hoverable');

document.body.addEventListener('mousemove', onMouseMove);
$hoverables.forEach(el => {
  el.addEventListener('mouseenter', onMouseHover);
  el.addEventListener('mouseleave', onMouseHoverOut);
});

function onMouseMove(e) {
  TweenMax.to($bigBall, 0.4, {
    x: e.pageX - 15,
    y: e.pageY - 15
  });
  TweenMax.to($smallBall, 0.1, {
    x: e.pageX - 5,
    y: e.pageY - 7
  });
}

function onMouseHover(e) {
  // Récupérer la couleur de fond de l'élément survolé
  const bgColor = window.getComputedStyle(e.target).backgroundColor;
  
  // Calculer la couleur complémentaire
  const compColor = getComplementaryColor(bgColor);
  
  // Appliquer la couleur complémentaire au curseur (bigBall)
  TweenMax.to($bigBall, 0.3, {
    scale: 4,
    backgroundColor: compColor
  });
}

function onMouseHoverOut() {
  TweenMax.to($bigBall, 0.3, {
    scale: 1,
    backgroundColor: '#f7f8fa' // Couleur par défaut
  });
}

function getComplementaryColor(rgbString) {
  const rgbValues = rgbString.match(/\d+/g);
  if (!rgbValues || rgbValues.length < 3) return '#ffffff';
  const r = parseInt(rgbValues[0]);
  const g = parseInt(rgbValues[1]);
  const b = parseInt(rgbValues[2]);
  
  const compR = 255 - r;
  const compG = 255 - g;
  const compB = 255 - b;
  
  return `rgb(${compR}, ${compG}, ${compB})`;
}


