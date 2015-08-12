function changeFrame(clicked_id){
  console.log("change frame!!");

    if(clicked_id == "btn-lake"){
      document.getElementById("main-frame").setAttribute('src','https://www.youtube.com/embed/GEIgTjmUYSI?rel=0');
    }
    else if(clicked_id == "btn-house"){
      document.getElementById("main-frame").setAttribute('src','https://www.youtube.com/embed/-qpbfLCW63U?rel=0');
    }
    else if(clicked_id == "btn-driving"){
      document.getElementById("main-frame").setAttribute('src','https://www.youtube.com/embed/yyUK1DSPLWI?rel=0')

    }
    else if(clicked_id == "btn-mapleview"){
      document.getElementById("main-frame").setAttribute('src','https://www.youtube.com/embed/qUS-yaib7fU?rel=0')
    }
    else if(clicked_id == "btn-pool"){
      document.getElementById("main-frame").setAttribute('src','https://www.youtube.com/embed/JLEuyAlfIxg?rel=0')
    }
    else if(clicked_id == "btn-greenway"){
      document.getElementById("main-frame").setAttribute('src','https://www.youtube.com/embed/4p_fimXCn2E?rel=0')
    }

}
