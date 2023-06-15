import { useState, useEffect } from "react";
import dataWebinar from "../data/data.json";
function Main() {
  const [listWebinar, setWebinar] = useState([]);
  const [seeDetail, setSeeDetail] = useState(false);
  const [webinarDetail, setWebinarDetail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [chargement, setChargement] = useState(true);
 

  const styleDisplay = {
    display: seeDetail ? "block" : "none",
  };
  const styleChargement = {
    display: chargement ? null : "none",
  };
  

  useEffect(() => {
    
    setWebinar(dataWebinar);
    setTimeout(()=>{
      setChargement((chargement) => !chargement);
    },3000)
  }, [listWebinar]);

  function showPopup(id) {
    console.log("ID", id);
    setSeeDetail((seeDetail) => !seeDetail);
   
    if (id) {
      listWebinar.forEach((item) => {
        if (item.id === id) {
          setWebinarDetail(item);
        }
      });
    }
  }

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }
  return (
    <div className="padding">
      <section className="chargement" style={styleChargement}>
        <div className="loading">
          <span>Nous sommes en production. 
            <br/>(pour plus de details, ou des suggestions veuillez nous contacter)</span>
            <br/>
            <strong>Développons l' Afrique ensemble.</strong>
          <div class="loader"></div>
        </div>
      </section>
      <h1>WEBINAR</h1>
      <h3>Ne rater aucun WEBINAR en ligne.</h3>
      <input
        type="search"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <section>
        <div className="pop_up" style={styleDisplay}>
          <div className="webinar_detail">
            <span className="closeWindow" onClick={showPopup}>
              Close
            </span>
            <div className="image">
              <img src={webinarDetail.image} alt={webinarDetail.image} />
            </div>
            <div className="webinar_detail_contenue">
              <h1>Thème : {webinarDetail.theme}</h1>
              <h4>
                Date :{" "}
                {new Date(webinarDetail.date_start).toLocaleDateString("fr")}
              </h4>
              <h4>
                Heure : {webinarDetail.hour_start}
                {webinarDetail.hour_end ? ` à ${webinarDetail.hour_end}` : null}
              </h4>

              <h4>Intervenants</h4>
              <div className="webinar_detail_intervenant">
                { webinarDetail.intervenant && webinarDetail.intervenant.length  ? webinarDetail.intervenant.map((item) => {
                  return (
                    <div className="item_intervenant" key={item.id}>
                      <img src={item.image} alt={item.image} />
                      <h5>{item.nom}</h5>
                    </div>
                  )
                }) : <span>Pas d'intervenant</span>
              } 
              </div>
              <div>
                <p>
                  {" "}
                  <strong>Description</strong> : <br />
                  {webinarDetail.description}
                </p>
              </div>
            </div>
            <a className="lien_for_join" href={webinarDetail.url}>
            Rejoignez-nous
            </a>
          </div>
        </div>
        {/* <h3>
          {" "}
          {listWebinar.length} Webinar{listWebinar.length > 1 ? `s` : null}
        </h3> */}
        <div className="card_event">
          {listWebinar
            .filter((item) => {
              return item.theme
                 .toLowerCase()
                .includes(searchTerm.toLowerCase()) || item.description
                .toLowerCase()
               .includes(searchTerm.toLowerCase()) || item.categorie
               .toLowerCase()
              .includes(searchTerm.toLowerCase()) ;
            })
            .map((item) => {
              return (
                <div key={item.id} className={
                  new Date(item.date_start).getDay() >= new Date().getDay() ? null:'hide_webinar'
                }>
                  <section className="card_one">
                
                    <h5 className="detail_hour">
                      {item.hour_start}
                      {item.hour_end ? ` à ${item.hour_end}` : null}
                    </h5>
                    <div className="image">
                      <a href={item.url}>
                        <img src={item.image} alt={item.image} />
                      </a>
                    </div>
                    <div className="detail">
                      <h5 className="date">
                        {new Date(item.date_start).toLocaleDateString("fr")}
                      </h5>
                      <h1>{item.theme}</h1>
                      <div>
                        <p>{item.description}</p>
                      </div>
                    </div>
                    <button
                      className="lien_for_join"
                      onClick={() => showPopup(item.id)}
                    >
                      Voir plus
                    </button>
                  </section>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
}
export default Main;
