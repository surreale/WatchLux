import "./Footer.css";

export default function Footer(){
return(
    <footer className="bg-light text-center text-lg-start">
    <div className="container p-4">
      <div className="row">
        <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase">Rólunk</h5>
          <hr />
          <p>
          Webshopunkban stílusos és minőségi karórák széles választékával várjuk, hogy mindenki megtalálja az idő mérésének tökéletes módját.
          </p>
        </div>

        <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase">Szolgáltatások</h5>
          <hr />
          <ul className="list-unstyled">
            <li className="text-dark">Órajavítás</li>
            <li className="text-dark">Egyedi óra készítése</li>
            <li className="text-dark">Egyedi óraszíj készítése</li>
          </ul>
        </div>

        <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase">Kapcsolat</h5>
          <hr />
          <p>
            Mezőtúr, Stromfeld Aurél u. 7.<br />
            Email: service@watchlux.hu<br />
            Telefon: +36 20 627 0071
          </p>
        </div>
      </div>
    </div>

    <div className="text-center p-3 bg-dark text-info">
      &copy; 2025 WatchLux | Minden jog fenntartva.
    </div>
  </footer>
)
}