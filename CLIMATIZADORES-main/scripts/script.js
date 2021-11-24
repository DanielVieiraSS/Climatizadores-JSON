let App = document.querySelector(".App");
let App2 = document.querySelector(".App-2");
let h1 = document.querySelector(".title-1");
let h2 = document.querySelector(".title-2");
let i = document.querySelector(".i");
//const url = "https://climatizadores-json.vercel.app/devices.json";
const url = "http://cloudcim.com.br:8888/json";

async function convertJson() {
  try {
    let response = await fetch(url);
    response = await response.json();
    responseAir = await response.airConditioning;
    responseSen = await response.sensorsTH;
    h1.innerHTML += ` (${responseAir.length})`;
    h2.innerHTML += ` (${responseSen.length})`;
    responseAir.map((item, index) => {
      App.innerHTML += `<div class="card ${item.state == -1 ? "turnoff" : ""}">

          <div class="info">
            <i class="fa fa-thermometer-empty"></i>
            <p>AC${index + 1}</p>
            <i class="fa fa-exclamation-circle"></i>
          </div>

          <div class="values">
            <div class="circle">
              <p>AC</p>
            </div>
            <h3 class="i"> ${ 
              item.state == 1
                ? item.damp != null
                  ? '<i class="fas fa-temperature-low"></i>  ' +
                    item.temperature +
                    "<br>" +
                    '<i class="fas fa-tint"></i>  ' +
                    item.damp +
                    "%"
                  : '<i class="fas fa-wrench"></i>'
                : " "
            }</h3>
          </div>

          <div class="${
            item.state == 1 ? "on" : item.state == 0 ? "stand" : "off"
          }">
          
          <p> <i class="fa fa-circle"></i> ${
            item.state == 1
              ? "LIGADO"
              : item.state == 0
              ? "STAND BY"
              : "DESLIGADO"
          }</p>
          ${
            item.state == 1
              ? item.temperature == null
                ? '<i class="fa fa-exclamation-triangle"></i>'
                : '<i class="fa fa-check"></i>'
              : item.state == 0
              ? '<i class="fa fa-check"></i>'
              : '<i class="fa fa-exclamation-triangle"></i>'
          }
          </div>
        </div>
      `;
      return item;
    });

    //função para mostrar informações dos climatizadores
    let show = document.querySelectorAll(".fa-exclamation-circle");
    let div = document.createElement("div");
    let print = document.querySelector(".print");
    div.classList.add("informations");

    show = Array.from(show);

    show.map((x, i) => {
      x.style.cursor = "help";
      let content = `
      <i class="fas fa-question-circle"></i>
        <ul>
          <li>- Climatizador: ${i + 1}</li>
          <li>- Estado: ${
            responseAir[i].state == 1
              ? "LIGADO"
              : responseAir[i].state == 0
              ? "STAND BY"
              : "DESLIGADO"
          }</li>
          <li>- Temperatura: ${responseAir[i].temperature}</li>
          <li>- Umidade: ${responseAir[i].damp}</li>
        </ul>
      `;

      x.addEventListener("mouseenter", (e) => {
        div.innerHTML = content;
        print.appendChild(div);
      });
      x.addEventListener("mouseleave", (e) => {
        print.innerHTML = "";
      });
    });

    responseSen.map((item, index) => {
      App2.innerHTML += `<div class="card ${item.state == -1 ? "turnoff" : ""}">

      <div class="info">
        <i class="fa fa-thermometer-empty"></i>
        <p>Cor.Frio${index + 1}</p>
        <i class="fa fa-exclamation-circle"></i>
      </div>

      <div class="values">
        <div class="circle">
          <p>AC</p>
        </div>
        <h3>
          </h3>
      </div>

      <div class="${
        item.state == 1 ? "on" : item.state == 0 ? "stand" : "off"
      }">
      
      <p> <i class="fa fa-circle"></i> ${
        item.state == 1
          ? "LIGADO"
          : item.state == 0
          ? "STAND BY"
          : "DESLIGADO"
      }</p>
      ${
         item.state == 1
          ? '<i class="fa fa-check"></i>'
          : item.state == 0
          ? '<i class="fa fa-check"></i>'
          : '<i class="fa fa-exclamation-triangle"></i>'
      }
      </div>
    </div>
  `;
  return item;
});




    return responseAir;
  } 
  catch (err) {
    h1.innerHTML = "[ERROR], We can't acess now, try later";
    console.log(err);
  }

  
}
convertJson();

setInterval(App, 5000);
